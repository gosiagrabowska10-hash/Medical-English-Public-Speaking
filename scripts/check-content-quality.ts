/**
 * Content quality gate applied to EVERY authored lesson and workshop (W1 Quality Gate F14).
 * New workshops (W2–W6) must pass the same rules automatically.
 *   npx tsx scripts/check-content-quality.ts
 */
import { existsSync } from "node:fs";
import { lessonSpecs } from "../src/content/lessons";
import { teachingWords, type WorkshopSpec } from "../src/content/lesson-types";

let fails = 0, passes = 0;
/** Lessons approved before the answer-position rule (26 Nov 2026); their text is not changed without approval. */
const APPROVED_BEFORE_RULE = ["L01", "L02", "L03", "L07", "L08", "L09"];
const check = (ok: boolean, what: string) => { if (ok) passes++; else { fails++; console.log(`FAIL ${what}`); } };

const authored = lessonSpecs.filter((l) => l.status === "ready" && l.body);
for (const l of authored) {
  const isWs = "workshop" in l;
  const words = teachingWords(l.body!);
  if (!isWs) check(words >= 1200 && words <= 1800, `${l.code}: teaching words ${words} within 1,200–1,800`);
  check((l.body!.references ?? []).length >= 1, `${l.code}: at least one reference`);
  check((l.body!.objectives ?? []).length >= 3, `${l.code}: at least three learning objectives`);
  // Quizzes: options are shuffled on display (lesson-tabs optionOrder), so the source order
  // cannot be guessed by learners. New content must also vary positions at source.
  const qs = l.quiz ?? [];
  if (qs.length >= 4) {
    const pos = qs.map((q) => q.correct);
    const most = Math.max(...[0, 1, 2, 3].map((i) => pos.filter((p) => p === i).length));
    const varied = most / qs.length <= 0.6 && new Set(pos).size >= 3;
    if (APPROVED_BEFORE_RULE.includes(l.code)) { if (!varied) console.log(`NOTE ${l.code}: source answer positions ${pos.join(",")} (approved text unchanged; display order is shuffled)`); }
    else check(varied, `${l.code}: correct-answer positions varied at source (${pos.join(",")})`);
  }
  for (const q of qs) check(!q.options.some((o) => /all of the above|none of the above/i.test(o)), `${l.code}: no order-dependent options`);
  for (const q of qs) check(q.correct >= 0 && q.correct < q.options.length, `${l.code}: quiz answer index in range`);
  // Media and materials
  if (l.video) {
    check(!!l.video.captions && existsSync("public" + l.video.captions), `${l.code}: video has a captions file (transcript is generated from it)`);
  }
  for (const r of l.resources ?? []) check(existsSync("public" + r.file_url), `${l.code}: resource exists ${r.file_url}`);
  // Honesty: no promises of unbuilt features or of storing recordings
  const all = JSON.stringify(l).toLowerCase();
  for (const banned of ["submit it for analysis", "upload your recording", "ai will assess", "accredited", "cme points", "cpd points"]) {
    check(!all.includes(banned), `${l.code}: does not contain "${banned}"`);
  }

  if (isWs) {
    const w = (l as WorkshopSpec).workshop;
    const fac = w.readinessMinutes.facilitated + w.steps.reduce((n, s) => n + s.facilitatedMinutes, 0);
    check(fac === 120, `${l.code}: facilitated total ${fac} = 120 minutes`);
    const lo = w.readinessMinutes.selfPaced[0] + w.steps.reduce((n, s) => n + s.selfPacedMinutes[0], 0);
    const hi = w.readinessMinutes.selfPaced[1] + w.steps.reduce((n, s) => n + s.selfPacedMinutes[1], 0);
    check(lo >= 150 && hi <= 210, `${l.code}: self-paced total ${lo}–${hi} within 150–210 minutes`);
    const n = w.rubric.length;
    check(n >= 4, `${l.code}: rubric has at least four criteria`);
    check(w.competence.min <= n && w.competence.required.every((r) => r >= 1 && r <= n), `${l.code}: competence rule refers to existing criteria`);
    check(w.rubric.every((r) => r.levels.beginning && r.levels.developing && r.levels.competent && r.examples.competent), `${l.code}: every criterion has three level descriptors and examples`);
    check(w.outcomes.every((o) => o.evidence && o.producedIn), `${l.code}: every outcome mapped to a step and evidence`);
    check(/workshop completed/i.test(w.completionRule) && /instructor/i.test(w.completionRule) && /never by self-assessment/i.test(w.completionRule), `${l.code}: completion rule distinguishes Workshop Completed from instructor-confirmed Competent`);
    check(["round1", "round2", "round3"].every((k) => w.steps.some((s) => s.key === k)), `${l.code}: three practice rounds`);
    check(w.steps.every((s) => s.facilitator && s.output && s.instructions.length > 0), `${l.code}: every step has instructions, an output and facilitator notes`);
    const headings = l.body!.sections.map((s) => s.heading.toLowerCase());
    check(headings.includes("your recordings and your privacy"), `${l.code}: has the recordings and privacy section`);
    check(headings.includes("if you need an adjustment"), `${l.code}: has the adjustments section`);
    check(w.facilitatorGeneral.some((g) => /recording ground rules/i.test(g)), `${l.code}: facilitator guide states recording ground rules`);
    check(w.facilitatorGeneral.some((g) => /^adjustments/i.test(g)), `${l.code}: facilitator guide covers adjustments`);
    check(w.pressureCards.filter((c) => c.intensity === "standard").length >= 6, `${l.code}: at least six standard pressure cards`);
    check((l.assignment?.min_words ?? 0) >= 250 && !!l.assignment?.required, `${l.code}: written Final Task required (≥ 250 words)`);
    check(/workshop completed/i.test(l.assignment?.brief ?? "") && /competent/i.test(l.assignment?.brief ?? ""), `${l.code}: Final Task explains both statuses`);
    check((l.resources ?? []).length >= 4, `${l.code}: Workshop Pack has at least four documents`);
  }
}
console.log(`\nContent quality gate: ${authored.length} authored items, ${passes} checks passed, ${fails} failed`);
process.exit(fails ? 1 : 0);
