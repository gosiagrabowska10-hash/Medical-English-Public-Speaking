# Testing

All suites below were run from a freshly reset local Supabase database on 2026-11-25.

```bash
npm run db:reset                      # fresh database with migrations
npm run build && npx next start -p 3100 &
export BASE_URL=http://localhost:3100
npm run test:rls:supabase             # 33 database security checks (real Supabase Postgres)
npm run test:rls                      # 33 checks on plain PostgreSQL 16 (optional)
npm run test:e2e                      # 19 browser checks, real emails via Mailpit
npm run test:security                 # 23 API-level attack checks
npm run test:site                     # public site: 22 routes × 3 viewports, links, SEO, contact API
```
Credentials for the local stack are read at runtime from `npx supabase status`; none are stored in the repository. Test scripts refuse to run against a non-local Supabase.

| Suite | Result |
|---|---|
| Lint, type-check, production build | Pass |
| Secret scan (tracked files + full history) | Pass; detector verified with a planted fake key |
| RLS — real Supabase Postgres | 33 / 33 |
| RLS — plain PostgreSQL 16 | 33 / 33 |
| E2E account flows | 19 / 19 |
| API security | 23 / 23 |
| Stage 1 site regression | 0 problems |
