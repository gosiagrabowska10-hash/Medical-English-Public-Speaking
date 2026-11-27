import type { LessonSpec } from "../lesson-types";

/**
 * L04 — Intelligibility Before Accent (Module 2, English Speaking Foundations).
 * Written 27 November 2026 to the approved Content Standard, for the Academy Owner's review.
 * Builds on L01 (accent, comprehensibility and intelligibility); prepares L05 (stress) and L07 (pace).
 */
export const L04: LessonSpec = {
  code: "L04",
  week: 1,
  minutes: 60,
  aiTeacher: "english-speaking-coach",
  status: "ready",
  body: {
    intro:
      "In L01 you met three ideas that are easy to confuse: accent, comprehensibility and intelligibility. This lesson turns that distinction into a practical plan. Many doctors who present in English spend years trying to sound like a native speaker, and still feel that their accent holds them back. The research points in a more useful direction. Some features of pronunciation make a large difference to whether listeners understand you; others make almost none. International audiences, many of them listening in a second language themselves, need a small number of things from you: clear key words, recognisable stress, audible word endings and a pace that gives them time to process. In this lesson you will learn which features to prioritise, how to speak clearly without sounding artificial, and how to find your own personal priorities from a short recording — so that the practice time you have goes where it makes the biggest difference.",
    objectives: [
      "Explain the difference between aiming for a native-like accent and aiming for intelligibility, and choose the second as a working goal",
      "Identify the pronunciation features that most often affect understanding, and those that rarely do",
      "Diagnose your own top three intelligibility priorities from a recording of a short presentation extract",
      "Apply clear-speech techniques to key sentences without exaggeration",
    ],
    sections: [
      {
        heading: "Two goals: sounding native or being understood",
        paragraphs: [
          "Pronunciation teaching has long been pulled between two goals. The first is to sound as close as possible to a native speaker of a particular variety. The second is to be understood easily by the people who are actually listening. For a doctor presenting at an international congress, the second goal is both more useful and more achievable. A native-like accent is rarely reached by adults who learned English later in life, and it is not what audiences need. What they need is to recognise your words and follow your argument without effort.",
          "Choosing intelligibility as your goal is not a lower standard. It is a more precise one. It asks you to work on the features that cause misunderstanding and to stop spending energy on features that do not. It also frees you from a common source of anxiety: the feeling that every trace of your first language is a mistake. Your accent is part of your professional identity; the aim is that it never stands between your audience and your message.",
        ],
        callout: {
          kind: "evidence",
          text: "Writers on pronunciation teaching distinguish a “nativeness principle” from an “intelligibility principle” and argue that, for most adult learners, teaching should aim at being understood rather than at a native-like accent. Research on second-language speech has also shown that a noticeable accent and full intelligibility can exist together.",
          refs: [1, 2],
        },
      },
      {
        heading: "Not all pronunciation features matter equally",
        paragraphs: [
          "Some sound contrasts in English distinguish many common words; others distinguish only a few. Linguists call this the functional load of a contrast. Confusing two sounds that separate many words — for example the vowels in “sit” and “seat”, or the consonants at the end of “rice” and “rise” — is more likely to cause misunderstanding than confusing two sounds that rarely change meaning. The practical consequence is that you can rank your pronunciation features by how much they matter, instead of trying to fix everything.",
          "Research on communication between non-native speakers of English points in a similar direction. Features that most often caused breakdowns included certain consonant contrasts, the length of stressed vowels, the dropping of consonants at the start and end of words, and the placement of the main stress in a phrase. Other features, such as the exact quality of the “th” sounds or some vowel qualities, caused far fewer problems. These findings come from particular groups of speakers and are still debated, so treat them as a guide to priorities rather than as fixed rules.",
        ],
        callout: {
          kind: "evidence",
          text: "In an exploratory study, errors in sound contrasts with a high functional load affected listeners' judgements of comprehensibility more than errors in low-load contrasts. A separate analysis of interactions between non-native speakers proposed a “core” of features that matter most for mutual intelligibility; this proposal is influential but contested.",
          refs: [3, 4],
        },
      },
      {
        heading: "Three priorities for medical presenters",
        paragraphs: [
          "For most doctors presenting in English, three features deserve attention first. The first is word endings. Final consonants carry grammar and meaning: plural, past tense and many number words depend on them. “The patient improved” and “the patients improve” differ only in their endings; “sixteen” and “sixty” differ in their final sounds and stress. If you tend to soften or drop final consonants, practise saying the end of key words fully, especially before a pause.",
          "The second is word stress. Listeners use the stressed syllable to find a word in their memory. A medical term with the stress in an unexpected place can become unrecognisable even when every sound is correct. L05 is devoted to this. The third is the main stress in a phrase: the word you emphasise tells the audience what is new or important, and L07 builds this into your delivery. Notice what is not on this list: removing your accent, perfecting every vowel, or copying a particular national variety.",
        ],
        callout: {
          kind: "recommendation",
          text: "Work on word endings, word stress and phrase stress before anything else. This is Academy guidance based on the evidence above and on what most often causes misunderstanding in medical presentations; your own recording may show different priorities, and those come first.",
        },
      },
      {
        heading: "Clear speech without exaggeration",
        paragraphs: [
          "When speakers try to be understood — by a listener in a noisy room, or by someone with less English — they naturally change how they speak. They slow down slightly, pause more often, articulate consonants more fully and make stressed syllables a little longer. This “clear speech” style can be learned and used on purpose, particularly for the sentences that matter most: your main message, your key results and every critical number.",
          "Clear speech is not shouting, separating every syllable or speaking as if to a child. Those habits sound unnatural and can make you harder to follow, because they flatten the contrast between important and less important words. Use clear speech selectively: for a key sentence, slow down a little, give the stressed syllables full length, pronounce the final consonants and pause before and after. The rest of the talk can flow more naturally.",
        ],
        callout: {
          kind: "evidence",
          text: "A review of research on clear speech found that the changes speakers make when trying to be understood generally improve intelligibility for several groups of listeners, including non-native listeners and listeners in noise, although the size of the benefit varies between listener groups.",
          refs: [5],
        },
      },
      {
        heading: "Listeners adapt — help them do it quickly",
        paragraphs: [
          "Listeners are not fixed. Studies of accented speech show that listeners become better at understanding a particular speaker after a short period of exposure. This has a practical implication for presenters: the first minute of your talk is when your audience is adjusting to your voice, your accent and your rhythm. That is the moment to be most careful with clear speech, a moderate pace and a simple opening sentence.",
          "Consistency also helps. If you pronounce a key term the same way each time, listeners learn it quickly. If you vary it, they must work it out again. Choose one pronunciation for each of your key terms, check it in a dictionary, and keep it throughout the talk.",
        ],
        callout: {
          kind: "evidence",
          text: "In experiments on perceptual adaptation, listeners' understanding of foreign-accented speech improved after brief exposure to it. The studies were laboratory-based, but they support making the first minute of a talk especially clear.",
          refs: [6],
        },
      },
      {
        heading: "Finding your own priorities",
        paragraphs: [
          "General guidance is useful, but your own priorities come from your own speech. Record a two-minute extract of a real talk on your phone. Then use two simple listeners. The first is a colleague, ideally one whose first language differs from yours: ask them to write down the key message and every number, and to mark any word they were unsure of. The second is an automatic transcript, which many phones and video platforms can produce. Automatic transcription is not the same as a human listener, but repeated errors on the same word are a useful signal that something in its pronunciation is unclear.",
          "Collect the words that caused problems into a personal risk list: usually five to ten terms, numbers or phrases from your own field. For each, decide which of the three priorities is involved — an ending, a word stress or a phrase stress — and practise that feature in full sentences. Repeat the recording after two weeks and compare. This is the same evidence-based method you will use throughout the programme: measure, choose one priority, practise, measure again.",
        ],
      },
    ],
    examples: [
      {
        title: "The missing endings",
        setting: "Internal medicine congress, results presented by a fictional registrar",
        text: "A fictional registrar reports: “Patient with lower dose improve faster.” Her colleagues in the room understand, because they can see the slide. Online participants, listening through laptop speakers, hear something closer to “patient … lower dose … improve”, and two of them ask afterwards whether the result was for one patient or for the group. In rehearsal she marks the endings she tends to soften — patients, improved, faster — and practises the key sentence with fully pronounced final consonants and a short pause before the result. The next time, the question does not arise.",
      },
      {
        title: "An accent that did not need fixing",
        setting: "Neurology grand round, a fictional consultant presenting in his third language",
        text: "A fictional consultant has spent months trying to change his vowels, with little effect, and still feels his accent is the problem. A colleague listens to a recording with him and notices something else: almost every misunderstanding comes from the stress in three key terms and from his speed in the results section. Two weeks of practice on those terms and on pausing make his talk much easier to follow, although his accent is unchanged. He stops apologising for his English at the start of talks.",
      },
      {
        title: "Using a transcript as a second listener",
        setting: "Paediatric research meeting, preparation by a fictional fellow",
        text: "A fictional paediatric research fellow records her five-minute talk and switches on the automatic captions of her video platform. The same three words are transcribed wrongly each time: “pneumonia”, “sixty” and “cohort”. She checks each in a dictionary, finds that she stresses “pneumonia” on the first syllable instead of the second (pneu-MO-ni-a) and that “sixty” loses its final syllable when she speaks fast, and practises those words in full sentences. She treats the transcript as a signal, not a verdict, and asks a colleague to confirm the changes.",
      },
    ],
    phrase_bank: [
      { phrase: "Let me say that clearly:", use: "Introducing a key sentence in clear-speech style", register: "Neutral", pronunciation: "Pause after “clearly”.", example: "Let me say that clearly: // the lower dose worked faster." },
      { phrase: "That's sixteen — one-six.", use: "Protecting a number that could be misheard", register: "Neutral, spoken", pronunciation: "Stress the second syllable of “sixteen”.", example: "The median stay was sixteen — one-six — days." },
      { phrase: "The term we use for this is…", use: "Introducing a key technical term once, clearly", register: "Neutral – formal", example: "The term we use for this is community-acquired pneumonia." },
      { phrase: "In other words, …", use: "Rephrasing a point in simpler language", register: "Neutral", example: "In other words, younger patients recovered sooner." },
      { phrase: "Let me spell that out.", use: "Explaining an abbreviation or a difficult term", register: "Neutral", example: "Let me spell that out: NIV means non-invasive ventilation." },
      { phrase: "Can everyone hear me clearly?", use: "Checking audibility at the start", register: "Neutral", pronunciation: "Falling tone on “clearly”.", example: "Good morning. Can everyone hear me clearly, including online?" },
      { phrase: "I'll repeat the key figure:", use: "Deliberate repetition of a number", register: "Neutral", example: "I'll repeat the key figure: thirty per cent." },
      { phrase: "Please stop me if a term is unfamiliar.", use: "Inviting clarification in a teaching setting", register: "Neutral, collegial", example: "Please stop me if a term is unfamiliar — this field has a lot of jargon." },
    ],
    phrase_practice:
      "Choose the three sentences in your next talk that contain your key message and your two most important numbers. Introduce each with one expression from the phrase bank, say it in clear-speech style (slightly slower, full endings, pause before and after) and record it. Compare it with a natural reading of the same sentence: the clear version should sound careful, not artificial.",
    demonstration:
      "The instructor video for this lesson has not yet been recorded. It will show the same results sentence said three ways — rushed with weakened endings, over-articulated syllable by syllable, and in natural clear speech — and a short self-diagnosis using a recording and an automatic transcript. Notice that the clear version is only slightly slower than the natural one, and that the accent is the same in all three.",
    mistakes: [
      { mistake: "Trying to remove your accent completely", correction: "Aim to be understood: work on the features that cause misunderstanding." },
      { mistake: "Practising sounds in isolation only", correction: "Practise priority features in the full sentences of your own talks." },
      { mistake: "Dropping final consonants in key words", correction: "Pronounce endings fully, especially before a pause and in numbers." },
      { mistake: "Over-articulating every syllable", correction: "Use clear speech selectively, for key sentences, and keep the stress contrast." },
      { mistake: "Changing the pronunciation of a key term during the talk", correction: "Check it once in a dictionary and use the same pronunciation throughout." },
      { mistake: "Treating an automatic transcript as a judgement", correction: "Use repeated transcript errors as a signal, and confirm with a human listener." },
    ],
    reflection: [
      "Which features of your English have you spent most time trying to change — and do they actually cause misunderstanding?",
      "Which words in your field are most at risk of being misheard when you speak quickly?",
      "Who could act as an honest listener for your next recording?",
    ],
    references: [
      "Levis, J. M. (2005). Changing contexts and shifting paradigms in pronunciation teaching. TESOL Quarterly, 39(3), 369–377.",
      "Munro, M. J., & Derwing, T. M. (1995). Foreign accent, comprehensibility, and intelligibility in the speech of second language learners. Language Learning, 45(1), 73–97.",
      "Munro, M. J., & Derwing, T. M. (2006). The functional load principle in ESL pronunciation instruction: An exploratory study. System, 34(4), 520–531.",
      "Jenkins, J. (2000). The Phonology of English as an International Language. Oxford University Press.",
      "Smiljanić, R., & Bradlow, A. R. (2009). Speaking and hearing clearly: Talker and listener factors in speaking style changes. Language and Linguistics Compass, 3(1), 236–264.",
      "Bradlow, A. R., & Bent, T. (2008). Perceptual adaptation to non-native speech. Cognition, 106(2), 707–729.",
    ],
  },
  exercise: {
    title: "Your intelligibility risk list",
    instructions: "Find your own top three intelligibility priorities from a short recording.",
    steps: [
      "Record a two-minute extract of a real talk: your opening and one results slide.",
      "Ask a colleague to listen once and write down the key message, every number and any word they were unsure of. If no one is available, use an automatic transcript of the recording.",
      "List every word or number that was misheard or mis-transcribed, and add the five technical terms you use most.",
      "For each item, note the likely cause: a word ending, a word stress or a phrase stress (or another cause you can name).",
      "Choose your top three priorities and write the sentence from your talk in which you will practise each.",
    ],
    prompt: "Paste your risk list with the likely cause for each item, your top three priorities and the practice sentences.",
    min_chars: 300,
    model_answer:
      "Listener: a colleague whose first language is Spanish; plus an automatic transcript.\nMisheard or mis-transcribed: “sixty” (heard as “sixteen”), “pneumonia” (transcribed as “ammonia”), “improved” (heard as “improve”), “cohort” (transcribed as “co-host”).\nKey terms added: oxygen saturation, high-flow, admission, readmission, paediatric.\nLikely causes: sixty — final syllable lost when speaking fast (ending and stress); pneumonia — stress on the first syllable instead of the second (word stress); improved — final -d dropped (ending); cohort — first vowel unclear and stress weak (word stress).\nTop three priorities:\n1. Endings in results sentences — practice sentence: “Patients on high-flow improved faster.”\n2. Word stress of pneumonia and cohort — practice sentence: “In our cohort of children with pneumonia…”\n3. Protecting numbers — practice sentence: “Sixty — six-zero — per cent needed oxygen.”",
    self_check: [
      "You used at least one real listener or an automatic transcript, not only your own impression.",
      "Every item on the list has a likely cause.",
      "Your priorities are specific features, not “my accent”.",
      "Each priority has a practice sentence taken from your own talk.",
    ],
  },
  quiz: [
    {
      prompt: "Which goal does this programme recommend for your pronunciation?",
      options: [
        "A native-like British accent",
        "A native-like American accent",
        "Being understood easily by your actual audience",
        "Removing every trace of your first language",
      ],
      correct: 2,
      explanation: "The intelligibility principle focuses on being understood; a noticeable accent and full intelligibility can exist together.",
    },
    {
      scenario: true,
      prompt: "Your colleague says that most of your misunderstandings come from three medical terms and your speed in the results section. What should you practise first?",
      options: [
        "General accent reduction exercises",
        "The stress of those three terms and your pacing of the results",
        "All English vowel sounds in isolation",
        "Speaking more quickly to sound fluent",
      ],
      correct: 1,
      explanation: "Work on the specific features that cause misunderstanding in your own speech before anything else.",
    },
    {
      prompt: "What does “functional load” describe?",
      options: [
        "How tiring a talk is for the speaker",
        "How many slides a talk contains",
        "How loudly a sound is produced",
        "How many words a sound contrast distinguishes, and so how much confusing it matters",
      ],
      correct: 3,
      explanation: "Contrasts that separate many words carry a high functional load; errors in them are more likely to affect understanding.",
    },
    {
      scenario: true,
      prompt: "You say “The patient improve faster” when you mean “The patients improved faster”. Which priority does this show?",
      options: [
        "Word endings",
        "Vowel quality",
        "Intonation in questions",
        "The “th” sound",
      ],
      correct: 0,
      explanation: "Plural and past-tense endings carry meaning; dropping final consonants changes what listeners understand.",
    },
    {
      scenario: true,
      prompt: "You want your key result to be understood by an international online audience. What is the best way to say it?",
      options: [
        "Separate every syllable with a pause",
        "Say it louder and faster than the rest",
        "Slightly slower, with full word endings, clear stress and a pause before and after",
        "Read it from the slide without looking up",
      ],
      correct: 2,
      explanation: "Natural clear speech improves intelligibility; over-articulation flattens stress and sounds artificial.",
    },
    {
      scenario: true,
      prompt: "An automatic transcript repeatedly writes “ammonia” when you say “pneumonia”. What should you conclude?",
      options: [
        "Your English is not good enough to present",
        "Ignore it, because transcripts are always wrong",
        "Stop using the term in your talks",
        "Check the word's stress in a dictionary and confirm the change with a human listener",
      ],
      correct: 3,
      explanation: "Repeated transcript errors are a useful signal, not a verdict; confirm with a dictionary and a listener.",
    },
  ],
  assignment: {
    title: "Intelligibility plan for your next talk",
    brief:
      "Write an intelligibility plan for a real presentation you will give. Include: (1) your risk list of 5–10 words, numbers or phrases, with the likely cause of each; (2) your top three priorities and why you chose them; (3) how you will practise each priority in sentences from your talk over the next two weeks; and (4) how you will measure progress — the listener or transcript you will use and when you will record again. Finish with a short reflection (100–200 words) on how choosing intelligibility rather than a native-like accent changes the way you prepare.",
    min_words: 250,
    required: true,
    criteria: [
      { criterion: "Evidence", description: "The risk list comes from a real listener or transcript, not only from self-impression." },
      { criterion: "Prioritisation", description: "Three specific features are chosen, with a reason linked to understanding." },
      { criterion: "Practice plan", description: "Each priority is practised in sentences from the learner's own talk, with a realistic schedule." },
      { criterion: "Measurement", description: "A clear method to measure progress, with a date for re-recording." },
      { criterion: "Reflection", description: "Shows how the intelligibility goal changes preparation and confidence." },
    ],
  },
  resources: [
    { title: "L04 Lesson handout", description: "Intelligibility priorities, clear-speech checklist, risk-list template and phrase bank.", file_url: "/materials/lessons/L04-handout.pdf", is_sample: false },
  ],
};
