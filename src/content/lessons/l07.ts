import type { LessonSpec } from "../lesson-types";

export const L07: LessonSpec = {
  code: "L07",
  week: 2,
  minutes: 60,
  aiTeacher: "voice-coach",
  status: "ready",
  video: {
    status: "sample",
    url: "/media/sample/l07-sample.mp4",
    captions: "/media/sample/l07-sample.vtt",
    note: "Sample video for demonstrating the player. The instructor recording for this lesson has not been produced yet.",
  },
  body: {
    intro:
      "Under pressure, most presenters speed up. In a second language the effect is stronger: we hurry to reach the end of a sentence before we lose the words, and we fill every silence because silence feels like failure. The audience pays the price. Listeners need time to process technical information, and many of them are processing it in a second language too. This lesson gives you control over three features of delivery that strongly affect how easily you are understood: pace, pausing and emphasis. You will measure your own pace, learn where pauses help and where they hurt, and practise placing stress on the words that carry your meaning — including the numbers that international audiences most often mishear.",
    objectives: [
      "Measure your speaking rate from a recording and compare it with a practical target range",
      "Divide spoken sentences into thought groups and place deliberate pauses before and after key messages",
      "Place sentence stress on the word that carries the main information, including contrastive stress",
      "Deliver numbers and data so that they are heard correctly by international audiences",
    ],
    sections: [
      {
        heading: "Pace: how fast is too fast?",
        paragraphs: [
          "There is no single correct speaking rate, but there is a practical range. Many presentation coaches recommend around 130 to 160 words per minute for international medical audiences, slower for dense data and faster for a story or a familiar point. Treat this as professional guidance, not a rule. A good pace is one at which your audience can follow your reasoning and still has a moment to think about what you have just shown them.",
          "Measure your own pace rather than guessing. Record one minute of a talk, transcribe it or use an automatic transcript, and count the words. Many speakers are surprised: under pressure, rates above 180 words per minute are common, and they rarely feel fast to the speaker. In a later stage of the programme, the Speaking Studio will calculate this for you and show where in the talk you accelerate.",
          "If you are short of time, cut content rather than speeding up. Speaking faster saves seconds but costs comprehension, and it usually increases errors and fillers. Decide in advance which slide you will skip if the chair shows you the two-minute sign.",
        ],
        callout: {
          kind: "recommendation",
          text: "The 130–160 words-per-minute range is a widely used professional guideline, not a research-derived threshold. Use your own recordings, and your audience’s reactions, to find your best pace.",
        },
      },
      {
        heading: "Thought groups and the deliberate pause",
        paragraphs: [
          "Fluent speakers do not pause randomly. They divide speech into thought groups — short units of meaning, often a phrase or a clause — and pause briefly between them. “In our cohort / of four hundred patients / readmissions fell / by a third.” Each group is easy to say on one breath and easy to process. Pausing in the middle of a unit, such as between an adjective and its noun or in the middle of a technical term, has the opposite effect.",
          "Longer, deliberate pauses do specific work. A pause before a key result creates attention: the audience senses that something important is coming. A pause after it gives them time to absorb it. A pause when you show a new slide lets the audience read before you speak, so they are not choosing between your voice and the screen. These pauses feel very long to the speaker — two or three seconds can feel like ten — but they sound confident and controlled to listeners.",
        ],
      },
      {
        heading: "Fillers: what they are and what to do about them",
        paragraphs: [
          "Fillers such as “um”, “uh”, “so” and “you know” are often presented as errors. The reality is more nuanced. In ordinary conversation, fillers can signal that the speaker is planning the next words, and listeners use them. They are a normal feature of speech, including the speech of fluent native speakers.",
          "In a formal presentation, however, frequent fillers can distract, and in a second language they often increase when you search for words. The aim is not to eliminate them completely, which tends to increase anxiety, but to reduce them by replacing many of them with silent pauses. A silent pause gives you the same planning time and sounds more authoritative. Start by noticing where your fillers cluster: very often they appear at the start of sentences and at slide transitions, which are exactly the moments you can prepare.",
        ],
        callout: {
          kind: "evidence",
          text: "Research on spontaneous speech suggests that “uh” and “um” are used to signal upcoming delays, and that listeners make use of them in comprehension. This is why the goal here is reduction and replacement with silent pauses, not elimination.",
          refs: [1, 2],
        },
      },
      {
        heading: "Stress: putting the weight where the meaning is",
        paragraphs: [
          "English uses stress to signal what matters. The stressed word in a phrase is slightly louder, longer and higher in pitch, and listeners use it to find the new or important information. “Mortality fell by a THIRD” tells the audience what to remember. “It was the DOSE, not the drug” uses contrastive stress to correct an assumption. Placing the stress on the wrong word, or on every word, makes speech harder to follow even when each individual sound is correct.",
          "Word stress matters too, especially for medical terminology. Many medical terms look similar across languages but are stressed differently in English: car-di-o-my-OP-a-thy /ˌkɑː.di.əʊ.maɪˈɒp.ə.θi/, an-aes-THE-si-a /ˌæn.əsˈθiː.zi.ə/, ep-i-de-mi-OL-o-gy /ˌep.ɪ.diː.miˈɒl.ə.dʒi/. Misplaced word stress can make a familiar word hard to recognise, particularly for listeners who are themselves non-native speakers. Check the stress of your twenty most frequent technical terms in a good dictionary and practise them in full sentences, not in isolation.",
        ],
        callout: {
          kind: "evidence",
          text: "Studies of second-language speech have found that correctly placed sentence stress improved listeners’ recall and their evaluations of the speaker, and that misplaced word stress can reduce intelligibility, especially when the stress shifts to a later syllable.",
          refs: [3, 4],
        },
      },
      {
        heading: "Numbers and data",
        paragraphs: [
          "Numbers are where small delivery problems become real errors. “Thirteen” and “thirty”, “fifteen” and “fifty” differ mainly in stress and in the final sound: thir-TEEN and fif-TEEN are stressed on the second syllable when said on their own, THIR-ty and FIF-ty on the first. Said quickly in a large room, they are easily confused.",
          "Protect your critical numbers in four ways. Show them on the slide. Say them slowly, with a pause before them. Restate them in another form: “fifteen per cent — roughly one patient in seven”. And when you present a graph, tell the audience where to look, pause while they look, and then state the conclusion. The sequence “look, pause, conclude” prevents the audience from reading one part of the slide while you describe another.",
        ],
        callout: {
          kind: "recommendation",
          text: "Before each talk, underline every number in your notes and decide how you will say it and whether you will restate it.",
        },
      },
      {
        heading: "Marking your script",
        paragraphs: [
          "The practical tool that brings these elements together is a marked script. Take the critical passages of your talk — the opening, the key result and the conclusion — and mark them by hand. Use a slash for a short pause between thought groups, a double slash for a deliberate pause, and capital letters for the one word in each phrase that carries the main stress. Then read the passage aloud twice: once naturally and once following your marks. Record both readings and listen to the difference.",
          "You will not script the whole talk this way. The aim is to train your ear and your habits on the passages that matter most, so that pacing and emphasis become automatic in the rest of the talk.",
        ],
      },
    ],
    examples: [
      {
        title: "Before and after: a results sentence",
        setting: "Internal medicine congress, results slide",
        text: "Before: “So um we found that the readmission rate was lower in the intervention group which was quite interesting and also the length of stay was shorter.” After: “In the intervention group, // readmissions fell / by a THIRD. // [pause] And patients went home / a DAY earlier.” The revised version has two thought groups per idea, a pause before and after the main result, and one stressed word in each phrase. It takes slightly longer to say, and it is remembered.",
      },
      {
        title: "Fifteen or fifty?",
        setting: "Multidisciplinary team meeting, online",
        text: "A registrar reports that a patient’s creatinine “went up by fifteen”. A colleague on a poor connection hears “fifty” and suggests urgent nephrology review. The discussion takes several minutes to untangle. Afterwards, the team agrees a simple habit for critical numbers: say the number, then restate it — “fifteen, one-five” — or show it in the shared document.",
      },
      {
        title: "Guiding the eye on a graph",
        setting: "Oncology grand round, Kaplan–Meier curve",
        text: "Instead of describing the curve while the audience is still reading the axes, the speaker says: “This is overall survival. Please look at the two lines after twelve months.” She pauses for three seconds. “They separate — and they stay separate.” She pauses again. “That is the main finding of this study.” The audience looks where she directs them, has time to see the effect, and hears the conclusion only once they are ready for it.",
      },
    ],
    phrase_bank: [
      { phrase: "The key finding is this:", use: "Introducing your main result", register: "Neutral – formal", pronunciation: "Pause after “this”; stress “KEY”.", example: "The key finding is this: // readmissions fell by a third." },
      { phrase: "Let me pause here, because this matters.", use: "Signalling an important point explicitly", register: "Neutral", example: "Let me pause here, because this matters for every surgical ward." },
      { phrase: "If you look at the left-hand panel, …", use: "Directing attention on a slide", register: "Neutral", pronunciation: "British usage: “left-hand panel”.", example: "If you look at the left-hand panel, you can see the control group." },
      { phrase: "Notice what happens after…", use: "Guiding the eye to a change in data", register: "Neutral", example: "Notice what happens after twelve months." },
      { phrase: "This is the number to remember:", use: "Protecting a critical number", register: "Neutral", example: "This is the number to remember: // fifteen per cent." },
      { phrase: "That’s roughly one patient in…", use: "Restating a percentage in a concrete form", register: "Neutral", pronunciation: "“Roughly”: RUFF-lee.", example: "Fifteen per cent — that’s roughly one patient in seven." },
      { phrase: "Put simply, …", use: "Summarising a complex point", register: "Neutral", example: "Put simply, the earlier we screened, the earlier we treated." },
      { phrase: "To put that in context, …", use: "Comparing a result with something familiar", register: "Neutral – formal", example: "To put that in context, it’s similar to the effect of the current standard treatment." },
      { phrase: "I’ll say that again, because it’s important:", use: "Deliberate repetition of a key message", register: "Neutral", example: "I’ll say that again, because it’s important: the effect was seen only after twelve months." },
      { phrase: "So, to summarise this slide, …", use: "Closing a data slide before moving on", register: "Neutral", example: "So, to summarise this slide, the benefit was largest in older patients." },
      { phrase: "Not the drug — the DOSE.", use: "Contrastive stress to correct an assumption", register: "Neutral, spoken", pronunciation: "Stress falls on the contrasted word.", example: "What mattered was not the drug — it was the DOSE." },
    ],
    phrase_practice:
      "Choose the most important data slide in your next talk. Script it with three of these expressions: one to direct the eye, one to introduce the result, and one to summarise. Mark pauses and stress, then rehearse the slide aloud three times.",
    demonstration:
      "The sample video currently shows only how captions and playback speed work in the lesson player. The instructor recording will deliver the same results passage at three speeds (fast, rushed and controlled), demonstrate thought groups, and contrast fifteen/fifty and thirteen/thirty.",
    mistakes: [
      { mistake: "Speeding up when time is short", correction: "Cut a slide; keep your pace." },
      { mistake: "Filling every silence with “um” or “so”", correction: "Notice where fillers cluster and replace them with silent pauses there." },
      { mistake: "Stressing every word, so nothing stands out", correction: "Choose one stressed word per thought group." },
      { mistake: "Pausing in the middle of a technical term or phrase", correction: "Pause between thought groups, not inside them." },
      { mistake: "Describing a graph while the audience is still reading it", correction: "Direct the eye, pause, then conclude." },
      { mistake: "Saying critical numbers quickly", correction: "Show, slow down, and restate them in another form." },
    ],
    reflection: [
      "Where in your talks do you tend to speed up?",
      "Which sentence in your next presentation most deserves a pause before it?",
      "Which numbers in your current work could be misheard, and how will you protect them?",
    ],
    references: [
      "Clark, H. H., & Fox Tree, J. E. (2002). Using uh and um in spontaneous speaking. Cognition, 84(1), 73–111.",
      "Fox Tree, J. E. (2001). Listeners’ uses of um and uh in speech comprehension. Memory & Cognition, 29(2), 320–326.",
      "Hahn, L. D. (2004). Primary stress and intelligibility: Research to motivate the teaching of suprasegmentals. TESOL Quarterly, 38(2), 201–223.",
      "Field, J. (2005). Intelligibility and the listener: The role of lexical stress. TESOL Quarterly, 39(3), 399–423.",
    ],
  },
  exercise: {
    title: "Mark and measure a passage",
    instructions: "Apply thought groups, pauses and stress to a real passage from one of your talks.",
    steps: [
      "Choose a 60–100-word passage that contains a key result or a number.",
      "Mark short pauses with / and deliberate pauses with //.",
      "Capitalise the one word per thought group that carries the main stress.",
      "Read it aloud twice — naturally, then following your marks — and time both readings.",
      "Calculate your words per minute for each reading and note one difference you heard.",
    ],
    prompt: "Paste your marked passage, your two timings or rates, and the difference you noticed.",
    min_chars: 250,
    model_answer:
      "Marked passage (49 words): “We included / four HUNDRED patients / over sixty-FIVE. // In the intervention group, / readmissions fell / by a THIRD. // [pause] That’s roughly / one patient in THREE / who didn’t come BACK. // The effect / was LARGEST / in patients / living ALONE. // So, to summarise this slide, / earlier follow-up / helped MOST / where support at home / was WEAKEST.”\n\nReading 1 (natural): 17 seconds → about 173 words per minute (49 ÷ 17 × 60). Reading 2 (marked): 22 seconds → about 134 words per minute.\nDifference: in the second reading, “by a third” sounded like the main point, and I no longer said “so” before every sentence.",
    self_check: [
      "Pauses fall between thought groups, never inside a term or phrase.",
      "There is one capitalised word per thought group, not several.",
      "There is a deliberate pause before and after the key result.",
      "Numbers are protected (slowed, restated or both).",
      "You calculated both rates and described an audible difference.",
    ],
  },
  quiz: [
    {
      prompt: "Where is a deliberate pause most effective?",
      options: ["Before and after a key result", "In the middle of a technical term", "Only at the end of the talk", "After every word"],
      correct: 0,
      explanation: "Pausing around key results creates attention and gives the audience time to absorb them.",
    },
    {
      scenario: true,
      prompt: "The chair shows you a two-minute warning and you still have four slides. What should you do?",
      options: ["Speak faster to cover all four slides", "Skip to your planned conclusion and keep your pace", "Ignore the warning", "Remove all pauses"],
      correct: 1,
      explanation: "Cutting content protects comprehension. Speaking faster sacrifices it and usually increases errors.",
    },
    {
      prompt: "What does research suggest about “um” and “uh”?",
      options: [
        "They are always grammatical errors",
        "They can signal upcoming delays, and listeners make use of them",
        "Native speakers never use them",
        "They should be eliminated completely",
      ],
      correct: 1,
      explanation: "Fillers are a normal feature of speech. In presentations, the aim is to reduce them by using silent pauses, not to eliminate them entirely.",
    },
    {
      prompt: "How many stressed words should a thought group usually carry?",
      options: ["None", "One", "Every noun", "As many as possible"],
      correct: 1,
      explanation: "One main stress per thought group tells the audience where the important information is.",
    },
    {
      scenario: true,
      prompt: "You need to report that 15% of patients had a complication. Which delivery is safest for an international audience?",
      options: [
        "Say “fifteen per cent” quickly and move on",
        "Show 15% on the slide, pause, say “fifteen per cent” slowly, and add “roughly one patient in seven”",
        "Say “about fifty per cent” to simplify",
        "Avoid mentioning the number",
      ],
      correct: 1,
      explanation: "Fifteen and fifty are easily confused. Showing, slowing and restating protects critical numbers.",
    },
    {
      scenario: true,
      prompt: "You show a complex Kaplan–Meier curve. What should you do first?",
      options: [
        "Explain the statistical method in detail",
        "Read every number on the axes",
        "Tell the audience where to look, pause, then state the conclusion",
        "Move quickly to the next slide",
      ],
      correct: 2,
      explanation: "“Look, pause, conclude” prevents the audience from reading one part of the slide while you describe another.",
    },
  ],
  assignment: {
    title: "Pace and emphasis report",
    brief:
      "Prepare a marked script of the most important data slide in one of your talks (opening sentence, key result and summary), using the marking system from this lesson. Then write a short report (200–350 words): your natural and marked speaking rates, where your fillers clustered, how you protected the numbers, and what you will change in your next presentation. In Stage 4, you will be able to record this passage in the Speaking Studio for automatic analysis.",
    min_words: 200,
    required: true,
    criteria: [
      { criterion: "Marking", description: "Pauses and stress are marked consistently and placed between thought groups." },
      { criterion: "Measurement", description: "Speaking rates are calculated from real timings, not estimated." },
      { criterion: "Data delivery", description: "Critical numbers are protected by showing, slowing or restating." },
      { criterion: "Reflection", description: "Concrete changes are proposed for a specific upcoming talk." },
    ],
  },
  resources: [
    { title: "L07 Lesson handout", description: "Marking system, pace calculation, number-delivery checklist and phrase bank.", file_url: "/materials/lessons/L07-handout.pdf", is_sample: false },
  ],
};
