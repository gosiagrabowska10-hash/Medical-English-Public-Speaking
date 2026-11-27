import type { LessonSpec } from "../lesson-types";

/**
 * L05 — Stress, Rhythm and Medical Terminology (Module 2, English Speaking Foundations).
 * Written 27 November 2026 to the approved Content Standard, for the Academy Owner's review.
 * Every transcription is checked against Cambridge Dictionary (UK) and Oxford Learner's
 * Dictionaries (BrE); see docs/curriculum/pronunciation-verification.md.
 */
export const L05: LessonSpec = {
  code: "L05",
  week: 2,
  minutes: 65,
  aiTeacher: "english-speaking-coach",
  status: "ready",
  body: {
    intro:
      "Medical English is full of long words, and long words are where pronunciation most often goes wrong. Many of them look similar across European languages, which is both a help and a trap: the spelling is familiar, but the stress in English often falls on a different syllable from the one you would choose in your first language. When the stress is in the wrong place, a listener may not recognise a word at all, even if every sound in it is correct. In L04 you identified word stress as one of three priorities for intelligibility. This lesson gives you the tools to deal with it systematically. You will learn the patterns that most common medical suffixes follow, the word families in which the stress moves, how compound terms are stressed, and how the rhythm of English — strong and weak syllables — affects the way your sentences sound. You will finish by building and practising a personal terminology list for your own specialty.",
    objectives: [
      "Explain why word stress matters for word recognition by listeners",
      "Predict the stressed syllable of medical terms with common suffixes, and check it in a dictionary",
      "Pronounce word families in which the stress moves, such as metastasis and metastatic",
      "Stress compound medical terms correctly and use weak forms in natural speech",
      "Build and practise a personal terminology list of 15–20 terms from your own specialty",
    ],
    sections: [
      {
        heading: "Why stress matters more than individual sounds",
        paragraphs: [
          "In English, one syllable in each word of more than one syllable is stressed: it is a little longer, a little louder and often higher in pitch, and its vowel is full. The other syllables are weaker, and many of their vowels reduce to the short neutral sound called schwa — the first sound in “about”. Listeners use this pattern to find words in a stream of speech. Strong syllables act as anchors: when listeners hear one, they tend to treat it as the beginning of a new word and search their memory from there.",
          "This is why misplaced stress can be so disruptive. If you say a familiar word with the stress on an unexpected syllable, the listener searches for the wrong word, or for a word that does not exist. Research on listening in a second language has found that misplaced stress can make a word harder to understand than a mispronounced sound, especially when the stress moves to the wrong side of the word. For presenters, the practical conclusion is simple: learn the stress of every key term in your talk.",
        ],
        callout: {
          kind: "evidence",
          text: "Experimental work on English word recognition suggests that listeners treat strong syllables as likely word beginnings. A study with native and non-native listeners found that misplaced lexical stress reduced intelligibility, particularly when the stress shifted to the right of its expected position.",
          refs: [1, 2],
        },
      },
      {
        heading: "Suffix families: stress you can predict",
        paragraphs: [
          "Many medical terms are built from Greek and Latin elements, and several common suffixes have a regular effect on stress. Words ending in “-ology” are stressed on “-ol-”: car-di-OL-o-gy /ˌkɑː.diˈɒl.ə.dʒi/. Words ending in “-ectomy” are stressed on “-ec-”: ton-sil-LEC-to-my /ˌtɒn.sɪˈlek.tə.mi/. Words ending in “-itis” are stressed on the syllable “-i-” that comes just before “-tis”: ar-THRI-tis /ɑːˈθraɪ.tɪs/. Many words ending in “-osis” are stressed on “-o-”: throm-BO-sis /θrɒmˈbəʊ.sɪs/, di-ag-NO-sis /ˌdaɪ.əɡˈnəʊ.sɪs/.",
          "Adjectives ending in “-ic” are usually stressed on the syllable immediately before the ending: di-ag-NOS-tic /ˌdaɪ.əɡˈnɒs.tɪk/, pae-di-AT-ric /ˌpiː.diˈæt.rɪk/. Other frequent terms are less predictable and simply need to be learned: pneu-MO-ni-a /njuːˈməʊ.ni.ə/, chem-o-THER-a-py /ˌkiː.məʊˈθer.ə.pi/, hae-mo-GLO-bin /ˌhiː.məˈɡləʊ.bɪn/. Patterns are a useful starting point, not a guarantee: there are exceptions, so check every key term in a learner's dictionary that shows British and American pronunciation and lets you listen to it.",
        ],
        callout: {
          kind: "recommendation",
          text: "Use the suffix patterns to make a first guess, then confirm each key term in a dictionary with audio. Academy guidance: the transcriptions in this lesson were checked against Cambridge Dictionary (UK) and Oxford Learner's Dictionaries (British English) and are given in Cambridge notation, with dots between syllables.",
        },
      },
      {
        heading: "When the stress moves within a word family",
        paragraphs: [
          "Some of the most common errors happen when the stress moves between related words. A noun and its adjective may be stressed on different syllables, and speakers often carry the stress of one into the other. Compare me-TAS-ta-sis /meˈtæs.tə.sɪs/ with met-a-STAT-ic /ˌmet.əˈstæt.ɪk/, an-AES-the-tist /əˈniːs.θə.tɪst/ with an-aes-THET-ic /ˌæn.əsˈθet.ɪk/, and a-NAL-y-sis /əˈnæl.ə.sɪs/ with AN-a-lyse /ˈæn.əl.aɪz/. In each pair the stressed vowel changes as well, and the unstressed vowels weaken.",
          "Dictionaries sometimes differ, and that is useful information too. For “diagnose”, Cambridge Dictionary gives the main stress on the last syllable (/ˌdaɪ.əɡˈnəʊz/), while Oxford Learner's Dictionaries gives it on the first (/ˈdaɪəɡnəʊz/). Both are acceptable. Where reputable dictionaries disagree, choose one pronunciation and use it consistently; where they agree, follow them.",
        ],
        callout: {
          kind: "recommendation",
          text: "When you learn a new term, learn the whole family at once — the noun, the adjective, the verb and the specialist — and practise them together in one sentence, for example: “Metastatic disease was present; metastasis to the liver was confirmed.”",
        },
      },
      {
        heading: "Compound terms",
        paragraphs: [
          "Many everyday medical terms are compounds of two words. In most noun compounds the main stress falls on the first word: BLOOD pressure /ˈblʌd ˌpreʃ.ər/, HEART attack /ˈhɑːt əˌtæk/. If you stress the second word instead, the compound can sound like an ordinary phrase, and the listener may briefly hear something different from what you mean.",
          "Not every compound follows this pattern, and stress in longer phrases also depends on what is new in your sentence, which you will practise in L07. For the compounds you use most often in your field, listen to the dictionary audio and note where the main stress falls.",
        ],
      },
      {
        heading: "Rhythm: strong and weak syllables",
        paragraphs: [
          "English sentences have a rhythm created by the contrast between stressed and unstressed syllables. Content words — nouns, main verbs, adjectives and most adverbs — usually carry stress. Grammar words such as “a”, “the”, “of”, “to”, “and”, “was” and “for” are usually unstressed and often take a weak form with schwa: “of” sounds like /əv/, “to” like /tə/, “was” like /wəz/. In “The results of the trial were published”, the strong syllables are “re-SULTS”, “TRI-al” and “PUB-lished”.",
          "Weak forms are a natural part of fluent English, and using them helps your key words stand out. They are not, however, essential for being understood, and some research on English as an international language treats them as less important than word stress and phrase stress. Do not let them become a source of anxiety. A useful compromise for presenters is to make content words clearly strong and avoid stressing every grammar word, rather than attempting to reproduce every weak form of a native speaker.",
        ],
        callout: {
          kind: "evidence",
          text: "Standard descriptions of English phonology explain stress-based rhythm and the weak forms of function words. Research on English as a lingua franca has argued that weak forms matter less for mutual intelligibility than word stress or the main stress in a phrase; this view is widely cited but debated.",
          refs: [3, 4],
        },
      },
      {
        heading: "Building your terminology list",
        paragraphs: [
          "The most efficient way to apply this lesson is to build a personal list of the 15–20 terms you use most in your talks. For each term, write the stress pattern in capitals (e.g. throm-BO-sis), check it in a dictionary with audio, and record yourself saying it in a sentence from your own work. Include numbers, drug names and abbreviations you say aloud.",
          "Practise long terms by back-chaining: start with the last syllable and add one syllable at a time towards the beginning, keeping the stress in place — “-py”, “-ra-py”, “THER-a-py”, “-o-THER-a-py”, “chem-o-THER-a-py”. Then say the word in a full sentence at presentation speed. Back-chaining keeps the end of the word intact and stops you from rushing through it. Revisit your list before every important talk.",
        ],
      },
    ],
    examples: [
      {
        title: "The word that disappeared",
        setting: "Oncology tumour board with international participants, a fictional consultant presenting",
        text: "A fictional consultant presents a case and says “meta-STA-sis”, carrying the stress of “metastatic” into the noun. Two participants online lose the thread for several seconds, and one later asks what the “new term” was. After the meeting she checks the family in a dictionary, writes “me-TAS-ta-sis / met-a-STAT-ic” at the top of her notes, and practises both words in one sentence before her next case.",
      },
      {
        title: "A compound that changed meaning",
        setting: "Cardiology teaching session, a fictional registrar",
        text: "A fictional registrar repeatedly stresses the second word of “heart attack” and “blood pressure”. The terms are still understood, but colleagues notice that the important information in his sentences — the numbers and the outcomes — is less prominent, because the stress is spent on the wrong words. When he moves the stress to the first word of each compound, his results sentences become easier to follow.",
      },
      {
        title: "Using dictionary disagreement",
        setting: "Internal medicine conference, preparation by a fictional fellow",
        text: "A fictional fellow notices that two dictionaries stress “diagnose” differently and worries that she has been saying it wrong. She learns that both forms are acceptable, chooses Cambridge Dictionary's pattern and uses it consistently. Her preparation time goes instead to “diagnosis” and “diagnostic”, where the two dictionaries agree and where she had been misplacing the stress.",
      },
    ],
    phrase_bank: [
      { phrase: "We confirmed the diagnosis of…", use: "Stating a diagnosis", register: "Neutral – formal", pronunciation: "di-ag-NO-sis /ˌdaɪ.əɡˈnəʊ.sɪs/", example: "We confirmed the diagnosis of deep vein thrombosis." },
      { phrase: "The diagnostic accuracy was…", use: "Reporting test performance", register: "Formal", pronunciation: "di-ag-NOS-tic /ˌdaɪ.əɡˈnɒs.tɪk/", example: "The diagnostic accuracy was eighty-five per cent." },
      { phrase: "There was no evidence of metastasis.", use: "Reporting a negative finding", register: "Formal", pronunciation: "me-TAS-ta-sis /meˈtæs.tə.sɪs/", example: "On staging CT there was no evidence of metastasis." },
      { phrase: "Patients with metastatic disease…", use: "Describing a subgroup", register: "Formal", pronunciation: "met-a-STAT-ic /ˌmet.əˈstæt.ɪk/", example: "Patients with metastatic disease were excluded." },
      { phrase: "Under general anaesthetic…", use: "Describing a procedure", register: "Neutral", pronunciation: "an-aes-THET-ic /ˌæn.əsˈθet.ɪk/", example: "The procedure was performed under general anaesthetic." },
      { phrase: "The anaesthetist recommended…", use: "Referring to a colleague's decision", register: "Neutral", pronunciation: "an-AES-the-tist /əˈniːs.θə.tɪst/", example: "The anaesthetist recommended a regional technique." },
      { phrase: "Blood pressure was controlled.", use: "Reporting a clinical parameter", register: "Neutral", pronunciation: "BLOOD pressure /ˈblʌd ˌpreʃ.ər/", example: "Blood pressure was controlled within two weeks." },
      { phrase: "after a first heart attack", use: "Defining a population in plain language", register: "Neutral, lay-friendly", pronunciation: "HEART attack /ˈhɑːt əˌtæk/", example: "We followed patients after a first heart attack for five years." },
    ],
    phrase_practice:
      "Say each phrase-bank example three times: slowly while tapping the stressed syllable, at normal speed, and at presentation speed. Then replace the medical term with one from your own terminology list that has a similar stress pattern, and record the new sentence.",
    demonstration:
      "The instructor video for this lesson has not yet been recorded. It will show back-chaining for “chemotherapy” and “haemoglobin”, the stress shift in metastasis / metastatic and anaesthetist / anaesthetic, and a results sentence read first with every word stressed and then with natural strong and weak syllables. Notice how the key terms become clearer when the grammar words are weaker.",
    mistakes: [
      { mistake: "Using the stress of your first language for international terms", correction: "Check each key term in an English dictionary with audio; similar spelling does not mean similar stress." },
      { mistake: "Carrying the stress from one word to its family member", correction: "Learn families together: me-TAS-ta-sis, met-a-STAT-ic." },
      { mistake: "Stressing the second word of a compound", correction: "Stress the first word in most noun compounds: BLOOD pressure, HEART attack." },
      { mistake: "Stressing every word equally when nervous", correction: "Keep content words strong and grammar words light." },
      { mistake: "Rushing through the end of long terms", correction: "Back-chain long words so the final syllables stay intact." },
      { mistake: "Worrying about dictionary differences", correction: "Where reputable dictionaries disagree, choose one form and use it consistently." },
    ],
    reflection: [
      "Which three terms in your specialty do you feel least sure how to stress?",
      "Has a colleague ever not understood a term that you thought you said clearly? What might the stress have been?",
      "How will you keep your terminology list up to date as you prepare new talks?",
    ],
    references: [
      "Cutler, A., & Norris, D. (1988). The role of strong syllables in segmentation for lexical access. Journal of Experimental Psychology: Human Perception and Performance, 14(1), 113–121.",
      "Field, J. (2005). Intelligibility and the listener: The role of lexical stress. TESOL Quarterly, 39(3), 399–423.",
      "Roach, P. (2009). English Phonetics and Phonology: A Practical Course (4th ed.). Cambridge University Press.",
      "Jenkins, J. (2000). The Phonology of English as an International Language. Oxford University Press.",
    ],
  },
  exercise: {
    title: "Your terminology list",
    instructions: "Build and practise a personal list of the terms you use most in your talks.",
    steps: [
      "Choose 15–20 terms you use often in presentations, including at least two word families and two compounds.",
      "Make a first guess at the stress of each term using the suffix patterns, and write it in capitals.",
      "Check each term in Cambridge Dictionary or Oxford Learner's Dictionaries and listen to the audio; correct your guesses.",
      "Mark the terms where your guess was wrong — these are your priorities.",
      "Back-chain each priority term, then record it in a sentence from your own talk.",
    ],
    prompt: "Paste your terminology list with the stress patterns, mark the terms you had wrong, and write the practice sentence for three of them.",
    min_chars: 300,
    model_answer:
      "Specialty: haematology.\nTerms (stress in capitals, checked in Cambridge and Oxford): hae-mo-GLO-bin, throm-BO-sis, di-ag-NO-sis, di-ag-NOS-tic, chem-o-THER-a-py, an-AES-the-tist / an-aes-THET-ic, me-TAS-ta-sis / met-a-STAT-ic, pneu-MO-ni-a, a-NAL-y-sis / AN-a-lyse, sig-NIF-i-cant, CO-hort, BLOOD pressure, HEART attack, BI-op-sy, ar-THRI-tis.\nGuesses that were wrong: haemoglobin (I stressed HAE), metastasis (I stressed STA), analyse (I stressed LYSE), biopsy (I stressed OP).\nPractice sentences:\n1. “Haemoglobin rose by two grams within a month.” (hae-mo-GLO-bin)\n2. “Metastasis to the bone marrow was excluded.” (me-TAS-ta-sis)\n3. “We analysed every biopsy twice.” (AN-a-lysed, BI-op-sy)",
    self_check: [
      "Every term was checked in a dictionary with audio, not only guessed.",
      "The list includes at least two word families and two compounds.",
      "Terms you had wrong are marked as priorities.",
      "Each practice sentence comes from your own work.",
    ],
  },
  quiz: [
    {
      prompt: "Why can misplaced word stress cause more difficulty than a mispronounced sound?",
      options: [
        "Listeners use stressed syllables to find words, so misplaced stress sends them to the wrong word",
        "Stress changes the spelling of the word",
        "Listeners ignore stressed syllables",
        "Stress only matters in questions",
      ],
      correct: 0,
      explanation: "Listeners treat strong syllables as anchors for recognising words; misplaced stress can make a familiar word unrecognisable.",
    },
    {
      prompt: "Where is the main stress in “tonsillectomy”?",
      options: [
        "TON-sil-lec-to-my",
        "ton-SIL-lec-to-my",
        "ton-sil-lec-TO-my",
        "ton-sil-LEC-to-my",
      ],
      correct: 3,
      explanation: "Words ending in “-ectomy” are stressed on “-ec-”: /ˌtɒn.sɪˈlek.tə.mi/.",
    },
    {
      scenario: true,
      prompt: "You say “meta-STA-sis” in a tumour board and online colleagues lose the thread. What is the most likely cause?",
      options: [
        "Your accent is too strong",
        "You carried the stress of “metastatic” into “metastasis”",
        "You spoke too slowly",
        "The term is too technical for the audience",
      ],
      correct: 1,
      explanation: "The noun is me-TAS-ta-sis; the adjective is met-a-STAT-ic. Learn the family together.",
    },
    {
      scenario: true,
      prompt: "Two reputable dictionaries stress “diagnose” on different syllables. What should you do?",
      options: [
        "Avoid the word in presentations",
        "Stress both syllables equally",
        "Choose one acceptable form and use it consistently",
        "Ask the audience which they prefer",
      ],
      correct: 2,
      explanation: "Where reputable dictionaries differ, both forms are acceptable; consistency helps listeners.",
    },
    {
      scenario: true,
      prompt: "You are preparing a cardiology talk. How should you stress “blood pressure” and “heart attack”?",
      options: [
        "On the second word of each",
        "Equally on both words",
        "It does not matter in compounds",
        "On the first word of each",
      ],
      correct: 3,
      explanation: "Most noun compounds are stressed on the first word: BLOOD pressure, HEART attack.",
    },
    {
      scenario: true,
      prompt: "You keep rushing the end of “chemotherapy” at presentation speed. Which technique helps most?",
      options: [
        "Back-chaining from the last syllable while keeping the stress in place",
        "Saying the word louder",
        "Replacing it with an abbreviation on every slide",
        "Spelling it aloud",
      ],
      correct: 0,
      explanation: "Back-chaining keeps the final syllables intact and fixes the stress before you add speed.",
    },
  ],
  assignment: {
    title: "Terminology and rhythm recording",
    brief:
      "Record a one-to-two-minute extract from a real talk that contains at least eight terms from your terminology list. Before recording, mark the stressed syllables of the terms and the strong syllables of two key sentences. Submit: (1) your terminology list of 15–20 terms with checked stress patterns and the dictionary you used; (2) the marked text of your extract; (3) a self-assessment after listening to the recording — which terms were stressed correctly, which were not, and whether the key words in your two sentences stood out; and (4) a plan for the three terms you will practise next. Finish with a short reflection (100–200 words) on what you learned about the stress of terms you had been using for years.",
    min_words: 250,
    required: true,
    criteria: [
      { criterion: "Accuracy", description: "Stress patterns are checked in a named dictionary and marked correctly." },
      { criterion: "Coverage", description: "The list includes word families and compounds relevant to the learner's specialty." },
      { criterion: "Rhythm", description: "Strong syllables of key sentences are marked, and the self-assessment comments on them." },
      { criterion: "Self-assessment", description: "Honest analysis of the recording, naming specific terms." },
      { criterion: "Reflection", description: "Shows insight into long-standing habits and a realistic practice plan." },
    ],
  },
  resources: [
    { title: "L05 Lesson handout", description: "Suffix stress patterns, stress-shifting families, compounds, back-chaining guide and terminology-list template.", file_url: "/materials/lessons/L05-handout.pdf", is_sample: false },
  ],
};
