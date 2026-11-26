/**
 * Checks that every technique a workshop refers to exists, by name, in the lessons
 * it builds on, and that IPA in the term card matches the verification log.
 *   npx tsx scripts/check-workshop-consistency.ts
 */
import { readFileSync, existsSync } from "node:fs";
import { lessonSpecs } from "../src/content/lessons";
import { W1 } from "../src/content/workshops/w1";

const text = (code: string) => JSON.stringify(lessonSpecs.find((l) => l.code === code)).toLowerCase();
const checks: [string, string, string][] = [
  ["L07", "look, pause, conclude", "Data-slide sequence (Station A, rubric)"],
  ["L07", "thought group", "Thought groups and / // marking"],
  ["L07", "one patient in seven", "Restating numbers in a concrete form"],
  ["L07", "fifteen", "fifteen/fifty contrast"],
  ["L08", "five steps", "Two-minute voice warm-up (Station B)"],
  ["L08", "turn and look, turn back, then speak", "Microphone sequence (Station B, readiness check)"],
  ["L08", "↘", "Falling-tone marking"],
  ["L08", "back wall", "Projection target"],
  ["L09", "neutral position", "Stance (Station C)"],
  ["L09", "sections", "Sectioned eye contact (Station C)"],
  ["L09", "into the lens", "Online eye contact"],
  ["L09", "without sound", "Silent video audit"],
  ["L02", "pause and breathe", "Three-step recovery, step 1"],
  ["L02", "bridge back", "Three-step recovery, step 3"],
  ["L01", "please stop me if anything is unclear", "Opening without apology (rubric 1)"],
];
let fails = 0;
for (const [code, needle, what] of checks) {
  const ok = text(code).includes(needle.toLowerCase());
  if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"} ${code} contains "${needle}" — ${what}`);
}
const log = readFileSync("docs/curriculum/pronunciation-verification.md", "utf8");
for (const t of W1.workshop.termCard) {
  const parts = t.ipa.split(" · ").map((p) => p.replace(/\//g, ""));
  const ok = parts.every((p) => log.includes(p) || log.includes(p.replace(/\./g, "")) || log.includes(p.replace(/^ɪ/, "i")));
  if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"} term card "${t.term}" IPA ${t.ipa} matches the verification log`);
}
for (const r of W1.resources ?? []) {
  const ok = existsSync("public" + r.file_url);
  if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"} resource exists: ${r.file_url}`);
}
const fac = W1.workshop.readinessMinutes.facilitated + W1.workshop.steps.reduce((n, s) => n + s.facilitatedMinutes, 0);
console.log(`${fac === 120 ? "PASS" : "FAIL"} facilitated total = ${fac} minutes`); if (fac !== 120) fails++;
const lo = W1.workshop.readinessMinutes.selfPaced[0] + W1.workshop.steps.reduce((n, s) => n + s.selfPacedMinutes[0], 0);
const hi = W1.workshop.readinessMinutes.selfPaced[1] + W1.workshop.steps.reduce((n, s) => n + s.selfPacedMinutes[1], 0);
const inRange = lo >= 150 && hi <= 210;
console.log(`${inRange ? "PASS" : "FAIL"} self-paced total = ${lo}–${hi} minutes (approved: about 2.5–3.5 hours)`); if (!inRange) fails++;
console.log(fails ? `\n${fails} INCONSISTENCIES` : "\nALL CONSISTENCY CHECKS PASSED");
process.exit(fails ? 1 : 0);
