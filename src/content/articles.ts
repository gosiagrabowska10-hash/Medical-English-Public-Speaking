export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string; // ISO date
  readingMinutes: number;
  author: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "how-to-present-research-at-an-international-medical-conference",
    title: "How to Present Your Research at an International Medical Conference",
    description:
      "A practical structure for the ten-minute research talk, written for medical professionals who present in English as a second language.",
    category: "Conference Presentations",
    published: "2026-11-20",
    readingMinutes: 7,
    author: "The Academy Editorial Team",
    body: [
      { type: "p", text: "Most conference presentations are not remembered for their slides. They are remembered — or forgotten — because of how clearly the speaker made one point. If you are presenting your research in English as a second language, clarity matters even more: your audience is international, many of them are also non-native speakers, and they are listening to dozens of talks in a single day." },
      { type: "p", text: "This article sets out a practical structure for the typical eight-to-twelve-minute research presentation, and the speaking habits that make it easy to follow." },
      { type: "h2", text: "Start with one sentence" },
      { type: "p", text: "Before you open your slide software, write the single sentence you want the audience to remember. Not the title of your study — the finding and why it matters. For example: “In our cohort, early mobilisation after hip surgery reduced length of stay without increasing complications.”" },
      { type: "p", text: "Everything else in the talk exists to support, explain or qualify that sentence. If a slide does not contribute to it, it is a candidate for removal. This is the hardest step, and the most valuable one." },
      { type: "h2", text: "A structure listeners can follow" },
      { type: "ul", items: [
        "Relevance (about one minute): why this question matters to this audience.",
        "Question and approach (one to two minutes): what you asked and how you studied it — only the methods needed to trust the result.",
        "Findings (three to four minutes): the key results, one idea per slide, with the main number stated aloud.",
        "Meaning and limitations (two minutes): what the results mean, and honestly, what they do not show.",
        "Take-home message (thirty seconds): your one sentence, repeated.",
      ] },
      { type: "p", text: "Repeating your core message at the end is not redundancy. In spoken communication, repetition is how listeners know what was important." },
      { type: "h2", text: "Write for the ear, not the page" },
      { type: "p", text: "Academic writing and spoken English work differently. Written sentences tend to be long and dense; spoken sentences should be short, with the important information at the end. Compare “A statistically significant reduction in thirty-day readmission rates was observed in the intervention group” with “In the intervention group, fewer patients were readmitted within thirty days. The difference was statistically significant.”" },
      { type: "p", text: "The second version is easier to say, easier to understand and easier to emphasise." },
      { type: "h2", text: "Signpost generously" },
      { type: "p", text: "Signposts are short phrases that tell the audience where they are: “There are three findings I want to highlight.” “The second finding is more surprising.” “So what does this mean for practice?” They cost a few seconds and dramatically reduce the effort required to follow you." },
      { type: "h2", text: "Slow down, and pause on purpose" },
      { type: "p", text: "Under time pressure, and especially in a second language, most speakers accelerate. A deliberate pause before and after your key result gives the audience time to process it and signals that it matters. If you are short of time, remove content — do not speak faster." },
      { type: "h2", text: "Rehearse aloud, with a timer" },
      { type: "p", text: "Silent rehearsal is not rehearsal. Practise the talk aloud at least three times, recording at least one attempt. Listen for where you rush, where you hesitate, and which technical terms are difficult to pronounce — then practise those sentences specifically." },
      { type: "quote", text: "If you are short of time, remove content — do not speak faster." },
      { type: "p", text: "Presenting at an international conference is a skill that improves with structured practice. The most effective speakers are rarely those with perfect English; they are those who have prepared one clear message and rehearsed delivering it." },
    ],
  },
  {
    slug: "intelligibility-not-accent-english-for-medical-speakers",
    title: "Intelligibility, Not Accent: What Really Matters When Doctors Speak English",
    description:
      "Why international audiences care far more about clarity than accent — and the specific pronunciation features that make the biggest difference.",
    category: "English Communication",
    published: "2026-11-13",
    readingMinutes: 6,
    author: "The Academy Editorial Team",
    body: [
      { type: "p", text: "Many medical professionals who speak English as a second language worry about their accent. It is one of the most common concerns we hear. Yet when audiences struggle to follow a talk, accent is rarely the main reason." },
      { type: "p", text: "The more useful goal is intelligibility: being understood easily by the people actually listening to you. At international medical meetings, a large share of those listeners are themselves non-native speakers of English. A “perfect” native accent is neither necessary nor, for many audiences, especially helpful." },
      { type: "h2", text: "What helps listeners most" },
      { type: "ul", items: [
        "Word stress: placing emphasis on the correct syllable, especially in medical terms (car-DI-o-my-op-a-thy).",
        "Sentence stress: emphasising the words that carry meaning, so listeners can hear what is important.",
        "Chunking and pauses: grouping words into meaningful units with brief pauses between them.",
        "Pace: speaking at a speed that gives listeners time to process technical content.",
        "Clear final consonants where they change meaning, such as in plurals and past tenses.",
      ] },
      { type: "h2", text: "Why word stress matters so much in medicine" },
      { type: "p", text: "Medical vocabulary is full of long, multi-syllable words that look similar across languages but are stressed differently in English. A listener who hears stress in an unexpected place may need a moment to recognise even a familiar word. Over a ten-minute talk, those moments add up to fatigue." },
      { type: "p", text: "A practical exercise: list the twenty technical terms you use most often in presentations. Check their stress pattern in a reputable dictionary, mark the stressed syllable, and practise saying each term inside a full sentence, not in isolation." },
      { type: "h2", text: "Sound like a speaker, not a reader" },
      { type: "p", text: "Speakers who read from a script or from dense slides tend to speak in a flat rhythm, because written sentences are not designed to be spoken. Preparing key phrases rather than full sentences, and speaking to the audience rather than to the slide, often improves intelligibility more than any pronunciation drill." },
      { type: "quote", text: "The goal is not to sound like someone else. It is to be understood clearly as yourself." },
      { type: "h2", text: "A realistic standard" },
      { type: "p", text: "Your accent is part of your professional identity, and it tells the audience something about the international nature of medicine. Focus on the features that affect understanding, practise them deliberately, and let the rest go. Clarity, structure and confidence will do more for your credibility than any attempt to sound like someone you are not." },
    ],
  },
];

/** Editorial plan — forthcoming topics (not yet written). See docs/EDITORIAL_PLAN.md */
export const forthcoming = [
  { category: "Speaking Confidence", title: "Managing Presentation Anxiety in a Second Language" },
  { category: "Medical Storytelling", title: "Ethical Case Narratives: Telling Patient Stories Without Patient Data" },
  { category: "Media Communication", title: "Preparing for Your First Media Interview as a Doctor" },
  { category: "Presentation Techniques", title: "One Idea per Slide: Designing Slides That Support Your Voice" },
  { category: "Conference Presentations", title: "Answering Difficult Questions After Your Talk" },
  { category: "English Communication", title: "Signposting Phrases Every Medical Presenter Should Know" },
];
