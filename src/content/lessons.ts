/**
 * Lesson-level course data: schedule, durations and authored content.
 * This file is the source for the database seed (scripts/generate-content-sql.ts).
 * After seeding, the database is the source of truth and content staff edit it there.
 *
 * content_status: "ready" = authored and reviewable, "sample" = demonstration content,
 * "in_preparation" = outline only (cannot be completed by students yet).
 */

export type Quiz = { prompt: string; options: string[]; correct: number; explanation: string }[];
export type LessonBody = {
  intro: string;
  objectives: string[];
  sections: { heading: string; paragraphs: string[] }[];
  examples: { title: string; text: string }[];
  demonstration: string;
  mistakes: string[];
  reflection: string[];
};
export type LessonSpec = {
  code: string;
  week: number;
  minutes: number;
  preview?: boolean;
  aiTeacher: string;
  video?: { status: "sample"; url: string; captions: string; note: string };
  status: "ready" | "sample" | "in_preparation";
  body?: LessonBody;
  exercise?: { title: string; instructions: string; prompt: string; min_chars: number };
  quiz?: Quiz;
  assignment?: { title: string; brief: string; min_words: number; required: boolean };
  resources?: { title: string; description: string; file_url: string; is_sample: boolean }[];
};

const L01: LessonSpec = {
  code: "L01", week: 1, minutes: 55, preview: true, aiTeacher: "speaking-mentor", status: "ready",
  body: {
    intro:
      "Many doctors who read, write and think in English every day still feel less competent when they have to speak it in front of an audience. This lesson explains why that happens, what international audiences actually notice, and why your credibility rests far more on clarity and structure than on a native accent.",
    objectives: [
      "Explain why speaking in a second language increases self-monitoring and anxiety",
      "Distinguish between what speakers worry about and what audiences actually evaluate",
      "Identify your own most common speaking triggers",
    ],
    sections: [
      {
        heading: "The double task of second-language speaking",
        paragraphs: [
          "When you present in your first language, most of your attention goes to the audience and the message. In a second language, part of that attention is diverted to monitoring grammar, vocabulary and pronunciation in real time. Researchers often describe this as an increased cognitive load: the same talk simply costs more mental effort.",
          "The consequence is predictable. Under pressure, the extra monitoring competes with memory and fluency, so speakers lose words they know perfectly well, speed up to finish sentences before they lose them, or retreat to reading their slides. None of this reflects a lack of knowledge; it reflects divided attention.",
        ],
      },
      {
        heading: "What audiences actually notice",
        paragraphs: [
          "Speakers tend to overestimate how much listeners notice small grammatical errors or an accent. International medical audiences are used to hearing English spoken with many accents, and a large proportion of them are non-native speakers themselves.",
          "What audiences do notice is whether they can follow you: a clear purpose, a logical structure, key terms they can recognise, and a pace that gives them time to think. A speaker with an accent and a clear structure is consistently easier to follow than a fluent speaker without one.",
        ],
      },
      {
        heading: "Separating language accuracy from professional credibility",
        paragraphs: [
          "Your credibility on stage comes from your expertise, your preparation and the clarity of your message. Language accuracy supports that credibility, but it is not the same thing. Treating every small error as a threat to your authority increases anxiety and makes errors more likely.",
          "Throughout this program you will work on the language features that genuinely affect understanding, and deliberately let go of those that do not. That shift alone often reduces anxiety noticeably.",
        ],
      },
    ],
    examples: [
      {
        title: "Two openings, same content",
        text: "Speaker A apologises for her English, then reads a dense first slide quickly. Speaker B, with a stronger accent, pauses, says “Today I want to show you one finding that changed how we treat post-operative delirium,” and waits a moment. Audiences consistently rate Speaker B as more confident and more expert.",
      },
      {
        title: "The apology trap",
        text: "“Sorry for my English” invites the audience to listen for mistakes. Replace it with a clear statement of purpose. If language is genuinely a concern, a single sentence such as “Please stop me if anything is unclear” is more confident and more useful.",
      },
    ],
    demonstration:
      "Watch for three things in the lesson video: where the speaker pauses, how the first sentence states a purpose rather than an apology, and how a key term is repeated slowly the first time it appears.",
    mistakes: [
      "Apologising for your English at the start of a talk",
      "Writing a word-for-word script and reading it under pressure",
      "Correcting small grammar slips aloud, which draws attention to them",
      "Speeding up to reach the end of a sentence before losing the words",
    ],
    reflection: [
      "In which speaking situations do you notice the strongest self-monitoring?",
      "Which of your worries is about language accuracy, and which is about being understood?",
    ],
  },
  exercise: {
    title: "Map your speaking triggers",
    instructions:
      "Think about the last two occasions on which you spoke in English to a professional audience. Describe the situation, the moment you felt most uncomfortable, and what you noticed in your body and your speech.",
    prompt: "Describe both situations and what happened (at least 150 characters).",
    min_chars: 150,
  },
  quiz: [
    {
      prompt: "Why do many speakers find presenting in a second language more tiring?",
      options: ["Because their medical knowledge is weaker in English", "Because attention is divided between the message and monitoring the language", "Because international audiences are more critical", "Because slides are harder to design in English"],
      correct: 1,
      explanation: "Second-language speaking adds real-time language monitoring to the task, which increases cognitive load. It is not a sign of weaker knowledge.",
    },
    {
      prompt: "What do international audiences rely on most to follow a talk?",
      options: ["A native-like accent", "Perfect grammar", "A clear purpose, structure and manageable pace", "A large number of slides"],
      correct: 2,
      explanation: "Audiences need to understand where the talk is going and have time to process it. Clarity and structure matter more than accent.",
    },
    {
      prompt: "Which opening is most likely to build credibility?",
      options: ["“Sorry for my English, I will try my best.”", "Reading the title slide aloud quickly", "“Today I want to show you one finding that changed our practice.”", "Starting with the methods section"],
      correct: 2,
      explanation: "A clear statement of purpose signals confidence and gives the audience a reason to listen.",
    },
    {
      prompt: "When you make a small grammatical slip during a talk, the best response is usually to:",
      options: ["Stop and correct it explicitly", "Continue with your message", "Apologise to the audience", "Repeat the whole sentence"],
      correct: 1,
      explanation: "Small slips rarely affect understanding. Correcting them aloud draws attention to them and interrupts your flow.",
    },
  ],
  assignment: {
    title: "Your speaking profile",
    brief:
      "Write a short speaking profile (150–300 words): your current professional speaking situations, what you would like to do differently in ten weeks, and one specific talk you would like to give with confidence. You will revisit this profile in Module 12.",
    min_words: 150,
    required: true,
  },
  resources: [
    { title: "Speaking Profile Worksheet", description: "A one-page worksheet to prepare your Module 1 assignment.", file_url: "/materials/sample/speaking-profile-worksheet.pdf", is_sample: true },
  ],
};

const L02: LessonSpec = {
  code: "L02", week: 1, minutes: 60, aiTeacher: "speaking-mentor", status: "ready",
  body: {
    intro:
      "Nervous energy is not the enemy. The same physiological arousal that feels like anxiety can support focus and presence if you prepare for it. This lesson gives you a practical routine for the hour, the minutes and the first thirty seconds before you speak.",
    objectives: [
      "Recognise the physical signs of performance arousal",
      "Use a breathing and grounding routine before speaking",
      "Prepare and rehearse your first thirty seconds so that they run on their own",
    ],
    sections: [
      {
        heading: "Arousal is energy",
        paragraphs: [
          "A faster heartbeat, dry mouth and restless hands are signs that your body is preparing to perform. Trying to eliminate them completely rarely works and often increases the anxiety. A more useful goal is to bring arousal into a range where it sharpens rather than scatters your attention.",
          "Many speakers find it helpful to label the sensation differently: not “I am nervous” but “my body is getting ready”. The sensation is the same; the interpretation changes how you respond to it.",
        ],
      },
      {
        heading: "A pre-speaking routine",
        paragraphs: [
          "One hour before: check the room and the technology, then stop editing slides. Ten minutes before: slow breathing with a longer exhale than inhale, for example inhaling for four counts and exhaling for six, repeated for two minutes. One minute before: stand or sit with both feet on the floor, feel the contact, and silently rehearse your first sentence.",
          "A routine works because it is familiar. Practise it before low-stakes situations, such as a ward meeting, so that it is automatic when the stakes are high.",
        ],
      },
      {
        heading: "The first thirty seconds",
        paragraphs: [
          "The opening is where anxiety peaks and where second-language speakers most often rush. Prepare it word for word, rehearse it aloud until it feels natural, and include a deliberate pause after your first sentence.",
          "Once the first thirty seconds are behind you, most speakers find their rhythm. You are not memorising the whole talk; you are building a reliable on-ramp into it.",
        ],
      },
    ],
    examples: [
      { title: "A rehearsed opening", text: "“Good morning. [pause] In the next ten minutes I want to show you why we stopped routine catheterisation after hip surgery — and what happened to our infection rates. [pause]”" },
      { title: "A grounding cue", text: "One cardiologist places her notes on the lectern, presses both palms flat on it for two seconds, then looks up and begins. The gesture is invisible to the audience but tells her body that it is time to start." },
    ],
    demonstration: "The video demonstrates the four-six breathing pattern and a full rehearsed opening, delivered first too quickly and then with deliberate pauses.",
    mistakes: [
      "Editing slides in the final minutes before speaking",
      "Trying to suppress all signs of nervousness",
      "Improvising the opening sentence",
      "Starting to speak before reaching the lectern or before the room is ready",
    ],
    reflection: [
      "Which part of the routine feels most natural to you, and which feels awkward?",
      "Where in your next week could you practise the routine in a low-stakes setting?",
    ],
  },
  exercise: {
    title: "Write and rehearse your first thirty seconds",
    instructions: "Choose a presentation you are likely to give in the coming months. Write its opening (no more than 70 words), mark where you will pause, then rehearse it aloud five times.",
    prompt: "Paste your opening with pauses marked as [pause].",
    min_chars: 120,
  },
  quiz: [
    { prompt: "What is a realistic goal for pre-speaking arousal?", options: ["Eliminate it completely", "Bring it into a range that sharpens focus", "Ignore it", "Increase it with caffeine"], correct: 1, explanation: "Some arousal supports performance; the aim is to regulate it, not remove it." },
    { prompt: "Which breathing pattern is recommended in this lesson?", options: ["Exhale longer than you inhale", "Inhale longer than you exhale", "Hold your breath for ten seconds", "Breathe as fast as possible"], correct: 0, explanation: "A longer exhale, such as four counts in and six counts out, supports a calmer state." },
    { prompt: "Why should the opening be rehearsed word for word?", options: ["So the whole talk can be read", "Because anxiety peaks at the start and a reliable opening carries you into the talk", "To avoid eye contact", "Because audiences remember only the opening"], correct: 1, explanation: "A rehearsed opening reduces load at the moment of highest anxiety." },
  ],
  assignment: {
    title: "Pre-speaking routine plan",
    brief: "Describe your personal pre-speaking routine for one hour, ten minutes and one minute before speaking (100–250 words), and name the low-stakes situation in which you will practise it this week.",
    min_words: 100,
    required: true,
  },
};

const L03: LessonSpec = {
  code: "L03", week: 1, minutes: 50, aiTeacher: "speaking-mentor", status: "ready",
  body: {
    intro:
      "Confident speakers rarely try to sound like someone else. They have a clear sense of the kind of speaker they are and want to become. This lesson helps you define your speaker identity and set specific goals for the ten weeks ahead.",
    objectives: [
      "Describe the strengths you already bring as a medical speaker",
      "Define the professional voice you want to be known for",
      "Set three measurable speaking goals for the program",
    ],
    sections: [
      {
        heading: "Strengths you already have",
        paragraphs: [
          "Medical professionals bring real advantages to the podium: deep subject knowledge, experience explaining difficult information to patients, and the habit of structured reasoning. These are the foundation of authority.",
          "Start by naming them. When you know what you already do well, it is easier to build on it rather than focusing only on what you lack.",
        ],
      },
      {
        heading: "Defining your professional voice",
        paragraphs: [
          "Think of two or three words you would like an audience to use about you after a talk — for example “clear”, “practical” and “warm”. These words become a compass for decisions about structure, language and delivery.",
          "Your voice should be authentic. A calm, precise speaker does not need to become theatrical to be effective.",
        ],
      },
      {
        heading: "Goals that can be measured",
        paragraphs: [
          "Vague goals such as “be more confident” are hard to act on. Useful goals describe behaviour you can observe or measure: speaking at a comfortable pace, pausing before key results, or answering three audience questions without notes.",
          "The Speaking Studio will help you measure some of these, such as pace and filler words. Others will be assessed by you and your instructors.",
        ],
      },
    ],
    examples: [
      { title: "From vague to measurable", text: "“I want to sound more confident” becomes “In my next case presentation I will pause after stating the diagnosis and keep my pace below 160 words per minute.”" },
      { title: "Three words", text: "A neurologist chooses “clear, calm, curious”. She decides to open each talk with a question and to slow down whenever she presents data." },
    ],
    demonstration: "The video shows two short self-introductions by the same speaker: one generic, one built around three chosen words.",
    mistakes: [
      "Copying the style of a speaker whose personality is very different from yours",
      "Setting goals that cannot be observed",
      "Setting too many goals at once",
    ],
    reflection: [
      "Which three words would you like an audience to use about you?",
      "Which goal would make the biggest difference to your work in the next year?",
    ],
  },
  exercise: {
    title: "Three words and three goals",
    instructions: "Choose the three words that describe the speaker you want to be, and write three specific, observable goals for the next ten weeks.",
    prompt: "Your three words and three goals.",
    min_chars: 120,
  },
  quiz: [
    { prompt: "Which of these is a measurable speaking goal?", options: ["Be more confident", "Sound more professional", "Pause after stating each key result", "Improve my English"], correct: 2, explanation: "A measurable goal describes behaviour that can be observed or measured." },
    { prompt: "What is the purpose of choosing three words for your professional voice?", options: ["To memorise them for the talk", "To guide decisions about structure, language and delivery", "To put them on your title slide", "To impress the audience"], correct: 1, explanation: "The words act as a compass for consistent choices." },
    { prompt: "Which statement best reflects authentic speaking?", options: ["Imitate the most famous speaker you know", "Build on your existing strengths and personality", "Always be theatrical", "Avoid showing any personality"], correct: 1, explanation: "Effective speakers develop their own voice rather than copying someone else’s." },
  ],
  assignment: {
    title: "Ten-week development goals",
    brief: "Write your three goals for the program (100–250 words). For each, explain why it matters in your professional context and how you will know you have achieved it.",
    min_words: 100,
    required: true,
  },
};

const L07: LessonSpec = {
  code: "L07", week: 2, minutes: 60, aiTeacher: "voice-coach", status: "ready",
  video: {
    status: "sample",
    url: "/media/sample/l07-sample.mp4",
    captions: "/media/sample/l07-sample.vtt",
    note: "Sample video for demonstrating the player. The instructor recording for this lesson has not been produced yet.",
  },
  body: {
    intro:
      "When speaking under pressure, most presenters speed up. In a second language the effect is stronger: we hurry to reach the end of a sentence before we lose the words. The audience pays the price, because they need time to process technical content. This lesson teaches you to control pace, use pauses deliberately and place emphasis where meaning lives.",
    objectives: [
      "Measure your natural speaking pace",
      "Place deliberate pauses before and after key messages",
      "Use emphasis to signal what matters",
    ],
    sections: [
      {
        heading: "Why pace matters for international audiences",
        paragraphs: [
          "Listeners process spoken technical information more slowly than written information, and non-native listeners need a little more time again. A pace that feels natural to you in conversation can be too fast for a lecture hall.",
          "As a practical reference, many speakers find that around 130 to 160 words per minute works well for international medical audiences. Treat this as a guide, not a rule: dense data needs a slower pace than a story.",
        ],
      },
      {
        heading: "The deliberate pause",
        paragraphs: [
          "A pause is not an absence of speech. It is where your audience understands you. Pause before a key result to create attention, and after it to give the audience time to absorb it.",
          "Pauses also give you thinking time. Many fillers — “um”, “uh”, “so” — are simply pauses that have been filled with sound. Allowing a silent pause instead removes the filler and sounds more authoritative.",
        ],
      },
      {
        heading: "Emphasis",
        paragraphs: [
          "In English, emphasis is carried by stress: the important word in a sentence is slightly louder, longer and higher. “Mortality fell by a THIRD” tells the audience exactly what to remember.",
          "Mark your key words in your notes and rehearse them aloud. Too much emphasis is as unhelpful as none; aim for one stressed idea per sentence.",
        ],
      },
    ],
    examples: [
      { title: "Before and after", text: "Before: “So um we found that the readmission rate was lower in the intervention group which was quite interesting.” After: “We found that readmissions were lower. [pause] By a THIRD. [pause]”" },
      { title: "Pausing around data", text: "When showing a graph, say what the audience should look at, pause while they look, then state the conclusion." },
    ],
    demonstration: "The sample video shows how captions and playback speed work in the lesson player. The instructor recording will demonstrate the same talk delivered at three different speeds.",
    mistakes: [
      "Speeding up when time is short instead of cutting content",
      "Filling every silence with “um” or “so”",
      "Stressing every word, so that nothing stands out",
      "Pausing in the middle of a technical term",
    ],
    reflection: [
      "Where in your talks do you tend to speed up?",
      "Which sentence in your next presentation most deserves a pause before it?",
    ],
  },
  exercise: {
    title: "Mark your pauses",
    instructions: "Take the opening you wrote in Lesson 2 (or any 60–100 word passage from a talk). Mark at least three pauses with [pause] and capitalise the one word per sentence that carries the main stress. Then read it aloud twice: once naturally, once following your marks.",
    prompt: "Paste your marked passage and note one difference you heard between the two readings.",
    min_chars: 150,
  },
  quiz: [
    { prompt: "Where is a pause most effective?", options: ["Before and after a key result", "In the middle of a technical term", "Only at the end of the talk", "After every word"], correct: 0, explanation: "Pausing around key results creates attention and gives the audience time to absorb them." },
    { prompt: "What should you do when you are short of time?", options: ["Speak faster", "Skip the conclusion", "Remove content", "Remove all pauses"], correct: 2, explanation: "Cutting content protects comprehension. Speaking faster sacrifices it." },
    { prompt: "Many filler words are best understood as:", options: ["Grammar mistakes", "Pauses filled with sound", "Signs of poor knowledge", "Useful signposts"], correct: 1, explanation: "Replacing fillers with silent pauses sounds more authoritative." },
    { prompt: "How many stressed ideas should a sentence usually carry?", options: ["None", "One", "Every noun", "As many as possible"], correct: 1, explanation: "One clear point of emphasis per sentence tells the audience what matters." },
  ],
  assignment: {
    title: "Pace reflection",
    brief: "After practising your marked passage, write a short reflection (80–200 words): what changed when you used deliberate pauses, and where you will use them in your next presentation. In Stage 4 you will be able to record this passage in the Speaking Studio.",
    min_words: 80,
    required: true,
  },
  resources: [
    { title: "Pace and Pause Worksheet", description: "Mark pauses and stress in your own passage.", file_url: "/materials/sample/pace-and-pause-worksheet.pdf", is_sample: true },
  ],
};

/** Schedule for every lesson and workshop (36 items). */
const schedule: { code: string; week: number; minutes: number; aiTeacher: string }[] = [
  { code: "L04", week: 1, minutes: 60, aiTeacher: "english-speaking-coach" },
  { code: "L05", week: 2, minutes: 65, aiTeacher: "english-speaking-coach" },
  { code: "L06", week: 2, minutes: 60, aiTeacher: "english-speaking-coach" },
  { code: "L08", week: 3, minutes: 60, aiTeacher: "voice-coach" },
  { code: "L09", week: 3, minutes: 55, aiTeacher: "voice-coach" },
  { code: "W1", week: 3, minutes: 120, aiTeacher: "voice-coach" },
  { code: "L10", week: 4, minutes: 60, aiTeacher: "presentation-coach" },
  { code: "L11", week: 4, minutes: 60, aiTeacher: "presentation-coach" },
  { code: "L12", week: 4, minutes: 55, aiTeacher: "presentation-coach" },
  { code: "W2", week: 4, minutes: 120, aiTeacher: "presentation-coach" },
  { code: "L13", week: 5, minutes: 55, aiTeacher: "presentation-coach" },
  { code: "L14", week: 5, minutes: 60, aiTeacher: "presentation-coach" },
  { code: "L15", week: 5, minutes: 55, aiTeacher: "media-interviewer" },
  { code: "L16", week: 5, minutes: 65, aiTeacher: "presentation-coach" },
  { code: "L17", week: 6, minutes: 65, aiTeacher: "presentation-coach" },
  { code: "L18", week: 6, minutes: 55, aiTeacher: "presentation-coach" },
  { code: "L19", week: 6, minutes: 55, aiTeacher: "conference-audience" },
  { code: "W3", week: 6, minutes: 120, aiTeacher: "conference-audience" },
  { code: "L20", week: 7, minutes: 60, aiTeacher: "conference-audience" },
  { code: "L21", week: 7, minutes: 60, aiTeacher: "conference-audience" },
  { code: "L22", week: 7, minutes: 55, aiTeacher: "conference-audience" },
  { code: "W4", week: 7, minutes: 120, aiTeacher: "conference-audience" },
  { code: "L23", week: 8, minutes: 60, aiTeacher: "media-interviewer" },
  { code: "L24", week: 8, minutes: 60, aiTeacher: "media-interviewer" },
  { code: "W5", week: 8, minutes: 120, aiTeacher: "media-interviewer" },
  { code: "L25", week: 8, minutes: 55, aiTeacher: "english-speaking-coach" },
  { code: "L26", week: 9, minutes: 60, aiTeacher: "speaking-mentor" },
  { code: "L27", week: 9, minutes: 55, aiTeacher: "voice-coach" },
  { code: "L28", week: 9, minutes: 60, aiTeacher: "speaking-mentor" },
  { code: "W6", week: 9, minutes: 150, aiTeacher: "speaking-mentor" },
  { code: "L29", week: 10, minutes: 60, aiTeacher: "speaking-mentor" },
  { code: "L30", week: 10, minutes: 65, aiTeacher: "conference-audience" },
];

export const lessonSpecs: LessonSpec[] = [
  L01, L02, L03, L07,
  ...schedule.map((s) => ({ ...s, status: "in_preparation" as const })),
];

export const totalMinutes = lessonSpecs.reduce((n, l) => n + l.minutes, 0);
