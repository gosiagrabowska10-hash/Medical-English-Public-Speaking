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

/** RFC 6238 TOTP (SHA-1, 30 s, 6 digits) from a base32 secret. */
function totp(secret, at = Date.now()) {
  const crypto = require('node:crypto');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const ch of secret.replace(/=+$/, '').toUpperCase()) bits += alphabet.indexOf(ch).toString(2).padStart(5, '0');
  const key = Buffer.from(bits.match(/.{8}/g).map((b) => parseInt(b, 2)));
  const ctr = Buffer.alloc(8); ctr.writeBigUInt64BE(BigInt(Math.floor(at / 30000)));
  const h = crypto.createHmac('sha1', key).update(ctr).digest();
  const o = h[h.length - 1] & 15;
  return String(((h.readUInt32BE(o) & 0x7fffffff) % 1e6)).padStart(6, '0');
}

/** Staff privileges require an MFA-verified (aal2) session: enrol and verify a TOTP factor. */
async function withMfa(c) {
  const { data, error } = await c.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Test ' + Date.now() });
  if (error) throw error;
  const { error: e2 } = await c.auth.mfa.challengeAndVerify({ factorId: data.id, code: totp(data.totp.secret) });
  if (e2) throw e2;
  return data.totp.secret;
}

module.exports = { mailLink, confirmedStudent, sql, anonClient, totp, withMfa };
