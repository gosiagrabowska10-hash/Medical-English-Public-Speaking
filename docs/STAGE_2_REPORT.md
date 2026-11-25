# Stage 2 — Student Accounts, Authentication & Database: Status Report

Date: 2026-11-25 · Stage 1 work preserved (no Stage 1 component rewritten; login/register pages kept their approved design, forms now functional).

## How it was tested
- **Real Supabase stack locally** (Supabase CLI: Postgres, Auth/GoTrue, PostgREST, Mailpit) with email confirmation ON and 10-character password minimum.
- **Database security tests** `supabase/tests/rls_test.sql`: **33/33 PASS** on real Supabase Postgres and on plain PostgreSQL 16.
- **End-to-end browser tests** `tests/e2e/auth-flow.cjs` (Playwright, real emails via Mailpit): **19/19 PASS**.
- **API-level security tests** `tests/e2e/api-security.cjs` (direct Supabase calls with real student sessions, anonymous calls, owner role): **23/23 PASS**.
- **Stage 1 regression** `tests/e2e/site-qa.cjs`: 22 routes × 3 viewports — HTTP 200, no console errors, no overflow, no broken links.
- Lint, type-check, production build and secret scan clean. Full procedure: `docs/TESTING.md`.

### What a student can and cannot do (verified at database and API level)
| Action | Result |
|---|---|
| Read / update own profile, record own consents, export own data, request own deletion | Allowed |
| Read any other student's profile, consents, roles or deletion requests | Blocked (returns nothing) |
| Modify another student's profile, or act on their behalf | Blocked |
| Grant roles to self or others; read or write the audit log; process deletion requests | Blocked |
| Change protected profile columns (id, created_at) | Blocked |
| Call Supabase admin APIs | Blocked |
| Anonymous visitor: read data, write audit log, call role functions | Blocked |

## PASS — tested and working
| Feature | Evidence |
|---|---|
| Registration with professional profile (title, name, country, specialty) | E2E |
| Server-side validation with field errors | E2E |
| Email confirmation required before sign-in | E2E (unconfirmed login rejected) |
| Confirmation link signs in and opens the dashboard | E2E |
| Sign in / wrong-password error / sign out | E2E |
| Password reset by email link, then sign in with new password | E2E |
| Protected `/app/*` (proxy + data-access layer) | E2E + curl 307 |
| Open-redirect protection on auth callbacks | E2E |
| Dashboard greeting and checklist from the database | E2E ("Welcome back, Dr Nowak.") |
| Profile editing persisted | E2E |
| Recording / marketing consent: give and withdraw, append-only history | E2E + RLS |
| GDPR data export (JSON) | E2E |
| GDPR deletion request (typed confirmation, one open request) | E2E + RLS |
| Roles (7), automatic student role, owner-only role management, no self-escalation | RLS |
| Audit log (sign-in, sign-out, profile, consent, export, deletion, password) — leadership-only read, cannot be forged | RLS |
| Anonymous visitors cannot read data or write audit events | RLS |
| Mobile student navigation | E2E |

## Security finding fixed during testing
Supabase grants ALL table privileges and function EXECUTE to `anon`/`authenticated` by default. Testing on real Supabase showed an anonymous caller could invoke `log_event`. The migration now revokes default privileges and grants only what is required (two independent layers: privileges + RLS). Tests added.

## PARTIAL / requires configuration
| Item | Status | Needed |
|---|---|---|
| Your hosted Supabase project | NOT TESTED | Apply migration + 3 environment variables (see `docs/SUPABASE_SETUP.md`) |
| Production emails | NOT TESTED | Custom SMTP in Supabase (built-in sender is for testing) |
| Processing deletion requests | PARTIAL | Requests are stored; staff processing UI is Stage 7 |
| Email address change | PARTIAL | Via student support for now |
| Student sections other than Dashboard and Settings | By plan | Shown as "Soon" (Stages 3–6), not linked |
| Enrolment / cohort | By plan | Stage 7 (Stripe); dashboard shows an honest "not enrolled yet" state |

## Not used
Service-role / secret keys are not used anywhere in Stage 2.
