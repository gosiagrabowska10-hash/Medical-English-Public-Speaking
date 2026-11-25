/**
 * Builds the lesson review document from the SAME source used to seed the platform,
 * so reviewers read exactly what students will see.
 *   npx tsx scripts/generate-lesson-review.ts L01 L02 L03 L07
 * Output: docs/curriculum/lesson-review-<codes>.md (+ .html for PDF rendering)
 */
import { writeFileSync, readFileSync } from "node:fs";
import { marked } from "marked";
import { modules } from "../src/content/curriculum";
import { lessonSpecs, type LessonSpec } from "../src/content/lessons";

const codes = process.argv.slice(2);
const introFile = "docs/curriculum/review-notes.md";
const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
const letters = "ABCDEF";

function lessonWords(s: LessonSpec) {
  const b = s.body!;
  return words([b.intro, ...b.objectives, ...b.sections.flatMap((x) => [x.heading, ...x.paragraphs]), ...b.examples.flatMap((e) => [e.title, e.text]), b.demonstration, ...b.mistakes, ...b.reflection].join(" "));
}

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
    `| Written lesson length | ${lessonWords(s)} words |`, "");
  out.push(`### Introduction`, "", b.intro, "");
  out.push(`### Learning objectives`, "", ...b.objectives.map((o) => `- ${o}`), "");
  out.push(`### Lesson content`, "");
  for (const sec of b.sections) out.push(`#### ${sec.heading}`, "", ...sec.paragraphs.flatMap((p) => [p, ""]));
  out.push(`### Professional examples`, "", ...b.examples.flatMap((e) => [`**${e.title}.** ${e.text}`, ""]));
  out.push(`### Demonstration (video brief)`, "", b.demonstration, "");
  out.push(`### Common mistakes`, "", ...b.mistakes.map((x) => `- ${x}`), "");
  out.push(`### Reflection`, "", ...b.reflection.map((x) => `- ${x}`), "");
  if (s.exercise) out.push(`### Practical exercise — ${s.exercise.title}`, "", s.exercise.instructions, "", `*Student prompt:* ${s.exercise.prompt}`, "", `*Minimum response:* ${s.exercise.min_chars} characters`, "");
  if (s.quiz) {
    out.push(`### Knowledge check (${s.quiz.length} questions · pass mark 70%)`, "");
    s.quiz.forEach((q, i) => {
      out.push(`**${i + 1}. ${q.prompt}**`, "");
      q.options.forEach((o, k) => out.push(`- ${letters[k]}. ${o}${k === q.correct ? " **✓ correct**" : ""}`));
      out.push("", `*Explanation shown to the student:* ${q.explanation}`, "");
    });
  }
  if (s.assignment) out.push(`### Assignment — ${s.assignment.title}`, "", s.assignment.brief, "", `*Minimum length:* ${s.assignment.min_words} words · ${s.assignment.required ? "Required for completion" : "Optional"}`, "");
  out.push(`### Downloadable materials`, "", ...(s.resources?.length ? s.resources.map((r) => `- **${r.title}**${r.is_sample ? " (sample)" : ""} — ${r.description} \`${r.file_url}\``) : ["- None for this lesson yet."]), "");
  const reqs = [s.exercise && "save the practical exercise", s.quiz && "pass the knowledge check (70%)", s.assignment?.required && "submit the assignment"].filter(Boolean);
  out.push(`### Completion criteria`, "", `The lesson can be marked complete only after the student has ${reqs.join(", ")}. This is enforced by the database.`, "", "---", "");
  return out.join("\n");
}

const specs = codes.map((c) => { const s = lessonSpecs.find((x) => x.code === c); if (!s?.body) throw new Error(`${c} has no authored content`); return s; });
const md = [readFileSync(introFile, "utf8"), ...specs.map(render)].join("\n");
const base = `docs/curriculum/lesson-review-${codes.join("-")}`;
writeFileSync(`${base}.md`, md);
const css = `@page{size:A4;margin:20mm 18mm}body{font:10.5pt/1.6 Helvetica,Arial,sans-serif;color:#2b3442;max-width:100%}
h1,h2,h3,h4{font-family:Georgia,'Times New Roman',serif;color:#101B2D;font-weight:400}h1{font-size:28pt;margin:0 0 4pt}
h2{font-size:19pt;border-top:1px solid #B69A68;padding-top:12pt;margin-top:22pt}h2.lesson{page-break-before:always}
h3{font-size:13.5pt;margin:18pt 0 4pt;color:#18283C}h4{font-size:11.5pt;margin:12pt 0 2pt}
table{border-collapse:collapse;width:100%;font-size:9.5pt;margin:6pt 0}td,th{border-bottom:1px solid #e9e7e1;padding:4pt 6pt;text-align:left;vertical-align:top}
code{font-size:8.5pt;color:#7A6235}strong{color:#101B2D}em{color:#4a5568}blockquote{border-left:2px solid #B69A68;margin:8pt 0;padding:2pt 10pt;background:#F7F4EE}
.tag{font:600 8pt Helvetica;letter-spacing:.28em;color:#7A6235;text-transform:uppercase}hr{border:0}`;
let html = marked.parse(md) as string;
html = html.replace(/<h2>((?:L\d{2}|W\d) ·)/g, '<h2 class="lesson">$1');
writeFileSync(`${base}.html`, `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Lesson review</title><style>${css}</style></head><body><p class="tag">The Medical Speaking Academy · Curriculum review</p>${html}</body></html>`);
console.log(`Wrote ${base}.md and .html`);
