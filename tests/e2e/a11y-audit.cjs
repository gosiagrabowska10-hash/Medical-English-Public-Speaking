/**
 * Automated accessibility audit (axe-core; WCAG 2.0/2.1/2.2 A and AA rules) of public pages
 * and the student platform. Automated checks find only part of WCAG issues; manual review is still required.
 *   npm run test:a11y   (app on BASE_URL, local Supabase running)
 */
const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const { confirmedStudent, sql, unlockAllModules } = require('./helpers.cjs');
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const OUT = process.argv.find((a) => a.startsWith('--out='))?.slice(6);
const detail = (v) => v.nodes.slice(0, 40).map((n) => ({ target: n.target.join(' '), html: n.html.slice(0, 140), ...(v.id === 'color-contrast' ? { fg: n.any[0]?.data?.fgColor, bg: n.any[0]?.data?.bgColor, ratio: n.any[0]?.data?.contrastRatio, required: n.any[0]?.data?.expectedContrastRatio } : {}) }));
const mapV = (r) => r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, sample: v.nodes[0]?.target?.join(' '), detail: detail(v) }));
const pub = ['/', '/about', '/methodology', '/curriculum', '/ai-teachers', '/speaking-studio', '/pricing', '/instructors', '/founder', '/faq', '/blog', '/blog/how-to-present-research-at-an-international-medical-conference', '/contact', '/login', '/register', '/forgot-password', '/privacy', '/terms', '/cookies', '/accessibility', '/verify-mfa'];
const app = ['/app', '/app/curriculum', '/app/settings', '/app/teachers', '/app/teachers/voice-coach', '/app/learn/L01', '/app/learn/L07', '/app/learn/L08', '/app/learn/L10', '/app/learn/L11', '/app/learn/L12', '/app/learn/W1'];
(async () => {
  const s = await confirmedStudent('Axe', 'Audit');
  sql(`insert into public.enrollments (user_id) values ('${s.id}')`);
  unlockAllModules(s.id);
  const W1 = sql(`select id from public.lessons where code='W1'`);
  await s.c.rpc('submit_quiz', { _lesson: W1, _answers: [1, 3, 0, 2, 3] });
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem('msa-cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, version: 1 })));
  const p = await ctx.newPage();
  const results = [];
  const scan = async (label) => {
    const r = await new AxeBuilder({ page: p }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    results.push({ page: label, violations: mapV(r), passes: r.passes.length, incomplete: r.incomplete.length });
  };
  for (const u of pub) { await p.goto(BASE + u, { waitUntil: 'networkidle' }); await scan(u); }
  // Cookie banner (first visit)
  const ctx2 = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p2 = await ctx2.newPage(); await p2.goto(BASE + '/', { waitUntil: 'networkidle' });
  { const r = await new AxeBuilder({ page: p2 }).include('[aria-labelledby="cookie-title"]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze(); results.push({ page: 'cookie banner', violations: mapV(r), passes: r.passes.length, incomplete: r.incomplete.length }); }
  await p.goto(BASE + '/login'); await p.fill('#email', s.email); await p.fill('#password', s.password);
  await p.getByRole('button', { name: 'Sign in' }).click(); await p.waitForURL('**/app');
  for (const u of app) { await p.goto(BASE + u, { waitUntil: 'networkidle' }); await scan(u); }
  for (const tab of ['Practice Rounds', 'Readiness Check', 'Workshop Pack', 'Final Task']) {
    await p.evaluate(() => window.scrollTo(0, 0)); await p.getByRole('tab', { name: new RegExp(tab) }).click(); await p.waitForTimeout(300);
    if (tab === 'Practice Rounds') { await p.getByRole('button', { name: /Round 3/ }).click(); await p.waitForTimeout(300); }
    await scan('/app/learn/W1 · ' + tab);
  }
  // Keyboard: first Tab stop on a public page should be the skip link
  await p.goto(BASE + '/'); await p.keyboard.press('Tab');
  const first = await p.evaluate(() => document.activeElement?.textContent?.trim());
  sql(`delete from auth.users where id = '${s.id}'`); await b.close();
  const byRule = {};
  for (const r of results) for (const v of r.violations) { byRule[v.id] ??= { impact: v.impact, help: v.help, pages: [], nodes: 0 }; byRule[v.id].pages.push(r.page); byRule[v.id].nodes += v.nodes; }
  const total = Object.values(byRule).reduce((n, v) => n + v.nodes, 0);
  const report = { date: new Date().toISOString(), pagesScanned: results.length, firstTabStop: first, totalViolations: total, byRule, perPage: results.map((r) => ({ page: r.page, violations: r.violations.length, incomplete: r.incomplete, detail: r.violations })) };
  if (OUT) require('node:fs').writeFileSync(OUT, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ pagesScanned: report.pagesScanned, firstTabStop: first, totalViolations: total, byRule }, null, 2));
  // Gate: fails on any violation or if the first Tab stop is not the skip link
  if (total > 0 || first !== 'Skip to content') { console.error(`A11Y GATE FAILED: ${total} violations`); process.exit(1); }
  console.log('A11Y GATE PASSED: 0 violations');
})().catch((e) => { console.error('ERROR', e.message); process.exit(1); });
