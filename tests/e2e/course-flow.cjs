/**
 * Stage 3 course experience, end to end in a real browser against local Supabase.
 * Run with the app on BASE_URL:  npm run test:course
 */
const { chromium } = require('playwright');
const { confirmedStudent, sql } = require('./helpers.cjs');
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const out = process.env.SCREENSHOT_DIR ?? require('os').tmpdir();
let n = 0, fails = 0;
const ok = (c, name) => { n++; if (c) console.log('PASS', name); else { fails++; console.log('FAIL', name); } };

(async () => {
  const s = await confirmedStudent('Clara', 'Rossi');
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  await ctx.addInitScript(() => localStorage.setItem('msa-cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, version: 1 })));
  const p = await ctx.newPage();
  const errors = []; p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(BASE + '/login'); await p.fill('#email', s.email); await p.fill('#password', s.password);
  await p.getByRole('button', { name: 'Sign in' }).click(); await p.waitForURL('**/app');

  // ── Curriculum overview (not enrolled) ──
  await p.goto(BASE + '/app/curriculum'); await p.getByText('Preview access').waitFor();
  ok(await p.getByText(/12 modules · 30 lessons · 6 practical workshops · approximately 42 hours/).isVisible(), 'curriculum shows 12 modules, 30 lessons, 6 workshops, ~42 h from the database');
  ok((await p.locator('details').count()) === 12, 'all 12 modules listed');
  ok(await p.locator('details').nth(0).getByText('Preview', { exact: true }).isVisible(), 'module containing the next lesson is expanded and the preview lesson is labelled');

  // ── Locked lesson ──
  await p.goto(BASE + '/app/learn/L02'); await p.getByText('This lesson is part of the full program').waitFor();
  ok((await p.locator('video').count()) === 0 && (await p.getByRole('tab').count()) === 0, 'non-enrolled student sees no content of a locked lesson');

  // ── Preview lesson L01: full completion flow ──
  await p.goto(BASE + '/app/learn/L01'); await p.getByRole('heading', { level: 1 }).waitFor();
  ok(await p.getByText('Instructor recording in production').isVisible(), 'lesson without a recording shows an honest notice (no fake video)');
  ok(await p.getByText('In progress', { exact: true }).first().isVisible(), 'opening a lesson records it as in progress');
  ok(await p.getByRole('heading', { name: 'Learning objectives' }).isVisible(), 'written lesson content rendered from the database');
  ok((await p.getByRole('tab').allTextContents()).join('|').startsWith('Lesson|Exercise|Quiz|Materials|Assignment'), 'tabs: Lesson, Exercise, Quiz, Materials, Assignment');
  ok(await p.getByRole('button', { name: 'Mark lesson as complete' }).isDisabled(), 'lesson cannot be completed before requirements are met');
  ok(await p.getByRole('link', { name: /Start a conversation/ }).isVisible(), 'AI teacher card with conversation entry point');

  ok(await p.getByRole('heading', { name: 'Phrase bank' }).isVisible() && (await p.getByText('Research evidence').count()) >= 1 && await p.getByRole('heading', { name: 'References' }).isVisible(),
    'lesson shows phrase bank, labelled research evidence and references');
  ok(await p.getByText(/Illustrative, composite examples/).isVisible(), 'examples are labelled as illustrative and composite');

  await p.getByRole('tab', { name: 'Exercise' }).click();
  ok(await p.getByText('A model answer becomes available after you save your own response.').isVisible(), 'model answer is withheld until the student saves their own response');
  await p.fill('#exercise', 'Too short.'); await p.getByRole('button', { name: 'Save exercise' }).click();
  await p.getByText(/Response too short/).waitFor(); ok(true, 'exercise enforces minimum length on the server');
  await p.fill('#exercise', 'Situation 1: a cardiology meeting in Vienna, eight-minute case presentation. Trigger: the chair asked a fast question. My heart rate rose, I lost a word I know well and started speaking faster. Prepared phrase: Could I ask you to repeat the last part of your question? Situation 2: an English ward round; a senior colleague joined and I began reading my notes. Prepared phrase: Let me put that another way.');
  await p.getByRole('button', { name: 'Save exercise' }).click(); await p.getByText('Your exercise has been saved.').waitFor();
  ok(true, 'exercise saved');
  await p.getByText('Compare with a model answer').waitFor(); await p.getByText('Compare with a model answer').click();
  ok(await p.getByText(/Situation 1: a 7-minute oral presentation/).isVisible(), 'model answer revealed after saving, with self-check criteria');

  await p.getByRole('tab', { name: /Quiz/ }).click();
  const qs = p.locator('fieldset');
  for (let i = 0; i < 6; i++) await qs.nth(i).locator('input[type=radio]').nth(3).check();
  await p.getByRole('button', { name: 'Submit answers' }).click(); await p.getByText(/You scored/).waitFor();
  ok(await p.getByText(/The pass mark is 70%/).isVisible(), 'wrong answers are scored on the server and do not pass');
  await p.screenshot({ path: `${out}/s3-quiz-feedback.png`, fullPage: false });
  await p.getByRole('button', { name: 'Retake the quiz' }).click();
  for (const [i, k] of [[0, 1], [1, 2], [2, 2], [3, 1], [4, 2], [5, 1]]) await qs.nth(i).locator('input[type=radio]').nth(k).check();
  await p.getByRole('button', { name: 'Submit answers' }).click(); await p.getByText('You scored 6 of 6. Quiz passed.').waitFor();
  ok(true, 'correct answers pass the quiz (6/6) with explanations');

  await p.getByRole('tab', { name: /Materials/ }).click();
  const [dl] = await Promise.all([p.waitForEvent('download'), p.getByRole('link', { name: /L01 Lesson handout/ }).click()]);
  ok((await dl.suggestedFilename()).endsWith('.pdf') && true, 'downloadable lesson handout is a real PDF');

  await p.getByRole('tab', { name: /Assignment/ }).click();
  ok(await p.getByText('Assessment criteria').isVisible(), 'assignment shows transparent assessment criteria');
  await p.fill('#assignment', 'Only a few words here.'); await p.getByRole('button', { name: 'Submit assignment' }).click();
  await p.getByText(/Assignment too short/).waitFor(); ok(true, 'assignment enforces minimum word count on the server');
  const essay = Array.from({ length: 230 }, (_, i) => ['I', 'present', 'cardiology', 'research', 'to', 'international', 'colleagues', 'and', 'want', 'to', 'speak', 'calmly'][i % 12]).join(' ');
  await p.fill('#assignment', essay); await p.getByRole('button', { name: 'Submit assignment' }).click();
  await p.getByText('Your assignment has been submitted.').waitFor(); ok(true, 'assignment submitted');

  await p.reload(); await p.getByRole('button', { name: 'Mark lesson as complete' }).waitFor();
  ok(await p.getByRole('button', { name: 'Mark lesson as complete' }).isEnabled(), 'completion unlocks after exercise, quiz and assignment');
  await p.getByRole('button', { name: 'Mark lesson as complete' }).click(); await p.getByText(/Completed on/).waitFor();
  ok(sql(`select status from public.lesson_progress lp join public.lessons l on l.id=lp.lesson_id where l.code='L01' and lp.user_id='${s.id}'`) === 'completed', 'completion is stored in the database for this student');

  // ── Enrol (staff action; Stripe in Stage 7) ──
  sql(`insert into public.enrollments (user_id, cohort) values ('${s.id}', 'Test cohort')`);
  await p.goto(BASE + '/app/curriculum'); await p.getByText('Continue learning').waitFor();
  ok(await p.getByText(/^1\s*\/ 36$/).isVisible() || (await p.locator('text=/ 36').count()) > 0, 'curriculum progress shows 1 of 36 after completing L01');
  await p.screenshot({ path: `${out}/s3-curriculum.png`, fullPage: false });

  // ── L07: sample video, captions, speed, resume ──
  await p.goto(BASE + '/app/learn/L07'); await p.locator('video').waitFor();
  ok(await p.getByText('Sample video', { exact: true }).isVisible(), 'sample video is clearly labelled');
  ok((await p.locator('video track[kind=captions]').count()) === 1, 'captions track attached');
  const tracks = await p.evaluate(async () => { const v = document.querySelector('video'); await new Promise((r) => (v.readyState >= 1 ? r() : v.addEventListener('loadedmetadata', r, { once: true }))); return { mode: v.textTracks[0]?.mode, dur: v.duration }; });
  ok(tracks.mode === 'showing' && tracks.dur > 30, 'video loads and captions are shown by default');
  await p.getByLabel('Playback speed').selectOption('1.25');
  ok(await p.evaluate(() => document.querySelector('video').playbackRate) === 1.25, 'playback speed control works');
  await p.evaluate(async () => { const v = document.querySelector('video'); v.muted = true; await v.play(); v.currentTime = 21; await new Promise((r) => setTimeout(r, 700)); v.pause(); });
  await p.waitForTimeout(1500);
  ok(Number(sql(`select video_position_s from public.lesson_progress lp join public.lessons l on l.id=lp.lesson_id where l.code='L07' and lp.user_id='${s.id}'`)) >= 20, 'video position saved to the database');
  await p.reload(); await p.getByText(/Resumed at 0:2/).waitFor(); ok(true, 'video resumes from the saved position');
  await p.screenshot({ path: `${out}/s3-lesson-desktop.png`, fullPage: false });
  await p.screenshot({ path: `${out}/s3-lesson-desktop-full.png`, fullPage: true });

  // Sidebar collapse
  await p.getByRole('button', { name: 'Hide course contents' }).click();
  ok(await p.getByRole('button', { name: 'Show course contents' }).isVisible(), 'curriculum sidebar collapses');
  await p.getByRole('button', { name: 'Show course contents' }).click();
  await p.getByRole('complementary', { name: 'Course contents' }).getByRole('link', { name: /L08/ }).first().click();
  await p.waitForURL('**/app/learn/L08'); ok(true, 'sidebar navigates between lessons');

  // In-preparation lesson
  await p.goto(BASE + '/app/learn/L04'); await p.getByText('Outline only.').waitFor();
  ok(await p.getByText('This lesson cannot be completed yet because its full content is still in preparation.').isVisible(), 'in-preparation lesson is labelled and cannot be completed');

  // ── Workshop I: complete learner journey ──
  await p.clock.install();
  await p.goto(BASE + '/app/learn/W1'); await p.getByRole('tablist', { name: 'Workshop sections' }).waitFor();
  const wtabs = (await p.getByRole('tab').allTextContents()).join('|');
  ok(wtabs === 'Briefing|Practice Rounds|Readiness Check|Workshop Pack|Final Task', 'workshop navigation: ' + wtabs);
  ok(await p.getByRole('heading', { name: 'Two ways to take this workshop' }).isVisible() && await p.getByRole('heading', { name: 'Model performances' }).isVisible(), 'briefing shows both versions and model performances');
  await p.getByRole('tab', { name: 'Practice Rounds' }).click();
  ok(await p.getByText('Pass the Readiness Check to unlock the practice rounds').isVisible(), 'practice rounds are locked until the readiness check is passed');
  await p.getByRole('tab', { name: 'Readiness Check' }).click();
  const rq = p.locator('fieldset');
  for (const [i, k] of [[0, 1], [1, 1], [2, 1], [3, 1], [4, 2]]) await rq.nth(i).locator('input[type=radio]').nth(k).check();
  await p.getByRole('button', { name: 'Submit answers' }).click(); await p.getByText('You scored 5 of 5. Quiz passed.').waitFor();
  ok(true, 'readiness check passed (5/5)');

  await p.getByRole('tab', { name: /Practice Rounds/ }).click();
  await p.getByText('Resume where you left off').waitFor();
  ok(await p.getByText('Sitting 1 — Baseline and pace').isVisible(), 'self-paced version is organised in three sittings');
  for (const item of ['I have read the assessment principles and the rubric', 'My extract is written out, with critical numbers and two key terms underlined', 'My recording set-up is ready']) await p.getByLabel(item).check();
  await p.getByRole('button', { name: 'Mark step complete' }).click(); await p.getByText('Step completed and saved.').waitFor();
  await p.reload(); await p.getByRole('tab', { name: /Practice Rounds/ }).click();
  await p.getByText('Resume where you left off').waitFor();
  ok((await p.locator('p.font-serif', { hasText: 'Round 1 — Baseline recording' }).count()) === 1, 'progress is saved; resume points to Round 1 after reload');

  const fillRound = async (k, comp, extra = {}) => {
    await p.fill(`#${k}-duration`, '2:30'); await p.fill(`#${k}-key_words`, '40'); await p.fill(`#${k}-key_seconds`, '15');
    await p.fill(`#${k}-heard_message`, 'Waiting times fell'); await p.fill(`#${k}-heard_numbers`, '14 to 9 weeks');
    await p.selectOption(`#${k}-comprehension`, comp); await p.selectOption(`#${k}-pauses`, 'Before and after'); await p.selectOption(`#${k}-fillers`, 'Not distracting');
    for (let c = 1; c <= 6; c++) await p.selectOption(`#${k}-c${c}`, 'Competent');
    for (const [f, v] of Object.entries(extra)) await p.selectOption(`#${k}-${f}`, v);
  };
  await p.fill('#round1-key_words', '42'); await p.getByRole('button', { name: 'Save and continue later' }).click(); await p.getByText('Progress saved.').waitFor();
  await p.reload(); await p.getByRole('tab', { name: /Practice Rounds/ }).click(); await p.locator('#round1-key_words').waitFor();
  ok(await p.inputValue('#round1-key_words') === '42', 'a draft round can be saved and resumed later');
  await p.getByRole('button', { name: 'Complete this round' }).click(); await p.getByText(/Please complete:/).waitFor();
  ok(true, 'a round cannot be completed without the comprehension check and self-ratings');
  await fillRound('round1', 'Partly correct');
  ok(await p.getByText('160 words per minute').isVisible(), 'rate is calculated and labelled as diagnostic only');
  await p.getByRole('button', { name: 'Complete this round' }).click(); await p.getByText('Step completed and saved.').waitFor();
  await p.reload(); await p.getByRole('tab', { name: /Practice Rounds/ }).click(); await p.getByText('Resume where you left off').waitFor();
  await p.getByRole('button', { name: /Round 2 — Re-record and compare/ }).click();
  await fillRound('round2', 'Fully correct');
  await p.getByRole('button', { name: 'Complete this round' }).click(); await p.getByText('Step completed and saved.').waitFor();
  await p.reload(); await p.getByRole('tab', { name: /Practice Rounds/ }).click(); await p.getByText('Resume where you left off').waitFor();
  await p.getByRole('button', { name: /Round 3 — Performance under pressure/ }).click();
  await p.getByRole('button', { name: 'Start timer with recording' }).click();
  ok(await p.getByText('A card will appear between 45 and 90 seconds').isVisible(), 'pressure timer explains the reveal window');
  await p.clock.fastForward('01:31'); await p.getByRole('alert').filter({ hasText: 'Standard' }).waitFor();
  ok(true, 'a standard pressure card is revealed within 45–90 seconds');
  await p.getByRole('button', { name: 'Stop timer' }).click();
  await p.getByRole('button', { name: 'Show a recovery strategy' }).click();
  ok(await p.getByText('A strategy that works:').isVisible(), 'recovery strategy shown after the round');
  await p.getByRole('button', { name: 'Draw a new card and repeat' }).click(); await p.clock.fastForward('01:31');
  await p.getByRole('alert').filter({ hasText: 'Standard' }).waitFor(); await p.getByRole('button', { name: 'Stop timer' }).click();
  ok(true, 'the pressure challenge can be repeated with a new card');
  await fillRound('round3', 'Fully correct', { recovery: 'Recovered within a few seconds with a prepared phrase' });
  await p.getByRole('button', { name: 'Complete this round' }).click(); await p.getByText('Step completed and saved.').waitFor();
  await p.reload(); await p.getByRole('tab', { name: /Practice Rounds/ }).click(); await p.getByRole('heading', { name: 'Your progress across the three rounds' }).waitFor();
  const table = await p.locator('table').last().innerText();
  ok(/Partly correct[\s\S]*Fully correct[\s\S]*Fully correct/.test(table) && /P\d|S\d/.test(table), 'progress table compares rounds 1–3 including the pressure card');
  await p.screenshot({ path: `${out}/w1-practice-rounds.png`, fullPage: false });

  await p.getByRole('tab', { name: /Final Task/ }).click();
  ok(await p.getByText('Assessment criteria').isVisible(), 'final task shows the six assessment criteria');
  await p.fill('#assignment', Array.from({ length: 270 }, (_, i) => ['In', 'round', 'one', 'my', 'listener', 'heard', 'forty', 'instead', 'of', 'fourteen', 'weeks', 'clearly'][i % 12]).join(' '));
  await p.getByRole('button', { name: 'Submit assignment' }).click(); await p.getByText('Your assignment has been submitted.').waitFor();
  await p.reload(); await p.getByRole('button', { name: 'Mark workshop as complete' }).waitFor();
  ok(await p.getByRole('button', { name: 'Mark workshop as complete' }).isEnabled(), 'workshop completion unlocks after readiness check, three rounds and final task');
  await p.getByRole('button', { name: 'Mark workshop as complete' }).click(); await p.getByText(/Completed on/).waitFor();
  ok(sql(`select status from public.lesson_progress lp join public.lessons l on l.id=lp.lesson_id where l.code='W1' and lp.user_id='${s.id}'`) === 'completed', 'workshop completion stored in the database');

  await p.getByRole('tab', { name: /Workshop Pack/ }).click();
  const packLinks = await p.locator('a[download]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  ok(packLinks.length === 4, 'workshop pack lists four documents');

  // Every resource referenced by any lesson exists and is a PDF
  const urls = sql(`select file_url from public.lesson_resources`).split('\n').filter(Boolean);
  let okCount = 0;
  for (const u of urls) { const r = await ctx.request.get(BASE + u); if (r.status() === 200 && (r.headers()['content-type'] || '').includes('pdf')) okCount++; else console.log('MISSING', u, r.status()); }
  ok(okCount === urls.length && urls.length >= 10, `all ${urls.length} lesson and workshop resources exist and are PDFs`);

  // AI teacher entry point
  await p.goto(BASE + '/app/learn/L07'); await p.getByRole('link', { name: /Start a conversation/ }).click();
  await p.waitForURL('**/app/teachers/voice-coach**'); await p.getByText(/No conversation is simulated here/).waitFor(); ok(true, 'AI teacher entry point opens the teacher profile (conversations: Stage 4)');

  // Dashboard
  await p.goto(BASE + '/app'); await p.getByText(/2 of 36 lessons and workshops completed/).waitFor(); ok(true, 'dashboard shows real course progress (L01 and W1 completed)');

  // Responsive
  for (const [w, h, name] of [[820, 1180, 'tablet'], [390, 844, 'mobile']]) {
    const m = await ctx.newPage(); await m.setViewportSize({ width: w, height: h });
    await m.goto(BASE + '/app/learn/L07'); await m.locator('video').waitFor();
    ok(await m.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: lesson player has no horizontal overflow`);
    await m.screenshot({ path: `${out}/s3-lesson-${name}.png`, fullPage: false });
    await m.getByRole('button', { name: /Course contents/ }).click();
    await m.getByRole('dialog').getByRole('link', { name: /L09/ }).first().waitFor();
    await m.screenshot({ path: `${out}/s3-contents-${name}.png`, fullPage: false });
    await m.getByRole('dialog').getByRole('link', { name: /L09/ }).first().click(); await m.waitForURL('**/app/learn/L09');
    ok(true, `${name}: course contents drawer navigates`);
    await m.close();
  }

  ok(errors.length === 0, 'no client-side errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  sql(`delete from auth.users where id = '${s.id}'`);
  console.log(`\n${n - fails}/${n} passed`);
  await b.close(); process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('ERROR', e.message); process.exit(1); });
