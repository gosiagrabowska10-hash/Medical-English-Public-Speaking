import type { LessonSpec } from "../lesson-types";

export const L08: LessonSpec = {
  code: "L08",
  week: 3,
  minutes: 60,
  aiTeacher: "voice-coach",
  status: "ready",
  body: {
    intro:
      "Your voice carries your expertise to the back of the room. If listeners cannot hear the end of your sentences, or if every sentence sounds the same, even excellent content becomes hard to follow and easy to forget. Many second-language speakers, concentrating on words and grammar, let their voice fade, flatten or rise in ways they do not intend. This lesson is about using your voice deliberately: projecting it without strain, using intonation to signal certainty, contrast and continuation, and varying pitch, volume and pace so that the audience can hear what matters. Your accent is not the target of this lesson. The aim is a voice that is easy to hear, easy to follow and recognisably yours.",
    objectives: [
      "Project your voice to the back of a room, or into a microphone, without strain",
      "Use falling intonation to make statements and conclusions sound certain, and rising tones deliberately for questions and unfinished lists",
      "Vary pitch, volume and pace to highlight key information and avoid a monotone delivery",
      "Use a two-minute voice warm-up and basic voice-care habits on long speaking days",
    ],
    sections: [
      {
        heading: "Why the voice matters for comprehension and authority",
        paragraphs: [
          "Audiences use the voice for two things at once. They use it to decode the words, which requires that the words are audible and clearly separated. They also use it to interpret meaning: which information is new, which is important, whether the speaker is certain or tentative, and whether a sentence has finished. In English much of this second layer is carried by intonation and stress rather than by vocabulary.",
          "Speaking in a second language makes both layers vulnerable. Attention spent on formulation is attention not spent on breath and volume, so the voice often fades towards the end of a sentence — exactly where English tends to place new information. The intonation patterns of your first language may also carry over into English, sometimes producing a flatter melody or rises where an English-speaking listener expects a fall. None of this is a matter of accent. A speaker with a strong accent and a well-used voice is easier to follow than a speaker with a mild accent and a monotone.",
        ],
        callout: {
          kind: "evidence",
          text: "In a study of oral presentations given in English by second-language speakers, the amount of pitch variation measured in the speakers’ voices was associated with how lively listeners judged the presentations to be.",
          refs: [1],
        },
      },
      {
        heading: "Breath support and projection",
        paragraphs: [
          "Projection is not shouting. A projected voice is supported by breath from the lower ribs and abdomen and directed towards the furthest listener; a shouted voice is pushed from the throat, sounds strained and tires quickly. Stand with your weight even, your shoulders relaxed and your head level. Breathe in low and quietly, so that your lower ribs widen, and let the sound ride on a steady outflow of air.",
          "Aim your voice at the back wall, not at the first row or at your notes. The easiest check is to imagine a colleague sitting in the last row who needs to hear the final word of each sentence. Plan your breathing around your thought groups from Lesson 7: take a breath at every pause, so that you never start an important sentence with an empty chest. A sentence that runs out of air drops in volume at its most important point.",
        ],
        callout: {
          kind: "recommendation",
          text: "Before a talk in an unfamiliar room, ask a colleague to sit in the back row while you say your first two sentences. Adjust until they can hear the last word of each sentence without effort.",
        },
      },
      {
        heading: "Working with a microphone",
        paragraphs: [
          "A microphone solves volume, not clarity. It amplifies whatever reaches it, including mumbling and fading sentence endings, and it punishes inconsistency. With a fixed lectern microphone, keep a constant distance of roughly a hand’s width and remember that turning your head to the screen takes your voice out of range. With a lapel microphone, clip it at the centre of the chest, about a hand’s width below the chin, on the side you are less likely to turn away from. With a handheld microphone, hold it below the mouth at a steady angle rather than waving it while you gesture.",
          "The most common problem at congresses is speaking to the slide. If you need to point at the screen, use a simple sequence: turn to the slide and look, then turn back to the audience before you speak. Your voice stays with the microphone and the audience sees your face when they hear the key point.",
        ],
      },
      {
        heading: "Intonation: falls, rises and what they signal",
        paragraphs: [
          "In standard British English, a falling tone at the end of a statement signals that the statement is complete and that the speaker stands behind it: “Mortality fell by a third.↘” Conclusions, recommendations and key results need a clear fall. A rising tone at the end of a statement can be heard by many listeners as uncertainty or as an invitation to respond. It is not wrong, and in some varieties of English it is common, but in a results presentation it can make firm findings sound tentative.",
          "Rises have important legitimate uses. Yes/no questions often rise: “Did the effect persist?↗” In a list, each item before the last usually rises to show that more is coming, and the last item falls: “We measured mortality,↗ readmissions,↗ and length of stay.↘” A fall–rise on a single word signals a reservation or an unspoken “but”: “The results were encouraging — in the short term.↘↗” Used deliberately, these patterns let you add meaning without adding words.",
        ],
        callout: {
          kind: "recommendation",
          text: "Mark the final word of every key sentence in your script with ↘ and rehearse it with a clear fall. Use ↗ only where you intend a question, an unfinished list or a reservation.",
        },
      },
      {
        heading: "Vocal variety: pitch, volume and pace",
        paragraphs: [
          "Monotone delivery usually has a simple cause: reading. When attention is on the written text, pitch, volume and pace settle into a single level. Variety returns when you speak to people about ideas. Use it purposefully. Lower your pitch slightly and slow down for a key message. Increase energy and pace a little for a story or a familiar step. Drop your volume, not just raise it, to draw attention: a quieter sentence after a louder passage makes a room lean in.",
          "Variety should serve meaning, not decoration. Exaggerated, sing-song intonation sounds artificial and can be as distracting as a monotone. The aim is a range that matches the content: a calm, confident baseline, with clear peaks on the words that carry new or important information. Second-language speakers often find that once their script is marked for stress and falls, variety follows naturally.",
        ],
      },
      {
        heading: "Voice care on long speaking days",
        paragraphs: [
          "Congress days, teaching blocks and on-call shifts place real demands on the voice. Keep water within reach and sip it at section breaks. Avoid repeated throat clearing; a swallow or a sip is gentler. Speak at a comfortable pitch rather than forcing a lower or louder voice than your natural one. Use the microphone when one is offered, even in a mid-sized room.",
          "A short warm-up before speaking prepares the voice in the same way a warm-up prepares any physical skill. It also gives you a structured task in the anxious minutes before a talk, which links it to your routine from Lesson 2. Persistent hoarseness or voice change is a clinical matter that deserves assessment like any other symptom; the techniques in this lesson are educational and do not replace it.",
          "The Academy’s two-minute warm-up has five steps, and none of them needs to be visible to colleagues in a corridor. First, release the shoulders and take three slow, low breaths. Second, hum gently on “mm”, gliding from a low to a comfortable high note and back. Third, do a few lip trills or slides on “ng” to free the voice without strain. Fourth, say two of your own difficult phrases slowly and precisely, such as the title of your talk and a key technical term. Finally, count from one to ten, aiming each number at an imaginary back wall, with a clear fall on “ten”.",
        ],
        callout: {
          kind: "evidence",
          text: "A large survey found that voice disorders were reported considerably more often by teachers than by the general population, which illustrates the load that intensive professional speaking places on the voice.",
          refs: [2],
        },
      },
    ],
    examples: [
      {
        title: "The disappearing last word",
        setting: "International cardiology congress, auditorium for 800",
        text: "A cardiologist presents a trial with a clear message: “Early treatment reduced hospital admissions by a quarter.” In the back rows, colleagues hear “Early treatment reduced hospital admissions by a…”. His voice falls away on the final words, which carry the result. In rehearsal, a colleague in the last row raises a hand every time a sentence ending is lost. He adds a breath before each key sentence, aims at the back wall and gives “by a QUARTER↘” a clear stress and fall. His content and his accent are unchanged; his result now reaches the whole room.",
      },
      {
        title: "Findings that sounded like questions",
        setting: "Research meeting, early-career pathologist presenting a validation study",
        text: "Each of her result statements ends with a rise: “Sensitivity was ninety-two per cent?↗ Specificity was eighty-eight?↗” Her supervisor notes that the audience began to ask whether she trusted her own data. Rehearsing with falling tones — “Sensitivity was ninety-two per cent.↘ Specificity was eighty-eight.↘” — she keeps rises for her list of next steps and for one genuine question to the audience. The same numbers now sound like findings.",
      },
      {
        title: "Turning away from the microphone",
        setting: "Grand round, lecture theatre with a fixed lectern microphone",
        text: "A respiratory physician explains a CT image while looking at the projection screen. Each time he turns, his voice drops out of the microphone range and the recording of the session has gaps exactly where the findings are described. Using the sequence “turn and look, turn back, then speak”, he points to the image in silence, faces the audience and describes the finding. The pauses also give the audience time to look at the image, as recommended in Lesson 7.",
      },
    ],
    phrase_bank: [
      { phrase: "Can you all hear me at the back?", use: "Checking audibility at the start, especially without a microphone", register: "Neutral", pronunciation: "Fall on “BACK↘”; it is a real question but a confident one.", example: "Good morning. Can you all hear me at the back? Thank you." },
      { phrase: "Let me move a little closer to the microphone.", use: "Correcting volume or distance during a talk", register: "Neutral", example: "Let me move a little closer to the microphone — is that better?" },
      { phrase: "The key message is simple:", use: "Signalling a key point before delivering it with a clear fall", register: "Neutral", pronunciation: "Pause after “simple”, then lower the pitch slightly for the message.", example: "The key message is simple: // earlier screening saves time." },
      { phrase: "There are three reasons: first…, second…, and third…", use: "Organising a list so the audience hears where it ends", register: "Neutral", pronunciation: "Rise on each item before the last (↗ ↗), fall on the last (↘).", example: "There are three reasons: cost,↗ access,↗ and staff time.↘" },
      { phrase: "Was this effect real? We think it was.", use: "A rhetorical question followed by a firm answer", register: "Neutral, spoken", pronunciation: "Rise on the question, clear fall on the answer.", example: "Was this effect real?↗ // We think it was.↘ Here is why." },
      { phrase: "The results were encouraging — in the short term.", use: "Signalling a reservation without an extra sentence", register: "Neutral – formal", pronunciation: "Fall–rise on “short TERM” (↘↗).", example: "The results were encouraging — in the short term. Long-term data are still awaited." },
      { phrase: "Let me slow down here, because this matters.", use: "Announcing a deliberate change of pace", register: "Neutral", example: "Let me slow down here, because this matters for every surgical ward." },
      { phrase: "Just to be clear, …", use: "Restating a key point with emphasis", register: "Neutral", example: "Just to be clear, this was not a randomised trial." },
      { phrase: "Excuse me a moment.", use: "Pausing to drink water or clear your voice politely", register: "Neutral, British usage", example: "Excuse me a moment. [sip] So, the second finding…" },
      { phrase: "Now, here’s what happened next.", use: "Lifting energy and pace before a story or turning point", register: "Informal – neutral", pronunciation: "Slightly higher pitch and faster pace than the preceding sentence.", example: "Now, here’s what happened next: the ward ran out of beds." },
    ],
    phrase_practice:
      "Choose the most important minute of your next talk. Mark every sentence ending with ↘ or ↗, insert one list with rise–rise–fall, and one sentence where you deliberately slow down and lower your pitch. Record it from across the room and listen for the last word of each sentence.",
    demonstration:
      "The instructor video shows one key-result sentence delivered three ways — monotone, exaggerated and purposeful — followed by the same passage recorded from the back of a lecture theatre with and without breath support. It ends with a two-minute voice warm-up you can follow.",
    mistakes: [
      { mistake: "Letting the voice fade at the end of sentences", correction: "Breathe at each pause and aim the final word at the back wall." },
      { mistake: "Rising intonation on findings and conclusions", correction: "Use a clear fall (↘) on statements you stand behind; keep rises for questions and unfinished lists." },
      { mistake: "Pushing volume from the throat", correction: "Support the voice with low breathing; project, do not shout." },
      { mistake: "Turning to the screen while speaking into a fixed microphone", correction: "Turn and look in silence, turn back, then speak." },
      { mistake: "Adding ‘variety’ by exaggerating every sentence", correction: "Keep a calm baseline and place peaks only on new or important information." },
      { mistake: "Clearing the throat repeatedly", correction: "Swallow or take a sip of water instead." },
    ],
    reflection: [
      "Where in your talks does your voice tend to fade or flatten?",
      "Which of your key sentences needs a clearer fall?",
      "What would a two-minute warm-up look like on the morning of your next presentation?",
    ],
    references: [
      "Hincks, R. (2005). Measures and perceptions of liveliness in student oral presentation speech: A proposal for an automatic feedback mechanism. System, 33(4), 575–591.",
      "Roy, N., Merrill, R. M., Thibeault, S., Parsa, R. A., Gray, S. D., & Smith, E. M. (2004). Prevalence of voice disorders in teachers and the general population. Journal of Speech, Language, and Hearing Research, 47(2), 281–293.",
    ],
  },
  exercise: {
    title: "One sentence, three deliveries",
    instructions: "Work on projection and intonation using the key-result sentence of a talk you are preparing.",
    steps: [
      "Choose the sentence that carries your main result or recommendation.",
      "Mark the stressed word and the final tone (↘ or ↗) on your script.",
      "Record the sentence three times: monotone, exaggerated, and purposeful (calm baseline, clear stress, falling end).",
      "Place your phone or laptop at the far side of the room and record the purposeful version again with breath support.",
      "Listen to all four recordings and note what changed between them.",
    ],
    prompt: "Write your marked sentence and describe what you heard in the four recordings (at least 250 characters).",
    min_chars: 250,
    model_answer:
      "Marked sentence: “In our unit, // nurse-led triage cut the time to ANALGESIA ↘ // by almost an HOUR.↘”\n\nMonotone: every word at the same level; “hour” was almost inaudible. Exaggerated: sounded like a sales presentation; my colleague laughed. Purposeful: “analgesia” and “hour” stood out and the sentence sounded finished. From across the room without breath support, the last two words disappeared; with a breath before the sentence and aiming at the wall, “by almost an hour” was clear. I also noticed that I raised my pitch on “hour” in the first attempt, which made the result sound like a question.",
    self_check: [
      "One main stressed word per thought group is marked.",
      "The final word of the key sentence has a clear fall in the purposeful version.",
      "The far-side recording is audible to the last word.",
      "Your description refers to what you actually heard, not to what you intended.",
    ],
  },
  quiz: [
    {
      prompt: "Which statement about projection is correct?",
      options: [
        "Projection means speaking as loudly as possible",
        "Projection relies on breath support and direction, not throat effort",
        "Projection is unnecessary when a microphone is available",
        "Projection requires lowering your natural pitch",
      ],
      correct: 1,
      explanation: "A projected voice is supported by breath and aimed at the furthest listener. Pushing from the throat causes strain.",
    },
    {
      prompt: "In standard British English, what does a clear fall at the end of a statement usually signal?",
      options: ["Uncertainty", "That the speaker expects an answer", "That the statement is complete and the speaker stands behind it", "That more items will follow"],
      correct: 2,
      explanation: "Falling tones mark completion and certainty, which is why conclusions and key results benefit from a clear fall.",
    },
    {
      scenario: true,
      prompt: "You present three outcomes: mortality, readmissions and length of stay. Which intonation helps the audience hear where the list ends?",
      options: ["Fall on every item", "Rise on every item", "Rise on the first two items and fall on the last", "Monotone throughout to sound neutral"],
      correct: 2,
      explanation: "Rises on non-final items signal that more is coming; the fall on the last item signals the end of the list.",
    },
    {
      scenario: true,
      prompt: "During a grand round with a fixed lectern microphone you need to show a detail on the CT image. What is the best approach?",
      options: [
        "Describe the image while facing the screen",
        "Turn and look at the image in silence, turn back to the audience, then speak",
        "Remove the microphone and walk to the screen",
        "Ask the audience to read the slide themselves",
      ],
      correct: 1,
      explanation: "Speaking only when facing the audience keeps your voice in range of the microphone and gives listeners time to look at the image.",
    },
    {
      scenario: true,
      prompt: "A colleague says your talk sounded “flat”. Your accent is strong. What is the most useful first step?",
      options: [
        "Try to reduce your accent",
        "Mark stress and final tones on your key sentences and rehearse speaking to people rather than reading",
        "Speak much faster to sound more energetic",
        "Add a dramatic rise to every sentence",
      ],
      correct: 1,
      explanation: "Flat delivery usually comes from reading and unmarked stress and intonation, not from accent. Purposeful variation restores interest.",
    },
    {
      prompt: "Which habit protects the voice on a long congress day?",
      options: ["Clearing the throat before each talk", "Forcing a deeper voice for authority", "Sipping water at breaks and using the microphone when offered", "Avoiding any warm-up"],
      correct: 2,
      explanation: "Hydration, a comfortable pitch, avoiding throat clearing and using amplification reduce vocal load.",
    },
  ],
  assignment: {
    title: "Voice plan for your next talk",
    brief:
      "Prepare the opening and the key-result section of a talk you will give (no more than 150 words of script), marked with thought groups, stressed words and final tones. Record it from across a room. Then write a voice plan of 200–350 words: what your recording showed about audibility and intonation, the three changes you made, the warm-up you will use on the day, and how you will check audibility in the venue. Do not include patient-identifiable information.",
    min_words: 200,
    required: true,
    criteria: [
      { criterion: "Audibility", description: "The recording and plan show that sentence endings and key words reach the furthest listener." },
      { criterion: "Intonation for meaning", description: "Falls, rises and lists are marked where they carry meaning, not decoratively." },
      { criterion: "Purposeful variety", description: "Changes in pace, pitch or volume are tied to specific moments in the content." },
      { criterion: "Practicality", description: "The warm-up and venue check are specific and realistic for the event." },
    ],
  },
  resources: [
    { title: "L08 Lesson handout", description: "Projection checklist, intonation marking key, microphone guide, two-minute warm-up and phrase bank.", file_url: "/materials/lessons/L08-handout.pdf", is_sample: false },
  ],
};
