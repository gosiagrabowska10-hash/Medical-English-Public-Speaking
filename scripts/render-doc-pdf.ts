/**
 * Renders a Markdown document to a branded A4 PDF.
 *   npx tsx scripts/render-doc-pdf.ts docs/curriculum/workshop-W1-structure.md
 */
import { readFileSync } from "node:fs";
import { marked } from "marked";
import { chromium } from "playwright";

const src = process.argv[2];
if (!src) throw new Error("Usage: render-doc-pdf <file.md>");
const out = src.replace(/\.md$/, ".pdf");
const css = `body{font:10.3pt/1.58 Helvetica,Arial,sans-serif;color:#2b3442}
h1,h2,h3,h4{font-family:Georgia,'Times New Roman',serif;color:#101B2D;font-weight:400;break-after:avoid}
h1{font-size:25pt;margin:0 0 6pt}h2{font-size:17pt;border-top:1px solid #B69A68;padding-top:10pt;margin-top:20pt}h3{font-size:12.5pt;margin:14pt 0 4pt}
table{border-collapse:collapse;width:100%;font-size:8.8pt;margin:6pt 0;break-inside:avoid}td,th{border-bottom:1px solid #e9e7e1;padding:4pt 5pt;text-align:left;vertical-align:top}th{color:#6b7280;font-size:7.8pt;text-transform:uppercase;letter-spacing:.08em}
pre{background:#F7F4EE;border-left:2px solid #B69A68;padding:8pt 10pt;font-size:8.2pt;line-height:1.45;white-space:pre;overflow:hidden;break-inside:avoid}
code{font-size:8.6pt;color:#7A6235}strong{color:#101B2D}em{color:#4a5568}hr{border:0;border-top:1px solid #e9e7e1;margin:12pt 0}
blockquote{border-left:2px solid #B69A68;margin:8pt 0;padding:2pt 10pt;background:#F7F4EE}.tag{font:600 7.5pt Helvetica;letter-spacing:.28em;color:#7A6235;text-transform:uppercase}`;
(async () => {
  const html = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><style>${css}</style></head><body><p class="tag">The Medical Speaking Academy · Curriculum review</p>${marked.parse(readFileSync(src, "utf8"))}</body></html>`;
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(html);
  await p.pdf({ path: out, format: "A4", printBackground: true, displayHeaderFooter: true, headerTemplate: "<span></span>",
    footerTemplate: `<div style="font:7px Helvetica;color:#6b7280;width:100%;text-align:center">The Medical Speaking Academy · <span class="pageNumber"></span>/<span class="totalPages"></span></div>`,
    margin: { top: "17mm", bottom: "17mm", left: "16mm", right: "16mm" } });
  await b.close(); console.log("wrote", out);
})();
