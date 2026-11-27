/**
 * Stage 1: learner enrolment and course-record administration, progressive module
 * unlocking with administrator override, revisiting, and reliable progress storage.
 *   BASE_URL=http://localhost:3100 node tests/e2e/stage1.cjs   (local Supabase running)
 */
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const { confirmedStudent, sql, totp, withMfa } = require('./helpers.cjs');
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) fails++; console.log(`${c ? 'PASS' : 'FAIL'} ${m}`); };
const vis = (loc) => loc.first().waitFor({ timeout: 10000 }).then(() => true, () => false);
const axe = async (page, label) => { const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze(); ok(r.violations.length === 0, `accessibility (axe, WCAG 2.2 AA): ${label}${r.violations.length ? ' — ' + r.violations.map((v) => v.id + '×' + v.nodes.length).join(', ') : ''}`); };
const lessonId = (code) => sql(`select id from public.lessons where code='${code}'`);

/** Completes one lesson through the same database functions the platform uses. */
async function completeLesson(c, code) {
  const id = lessonId(code);
  const minChars = Number(sql(`select coalesce((exercise->>'min_chars')::int, 0) from public.lesson_content where lesson_id='${id}'`) || 0);
  if (minChars > 0) { const { error } = await c.rpc('save_exercise', { _lesson: id, _response: 'Model practice response. '.repeat(Math.ceil((minChars + 20) / 25)) }); if (error) throw new Error(`${code} exercise: ${error.message}`); }
  const answers = sql(`select coalesce(string_agg(correct_index::text, ',' order by position), '') from public.quiz_questions where lesson_id='${id}'`);
  if (answers) { const { error } = await c.rpc('submit_quiz', { _lesson: id, _answers: answers.split(',').map(Number) }); if (error) throw new Error(`${code} quiz: ${error.message}`); }
  const minWords = Number(sql(`select coalesce((assignment->>'min_words')::int, 0) from public.lesson_content where lesson_id='${id}'`) || 0);
  if (minWords > 0) { const { error } = await c.rpc('submit_assignment', { _lesson: id, _body: Array.from({ length: minWords + 10 }, (_, i) => ['message', 'audience', 'evidence', 'pause'][i % 4]).join(' ') }); if (error) throw new Error(`${code} assignment: ${error.message}`); }
  const { data, error } = await c.rpc('complete_lesson', { _lesson: id });
  if (error || !data?.completed) throw new Error(`${code} completion: ${error?.message ?? JSON.stringify(data)}`);
}
const readyCodes = (moduleNumber) => sql(`select coalesce(string_agg(l.code, ',' order by l.position), '') from public.lessons l join public.modules m on m.id=l.module_id where m.number=${moduleNumber} and l.is_mandatory and l.published and l.content_status <> 'in_preparation'`).split(',').filter(Boolean);

(async () => {
  const tag = String(Date.now()).slice(-5);
  const A = await confirmedStudent('Sara', 'Support' + tag);
  sql(`insert into public.user_roles (user_id, role) values ('${A.id}', 'student_support')`);
  const secret = await withMfa(A.c);
  const L = await confirmedStudent('Lina', 'Learner' + tag);
  const I = await confirmedStudent('Ivo', 'Instructor' + tag);
  sql(`insert into public.user_roles (user_id, role) values ('${I.id}', 'instructor')`);
  const iSecret = await withMfa(I.c);

  const b = await chromium.launch();
  const mk = async () => { const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); await ctx.addInitScript(() => localStorage.setItem('msa-cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, version: 1 }))); return ctx.newPage(); };
  const signIn = async (p, u, sec) => {
    await p.goto(BASE + '/login'); await p.fill('#email', u.email); await p.fill('#password', u.password); await p.getByRole('button', { name: 'Sign in' }).click();
    if (sec) { await p.waitForURL('**/verify-mfa**'); await p.fill('#code', totp(sec)); await p.getByRole('button', { name: /Verify/ }).click(); }
    await p.waitForURL('**/app');
  };

  // ── Administrator: cohort and enrolment ──
  const a = await mk(); await signIn(a, A, secret);
  ok(await vis(a.getByRole('link', { name: 'Learners and enrolment' })), 'dashboard offers learner administration to student support with MFA');
  await a.goto(BASE + '/app/admin/learners');
  await a.fill('#cohort-name', 'Cohort ' + tag); await a.fill('#cohort-start', '2027-03-01'); await a.getByRole('button', { name: 'Create cohort' }).click();
  ok(await vis(a.getByText(`Cohort “Cohort ${tag}” created.`)), 'administrator creates a cohort');
  await a.reload();
  await a.fill('#enrol-email', `nobody.${tag}@example.org`); await a.getByRole('button', { name: 'Enrol learner' }).click();
  ok(await vis(a.getByText('No account exists for this email address')), 'enrolment of an unregistered email is refused with a clear message');
  await a.fill('#enrol-email', L.email.toUpperCase()); await a.selectOption('#enrol-cohort', { label: `Cohort ${tag} · starts 2027-03-01` }); await a.getByRole('button', { name: 'Enrol learner' }).click();
  ok(await vis(a.getByText(/is enrolled\. Module 1 is open/)), 'administrator enrols a registered learner into the cohort');
  ok(sql(`select count(*) from public.enrollments e join public.cohorts c on c.id=e.cohort_id where e.user_id='${L.id}' and e.status='active' and c.name='Cohort ${tag}'`) === '1', 'enrolment stored with the cohort');
  await a.fill('#enrol-email', L.email); await a.getByRole('button', { name: 'Enrol learner' }).click();
  ok(await vis(a.getByText('This learner already has an active enrolment.')), 'a second active enrolment is refused');
  await a.reload();
  ok(await vis(a.getByRole('link', { name: new RegExp('Lina Learner' + tag) })), 'learner appears in the learner list');
  await axe(a, 'learner list and enrolment');

  // ── Learner: progressive unlocking ──
  const l = await mk(); await signIn(l, L);
  await l.goto(BASE + '/app/curriculum');
  ok(await vis(l.getByText('Opens when the previous module is completed')), 'curriculum shows locked modules');
  await l.goto(BASE + '/app/learn/L07');
  ok(await vis(l.getByRole('heading', { name: 'This lesson opens after the previous module' })), 'a lesson in a locked module shows the locked screen');
  ok(await vis(l.getByText(/Still to complete in Module 01/)), 'locked screen lists what to complete next');
  await axe(l, 'locked lesson screen');
  const { error: forced } = await L.c.rpc('start_lesson', { _lesson: lessonId('L07') });
  ok(forced?.code === '42501', 'a locked lesson cannot be opened through the API');

  for (const code of [...readyCodes(1), ...readyCodes(2)]) await completeLesson(L.c, code);
  ok(true, `learner completes modules 1 and 2 (${[...readyCodes(1), ...readyCodes(2)].join(', ')})`);
  await l.goto(BASE + '/app/learn/L07');
  ok(await vis(l.getByRole('tab', { name: /Lesson/ })), 'completing the earlier modules opens module 3');
  await l.goto(BASE + '/app/learn/L01');
  ok(await vis(l.getByText(/Lesson completed/i)), 'completed lessons stay open for revision and show their status');
  await l.goto(BASE + '/app/learn/L10');
  ok(await vis(l.getByRole('heading', { name: 'This lesson opens after the previous module' })), 'module 4 stays locked until module 3 is completed');

  // ── Reliable progress storage ──
  const firstAt = sql(`select completed_at from public.lesson_progress where user_id='${L.id}' and lesson_id='${lessonId('L01')}'`);
  const { data: again } = await L.c.rpc('complete_lesson', { _lesson: lessonId('L01') });
  ok(again?.completed === true && sql(`select completed_at from public.lesson_progress where user_id='${L.id}' and lesson_id='${lessonId('L01')}'`) === firstAt, 'completing a lesson twice keeps the original completion time');
  await L.c.from('lesson_progress').update({ status: 'not_started' }).eq('lesson_id', lessonId('L01'));
  await L.c.from('lesson_progress').delete().eq('lesson_id', lessonId('L01'));
  ok(sql(`select status from public.lesson_progress where user_id='${L.id}' and lesson_id='${lessonId('L01')}'`) === 'completed', 'learners cannot alter or delete their progress records directly');
  const { error: fake } = await L.c.from('lesson_progress').insert({ user_id: L.id, lesson_id: lessonId('L10'), status: 'completed' });
  ok(!!fake, 'learners cannot insert a completed lesson directly');
  const l2 = await mk(); await signIn(l2, L);
  await l2.goto(BASE + '/app/curriculum');
  ok(await vis(l2.getByText('Module completed')), 'progress persists across separate sessions');

  // ── Administrator: learner record, override and revocation ──
  await a.goto(BASE + '/app/admin/learners');
  await a.getByRole('link', { name: new RegExp('Lina Learner' + tag) }).click();
  await a.getByRole('heading', { name: 'Modules and progress' }).waitFor();
  ok(await vis(a.getByText(/Completed \d/)), 'learner record shows completion dates per lesson');
  ok(await vis(a.getByText(/quiz \d+\/\d+ passed/)), 'learner record shows quiz results');
  await a.fill('#reason-' + sql(`select id from public.modules where number=4`), 'Returning learner with prior training in structure');
  await a.getByRole('button', { name: 'Unlock module' }).nth(0).click();
  ok(await vis(a.getByText('Unlocked by override')) && await vis(a.getByText(/“Returning learner with prior training in structure”/)), 'administrator unlocks module 4 with a reason (record shows the override and its reason)');
  await axe(a, 'learner record');
  await l.goto(BASE + '/app/learn/L10');
  ok(await vis(l.getByRole('tab', { name: /Lesson/ })), 'override opens module 4 for the learner');
  await l.goto(BASE + '/app/curriculum');
  ok(await vis(l.getByText('Unlocked by the Academy')), 'curriculum shows the module was unlocked by the Academy');
  await a.reload(); await a.getByRole('button', { name: /Revoke unlock of Module 04/ }).click();
  ok(await vis(a.getByText('Override history')) && sql(`select count(*) from public.module_unlocks where user_id='${L.id}' and revoked_at is not null`) === '1', 'administrator revokes the override (record shows it in the history)');
  await l.goto(BASE + '/app/learn/L10');
  ok(await vis(l.getByRole('tab', { name: /Lesson/ })), 'a lesson the learner opened stays open after revocation');
  await l.goto(BASE + '/app/learn/L11');
  ok(await vis(l.getByRole('heading', { name: 'This lesson opens after the previous module' })), 'unopened lessons of the module are locked again');
  ok(sql(`select count(*) from public.audit_log where actor_id='${A.id}' and action in ('cohort.created','enrolment.created','module.unlocked','module.unlock_revoked')`) === '4', 'administrator actions are written to the audit log');

  // ── Pausing an enrolment ──
  await a.selectOption('select[name=status]', 'paused'); await a.getByRole('button', { name: 'Save' }).click();
  ok(await vis(a.getByText('Enrolment updated.')), 'administrator pauses an enrolment');
  await l.goto(BASE + '/app/learn/L02');
  ok(await vis(l.getByRole('heading', { name: 'This lesson is part of the full programme' })), 'a paused enrolment closes the course (except the preview lesson)');
  ok(sql(`select count(*) from public.lesson_progress where user_id='${L.id}' and status='completed'`) !== '0', 'learning records are kept while paused');

  // ── Access control ──
  await l.goto(BASE + '/app/admin/learners');
  ok(await vis(l.getByText('Staff access only')), 'learners cannot open learner administration');
  const ip = await mk(); await signIn(ip, I, iSecret);
  await ip.goto(BASE + '/app/admin/learners');
  ok(await vis(ip.getByText('Staff access only')), 'instructors without an administration role cannot manage enrolments');
  const { error: ie } = await I.c.rpc('admin_enrol', { _email: L.email });
  ok(ie?.code === '42501', 'the database refuses enrolment by an instructor');

  await b.close();
  sql(`delete from auth.users where id in ('${A.id}','${L.id}','${I.id}')`);
  sql(`delete from public.cohorts where name='Cohort ${tag}'`);
  console.log(`\n${n - fails}/${n} passed`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('ERROR', e); process.exit(1); });
