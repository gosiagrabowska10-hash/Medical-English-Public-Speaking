# Milestone 1 — Design System & Public Website: Status Report

Date: 2026-11-25

## Completed and tested
| Item | Status | Evidence |
|---|---|---|
| Design tokens, typography, 20 components | PASS | `/design-system`, lint + type-check clean |
| Wordmark (primary, secondary), monogram | PASS | Text/SVG based, no licensed asset needed |
| 15 public pages + founder + journal (2 articles) + design reference | PASS | 19 routes × 3 viewports (390 / 820 / 1440): HTTP 200, 0 console errors, 0 horizontal overflow, exactly one `<h1>` |
| Internal links | PASS | All internal links return 200 |
| SEO: unique titles, meta descriptions, canonical, OG, Twitter, sitemap.xml, robots.txt, OG image | PASS | Verified per page; `/login`, `/register`, `/design-system` are `noindex` |
| Structured data: EducationalOrganization, Course, FAQPage, Article | PASS | JSON-LD on relevant pages |
| Cookie consent (necessary only / customise / accept all; reopenable) | PASS | Tested in browser; choice stored, no optional scripts loaded |
| Mobile navigation (open, Escape, close on navigate) | PASS | Tested in browser |
| Contact API: validation, honeypot, honest "not configured" response | PASS | Valid → 503 `not_configured` (no email provider yet); invalid → 422 |

## Partially implemented / by design not yet active
| Item | Status | Why |
|---|---|---|
| Contact form delivery | NOT TESTED | Needs `RESEND_API_KEY`, `CONTACT_INBOX` |
| Login / registration | PARTIAL | UI complete; disabled with a clear notice until Supabase (Milestone 2) |
| Apply / checkout | PARTIAL | Leads to registration; Stripe is Milestone 7 |
| Localised currency | PARTIAL | PLN shown; local currency at checkout (Milestone 7) |
| Legal pages | PARTIAL | Drafts with [placeholders]; require legal review |
| Canonical domain | PARTIAL | Set `NEXT_PUBLIC_SITE_URL` before deployment |

## Content needed from the Academy
Founder name, portrait, biography and credentials · instructor profiles · legal entity details · professional photography · retention periods, refund policy and governing law · founder introduction video.

## Not claimed anywhere
No testimonials, statistics, instructors, accreditation, CME/CPD, university recognition or partnerships.
