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

## L04 · Intelligibility Before Accent

| | |
|---|---|
| Review status | Revised — awaiting instructor approval |
| Module | 02 · English Speaking Foundations |
| Week · duration | Week 1 · 60 minutes (video, reading, exercise, quiz and assignment) |
| AI teacher | english speaking coach |
| Access | Enrolled students |
| Video | Instructor recording not yet produced |
| Teaching content | **1743 words** (introduction, sections, evidence and recommendation notes, examples; excludes quiz, phrase bank, headings and instructions) |
| Components | 3 examples · 8 phrases · 6 quiz questions (4 scenario-based) · 6 references |

### Introduction

In L01 you met three ideas that are easy to confuse: accent, comprehensibility and intelligibility. This lesson turns that distinction into a practical plan. Many doctors who present in English spend years trying to sound like a native speaker, and still feel that their accent holds them back. The research points in a more useful direction. Some features of pronunciation make a large difference to whether listeners understand you; others make almost none. International audiences, many of them listening in a second language themselves, need a small number of things from you: clear key words, recognisable stress, audible word endings and a pace that gives them time to process. In this lesson you will learn which features to prioritise, how to speak clearly without sounding artificial, and how to find your own personal priorities from a short recording — so that the practice time you have goes where it makes the biggest difference.

### Learning objectives

By the end of this lesson you will be able to:

- Explain the difference between aiming for a native-like accent and aiming for intelligibility, and choose the second as a working goal
- Identify the pronunciation features that most often affect understanding, and those that rarely do
- Diagnose your own top three intelligibility priorities from a recording of a short presentation extract
- Apply clear-speech techniques to key sentences without exaggeration

### Teaching content

#### Two goals: sounding native or being understood

Pronunciation teaching has long been pulled between two goals. The first is to sound as close as possible to a native speaker of a particular variety. The second is to be understood easily by the people who are actually listening. For a doctor presenting at an international congress, the second goal is both more useful and more achievable. A native-like accent is rarely reached by adults who learned English later in life, and it is not what audiences need. What they need is to recognise your words and follow your argument without effort.

Choosing intelligibility as your goal is not a lower standard. It is a more precise one. It asks you to work on the features that cause misunderstanding and to stop spending energy on features that do not. It also frees you from a common source of anxiety: the feeling that every trace of your first language is a mistake. Your accent is part of your professional identity; the aim is that it never stands between your audience and your message. If changing aspects of your accent is a personal goal, that is a legitimate choice, but it is not a requirement for professional credibility, and this programme does not assess it.

> **Research evidence.** Writers on pronunciation teaching distinguish a “nativeness principle” from an “intelligibility principle” and argue that, for most adult learners, teaching should aim at being understood rather than at a native-like accent. Research on second-language speech has also shown that a noticeable accent and full intelligibility can exist together. [1, 2]

#### Not all pronunciation features matter equally

Some sound contrasts in English distinguish many common words; others distinguish only a few. Linguists call this the functional load of a contrast. Confusing two sounds that separate many words — for example the vowels in “sit” and “seat”, or the consonants at the end of “rice” and “rise” — is more likely to cause misunderstanding than confusing two sounds that rarely change meaning. The practical consequence is that you can rank your pronunciation features by how much they matter, instead of trying to fix everything.

Research on communication between non-native speakers of English points in a similar direction. Features that most often caused breakdowns included certain consonant contrasts, the length of stressed vowels, the dropping of consonants at the start and end of words, and the placement of the main stress in a phrase. Other features, such as the exact quality of the “th” sounds or some vowel qualities, caused far fewer problems. These findings come from particular groups of speakers and are still debated, so treat them as a guide to priorities rather than as fixed rules.

> **Research evidence.** In an exploratory study, errors in sound contrasts with a high functional load affected listeners' judgements of comprehensibility more than errors in low-load contrasts. A separate analysis of interactions between non-native speakers proposed a “core” of features that matter most for mutual intelligibility; this proposal is influential but contested. [3, 4]

#### Three priorities for medical presenters

For most doctors presenting in English, three features deserve attention first. The first is word endings. Final consonants carry grammar and meaning: plural, past tense and many number words depend on them. “The patient improved” and “the patients improve” differ only in their endings; “sixteen” and “sixty” differ in their final sounds and stress. If you tend to soften or drop final consonants, practise saying the end of key words fully, especially before a pause.

The second is word stress. Listeners use the stressed syllable to find a word in their memory. A medical term with the stress in an unexpected place can become unrecognisable even when every sound is correct. L05 is devoted to this. The third is the main stress in a phrase: the word you emphasise tells the audience what is new or important, and L07 builds this into your delivery. Notice what is not on this list: removing your accent, perfecting every vowel, or copying a particular national variety.

> **Professional recommendation.** Work on word endings, word stress and phrase stress before anything else. This is Academy guidance based on the evidence above and on what most often causes misunderstanding in medical presentations; your own recording may show different priorities, and those come first.

#### Clear speech without exaggeration

When speakers try to be understood — by a listener in a noisy room, or by someone with less English — they naturally change how they speak. They slow down slightly, pause more often, articulate consonants more fully and make stressed syllables a little longer. This “clear speech” style can be learned and used on purpose, particularly for the sentences that matter most: your main message, your key results and every critical number.

Clear speech is not shouting, separating every syllable or speaking as if to a child. Those habits sound unnatural and can make you harder to follow, because they flatten the contrast between important and less important words. Use clear speech selectively: for a key sentence, slow down a little, give the stressed syllables full length, pronounce the final consonants and pause before and after. The rest of the talk can flow more naturally.

> **Research evidence.** A review of research on clear speech found that the changes speakers make when trying to be understood generally improve intelligibility for several groups of listeners, including non-native listeners and listeners in noise, although the size of the benefit varies between listener groups. [5]

#### Listeners adapt — help them do it quickly

Listeners are not fixed. Studies of accented speech show that listeners become better at understanding a particular speaker after a short period of exposure. This has a practical implication for presenters: at the start of your talk, your audience is still adjusting to your voice, your accent and your rhythm. The research does not define a fixed adaptation period, and how quickly listeners adjust varies with the audience, the setting and the speaker. As a practical rule, the Academy recommends treating roughly the first minute as the time to be most careful with clear speech, a moderate pace and a simple opening sentence.

Consistency also helps. If you pronounce a key term the same way each time, listeners learn it quickly. If you vary it, they must work it out again. Choose one pronunciation for each of your key terms, check it in a dictionary, and keep it throughout the talk.

> **Research evidence.** In laboratory experiments on perceptual adaptation, listeners' understanding of foreign-accented speech improved after brief exposure to it. The studies show that adaptation happens; they do not establish how long it takes for a particular audience in a real lecture hall. The advice about the first minute is an Academy recommendation based on these findings. [6]

#### Finding your own priorities

General guidance is useful, but your own priorities come from your own speech. Record a two-minute extract of a real talk on your phone. Then use two simple listeners. The first is a colleague, ideally one whose first language differs from yours: ask them to write down the key message and every number, and to mark any word they were unsure of. The second is an automatic transcript, which many phones and video platforms can produce. Automatic transcription is not the same as a human listener and is not an assessment of your pronunciation, but repeated errors on the same word are a useful signal that something in its pronunciation is unclear. Privacy: do not upload patient-identifiable information, confidential clinical material or recordings containing sensitive data to an external transcription service unless its use has been explicitly approved under your institution's policies and data-protection requirements. For this practice, use an extract that contains no patient data.

Collect the words that caused problems into a personal risk list: usually five to ten terms, numbers or phrases from your own field. For each, decide which of the three priorities is involved — an ending, a word stress or a phrase stress — and practise that feature in full sentences. Repeat the recording after two weeks and compare. This is the same evidence-based method you will use throughout the programme: measure, choose one priority, practise, measure again.

### Professional examples

*Illustrative, composite examples; names and details are fictional.*

**The missing endings** — *Internal medicine congress, results presented by a fictional registrar*

A fictional registrar reports: “Patient with lower dose improve faster.” Her colleagues in the room understand, because they can see the slide. Online participants, listening through laptop speakers, hear something closer to “patient … lower dose … improve”, and two of them ask afterwards whether the result was for one patient or for the group. In rehearsal she marks the endings she tends to soften — patients, improved, faster — and practises the key sentence with fully pronounced final consonants and a short pause before the result. The next time, the question does not arise.

**An accent that did not need fixing** — *Neurology grand round, a fictional consultant presenting in his third language*

A fictional consultant has spent months trying to change his vowels, with little effect, and still feels his accent is the problem. A colleague listens to a recording with him and notices something else: almost every misunderstanding comes from the stress in three key terms and from his speed in the results section. Two weeks of practice on those terms and on pausing make his talk much easier to follow, although his accent is unchanged. He stops apologising for his English at the start of talks.

**Using a transcript as a second listener** — *Paediatric research meeting, preparation by a fictional fellow*

A fictional paediatric research fellow records her five-minute talk, from which she has removed all patient details, and switches on the automatic captions of her video platform. The same three words are transcribed wrongly each time: “pneumonia”, “sixty” and “cohort”. She checks each in a dictionary, finds that she stresses “pneumonia” on the first syllable instead of the second (pneu-MO-ni-a) and that “sixty” loses its final syllable when she speaks fast, and practises those words in full sentences. She treats the transcript as a signal, not a verdict, and asks a colleague to confirm the changes.

### Phrase bank

| Expression | Use | Register | Pronunciation | Example in a presentation |
|---|---|---|---|---|
| **Let me say that clearly:** | Introducing a key sentence in clear-speech style | Neutral | Pause after “clearly”. | *Let me say that clearly: // the lower dose worked faster.* |
| **That's sixteen — one-six.** | Protecting a number that could be misheard | Neutral, spoken | Stress the second syllable of “sixteen”. | *The median stay was sixteen — one-six — days.* |
| **The term we use for this is…** | Introducing a key technical term once, clearly | Neutral – formal | — | *The term we use for this is community-acquired pneumonia.* |
| **In other words, …** | Rephrasing a point in simpler language | Neutral | — | *In other words, younger patients recovered sooner.* |
| **Let me spell that out.** | Explaining an abbreviation or a difficult term | Neutral | — | *Let me spell that out: NIV means non-invasive ventilation.* |
| **Can everyone hear me clearly?** | Checking audibility at the start | Neutral | Falling tone on “clearly”. | *Good morning. Can everyone hear me clearly, including online?* |
| **I'll repeat the key figure:** | Deliberate repetition of a number | Neutral | — | *I'll repeat the key figure: thirty per cent.* |
| **Please stop me if a term is unfamiliar.** | Inviting clarification in a teaching setting | Neutral, collegial | — | *Please stop me if a term is unfamiliar — this field has a lot of jargon.* |

*Using these in your presentations:* Choose the three sentences in your next talk that contain your key message and your two most important numbers. Introduce each with one expression from the phrase bank, say it in clear-speech style (slightly slower, full endings, pause before and after) and record it. Compare it with a natural reading of the same sentence: the clear version should sound careful, not artificial.

### Demonstration (video brief)

The instructor video for this lesson has not yet been recorded. It will show the same results sentence said three ways — rushed with weakened endings, over-articulated syllable by syllable, and in natural clear speech — and a short self-diagnosis using a recording and an automatic transcript. Notice that the clear version is only slightly slower than the natural one, and that the accent is the same in all three.

### Common mistakes

| Mistake | Instead |
|---|---|
| Trying to remove your accent completely | Aim to be understood: work on the features that cause misunderstanding. |
| Practising sounds in isolation only | Practise priority features in the full sentences of your own talks. |
| Dropping final consonants in key words | Pronounce endings fully, especially before a pause and in numbers. |
| Over-articulating every syllable | Use clear speech selectively, for key sentences, and keep the stress contrast. |
| Changing the pronunciation of a key term during the talk | Check it once in a dictionary and use the same pronunciation throughout. |
| Treating an automatic transcript as a judgement | Use repeated transcript errors as a signal, and confirm with a human listener. |

### Reflection

- Which features of your English have you spent most time trying to change — and do they actually cause misunderstanding?
- Which words in your field are most at risk of being misheard when you speak quickly?
- Who could act as an honest listener for your next recording?

### Practical exercise — Your intelligibility risk list

Find your own top three intelligibility priorities from a short recording.

1. Record a two-minute extract of a real talk: your opening and one results slide.
2. Ask a colleague to listen once and write down the key message, every number and any word they were unsure of. If no one is available, use an automatic transcript of the recording — but only for an extract with no patient-identifiable or confidential clinical information, unless the transcription service has been explicitly approved under your institution's policies and data-protection requirements.
3. List every word or number that was misheard or mis-transcribed, and add the five technical terms you use most.
4. For each item, note the likely cause: a word ending, a word stress or a phrase stress (or another cause you can name).
5. Choose your top three priorities and write the sentence from your talk in which you will practise each.

*Student prompt:* Paste your risk list with the likely cause for each item, your top three priorities and the practice sentences. · *Minimum:* 300 characters

**Self-check**

- You used at least one real listener or an automatic transcript, not only your own impression.
- Every item on the list has a likely cause.
- Your priorities are specific features, not “my accent”.
- Each priority has a practice sentence taken from your own talk.

**Model answer** *(fictional example; shown to the student only after they save their own response)*

> Listener: a colleague whose first language is Spanish; plus an automatic transcript.
> Misheard or mis-transcribed: “sixty” (heard as “sixteen”), “pneumonia” (transcribed as “ammonia”), “improved” (heard as “improve”), “cohort” (transcribed as “co-host”).
> Key terms added: oxygen saturation, high-flow, admission, readmission, paediatric.
> Likely causes: sixty — final syllable lost when speaking fast (ending and stress); pneumonia — stress on the first syllable instead of the second (word stress); improved — final -d dropped (ending); cohort — first vowel unclear and stress weak (word stress).
> Top three priorities:
> 1. Endings in results sentences — practice sentence: “Patients on high-flow improved faster.”
> 2. Word stress of pneumonia and cohort — practice sentence: “In our cohort of children with pneumonia…”
> 3. Protecting numbers — practice sentence: “Sixty — six-zero — per cent needed oxygen.”

### Knowledge check (6 questions · Pass: at least 5 of 6 questions correct)

**1. Which goal does this programme recommend for your pronunciation?**

- A. A native-like British accent
- B. A native-like American accent
- C. Being understood easily by your actual audience **✓ correct**
- D. Removing every trace of your first language

*Explanation shown to the student:* The intelligibility principle focuses on being understood; a noticeable accent and full intelligibility can exist together.

**2. [Scenario] Your colleague says that most of your misunderstandings come from three medical terms and your speed in the results section. What should you practise first?**

- A. General accent reduction exercises
- B. The stress of those three terms and your pacing of the results **✓ correct**
- C. All English vowel sounds in isolation
- D. Speaking more quickly to sound fluent

*Explanation shown to the student:* Work on the specific features that cause misunderstanding in your own speech before anything else.

**3. What does “functional load” describe?**

- A. How tiring a talk is for the speaker
- B. How many slides a talk contains
- C. How loudly a sound is produced
- D. How many words a sound contrast distinguishes, and therefore how much confusion it can cause **✓ correct**

*Explanation shown to the student:* Contrasts that separate many words carry a high functional load; errors in them are more likely to affect understanding.

**4. [Scenario] You say “The patient improve faster” when you mean “The patients improved faster”. Which priority does this show?**

- A. Word endings **✓ correct**
- B. Vowel quality
- C. Intonation in questions
- D. The “th” sound

*Explanation shown to the student:* Plural and past-tense endings carry meaning; dropping final consonants changes what listeners understand.

**5. [Scenario] You want your key result to be understood by an international online audience. What is the best way to say it?**

- A. Separate every syllable with a pause
- B. Say it louder and faster than the rest
- C. Slightly slower, with full word endings, clear stress and a pause before and after **✓ correct**
- D. Read it from the slide without looking up

*Explanation shown to the student:* Natural clear speech improves intelligibility; over-articulation flattens stress and sounds artificial.

**6. [Scenario] An automatic transcript repeatedly writes “ammonia” when you say “pneumonia”. What should you conclude?**

- A. Your English is not good enough to present
- B. Ignore it, because transcripts are always wrong
- C. Stop using the term in your talks
- D. Check the word's stress in a dictionary and confirm the change with a human listener **✓ correct**

*Explanation shown to the student:* Repeated transcript errors are a useful signal, not a verdict; confirm with a dictionary and a listener.

### Assignment — Intelligibility plan for your next talk

Write an intelligibility plan for a real presentation you will give. Include: (1) your risk list of 5–10 words, numbers or phrases, with the likely cause of each; (2) your top three priorities and why you chose them; (3) how you will practise each priority in sentences from your talk over the next two weeks; and (4) how you will measure progress — the listener or transcript you will use and when you will record again. Finish with a short reflection (100–200 words) on how choosing intelligibility rather than a native-like accent changes the way you prepare.

*Minimum length:* 250 words · Required for completion

| Assessment criterion | What instructors look for |
|---|---|
| Evidence | The risk list comes from a real listener or transcript, not only from self-impression. |
| Prioritisation | Three specific features are chosen, with a reason linked to understanding. |
| Practice plan | Each priority is practised in sentences from the learner's own talk, with a realistic schedule. |
| Measurement | A clear method to measure progress, with a date for re-recording. |
| Reflection | Shows how the intelligibility goal changes preparation and confidence. |

### Downloadable materials

- **L04 Lesson handout** — Intelligibility priorities, clear-speech checklist, risk-list template and phrase bank. `/materials/lessons/L04-handout.pdf`

### References

1. Levis, J. M. (2005). Changing contexts and shifting paradigms in pronunciation teaching. TESOL Quarterly, 39(3), 369–377.
2. Munro, M. J., & Derwing, T. M. (1995). Foreign accent, comprehensibility, and intelligibility in the speech of second language learners. Language Learning, 45(1), 73–97.
3. Munro, M. J., & Derwing, T. M. (2006). The functional load principle in ESL pronunciation instruction: An exploratory study. System, 34(4), 520–531.
4. Jenkins, J. (2000). The Phonology of English as an International Language. Oxford University Press.
5. Smiljanić, R., & Bradlow, A. R. (2009). Speaking and hearing clearly: Talker and listener factors in speaking style changes. Language and Linguistics Compass, 3(1), 236–264.
6. Bradlow, A. R., & Bent, T. (2008). Perceptual adaptation to non-native speech. Cognition, 106(2), 707–729.

### Completion criteria

The lesson can be marked complete only after the student has saved the practical exercise, passed the knowledge check (Pass: at least 5 of 6 questions correct) and submitted the assignment. This is enforced by the database.

---

## L05 · Stress, Rhythm and Medical Terminology

| | |
|---|---|
| Review status | Revised — awaiting instructor approval |
| Module | 02 · English Speaking Foundations |
| Week · duration | Week 2 · 65 minutes (video, reading, exercise, quiz and assignment) |
| AI teacher | english speaking coach |
| Access | Enrolled students |
| Video | Instructor recording not yet produced |
| Teaching content | **1384 words** (introduction, sections, evidence and recommendation notes, examples; excludes quiz, phrase bank, headings and instructions) |
| Components | 3 examples · 8 phrases · 6 quiz questions (4 scenario-based) · 4 references |

### Introduction

Medical English is full of long words, and long words are where pronunciation most often goes wrong. Many of them look similar across European languages, which is both a help and a trap: the spelling is familiar, but the stress in English often falls on a different syllable from the one you would choose in your first language. When the stress is in the wrong place, a listener may not recognise a word at all, even if every sound in it is correct. In L04 you identified word stress as one of three priorities for intelligibility. This lesson gives you the tools to deal with it systematically. You will learn the patterns that most common medical suffixes follow, the word families in which the stress moves, how compound terms are stressed, and how the rhythm of English — strong and weak syllables — affects the way your sentences sound. You will finish by building and practising a personal terminology list for your own specialty.

### Learning objectives

By the end of this lesson you will be able to:

- Explain why word stress matters for word recognition by listeners
- Predict the stressed syllable of medical terms with common suffixes, and check it in a dictionary
- Pronounce word families in which the stress moves, such as metastasis and metastatic
- Stress compound medical terms correctly and use weak forms in natural speech
- Build and practise a personal terminology list of 15–20 terms from your own specialty

### Teaching content

#### Why stress matters more than individual sounds

In English, one syllable in each word of more than one syllable is stressed: it is a little longer, a little louder and often higher in pitch, and its vowel is full. The other syllables are weaker, and many of their vowels reduce to the short neutral sound called schwa — the first sound in “about”. Listeners use this pattern to find words in a stream of speech. Strong syllables act as anchors: when listeners hear one, they tend to treat it as the beginning of a new word and search their memory from there.

This is why misplaced stress can be so disruptive. If you say a familiar word with the stress on an unexpected syllable, the listener searches for the wrong word, or for a word that does not exist. Research on listening in a second language has found that misplaced stress can make a word harder to understand than a mispronounced sound, especially when the stress moves to the wrong side of the word. For presenters, the practical conclusion is simple: learn the stress of every key term in your talk.

> **Research evidence.** Experimental work on English word recognition suggests that listeners treat strong syllables as likely word beginnings. A study with native and non-native listeners found that misplaced lexical stress reduced intelligibility, particularly when the stress shifted to the right of its expected position. [1, 2]

#### Suffix families: stress you can predict

Many medical terms are built from Greek and Latin elements, and several common suffixes have a regular effect on stress. Words ending in “-ology” are stressed on “-ol-”: car-di-OL-o-gy /ˌkɑː.diˈɒl.ə.dʒi/. Words ending in “-ectomy” are stressed on “-ec-”: ton-sil-LEC-to-my /ˌtɒn.sɪˈlek.tə.mi/. Words ending in “-itis” are stressed on the syllable “-i-” that comes just before “-tis”: ar-THRI-tis /ɑːˈθraɪ.tɪs/. Many words ending in “-osis” are stressed on “-o-”: throm-BO-sis /θrɒmˈbəʊ.sɪs/, di-ag-NO-sis /ˌdaɪ.əɡˈnəʊ.sɪs/.

Adjectives ending in “-ic” are usually stressed on the syllable immediately before the ending: di-ag-NOS-tic /ˌdaɪ.əɡˈnɒs.tɪk/, pae-di-AT-ric /ˌpiː.diˈæt.rɪk/. Other frequent terms are less predictable and simply need to be learned: pneu-MO-ni-a /njuːˈməʊ.ni.ə/, chem-o-THER-a-py /ˌkiː.məʊˈθer.ə.pi/, hae-mo-GLO-bin /ˌhiː.məˈɡləʊ.bɪn/. Patterns are a useful starting point, not a guarantee: there are exceptions, so check every key term in a learner's dictionary that shows British and American pronunciation and lets you listen to it.

> **Professional recommendation.** Use the suffix patterns to make a first guess, then confirm each key term in a dictionary with audio. Academy guidance: the transcriptions in this lesson were checked against Cambridge Dictionary (UK) and Oxford Learner's Dictionaries (British English) and are given in Cambridge notation, with dots between syllables.

#### When the stress moves within a word family

Some of the most common errors happen when the stress moves between related words. A noun and its adjective may be stressed on different syllables, and speakers often carry the stress of one into the other. Compare me-TAS-ta-sis /meˈtæs.tə.sɪs/ with met-a-STAT-ic /ˌmet.əˈstæt.ɪk/, an-AES-the-tist /əˈniːs.θə.tɪst/ with an-aes-THET-ic /ˌæn.əsˈθet.ɪk/, and a-NAL-y-sis /əˈnæl.ə.sɪs/ with AN-a-lyse /ˈæn.əl.aɪz/. In each pair the stressed vowel changes as well, and the unstressed vowels weaken.

Dictionaries sometimes differ, and that is useful information too. For “diagnose”, Cambridge Dictionary gives the main stress on the last syllable (/ˌdaɪ.əɡˈnəʊz/), while Oxford Learner's Dictionaries gives it on the first (/ˈdaɪəɡnəʊz/). Both are acceptable. Where reputable dictionaries disagree, choose one pronunciation and use it consistently; where they agree, follow them.

> **Professional recommendation.** When you learn a new term, learn the whole family at once — the noun, the adjective, the verb and the specialist — and practise them together in one sentence, for example: “Metastatic disease was present; metastasis to the liver was confirmed.”

#### Compound terms

Many everyday medical terms are compounds of two words. In most noun compounds the main stress falls on the first word: BLOOD pressure /ˈblʌd ˌpreʃ.ər/, HEART attack /ˈhɑːt əˌtæk/. If you stress the second word instead, the compound can sound like an ordinary phrase, and the listener may briefly hear something different from what you mean.

Not every compound follows this pattern, and stress in longer phrases also depends on what is new in your sentence, which you will practise in L07. For the compounds you use most often in your field, listen to the dictionary audio and note where the main stress falls.

#### Rhythm: strong and weak syllables

English sentences have a rhythm created by the contrast between stressed and unstressed syllables. Content words — nouns, main verbs, adjectives and most adverbs — usually carry stress. Grammar words such as “a”, “the”, “of”, “to”, “and”, “was” and “for” are usually unstressed and often take a weak form with schwa: “of” sounds like /əv/, “to” like /tə/, “was” like /wəz/. In “The results of the trial were published”, the strong syllables are “re-SULTS”, “TRI-al” and “PUB-lished”.

Weak forms are a natural part of fluent English: they are useful to recognise, because you will hear them constantly, and worth practising, because using them helps your key words stand out. They are not, however, a compulsory condition of being understood, and some research on English as an international language treats them as less important than word stress and phrase stress. Do not let them become a source of anxiety. A useful compromise for presenters is to make content words clearly strong and avoid stressing every grammar word, rather than attempting to reproduce every weak form of a native speaker.

> **Research evidence.** Standard descriptions of English phonology explain stress-based rhythm and the weak forms of function words. Research on English as a lingua franca has argued that weak forms matter less for mutual intelligibility than word stress or the main stress in a phrase; this view is widely cited but debated. [3, 4]

#### Building your terminology list

The most efficient way to apply this lesson is to build a personal list of the 15–20 terms you use most in your talks. For each term, write the stress pattern in capitals (e.g. throm-BO-sis), check it in a dictionary with audio, and record yourself saying it in a sentence from your own work. Include numbers, drug names and abbreviations you say aloud.

Practise long terms by back-chaining: start with the last syllable and add one syllable at a time towards the beginning, keeping the stress in place — “-py”, “-ra-py”, “THER-a-py”, “-o-THER-a-py”, “chem-o-THER-a-py”. Then say the word in a full sentence at presentation speed. Back-chaining keeps the end of the word intact and stops you from rushing through it. Revisit your list before every important talk.

### Professional examples

*Illustrative, composite examples; names and details are fictional.*

**The word that disappeared** — *Oncology tumour board with international participants, a fictional consultant presenting*

A fictional consultant presents a case and says “meta-STA-sis”, carrying the stress of “metastatic” into the noun. Two participants online lose the thread for several seconds, and one later asks what the “new term” was. After the meeting she checks the family in a dictionary, writes “me-TAS-ta-sis / met-a-STAT-ic” at the top of her notes, and practises both words in one sentence before her next case.

**A compound that changed meaning** — *Cardiology teaching session, a fictional registrar*

A fictional registrar repeatedly stresses the second word of “heart attack” and “blood pressure”. The terms are still understood, but colleagues notice that the important information in his sentences — the numbers and the outcomes — is less prominent, because the stress is spent on the wrong words. When he moves the stress to the first word of each compound, his results sentences become easier to follow.

**Using dictionary disagreement** — *Internal medicine conference, preparation by a fictional fellow*

A fictional fellow notices that two dictionaries stress “diagnose” differently and worries that she has been saying it wrong. She learns that both forms are acceptable, chooses Cambridge Dictionary's pattern and uses it consistently. Her preparation time goes instead to “diagnosis” and “diagnostic”, where the two dictionaries agree and where she had been misplacing the stress.

### Phrase bank

| Expression | Use | Register | Pronunciation | Example in a presentation |
|---|---|---|---|---|
| **We confirmed the diagnosis of…** | Stating a diagnosis | Neutral – formal | di-ag-NO-sis /ˌdaɪ.əɡˈnəʊ.sɪs/ | *We confirmed the diagnosis of deep vein thrombosis.* |
| **The diagnostic accuracy was…** | Reporting test performance | Formal | di-ag-NOS-tic /ˌdaɪ.əɡˈnɒs.tɪk/ | *The diagnostic accuracy was eighty-five per cent.* |
| **There was no evidence of metastasis.** | Reporting a negative finding | Formal | me-TAS-ta-sis /meˈtæs.tə.sɪs/ | *On staging CT there was no evidence of metastasis.* |
| **Patients with metastatic disease…** | Describing a subgroup | Formal | met-a-STAT-ic /ˌmet.əˈstæt.ɪk/ | *Patients with metastatic disease were excluded.* |
| **Under general anaesthetic…** | Describing a procedure | Neutral | an-aes-THET-ic /ˌæn.əsˈθet.ɪk/ | *The procedure was performed under general anaesthetic.* |
| **The anaesthetist recommended…** | Referring to a colleague's decision | Neutral | an-AES-the-tist /əˈniːs.θə.tɪst/ | *The anaesthetist recommended a regional technique.* |
| **Blood pressure was controlled.** | Reporting a clinical parameter | Neutral | BLOOD pressure /ˈblʌd ˌpreʃ.ər/ | *Blood pressure was controlled within two weeks.* |
| **after a first heart attack** | Defining a population in plain language | Neutral, lay-friendly | HEART attack /ˈhɑːt əˌtæk/ | *We followed patients after a first heart attack for five years.* |

*Using these in your presentations:* Say each phrase-bank example three times: slowly while tapping the stressed syllable, at normal speed, and at presentation speed. Then replace the medical term with one from your own terminology list that has a similar stress pattern, and record the new sentence.

### Demonstration (video brief)

The instructor video for this lesson has not yet been recorded. It will show back-chaining for “chemotherapy” and “haemoglobin”, the stress shift in metastasis / metastatic and anaesthetist / anaesthetic, and a results sentence read first with every word stressed and then with natural strong and weak syllables. Notice how the key terms become clearer when the grammar words are weaker.

### Common mistakes

| Mistake | Instead |
|---|---|
| Using the stress of your first language for international terms | Check each key term in an English dictionary with audio; similar spelling does not mean similar stress. |
| Carrying the stress from one word to its family member | Learn families together: me-TAS-ta-sis, met-a-STAT-ic. |
| Stressing the second word of a compound | Stress the first word in most noun compounds: BLOOD pressure, HEART attack. |
| Stressing every word equally when nervous | Keep content words strong and grammar words light. |
| Rushing through the end of long terms | Back-chain long words so the final syllables stay intact. |
| Worrying about dictionary differences | Where reputable dictionaries disagree, choose one form and use it consistently. |

### Reflection

- Which three terms in your specialty do you feel least sure how to stress?
- Has a colleague ever not understood a term that you thought you said clearly? What might the stress have been?
- How will you keep your terminology list up to date as you prepare new talks?

### Practical exercise — Your terminology list

Build and practise a personal list of the terms you use most in your talks.

1. Choose 15–20 terms you use often in presentations, including at least two word families and two compounds.
2. Make a first guess at the stress of each term using the suffix patterns, and write it in capitals.
3. Check each term in Cambridge Dictionary or Oxford Learner's Dictionaries and listen to the audio; correct your guesses.
4. Mark the terms where your guess was wrong — these are your priorities.
5. Back-chain each priority term, then record it in a sentence from your own talk.

*Student prompt:* Paste your terminology list with the stress patterns, mark the terms you had wrong, and write the practice sentence for three of them. · *Minimum:* 300 characters

**Self-check**

- Every term was checked in a dictionary with audio, not only guessed.
- The list includes at least two word families and two compounds.
- Terms you had wrong are marked as priorities.
- Each practice sentence comes from your own work.

**Model answer** *(fictional example; shown to the student only after they save their own response)*

> Specialty: haematology.
> Terms (stress in capitals, checked in Cambridge and Oxford): hae-mo-GLO-bin, throm-BO-sis, di-ag-NO-sis, di-ag-NOS-tic, chem-o-THER-a-py, an-AES-the-tist / an-aes-THET-ic, me-TAS-ta-sis / met-a-STAT-ic, pneu-MO-ni-a, a-NAL-y-sis / AN-a-lyse, sig-NIF-i-cant, CO-hort, BLOOD pressure, HEART attack, BI-op-sy, ar-THRI-tis.
> Guesses that were wrong: haemoglobin (I stressed HAE), metastasis (I stressed STA), analyse (I stressed LYSE), biopsy (I stressed OP).
> Practice sentences:
> 1. “Haemoglobin rose by two grams within a month.” (hae-mo-GLO-bin)
> 2. “Metastasis to the bone marrow was excluded.” (me-TAS-ta-sis)
> 3. “We analysed every biopsy twice.” (AN-a-lysed, BI-op-sy)

### Knowledge check (6 questions · Pass: at least 5 of 6 questions correct)

**1. Why can misplaced word stress cause more difficulty than a mispronounced sound?**

- A. Listeners use stressed syllables to find words, so misplaced stress sends them to the wrong word **✓ correct**
- B. Stress changes the spelling of the word
- C. Listeners ignore stressed syllables
- D. Stress only matters in questions

*Explanation shown to the student:* Listeners treat strong syllables as anchors for recognising words; misplaced stress can make a familiar word unrecognisable.

**2. Where is the main stress in “tonsillectomy”?**

- A. TON-sil-lec-to-my
- B. ton-SIL-lec-to-my
- C. ton-sil-lec-TO-my
- D. ton-sil-LEC-to-my **✓ correct**

*Explanation shown to the student:* Words ending in “-ectomy” are stressed on “-ec-”: /ˌtɒn.sɪˈlek.tə.mi/.

**3. [Scenario] You say “meta-STA-sis” in a tumour board and online colleagues lose the thread. What is the most likely cause?**

- A. Your accent is too strong
- B. You carried the stress of “metastatic” into “metastasis” **✓ correct**
- C. You spoke too slowly
- D. The term is too technical for the audience

*Explanation shown to the student:* The noun is me-TAS-ta-sis; the adjective is met-a-STAT-ic. Learn the family together.

**4. [Scenario] Two reputable dictionaries stress “diagnose” on different syllables. What should you do?**

- A. Avoid the word in presentations
- B. Stress both syllables equally
- C. Choose one acceptable form and use it consistently **✓ correct**
- D. Ask the audience which they prefer

*Explanation shown to the student:* Where reputable dictionaries differ, both forms are acceptable; consistency helps listeners.

**5. [Scenario] You are preparing a cardiology talk. How should you stress “blood pressure” and “heart attack”?**

- A. On the second word of each
- B. Equally on both words
- C. It does not matter in compounds
- D. On the first word of each **✓ correct**

*Explanation shown to the student:* Most noun compounds are stressed on the first word: BLOOD pressure, HEART attack.

**6. [Scenario] You keep rushing the end of “chemotherapy” at presentation speed. Which technique helps most?**

- A. Back-chaining from the last syllable while keeping the stress in place **✓ correct**
- B. Saying the word louder
- C. Replacing it with an abbreviation on every slide
- D. Spelling it aloud

*Explanation shown to the student:* Back-chaining keeps the final syllables intact and fixes the stress before you add speed.

### Assignment — Terminology and rhythm recording

Record a one-to-two-minute extract from a real talk that contains at least eight terms from your terminology list. Before recording, mark the stressed syllables of the terms and the strong syllables of two key sentences. Submit: (1) your terminology list of 15–20 terms with checked stress patterns and the dictionary you used; (2) the marked text of your extract; (3) a self-assessment after listening to the recording — which terms were stressed correctly, which were not, and whether the key words in your two sentences stood out; and (4) a plan for the three terms you will practise next. Finish with a short reflection (100–200 words) on what you learned about the stress of terms you had been using for years.

*Minimum length:* 250 words · Required for completion

| Assessment criterion | What instructors look for |
|---|---|
| Accuracy | Stress patterns are checked in a named dictionary and marked correctly. |
| Coverage | The list includes word families and compounds relevant to the learner's specialty. |
| Rhythm | Strong syllables of key sentences are marked, and the self-assessment comments on them. |
| Self-assessment | Honest analysis of the recording, naming specific terms. |
| Reflection | Shows insight into long-standing habits and a realistic practice plan. |

### Downloadable materials

- **L05 Lesson handout** — Suffix stress patterns, stress-shifting families, compounds, back-chaining guide and terminology-list template. `/materials/lessons/L05-handout.pdf`

### References

1. Cutler, A., & Norris, D. (1988). The role of strong syllables in segmentation for lexical access. Journal of Experimental Psychology: Human Perception and Performance, 14(1), 113–121.
2. Field, J. (2005). Intelligibility and the listener: The role of lexical stress. TESOL Quarterly, 39(3), 399–423.
3. Roach, P. (2009). English Phonetics and Phonology: A Practical Course (4th ed.). Cambridge University Press.
4. Jenkins, J. (2000). The Phonology of English as an International Language. Oxford University Press.

### Completion criteria

The lesson can be marked complete only after the student has saved the practical exercise, passed the knowledge check (Pass: at least 5 of 6 questions correct) and submitted the assignment. This is enforced by the database.

---

## L06 · Spoken English for Presenters

| | |
|---|---|
| Review status | Revised — awaiting instructor approval |
| Module | 02 · English Speaking Foundations |
| Week · duration | Week 2 · 60 minutes (video, reading, exercise, quiz and assignment) |
| AI teacher | english speaking coach |
| Access | Enrolled students |
| Video | Instructor recording not yet produced |
| Teaching content | **1526 words** (introduction, sections, evidence and recommendation notes, examples; excludes quiz, phrase bank, headings and instructions) |
| Components | 3 examples · 8 phrases · 6 quiz questions (4 scenario-based) · 4 references |

### Introduction

Doctors learn to write scientific English long before they learn to speak it in public. Abstracts, papers and case reports reward long sentences, dense noun phrases and passive verbs that keep the author out of the picture. When this written style is read aloud, it becomes very hard to follow: the listener cannot go back, cannot see the punctuation and must hold the beginning of a long sentence in memory while waiting for the verb. Many presentations that seem difficult because of the speaker's English are really difficult because they are written English spoken aloud. This lesson shows you how spoken English for presenters differs from written English, and how to convert your material. You will practise shorter sentences, clear information order, verbs instead of heavy noun phrases, the active voice, and the signposting language that tells listeners where they are. The changes are simple, and they also make speaking easier for you: shorter sentences are easier to say, to remember and to recover when you lose a word.

### Learning objectives

By the end of this lesson you will be able to:

- Identify the features of written scientific style that make a spoken presentation hard to follow
- Rewrite written sentences into spoken style using shorter sentences, verbs and the active voice
- Use signposting and discourse markers to guide listeners through a talk
- Convert a written abstract into a spoken script of about one minute

### Teaching content

#### Writing for the eye, speaking for the ear

Written and spoken English are not two levels of the same thing; they are adapted to different conditions. A reader controls the pace, can reread a difficult sentence and sees headings, paragraphs and punctuation. A listener has none of these. They receive the message once, at your speed, and must build its structure in their head as they go. Spoken language has adapted to this: it tends to use shorter units of information, more verbs, more repetition and more explicit links between ideas.

Research comparing speech and writing has described these differences in detail. Writing tends to pack information into long noun phrases and subordinate clauses; speech tends to add information in a sequence of shorter units, often joined by “and”, “but” and “so”. A presentation sits between the two: it is planned like writing but received like speech. The listener's conditions should decide the style.

> **Research evidence.** Corpus-based and discourse research has found systematic differences between spoken and written English: written texts typically show more integrated, information-dense structures, such as long noun phrases and nominalisations, while speech shows more fragmented, sequential and involved structures. [1, 2]

#### Shorter sentences, clearer order

The simplest change is sentence length. A sentence that works on a page — “In this retrospective cohort of 412 patients admitted with community-acquired pneumonia between 2019 and 2023, early mobilisation was associated with a significant reduction in length of stay” — is too long to follow by ear. Split it: “We looked back at 412 patients with pneumonia. Those who got out of bed early had shorter hospital stays.” Then add the detail the audience needs: “A median of five days, compared with seven.”

Information order matters as much as length. Listeners understand best when a sentence starts with something they already know and ends with the new information. Put the subject and verb early, and keep the important new point — the result, the number, the recommendation — near the end, where you can stress it and pause after it. Avoid long introductions before the verb, such as a list of conditions or a full study description: give the main point first, then the conditions.

> **Professional recommendation.** Academy guidance: as a working rule, aim for one idea per spoken sentence, and keep most spoken sentences short enough to say comfortably in one breath. Long sentences are not wrong, but each one should be a deliberate choice.

#### Verbs, not heavy noun phrases

Scientific writing often turns actions into nouns: “the administration of”, “the performance of an evaluation”, “a reduction in mortality was observed”. These nominalisations make sentences longer and hide who did what. In speech, use the verb: “we gave”, “we evaluated”, “fewer patients died”. The sentence becomes shorter, easier to stress and easier to remember.

The same applies to the passive voice. “Patients were randomised and outcomes were assessed at six months” is correct, but “we randomised patients and assessed them at six months” is easier to follow and sounds more confident. The passive is still useful when the actor is unknown or unimportant, or when you want to keep the focus on the patient — but in a presentation, “we” is your friend. It also reminds the audience that real people did this work.

#### Signposting: telling listeners where they are

A reader sees the structure of a paper at a glance. A listener needs you to say it. Signposts are short expressions that announce what is coming, mark the move from one part to the next and show how ideas relate: “I'll cover three things”, “First”, “Moving on to the results”, “This is the key point”, “So what does this mean in practice?”, “To sum up”. Discourse markers such as “so”, “now”, “but”, “in other words” and “the reason is” do similar work within sections.

Research on lecture listening suggests that some of these markers help listeners in a second language more than others. Markers that announce structure at a high level — “The second point I want to make is…”, “Let's now turn to…” — appear to be more helpful than small, frequent fillers such as “well” or “OK”, which add little. Use signposts deliberately at each change of section, and say them clearly, with a short pause before and after. L11 shows how to build them into your opening and closing; here, the aim is to have the language ready.

> **Research evidence.** In a study of second-language listeners, explicit higher-level markers of lecture structure aided recall more than lower-level, local markers. A later study found that lectures with signalling cues were recalled better by second-language listeners than the same lectures without them. Both studies were in academic lecture settings rather than medical conferences. [3, 4]

#### Repetition, acronyms and contractions

In writing, repetition is a fault. In speech, it is a service. Repeat the key message, restate an important number in a second form (“thirty per cent of patients — almost one in three”), and use the same term for the same thing throughout. A restatement like this works for a proportion of patients. It does not work for a relative risk reduction: a relative reduction of 30 per cent does not mean that one patient in three benefited, so say that the measure is relative and keep the precise figure on the slide, as in the example of the epidemiologist below. Listeners who missed a word the first time get a second chance.

Acronyms are a common barrier in international audiences. Say the full term the first time and only then the acronym, and limit yourself to the few that are truly needed: “non-invasive ventilation — NIV”. Contractions such as “we'll”, “it's” and “don't” are normal in spoken English, including in formal presentations, and they make your speech sound more natural. Use them where they feel comfortable; full forms remain appropriate in some contexts — when you want to stress a word (“This does not apply to children.”) or when you quote a guideline or a formal statement word for word.

#### Converting an abstract into a spoken script

A practical way to apply this lesson is to convert your own abstract into a script of about one minute. Read the abstract aloud and mark every place where you need to take a breath in the middle of a sentence or where you lose track. Then rewrite: one idea per sentence, verbs instead of nominalisations, “we” instead of the passive, numbers rounded or restated, acronyms explained, and a signpost before each part — background, what you did, what you found and what it means.

Finally, read the new version aloud and record it. It should take no longer than the original and will almost always be easier to say. You are not simplifying the science; you are changing the form so that the science reaches the listener. Keep the study design and the type of result exactly as they are: an association stays an association, a relative measure stays relative, and no finding or recommendation is added.

### Professional examples

*Illustrative, composite examples; names and details are fictional.*

**The abstract that could not be followed** — *European congress, oral abstract session, a fictional researcher*

A fictional researcher reads her abstract aloud as her opening: forty words before the first verb, three acronyms and two passive clauses. The chair, who knows the field, follows; most of the room does not. In rehearsal for her next talk she rewrites the same content in seven short sentences, starting with “We wanted to know whether…”, and adds a signpost before the results. Her talk is no longer than before, and the questions afterwards are about her findings, not about what she meant.

**Too many small signposts** — *Grand round, a fictional junior doctor*

A fictional junior doctor has been told to use signposting, and now begins almost every sentence with “OK”, “so” or “now”. The listeners hear many markers but cannot tell where the main sections begin. A supervisor suggests fewer, stronger signposts at the real transitions — “That was the background. Now, the case itself.” — and a short pause after each. The structure becomes clear and the filler words drop away.

**Restating a number** — *Public health meeting, a fictional epidemiologist*

A fictional epidemiologist used to say “an adjusted relative risk reduction of 0.31 was observed”. In spoken style she now says: “After adjustment, the relative risk of infection was reduced by 31 per cent. That is a relative reduction, compared with the other group — not 31 fewer infections in every hundred patients.” The precise figure stays on the slide; the spoken version is the one the audience remembers, and it keeps the meaning of the measure.

### Phrase bank

| Expression | Use | Register | Pronunciation | Example in a presentation |
|---|---|---|---|---|
| **We wanted to know whether…** | Stating the research question in spoken style | Neutral | — | *We wanted to know whether early mobilisation is linked to a shorter hospital stay.* |
| **Here's what we did.** | Signposting the methods | Neutral, spoken | Pause after “did”. | *Here's what we did. We looked back at 412 patients.* |
| **What did we find?** | Rhetorical question introducing results | Neutral, spoken | Falling tone on “find”. | *What did we find? Patients who mobilised early had a shorter stay: a median of five days instead of seven.* |
| **This is the key point.** | Highlighting the main finding | Neutral | — | *This is the key point: early mobilisation was associated with a shorter hospital stay.* |
| **Let's now turn to…** | Moving to a new section | Neutral – formal | — | *Let's now turn to what this means for practice.* |
| **In other words, …** | Restating a complex point more simply | Neutral | — | *In other words, the relative risk was about a third lower.* |
| **So what does this mean in practice?** | Moving from results to implications | Neutral | — | *So what does this mean in practice? Because this was an observational study, it shows a link, not cause and effect.* |
| **To sum up, …** | Signalling the conclusion | Neutral – formal | — | *To sum up, early mobilisation was associated with a shorter hospital stay.* |

*Using these in your presentations:* Take the four sections of your next talk — background, methods, results and implications — and choose one signpost from the phrase bank to introduce each. Say the four signposts in sequence with the first sentence of each section, pausing before and after each signpost, and record the result. It should sound like a map of your talk.

### Demonstration (video brief)

The instructor video for this lesson has not yet been recorded. It will show one abstract read aloud in its written form and then delivered as a converted one-minute spoken script, with the changes highlighted on screen: shorter sentences, verbs instead of nominalisations, the active voice, restated numbers and signposts. Notice that the spoken version is not less scientific; it is easier to follow.

### Common mistakes

| Mistake | Instead |
|---|---|
| Reading the abstract aloud as the talk | Convert it into spoken style before you present. |
| Starting sentences with long descriptions before the verb | Put the subject and verb early; add conditions afterwards. |
| Using nominalisations such as “the administration of” | Use the verb: “we gave”. |
| Using the passive throughout | Use “we” for what your team did; keep the passive for special cases. |
| Filling every sentence with “OK” and “so” | Use fewer, stronger signposts at real transitions, with a pause. |
| Introducing many acronyms | Say the full term first and keep only the acronyms you really need. |

### Reflection

- Which of your habits from scientific writing appear most often when you present?
- Where in your talks do listeners most often seem to lose the thread?
- Which signposts feel natural to you, and which would you like to add to your repertoire?

### Practical exercise — From abstract to spoken script

Convert a written abstract of your own into a one-minute spoken script.

1. Choose an abstract you have written, or the summary of a talk you will give.
2. Read it aloud once and mark every point where you needed an extra breath or lost track.
3. Rewrite it: one idea per sentence, verbs instead of nominalisations, “we” instead of the passive, acronyms explained, and numbers rounded or restated.
4. Add a signpost before the background, the methods, the results and the implications.
5. Read the new version aloud, time it, and note the three changes that helped most.

*Student prompt:* Paste the original abstract (or its first three sentences), your spoken script and the three changes that helped most. · *Minimum:* 400 characters

**Self-check**

- Most sentences contain one idea and can be said in one breath.
- Nominalisations have been replaced with verbs.
- Each part of the script is introduced by a signpost.
- Numbers are rounded or restated, and acronyms are explained or removed.
- The study design, the type of result and the reported figures are unchanged, and nothing has been added.

**Model answer** *(fictional example; shown to the student only after they save their own response)*

> Original (first sentence): “In this retrospective cohort of 412 patients admitted with community-acquired pneumonia between 2019 and 2023, early mobilisation within 24 hours of admission was associated with a significant reduction in length of stay (median 5 vs 7 days, p<0.01).”
> Spoken script: “We wanted to know whether getting patients with pneumonia out of bed early is linked to a shorter hospital stay. Here's what we did. We looked back at the records of 412 patients admitted with community-acquired pneumonia between 2019 and 2023. We compared patients who got up within 24 hours of admission with those who did not. What did we find? Patients who mobilised early had a shorter stay: a median of five days, compared with seven. The difference was statistically significant, with a p-value below 0.01. This is the key point: early mobilisation was associated with a shorter stay. Because we looked back at existing records, this shows an association, not cause and effect.”
> Time: about 55 seconds.
> Three changes that helped most: splitting the first sentence into five; replacing “was associated with a significant reduction in length of stay” with “had a shorter stay: a median of five days, compared with seven”; adding the signposts “Here's what we did” and “What did we find?”.
> What did not change: the study design (retrospective cohort), the type of result (an association) and the reported figures (median 5 vs 7 days, p<0.01). No finding or recommendation was added.

### Knowledge check (6 questions · Pass: at least 5 of 6 questions correct)

**1. Why is written scientific English hard to follow when read aloud?**

- A. It uses too few technical terms
- B. Listeners cannot reread, so long noun phrases and late verbs overload memory **✓ correct**
- C. It is always grammatically incorrect
- D. It contains too many verbs

*Explanation shown to the student:* Listeners receive speech once, at your speed; dense written structures are designed for readers.

**2. [Scenario] Your slide sentence is “A reduction in mortality was observed following the administration of the drug.” Which spoken version is best?**

- A. A reduction in mortality was observed following drug administration.
- B. Mortality reduction post-administration was observed.
- C. Following the administration of the drug, a reduction in mortality was observed by us.
- D. When we gave the drug, fewer patients died. **✓ correct**

*Explanation shown to the student:* Use verbs and the active voice: shorter, clearer and easier to stress.

**3. Where should the most important new information usually go in a spoken sentence?**

- A. Near the end, where it can be stressed and followed by a pause **✓ correct**
- B. At the very beginning, before the subject
- C. In a subordinate clause in the middle
- D. On the slide only

*Explanation shown to the student:* Starting with known information and ending with the new point helps listeners and gives you a natural place to stress it.

**4. [Scenario] A colleague begins almost every sentence with “OK” or “so”, and listeners still cannot see the structure. What do you advise?**

- A. Add even more markers
- B. Remove all signposting
- C. Use fewer, stronger signposts at the real transitions, with a pause **✓ correct**
- D. Speak faster so the fillers are less noticeable

*Explanation shown to the student:* Higher-level signposts that mark structure help listeners more than frequent small fillers.

**5. [Scenario] You need to mention “non-invasive ventilation” several times to an international audience. What is the best approach?**

- A. Use only “NIV” from the start
- B. Use a different term each time for variety
- C. Avoid mentioning it
- D. Say “non-invasive ventilation — NIV” the first time, then use one term consistently **✓ correct**

*Explanation shown to the student:* Introduce the full term first and keep the same term throughout; repetition is a service to listeners.

**6. [Scenario] Your key result is “an adjusted relative risk reduction of 0.31”. How should you say it?**

- A. Read the exact phrase from the slide twice
- B. Say “the relative risk was reduced by 31 per cent”, make clear that it is a relative reduction, and keep the exact figure on the slide **✓ correct**
- C. Leave the number out
- D. Say only “a significant result”

*Explanation shown to the student:* Restate key numbers clearly in speech without changing what they measure: a relative reduction must not sound like an absolute one. Keep the precise figure on the slide.

### Assignment — Spoken version of your talk opening and results

Take the written material for a real presentation — an abstract, a paper section or your slide notes — and produce a spoken script for its first minute and for its main results (together about two minutes of speech). Submit: (1) the original text; (2) your spoken script, with the signposts highlighted; (3) a list of the changes you made, grouped as sentence length, information order, verbs and voice, numbers and acronyms, and signposting; and (4) a note on how long the original and the new version took to say aloud. Finish with a short reflection (100–200 words) on how the spoken version changes the way you feel about delivering the talk.

*Minimum length:* 300 words · Required for completion

| Assessment criterion | What instructors look for |
|---|---|
| Spoken style | Short sentences, clear information order, verbs and active voice are used consistently. |
| Signposting | Each section is introduced by an appropriate signpost; fillers are avoided. |
| Accuracy | The scientific content and numbers remain correct after conversion. |
| Analysis | Changes are listed and grouped accurately, with timings. |
| Reflection | Shows insight into the difference between written and spoken style. |

### Downloadable materials

- **L06 Lesson handout** — Written-to-spoken conversion checklist, signposting phrase bank and abstract-to-script template. `/materials/lessons/L06-handout.pdf`

### References

1. Biber, D. (1988). Variation across Speech and Writing. Cambridge University Press.
2. Chafe, W. L. (1982). Integration and involvement in speaking, writing, and oral literature. In D. Tannen (Ed.), Spoken and Written Language: Exploring Orality and Literacy (pp. 35–53). Ablex.
3. Chaudron, C., & Richards, J. C. (1986). The effect of discourse markers on the comprehension of lectures. Applied Linguistics, 7(2), 113–127.
4. Jung, E. H. (2003). The role of discourse signaling cues in second language listening comprehension. The Modern Language Journal, 87(4), 562–577.

### Completion criteria

The lesson can be marked complete only after the student has saved the practical exercise, passed the knowledge check (Pass: at least 5 of 6 questions correct) and submitted the assignment. This is enforced by the database.

---
