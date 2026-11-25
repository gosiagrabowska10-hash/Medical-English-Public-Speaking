import type { LessonSpec } from "../lesson-types";

export const L02: LessonSpec = {
  code: "L02",
  week: 1,
  minutes: 60,
  aiTeacher: "speaking-mentor",
  status: "ready",
  body: {
    intro:
      "Every experienced speaker feels some arousal before an important talk: a faster heartbeat, a dry mouth, restless hands. For many second-language speakers these sensations are stronger, and they arrive exactly when the extra effort of speaking in English is greatest. This lesson treats nervousness as something to manage rather than eliminate. You will learn what is happening in your body, how the way you interpret it changes your performance, and how to build a short, reliable routine for the day, the hour and the minute before you speak. You will also prepare the most difficult part of any talk — the first thirty seconds — and a recovery plan for the moment your mind goes blank.",
    objectives: [
      "Recognise the physical and verbal signs of performance arousal in yourself",
      "Apply a reappraisal statement and a slow-breathing routine before speaking",
      "Write and rehearse an opening of no more than 70 words with planned pauses",
      "Use a three-step recovery technique when you lose your place during a talk",
    ],
    sections: [
      {
        heading: "What your body is doing, and why it is not the enemy",
        paragraphs: [
          "Before a talk, your body prepares for a demanding task. Stress hormones raise your heart rate and breathing, redirect blood flow and sharpen attention to threat. The signs are familiar: palpitations, a dry mouth, cold hands, a tight throat and an urge to move. In speech, the same arousal often shows as a faster pace, a higher pitch, shallow breathing that leaves you short of air at the end of sentences, and a tendency to rush through the opening.",
          "A common goal is to stop feeling nervous. It is also an unrealistic one. Arousal is partly automatic, and trying to suppress it usually increases self-monitoring — the very process that already competes for attention when you speak a second language. A more useful goal is regulation: bringing arousal into a range in which it sharpens rather than scatters your attention, and keeping its effects on your speech under control.",
          "It helps to separate the sensation from the story you tell about it. The sensation is physical. The story — “I am going to fail” or “my body is getting ready to perform” — is an interpretation, and it is the interpretation you can change.",
        ],
      },
      {
        heading: "Reappraisal: changing the interpretation, not the feeling",
        paragraphs: [
          "Reappraisal means deliberately reinterpreting arousal as a resource. Instead of telling yourself to calm down, you name the sensation as preparation: “This is energy. My body is getting ready.” The advantage is that this statement is true, so you do not have to argue with your own heartbeat.",
          "Use a short sentence that you can say silently in the minutes before you speak. Some speakers prefer “I am excited to share this”; others prefer a more neutral version such as “This energy will help me focus.” Choose wording you can say honestly. Rehearse it in low-stakes situations first, such as before a ward meeting or a journal club, so that it is automatic when the stakes are high.",
        ],
        callout: {
          kind: "evidence",
          text: "In laboratory studies, participants instructed to reinterpret pre-performance arousal as helpful showed more adaptive physiological responses, and participants who said “I am excited” before a public speaking task were rated as more persuasive, competent and confident than those who tried to calm down.",
          refs: [1, 2],
        },
      },
      {
        heading: "Slow breathing",
        paragraphs: [
          "Breathing is the one part of the stress response you can control directly. Slow breathing with an exhale that is longer than the inhale is widely used to reduce physiological arousal. A practical pattern is to inhale through the nose for four counts and exhale gently through the mouth for six counts, for about two minutes. Nobody in the room needs to notice; you can do it while waiting to be introduced.",
          "Breathing also matters during the talk. Anxious speakers often take shallow breaths and then try to say a long sentence on what remains. Plan short sentences and natural breathing points in your opening, and breathe at every pause. A breath taken at a pause is invisible to the audience; a sentence that runs out of air is not.",
        ],
        callout: {
          kind: "evidence",
          text: "A systematic review of slow-breathing techniques (around six breaths per minute) reported associations with increased heart-rate variability, relaxation and reduced anxiety. The four-in, six-out pattern used here is a practical recommendation based on this approach rather than a tested protocol for presentations.",
          refs: [3],
        },
      },
      {
        heading: "A pre-speaking routine: the day, the hour, the minute",
        paragraphs: [
          "Routines work because they replace decisions with habits. On the day before, finish your slides, rehearse the full talk aloud once with a timer, and rehearse the opening and conclusion several times. Do not plan to make major changes on the day itself.",
          "One hour before, check the room and the technology: the clicker, the laser pointer, the microphone, the video files and the timer the chair will use. Then stop editing. Last-minute changes create new material that has not been rehearsed, which increases load at the worst possible moment.",
          "Ten minutes before, do two minutes of slow breathing and say your reappraisal statement. Drink water to prevent a dry mouth. One minute before, stand or sit with both feet on the floor, feel the contact, and silently rehearse your first sentence. When you reach the lectern, arrange your notes, look at the audience, and take one breath before you speak. The silence will feel long to you and normal to everyone else.",
        ],
        callout: {
          kind: "recommendation",
          text: "Rehearse the routine itself, not only the talk. Use it before smaller occasions for two or three weeks so that it becomes automatic.",
        },
      },
      {
        heading: "The first thirty seconds",
        paragraphs: [
          "Arousal usually peaks in the opening, and this is where second-language speakers most often rush. Prepare the first thirty seconds word for word: no more than 70 words, in short spoken sentences, with at least two marked pauses. Use the structure from Lesson 1: context, purpose and route. Rehearse it aloud until it feels natural, and then rehearse it standing up, because posture changes breathing and voice.",
          "Open with a sentence that is easy to say. Avoid starting with long technical terms, numbers or complex grammar. “Good morning. Thank you, Chair” is followed by a pause, then by a short sentence that tells the audience why the topic matters. Once the opening is behind you, most speakers find their rhythm. You are not memorising the whole talk; you are building a reliable way into it.",
        ],
      },
      {
        heading: "When your mind goes blank",
        paragraphs: [
          "Almost every speaker loses their place at some point. What distinguishes experienced speakers is not that it never happens, but that they have a plan. Use three steps. First, pause and breathe; a silence of three or four seconds is not noticed as a problem. Second, look at your slide or your notes for the key phrase. Third, bridge back with a short summary of what you have just said: “So, to recap — the screening was feasible. Let me now turn to the results.”",
          "Summarising buys time, helps the audience, and usually brings back the next point. Prepare one recap sentence for each section of your talk in advance, so that you never have to compose it under pressure.",
        ],
      },
      {
        heading: "A note on medication",
        paragraphs: [
          "Some clinicians ask about medication for performance anxiety. This is a clinical decision for the individual and their own doctor, and it is outside the scope of this programme. The techniques in this lesson are educational and can be used alongside any approach you choose.",
        ],
      },
    ],
    examples: [
      {
        title: "A rehearsed opening",
        setting: "Orthopaedic surgery meeting, 8-minute quality-improvement presentation",
        text: "“Good morning. Thank you, Chair. [pause] After hip surgery, many of our patients had a urinary catheter for two or three days. [pause] Today I want to show you what happened when we stopped doing that routinely — and what happened to our infection rates. [pause] I’ll cover what we changed, what we measured, and the questions it raised.” The opening is 60 words, uses short sentences, states the purpose and gives the route. The speaker rehearsed it twelve times over three days and said it was the only part of the talk she did not worry about.",
      },
      {
        title: "A physical cue to start",
        setting: "Cardiology grand round, presenter waiting to be introduced",
        text: "While the chair introduces him, a consultant cardiologist breathes slowly, four counts in and six out, and silently repeats “This energy will help me focus.” At the lectern, he places his notes down, rests both palms flat on the lectern for two seconds, looks at the back row, and begins. The gesture is invisible to the audience but signals to him that preparation is over and the talk has started.",
      },
      {
        title: "Recovering from a blank",
        setting: "Journal club presented by a research fellow, online",
        text: "Halfway through, the fellow loses the thread after a question in the chat. She pauses, takes a breath and looks at her slide title, “Limitations”. She says: “So, to recap — the trial was well designed, and the effect was clinically meaningful. Let me now turn to its limitations.” The audience experiences a natural transition. The recap took eight seconds and gave her time to retrieve her next point.",
      },
    ],
    phrase_bank: [
      { phrase: "Thank you, Chair.", use: "Acknowledging the chair before you begin", register: "Formal, standard at congresses", pronunciation: "Pause after it; do not run it into your first sentence.", example: "Thank you, Chair. [pause] Good morning, everyone." },
      { phrase: "Good morning, everyone.", use: "Greeting the audience", register: "Neutral", example: "Good morning, everyone. Thank you for staying for the last session." },
      { phrase: "Let me start with a question.", use: "Opening with engagement rather than data", register: "Neutral", example: "Let me start with a question: how many of your patients go home with a catheter?" },
      { phrase: "Over the next ten minutes, I’ll…", use: "Giving a timed route", register: "Neutral", pronunciation: "Stress “TEN MINutes”.", example: "Over the next ten minutes, I’ll show you what we changed and what we found." },
      { phrase: "So, to recap…", use: "Summarising to recover your place or close a section", register: "Neutral", example: "So, to recap — the intervention was feasible and safe." },
      { phrase: "Let me pick up where I left off.", use: "Returning after an interruption", register: "Neutral", example: "Thank you for that question. Let me pick up where I left off." },
      { phrase: "Let me now turn to…", use: "Moving to the next section", register: "Neutral – formal", example: "Let me now turn to the results." },
      { phrase: "Bear with me while I fix this.", use: "Handling a technical problem calmly", register: "Neutral, British usage", example: "Bear with me while I fix this — in the meantime, let me describe the patients." },
      { phrase: "While that loads, …", use: "Filling time productively during a delay", register: "Informal – neutral", example: "While that loads, let me tell you why we chose this outcome." },
      { phrase: "I’ll come back to that in a moment.", use: "Postponing a point or question you are not ready for", register: "Neutral", example: "That’s a good question — I’ll come back to that in a moment, when I show the subgroup data." },
    ],
    phrase_practice:
      "Write your opening using two or three of these expressions, then write one recap sentence for each section of your talk. Say all of them aloud, standing, at your normal presentation volume.",
    demonstration:
      "The instructor video demonstrates the four-in, six-out breathing pattern, then delivers the orthopaedic opening twice: first rushed and without pauses, then as rehearsed. It ends with a staged “blank” and the three-step recovery.",
    mistakes: [
      { mistake: "Editing slides in the final hour", correction: "Finish the day before; use the final hour for technical checks and your routine." },
      { mistake: "Trying to suppress all signs of nervousness", correction: "Reappraise the sensation as energy and regulate it with slow breathing." },
      { mistake: "Improvising the first sentence", correction: "Script and rehearse the first 30 seconds word for word." },
      { mistake: "Starting to speak while walking to the lectern", correction: "Arrive, arrange your notes, look at the audience, breathe, then begin." },
      { mistake: "Apologising when you lose your place", correction: "Pause, look at your notes, and bridge back with a recap sentence." },
    ],
    reflection: [
      "Which part of the routine feels most natural to you, and which feels awkward?",
      "Where in the coming week can you practise the routine in a low-stakes setting?",
      "What reappraisal statement can you say honestly?",
    ],
    references: [
      "Jamieson, J. P., Nock, M. K., & Mendes, W. B. (2012). Mind over matter: Reappraising arousal improves cardiovascular and cognitive responses to stress. Journal of Experimental Psychology: General, 141(3), 417–422.",
      "Brooks, A. W. (2014). Get excited: Reappraising pre-performance anxiety as excitement. Journal of Experimental Psychology: General, 143(3), 1144–1158.",
      "Zaccaro, A., Piarulli, A., Laurino, M., Garbella, E., Menicucci, D., Neri, B., & Gemignani, A. (2018). How breath-control can change your life: A systematic review on psycho-physiological correlates of slow breathing. Frontiers in Human Neuroscience, 12, 353.",
    ],
  },
  exercise: {
    title: "Write and rehearse your first thirty seconds",
    instructions: "Prepare the opening of a presentation you are likely to give in the coming months.",
    steps: [
      "Write an opening of no more than 70 words using context, purpose and route.",
      "Mark at least two pauses with [pause]. Keep sentences short.",
      "Underline any word that is hard for you to pronounce; if possible, replace it in the opening.",
      "Rehearse it aloud five times, at least twice standing up.",
      "Write one recap sentence you could use if you lost your place after the introduction.",
    ],
    prompt: "Paste your opening (with pauses marked) and your recap sentence.",
    min_chars: 250,
    model_answer:
      "Opening (64 words): “Good morning. Thank you, Chair. [pause] In our emergency department, one in five older patients waits more than four hours for analgesia. [pause] Today I want to show you how a nurse-initiated protocol changed that — and where it did not. [pause] I’ll describe the protocol, our results over twelve months, and what we would do differently.”\n\nRecap sentence: “So, to recap — delays were common, and they were longest at night. Let me now turn to what we changed.”",
    self_check: [
      "The opening is 70 words or fewer.",
      "It states why the topic matters, what you will show, and how the talk is organised.",
      "There are at least two pauses, and no sentence is longer than about 20 words.",
      "The first sentence after the greeting contains no difficult terms or long numbers.",
      "The recap sentence summarises and announces the next section.",
    ],
  },
  quiz: [
    {
      prompt: "What is a realistic goal for nervousness before an important talk?",
      options: ["Eliminate it completely", "Regulate it so that it supports focus", "Ignore it", "Increase it with caffeine"],
      correct: 1,
      explanation: "Arousal is partly automatic. Trying to suppress it increases self-monitoring; regulating it is achievable and useful.",
    },
    {
      prompt: "Which statement best describes reappraisal?",
      options: [
        "Telling yourself to calm down",
        "Reinterpreting the sensation of arousal as energy or preparation",
        "Avoiding situations that cause anxiety",
        "Memorising the whole talk",
      ],
      correct: 1,
      explanation: "Reappraisal changes the interpretation of the sensation, not the sensation itself. Research suggests it can improve stress responses and performance.",
    },
    {
      prompt: "Which breathing pattern is recommended in this lesson?",
      options: ["Exhale for longer than you inhale", "Inhale for longer than you exhale", "Hold your breath for ten seconds", "Breathe as quickly as possible"],
      correct: 0,
      explanation: "Slow breathing with a longer exhale, such as four counts in and six out, is widely used to reduce arousal.",
    },
    {
      scenario: true,
      prompt: "It is 40 minutes before your talk and you notice a typing error on slide 9. What should you do?",
      options: [
        "Rewrite slides 8 to 10 to improve them",
        "Fix the typing error only if it is quick and safe, then stop editing",
        "Ignore the technical check to make time for improvements",
        "Add a new slide explaining the error",
      ],
      correct: 1,
      explanation: "Small, safe corrections are fine. Major edits in the final hour create unrehearsed material and increase load.",
    },
    {
      scenario: true,
      prompt: "After a question from the audience, you cannot remember what comes next in your talk. What is the best first step?",
      options: [
        "Apologise and say you have lost your place",
        "Skip to your conclusion",
        "Pause, breathe, look at your notes, and bridge back with a recap sentence",
        "Read the next slide word for word",
      ],
      correct: 2,
      explanation: "A short pause is not noticed as a problem. A recap sentence helps the audience and brings back your next point.",
    },
    {
      scenario: true,
      prompt: "Which of these is the strongest opening sentence after “Thank you, Chair”?",
      options: [
        "“The primary endpoint was the incidence of catheter-associated urinary tract infection at thirty days in patients over sixty-five.”",
        "“After hip surgery, many of our patients had a urinary catheter for two or three days.”",
        "“Sorry, I am a little nervous today.”",
        "“I will now present my research.”",
      ],
      correct: 1,
      explanation: "It is short, easy to say, and tells the audience why the topic matters. Long technical sentences are hardest to deliver at peak arousal.",
    },
  ],
  assignment: {
    title: "Your pre-speaking routine",
    brief:
      "Write your personal pre-speaking routine (200–350 words) for the day before, one hour before, ten minutes before and one minute before speaking, including your reappraisal statement. Then use it before one low-stakes speaking situation this week and describe briefly what happened and what you would change.",
    min_words: 200,
    required: true,
    criteria: [
      { criterion: "Completeness", description: "All four time points are covered with specific, realistic actions." },
      { criterion: "Personalisation", description: "The routine reflects your own triggers from Lesson 1, not a generic list." },
      { criterion: "Application", description: "It was tried in a real situation, with an honest description of the result." },
      { criterion: "Reflection", description: "At least one concrete adjustment is proposed." },
    ],
  },
  resources: [
    { title: "L02 Lesson handout", description: "Routine checklist, opening template and recovery steps.", file_url: "/materials/lessons/L02-handout.pdf", is_sample: false },
  ],
};
