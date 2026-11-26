**Status:** complete Workshop I package for your review, written to the structure you approved on 26 November 2026. After approval it becomes the template for Workshops II–VI. No other workshop has been started, and Phase 4 has not been started.

## A. What the package contains, and where it lives

| Required component | In this document | On the platform | In the Workshop Pack (PDF) |
|---|---|---|---|
| Final workshop instructions and learning objectives | Part 1 | Briefing tab | Workbook, Facilitator Guide |
| Facilitator-led 120-minute agenda | Part 7 | Briefing tab (summary) | Facilitator Guide |
| Self-paced version (three sittings, about 165–200 minutes) | Parts 1 and 4 | Practice Rounds tab: pause, repeat, resume | Workbook |
| Three recording-round instructions | Part 4 | Practice Rounds: Rounds 1–3 | Workbook |
| Practice Stations A, B and C | Part 4 | Practice Rounds: stations with checklists | Workbook worksheets 3–5 |
| All pressure cards (8 standard, 2 stretch) | Part 6 | Round 3: random reveal at 45–90 s; repeatable | Pressure Cards |
| Participant worksheets | Part 4 | Practice Rounds logs and progress table | Workbook worksheets 1–7, speaker card |
| Facilitator instructions and debrief questions | Part 7 | — | Facilitator Guide, observer sheet |
| Six-criteria rubric with concrete examples | Part 5 | Final Task tab (criteria); self-rating in each round | Assessment Rubric |
| Final task and submission instructions | Part 3 | Final Task tab (enforced: 250 words minimum) | Rubric, Workbook |
| Personal improvement and transfer plan | Part 4 (worksheets 6–7) | Debrief step | Workbook worksheet 7 and speaker card |

**Every resource referenced exists.** The four Workshop Pack PDFs are generated from the same data as the platform and are downloadable from the Workshop Pack tab. An automated check confirms that all 10 lesson and workshop resource files exist and are valid PDFs.

## B. How your decisions are reflected

- **Pause, repeat, resume.** Every step can be saved as a draft ("Save and continue later") or marked complete. The platform shows "Resume where you left off". Stations and Round 3 can be repeated at any time.
- **Pressure without unnecessary anxiety.**
  - All ten cards can be read in advance; only the card and the moment are unknown.
  - Every card describes a professional situation, never a personal challenge.
  - Standard cards are the default and stretch cards are optional.
  - The timer can be stopped at any time, nothing is logged until the learner saves, and Round 3 can be repeated with a new card.
  - A recovery strategy is shown after each card.
- **Assessment principles.** The rubric retains them in full:
  - intelligibility, not accent;
  - speaking rate is diagnostic only (the platform labels it "diagnostic only" wherever it appears);
  - fillers are judged in context;
  - natural delivery is rewarded over technique.
- **Completion** requires a passed Readiness Check, three completed practice rounds and a submitted Final Task. This is enforced by the database.

## C. One decision needed: the Round 3 recording

The approved structure says the Final Task includes the Round 3 recording. Uploading and storing recordings belongs to the Speaking Studio (Phase 4) and instructor review (Phase 5), which you asked me not to start. The Final Task therefore currently consists of:

- the written analysis (250–400 words);
- the measurements and self-ratings logged in the three practice rounds;
- an instruction to keep the Round 3 recording on the learner's own device.

The final assessment of the recording will be completed when those features exist. **Options:** (a) keep this approach until Phase 4 (recommended); or (b) add a secure recording upload to the Final Task now, as a limited early part of Phase 4.

## D. Quality assurance performed

| Check | Result |
|---|---|
| Workshop navigation | Briefing · Practice Rounds · Readiness Check · Workshop Pack · Final Task, verified in the browser |
| Internal links and resources | All public routes return 200 with no broken links; all 10 resource files exist and are PDFs |
| Consistency between L02, L07, L08, L09 and W1 | 15 named techniques found in the lessons they come from (e.g. "look, pause, conclude", "turn and look, turn back, then speak", the five-step warm-up, the three-step recovery); timings checked (120 minutes facilitated; 165–200 minutes independent) |
| Pronunciation | All 13 term-card entries match the British entries in Cambridge Dictionary and Oxford Learner's Dictionaries (see the pronunciation verification log) |
| Course E2E (browser) | **60/60**, including the full W1 journey: readiness lock and pass, draft and resume after reload, round validation, pressure-card reveal and repeat, progress table, Final Task, completion |
| Course security (API) | **33/33**, including 7 new workshop checks: steps locked before readiness, no direct writes, invalid steps rejected, no cross-student access, no completion before three rounds |
| Stage 1–2 suites | Database security 33/33 (two databases), accounts 19/19, API security 23/23, public site 0 problems |
| Lint, type-check, build, secret scan | Pass |

**The failed background task.** The only background task that failed was a helper agent I used to read dictionary pages for the L07 pronunciation verification. All of its page requests were blocked by the session's network policy. After you approved access to the three dictionary sites, I read the entries directly, so the verification is complete and documented. The helper agent wrote no files and made no code changes, so it does not affect this or any other commit. All other background tasks (CI monitoring) completed successfully.

**Issues found and fixed during QA:**

1. A sentence in the Round 3 instructions mentioned a "practice mode" that does not exist in the platform. It was reworded to describe the actual behaviour.
2. In the rubric PDF, a long example squeezed the column layout; the column widths were corrected.
3. A test expectation was outdated after the workshop became completable.
