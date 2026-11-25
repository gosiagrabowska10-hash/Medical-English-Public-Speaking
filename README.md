# The Medical Speaking Academy

Premium international platform teaching medical public speaking and professional English communication to non-native English-speaking medical professionals.

| Stage | Scope | Status |
|---|---|---|
| 1 | Design system and public website | Approved |
| 2 | Student accounts, authentication, Supabase database, RLS | Approved — see `docs/STAGE_2_REPORT.md` |
| 3+ | Curriculum and lesson player, AI Faculty, Speaking Studio, coaching, exams, payments | Planned — `docs/IMPLEMENTATION_PLAN.md` |

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 · Radix primitives · Supabase (Auth, Postgres, RLS) · Playwright tests.

## Documentation
- `docs/IMPLEMENTATION_PLAN.md` — architecture, data model, milestones
- `docs/DESIGN_SYSTEM.md` — tokens and components (live at `/design-system`)
- `docs/STUDENT_UI_DIRECTION.md` — approved student-platform visual direction (`/preview/lesson`, `/preview/studio`)
- `docs/SUPABASE_SETUP.md` — connecting a hosted Supabase project (no secret keys required)
- `docs/TESTING.md` — how to run every test suite
- `docs/STAGE_2_REPORT.md`, `docs/MILESTONE_1_REPORT.md` — test and status reports

## Quick start (local development)
Requirements: Node.js 22+, Docker (for the local Supabase stack).

```bash
npm install
npm run db:start                      # local Supabase: Postgres, Auth, REST, Mailpit; applies migrations
npx supabase status -o env            # shows the local API URL and publishable key
```

Create `.env.local` (never committed):
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=<API_URL from supabase status>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<PUBLISHABLE_KEY from supabase status>
```

```bash
npm run dev                           # http://localhost:3000
```
Confirmation and password-reset emails arrive in Mailpit: http://127.0.0.1:54324

Without Supabase variables the public website still runs; sign-in and registration show an honest "not open yet" notice.

## Scripts
| Command | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Develop, build, serve |
| `npm run lint` · `npm run typecheck` | Code quality |
| `npm run check:secrets` | Fails if any credential-like string is tracked or in git history |
| `npm run db:start` · `npm run db:reset` | Local Supabase stack / fresh database |
| `npm run test:rls:supabase` | Database security tests on the local Supabase Postgres |
| `npm run test:rls` | Same tests on a plain local PostgreSQL 16 (needs `postgres` system user) |
| `npm run test:e2e` | Browser tests of all account flows (needs running app, `BASE_URL`) |
| `npm run test:security` | API-level attack tests with student sessions |
| `npm run test:site` | Public-site regression at 3 viewports |

## Security principles
- No secret keys in the repository; `.env*` files are git-ignored (only `.env.example` with empty placeholders is tracked).
- Stage 2 uses only the public Supabase URL and publishable key. Every table has Row Level Security **and** minimal column privileges.
- Access is decided on the server (proxy + data-access layer), never by client state.
- No fabricated testimonials, statistics, instructors, accreditation or CME/CPD claims.
