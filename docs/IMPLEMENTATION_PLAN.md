# The Medical Speaking Academy — Technical Implementation Plan

Status: **Milestone 1 in progress** · Last updated: 2026-11-25

## 0. Environment inspection (findings)

| Item | Finding |
|---|---|
| Existing project | None. Empty workspace, no repository attached to the session. A new project was scaffolded. |
| Runtime | Node 22, npm 10, Python 3.13, git, gh CLI |
| Framework | Next.js 16 (App Router, Cache Components / PPR enabled), React 19, TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) + shadcn-style components built on `radix-ui` primitives (written in-repo, no shadcn CLI needed) |
| Fonts | Cormorant Garamond (headlines) + Inter (UI), both SIL Open Font License, self-hosted at build time via `next/font/google` |
| Network | Package registries reachable. Supabase, Stripe, OpenAI and email providers are **not yet configured** — no credentials exist. |
| Persistence | The cloud container is ephemeral. Code must be pushed to a GitHub repository to be kept. |

## 1. Architecture

```
src/
  app/
    (marketing)/          Public, indexable website (SSG / PPR static shell)
    (auth)/               /login, /register  (noindex)
    (student)/app/...     Student application (Milestone 3+, noindex, auth-gated)
    (staff)/staff/...     Instructor / assessor / admin portals (Milestone 5+)
    verify/[certId]       Public certificate verification (Milestone 6)
    api/                  Route handlers: AI, uploads, Stripe webhooks, contact
    sitemap.ts robots.ts  SEO
  components/
    brand/                Wordmark, monogram
    ui/                   Design-system primitives (button, card, badge, tabs, dialog, …)
    marketing/            Page sections (hero, CTA band, curriculum list, FAQ, …)
    app/                  Student-app components (sidebar, progress, recorder, …)
  content/                Typed, version-controlled curriculum + copy (later mirrored to DB for CMS editing)
  lib/                    site config, SEO helpers, utils, server-only clients
supabase/migrations/      SQL migrations with Row Level Security
docs/                     Plans, design system, env documentation, launch checklist
```

Principles
- **Server-first.** AI, Stripe, storage signing and email run only in Route Handlers / Server Actions with `server-only` modules. No secret ever reaches the client.
- **Honest integrations.** Every external integration has a *configured* check. When unconfigured, the UI shows a clearly labelled **Demo / Not connected** state — never a fake success.
- **Access is granted by the database**, never by a client-side success message (Stripe webhook → `enrollments`).
- **Content as data.** Curriculum lives in typed content files now, then is seeded into Postgres so Content Editors can publish through the admin panel.

## 2. Design system (Milestone 1)

Tokens (Tailwind v4 `@theme`): `midnight #101B2D`, `navy #18283C`, `ivory #F7F4EE`, `white`, `gold #B69A68` (+ `gold-deep #8A7148` for AA-contrast text on light backgrounds), `stone #E9E7E1`; semantic status colors in muted tones.
Typography: serif display scale (Cormorant Garamond 500/600), sans UI scale (Inter), spaced uppercase eyebrow labels.
Documented in `docs/DESIGN_SYSTEM.md` and rendered live at `/design-system` (noindex).

## 3. Database entities (Supabase / PostgreSQL) — Milestone 2

| Domain | Tables |
|---|---|
| Identity | `profiles` (1:1 auth.users, title, first/last name, country, specialty, locale), `user_roles` (role enum: student, instructor, assessor, content_editor, student_support, academic_director, academy_owner) |
| Commerce | `products`, `prices` (currency, amount), `discount_codes`, `orders`, `payments` (stripe ids, status), `refunds`, `enrollments` (cohort, access window) |
| Curriculum | `programs`, `modules` (12), `lessons` (30, kind=lesson), `workshops` (6), `lesson_sections`, `quizzes`, `quiz_questions`, `resources` |
| Learning | `lesson_progress`, `bookmarks`, `notes`, `quiz_attempts`, `assignments`, `submissions`, `weekly_challenges` |
| AI | `ai_teachers` (config, system prompt version, model), `ai_sessions`, `ai_messages`, `ai_usage` (rate/usage limits) |
| Speaking Studio | `recordings` (storage path, consent, duration), `transcripts`, `speech_analyses` (metrics json + model/version), `simulations`, `simulation_turns` |
| Human coaching | `reviews`, `review_comments` (timestamp_ms), `rubric_scores`, `coaching_sessions`, `coaching_attendance`, `messages` |
| Assessment | `assessments` (diagnostic / intermediate / final), `exam_attempts`, `graduation_decisions` |
| Certificates | `certificates` (public code, status issued/revoked, issued_by, revoked_reason), `certificate_events` |
| Founder & CMS | `founder_profile`, `media_assets`, `articles`, `document_templates` |
| Governance | `consents` (recording, cookies, marketing), `data_deletion_requests`, `audit_log`, `launch_checklist_items` |

RLS: students read/write only their own rows; staff access by role through a `has_role()` security-definer function; certificate verification exposes only a minimal public view (name as approved for display, program, issue date, status).

## 4. Milestones

| # | Milestone | Deliverables | Needs from you |
|---|---|---|---|
| **1** | **Design system + public website** | Tokens, typography, 20 components, wordmark/monogram, all public pages with full English copy, SEO (metadata, sitemap, robots, OG, JSON-LD), cookie consent, legal page drafts | — |
| 2 | Auth + database | Supabase project, migrations, RLS, roles, registration/login, profile, consent records | Supabase project URL + keys |
| 3 | Student app + curriculum | Sidebar shell, dashboard from DB, learning path, lesson player, 30 lessons + 6 workshops content, quizzes, notes, bookmarks, completion rules | Approval of curriculum content |
| 4 | AI Faculty + Speaking Studio + Simulation Center | 6 teachers with separate system prompts, streaming chat, voice in/out, recorder, upload, transcription, measured metrics, reports, simulations, usage limits, demo mode | OpenAI API key (or chosen provider) |
| 5 | Human coaching + instructor portal | Submissions, timestamped review, rubric, revisions, group session scheduling | — |
| 6 | Examinations, graduation, certificates | 3 assessments, final exam flow, graduation criteria engine, PDF certificate, QR, verification page, revocation, branded PDF documents | Authorised signatory name |
| 7 | Payments + admin + analytics | Stripe checkout, verified webhooks, enrollment, discounts, refunds, role dashboards, audit log, GA4 + consent mode | Stripe keys, GA4 ID |
| 8 | Founder CMS + editorial + documents | Founder profile management, media library, articles, editable templates, emails | Founder bio, photo, signatory |
| 9 | QA + security + visual audit + launch | Acceptance audit (PASS/FAIL/PARTIAL/NOT TESTED), fixes, launch checklist with owner-only approval | Legal review of policies |

After every milestone: lint, type-check, build, responsive screenshots (mobile / tablet / desktop), security review, honest status report.

## 5. External dependencies & credentials (none configured yet)

| Service | Purpose | Env vars |
|---|---|---|
| Supabase | Auth, Postgres, Storage | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| OpenAI | AI teachers, analysis, transcription (Whisper / gpt-4o-transcribe), TTS | `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_TRANSCRIBE_MODEL`, `OPENAI_TTS_MODEL` |
| Stripe | Payments, webhooks | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |
| Email (e.g. Resend) | Contact form, transactional email | `RESEND_API_KEY`, `CONTACT_INBOX` |
| Analytics | GA4 (consent-gated) | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Site | Canonical URLs | `NEXT_PUBLIC_SITE_URL` |

## 6. Content that must come from the Academy (will not be invented)

- Founder name, portrait, biography, credentials.
- Instructor profiles.
- Legal entity name, registered address, VAT/company number, data controller contact, governing law.
- Testimonials, statistics, partnerships, accreditation — **none are claimed** anywhere.
- Professional photography (current build uses typographic/architectural compositions with replaceable image slots).
