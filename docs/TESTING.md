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
npm run test:course                   # 36 browser checks of the course experience (Stage 3)
npm run test:course-security          # 26 API-level checks of content and progress security (Stage 3)
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
| Stage 3 course E2E | 36 / 36 |
| Stage 3 course security | 26 / 26 |

## Accessibility audit (axe-core)

`BASE_URL=http://localhost:3100 npm run test:a11y` scans 33 views (public pages, cookie banner, signed-in pages and the four Workshop I tabs) with axe-core against WCAG 2.0–2.2 A/AA rules, checks that the first Tab stop is the skip link, and prints a JSON summary. The audit of 26 November 2026 is stored in `docs/compliance/evidence/`. Automated checks do not replace a manual screen-reader audit.

## Compliance register

`npx tsx scripts/build-compliance-register.ts` regenerates `docs/compliance/COMPLIANCE_REGISTER.md` and `.csv` from `register.json` and fails if an item uses a status outside the five permitted statuses, or is marked Compliant or Not applicable without evidence.

## Stage 1: enrolment and progression

- `npm run test:rls` also runs `supabase/tests/progression_test.sql` (27 checks), on plain PostgreSQL 16. `npm run test:rls:supabase` runs both files against the local Supabase stack. The checks cover enrolment administration (roles, MFA), progressive module unlocking, administrator override with reason, revisit after revocation, paused enrolments and the audit trail.
- `BASE_URL=http://localhost:3100 npm run test:stage1` runs 37 browser and API checks: cohort and enrolment through the admin UI, locked-module screens, unlocking by completion, override and revocation through the learner record, reliable progress storage (idempotent completion, no direct edits, persistence across sessions), paused enrolment, access control, and axe checks of the new screens.
- Other browser suites open all modules with the test fixture `unlockAllModules()` (equivalent to an administrator override), so that they keep testing lesson features independently of progression.
