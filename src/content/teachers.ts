export type AiTeacher = {
  slug: string;
  name: string;
  role: string;
  focus: string;
  approach: string;
  practises: string[];
  modules: number[];
};

/** Public descriptions of the six AI teachers. System prompts live server-side (Milestone 4). */
export const aiTeachers: AiTeacher[] = [
  {
    slug: "speaking-mentor",
    name: "Speaking Mentor",
    role: "Your guide through the programme",
    focus: "Confidence, goal-setting and reflection",
    approach:
      "Calm and Socratic. Asks one question at a time, helps you reflect on each attempt, and connects every exercise to your personal goals.",
    practises: ["Pre-presentation preparation", "Reflection after practice", "Weekly goal review"],
    modules: [1, 11, 12],
  },
  {
    slug: "voice-coach",
    name: "Voice Coach",
    role: "Delivery and vocal presence",
    focus: "Pace, pauses, projection and emphasis",
    approach:
      "Precise and practical. Works from your recordings, isolates one delivery habit at a time and sets short, repeatable drills.",
    practises: ["Pace and pause drills", "Emphasis on key terms", "Reducing filler words"],
    modules: [3, 11],
  },
  {
    slug: "presentation-coach",
    name: "Presentation Coach",
    role: "Structure and message",
    focus: "Core message, structure, openings and slides",
    approach:
      "Editorial and direct. Challenges vague messages, proposes clearer structures and asks you to rebuild sections until they are sharp.",
    practises: ["Core-message reduction", "Opening and closing rewrites", "Slide-to-speech alignment"],
    modules: [4, 5, 6, 7],
  },
  {
    slug: "media-interviewer",
    name: "Media Interviewer",
    role: "Journalist and podcast host",
    focus: "Key messages, sound bites and public communication",
    approach:
      "Professional and probing. Conducts realistic interviews, presses for simple answers and tests whether your key messages survive pressure.",
    practises: ["Live-style interviews", "Bridging technique", "Plain-language explanations"],
    modules: [6, 9],
  },
  {
    slug: "conference-audience",
    name: "Conference Audience",
    role: "Chairs, peers and sceptics",
    focus: "Question-and-answer sessions under realistic pressure",
    approach:
      "A panel of distinct voices — a supportive chair, a methodical reviewer and a sceptical peer — with adjustable difficulty.",
    practises: ["Post-talk Q&A", "Challenging questions", "Time-limited answers"],
    modules: [7, 8, 12],
  },
  {
    slug: "english-speaking-coach",
    name: "English Speaking Coach",
    role: "Professional spoken English",
    focus: "Intelligibility, word stress and natural phrasing",
    approach:
      "Patient and specific. Prioritises what affects understanding, explains each correction and asks you to repeat it in context.",
    practises: ["Medical term stress", "Spoken versus written style", "Signposting phrases"],
    modules: [2, 6, 10],
  },
];
