/**
 * Stage 3 security: course content, answer keys and learning records,
 * attacked directly through the Supabase API. Run: npm run test:course-security
 */
const { confirmedStudent, sql, anonClient } = require('./helpers.cjs');
let n = 0, fails = 0;
const ok = (c, name) => { n++; if (c) console.log('PASS', name); else { fails++; console.log('FAIL', name); } };

(async () => {
  const A = await confirmedStudent('Ana'), B = await confirmedStudent('Ben');
  const id = (code) => sql(`select id from public.lessons where code='${code}'`);
  const L01 = id('L01'), L02 = id('L02'), L07 = id('L07'), L04 = id('L04');
  const anon = anonClient();

  // Public syllabus vs protected content
  const { data: syl } = await anon.from('lessons').select('code,title,duration_minutes');
  ok(syl.length === 36, 'anonymous visitors can read the public syllabus (36 items)');
  const { data: ac, error: ae } = await anon.from('lesson_content').select('body');
  ok(!!ae || ac.length === 0, 'anonymous visitors cannot read lesson content');
  const { data: aq, error: aqe } = await anon.from('quiz_questions_public').select('prompt');
  ok(!!aqe || aq.length === 0, 'anonymous visitors cannot read quiz questions');
  const { error: aw } = await anon.from('lessons').update({ title: 'x' }).eq('id', L01);
  const t1 = sql(`select title from public.lessons where id='${L01}'`);
  ok(t1 !== 'x', 'anonymous visitors cannot edit lessons'); void aw;

  // Not enrolled: preview only
  const { data: c1 } = await A.c.from('lesson_content').select('lesson_id');
  ok(c1.length === 1 && c1[0].lesson_id === L01, 'non-enrolled student can read only the preview lesson content');
  const { error: e2 } = await A.c.rpc('start_lesson', { _lesson: L02 });
  ok(!!e2, 'non-enrolled student cannot start a locked lesson');
  const { error: e3 } = await A.c.rpc('submit_quiz', { _lesson: L07, _answers: [0, 0, 0, 0] });
  ok(!!e3, 'non-enrolled student cannot take a locked quiz');

  // Answer keys
  const { data: keys, error: ke } = await A.c.from('quiz_questions').select('correct_index');
  ok(!!ke || keys.length === 0, 'students cannot read quiz answer keys');
  const { data: pub } = await A.c.from('quiz_questions_public').select('*').eq('lesson_id', L01);
  ok(pub.length === 6 && pub.every((q) => !('correct_index' in q) && !('explanation' in q)), 'public quiz view exposes questions without answers');

  // Self-enrolment and content editing
  const { error: se } = await A.c.from('enrollments').insert({ user_id: A.id });
  ok(!!se, 'students cannot enrol themselves');
  await A.c.from('lessons').update({ is_preview: true }).eq('id', L02);
  ok(sql(`select is_preview from public.lessons where id='${L02}'`) === 'f', 'students cannot change lesson settings (e.g. make a lesson free)');
  const { error: ce } = await A.c.from('lesson_content').update({ video_url: 'https://evil.example' }).eq('lesson_id', L01);
  ok(sql(`select coalesce(video_url,'') from public.lesson_content where lesson_id='${L01}'`) !== 'https://evil.example', 'students cannot edit lesson content'); void ce;

  // Progress integrity
  const { error: pe } = await A.c.from('lesson_progress').insert({ user_id: A.id, lesson_id: L01, status: 'completed' });
  ok(!!pe, 'students cannot write progress rows directly');
  const { data: cl } = await A.c.rpc('complete_lesson', { _lesson: L01 });
  ok(cl.completed === false && cl.missing.includes('quiz'), 'completion is refused while requirements are missing');
  const { error: fq } = await A.c.from('quiz_attempts').insert({ user_id: A.id, lesson_id: L01, answers: [1], score: 4, total: 4, passed: true });
  ok(!!fq, 'students cannot forge a passed quiz attempt');
  const r = await A.c.rpc('submit_quiz', { _lesson: L01, _answers: [0, 0, 0, 0, 0, 0] });
  ok(r.data && r.data.passed === false && r.data.score === 0, 'quiz is scored on the server');
  const { error: sa } = await A.c.from('assignment_submissions').insert({ user_id: A.id, lesson_id: L01, body: 'x', status: 'approved' });
  ok(!!sa, 'students cannot insert or self-approve assignment submissions');

  // Enrolled
  sql(`insert into public.enrollments (user_id) values ('${A.id}'), ('${B.id}')`);
  const { data: c2 } = await A.c.from('lesson_content').select('lesson_id');
  ok(c2.length === 36, 'enrolled student can read all published lesson content');
  const { data: in4 } = await A.c.rpc('complete_lesson', { _lesson: L04 });
  ok(in4.completed === false && in4.missing.includes('content_in_preparation'), 'lessons still in preparation cannot be completed');
  await A.c.rpc('save_exercise', { _lesson: L07, _response: 'x'.repeat(300) });
  await A.c.rpc('submit_assignment', { _lesson: L07, _body: Array(220).fill('word').join(' ') });
  await B.c.rpc('start_lesson', { _lesson: L07 });

  // Isolation between students
  const { data: bp } = await B.c.from('lesson_progress').select('user_id');
  ok(bp.every((x) => x.user_id === B.id), "students cannot see other students' progress");
  const { data: bs } = await B.c.from('assignment_submissions').select('user_id');
  ok(bs.length === 0, "students cannot see other students' assignments");
  const { data: ba } = await B.c.from('quiz_attempts').select('user_id');
  ok(ba.length === 0, "students cannot see other students' quiz attempts");
  await B.c.from('assignment_submissions').update({ status: 'approved', feedback: 'hacked' }).eq('user_id', A.id);
  ok(sql(`select status from public.assignment_submissions where user_id='${A.id}'`) === 'submitted', "students cannot review or approve other students' assignments");
  await A.c.from('assignment_submissions').update({ status: 'approved' }).eq('user_id', A.id);
  ok(sql(`select status from public.assignment_submissions where user_id='${A.id}'`) === 'submitted', 'students cannot approve their own assignment');

  // Staff
  sql(`insert into public.user_roles (user_id, role) values ('${B.id}', 'content_editor')`);
  await B.c.from('lessons').update({ summary: 'Edited by content editor' }).eq('id', L04);
  ok(sql(`select summary from public.lessons where id='${L04}'`) === 'Edited by content editor', 'content editors can edit lessons without redeploying');
  const { data: staffKeys } = await B.c.from('quiz_questions').select('correct_index').eq('lesson_id', L01);
  ok(staffKeys.length === 6, 'content editors can manage quiz answer keys');
  sql(`update public.lessons set summary = (select summary from public.lessons where code='L04') where id='${L04}'`);

  sql(`delete from auth.users where id in ('${A.id}','${B.id}')`);
  console.log(`\n${n - fails}/${n} passed`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('ERROR', e.message); process.exit(1); });
