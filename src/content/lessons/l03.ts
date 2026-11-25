import type { LessonSpec } from "../lesson-types";

export const L03: LessonSpec = {
  code: "L03",
  week: 1,
  minutes: 55,
  aiTeacher: "speaking-mentor",
  status: "ready",
  body: {
    intro:
      "Authority in medical speaking does not come from sounding like someone else. It comes from a clear sense of what you know, how you want to be heard, and what you are working to improve. This lesson turns the general wish to “be more confident” into a professional speaker identity and a concrete development plan. You will audit the strengths you already bring as a clinician or researcher, define the voice you want audiences to recognise, learn the language of measured scientific confidence, and set three specific, observable goals for the ten weeks of the programme — starting from an honest baseline recording of how you speak today.",
    objectives: [
      "Identify at least three strengths you already bring to professional speaking",
      "Define your professional voice in three words and link each word to a concrete delivery choice",
      "Use appropriate hedging and boosting language to sound confident without overstating evidence",
      "Write three specific, observable goals with if–then plans and a baseline for each",
    ],
    sections: [
      {
        heading: "What authority means for a medical speaker",
        paragraphs: [
          "Audiences at medical meetings judge speakers quickly, and they judge them on more than language. A useful framework, which goes back to classical rhetoric, distinguishes three sources of persuasion: the credibility of the speaker, the logic of the argument, and the connection with the audience. For a medical speaker, credibility comes from expertise and integrity: knowing the field, being precise about what the evidence shows, and being honest about its limits. Logic comes from a clear structure and a well-chosen core message. Connection comes from showing why the topic matters to the people in the room.",
          "Notice that none of these depends on a native accent. A second-language speaker who is precise, well organised and relevant has every source of authority available. The work of this programme is to make those qualities audible: to deliver them clearly enough that the audience recognises them.",
        ],
      },
      {
        heading: "Strengths you already have",
        paragraphs: [
          "Medical professionals bring real advantages to the podium, and it is worth naming them explicitly. You explain complex information to patients and families, often under time pressure and in difficult circumstances. You present cases in a structured way, from history to plan. You are used to reasoning from evidence, weighing uncertainty and making decisions. Many of you teach students and junior colleagues. Some of you have experience of speaking in two or three languages, which gives you a sharp awareness of how meaning can be lost.",
          "Begin with an audit. List the situations in which you already communicate well — a family meeting, a handover, a bedside teaching session — and ask what you do there that works. Often the answer is surprisingly transferable: you slow down for a worried family, you check understanding, you choose simple words for a complex idea. These are presentation skills. Part of your development is simply bringing them onto the stage.",
        ],
      },
      {
        heading: "Defining your professional voice",
        paragraphs: [
          "Choose three words that you would like an audience to use about you after a talk: for example “clear, practical, warm” or “precise, calm, curious”. Avoid words that describe a personality you do not have. A calm and precise speaker does not need to become theatrical to be effective; trying to perform a different personality adds yet another task to an already demanding situation.",
          "Each word should guide concrete choices. “Clear” might mean one message per slide and a summary at the end of each section. “Practical” might mean ending every talk with what the audience can do on Monday. “Curious” might mean opening with a genuine question from your own practice. Writing down these links turns an abstract identity into decisions you can rehearse and evaluate.",
        ],
        callout: {
          kind: "recommendation",
          text: "Write your three words on the first page of your speaker notes for every talk during the programme, and check one delivery choice against each word when you rehearse.",
        },
      },
      {
        heading: "The language of measured confidence",
        paragraphs: [
          "Scientific English has a particular way of sounding confident. Overstating results (“this proves”) damages credibility with expert audiences, but excessive caution (“maybe it could perhaps be possible that”) sounds uncertain. Authority lies in matching the strength of your language to the strength of your evidence.",
          "Use boosters when the evidence is strong: “clearly”, “consistently”, “the data show”. Use hedges when it is not: “our data suggest”, “this may reflect”, “in our population”. Distinguish your findings from your interpretation: “We found…; we think this is because…”. State limitations directly rather than apologetically: “The main limitation is the sample size.” Second-language speakers often either avoid hedging altogether or stack several hedges in one sentence. One accurate hedge, placed where the uncertainty actually lies, is both more confident and more honest.",
        ],
      },
      {
        heading: "Goals that can be observed and measured",
        paragraphs: [
          "Vague goals such as “be more confident” or “improve my English” are hard to act on and impossible to evaluate. Useful speaking goals describe behaviour that you or an observer can see or measure: speaking at a comfortable pace, pausing before each key result, opening without an apology, or answering three questions without looking at your notes.",
          "Add an if–then plan to each goal: a specific situation and a specific action. “If the chair shows the two-minute sign, then I will move to my conclusion slide and say my take-home message.” Plans of this kind link the goal to the moment when you need it, which is precisely when you have least attention to spare.",
        ],
        callout: {
          kind: "evidence",
          text: "Research on goal setting has found that specific, challenging goals generally lead to better performance than vague instructions to “do your best”. Studies of implementation intentions — plans in the form “if situation X, then I will do Y” — have found that they help people act on their goals.",
          refs: [1, 2],
        },
      },
      {
        heading: "Establish a baseline, then practise deliberately",
        paragraphs: [
          "You cannot see progress without a starting point. Record yourself giving a two-minute summary of your current work, as you would at the start of a conference talk. Use your phone or a laptop; in a later stage of the programme, the Speaking Studio will measure aspects such as pace and filler words for you. Listen once for content and once for delivery, and note what you hear: pace, pauses, fillers, and moments where you search for words.",
          "Improvement comes from focused practice on one element at a time, with feedback, rather than from simply repeating whole talks. Choose one goal per week, practise it in short sessions, and record again. Over ten weeks, a sequence of short, targeted recordings is far more valuable than a single rehearsal the night before a congress.",
        ],
        callout: {
          kind: "evidence",
          text: "Research on expert performance distinguishes deliberate practice — focused effort on specific aspects of performance, with feedback — from simple repetition, and associates it with the development of expertise.",
          refs: [3],
        },
      },
    ],
    examples: [
      {
        title: "From vague to measurable",
        setting: "Consultant anaesthetist preparing for a national meeting",
        text: "Her initial goal was “to sound more confident in English”. After the baseline recording, she noticed that she spoke very quickly in the first minute and said “so” at the start of most sentences. Her revised goals were: “Open every talk with a rehearsed 60-word introduction and two pauses”; “Reduce sentence-initial ‘so’ to no more than three per five minutes”; and “If I am asked a question I did not fully understand, then I will paraphrase it before answering.” Each goal could be checked in her next recording.",
      },
      {
        title: "Three words in practice",
        setting: "Paediatric neurologist who teaches international fellows",
        text: "She chose “clear, calm, curious”. Clear: one message per slide, stated in the slide title as a full sentence. Calm: a deliberate pause before every data slide. Curious: each teaching session opens with a real clinical question from her practice, such as “Why did this child’s seizures stop when we changed nothing?”. After three weeks, fellows began to describe her sessions in almost exactly those words, without knowing she had chosen them.",
      },
      {
        title: "Measured confidence in a results statement",
        setting: "Research fellow presenting a single-centre observational study",
        text: "First draft: “This study proves that early mobilisation reduces delirium, maybe, in some patients, possibly.” The sentence both overstates and undermines the finding. Revised: “In our cohort, patients who were mobilised within 24 hours had fewer episodes of delirium. Because this was an observational study in one centre, we can’t exclude confounding; a randomised trial is the next step.” The revision is more cautious about causation and, at the same time, sounds more authoritative.",
      },
    ],
    phrase_bank: [
      { phrase: "My work focuses on…", use: "Introducing your expertise briefly", register: "Neutral – formal", example: "I’m a consultant nephrologist, and my work focuses on dialysis in older adults." },
      { phrase: "What I’d like to share is based on…", use: "Establishing the source of your authority", register: "Neutral", example: "What I’d like to share is based on five years of data from our unit." },
      { phrase: "Our data suggest that…", use: "Hedging a finding appropriately", register: "Formal, scientific", pronunciation: "Note: “data” is usually plural in scientific British English (“data suggest”).", example: "Our data suggest that early screening detects delirium sooner." },
      { phrase: "The evidence for this is strong.", use: "Boosting when the evidence justifies it", register: "Formal", example: "The evidence for this is strong: three large trials point in the same direction." },
      { phrase: "We found…; we think this is because…", use: "Separating results from interpretation", register: "Neutral, scientific", example: "We found fewer readmissions; we think this is because follow-up calls happened earlier." },
      { phrase: "The main limitation is…", use: "Stating limitations directly", register: "Formal", pronunciation: "Stress “MAIN limiTAtion”.", example: "The main limitation is that this was a single-centre study." },
      { phrase: "In our experience…", use: "Signalling professional experience rather than formal evidence", register: "Neutral", example: "In our experience, families find this explanation easier to follow." },
      { phrase: "Speaking as a clinician rather than a researcher, …", use: "Clarifying the perspective you speak from", register: "Neutral – formal", example: "Speaking as a clinician rather than a researcher, I find this result reassuring." },
      { phrase: "I’d welcome your thoughts on…", use: "Inviting discussion confidently", register: "Formal, collegial", example: "I’d welcome your thoughts on how this might work in smaller hospitals." },
      { phrase: "We don’t yet know whether…", use: "Acknowledging uncertainty with authority", register: "Neutral", example: "We don’t yet know whether the effect lasts beyond a year." },
    ],
    phrase_practice:
      "Write a 60-second self-introduction for a congress session using three of these expressions: one to introduce your work, one to hedge a finding, and one to state a limitation. Record it and check that your hedges sit exactly where the uncertainty lies.",
    demonstration:
      "The instructor video shows the same speaker giving two self-introductions: one generic and one built around three chosen words. It then presents the research fellow’s results statement in its first and revised versions.",
    mistakes: [
      { mistake: "Copying the style of a speaker whose personality is very different from yours", correction: "Choose three words that describe the best version of your own style." },
      { mistake: "Setting goals that cannot be observed", correction: "Describe behaviour you could see in a recording, such as pauses, pace or openings." },
      { mistake: "Setting many goals at once", correction: "Choose three goals and focus on one per week." },
      { mistake: "Overstating results (“this proves…”)", correction: "Match the strength of your language to the strength of the evidence." },
      { mistake: "Stacking hedges (“maybe it could possibly…”)", correction: "Use one accurate hedge where the uncertainty actually lies." },
    ],
    reflection: [
      "Which three words would you like an audience to use about you, and which delivery choice supports each one?",
      "Which goal would make the biggest difference to your professional work in the next year?",
      "What did your baseline recording show that surprised you?",
    ],
    references: [
      "Locke, E. A., & Latham, G. P. (2002). Building a practically useful theory of goal setting and task motivation: A 35-year odyssey. American Psychologist, 57(9), 705–717.",
      "Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. American Psychologist, 54(7), 493–503.",
      "Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C. (1993). The role of deliberate practice in the acquisition of expert performance. Psychological Review, 100(3), 363–406.",
    ],
  },
  exercise: {
    title: "Three words, three goals",
    instructions: "Define your professional voice and turn your development into observable goals.",
    steps: [
      "Record a two-minute summary of your current work and listen to it twice: once for content, once for delivery.",
      "Choose three words for your professional voice and link each to one concrete delivery choice.",
      "Write three observable goals based on what you heard in your recording.",
      "Add an if–then plan to each goal.",
    ],
    prompt: "Your three words with delivery choices, and three goals with if–then plans (at least 300 characters).",
    min_chars: 300,
    model_answer:
      "Three words: precise (each data slide has one take-home sentence in the title); calm (I pause before every result); practical (I end with what clinicians can change next week).\n\nGoal 1: Open every talk with a rehearsed introduction of under 70 words. If I feel my heart rate rise at the lectern, then I will breathe once and say my first scripted sentence.\nGoal 2: Reduce fillers (“so”, “eh”) to no more than five in a five-minute recording. If I notice a filler, then I will pause silently before the next sentence.\nGoal 3: Paraphrase every question before answering. If a question is longer than one sentence, then I will say “If I’ve understood you correctly, you’re asking…”.",
    self_check: [
      "Each word is linked to a choice you could observe in a recording.",
      "Each goal is based on something you heard in your baseline recording.",
      "Each goal can be checked as achieved or not achieved.",
      "Each if–then plan names a specific situation and a specific action.",
    ],
  },
  quiz: [
    {
      prompt: "Which of these is an observable speaking goal?",
      options: ["Be more confident", "Sound more professional", "Pause before stating each key result", "Improve my English"],
      correct: 2,
      explanation: "An observable goal describes behaviour you could see or hear in a recording.",
    },
    {
      prompt: "What is the main purpose of an if–then plan?",
      options: [
        "To make goals sound more ambitious",
        "To link a goal to the specific situation in which you need to act",
        "To replace rehearsal",
        "To impress the audience",
      ],
      correct: 1,
      explanation: "If–then plans connect the goal to the moment of action, when attention is limited. Research suggests they help people act on their goals.",
    },
    {
      scenario: true,
      prompt: "You present a single-centre observational study. Which sentence matches the strength of the evidence?",
      options: [
        "“This study proves that early mobilisation prevents delirium.”",
        "“Maybe it could possibly be that mobilisation perhaps helps.”",
        "“In our cohort, early mobilisation was associated with fewer episodes of delirium.”",
        "“Mobilisation is the cure for delirium.”",
      ],
      correct: 2,
      explanation: "“Was associated with” is accurate for observational data; it avoids both overstatement and excessive hedging.",
    },
    {
      scenario: true,
      prompt: "A colleague with a very theatrical style is admired in your department. You are naturally calm and precise. What should you do?",
      options: [
        "Copy the colleague’s gestures and jokes",
        "Develop your own calm and precise style and make it clearly audible",
        "Avoid presenting until you feel more theatrical",
        "Speak louder and faster to sound energetic",
      ],
      correct: 1,
      explanation: "Authority comes from expertise, clarity and integrity. Performing a different personality adds load and rarely sounds authentic.",
    },
    {
      prompt: "Which approach to practice is most likely to improve your speaking?",
      options: [
        "Rehearsing the whole talk many times the night before",
        "Focused practice on one element at a time, with recordings and feedback",
        "Reading your slides aloud silently",
        "Waiting until the talk and relying on adrenaline",
      ],
      correct: 1,
      explanation: "Research on expert performance associates focused, feedback-based practice with improvement more than simple repetition.",
    },
    {
      scenario: true,
      prompt: "Your study had a small sample. How should you state this limitation?",
      options: [
        "Do not mention it",
        "“Sorry, I know the study is very weak.”",
        "“The main limitation is the sample size, so these findings need confirmation in a larger cohort.”",
        "Mention it only if someone asks",
      ],
      correct: 2,
      explanation: "Stating limitations directly, without apology, is a mark of scientific credibility.",
    },
  ],
  assignment: {
    title: "Your ten-week development plan",
    brief:
      "Write a development plan of 250–400 words. Describe your baseline recording (what you noticed about pace, pauses, fillers and word-finding), your three words with their delivery choices, and your three goals with if–then plans. For each goal, explain why it matters in your professional context and how you will know you have achieved it by Week 10.",
    min_words: 250,
    required: true,
    criteria: [
      { criterion: "Baseline", description: "The plan refers to specific observations from a real recording." },
      { criterion: "Observable goals", description: "Each goal could be checked in a later recording or by an observer." },
      { criterion: "Implementation", description: "Each goal has a realistic if–then plan tied to a real situation." },
      { criterion: "Relevance", description: "Goals are connected to the speaker’s actual professional speaking context." },
    ],
  },
  resources: [
    { title: "L03 Lesson handout", description: "Strengths audit, three-words worksheet, goal and if–then planner, hedging phrases.", file_url: "/materials/lessons/L03-handout.pdf", is_sample: false },
  ],
};
