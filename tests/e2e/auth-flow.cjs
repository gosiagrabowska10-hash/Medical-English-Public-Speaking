const { chromium } = require('playwright');
/**
 * End-to-end test of Stage 2 account flows against a running app and a local
 * Supabase stack (Mailpit receives the emails).
 *   npm run db:start && npm run build && npm start   (with .env.local pointing to local Supabase)
 *   npm run test:e2e
 */
const BASE = process.env.BASE_URL ?? 'http://localhost:3000', MAIL = require('./local-supabase.cjs')().mailpit;
const out = process.env.SCREENSHOT_DIR ?? require('os').tmpdir();
const email = `anna.${Date.now()}@example.org`, pw = 'correct horse battery staple', pw2 = 'another long passphrase 42';
let n = 0, fails = 0;
const ok = (c, name) => { n++; if (c) console.log('PASS', name); else { fails++; console.log('FAIL', name); } };
async function lastMailLink(to, subjectRe) {
  for (let i = 0; i < 20; i++) {
    const list = await (await fetch(`${MAIL}/api/v1/search?query=${encodeURIComponent('to:' + to)}`)).json();
    const msg = (list.messages || []).find(m => subjectRe.test(m.Subject));
    if (msg) {
      const full = await (await fetch(`${MAIL}/api/v1/message/${msg.ID}`)).json();
      const m = full.HTML.match(/href="([^"]+)"/); return m[1].replace(/&amp;/g, '&');
    }
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('no email ' + subjectRe);
}
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
  await ctx.addInitScript(() => localStorage.setItem('msa-cookie-consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, version: 1 })));
  const p = await ctx.newPage();
  const errors = []; p.on('pageerror', e => errors.push(e.message));

  // Validation
  await p.goto(BASE + '/register');
  ok(!(await p.getByText('Student accounts are not open yet').count()), 'registration is enabled when Supabase is configured');
  await p.getByRole('button', { name: 'Create account' }).click();
  await p.getByText('Please correct the highlighted fields.').waitFor();
  ok(await p.getByText('Please accept the Terms and Conditions').isVisible(), 'server-side validation shows field errors');

  // Register
  await p.selectOption('#title', 'Dr');
  await p.fill('#first', 'Anna'); await p.fill('#last', 'Nowak'); await p.fill('#email', email);
  await p.fill('#country', 'Poland'); await p.fill('#password', pw); await p.check('input[name=terms]');
  await p.getByRole('button', { name: 'Create account' }).click();
  await p.waitForURL('**/auth/check-email**');
  ok(true, 'registration redirects to "confirm your email"');

  // Cannot sign in before confirming
  await p.goto(BASE + '/login'); await p.fill('#email', email); await p.fill('#password', pw);
  await p.getByRole('button', { name: 'Sign in' }).click();
  await p.locator('form [role=alert]').waitFor();
  ok((await p.locator('form [role=alert]').textContent()).includes('confirm your email'), 'unconfirmed account cannot sign in');

  // Confirm via email link
  const link = await lastMailLink(email, /confirm/i);
  await p.goto(link); await p.waitForURL('**/app');
  await p.getByRole('heading', { level: 1 }).waitFor();
  const h1 = await p.getByRole('heading', { level: 1 }).textContent();
  ok(h1 === 'Welcome back, Dr Nowak.', `confirmation link signs in and dashboard greets from DB ("${h1}")`);
  ok(await p.getByText('1 of 3 complete').isVisible(), 'getting-started checklist reflects real data');
  await p.screenshot({ path: `${out}/e2e-dashboard.png` });

  // Profile update
  await p.goto(BASE + '/app/settings'); await p.fill('#specialty', 'Cardiology'); await p.fill('#timezone', 'Europe/Warsaw');
  await p.getByRole('button', { name: 'Save profile' }).click();
  await p.getByText('Your profile has been saved.').waitFor();
  await p.reload(); await p.locator('#specialty').waitFor(); ok(await p.inputValue('#specialty') === 'Cardiology', 'profile changes persist in the database');

  // Consent
  await p.getByRole('button', { name: 'Give consent' }).first().click();
  await p.getByText('Consent recorded.').waitFor();
  await p.reload(); await p.getByRole('button', { name: 'Withdraw consent' }).waitFor(); ok(await p.getByRole('button', { name: 'Withdraw consent' }).count() === 1, 'recording consent is stored and shown after reload');
  await p.getByRole('button', { name: 'Withdraw consent' }).click(); await p.getByText('Consent withdrawn.').waitFor();
  await p.reload(); await p.getByRole('button', { name: 'Give consent' }).nth(1).waitFor(); ok(await p.getByRole('button', { name: 'Give consent' }).count() === 2, 'consent can be withdrawn');

  // Data export
  const [dl] = await Promise.all([p.waitForEvent('download'), p.getByRole('link', { name: /Download my data/ }).click()]);
  const json = JSON.parse(require('fs').readFileSync(await dl.path(), 'utf8'));
  ok(json.profile.specialty === 'Cardiology' && json.account.email === email && json.consents.length === 4, 'data export contains profile, account and consent history');

  // Deletion request
  await p.getByRole('button', { name: 'Request deletion of my data' }).click();
  await p.fill('#confirm', 'nope'); await p.getByRole('button', { name: 'Submit request' }).click();
  await p.getByText('Please type DELETE').waitFor(); ok(true, 'deletion requires typed confirmation');
  await p.fill('#confirm', 'DELETE'); await p.getByRole('button', { name: 'Submit request' }).click();
  await p.getByText('Your deletion request has been received').waitFor();
  await p.keyboard.press('Escape'); await p.reload();
  await p.getByText(/Your deletion request \(pending\)/).waitFor(); ok(await p.getByRole('button', { name: 'Request deletion of my data' }).count() === 0, 'deletion request stored; duplicate requests prevented in UI');
  await p.screenshot({ path: `${out}/e2e-settings.png`, fullPage: true });

  // Sign out
  await p.getByRole('button', { name: 'Sign out' }).first().click(); await p.waitForURL('**/login?signed_out=1');
  await p.goto(BASE + '/app'); await p.waitForURL('**/login?next=%2Fapp');
  ok(true, 'after sign-out the student area redirects to login');

  // Wrong password
  await p.fill('#email', email); await p.fill('#password', 'wrong password here'); await p.getByRole('button', { name: 'Sign in' }).click();
  await p.locator('form [role=alert]').waitFor(); ok((await p.locator('form [role=alert]').textContent()).includes('incorrect'), 'wrong password shows a clear error');

  // Password reset
  await p.goto(BASE + '/forgot-password'); await p.fill('#email', email); await p.getByRole('button', { name: 'Send reset link' }).click();
  await p.getByText('If an account exists').waitFor();
  const reset = await lastMailLink(email, /reset/i);
  await p.goto(reset); await p.waitForURL('**/reset-password');
  await p.fill('#password', pw2); await p.fill('#confirm', pw2); await p.getByRole('button', { name: 'Set new password' }).click();
  await p.waitForURL('**/app?password=updated'); ok(true, 'password reset link lets the user set a new password');
  await p.getByRole('button', { name: 'Sign out' }).first().click(); await p.waitForURL('**/login**');
  await p.fill('#email', email); await p.fill('#password', pw2); await p.getByRole('button', { name: 'Sign in' }).click();
  await p.waitForURL('**/app'); ok(true, 'user can sign in with the new password');

  // Open redirect protection
  await p.goto(BASE + '/auth/confirm?code=bogus&next=//evil.example');
  ok(new URL(p.url()).host === new URL(BASE).host, 'confirm route rejects invalid codes and external redirects');

  // Mobile nav in app
  const m = await ctx.newPage(); await m.setViewportSize({ width: 390, height: 844 });
  await m.goto(BASE + '/app'); await m.getByRole('button', { name: 'Open menu' }).click();
  await m.getByRole('dialog').getByRole('link', { name: 'Account Settings' }).click(); await m.waitForURL('**/app/settings');
  ok(await m.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'mobile student navigation works without horizontal overflow');
  await m.goto(BASE + '/app'); await m.screenshot({ path: `${out}/e2e-dashboard-mobile.png`, fullPage: true });

  ok(errors.length === 0, 'no client-side errors' + (errors.length ? ': ' + errors.join(' | ') : ''));
  console.log(`\n${n - fails}/${n} passed`);
  await b.close(); process.exit(fails ? 1 : 0);
})().catch(e => { console.error('ERROR', e.message); process.exit(1); });
