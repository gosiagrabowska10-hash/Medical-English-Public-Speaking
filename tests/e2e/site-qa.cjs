const { chromium } = require('playwright');
/** Public-site regression: every page at 3 viewports, links, SEO files, contact API.  npm run test:site */
const out = process.env.SCREENSHOT_DIR ?? require('os').tmpdir();
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const pages = ['/','/about','/methodology','/curriculum','/ai-teachers','/speaking-studio','/pricing','/instructors','/founder','/faq','/blog','/blog/how-to-present-research-at-an-international-medical-conference','/contact','/login','/register','/privacy','/terms','/cookies','/design-system','/forgot-password','/reset-password','/auth/check-email'];
let problems = 0;
(async () => {
  const b = await chromium.launch();
  const links = new Set();
  for (const w of [390, 820, 1280, 1440]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    await ctx.addInitScript(() => localStorage.setItem('msa-cookie-consent', JSON.stringify({necessary:true,analytics:false,marketing:false,version:1})));
    for (const path of pages) {
      const p = await ctx.newPage();
      const errs = [];
      p.on('pageerror', e => errs.push(e.message));
      p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
      const r = await p.goto(BASE + path, { waitUntil: 'networkidle' });
      const info = await p.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: document.querySelectorAll('h1').length,
        title: document.title,
        desc: document.querySelector('meta[name=description]')?.content?.length ?? 0,
        canon: document.querySelector('link[rel=canonical]')?.href ?? '',
        robots: document.querySelector('meta[name=robots]')?.content ?? '',
        links: [...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href')),
        imgsNoAlt: [...document.querySelectorAll('img:not([alt])')].length,
      }));
      info.links.forEach(l => links.add(l.split('#')[0].split('?')[0] || '/'));
      const flag = (info.overflow > 0 || info.h1 !== 1 || errs.length || r.status() !== 200) ? '  <<<' : '';
      if (flag) problems++;
      if (w === 1440 || flag) console.log(w, path, r.status(), `overflow=${info.overflow} h1=${info.h1} descLen=${info.desc} robots=${info.robots||'-'}`, errs.length ? errs.slice(0,2) : '', flag);
      if (w === 1440) console.log('   title:', info.title, '| canonical:', info.canon);
      if (['/', '/curriculum', '/pricing', '/login', '/design-system', '/about'].includes(path)) await p.screenshot({ path: `${out}/${path.replace(/\//g,'_')||'home'}-${w}.png`, fullPage: true });
      await p.close();
    }
    await ctx.close();
  }
  // Link check
  const ctx = await b.newContext();
  for (const l of links) {
    const r = await ctx.request.get(BASE + l);
    if (r.status() !== 200) { problems++; console.log('BROKEN LINK', l, r.status()); }
  }
  console.log('links checked:', links.size);
  for (const u of ['/sitemap.xml','/robots.txt','/opengraph-image']) { const r = await ctx.request.get(BASE+u); console.log(u, r.status(), r.headers()['content-type']); }
  const c = await ctx.request.post(BASE + '/api/contact', { data: { name: 'Test', email: 'a@b.co', topic: 'admissions', message: 'Hello there, testing.', consent: true } });
  console.log('contact valid ->', c.status(), await c.text());
  const c2 = await ctx.request.post(BASE + '/api/contact', { data: { name: 'T', email: 'bad', topic: 'x', message: '', consent: false } });
  console.log('contact invalid ->', c2.status(), await c2.text());
  await b.close();
  console.log(problems ? `${problems} PROBLEM(S) FOUND` : 'SITE QA: NO PROBLEMS FOUND');
  process.exit(problems ? 1 : 0);
})();
