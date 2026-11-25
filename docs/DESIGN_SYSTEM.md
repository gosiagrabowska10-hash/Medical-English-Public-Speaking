# Design System — The Medical Speaking Academy

Live reference: `/design-system` (noindex). Tokens: `src/app/globals.css` (`@theme`).

## Colour
| Token | Hex | Use |
|---|---|---|
| `midnight` | #101B2D | Primary text, dark sections, primary buttons |
| `navy` | #18283C | Secondary dark surfaces |
| `ivory` | #F7F4EE | Default page background |
| `white` | #FFFFFF | Cards, alternating sections |
| `gold` | #B69A68 | Rules, frames, icons, buttons on dark. **Not for small text on light backgrounds** (contrast ≈ 2.5:1) |
| `gold-deep` | #7A6235 | Gold text on light backgrounds (AA) |
| `gold-light` | #D6C39D | Gold text on dark backgrounds |
| `stone` | #E9E7E1 | Hairlines, tracks, subtle fills |
Status: `success`, `warning`, `danger`, `info` (+ `-bg`), muted and institutional.

## Typography
- Headlines: **Cormorant Garamond** 500 (OFL). Scale: `display`, `h1`, `h2`, `h3` (fluid `clamp`). Lining figures enforced.
- Interface/body: **Inter** (OFL). Body 16–17px, line-height 1.65–1.8, ≤ 68ch.
- Eyebrows: 12px, 600, uppercase, tracking 0.22em, preceded by a 40px gold rule.

## Components (`src/components`)
| # | Component | File |
|---|---|---|
| 1 | Navigation bar | `layout/site-header.tsx` |
| 2 | Footer | `layout/site-footer.tsx` |
| 3 | Hero sections | `marketing/page-hero.tsx`, homepage hero |
| 4 | Buttons (primary, gold, outline, light, outline-light, ghost, link) | `ui/button.tsx` |
| 5 | Course cards | `app/learning-cards.tsx` → `CourseCard` |
| 6 | Instructor / founder cards | `marketing/founder-section.tsx` |
| 7 | AI teacher cards | `marketing/teacher-card.tsx` |
| 8 | Progress cards | `app/learning-cards.tsx` → `ProgressCard` |
| 9 | Video lesson container | `app/learning-cards.tsx` → `VideoLesson` |
| 10 | Audio recording controls | `app/recorder-controls.tsx` |
| 11 | Performance analytics cards (Measured vs AI estimate) | `app/analysis.tsx` → `MetricCard` |
| 12 | Assessment panel | `app/analysis.tsx` → `AssessmentPanel` |
| 13 | Certificate layout | `app/certificate.tsx` |
| 14 | Modal | `ui/dialog.tsx` |
| 15 | Forms | `ui/form.tsx` |
| 16 | Tabs | `ui/tabs.tsx` |
| 17 | Dropdowns | `ui/dropdown.tsx` |
| 18 | Progress bars | `ui/progress.tsx` |
| 19 | Status labels | `ui/badge.tsx` |
| 20 | Mobile navigation | `layout/site-header.tsx` (Radix dialog drawer) |
Also: `Wordmark` (primary, secondary), `Monogram`, `Section`, `SectionHeader`, `Container`, `Accordion`, `EditorialVisual`, `CtaBand`, `CookieConsent`.

## Imagery
No licensed photography exists yet. `EditorialVisual` accepts `src`; without it, it renders a restrained brand composition. Never use unlicensed stock or AI-generated images of "real" doctors presented as genuine people.

## Rules
- Sections alternate ivory / white / midnight; never two dark sections in a row.
- One primary CTA per view; secondary is outline or link.
- Radius is minimal (2–4px). Shadows are soft and rare. No gradients except the subtle radial in dark visuals.
- Motion: ≤ 700ms, `--ease-refined`, respects `prefers-reduced-motion`.
- Focus: 2px gold-deep outline (gold-light on dark).
