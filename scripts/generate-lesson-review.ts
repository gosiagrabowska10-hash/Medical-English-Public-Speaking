/**
 * Builds the lesson review document from the SAME source used to seed the platform,
 * so reviewers read exactly what students will see.
 *   npx tsx scripts/generate-lesson-review.ts L01 L02 L03 L07
 * Output: docs/curriculum/lesson-review-<codes>.md (+ .html for PDF rendering)
 */
import { writeFileSync, readFileSync } from "node:fs";
import { marked } from "marked";
import { modules } from "../src/content/curriculum";
import { lessonSpecs } from "../src/content/lessons";
import { teachingWords, type LessonSpec } from "../src/content/lesson-types";

const args = process.argv.slice(2);
const version = args.find((a) => a.startsWith("--v="))?.slice(4) ?? "";
const codes = args.filter((a) => !a.startsWith("--"));
const introFile = args.find((a) => a.startsWith("--notes="))?.slice(8) ?? `docs/curriculum/review-notes${version ? "-v" + version : ""}.md`;
const letters = "ABCDEF";

function render(s: LessonSpec): string {
  const m = modules.find((mm) => mm.lessons.some((l) => l.code === s.code) || mm.workshop?.code === s.code)!;
  const meta = m.lessons.find((l) => l.code === s.code) ?? m.workshop!;
  const b = s.body!;
  const out: string[] = [];
  out.push(`## ${s.code} · ${meta.title}`, "");
  out.push(`| | |`, `|---|---|`,
    `| Module | ${String(m.number).padStart(2, "0")} · ${m.title} |`,
    `| Week · duration | Week ${s.week} · ${s.minutes} minutes (video, reading, exercise, quiz and assignment) |`,
    `| AI teacher | ${s.aiTeacher.replace(/-/g, " ")} |`,
    `| Access | ${s.preview ? "Preview lesson (open to registered students before enrolment)" : "Enrolled students"} |`,
    `| Video | ${s.video ? `Sample video only — ${s.video.note}` : "Instructor recording not yet produced"} |`,
    `| Teaching content | **${teachingWords(b)} words** (introduction, sections, evidence and recommendation notes, examples; excludes quiz, phrase bank, headings and instructions) |`,
    `| Components | ${b.examples.length} examples · ${b.phrase_bank?.length ?? 0} phrases · ${s.quiz?.length ?? 0} quiz questions (${s.quiz?.filter((q) => q.scenario).length ?? 0} scenario-based) · ${b.references?.length ?? 0} references |`, "");
  out.push(`### Introduction`, "", b.intro, "");
  out.push(`### Learning objectives`, "", "By the end of this lesson you will be able to:", "", ...b.objectives.map((o) => `- ${o}`), "");
  out.push(`### Teaching content`, "");
  for (const sec of b.sections) {
    out.push(`#### ${sec.heading}`, "", ...sec.paragraphs.flatMap((p) => [p, ""]));
    if (sec.callout) out.push(`> **${sec.callout.kind === "evidence" ? "Research evidence" : "Professional recommendation"}.** ${sec.callout.text}${sec.callout.refs ? ` [${sec.callout.refs.join(", ")}]` : ""}`, "");
  }
  out.push(`### Professional examples`, "", "*Illustrative, composite examples; names and details are fictional.*", "");
  for (const e of b.examples) out.push(`**${e.title}** — *${e.setting}*`, "", e.text, "");
  if (b.phrase_bank?.length) {
    out.push(`### Phrase bank`, "", `| Expression | Use | Register | Pronunciation | Example in a presentation |`, `|---|---|---|---|---|`);
    for (const p of b.phrase_bank) out.push(`| **${p.phrase}** | ${p.use} | ${p.register} | ${p.pronunciation ?? "—"} | *${p.example}* |`);
    out.push("");
    if (b.phrase_practice) out.push(`*Using these in your presentations:* ${b.phrase_practice}`, "");
  }
  out.push(`### Demonstration (video brief)`, "", b.demonstration, "");
  out.push(`### Common mistakes`, "", `| Mistake | Instead |`, `|---|---|`, ...b.mistakes.map((x) => typeof x === "string" ? `| ${x} | — |` : `| ${x.mistake} | ${x.correction} |`), "");
  out.push(`### Reflection`, "", ...b.reflection.map((x) => `- ${x}`), "");
  if (s.exercise) {
    const e = s.exercise;
    out.push(`### Practical exercise — ${e.title}`, "", e.instructions, "", ...(e.steps ?? []).map((x, i) => `${i + 1}. ${x}`), "", `*Student prompt:* ${e.prompt} · *Minimum:* ${e.min_chars} characters`, "");
    if (e.self_check) out.push(`**Self-check**`, "", ...e.self_check.map((x) => `- ${x}`), "");
    if (e.model_answer) out.push(`**Model answer** *(fictional example; shown to the student only after they save their own response)*`, "", ...e.model_answer.split("\n").flatMap((l) => [l ? `> ${l}` : ">"]), "");
  }
  if (s.quiz) {
    out.push(`### Knowledge check (${s.quiz.length} questions · pass mark 70%)`, "");
    s.quiz.forEach((q, i) => {
      out.push(`**${i + 1}. ${q.scenario ? "[Scenario] " : ""}${q.prompt}**`, "");
      q.options.forEach((o, k) => out.push(`- ${letters[k]}. ${o}${k === q.correct ? " **✓ correct**" : ""}`));
      out.push("", `*Explanation shown to the student:* ${q.explanation}`, "");
    });
  }
  if (s.assignment) {
    const a = s.assignment;
    out.push(`### Assignment — ${a.title}`, "", a.brief, "", `*Minimum length:* ${a.min_words} words · ${a.required ? "Required for completion" : "Optional"}`, "");
    if (a.criteria) out.push(`| Assessment criterion | What instructors look for |`, `|---|---|`, ...a.criteria.map((c) => `| ${c.criterion} | ${c.description} |`), "");
  }
  out.push(`### Downloadable materials`, "", ...(s.resources?.length ? s.resources.map((r) => `- **${r.title}**${r.is_sample ? " (sample)" : ""} — ${r.description} \`${r.file_url}\``) : ["- None for this lesson yet."]), "");
  if (b.references?.length) out.push(`### References`, "", ...b.references.map((r, i) => `${i + 1}. ${r}`), "");
  const reqs = [s.exercise && "save the practical exercise", s.quiz && "pass the knowledge check (70%)", s.assignment?.required && "submit the assignment"].filter(Boolean);
  out.push(`### Completion criteria`, "", `The lesson can be marked complete only after the student has ${reqs.join(", ")}. This is enforced by the database.`, "", "---", "");
  return out.join("\n");
}

const specs = codes.map((c) => { const s = lessonSpecs.find((x) => x.code === c); if (!s?.body) throw new Error(`${c} has no authored content`); return s; });
const md = [readFileSync(introFile, "utf8"), ...specs.map(render)].join("\n");
const base = `docs/curriculum/lesson-review-${codes.join("-")}${version ? "-v" + version : ""}`;
writeFileSync(`${base}.md`, md);
const css = `@page{size:A4;margin:20mm 18mm}body{font:10.5pt/1.6 Helvetica,Arial,sans-serif;color:#2b3442;max-width:100%}
h1,h2,h3,h4{font-family:Georgia,'Times New Roman',serif;color:#101B2D;font-weight:400}h1{font-size:28pt;margin:0 0 4pt}
h2{font-size:19pt;border-top:1px solid #B69A68;padding-top:12pt;margin-top:22pt}h2.lesson{page-break-before:always}
h3{font-size:13.5pt;margin:18pt 0 4pt;color:#18283C;page-break-after:avoid;break-after:avoid}table,blockquote{break-inside:avoid}h4{font-size:11.5pt;margin:12pt 0 2pt}
table{border-collapse:collapse;width:100%;font-size:9.5pt;margin:6pt 0}td,th{border-bottom:1px solid #e9e7e1;padding:4pt 6pt;text-align:left;vertical-align:top}
code{font-size:8.5pt;color:#7A6235}strong{color:#101B2D}em{color:#4a5568}blockquote{border-left:2px solid #B69A68;margin:8pt 0;padding:2pt 10pt;background:#F7F4EE}blockquote p{margin:3pt 0}
.tag{font:600 8pt Helvetica;letter-spacing:.28em;color:#7A6235;text-transform:uppercase}hr{border:0}`;
let html = marked.parse(md) as string;
html = html.replace(/<h2>((?:L\d{2}|W\d) ·)/g, '<h2 class="lesson">$1');
writeFileSync(`${base}.html`, `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Lesson review</title><style>${css}</style></head><body><p class="tag">The Medical Speaking Academy · Curriculum review</p>${html}</body></html>`);
console.log(`Wrote ${base}.md and .html`);
