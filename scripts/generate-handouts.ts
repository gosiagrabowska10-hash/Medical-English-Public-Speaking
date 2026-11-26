/**
 * Generates a branded PDF handout for every fully authored lesson, from the
 * same content that seeds the platform.   npx tsx scripts/generate-handouts.ts
 * Output: public/materials/lessons/<CODE>-handout.pdf
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { modules } from "../src/content/curriculum";
import { lessonSpecs } from "../src/content/lessons";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const css = `@page{size:A4;margin:18mm 17mm 20mm}*{box-sizing:border-box}body{font:10pt/1.55 Helvetica,Arial,sans-serif;color:#2b3442}
.tag{font:600 7.5pt Helvetica;letter-spacing:.3em;color:#7A6235;text-transform:uppercase}
h1{font:400 24pt Georgia,serif;color:#101B2D;margin:6pt 0 2pt}h2{font:400 14pt Georgia,serif;color:#101B2D;margin:16pt 0 6pt;border-top:1px solid #B69A68;padding-top:8pt}
.sub{color:#646b77;margin:0 0 6pt}ul{margin:4pt 0;padding-left:14pt}li{margin:2pt 0}
table{width:100%;border-collapse:collapse;font-size:8.8pt}td,th{border-bottom:1px solid #e9e7e1;padding:5pt 4pt;vertical-align:top;text-align:left}th{font-size:7.5pt;letter-spacing:.12em;text-transform:uppercase;color:#646b77}
.ph{font:400 10.5pt Georgia,serif;color:#101B2D}.box{border:1px solid #d5d1c7;border-radius:2px;min-height:70pt;margin:4pt 0 8pt}
.rec{background:#F7F4EE;border-left:2px solid #B69A68;padding:6pt 9pt;margin:5pt 0}.ev{background:#eef2f8;border-left:2px solid #2b4c7e;padding:6pt 9pt;margin:5pt 0}
.small{font-size:8pt;color:#646b77}.page{page-break-before:always}`;

(async () => {
  mkdirSync("public/materials/lessons", { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const s of lessonSpecs.filter((l) => l.body && l.status === "ready" && !("workshop" in l))) {
    const b = s.body!;
    const m = modules.find((mm) => mm.lessons.some((l) => l.code === s.code))!;
    const title = m.lessons.find((l) => l.code === s.code)!.title;
    const callouts = b.sections.filter((x) => x.callout).map((x) => `<div class="${x.callout!.kind === "evidence" ? "ev" : "rec"}"><b>${x.callout!.kind === "evidence" ? "Research evidence" : "Professional recommendation"} — ${esc(x.heading)}.</b> ${esc(x.callout!.text)}${x.callout!.refs ? ` [${x.callout!.refs.join(", ")}]` : ""}</div>`).join("");
    const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>${s.code} · ${esc(title)} — The Medical Speaking Academy</title><style>${css}</style></head><body>
<p class="tag">The Medical Speaking Academy · Lesson handout</p>
<h1>${s.code} · ${esc(title)}</h1><p class="sub">Module ${String(m.number).padStart(2, "0")} · ${esc(m.title)} · Week ${s.week}</p>
<h2>Learning objectives</h2><ul>${b.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
<h2>Key points</h2>${b.sections.map((x) => `<p><b>${esc(x.heading)}${/[?!.]$/.test(x.heading) ? "" : "."}</b> ${esc(x.paragraphs[0].split(". ").slice(0, 2).join(". "))}${x.paragraphs[0].split(". ").length > 2 ? "." : ""}</p>`).join("")}
${callouts}
<h2>Common mistakes</h2><table><tr><th>Mistake</th><th>Instead</th></tr>${b.mistakes.map((x) => typeof x === "string" ? `<tr><td colspan=2>${esc(x)}</td></tr>` : `<tr><td>${esc(x.mistake)}</td><td>${esc(x.correction)}</td></tr>`).join("")}</table>
<h2 class="page">Phrase bank</h2><table><tr><th style="width:34%">Expression</th><th>Use · register · pronunciation</th><th style="width:34%">Example</th></tr>
${(b.phrase_bank ?? []).map((p) => `<tr><td class="ph">${esc(p.phrase)}</td><td>${esc(p.use)}<br><span class="small">${esc(p.register)}${p.pronunciation ? " · " + esc(p.pronunciation) : ""}</span></td><td><i>${esc(p.example)}</i></td></tr>`).join("")}</table>
${b.phrase_practice ? `<div class="rec">${esc(b.phrase_practice)}</div>` : ""}
${s.exercise ? `<h2 class="page">Exercise — ${esc(s.exercise.title)}</h2><p>${esc(s.exercise.instructions)}</p><ol>${(s.exercise.steps ?? []).map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
<div class="box" style="min-height:230pt"></div><p><b>Self-check</b></p><ul>${(s.exercise.self_check ?? []).map((x) => `<li>☐ ${esc(x)}</li>`).join("")}</ul>` : ""}
${s.assignment ? `<h2>Assignment — ${esc(s.assignment.title)}</h2><p>${esc(s.assignment.brief)}</p><table><tr><th>Criterion</th><th>What instructors look for</th></tr>${(s.assignment.criteria ?? []).map((c) => `<tr><td>${esc(c.criterion)}</td><td>${esc(c.description)}</td></tr>`).join("")}</table>` : ""}
${b.references?.length ? `<h2>References</h2><ol class="small">${b.references.map((r) => `<li>${esc(r)}</li>`).join("")}</ol>` : ""}
<p class="small" style="margin-top:14pt">Examples in the lesson are illustrative and composite. Research evidence summarises the cited sources; professional recommendations are practical guidance from the Academy. Content pending approval by the Academic Director.</p>
</body></html>`;
    await page.setContent(html);
    const file = `public/materials/lessons/${s.code}-handout.pdf`;
    await page.pdf({ path: file, format: "A4", printBackground: true, tagged: true, outline: true, displayHeaderFooter: true, headerTemplate: "<span></span>",
      footerTemplate: `<div style="font:7px Helvetica;color:#646b77;width:100%;text-align:center">The Medical Speaking Academy · ${s.code} handout · <span class="pageNumber"></span>/<span class="totalPages"></span></div>`,
      margin: { top: "16mm", bottom: "16mm", left: "15mm", right: "15mm" } });
    console.log("wrote", file);
  }
  await browser.close();
})();
