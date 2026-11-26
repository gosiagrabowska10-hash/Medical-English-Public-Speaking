# Change Log — Priority 1 corrective actions and W1 corrections

**Date:** 27 November 2026 · **Approved by:** Academy Owner (decisions of 27 November 2026) · **Audit:** `AUDIT_REPORT.md` (26 November 2026)

Every change below lists its evidence. Test outputs are stored in `docs/compliance/evidence/`.

## Decisions recorded
1. **Round 3 recording — option (a):** recordings stay on the learner's device; no upload or cloud storage before the DPIA, retention schedule, security design and processor agreements are in place.
2. **Two statuses:** *Workshop Completed* (activities + written Final Task) and *Competent* (instructor-confirmed with the rubric). Self-assessment is never presented as an independent assessment.
3. **Accessible palette:** `#646b77` supporting text, `#9e8356` large gold numerals on light backgrounds, `#959dab` index numbers on navy. `#b69a68` retained for rules, frames and dark backgrounds.

## Accessibility
| Change | Files | Evidence |
|---|---|---|
| Approved accessible colours as design tokens (`ink-subtle`, `gold-muted`, `mist`); gold numerals on light backgrounds switched to `gold-muted` | `globals.css`, module list, methodology, pricing, curriculum, teacher card | axe: 186 contrast failures → 0 |
| Logo links: accessible name now comes from the visible text (no conflicting `aria-label`); visually hidden spaces and “home/dashboard” suffix | `wordmark.tsx`, `site-header.tsx`, `sidebar.tsx` | axe: 32 → 0 |
| Progress table scroll container focusable, labelled region | `practice-rounds.tsx` | axe: 1 → 0 |
| Workshop tabs no longer overlapped by the sidebar at 1280 px | `lesson-tabs.tsx` | site QA and course flow at 1280 px |
| Transcript generated from captions under every captioned video | `transcript.tsx`, `video-player.tsx` | `course-flow.cjs`: transcript visible |
| Quiz options shown in seeded shuffled order (scored by original index) | `lesson-tabs.tsx` | `course-flow.cjs`: shuffled order; 6/6 and 5/5 still pass |
| Tagged PDFs with outline, title and language for all handouts, Workshop Pack and documents | `generate-handouts.ts`, `generate-workshop-pack.ts`, `render-doc-pdf.ts` | `pdfinfo`: Tagged yes |
| Accessibility Statement and reasonable-adjustments route | `/accessibility`, contact topics, footer, sitemap | axe gate includes `/accessibility` |
| Adjusted route for voice-based work in W1 | W1 Briefing, Workbook, Facilitator Guide; Reasonable Adjustments Policy | content quality gate enforces it for every workshop |
| Accessibility audit is now a **gate** (fails on any violation; first Tab stop must be the skip link) and covers 35 views; 4 more views (staff assessment, statuses, MFA set-up, MFA verification) checked in `priority1.cjs` | `a11y-audit.cjs`, `priority1.cjs` | `evidence/axe-2026-11-27.json`: **0 violations** |

## Security and privacy
| Change | Files | Evidence |
|---|---|---|
| HTTP security headers on all routes; `X-Powered-By` removed | `next.config.ts` | `priority1.cjs` (5 checks) |
| Rate limiting on the contact form: 5 per 10 minutes per client, Postgres-backed, salted-hash keys only, 2-day automatic clean-up | migration 0005 `rate_limit_hit`, `rate-limit.ts`, contact route and form | RLS tests (5), `priority1.cjs` (6th request → 429; no raw IP stored) |
| **Staff MFA**: every staff privilege requires an MFA-verified (aal2) session, enforced in the database; TOTP set-up in Account Settings; second-factor challenge after sign-in and on every app page; staff tools locked without MFA | migration 0005, `auth.ts`, `mfa-actions.ts`, `mfa-panel.tsx`, `/verify-mfa`, proxy | RLS tests (owner/instructor without MFA), `priority1.cjs`, `api-security.cjs`, `course-security.cjs` |
| Staff role grants and removals written to the audit log with the actor | migration 0005 trigger | RLS test |
| Fixed: learner views now filter every per-learner query by the signed-in user (staff with MFA can read all rows under RLS) | `course.ts`, dashboard, settings | course flow, priority1 |
| Complete data export (all learner tables, MFA factors, notice), fails closed instead of returning a partial export | `/api/account/export` | `priority1.cjs`: every table with `user_id` covered; no other learner's data |
| Privacy Policy corrected to describe current processing (no recordings, no AI active) | `/privacy` | — (draft pending legal review) |
| Server-error monitoring without personal data; `/api/health` | `instrumentation.ts`, `api/health` | `priority1.cjs` |
| Backup + restore + verification script | `scripts/ops/backup-restore-test.sh` | `evidence/backup-restore-2026-11-27.txt`: PASS |
| CI: content quality gate, register validation, `npm audit` (high/critical); Dependabot | CI workflow, `.github/dependabot.yml` | CI run |

## Workshop I corrections (Quality Gate F1–F6, F10–F12, F14)
| Finding | Correction |
|---|---|
| F1 | Two statuses in text, UI, rubric, workbook, facilitator guide, Terms, FAQ and certificate; `workshop_assessments` table and `record_workshop_assessment` (rubric rule from content: 5 of 6 incl. criteria 2 and 4; basis recorded; MFA; no self-assessment); staff assessment pages; learner status panel with feedback |
| F2 | Final Task no longer promises future analysis; privacy section and Round 1 note: recordings stay on the device |
| F3 | W1 answer positions varied at source (2,4,1,3,4); display order shuffled for all quizzes; approved lessons' text unchanged |
| F4 | Complete data export |
| F5 | Tagged PDFs, keyboard-scrollable table, adjusted route, captions + transcript as a publication rule |
| F6 | Recording ground rules in Briefing, Workbook and Facilitator Guide; each speaker records on their own device |
| F10 | Pressure element optional, with a written recovery-plan alternative |
| F11 | “about one in seven” |
| F12 | Final Task asks learners to state when they used the delayed self-check and to interpret it cautiously |
| F14 | `scripts/check-content-quality.ts` applies the same rules to every lesson and workshop (in CI) |

## Policies and procedures drafted (require specialist review)
`docs/policies/`: Reasonable Adjustments, Certificate and Assessment, Responsible AI, Data Retention Schedule, Record of Processing Activities, Processor Register, Information Security, Academic Integrity, Complaints. `docs/operations/`: Backup and Recovery, Incident and Breach Response, Monitoring.

## Test results (27 November 2026)
| Suite | Result |
|---|---|
| RLS (plain PostgreSQL 16 and Supabase) | all passed (incl. 10 new MFA, rate-limit and audit checks) |
| Priority 1 controls (`priority1.cjs`) | 48/48 |
| Course flow | 64/64 |
| Course security | 34/34 |
| API security | 24/24 |
| Auth flow | 19/19 |
| Site QA (390/820/1280/1440 px) | no problems |
| Accessibility gate (axe, 35 views) | 0 violations |
| Content quality gate | 0 failures |
| Lint, typecheck, build | pass |

## Known limitations (not hidden)
- CSP still allows inline scripts (static pages cannot carry nonces).
- Staff access is not yet limited to assigned cohorts.
- Production backups, alerting and Auth rate-limit settings depend on the hosted project.
- No manual screen-reader audit or PDF/UA validation yet.
- All policies are drafts; the Academy must not be described as legally compliant until specialists have reviewed them.
