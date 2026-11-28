# L04, L05 and L06 — Revision v3 for Review

**Status: Revised — awaiting instructor approval.** This is a narrowly scoped revision based on the instructor review of v2. The lessons were not rewritten. Their learning objectives, structure, teaching approach, assignments, answer keys and database logic are unchanged. No research findings, clinical claims, statistics or references were added. Versions 1 and 2 (`lesson-review-L04-L05-L06.pdf`, commit 362dd8e; `lesson-review-L04-L05-L06-v2.pdf`, commit 925837b) are kept unchanged.

This document is generated from the same source that feeds the platform. Correct quiz answers are marked with ✓.

## Summary

| Lesson | Teaching content* v2 | v3 | Quiz answer key |
|---|---|---|---|
| L04 · Intelligibility Before Accent | 1,743 words | 1,743 words | unchanged (C, B, D, A, C, D) |
| L05 · Stress, Rhythm and Medical Terminology | 1,384 words | 1,384 words | unchanged (A, D, B, C, D, A) |
| L06 · Spoken English for Presenters | 1,468 words | 1,526 words | unchanged (B, D, A, C, D, B) |

\*Introduction, sections, evidence and recommendation notes, and examples. All three remain within the 1,200–1,800-word standard. The L04 change is in a quiz option, which is not counted.

## Changes, with before and after wording

### 1. L06 — phrase bank, “This is the key point.”

- **Before:** “This is the key point: the benefit was greatest in older patients.”
- **After:** “This is the key point: early mobilisation was associated with a shorter hospital stay.”

### 2. L04 — quiz question 3, option D (the correct answer, still in position D)

- **Before:** “How many words a sound contrast distinguishes, and so how much confusing it matters”
- **After:** “How many words a sound contrast distinguishes, and therefore how much confusion it can cause”

### 3. L06 — section “Repetition, acronyms and contractions”

The restatement “thirty per cent of patients — almost one in three” is kept as an example for a proportion of patients. The explanation now distinguishes it from a relative risk reduction.

- **Before:** “Repeat the key message, restate an important number in a second form (“thirty per cent of patients — almost one in three”), and use the same term for the same thing throughout.”
- **After:** “Repeat the key message, restate an important number in a second form (“thirty per cent of patients — almost one in three”), and use the same term for the same thing throughout. A restatement like this works for a proportion of patients. It does not work for a relative risk reduction: a relative reduction of 30 per cent does not mean that one patient in three benefited, so say that the measure is relative and keep the precise figure on the slide, as in the example of the epidemiologist below.”

No other passage changed.

## Quality-assurance check

**Examples linked to a stated fictional source.** Every passage that refers to the L06 mobilisation study now reports only what its description states. That study is a retrospective cohort of 412 patients with community-acquired pneumonia, 2019–2023, mobilised within 24 hours of admission, with a median stay of 5 vs 7 days and p<0.01. Those passages are:

- the section on shorter sentences;
- the exercise model answer;
- the phrase-bank examples for “We wanted to know whether…”, “Here's what we did.”, “What did we find?”, “This is the key point.”, “So what does this mean in practice?” and “To sum up, …”.

The epidemiologist example and quiz question 6 keep the relative risk reduction (0.31) stated as relative.

**Stand-alone illustrative sentences.** The phrase banks of all three lessons contain short sentences that are not tied to any fictional study in the lesson. They are not presented as findings, and none contradicts a stated source. Examples:

- L04: “the lower dose worked faster”, “younger patients recovered sooner”;
- L05: “The diagnostic accuracy was eighty-five per cent”, “Blood pressure was controlled within two weeks”.

They were left unchanged. Please say if you would prefer them reworded as neutral, finding-free examples.

**One item for your decision.** The L06 phrase-bank example “In other words, the relative risk was about a third lower” restates the epidemiologist's 0.31 as a rounded relative figure. It stays relative, so it was not changed. If you prefer the exact “31 per cent” there, this is a one-line change.

**Consistency.** The corrected passages were checked in four places:

- the lesson source (`src/content/lessons/l04.ts`, `l06.ts`);
- the platform seed (`supabase/migrations/20261125000003_curriculum_content.sql`);
- the L06 handout (regenerated; the L04 and L05 handouts contain none of the changed passages, and their text is identical, so they were not regenerated);
- this review document.

## Unresolved source-verification items

No IPA transcription or bibliographic reference was changed in v3.

**References.** The 14 references below need independent verification of two things: the bibliographic details (volume, issue, pages, edition, publisher) and whether each lesson's summary of the finding matches the publication. I have not verified them against the publications themselves.

- **L04:**
  - Levis (2005), TESOL Quarterly 39(3), 369–377;
  - Munro & Derwing (1995), Language Learning 45(1), 73–97;
  - Munro & Derwing (2006), System 34(4), 520–531;
  - Jenkins (2000), OUP;
  - Smiljanić & Bradlow (2009), Language and Linguistics Compass 3(1), 236–264;
  - Bradlow & Bent (2008), Cognition 106(2), 707–729.
- **L05:**
  - Cutler & Norris (1988), Journal of Experimental Psychology: Human Perception and Performance 14(1), 113–121;
  - Field (2005), TESOL Quarterly 39(3), 399–423;
  - Roach (2009), 4th ed., CUP;
  - Jenkins (2000), OUP.
- **L06:**
  - Biber (1988), CUP;
  - Chafe (1982), in Tannen (Ed.), Ablex, 35–53;
  - Chaudron & Richards (1986), Applied Linguistics 7(2), 113–127;
  - Jung (2003), The Modern Language Journal 87(4), 562–577.
- **Summaries to check in particular:**
  - the functional-load finding (Munro & Derwing, 2006);
  - the rightward stress-shift finding (Field, 2005);
  - the higher-level versus lower-level marker finding (Chaudron & Richards, 1986);
  - the recall finding with signalling cues (Jung, 2003);
  - the description of the Lingua Franca Core and its status on weak forms (Jenkins, 2000).

**IPA.** The 19 terms in L04/L05 were checked by the course author against Cambridge Dictionary (UK) and Oxford Learner's Dictionaries (BrE). They are logged in `pronunciation-verification.md`. An independent check by a phonetics specialist or the instructor is still outstanding. Points to note:

- *diagnose*: the two dictionaries differ, and both forms are presented;
- *sixteen*: the stress is given for the word in isolation;
- *bronchiolitis*: no learner's-dictionary entry, so it is not used.

**Other open items.** The instructor demonstration videos for L04–L06 are not yet recorded.

---
