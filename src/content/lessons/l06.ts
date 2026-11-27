import type { LessonSpec } from "../lesson-types";

/**
 * L06 — Spoken English for Presenters (Module 2, English Speaking Foundations).
 * Written 27 November 2026 to the approved Content Standard, for the Academy Owner's review.
 * Focuses on spoken style and the language of signposting; L11 covers the structure of openings and closings.
 */
export const L06: LessonSpec = {
  code: "L06",
  week: 2,
  minutes: 60,
  aiTeacher: "english-speaking-coach",
  status: "ready",
  body: {
    intro:
      "Doctors learn to write scientific English long before they learn to speak it in public. Abstracts, papers and case reports reward long sentences, dense noun phrases and passive verbs that keep the author out of the picture. When this written style is read aloud, it becomes very hard to follow: the listener cannot go back, cannot see the punctuation and must hold the beginning of a long sentence in memory while waiting for the verb. Many presentations that seem difficult because of the speaker's English are really difficult because they are written English spoken aloud. This lesson shows you how spoken English for presenters differs from written English, and how to convert your material. You will practise shorter sentences, clear information order, verbs instead of heavy noun phrases, the active voice, and the signposting language that tells listeners where they are. The changes are simple, and they also make speaking easier for you: shorter sentences are easier to say, to remember and to recover when you lose a word.",
    objectives: [
      "Identify the features of written scientific style that make a spoken presentation hard to follow",
      "Rewrite written sentences into spoken style using shorter sentences, verbs and the active voice",
      "Use signposting and discourse markers to guide listeners through a talk",
      "Convert a written abstract into a spoken script of about one minute",
    ],
    sections: [
      {
        heading: "Writing for the eye, speaking for the ear",
        paragraphs: [
          "Written and spoken English are not two levels of the same thing; they are adapted to different conditions. A reader controls the pace, can reread a difficult sentence and sees headings, paragraphs and punctuation. A listener has none of these. They receive the message once, at your speed, and must build its structure in their head as they go. Spoken language has adapted to this: it tends to use shorter units of information, more verbs, more repetition and more explicit links between ideas.",
          "Research comparing speech and writing has described these differences in detail. Writing tends to pack information into long noun phrases and subordinate clauses; speech tends to add information in a sequence of shorter units, often joined by “and”, “but” and “so”. A presentation sits between the two: it is planned like writing but received like speech. The listener's conditions should decide the style.",
        ],
        callout: {
          kind: "evidence",
          text: "Corpus-based and discourse research has found systematic differences between spoken and written English: written texts typically show more integrated, information-dense structures, such as long noun phrases and nominalisations, while speech shows more fragmented, sequential and involved structures.",
          refs: [1, 2],
        },
      },
      {
        heading: "Shorter sentences, clearer order",
        paragraphs: [
          "The simplest change is sentence length. A sentence that works on a page — “In this retrospective cohort of 412 patients admitted with community-acquired pneumonia between 2019 and 2023, early mobilisation was associated with a significant reduction in length of stay” — is too long to follow by ear. Split it: “We looked back at 412 patients with pneumonia. Those who got out of bed early had shorter hospital stays.” Then add the detail the audience needs: “A median of five days, compared with seven.”",
          "Information order matters as much as length. Listeners understand best when a sentence starts with something they already know and ends with the new information. Put the subject and verb early, and keep the important new point — the result, the number, the recommendation — near the end, where you can stress it and pause after it. Avoid long introductions before the verb, such as a list of conditions or a full study description: give the main point first, then the conditions.",
        ],
        callout: {
          kind: "recommendation",
          text: "Academy guidance: as a working rule, aim for one idea per spoken sentence, and keep most spoken sentences short enough to say comfortably in one breath. Long sentences are not wrong, but each one should be a deliberate choice.",
        },
      },
      {
        heading: "Verbs, not heavy noun phrases",
        paragraphs: [
          "Scientific writing often turns actions into nouns: “the administration of”, “the performance of an evaluation”, “a reduction in mortality was observed”. These nominalisations make sentences longer and hide who did what. In speech, use the verb: “we gave”, “we evaluated”, “fewer patients died”. The sentence becomes shorter, easier to stress and easier to remember.",
          "The same applies to the passive voice. “Patients were randomised and outcomes were assessed at six months” is correct, but “we randomised patients and assessed them at six months” is easier to follow and sounds more confident. The passive is still useful when the actor is unknown or unimportant, or when you want to keep the focus on the patient — but in a presentation, “we” is your friend. It also reminds the audience that real people did this work.",
        ],
      },
      {
        heading: "Signposting: telling listeners where they are",
        paragraphs: [
          "A reader sees the structure of a paper at a glance. A listener needs you to say it. Signposts are short expressions that announce what is coming, mark the move from one part to the next and show how ideas relate: “I'll cover three things”, “First”, “Moving on to the results”, “This is the key point”, “So what does this mean in practice?”, “To sum up”. Discourse markers such as “so”, “now”, “but”, “in other words” and “the reason is” do similar work within sections.",
          "Research on lecture listening suggests that some of these markers help listeners in a second language more than others. Markers that announce structure at a high level — “The second point I want to make is…”, “Let's now turn to…” — appear to be more helpful than small, frequent fillers such as “well” or “OK”, which add little. Use signposts deliberately at each change of section, and say them clearly, with a short pause before and after. L11 shows how to build them into your opening and closing; here, the aim is to have the language ready.",
        ],
        callout: {
          kind: "evidence",
          text: "In a study of second-language listeners, explicit higher-level markers of lecture structure aided recall more than lower-level, local markers. A later study found that lectures with signalling cues were recalled better by second-language listeners than the same lectures without them. Both studies were in academic lecture settings rather than medical conferences.",
          refs: [3, 4],
        },
      },
      {
        heading: "Repetition, acronyms and contractions",
        paragraphs: [
          "In writing, repetition is a fault. In speech, it is a service. Repeat the key message, restate an important number in a second form (“thirty per cent of patients — almost one in three”), and use the same term for the same thing throughout. Listeners who missed a word the first time get a second chance.",
          "Acronyms are a common barrier in international audiences. Say the full term the first time and only then the acronym, and limit yourself to the few that are truly needed: “non-invasive ventilation — NIV”. Contractions such as “we'll”, “it's” and “don't” are normal in spoken English, including in formal presentations, and they make your speech sound more natural. Use them where they feel comfortable; full forms remain appropriate in some contexts — when you want to stress a word (“This does not apply to children.”) or when you quote a guideline or a formal statement word for word.",
        ],
      },
      {
        heading: "Converting an abstract into a spoken script",
        paragraphs: [
          "A practical way to apply this lesson is to convert your own abstract into a script of about one minute. Read the abstract aloud and mark every place where you need to take a breath in the middle of a sentence or where you lose track. Then rewrite: one idea per sentence, verbs instead of nominalisations, “we” instead of the passive, numbers rounded or restated, acronyms explained, and a signpost before each part — background, what you did, what you found and what it means.",
          "Finally, read the new version aloud and record it. It should take no longer than the original and will almost always be easier to say. You are not simplifying the science; you are changing the form so that the science reaches the listener. Keep the study design and the type of result exactly as they are: an association stays an association, a relative measure stays relative, and no finding or recommendation is added.",
        ],
      },
    ],
    examples: [
      {
        title: "The abstract that could not be followed",
        setting: "European congress, oral abstract session, a fictional researcher",
        text: "A fictional researcher reads her abstract aloud as her opening: forty words before the first verb, three acronyms and two passive clauses. The chair, who knows the field, follows; most of the room does not. In rehearsal for her next talk she rewrites the same content in seven short sentences, starting with “We wanted to know whether…”, and adds a signpost before the results. Her talk is no longer than before, and the questions afterwards are about her findings, not about what she meant.",
      },
      {
        title: "Too many small signposts",
        setting: "Grand round, a fictional junior doctor",
        text: "A fictional junior doctor has been told to use signposting, and now begins almost every sentence with “OK”, “so” or “now”. The listeners hear many markers but cannot tell where the main sections begin. A supervisor suggests fewer, stronger signposts at the real transitions — “That was the background. Now, the case itself.” — and a short pause after each. The structure becomes clear and the filler words drop away.",
      },
      {
        title: "Restating a number",
        setting: "Public health meeting, a fictional epidemiologist",
        text: "A fictional epidemiologist used to say “an adjusted relative risk reduction of 0.31 was observed”. In spoken style she now says: “After adjustment, the relative risk of infection was reduced by 31 per cent. That is a relative reduction, compared with the other group — not 31 fewer infections in every hundred patients.” The precise figure stays on the slide; the spoken version is the one the audience remembers, and it keeps the meaning of the measure.",
      },
    ],
    phrase_bank: [
      { phrase: "We wanted to know whether…", use: "Stating the research question in spoken style", register: "Neutral", example: "We wanted to know whether early mobilisation is linked to a shorter hospital stay." },
      { phrase: "Here's what we did.", use: "Signposting the methods", register: "Neutral, spoken", pronunciation: "Pause after “did”.", example: "Here's what we did. We looked back at 412 patients." },
      { phrase: "What did we find?", use: "Rhetorical question introducing results", register: "Neutral, spoken", pronunciation: "Falling tone on “find”.", example: "What did we find? Patients who mobilised early had a shorter stay: a median of five days instead of seven." },
      { phrase: "This is the key point.", use: "Highlighting the main finding", register: "Neutral", example: "This is the key point: the benefit was greatest in older patients." },
      { phrase: "Let's now turn to…", use: "Moving to a new section", register: "Neutral – formal", example: "Let's now turn to what this means for practice." },
      { phrase: "In other words, …", use: "Restating a complex point more simply", register: "Neutral", example: "In other words, the relative risk was about a third lower." },
      { phrase: "So what does this mean in practice?", use: "Moving from results to implications", register: "Neutral", example: "So what does this mean in practice? Because this was an observational study, it shows a link, not cause and effect." },
      { phrase: "To sum up, …", use: "Signalling the conclusion", register: "Neutral – formal", example: "To sum up, early mobilisation was associated with a shorter hospital stay." },
    ],
    phrase_practice:
      "Take the four sections of your next talk — background, methods, results and implications — and choose one signpost from the phrase bank to introduce each. Say the four signposts in sequence with the first sentence of each section, pausing before and after each signpost, and record the result. It should sound like a map of your talk.",
    demonstration:
      "The instructor video for this lesson has not yet been recorded. It will show one abstract read aloud in its written form and then delivered as a converted one-minute spoken script, with the changes highlighted on screen: shorter sentences, verbs instead of nominalisations, the active voice, restated numbers and signposts. Notice that the spoken version is not less scientific; it is easier to follow.",
    mistakes: [
      { mistake: "Reading the abstract aloud as the talk", correction: "Convert it into spoken style before you present." },
      { mistake: "Starting sentences with long descriptions before the verb", correction: "Put the subject and verb early; add conditions afterwards." },
      { mistake: "Using nominalisations such as “the administration of”", correction: "Use the verb: “we gave”." },
      { mistake: "Using the passive throughout", correction: "Use “we” for what your team did; keep the passive for special cases." },
      { mistake: "Filling every sentence with “OK” and “so”", correction: "Use fewer, stronger signposts at real transitions, with a pause." },
      { mistake: "Introducing many acronyms", correction: "Say the full term first and keep only the acronyms you really need." },
    ],
    reflection: [
      "Which of your habits from scientific writing appear most often when you present?",
      "Where in your talks do listeners most often seem to lose the thread?",
      "Which signposts feel natural to you, and which would you like to add to your repertoire?",
    ],
    references: [
      "Biber, D. (1988). Variation across Speech and Writing. Cambridge University Press.",
      "Chafe, W. L. (1982). Integration and involvement in speaking, writing, and oral literature. In D. Tannen (Ed.), Spoken and Written Language: Exploring Orality and Literacy (pp. 35–53). Ablex.",
      "Chaudron, C., & Richards, J. C. (1986). The effect of discourse markers on the comprehension of lectures. Applied Linguistics, 7(2), 113–127.",
      "Jung, E. H. (2003). The role of discourse signaling cues in second language listening comprehension. The Modern Language Journal, 87(4), 562–577.",
    ],
  },
  exercise: {
    title: "From abstract to spoken script",
    instructions: "Convert a written abstract of your own into a one-minute spoken script.",
    steps: [
      "Choose an abstract you have written, or the summary of a talk you will give.",
      "Read it aloud once and mark every point where you needed an extra breath or lost track.",
      "Rewrite it: one idea per sentence, verbs instead of nominalisations, “we” instead of the passive, acronyms explained, and numbers rounded or restated.",
      "Add a signpost before the background, the methods, the results and the implications.",
      "Read the new version aloud, time it, and note the three changes that helped most.",
    ],
    prompt: "Paste the original abstract (or its first three sentences), your spoken script and the three changes that helped most.",
    min_chars: 400,
    model_answer:
      "Original (first sentence): “In this retrospective cohort of 412 patients admitted with community-acquired pneumonia between 2019 and 2023, early mobilisation within 24 hours of admission was associated with a significant reduction in length of stay (median 5 vs 7 days, p<0.01).”\nSpoken script: “We wanted to know whether getting patients with pneumonia out of bed early is linked to a shorter hospital stay. Here's what we did. We looked back at the records of 412 patients admitted with community-acquired pneumonia between 2019 and 2023. We compared patients who got up within 24 hours of admission with those who did not. What did we find? Patients who mobilised early had a shorter stay: a median of five days, compared with seven. The difference was statistically significant, with a p-value below 0.01. This is the key point: early mobilisation was associated with a shorter stay. Because we looked back at existing records, this shows an association, not cause and effect.”\nTime: about 55 seconds.\nThree changes that helped most: splitting the first sentence into five; replacing “was associated with a significant reduction in length of stay” with “had a shorter stay: a median of five days, compared with seven”; adding the signposts “Here's what we did” and “What did we find?”.\nWhat did not change: the study design (retrospective cohort), the type of result (an association) and the reported figures (median 5 vs 7 days, p<0.01). No finding or recommendation was added.",
    self_check: [
      "Most sentences contain one idea and can be said in one breath.",
      "Nominalisations have been replaced with verbs.",
      "Each part of the script is introduced by a signpost.",
      "Numbers are rounded or restated, and acronyms are explained or removed.",
      "The study design, the type of result and the reported figures are unchanged, and nothing has been added.",
    ],
  },
  quiz: [
    {
      prompt: "Why is written scientific English hard to follow when read aloud?",
      options: [
        "It uses too few technical terms",
        "Listeners cannot reread, so long noun phrases and late verbs overload memory",
        "It is always grammatically incorrect",
        "It contains too many verbs",
      ],
      correct: 1,
      explanation: "Listeners receive speech once, at your speed; dense written structures are designed for readers.",
    },
    {
      scenario: true,
      prompt: "Your slide sentence is “A reduction in mortality was observed following the administration of the drug.” Which spoken version is best?",
      options: [
        "A reduction in mortality was observed following drug administration.",
        "Mortality reduction post-administration was observed.",
        "Following the administration of the drug, a reduction in mortality was observed by us.",
        "When we gave the drug, fewer patients died.",
      ],
      correct: 3,
      explanation: "Use verbs and the active voice: shorter, clearer and easier to stress.",
    },
    {
      prompt: "Where should the most important new information usually go in a spoken sentence?",
      options: [
        "Near the end, where it can be stressed and followed by a pause",
        "At the very beginning, before the subject",
        "In a subordinate clause in the middle",
        "On the slide only",
      ],
      correct: 0,
      explanation: "Starting with known information and ending with the new point helps listeners and gives you a natural place to stress it.",
    },
    {
      scenario: true,
      prompt: "A colleague begins almost every sentence with “OK” or “so”, and listeners still cannot see the structure. What do you advise?",
      options: [
        "Add even more markers",
        "Remove all signposting",
        "Use fewer, stronger signposts at the real transitions, with a pause",
        "Speak faster so the fillers are less noticeable",
      ],
      correct: 2,
      explanation: "Higher-level signposts that mark structure help listeners more than frequent small fillers.",
    },
    {
      scenario: true,
      prompt: "You need to mention “non-invasive ventilation” several times to an international audience. What is the best approach?",
      options: [
        "Use only “NIV” from the start",
        "Use a different term each time for variety",
        "Avoid mentioning it",
        "Say “non-invasive ventilation — NIV” the first time, then use one term consistently",
      ],
      correct: 3,
      explanation: "Introduce the full term first and keep the same term throughout; repetition is a service to listeners.",
    },
    {
      scenario: true,
      prompt: "Your key result is “an adjusted relative risk reduction of 0.31”. How should you say it?",
      options: [
        "Read the exact phrase from the slide twice",
        "Say “the relative risk was reduced by 31 per cent”, make clear that it is a relative reduction, and keep the exact figure on the slide",
        "Leave the number out",
        "Say only “a significant result”",
      ],
      correct: 1,
      explanation: "Restate key numbers clearly in speech without changing what they measure: a relative reduction must not sound like an absolute one. Keep the precise figure on the slide.",
    },
  ],
  assignment: {
    title: "Spoken version of your talk opening and results",
    brief:
      "Take the written material for a real presentation — an abstract, a paper section or your slide notes — and produce a spoken script for its first minute and for its main results (together about two minutes of speech). Submit: (1) the original text; (2) your spoken script, with the signposts highlighted; (3) a list of the changes you made, grouped as sentence length, information order, verbs and voice, numbers and acronyms, and signposting; and (4) a note on how long the original and the new version took to say aloud. Finish with a short reflection (100–200 words) on how the spoken version changes the way you feel about delivering the talk.",
    min_words: 300,
    required: true,
    criteria: [
      { criterion: "Spoken style", description: "Short sentences, clear information order, verbs and active voice are used consistently." },
      { criterion: "Signposting", description: "Each section is introduced by an appropriate signpost; fillers are avoided." },
      { criterion: "Accuracy", description: "The scientific content and numbers remain correct after conversion." },
      { criterion: "Analysis", description: "Changes are listed and grouped accurately, with timings." },
      { criterion: "Reflection", description: "Shows insight into the difference between written and spoken style." },
    ],
  },
  resources: [
    { title: "L06 Lesson handout", description: "Written-to-spoken conversion checklist, signposting phrase bank and abstract-to-script template.", file_url: "/materials/lessons/L06-handout.pdf", is_sample: false },
  ],
};
