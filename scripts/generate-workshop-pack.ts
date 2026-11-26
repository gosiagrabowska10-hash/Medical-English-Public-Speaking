/**
 * Generates the Workshop Pack PDFs and the complete review document for a workshop,
 * from the same data that seeds the platform.
 *   npx tsx scripts/generate-workshop-pack.ts W1
 * Output: public/materials/workshops/<CODE>-*.pdf and docs/curriculum/workshop-<CODE>-complete.pdf
 */
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import { marked } from "marked";
import { chromium } from "playwright";
import { modules } from "../src/content/curriculum";
import { W1 } from "../src/content/workshops/w1";
import type { WorkshopSpec } from "../src/content/lesson-types";

const specs: Record<string, WorkshopSpec> = { W1 };
const code = process.argv[2] ?? "W1";
const w = specs[code];
if (!w) throw new Error(`Unknown workshop ${code}`);
const ws = w.workshop;
const mod = modules.find((m) => m.workshop?.code === code)!;
const title = mod.workshop!.title;
const e = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const range = (a: number, b: number) => (a === b ? `${a}` : `${a}–${b}`);
const stepBy = new Map(ws.steps.map((s) => [s.key, s]));
const facTotal = ws.readinessMinutes.facilitated + ws.steps.reduce((n, s) => n + s.facilitatedMinutes, 0);
const lo = ws.readinessMinutes.selfPaced[0] + ws.steps.reduce((n, s) => n + s.selfPacedMinutes[0], 0);
const hi = ws.readinessMinutes.selfPaced[1] + ws.steps.reduce((n, s) => n + s.selfPacedMinutes[1], 0);

const css = `@page{size:A4}*{box-sizing:border-box}body{font:9.8pt/1.55 Helvetica,Arial,sans-serif;color:#2b3442}
.tag{font:600 7.5pt Helvetica;letter-spacing:.3em;color:#7A6235;text-transform:uppercase;margin:0}
h1{font:400 26pt Georgia,serif;color:#101B2D;margin:6pt 0 2pt}h2{font:400 16pt Georgia,serif;color:#101B2D;margin:18pt 0 6pt;border-top:1px solid #B69A68;padding-top:8pt;break-after:avoid}
h3{font:400 12.5pt Georgia,serif;color:#18283C;margin:12pt 0 4pt;break-after:avoid}.sub{color:#646b77;margin:0 0 8pt}
table{width:100%;border-collapse:collapse;font-size:8.8pt;margin:5pt 0;break-inside:auto}tr{break-inside:avoid}td,th{border-bottom:1px solid #e9e7e1;padding:5pt 5pt;vertical-align:top;text-align:left}
th{font-size:7.4pt;letter-spacing:.1em;text-transform:uppercase;color:#646b77}.box{border:1px solid #d5d1c7;border-radius:2px;min-height:60pt;margin:3pt 0 8pt}
.rec{background:#F7F4EE;border-left:2px solid #B69A68;padding:6pt 9pt;margin:6pt 0}.ev{background:#eef2f8;border-left:2px solid #2b4c7e;padding:6pt 9pt;margin:6pt 0}
.small{font-size:8pt;color:#646b77}.page{break-before:page}ul,ol{margin:3pt 0;padding-left:15pt}li{margin:2pt 0}
.card{border:1.5px solid #B69A68;border-radius:3px;padding:10pt 12pt;height:205pt;break-inside:avoid;position:relative}.cards{display:grid;grid-template-columns:1fr 1fr;gap:10pt}
.card .c{font:600 7.5pt Helvetica;letter-spacing:.2em;color:#7A6235;text-transform:uppercase}.card h3{margin:6pt 0 6pt;font-size:15pt;border:0;padding:0}
.lvl{table-layout:fixed}.lvl td,.lvl th{overflow-wrap:anywhere}.lvl td:first-child,.lvl th:first-child{width:14%}.lvl td:nth-child(2),.lvl th:nth-child(2){width:46%}.mand{color:#9b2c2c;font-weight:600}.ipa{font-family:'DejaVu Sans',Arial,sans-serif}
.cover{background:#101B2D;color:#F7F4EE;padding:26pt 24pt;margin:-2pt 0 14pt}.cover h1{color:#F7F4EE}.cover .tag{color:#D6C39D}.cover .sub{color:#d5d1c7}`;
const head = (doc: string) => `<div class="cover"><p class="tag">The Medical Speaking Academy · ${e(code)} · ${e(doc)}</p><h1>${e(title)}</h1><p class="sub">Module ${String(mod.number).padStart(2, "0")} · ${e(mod.title)} · Week ${w.week} · Facilitated ${facTotal} minutes · Independent about ${range(lo, hi)} minutes</p></div>`;
const section = (h: string) => w.body!.sections.find((x) => x.heading === h);
const sectionHtml = (h: string, tag = "h2") => { const x = section(h); return x ? `<${tag}>${e(x.heading)}</${tag}>${x.paragraphs.map((p) => `<p>${e(p)}</p>`).join("")}` : ""; };
const statuses = `<h2>Two statuses: Workshop Completed and Competent</h2><table><tr><th>Status</th><th>What it means</th><th>Who decides</th></tr>
<tr><td><b>Workshop Completed</b></td><td>Readiness Check passed, all three Practice Rounds logged and the written Final Task submitted.</td><td>The platform records it when the requirements are met.</td></tr>
<tr><td><b>Competent</b></td><td>Competent in at least ${ws.competence.min} of the ${ws.rubric.length} criteria, including ${ws.competence.required.map((r) => `criterion ${r}`).join(" and ")}.</td><td>Only an instructor or assessor, who observes the Round 3 performance live and uses this rubric. Your self-assessment never sets this status.</td></tr></table>
<p class="small">Certificates: the Certificate of Completion lists workshops you have completed and, separately, the workshops in which an instructor has confirmed you as Competent. Self-assessed results never appear on a certificate as an assessment.</p>`;
const lines = (n: number) => `<div class="box" style="min-height:${n}pt"></div>`;

/* ───────── Sections ───────── */
const objectives = `<h2>Learning objectives</h2><ul>${w.body!.objectives.map((o) => `<li>${e(o)}</li>`).join("")}</ul>`;
const outcomes = `<h2>What you will leave with</h2><table><tr><th>Outcome</th><th>Produced in</th><th>Evidence you keep</th></tr>${ws.outcomes.map((o) => `<tr><td><b>${e(o.outcome)}</b></td><td>${e(o.producedIn)}</td><td>${e(o.evidence)}</td></tr>`).join("")}</table>`;
const schedules = `<h2>Two ways to take this workshop</h2>
<h3>Independent, self-paced (about ${range(lo, hi)} minutes across three sittings)</h3><p>Pause after any step: your progress is saved, and every station can be repeated.</p>
<table><tr><th>Sitting</th><th>Steps (estimated minutes)</th></tr><tr><td>Before you start</td><td>Readiness Check (${range(...ws.readinessMinutes.selfPaced)})</td></tr>${ws.sessions.map((s) => `<tr><td>${e(s.title)}</td><td>${s.steps.map((k) => `${e(stepBy.get(k)!.title)} (${range(...stepBy.get(k)!.selfPacedMinutes)})`).join("<br>")}</td></tr>`).join("")}</table>
<h3>Facilitated, groups of three (${facTotal} minutes)</h3><table><tr><th>Component</th><th>Minutes</th></tr><tr><td>Readiness Check (before the session)</td><td>${ws.readinessMinutes.facilitated}</td></tr>${ws.steps.map((s) => `<tr><td>${e(s.title)}</td><td>${s.facilitatedMinutes}</td></tr>`).join("")}<tr><td><b>Total</b></td><td><b>${facTotal}</b></td></tr></table>`;
const principles = `<h2>Assessment principles</h2><ul>${ws.assessmentPrinciples.map((p) => { const [h, ...r] = p.split(". "); return `<li><b>${e(h)}.</b> ${e(r.join(". "))}</li>`; }).join("")}</ul><p><b>Completion:</b> ${e(ws.completionRule)}</p>`;
const rubric = ws.rubric.map((r) => `<h3>${r.number}. ${e(r.title)}${r.mandatory ? ' <span class="mand">· mandatory</span>' : ""}</h3><p><i>${e(r.question)}</i> · <span class="small">Evidence: ${e(r.evidence)}</span></p>
<table class="lvl"><tr><th>Level</th><th>Descriptor</th><th>Example</th></tr>${(["beginning", "developing", "competent"] as const).map((l) => `<tr><td><b>${l[0].toUpperCase() + l.slice(1)}</b></td><td>${e(r.levels[l])}</td><td><i>${e(r.examples[l])}</i></td></tr>`).join("")}</table>`).join("");
const stepDetail = (k: string, withFacilitator: boolean) => {
  const s = stepBy.get(k as never)!;
  return `<h3>${e(s.title)} <span class="small">· independent ${range(...s.selfPacedMinutes)} min · group ${s.facilitatedMinutes} min${s.basedOn ? " · builds on " + s.basedOn.join(", ") : ""}</span></h3>
<p><b>Purpose:</b> ${e(s.purpose)}</p><ol>${s.instructions.map((i) => `<li>${e(i)}</li>`).join("")}</ol>
${s.selfPacedNotes ? `<div class="rec"><b>Independent version:</b> ${s.selfPacedNotes.map(e).join(" ")}</div>` : ""}
${s.checklist ? `<p><b>Checklist</b></p><ul>${s.checklist.map((c) => `<li>☐ ${e(c)}</li>`).join("")}</ul>` : ""}<p><b>Output:</b> ${e(s.output)}</p>
${withFacilitator ? `<div class="rec"><b>Set-up:</b> ${e(s.facilitator.setup)}<br><b>Observe:</b> ${s.facilitator.observe.map(e).join("; ")}.</div><table><tr><th>If…</th><th>Then…</th></tr>${s.facilitator.difficulties.map((d) => `<tr><td>${e(d.issue)}</td><td>${e(d.response)}</td></tr>`).join("")}</table>` : ""}`;
};
const progressSheet = `<table><tr><th style="width:28%">Measure</th><th>Round 1</th><th>Round 2</th><th>Round 3</th></tr>${["Length of recording", "Key segment: words / seconds", "Rate (diagnostic only)", "Key message as heard", "Numbers as heard", "Comprehension check (full / partial / not)", "Pauses around key result", "Effect of fillers (and where)", "Recovery (Round 3)", "Criteria rated Competent (of 6)", "One thing to change next"].map((m) => `<tr><td>${m}</td><td style="height:24pt"></td><td></td><td></td></tr>`).join("")}</table>`;
const termCard = `<table><tr><th>Term</th><th>Primary stress</th><th>British IPA</th></tr>${ws.termCard.map((t) => `<tr><td>${e(t.term)}</td><td>${e(t.stress)}</td><td class="ipa">${e(t.ipa)}</td></tr>`).join("")}</table><p class="small">Verified against Cambridge Dictionary and Oxford Learner's Dictionaries (British entries), 26 November 2026. Add your own terms below and check them in a standard British dictionary.</p>${lines(70)}`;
const phraseBank = `<table><tr><th style="width:36%">Expression</th><th>Use · register</th><th style="width:34%">Example</th></tr>${(w.body!.phrase_bank ?? []).map((p) => `<tr><td><b>${e(p.phrase)}</b>${p.pronunciation ? `<br><span class="small">${e(p.pronunciation)}</span>` : ""}</td><td>${e(p.use)}<br><span class="small">${e(p.register)}</span></td><td><i>${e(p.example)}</i></td></tr>`).join("")}</table>`;
const cardsHtml = `<div class="cards">${ws.pressureCards.map((c) => `<div class="card"><p class="c">${c.code} · ${c.intensity === "stretch" ? "Stretch" : "Standard"}</p><h3>${e(c.title)}</h3><p>${e(c.situation)}</p><p><b>Your task:</b> ${e(c.task)}</p></div>`).join("")}</div>`;
const recoveryKey = `<table><tr><th>Card</th><th>A strategy that works</th></tr>${ws.pressureCards.map((c) => `<tr><td><b>${c.code}</b> ${e(c.title)}</td><td>${e(c.recovery)}</td></tr>`).join("")}</table>`;
const warmup = `<ol><li>Release the shoulders and take three slow, low breaths.</li><li>Hum gently on “mm”, gliding from a low to a comfortable high note and back.</li><li>Do a few lip trills or slides on “ng” to free the voice without strain.</li><li>Say two of your own difficult phrases slowly and precisely (for example your title and a key term).</li><li>Count from one to ten, aiming each number at the back wall, with a clear fall on “ten”.</li></ol><p class="small">The Academy two-minute warm-up, from L08. Add the presence warm-up from L09: arrive, stand in your neutral position, look up, breathe, then begin.</p>`;

/* ───────── Documents ───────── */
const workbook = `${head("Participant Workbook")}
<p>This workbook accompanies the platform. Everything you write here can also be logged in the <b>Practice Rounds</b> tab, where your progress is saved.</p>
${objectives}${outcomes}${schedules}${statuses}${sectionHtml("Your recordings and your privacy")}${sectionHtml("If you need an adjustment")}
<h2 class="page">Worksheet 1 · Your extract</h2><p>2–3 minutes from a talk you will give: the opening, the key result and the close. Use only material you are permitted to share; never include identifiable patient information.</p>
<h3>Opening (context, purpose, route)</h3>${lines(80)}<h3>Key result (slide and sentence)</h3>${lines(80)}<h3>Close</h3>${lines(45)}
<h3>Critical numbers (underline them in your script)</h3>${lines(30)}<h3>Two hardest technical terms</h3>${lines(30)}
<h3>${e(ws.practicePassage.title)}</h3><div class="rec">${e(ws.practicePassage.text)}</div><p class="small">Critical numbers: ${ws.practicePassage.criticalNumbers.map(e).join(", ")}.</p>
<h2 class="page">Worksheet 2 · Progress sheet</h2><p>Measure the first take of each round. Rate is diagnostic only; the comprehension check is the test of intelligibility.</p>${progressSheet}
<h3>The listener comprehension check</h3><p><b>With a listener:</b> they hear the extract once and write down the key message and the numbers. <b>Alone:</b> wait at least an hour, play the recording once at normal speed without pausing, write down the key message and numbers, then compare with your script.</p>
<h2 class="page">Recording rounds</h2>${["round1", "round2", "round3"].map((k) => stepDetail(k, false)).join("")}
<h2 class="page">Worksheet 3 · Station A — pace, pause, stress, numbers and terms</h2>${stepDetail("stationA", false)}
<h3>Marking key</h3><p>/ short pause between thought groups · // deliberate pause · CAPITALS for the one stressed word per group · ↘ fall · ↗ rise</p><h3>Your marked key-result sentence</h3>${lines(60)}
<h3>Verified term-stress card</h3>${termCard}
<h3>Number drills</h3><p>Say each pair aloud three times: thirteen / thirty · fourteen / forty · fifteen / fifty · sixteen / sixty. Then write each critical number in a concrete second form (e.g. “fifteen per cent — roughly one patient in seven”).</p>${lines(50)}
<h2 class="page">Worksheet 4 · Station B — projection and vocal variety</h2>${stepDetail("stationB", false)}<h3>Two-minute voice warm-up</h3>${warmup}
<h3>Room-distance test</h3><table><tr><th>Version</th><th>Last word audible? (yes / partly / no)</th><th>Notes</th></tr><tr><td>Without breath support</td><td></td><td style="height:22pt"></td></tr><tr><td>With breath, aimed at the back wall</td><td></td><td style="height:22pt"></td></tr></table>
<h3>Key sentence, three ways</h3><p>Monotone · exaggerated · purposeful. Which did you keep, and why?</p>${lines(45)}
<h2 class="page">Worksheet 5 · Station C — presence and recovery</h2>${stepDetail("stationC", false)}
<h3>Silent video audit</h3><table><tr><th>Stance</th><th>Eye contact</th><th>Hands</th><th>Repeated movements</th></tr><tr><td style="height:50pt"></td><td></td><td></td><td></td></tr></table>
<h3>My presence plan</h3><table><tr><th>Entrance</th><th>Gesture 1 (where)</th><th>Gesture 2 (where)</th><th>Still moment</th></tr><tr><td style="height:40pt"></td><td></td><td></td><td></td></tr></table>
<h3>My recovery plan</h3><p>Three steps (L02): pause and breathe · find your place · bridge back with a recap.</p><table><tr><th>Most likely disruption</th><th>Prepared phrase 1</th><th>Prepared phrase 2</th></tr><tr><td style="height:40pt"></td><td></td><td></td></tr></table>
<h2 class="page">Worksheet 6 · Debrief</h2>${ws.debriefQuestions.map((q, i) => `<p><b>${i + 1}.</b> ${e(q)}</p>${lines(34)}`).join("")}
<h2 class="page">Worksheet 7 · Transfer plan</h2>${ws.transferPlan.map((t) => `<h3>${e(t.heading)}</h3><p class="small">${e(t.prompt)}</p>${lines(40)}`).join("")}
<h2 class="page">My speaker card</h2><p>Print this page or photograph it for the day of your presentation.</p>
<table><tr><th style="width:32%">Event</th><td style="height:28pt"></td></tr><tr><th>Three commitments</th><td style="height:80pt"></td></tr><tr><th>Warm-up (when)</th><td style="height:40pt"></td></tr><tr><th>Recovery phrase</th><td style="height:34pt"></td></tr><tr><th>One number to protect</th><td style="height:28pt"></td></tr></table>
<h2>Workshop phrase bank</h2>${phraseBank}`;

const rubricDoc = `${head("Assessment Rubric")}${principles}<h2>The six criteria</h2>${rubric}
${statuses}<h2>The Final Task</h2><p>${e(w.assignment!.brief)}</p><h2>Using this rubric</h2><ul><li><b>Self-assessment:</b> you rate yourself in every Practice Round. This is a learning tool and is labelled as self-assessment everywhere in the platform.</li><li><b>Instructor assessment:</b> an instructor or assessor observes your Round 3 performance live (or watches you play your own recording during a live session) and records a level for each criterion with written feedback. Recordings are never uploaded.</li><li><b>Adjusted route:</b> if you use an agreed adjustment, the voice-dependent criteria may be replaced by equivalent criteria agreed with the Academic Director.</li><li><b>AI:</b> no AI is used in this workshop. If AI feedback is introduced in later stages, it will describe observable behaviour only and will never decide an assessment.</li></ul>`;

const cardsDoc = `${head("Pressure Cards")}<h2>How the cards work</h2><ul>${ws.pressureGuidance.map((g) => `<li>${e(g)}</li>`).join("")}</ul><p>In the independent version the platform shows a random card between 45 and 90 seconds into Round 3. In the facilitated version the timekeeper draws a card face down and reveals it in the same window.</p>
<h2 class="page">Cards (print and cut)</h2>${cardsHtml}<h2 class="page">Recovery strategies (read after the round)</h2>${recoveryKey}`;

const facilitator = `${head("Facilitator Guide")}<h2>Before the session</h2><ul>${ws.facilitatorGeneral.map((g) => `<li>${e(g)}</li>`).join("")}</ul>${statuses}${sectionHtml("If you need an adjustment")}${objectives}
<h2>120-minute agenda</h2><table><tr><th>Time</th><th>Component</th><th>Minutes</th></tr>${(() => { let t = 0; const rows = [`<tr><td>Before</td><td>Readiness Check (online, individually)</td><td>${ws.readinessMinutes.facilitated}</td></tr>`]; t = ws.readinessMinutes.facilitated; for (const s of ws.steps) { rows.push(`<tr><td>${t}–${t + s.facilitatedMinutes}</td><td>${e(s.title)}</td><td>${s.facilitatedMinutes}</td></tr>`); t += s.facilitatedMinutes; } return rows.join(""); })()}</table>
<h2 class="page">Component guidance</h2>${ws.steps.map((s) => stepDetail(s.key, true)).join("")}
<h2 class="page">Debrief questions</h2><ol>${ws.debriefQuestions.map((q) => `<li>${e(q)}</li>`).join("")}</ol>
<h2>Feedback language</h2>${phraseBank}
<h2 class="page">Observer sheet (one per speaker per round)</h2><table><tr><th style="width:34%">Speaker · Round</th><td style="height:22pt"></td></tr><tr><th>Key message as heard</th><td style="height:44pt"></td></tr><tr><th>Numbers as heard</th><td style="height:26pt"></td></tr><tr><th>Pauses around key result</th><td style="height:22pt"></td></tr><tr><th>Where fillers distracted (if anywhere)</th><td style="height:26pt"></td></tr><tr><th>Round 3: card · first 5 seconds after it</th><td style="height:40pt"></td></tr><tr><th>One strength (with time)</th><td style="height:30pt"></td></tr><tr><th>One suggestion</th><td style="height:30pt"></td></tr></table>
<h2 class="page">Assessment rubric (summary)</h2>${principles}${rubric}<h2>Pressure cards and recovery strategies</h2>${recoveryKey}`;

/* ───────── Complete review document ───────── */
const notesFile = `docs/curriculum/workshop-${code}-review-notes.md`;
const notes = existsSync(notesFile) ? (marked.parse(readFileSync(notesFile, "utf8")) as string) : "";
const b = w.body!;
const briefing = `<h2 class="page">Part 1 · Briefing (Briefing tab)</h2><p>${e(b.intro)}</p>${b.sections.map((s) => `<h3>${e(s.heading)}</h3>${s.paragraphs.map((p) => `<p>${e(p)}</p>`).join("")}${s.callout ? `<div class="${s.callout.kind === "evidence" ? "ev" : "rec"}"><b>${s.callout.kind === "evidence" ? "Research evidence" : "Professional recommendation"}.</b> ${e(s.callout.text)}${s.callout.refs ? ` [${s.callout.refs.join(", ")}]` : ""}</div>` : ""}`).join("")}
<h3>Model performances</h3><p class="small">Illustrative, composite and fictional.</p>${b.examples.map((x) => `<p><b>${e(x.title)}</b> — <i>${e(x.setting)}</i><br>${e(x.text)}</p>`).join("")}
<h3>Common practice traps</h3><table><tr><th>Trap</th><th>Instead</th></tr>${b.mistakes.map((m) => typeof m === "string" ? "" : `<tr><td>${e(m.mistake)}</td><td>${e(m.correction)}</td></tr>`).join("")}</table>
<h3>Demonstration</h3><p>${e(b.demonstration)}</p><h3>References</h3><ol class="small">${(b.references ?? []).map((r) => `<li>${e(r)}</li>`).join("")}</ol>`;
const readiness = `<h2 class="page">Part 2 · Readiness Check (5 questions, pass mark 70%)</h2>${w.quiz!.map((q, i) => `<p><b>${i + 1}. ${q.scenario ? "[Scenario] " : ""}${e(q.prompt)}</b></p><ul>${q.options.map((o, k) => `<li>${"ABCD"[k]}. ${e(o)}${k === q.correct ? " <b>✓ correct</b>" : ""}</li>`).join("")}</ul><p class="small">Explanation: ${e(q.explanation)}</p>`).join("")}`;
const finalTask = `<h2>Part 3 · Final Task</h2><p>${e(w.assignment!.brief)}</p><p><i>Minimum ${w.assignment!.min_words} words · required for completion.</i></p>`;
const strip = (html: string) => html.replace(/<div class="cover">[\s\S]*?<\/div>/, "");
const review = `<p class="tag">The Medical Speaking Academy · Curriculum review</p><h1>${e(title)} — complete package for review</h1>${notes}${briefing}${readiness}${finalTask}
<h2 class="page">Part 4 · Workshop Pack: Participant Workbook</h2>${strip(workbook)}<h2 class="page">Part 5 · Workshop Pack: Assessment Rubric</h2>${strip(rubricDoc)}<h2 class="page">Part 6 · Workshop Pack: Pressure Cards</h2>${strip(cardsDoc)}<h2 class="page">Part 7 · Workshop Pack: Facilitator Guide</h2>${strip(facilitator)}`;

(async () => {
  mkdirSync("public/materials/workshops", { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const out: [string, string, string][] = [
    [`public/materials/workshops/${code}-participant-workbook.pdf`, workbook, "Participant Workbook"],
    [`public/materials/workshops/${code}-assessment-rubric.pdf`, rubricDoc, "Assessment Rubric"],
    [`public/materials/workshops/${code}-pressure-cards.pdf`, cardsDoc, "Pressure Cards"],
    [`public/materials/workshops/${code}-facilitator-guide.pdf`, facilitator, "Facilitator Guide"],
    [`docs/curriculum/workshop-${code}-complete.pdf`, review, "Complete package"],
  ];
  for (const [file, html, label] of out) {
    await page.setContent(`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>The Medical Speaking Academy · ${code} ${label}</title><style>${css}</style></head><body>${html}</body></html>`);
    await page.pdf({ path: file, format: "A4", printBackground: true, tagged: true, outline: true, displayHeaderFooter: true, headerTemplate: "<span></span>",
      footerTemplate: `<div style="font:7px Helvetica;color:#646b77;width:100%;text-align:center">The Medical Speaking Academy · ${code} ${label} · <span class="pageNumber"></span>/<span class="totalPages"></span></div>`,
      margin: { top: "15mm", bottom: "16mm", left: "15mm", right: "15mm" } });
    console.log("wrote", file);
  }
  await browser.close();
})();
