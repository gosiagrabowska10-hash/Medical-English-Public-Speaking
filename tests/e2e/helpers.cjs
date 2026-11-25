/** Shared helpers for local end-to-end tests. */
const { createClient } = require('@supabase/supabase-js');
const { execFileSync } = require('child_process');
const local = require('./local-supabase.cjs');

async function mailLink(to, subjectRe) {
  const { mailpit } = local();
  for (let i = 0; i < 30; i++) {
    const list = await (await fetch(`${mailpit}/api/v1/search?query=${encodeURIComponent('to:' + to)}`)).json();
    const msg = (list.messages || []).find((m) => subjectRe.test(m.Subject));
    if (msg) {
      const full = await (await fetch(`${mailpit}/api/v1/message/${msg.ID}`)).json();
      return full.HTML.match(/href="([^"]+)"/)[1].replace(/&amp;/g, '&');
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error('no email for ' + to);
}

/** Creates and confirms a student through Supabase Auth; returns an authenticated client. */
async function confirmedStudent(first, last = 'Test') {
  const { url, key } = local();
  const email = `${first.toLowerCase()}.${Date.now()}${Math.floor(Math.random() * 1000)}@example.org`;
  const password = 'a long test passphrase 123';
  const c = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await c.auth.signUp({ email, password, options: { data: { title: 'Dr', first_name: first, last_name: last, country: 'Spain', accepted_terms: true } } });
  if (error) throw error;
  await fetch(await mailLink(email, /confirm/i), { redirect: 'manual' });
  const { data, error: e2 } = await c.auth.signInWithPassword({ email, password });
  if (e2) throw e2;
  return { c, id: data.user.id, email, password };
}

const sql = (q) => execFileSync('psql', [local().dbUrl, '-tAc', q], { encoding: 'utf8' }).trim();
const anonClient = () => { const { url, key } = local(); return createClient(url, key, { auth: { persistSession: false } }); };

module.exports = { mailLink, confirmedStudent, sql, anonClient };
