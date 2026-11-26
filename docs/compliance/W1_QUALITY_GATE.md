# Quality Gate — Workshop I: Voice and Presence Lab

**The Medical Speaking Academy · 26 November 2026 · Package reviewed: commit `85255d5` (CI passed) plus the 1280 px layout fix made during this audit**

> **Purpose.** Workshop I is the template for Workshops II–VI. This gate records what is fit to be copied, what must be corrected first, and what depends on decisions outside the workshop. It is an internal quality review, not legal advice; legal points refer to `AUDIT_REPORT.md` and `COMPLIANCE_REGISTER.md`.

## Verdict

**Conditional pass.** The educational design, the participant materials and the platform implementation are of a standard that can serve as the template. **Before W1 is used as the template for Workshops II–VI, findings F1–F6 should be resolved** (all are corrections to wording, UI or materials; none requires redesign). Findings F7–F14 are launch requirements that apply to the whole programme and can be resolved in parallel.

| Area | Result |
|---|---|
| Content | Pass with corrections (F1, F8, F12) |
| Assessment | Pass with corrections (F1, F3) |
| Participant materials | Pass with corrections (F5) |
| Facilitator documentation | Pass with correction (F6) |
| Platform functionality | Pass with corrections (F1, F4) |
| Accessibility | **Not yet passed** (F5, F7, global contrast and label findings) |
| Privacy | Pass with corrections (F2, F4, F6) |
| AI transparency | Not applicable yet — no AI in W1; a wording point in F2 |
| Security | Pass for the workshop scope; programme-level findings in the audit |
| Legal documentation | Not yet passed — programme-level documents are drafts (audit §7) |
| Terminology and British English | Pass (consistency check: 34 checks, in CI) |
| References | Pass with verification outstanding (F8) |
| Permissions and IP | Pass for current content; agreements needed before recording videos (F13) |

## What was verified

| Check | Evidence |
|---|---|
| Every promised resource exists | Four Workshop Pack PDFs in `public/materials/workshops/` (Workbook 13 pp., Rubric, Pressure Cards, Facilitator Guide) plus the combined 42-page review PDF; consistency checker verifies files and links |
| Timings add up | Facilitated 120 min including the 10-minute Readiness Check; self-paced 165–200 min across three sittings; checked by the consistency script |
| Rubric covers all outcomes | Each outcome is mapped to a step and to evidence; six criteria, three levels, with examples |
| IPA | 13 term-card entries verified against Cambridge and Oxford dictionaries (`docs/curriculum/pronunciation-verification.md`) |
| Progress saving and gating | Practice Rounds locked until the Readiness Check is passed; drafts and completion saved per step; workshop cannot be completed without three completed rounds (database function, E2E tested) |
| Access control | Workshop progress protected by RLS; another learner cannot read or write it (course-security tests) |
| Responsive layout | 390, 820, 1280, 1440 px — one defect found at 1280 px and fixed |
| Honesty rules | No fake videos: the four unrecorded videos are stated as not yet recorded, with written model performances in their place; no AI analysis is claimed; no recording is uploaded or claimed to be analysed |

## Findings

Severity: **High** — must be fixed before W1 is copied or before launch; **Medium** — should be fixed before launch; **Low** — improvement.

### F1 · High · Assessment and platform — stated completion rule is not what the platform enforces

**Finding.** The Briefing says “Your final recording is assessed against six criteria … To complete the workshop you need Competent in at least five criteria, including criteria 2 and 4.” In practice, the learner rates themselves in Round 3, nobody reviews the recording, and the platform marks the workshop complete once the Readiness Check, three rounds and the Final Task are done — regardless of the self-ratings.

**Risk.** Learners and employers may believe completion means an assessed level of competence. This is an accuracy problem (consumer information, certificate credibility) and would be copied into five more workshops.

**Recommendation.** Separate two states everywhere (text, UI, certificate rules):
- **Workshop completed** — all activities done and the Final Task submitted (what the platform verifies today);
- **Assessed as Competent** — confirmed by an instructor against the rubric (available when instructor review opens).

Rephrase the Briefing in the active voice: “You assess your Round 3 recording against six criteria … An instructor will confirm the assessment when instructor review opens.” Keep the 5-of-6 rule as the standard for the assessed state. Show the learner's self-assessment summary on the completion panel without calling it a result.

### F2 · High · Privacy — Round 3 recording decision (open since the W1 package)

**Options presented earlier:** (a) the recording stays on the learner's device until Phase 4; (b) an upload is added now.

**Audit recommendation: option (a).** An upload now would mean storing voice and video of identifiable people before the DPIA, retention schedule, processor agreements, storage design and consent text exist (audit §3.2). Option (b) should not be implemented until those are in place.

**Corrections needed with option (a):**
- The Final Task promises “you will be able to submit it for analysis and instructor review when the Speaking Studio and instructor review open”. Replace with a statement that does not promise a future feature or AI analysis, for example: “Keep your Round 3 recording on your own device. If instructor review becomes available during your enrolment, you will be told how to submit it, and submitting will always be optional.”
- Add a short privacy note at the Round 1 step: recordings are made and kept on your own device; the platform stores only what you type in the round log; do not record patients, colleagues or identifiable clinical material.

### F3 · Medium · Assessment — Readiness Check answer pattern

**Finding.** The correct answers are in positions 2, 2, 2, 2 and 3. A learner can guess the pattern.

**Recommendation.** Vary the position of correct answers in the source, or shuffle options per attempt (the scoring already uses stored answer indices server-side, so shuffling must map indices). Make this a content-standard rule for all quizzes.

### F4 · Medium · Privacy and platform — workshop logs are not included in the data export

**Finding.** Practice Round logs, self-ratings, reflections and the transfer plan are stored in `workshop_progress`, but the self-service export covers only profile, roles, consents and deletion requests. The same applies to lesson progress, quiz attempts and assignment submissions.

**Recommendation.** Extend `/api/account/export` to all learner tables; add a test that every table with a `user_id` column is included.

### F5 · Medium · Accessibility — participant materials

**Findings.**
- The four Workshop Pack PDFs are untagged (no structure for screen readers).
- The progress comparison table cannot be scrolled with the keyboard on narrow screens.
- W1 assumes the learner can speak, hear and stand; there is no adjustment route (audit §4.4).
- The four videos, when recorded, will need captions and transcripts.

**Recommendation.** Tagged, outlined PDFs (supported by the existing pipeline); keyboard-focusable scroll region; an “If you need an adjustment” section in the Briefing with seated delivery, written alternatives to pressure cards and a contact route; captions and transcripts as a condition for publishing each video.

### F6 · Medium · Facilitator documentation and privacy — peer recordings in the facilitated version

**Finding.** In the facilitated version, the timekeeper starts and stops the speaker's recording and peers watch each other's Recording 2. The guide does not say whose device is used or what happens to other people's recordings.

**Recommendation.** Add ground rules to the Facilitator Guide and Workbook: each speaker records only on their own device; no one records another participant without their agreement; recordings of others are not kept, shared or uploaded; feedback stays in the group.

### F7 · Medium · Accessibility — global findings affecting W1 pages

Colour contrast (subtle grey text, gold numerals) and the logo accessible-name mismatch appear on the W1 pages, as on the rest of the site. Corrections are proposed in the audit (§4.1); the colour changes need your decision because they alter approved brand colours.

### F8 · Medium · References — verification outstanding

**Finding.** W1 cites Oudejans & Pijpers (2009) and Ericsson et al. (1993); W1 builds on L07–L09 references. Citations are formatted correctly, but no one has yet checked each claim against the original paper.

**Recommendation.** Reference verification by a second person as part of the review workflow (audit §5.2), recording for each: source located, claim supported, page or section. Keep the cautious wording on evidence about stress and performance (e.g. training under mild anxiety, reappraisal) — it should be presented as promising evidence, not as an established effect.

### F9 · Medium · Educational quality — expert review not yet recorded

No medical educator or language specialist has signed off W1. The pressure cards (e.g. methodological challenge, a clinician questioning the result) and the endoscopy example are plausible, but plausibility should be confirmed by a clinician. Recommendation: two-reviewer sign-off before publication.

### F10 · Low · Wellbeing — pressure cards

Pressure cards deliberately create mild stress. The guidance already allows standard and stretch intensity. Recommendation: add one sentence that learners can choose standard cards only or skip the pressure element and still complete the workshop through a written recovery plan; do not refer to anxiety in clinical terms.

### F11 · Low · Content — Readiness Check wording

In “Admissions fell by fifteen per cent”, the model answer restates the number as “roughly one patient in seven”. The restatement is arithmetically correct (≈ 1 in 6.7) but “one patient in seven” could be heard as a proportion of patients rather than of admissions. Suggest “roughly one admission in seven fewer” or “about one in seven”.

### F12 · Low · Content — self-paced comprehension check

Without a listener, the delayed self-check (wait an hour, replay once) is a reasonable substitute but weaker evidence. Recommendation: state this limitation in the Final Task so learners interpret their own result cautiously.

### F13 · Low · IP — instructor and model-performance videos

Before the briefing and three model-performance videos are recorded: written contributor agreements (copyright transfer or licence with fields of exploitation) and image releases for everyone who appears (audit §2.8).

### F14 · Low · Scalability — template for Workshops II–VI

The W1 data model (steps, rounds, pressure cards, rubric, sessions) and the consistency checker are generic and reusable. Before W2, extract the checks into rules that apply to every workshop (timings, resources, outcome–evidence mapping, answer-position variation, accessibility checklist) so that each new workshop passes the same gate automatically.

## Risks if Workshops II–VI start before the gate is closed

| Risk | Consequence |
|---|---|
| F1 copied five times | Six workshops with an inaccurate completion claim; certificate rules harder to fix later |
| F2 not decided | Pressure to add uploads without a DPIA; inconsistent promises across workshops |
| Accessibility postponed | Six workshops of untagged materials and no adjustment route to retrofit |
| References and expert review postponed | Larger review backlog; risk of publishing unchecked claims |

## Decisions requested

1. **Round 3 recording:** option (a), as recommended, or (b).
2. **Completion wording (F1):** approve the two-state model (“Workshop completed” / “Assessed as Competent”).
3. **Brand colours (F7):** approve the darker gold `#9e8356` for text on light backgrounds and the adjusted greys, or propose alternatives.
4. **Corrections F1–F6:** approve implementation as the next step, before Workshops II–VI.
