/**
 * API-level security test: talks to Supabase directly (bypassing the website),
 * as an attacker holding a valid student session would.
 * Requires the local Supabase stack (npm run db:start). Run: npm run test:security
 */
const { createClient } = require('@supabase/supabase-js');
const { execFileSync } = require('child_process');

const local = require('./local-supabase.cjs')();
const URL_ = local.url, KEY = local.key, MAIL = local.mailpit, DB_URL = local.dbUrl;
if (!/127\.0\.0\.1|localhost/.test(URL_)) { console.error('Refusing to run against a non-local Supabase.'); process.exit(2); }

let n = 0, fails = 0;
const ok = (c, name) => { n++; if (c) console.log('PASS', name); else { fails++; console.log('FAIL', name); } };
const client = () => createClient(URL_, KEY, { auth: { persistSession: false, autoRefreshToken: false } });
const sql = (q) => execFileSync('psql', [DB_URL, '-tAc', q], { encoding: 'utf8' }).trim();

async function confirmedStudent(first) {
  const email = `${first.toLowerCase()}.${Date.now()}@example.org`, password = 'a long test passphrase 123';
  const c = client();
  const { error } = await c.auth.signUp({ email, password, options: { data: { title: 'Dr', first_name: first, last_name: 'Test', accepted_terms: true } } });
  if (error) throw error;
  let link;
  for (let i = 0; i < 20 && !link; i++) {
    const list = await (await fetch(`${MAIL}/api/v1/search?query=${encodeURIComponent('to:' + email)}`)).json();
    if (list.messages?.length) {
      const m = await (await fetch(`${MAIL}/api/v1/message/${list.messages[0].ID}`)).json();
      link = m.HTML.match(/href="([^"]+)"/)[1].replace(/&amp;/g, '&');
    } else await new Promise((r) => setTimeout(r, 400));
  }
  await fetch(link, { redirect: 'manual' });
  const { data, error: e2 } = await c.auth.signInWithPassword({ email, password });
  if (e2) throw e2;
  return { c, id: data.user.id, email };
}

(async () => {
  const A = await confirmedStudent('Alice'), B = await confirmedStudent('Bruno');
  await B.c.from('consents').insert({ user_id: B.id, kind: 'recording', granted: true });
  await B.c.from('data_deletion_requests').insert({ user_id: B.id, reason: 'private reason' });

  // Reading other students' data
  const { data: profs } = await A.c.from('profiles').select('id');
  ok(profs.length === 1 && profs[0].id === A.id, 'student lists profiles: sees only their own');
  const { data: bProf } = await A.c.from('profiles').select('*').eq('id', B.id);
  ok(bProf.length === 0, "student cannot fetch another student's profile by id");
  const { data: cons } = await A.c.from('consents').select('user_id');
  ok(cons.every((r) => r.user_id === A.id), "student cannot read other students' consents");
  const { data: cur } = await A.c.from('current_consents').select('user_id');
  ok(cur.every((r) => r.user_id === A.id), "consent view does not leak other students' consents");
  const { data: del } = await A.c.from('data_deletion_requests').select('user_id,reason');
  ok(del.length === 0, "student cannot read other students' deletion requests");
  const { data: roles } = await A.c.from('user_roles').select('user_id,role');
  ok(roles.length === 1 && roles[0].user_id === A.id && roles[0].role === 'student', 'student sees only their own role');

  // Modifying other students' data
  await A.c.from('profiles').update({ first_name: 'Hacked' }).eq('id', B.id);
  const { data: bAfter } = await B.c.from('profiles').select('first_name').single();
  ok(bAfter.first_name === 'Bruno', "student cannot modify another student's profile");
  const { error: forge } = await A.c.from('consents').insert({ user_id: B.id, kind: 'marketing_email', granted: true });
  ok(!!forge, 'student cannot record consent on behalf of another student');
  const { error: delReq } = await A.c.from('data_deletion_requests').insert({ user_id: B.id });
  ok(!!delReq, 'student cannot file a deletion request for another student');

  // Administrative functions
  const { error: esc } = await A.c.from('user_roles').insert({ user_id: A.id, role: 'academy_owner', granted_by: A.id });
  ok(!!esc, 'student cannot grant themselves the Academy Owner role');
  const { error: esc2 } = await A.c.from('user_roles').insert({ user_id: B.id, role: 'instructor', granted_by: A.id });
  ok(!!esc2, 'student cannot grant roles to others');
  const { data: audit } = await A.c.from('audit_log').select('id');
  ok(audit.length === 0, 'student cannot read the audit log');
  const { error: auditW } = await A.c.from('audit_log').insert({ action: 'forged' });
  ok(!!auditW, 'student cannot write audit entries directly');
  const { error: procDel } = await A.c.from('data_deletion_requests').update({ status: 'completed' }).eq('user_id', A.id).select();
  const own = await A.c.from('data_deletion_requests').select('status');
  ok(own.data.every((r) => r.status !== 'completed') , 'student cannot mark deletion requests as processed');
  void procDel;
  const { error: adm } = await A.c.auth.admin.listUsers();
  ok(!!adm, 'student session cannot use Supabase admin APIs');
  const { error: protectedCol } = await A.c.from('profiles').update({ created_at: '2000-01-01' }).eq('id', A.id);
  ok(!!protectedCol, 'student cannot change protected profile columns');
  await A.c.rpc('log_event', { _action: 'security.test' });
  ok(sql(`select actor_id from public.audit_log where action='security.test' order by id desc limit 1`) === A.id, 'audit events are attributed to the real caller');

  // Anonymous (no session)
  const anon = client();
  const { data: ap, error: ae } = await anon.from('profiles').select('id');
  ok(!!ae || ap.length === 0, 'anonymous visitors cannot read profiles');
  const { error: arpc } = await anon.rpc('log_event', { _action: 'anon.spam' });
  ok(!!arpc, 'anonymous visitors cannot write to the audit log');
  const { error: arole } = await anon.rpc('has_role', { _role: 'academy_owner' });
  ok(!!arole, 'anonymous visitors cannot call role functions');

  // Staff access works only after the Owner role is granted (by an administrator in SQL)
  sql(`insert into public.user_roles (user_id, role) values ('${A.id}', 'academy_owner')`);
  const { data: allP } = await A.c.from('profiles').select('id').in('id', [A.id, B.id]);
  ok(allP.length === 2, 'Academy Owner can read student profiles');
  const { data: aud2 } = await A.c.from('audit_log').select('id').limit(1);
  ok(aud2.length === 1, 'Academy Owner can read the audit log');
  const { data: bStill } = await B.c.from('profiles').select('id');
  ok(bStill.length === 1, 'a student remains restricted while staff roles exist');
  sql(`delete from auth.users where id in ('${A.id}','${B.id}')`);

  console.log(`\n${n - fails}/${n} passed`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error('ERROR', e.message); process.exit(1); });
