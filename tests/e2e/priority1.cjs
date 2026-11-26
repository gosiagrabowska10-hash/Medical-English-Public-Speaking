/**
 * Priority 1 controls (audit 26 Nov 2026, approved 27 Nov 2026):
 * security headers, health check, rate limiting, staff MFA (TOTP), instructor-confirmed
 * workshop competence vs. self-assessment, complete data export.
 *   BASE_URL=http://localhost:3100 node tests/e2e/priority1.cjs   (local Supabase running)
 */
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const axe = async (page, label) => { const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze(); ok(r.violations.length === 0, `accessibility (axe, WCAG 2.2 AA): ${label}${r.violations.length ? ' — ' + r.violations.map((v) => v.id + '×' + v.nodes.length).join(', ') : ''}`); };
const { confirmedStudent, sql, anonClient, totp } = require('./helpers.cjs');
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
let n = 0, fails = 0;
const ok = (c, m) => { n++; if (!c) fails++; console.log(`${c ? 'PASS' : 'FAIL'} ${m}`); };

const vis = (loc) => loc.first().waitFor({ timeout: 10000 }).then(() => true, () => false);
const words = (k) => Array.from({ length: k }, (_, i) => ['round', 'pause', 'listener', 'number', 'priority', 'evidence'][i % 6]).join(' ');

(async () => {
  // ── HTTP security headers and health ──
  const home = await fetch(BASE + '/');
  const h = (k) => home.headers.get(k) ?? '';
  ok(h('content-security-policy').includes("frame-ancestors 'none'") && h('content-security-policy').includes("object-src 'none'"), 'Content-Security-Policy set (frame-ancestors, object-src)');
  ok(h('strict-transport-security').includes('max-age=63072000'), 'Strict-Transport-Security set');
  ok(h('x-frame-options') === 'DENY' && h('x-content-type-options') === 'nosniff', 'X-Frame-Options DENY and nosniff');
  ok(h('referrer-policy') === 'strict-origin-when-cross-origin' && h('permissions-policy').includes('geolocation=()'), 'Referrer-Policy and Permissions-Policy set');
  ok(!home.headers.has('x-powered-by'), 'framework banner (X-Powered-By) removed');
  const api = await fetch(BASE + '/api/health');
  const health = await api.json();
  ok(api.status === 200 && health.status === 'ok' && health.database === 'ok' && Object.keys(health).length === 3, 'health check reports up/down only');
  ok((api.headers.get('content-security-policy') ?? '').length > 0, 'security headers also on API routes');

  // ── Rate limiting on the contact form (hashed client key) ──
  const ip = `203.0.113.${Math.floor(Math.random() * 250)}`;
  const statuses = [];
  for (let i = 0; i < 6; i++) {
    const r = await fetch(BASE + '/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': ip }, body: JSON.stringify({ name: 'Rate Test', email: 'rate@example.org', topic: 'other', message: 'Testing the rate limit only.', consent: true }) });
    statuses.push(r.status);
  }
  ok(statuses.slice(0, 5).every((s) => s !== 429) && statuses[5] === 429, `contact form limited to 5 per 10 minutes per client (${statuses.join(',')})`);
  ok(!sql(`select string_agg(bucket, ',') from public.rate_limits`).includes(ip), 'raw IP addresses are not stored in rate-limit records');

  // ── Staff MFA ──
  const I = await confirmedStudent('Ines', 'Instructor');
  sql(`insert into public.user_roles (user_id, role) values ('${I.id}', 'instructor')`);
  const tag = String(Date.now()).slice(-5);
  const L = await confirmedStudent('Lena', 'Learner' + tag);
  const O = await confirmedStudent('Omar', 'Other');
  sql(`insert into public.enrollments (user_id) values ('${L.id}'), ('${O.id}')`);
  const { data: p1 } = await I.c.from('profiles').select('id');
  ok(p1.length === 1, 'instructor without MFA sees only their own profile (staff access locked)');
  const { data: en } = await I.c.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Test authenticator' });
  const { error: ve } = await I.c.auth.mfa.challengeAndVerify({ factorId: en.id, code: totp(en.totp.secret) });
  ok(!ve, 'instructor enrols a TOTP authenticator');
  const { data: aal } = await I.c.auth.mfa.getAuthenticatorAssuranceLevel();
  ok(aal.currentLevel === 'aal2', 'session is MFA-verified (aal2)');
  const { data: p2 } = await I.c.from('profiles').select('id').in('id', [L.id, O.id]);
  ok(p2.length === 2, 'instructor with MFA can read learner profiles');

  // ── Workshop: learner completes activities; statuses ──
  const W1 = sql(`select id from public.lessons where code='W1'`);
  await L.c.rpc('submit_quiz', { _lesson: W1, _answers: [1, 3, 0, 2, 3] });
  for (const step of ['round1', 'round2', 'round3']) await L.c.rpc('save_workshop_step', { _lesson: W1, _step: step, _data: { comprehension: 'Fully correct', ratings: { c1: 'Competent', c2: 'Competent', c3: 'Competent', c4: 'Competent', c5: 'Competent', c6: 'Competent' } }, _complete: true });
  const { error: se } = await L.c.rpc('submit_assignment', { _lesson: W1, _body: words(260) });
  ok(!se, 'learner submits the written Final Task');
  const { data: done } = await L.c.rpc('complete_lesson', { _lesson: W1 });
  ok(done?.completed === true, 'Workshop Completed is reached by activities + Final Task (no instructor needed)');
  const { data: noA } = await L.c.from('workshop_assessments').select('id').eq('user_id', L.id);
  ok(noA.length === 0, 'self-ratings of Competent do not create a Competent status');

  const levels = (over = {}) => Array.from({ length: 6 }, (_, i) => over[i + 1] ?? 'competent');
  const { error: le } = await L.c.rpc('record_workshop_assessment', { _user: L.id, _lesson: W1, _basis: 'live_session', _levels: levels(), _comment: 'Trying to assess myself as a learner.' });
  ok(le?.code === '42501', 'learners cannot record assessments');
  const { error: ie } = await L.c.from('workshop_assessments').insert({ user_id: L.id, lesson_id: W1, basis: 'live_session', levels: levels(), competent: true, comment: 'Direct insert attempt by learner.' });
  ok(!!ie, 'learners cannot insert assessments directly');
  const Iaal1 = anonClient(); await Iaal1.auth.signInWithPassword({ email: I.email, password: I.password });
  const { error: a1 } = await Iaal1.rpc('record_workshop_assessment', { _user: L.id, _lesson: W1, _basis: 'live_session', _levels: levels(), _comment: 'Assessment attempt without MFA.' });
  ok(a1?.code === '42501', 'instructors cannot assess without an MFA-verified session');
  const { error: selfE } = await I.c.rpc('record_workshop_assessment', { _user: I.id, _lesson: W1, _basis: 'live_session', _levels: levels(), _comment: 'Assessing myself should fail.' });
  ok(!!selfE, 'staff cannot assess themselves');
  const { data: r2 } = await I.c.rpc('record_workshop_assessment', { _user: L.id, _lesson: W1, _basis: 'live_session', _levels: levels({ 2: 'developing' }), _comment: 'Clear opening; the key result needed a pause before the number.' });
  ok(r2?.competent === false, 'criterion 2 is required: five Competent without criterion 2 is not Competent');
  const { data: r3 } = await I.c.rpc('record_workshop_assessment', { _user: L.id, _lesson: W1, _basis: 'live_session', _levels: levels({ 3: 'developing' }), _comment: 'Numbers protected and recovered well from the one-minute card.' });
  ok(r3?.competent === true && r3.competent_criteria === 5, 'five Competent including criteria 2 and 4 confirms Competent');
  const { error: badLen } = await I.c.rpc('record_workshop_assessment', { _user: L.id, _lesson: W1, _basis: 'live_session', _levels: ['competent', 'competent'], _comment: 'Wrong number of criteria given.' });
  ok(!!badLen, 'a level is required for every rubric criterion');
  const { data: otherSees } = await O.c.from('workshop_assessments').select('id');
  ok(otherSees.length === 0, "learners cannot see other learners' assessments");
  ok(sql(`select count(*) from public.audit_log where action='workshop.assessed' and actor_id='${I.id}'`) === '2', 'assessments are written to the audit log');

  // ── Browser: MFA challenge, staff tools, learner statuses, export ──
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem('msa-cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, version: 1 })));
  const p = await ctx.newPage();
  const login = async (u) => { await p.goto(BASE + '/login'); await p.fill('#email', u.email); await p.fill('#password', u.password); await p.getByRole('button', { name: 'Sign in' }).click(); };
  await login(I);
  await p.waitForURL('**/verify-mfa**');
  ok(true, 'an account with an authenticator is asked for the code after the password');
  await p.goto(BASE + '/app/staff/assessments');
  ok(p.url().includes('/verify-mfa'), 'staff pages cannot be reached before the second factor');
  await axe(p, 'two-factor verification page');
  await p.fill('#code', '000000'); await p.getByRole('button', { name: /Verify/ }).click();
  await p.getByRole('alert').filter({ hasText: /not accepted/ }).waitFor();
  ok(true, 'a wrong code is rejected');
  await p.fill('#code', totp(en.totp.secret)); await p.getByRole('button', { name: /Verify/ }).click();
  await p.waitForURL('**/app/staff/assessments');
  ok(await vis(p.getByText('Lena Learner' + tag)), 'after MFA the instructor sees submitted Final Tasks');
  await p.getByText('Lena Learner' + tag).click(); await p.getByRole('heading', { name: 'Instructor assessment' }).waitFor();
  ok(await vis(p.getByText(/does not count towards the Competent status/)), 'learner self-assessment is shown as context only');
  ok(await vis(p.getByText('Previous assessments')), 'previous assessments are listed');
  await p.screenshot({ path: '/tmp/claude-0/p1-assess.png', fullPage: true });
  await axe(p, 'staff assessment page');
  await p.locator('input[name=basis][value=live_session]').check();
  for (let i = 1; i <= 6; i++) await p.locator(`input[name=c${i}][value=competent]`).check();
  await p.fill('#comment', 'Excellent control of pace; the listener reported both numbers correctly.');
  await p.getByRole('button', { name: 'Record assessment' }).click();
  await p.getByText(/Competent confirmed \(6 criteria/).waitFor();
  ok(true, 'instructor records a rubric assessment through the platform');

  const ctx2 = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx2.addInitScript(() => localStorage.setItem('msa-cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, version: 1 })));
  const q = await ctx2.newPage();
  await q.goto(BASE + '/login'); await q.fill('#email', L.email); await q.fill('#password', L.password); await q.getByRole('button', { name: 'Sign in' }).click(); await q.waitForURL('**/app');
  await q.goto(BASE + '/app/learn/W1');
  await q.getByText('Your workshop statuses').waitFor();
  ok(await vis(q.getByText(/confirmed by an instructor on/)), 'learner sees Competent confirmed by an instructor');
  ok(await vis(q.getByText(/Your own self-assessment helps you prepare but is not an independent assessment/)), 'self-assessment is explicitly not an independent assessment');
  ok(await vis(q.getByText(/Excellent control of pace/)), 'learner sees the instructor feedback');
  await q.screenshot({ path: '/tmp/claude-0/p1-statuses.png', fullPage: true });
  await axe(q, 'workshop statuses after instructor assessment');
  await q.goto(BASE + '/app/staff/assessments');
  ok(await vis(q.getByText('Staff access only')), 'learners cannot open staff tools');

  const ex = await q.request.get(BASE + '/api/account/export');
  const data = await ex.json();
  const flat = { ...data, ...data.learning };
  const tables = sql(`select string_agg(table_name, ',') from information_schema.columns where table_schema='public' and column_name='user_id' and table_name in (select tablename from pg_tables where schemaname='public') and table_name <> 'rate_limits'`).split(',');
  const key = { data_deletion_requests: 'deletion_requests', user_roles: 'roles' };
  const missing = tables.filter((t) => !(t in flat) && !((key[t] ?? '') in flat));
  ok(missing.length === 0, `data export covers every table with learner data (missing: ${missing.join(',') || 'none'})`);
  ok(data.learning.workshop_progress.length === 3 && data.learning.workshop_assessments.length === 3 && data.learning.assignment_submissions.length === 1, 'export contains workshop logs, assessments and the Final Task');
  ok(!JSON.stringify(data).includes(O.email) && !JSON.stringify(data).includes(O.id), "export contains no other learner's data");
  ok(ex.headers()['cache-control']?.includes('no-store'), 'export is not cached');

  // Settings: staff member without MFA sets it up through the UI
  const S = await confirmedStudent('Sam', 'Assessor');
  sql(`insert into public.user_roles (user_id, role) values ('${S.id}', 'assessor')`);
  const ctx3 = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx3.addInitScript(() => localStorage.setItem('msa-cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, version: 1 })));
  const r = await ctx3.newPage();
  await r.goto(BASE + '/login'); await r.fill('#email', S.email); await r.fill('#password', S.password); await r.getByRole('button', { name: 'Sign in' }).click(); await r.waitForURL('**/app');
  ok(await vis(r.getByRole('link', { name: 'Set up two-factor authentication' })), 'dashboard tells staff without MFA to set it up');
  await r.goto(BASE + '/app/staff/assessments');
  ok(await vis(r.getByText('Two-factor authentication required')), 'staff tools are locked without MFA');
  await r.goto(BASE + '/app/settings');
  await r.getByRole('button', { name: 'Set up two-factor authentication' }).click();
  const secret = (await r.locator('code').first().textContent()).trim();
  await axe(r, 'two-factor set-up panel');
  await r.fill('#totp-code', totp(secret)); await r.getByRole('button', { name: 'Verify and turn on' }).click();
  await r.getByText('Two-factor authentication is now on.').waitFor();
  ok(true, 'staff member enables two-factor authentication in Account Settings');
  ok(sql(`select count(*) from public.audit_log where action='security.mfa_enabled' and actor_id='${S.id}'`) === '1', 'MFA enrolment is written to the audit log');
  await r.screenshot({ path: '/tmp/claude-0/p1-mfa.png', fullPage: false });
  await b.close();

  sql(`delete from auth.users where id in ('${I.id}','${L.id}','${O.id}','${S.id}')`);
  console.log(`\n${n - fails}/${n} passed`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('ERROR', e); process.exit(1); });
