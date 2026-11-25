/** Reads connection details of the LOCAL Supabase stack at runtime, so no credentials live in the repo. */
const { execSync } = require('child_process');
let cache;
module.exports = function localSupabase() {
  if (cache) return cache;
  const out = execSync('npx supabase status -o env', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  const env = Object.fromEntries(out.split('\n').filter((l) => l.includes('=')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).replace(/^"|"$/g, '')]; }));
  cache = { url: env.API_URL, key: env.PUBLISHABLE_KEY, dbUrl: env.DB_URL, mailpit: env.MAILPIT_URL || env.INBUCKET_URL };
  return cache;
};
