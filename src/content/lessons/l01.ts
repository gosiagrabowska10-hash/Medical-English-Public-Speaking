import type { LessonSpec } from "../lesson-types";

export const L01: LessonSpec = {
  code: "L01",
  week: 1,
  minutes: 60,
  preview: true,
  aiTeacher: "speaking-mentor",
  status: "ready",
  body: {
    intro:
      "Many doctors read, write and think in English every working day, yet feel noticeably less competent when they must speak it in front of an audience. A cardiologist who can discuss a complex case fluently with a colleague may lose a familiar word at the lectern, speed up, and retreat to reading the slides. This lesson explains why that happens, what international audiences actually need from you, and how to separate the accuracy of your English from the authority of your expertise. You will finish by identifying your own speaking triggers and replacing the most common self-undermining habit of second-language presenters — the apology — with a clear statement of purpose.",
    objectives: [
      "Explain how speaking in a second language increases mental workload, and why this affects fluency under pressure",
      "Distinguish accent, comprehensibility and intelligibility, and decide which of them matters most for your audiences",
      "Identify at least three personal speaking triggers and describe their effect on your delivery",
      "Replace an apologetic opening with a clear statement of context, purpose and route",
    ],
    sections: [
      {
        heading: "Why fluent clinicians lose words on stage",
        paragraphs: [
          "Speaking involves several processes running at once: deciding what you want to say, finding the words and grammar to say it, articulating it, and monitoring what you have just said. In your first language, finding the words and building sentences is largely automatic, so your attention is free for the audience and the argument.",
          "In a second language, more of this work needs conscious attention. You search for the precise term, check the grammar of a sentence while you are already halfway through it, and listen to your own pronunciation. Under the pressure of a congress session or a grand round, the attention available to you shrinks further. The result is familiar to most second-language presenters: a word you know perfectly well disappears, sentences become longer and more tangled, and you start speaking faster to reach the end of a sentence before you lose it.",
          "None of this is a sign of weak knowledge. It is a predictable consequence of divided attention. That is good news, because divided attention can be managed. Everything you prepare in advance — your structure, your opening, your transitions, the key terms and how you will pronounce them — no longer has to be produced live, and the attention it frees goes back to your audience.",
        ],
        callout: {
          kind: "evidence",
          text: "Models of speech production describe planning, formulation and articulation as separate stages that run in parallel. Research on second-language speech describes formulation in a second language as less automatic than in the first language, so it competes for limited attention.",
          refs: [1, 2],
        },
      },
      {
        heading: "Accent, comprehensibility and intelligibility",
        paragraphs: [
          "Three terms are often confused. Accent describes how different your pronunciation sounds from a particular variety of English. Comprehensibility describes how much effort a listener needs to understand you. Intelligibility describes how much of your message the listener actually understands. These are related, but they are not the same: a speaker with a strong accent can be fully intelligible, and a speaker with a mild accent can be hard to follow if the talk is rushed and poorly structured.",
          "For your professional purposes, intelligibility and comprehensibility matter far more than accent. Your audience at an international meeting includes many listeners for whom English is also a second language. They are not comparing you with a newsreader; they are trying to follow your argument while processing technical content in a foreign language themselves.",
          "There is, however, an honest caveat. Speech that is harder to process can be judged less favourably, even when the content is identical. The practical conclusion is not that you should try to hide your accent. It is that you should reduce your listeners' effort in every other way available to you: a clear structure, explicit signposting, a manageable pace, deliberate pauses and key terms that are stressed correctly and repeated. These are skills you can learn, and the rest of this programme is built around them.",
        ],
        callout: {
          kind: "evidence",
          text: "In a frequently cited study, listeners' ratings of accent strength did not reliably predict how much of second-language speech they understood: some heavily accented speech was fully intelligible. A separate experiment found that trivia statements were rated as less likely to be true when spoken with a non-native accent, which the authors attributed to greater processing difficulty. Work on English as an international language argues that a limited set of pronunciation features, including placing the main stress correctly, matters most for mutual intelligibility.",
          refs: [3, 4, 5],
        },
      },
      {
        heading: "Separating language accuracy from professional credibility",
        paragraphs: [
          "Credibility on stage rests on three things you already have or can prepare: your expertise, the quality of your preparation, and the clarity of your message. Language accuracy supports credibility, but it is not the same thing. A small slip with an article or a preposition rarely changes how an audience judges your competence. Treating every such slip as a threat increases self-monitoring, which in turn makes more slips likely.",
          "A more useful approach is triage. Some elements of your talk must be accurate, because an error would change the meaning: numbers and units, negatives (“did” versus “did not”), drug names and doses, the names of outcomes, and your conclusions. Other elements can be imperfect without consequence: articles, most prepositions, minor tense errors and word order in a spontaneous answer. Prepare and rehearse the first group carefully; give yourself permission to let the second group go.",
          "Numbers deserve particular attention. “Fifteen” and “fifty”, “thirteen” and “thirty” are easily confused, especially by listeners who are themselves non-native speakers. Show critical numbers on the slide, say them slowly, and where it matters, restate them in another form: “fifteen per cent — that is, roughly one patient in seven”.",
        ],
        callout: {
          kind: "recommendation",
          text: "Before every talk, list the five pieces of information that must be understood exactly (numbers, doses, outcomes, conclusions) and rehearse those sentences aloud until they are automatic.",
        },
      },
      {
        heading: "Know your triggers",
        paragraphs: [
          "Most second-language speakers are not equally anxious in every situation. Common triggers include being interrupted, questions from a senior colleague or a native speaker, a question asked quickly or with an unfamiliar accent, technical failure, being recorded, a strict chair with a timer, and the first minute of a talk. Each trigger tends to produce a recognisable pattern: a faster heartbeat and a dry mouth, but also changes in speech, such as rushing, losing words, over-explaining or falling silent.",
          "Mapping your own triggers is the first practical step towards managing them. For each trigger, note what happens in your body, what happens to your speech, and what you would like to do instead. Then prepare a specific response. If an unclear question is a trigger, you can prepare a clarification phrase and practise it until it is automatic. Preparing the words in advance removes the need to formulate them under pressure, which is exactly when formulation is hardest.",
        ],
      },
      {
        heading: "Opening without apology",
        paragraphs: [
          "Many second-language speakers open with “Sorry for my English”. The intention is courteous, but the effect is the opposite of what you want: it directs the audience to listen for mistakes, and it frames your first impression around your language rather than your expertise.",
          "Replace the apology with three short moves: context, purpose and route. Context tells the audience why the topic matters to them. Purpose tells them what you want them to take away. Route tells them how the talk is organised. If you are genuinely concerned about being understood, add a functional request rather than an apology: “Please stop me if anything is unclear.” This sounds confident, invites interaction and serves the audience.",
        ],
      },
    ],
    examples: [
      {
        title: "Two openings, same content",
        setting: "International cardiology congress, 10-minute oral presentation",
        text: "Speaker A begins: “Good morning. Sorry for my English, I will try my best. So, this study is about delirium after cardiac surgery…” and reads a dense first slide quickly. Speaker B, whose accent is stronger, begins: “Good morning. Post-operative delirium affects many of our cardiac surgery patients, and it is often missed. [pause] Today I want to show you one change in our screening that helped us detect it earlier. [pause] I’ll describe what we changed, what we found, and what we are still unsure about.” Most listeners would perceive Speaker B as more confident and more expert, even though Speaker A’s English is more accurate. Speaker B has reduced the listeners’ effort and given them a reason to listen.",
      },
      {
        title: "Losing a word at grand rounds",
        setting: "Grand round, respiratory medicine, presented by a specialty trainee",
        text: "Midway through a case, the presenter cannot retrieve the word “pneumothorax”. Instead of stopping, she paraphrases: “The repeat X-ray showed air in the pleural space — the lung had partially collapsed — a pneumothorax.” The word returns as she paraphrases. The audience hears a natural explanation, not a failure. The strategy works because paraphrase uses words that are easier to retrieve under pressure, and it gives the memory a moment to recover the precise term.",
      },
      {
        title: "A fast question from a senior native speaker",
        setting: "Question-and-answer session after a research presentation",
        text: "A professor asks a long, rapid question with several clauses. The presenter catches only the end. Rather than guessing, she says: “Thank you. Could I ask you to repeat the first part of your question?” and then: “If I’ve understood you correctly, you’re asking whether the effect persisted beyond six months.” The professor confirms, and her answer is precise. Asking for clarification is standard practice among experienced speakers, including native speakers; it signals care, not weakness.",
      },
    ],
    phrase_bank: [
      { phrase: "Today I’d like to show you…", use: "Stating your purpose in the opening", register: "Neutral – formal", pronunciation: "Stress “SHOW”; contract “I’d” naturally.", example: "Today I’d like to show you why we changed our screening for delirium." },
      { phrase: "What I’d like you to take away is…", use: "Announcing the core message", register: "Neutral", pronunciation: "Stress “TAKE aWAY”.", example: "What I’d like you to take away is that earlier screening changed our practice." },
      { phrase: "I’ll start with…, then…, and finally…", use: "Giving the route of the talk", register: "Neutral", example: "I’ll start with the problem, then our intervention, and finally what we are still unsure about." },
      { phrase: "Please stop me if anything is unclear.", use: "Replacing an apology for your English", register: "Neutral, courteous", pronunciation: "Fall in pitch on “unCLEAR”.", example: "This is a small group, so please stop me if anything is unclear." },
      { phrase: "Let me put that another way.", use: "Repairing a sentence that went wrong, or paraphrasing a word you cannot retrieve", register: "Neutral", example: "Let me put that another way: the lung had partially collapsed." },
      { phrase: "In other words, …", use: "Restating a complex point simply", register: "Neutral", example: "Mortality fell by a third. In other words, one death in three was avoided." },
      { phrase: "Could I ask you to repeat the last part of your question?", use: "Clarifying a question you did not fully understand", register: "Formal, polite", pronunciation: "Stress “LAST part”.", example: "Thank you. Could I ask you to repeat the last part of your question?" },
      { phrase: "If I’ve understood you correctly, you’re asking…", use: "Checking your understanding before answering", register: "Formal", example: "If I’ve understood you correctly, you’re asking whether the effect persisted." },
      { phrase: "That’s an important point.", use: "Acknowledging a question while you gather your thoughts", register: "Neutral", pronunciation: "Do not over-use it; once or twice per session.", example: "That’s an important point, and it’s one of the limitations of our data." },
      { phrase: "Bear with me for a moment.", use: "Asking for patience during a technical problem or while finding a slide", register: "Neutral, British usage", pronunciation: "“Bear” sounds like “bare”.", example: "Bear with me for a moment — the video should start now." },
    ],
    phrase_practice:
      "Choose three expressions for your next talk: one for the opening, one for repair and one for questions. Write them on your speaker notes, not on the slides, and rehearse each one aloud in a full sentence about your own topic until it comes out without effort.",
    demonstration:
      "The instructor video shows the two openings from the congress example delivered back to back, then a short Q&A in which a fast question is clarified with the phrases from this lesson. Watch for where the speaker pauses, how the first sentence states a purpose, and how a key term is said slowly the first time it appears.",
    mistakes: [
      { mistake: "Apologising for your English at the start", correction: "State context, purpose and route; if needed, add “Please stop me if anything is unclear.”" },
      { mistake: "Writing a word-for-word script and reading it under pressure", correction: "Script only the opening, transitions and critical sentences; speak the rest from key phrases." },
      { mistake: "Correcting small grammar slips aloud", correction: "Continue; correct only errors that change meaning, such as numbers or negatives." },
      { mistake: "Guessing the meaning of a question you did not fully hear", correction: "Ask for repetition and paraphrase the question before answering." },
      { mistake: "Saying critical numbers quickly", correction: "Show them on the slide, say them slowly, and restate them in another form." },
    ],
    reflection: [
      "In which professional speaking situations do you notice the strongest self-monitoring?",
      "Which of your current worries concern language accuracy, and which concern being understood?",
      "Which single habit from this lesson would make the biggest difference to your next talk?",
    ],
    references: [
      "Levelt, W. J. M. (1989). Speaking: From Intention to Articulation. Cambridge, MA: MIT Press.",
      "Kormos, J. (2006). Speech Production and Second Language Acquisition. Mahwah, NJ: Lawrence Erlbaum.",
      "Munro, M. J., & Derwing, T. M. (1995). Foreign accent, comprehensibility, and intelligibility in the speech of second language learners. Language Learning, 45(1), 73–97.",
      "Lev-Ari, S., & Keysar, B. (2010). Why don’t we believe non-native speakers? The influence of accent on credibility. Journal of Experimental Social Psychology, 46(6), 1093–1096.",
      "Jenkins, J. (2000). The Phonology of English as an International Language. Oxford: Oxford University Press.",
    ],
  },
  exercise: {
    title: "Map your speaking triggers",
    instructions: "Analyse two recent occasions on which you spoke in English to a professional audience, and prepare a response for each trigger you identify.",
    steps: [
      "Choose two situations from the last year (for example a congress talk, a case presentation, an MDT meeting or a teaching session).",
      "For each, identify the moment you felt least comfortable and what triggered it.",
      "Describe what you noticed in your body and what changed in your speech (pace, lost words, reading, silence).",
      "For each trigger, choose one phrase from the phrase bank, or write your own, that you will use next time.",
    ],
    prompt: "Write your two situations, triggers, effects and prepared phrases (at least 300 characters).",
    min_chars: 300,
    model_answer:
      "Situation 1: a 7-minute oral presentation at a European nephrology meeting. Trigger: the chair held up a “two minutes” sign before my results section. Body: heart rate rose, hands felt cold. Speech: I started speaking much faster and skipped my conclusion slide. Prepared response: rehearse a 30-second version of my results and conclusion, and say “In the time remaining, let me focus on the main finding.”\n\nSituation 2: a teaching session for international medical students on Zoom. Trigger: a student asked a fast question with an accent I found difficult. Body: felt hot, slight panic. Speech: I guessed what she meant and answered the wrong question. Prepared response: “Could I ask you to repeat the last part of your question?” followed by “If I’ve understood you correctly, you’re asking…”.",
    self_check: [
      "Each situation is specific (place, audience, type of talk), not general.",
      "The trigger is a concrete event, not a general feeling.",
      "You describe at least one change in your speech, not only in your body.",
      "Each trigger has a prepared phrase you could say word for word.",
    ],
  },
  quiz: [
    {
      prompt: "Why do many fluent professionals find presenting in a second language more tiring than speaking in their first language?",
      options: [
        "Their medical knowledge is weaker in the second language",
        "Formulating speech in a second language is less automatic and competes for attention",
        "International audiences are more critical than local audiences",
        "Slides are harder to design in English",
      ],
      correct: 1,
      explanation: "Second-language formulation needs more conscious attention, so it competes with memory, fluency and attention to the audience. It is not a sign of weaker knowledge.",
    },
    {
      prompt: "Which statement about accent and intelligibility is most accurate?",
      options: [
        "A stronger accent always means lower intelligibility",
        "Accent has no effect on how listeners judge a speaker",
        "Heavily accented speech can be fully intelligible, but harder-to-process speech may be judged less favourably",
        "Intelligibility depends only on grammar",
      ],
      correct: 2,
      explanation: "Accent and intelligibility are related but distinct. Research shows accented speech can be fully intelligible; it also suggests processing difficulty can affect judgements, which is why reducing listener effort matters.",
    },
    {
      scenario: true,
      prompt: "You are about to present at an international congress and feel worried about your English. Which opening is best?",
      options: [
        "“Sorry for my English, I will try my best.”",
        "“My English is not perfect, so please be patient with me.”",
        "“Today I’d like to show you one change that improved our outcomes. Please stop me if anything is unclear.”",
        "Start directly with the methods slide to save time",
      ],
      correct: 2,
      explanation: "A statement of purpose builds credibility, and a functional request serves the audience without drawing attention to your language.",
    },
    {
      scenario: true,
      prompt: "During your talk you say “the patients was” instead of “the patients were”. What should you do?",
      options: [
        "Stop and correct the sentence explicitly",
        "Continue with your message",
        "Apologise to the audience",
        "Repeat the whole slide",
      ],
      correct: 1,
      explanation: "This error does not change the meaning. Correcting it aloud draws attention to it and interrupts your flow. Correct only errors that change meaning.",
    },
    {
      scenario: true,
      prompt: "A senior professor asks a long, fast question and you understand only the final part. What is the most professional response?",
      options: [
        "Answer the part you understood and hope it was the main point",
        "Ask the chair to answer instead",
        "Ask for the first part to be repeated, then paraphrase the question before answering",
        "Say that you will answer after the session",
      ],
      correct: 2,
      explanation: "Clarifying and paraphrasing is standard practice among experienced speakers. It ensures you answer the right question and signals care.",
    },
    {
      prompt: "Which of these must be rehearsed until it is completely accurate?",
      options: [
        "Every article and preposition in the talk",
        "Numbers, doses, negatives and your conclusions",
        "Your accent",
        "The exact wording of every answer to possible questions",
      ],
      correct: 1,
      explanation: "Errors in numbers, doses, negatives or conclusions change the meaning. Minor grammatical slips usually do not.",
    },
  ],
  assignment: {
    title: "Your speaking profile",
    brief:
      "Write a speaking profile of 200–400 words. Describe (1) the professional situations in which you speak English now, (2) your three most important triggers and how they affect your delivery, (3) what you want to be able to do in ten weeks, and (4) one specific talk you would like to give with confidence. You will revisit this profile in Module 12. Do not include any patient-identifiable information.",
    min_words: 200,
    required: true,
    criteria: [
      { criterion: "Specificity", description: "Situations, audiences and talks are concrete and recognisable, not general." },
      { criterion: "Self-analysis", description: "Triggers are linked to observable effects on speech (pace, lost words, reading, silence)." },
      { criterion: "Goals", description: "The ten-week aims are realistic and connected to the triggers identified." },
      { criterion: "Professional language", description: "The text is clear and organised; minor language errors are acceptable." },
    ],
  },
  resources: [
    { title: "L01 Lesson handout", description: "Key points, phrase bank and the speaking-trigger worksheet.", file_url: "/materials/lessons/L01-handout.pdf", is_sample: false },
  ],
};
