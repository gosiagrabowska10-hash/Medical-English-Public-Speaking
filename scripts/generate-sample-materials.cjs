/** Generates the clearly-labelled SAMPLE worksheets in public/materials/sample (Playwright → PDF). */
const { chromium } = require('playwright');
const css = `@page{size:A4;margin:22mm}body{font-family:Georgia,serif;color:#101B2D}
.tag{font:600 9px/1 Helvetica,Arial,sans-serif;letter-spacing:.3em;color:#7A6235;text-transform:uppercase}
h1{font-weight:400;font-size:30px;margin:10px 0 4px}.rule{width:40px;height:1px;background:#B69A68;margin:14px 0 18px}
p,li{font:13px/1.6 Helvetica,Arial,sans-serif;color:#4a5568}.box{border:1px solid #d5d1c7;min-height:90px;margin:8px 0 18px;border-radius:2px}
h2{font-weight:400;font-size:18px;margin:18px 0 4px}.sample{position:fixed;bottom:0;left:0;right:0;font:11px Helvetica,Arial;color:#8a5a14;background:#f5ecdc;padding:8px 12px}`;
const docs = [
  { file: 'speaking-profile-worksheet.pdf', title: 'Speaking Profile Worksheet', sub: 'Module 1 · Lesson 1',
    body: `<h2>1. My current speaking situations</h2><p>Where and to whom do you speak in English today?</p><div class="box"></div>
<h2>2. My speaking triggers</h2><p>When do you notice the strongest self-monitoring?</p><div class="box"></div>
<h2>3. In ten weeks I would like to…</h2><div class="box"></div><h2>4. One talk I want to give with confidence</h2><div class="box"></div>` },
  { file: 'pace-and-pause-worksheet.pdf', title: 'Pace and Pause Worksheet', sub: 'Module 3 · Lesson 7',
    body: `<p>Write a 60–100 word passage from one of your talks. Mark each pause with <b>/</b> and CAPITALISE the one stressed word per sentence.</p><div class="box" style="min-height:220px"></div>
<h2>Reading 1 — natural</h2><p>Approximate time: ______ seconds</p><h2>Reading 2 — with marks</h2><p>Approximate time: ______ seconds</p>
<h2>What changed?</h2><div class="box"></div><p>Reference: many speakers find 130–160 words per minute comfortable for international medical audiences.</p>` },
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const d of docs) {
    await p.setContent(`<html><head><style>${css}</style></head><body><div class="tag">The Medical Speaking Academy</div><h1>${d.title}</h1><p>${d.sub}</p><div class="rule"></div>${d.body}<div class="sample">SAMPLE MATERIAL — draft worksheet for demonstration. The final Academy workbook will replace it.</div></body></html>`);
    await p.pdf({ path: `public/materials/sample/${d.file}`, format: 'A4', printBackground: true });
    console.log('wrote', d.file);
  }
  await b.close();
})();
