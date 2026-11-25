/**
 * Curriculum outline for the Medical Public Speaking Professional Programme.
 * This is the public syllabus (titles, summaries, outcomes). Full lesson
 * content (objectives, explanation, examples, exercises, quizzes, assignments)
 * is authored in Milestone 3 and must be approved by the Academic Director.
 */

export type Lesson = { code: string; title: string; summary: string };
export type Workshop = { code: string; title: string; summary: string; format: string };
export type Module = {
  number: number;
  slug: string;
  title: string;
  weeks: string;
  summary: string;
  outcomes: string[];
  lessons: Lesson[];
  workshop?: Workshop;
};

export const modules: Module[] = [
  {
    number: 1,
    slug: "confidence-and-speaking-psychology",
    title: "Confidence and Speaking Psychology",
    weeks: "Week 1",
    summary:
      "Understand where speaking anxiety comes from, why it is amplified when presenting in a second language, and how to turn nervous energy into focused presence.",
    outcomes: [
      "Recognise your personal anxiety triggers and physical stress responses",
      "Apply evidence-informed breathing and preparation routines before speaking",
      "Separate language accuracy from professional credibility",
    ],
    lessons: [
      { code: "L01", title: "The Psychology of Speaking in a Second Language", summary: "Why fluent clinicians feel less competent in English, and how audiences actually judge non-native speakers." },
      { code: "L02", title: "From Nervous Energy to Focused Presence", summary: "Practical pre-performance routines: breathing, grounding, and the first thirty seconds." },
      { code: "L03", title: "Building a Speaker Identity", summary: "Defining the professional voice you want to be known for, and setting your ten-week development goals." },
    ],
  },
  {
    number: 2,
    slug: "english-speaking-foundations",
    title: "English Speaking Foundations",
    weeks: "Weeks 1–2",
    summary:
      "Prioritise intelligibility over accent. Learn the stress, rhythm and signposting patterns that make spoken English easy for international audiences to follow.",
    outcomes: [
      "Use word and sentence stress to make key medical terms clear",
      "Replace written-style sentences with spoken-style English",
      "Signpost a talk so listeners never lose the thread",
    ],
    lessons: [
      { code: "L04", title: "Intelligibility Before Accent", summary: "What international listeners need from you, and which pronunciation features matter most." },
      { code: "L05", title: "Stress, Rhythm and Medical Terminology", summary: "Pronouncing long clinical terms with confidence and placing emphasis where meaning lives." },
      { code: "L06", title: "Spoken English for Presenters", summary: "Signposting language, transitions and sentence length for listeners rather than readers." },
    ],
  },
  {
    number: 3,
    slug: "voice-and-stage-presence",
    title: "Voice and Stage Presence",
    weeks: "Weeks 2–3",
    summary:
      "Develop a calm, authoritative delivery: pace, pause, projection and the non-verbal signals that build trust before you finish your first sentence.",
    outcomes: [
      "Control speaking pace and use deliberate pauses",
      "Project your voice without strain in rooms of any size",
      "Use posture, gesture and eye contact purposefully",
    ],
    lessons: [
      { code: "L07", title: "Pace, Pause and Emphasis", summary: "Why speakers rush in a second language, and how pauses create authority and comprehension." },
      { code: "L08", title: "Voice Projection and Vocal Variety", summary: "Breath support, resonance and intonation to avoid a monotone delivery." },
      { code: "L09", title: "Body Language and Presence", summary: "Stance, movement, gesture and eye contact on stage, at the lectern and on camera." },
    ],
    workshop: {
      code: "W1",
      title: "Workshop I — Voice and Presence Lab",
      summary: "Record a two-minute opening, receive AI delivery analysis, and refine pace, pausing and projection across three attempts.",
      format: "Speaking Studio practice with AI Voice Coach",
    },
  },
  {
    number: 4,
    slug: "presentation-architecture",
    title: "Presentation Architecture",
    weeks: "Weeks 3–4",
    summary:
      "Build presentations around one clear message. Structure openings, arguments and conclusions so that complex content becomes memorable.",
    outcomes: [
      "Define a single core message for any presentation",
      "Structure talks with proven frameworks for medical audiences",
      "Design slides that support speech rather than replace it",
    ],
    lessons: [
      { code: "L10", title: "The Core Message", summary: "Reducing a body of work to the one idea your audience must remember." },
      { code: "L11", title: "Openings and Closings That Work", summary: "Starting with relevance and ending with a clear take-home message and call to action." },
      { code: "L12", title: "Slides as Visual Support", summary: "Evidence-informed slide design: one idea per slide, readable data, and speaking without reading." },
    ],
    workshop: {
      code: "W2",
      title: "Workshop II — Structure Clinic",
      summary: "Rebuild one of your own presentations using the Academy structure, then deliver the new opening and conclusion.",
      format: "Assignment with AI Presentation Coach feedback",
    },
  },
  {
    number: 5,
    slug: "medical-storytelling",
    title: "Medical Storytelling",
    weeks: "Week 5",
    summary:
      "Use narrative to make science human and memorable — ethically, without identifiable patient information, and without sacrificing rigour.",
    outcomes: [
      "Structure a short professional narrative with tension and resolution",
      "Use anonymised or composite cases responsibly",
    ],
    lessons: [
      { code: "L13", title: "Why Stories Work in Medicine", summary: "Narrative structure, attention and memory — and where storytelling does not belong." },
      { code: "L14", title: "Ethical Case Narratives", summary: "Building composite and fully anonymised stories that respect confidentiality and consent." },
    ],
  },
  {
    number: 6,
    slug: "explaining-complex-medicine",
    title: "Explaining Complex Medicine",
    weeks: "Week 5",
    summary:
      "Adapt technical content for different audiences — specialists, multidisciplinary teams, students and the public — without losing accuracy.",
    outcomes: [
      "Calibrate depth and vocabulary to the audience",
      "Explain data, risk and uncertainty clearly",
    ],
    lessons: [
      { code: "L15", title: "Knowing Your Audience", summary: "Layering information for mixed audiences and avoiding the curse of knowledge." },
      { code: "L16", title: "Explaining Data, Risk and Uncertainty", summary: "Presenting statistics, absolute versus relative risk, and limitations honestly." },
    ],
  },
  {
    number: 7,
    slug: "medical-conference-mastery",
    title: "Medical Conference Mastery",
    weeks: "Week 6",
    summary:
      "Prepare for the realities of international congresses: strict time limits, abstract and poster sessions, chairing, and networking in English.",
    outcomes: [
      "Deliver a research presentation within a strict time limit",
      "Present posters and short oral abstracts effectively",
      "Communicate confidently in panels and informal conference settings",
    ],
    lessons: [
      { code: "L17", title: "The Ten-Minute Research Talk", summary: "Structuring and timing an original research presentation for an international audience." },
      { code: "L18", title: "Posters, Abstracts and Short Orals", summary: "The two-minute poster pitch and five-minute oral abstract." },
      { code: "L19", title: "Panels, Chairing and Networking", summary: "Speaking on panels, moderating sessions and professional small talk." },
    ],
    workshop: {
      code: "W3",
      title: "Workshop III — Conference Simulation",
      summary: "Deliver a timed research presentation to the AI Conference Audience and respond to a moderated question round.",
      format: "Simulation Centre",
    },
  },
  {
    number: 8,
    slug: "difficult-questions-and-critical-thinking",
    title: "Difficult Questions and Critical Thinking",
    weeks: "Week 7",
    summary:
      "Handle challenging, hostile, off-topic and unclear questions with composure, and buy thinking time naturally in English.",
    outcomes: [
      "Use a reliable framework for answering under pressure",
      "Respond to challenges and criticism professionally",
      "Say “I don’t know” with credibility",
    ],
    lessons: [
      { code: "L20", title: "A Framework for Answering Questions", summary: "Listen, clarify, answer, bridge — with natural English phrases for thinking time." },
      { code: "L21", title: "Challenging and Hostile Questions", summary: "De-escalation, acknowledging valid criticism, and holding your position with evidence." },
      { code: "L22", title: "Uncertainty and the Limits of Evidence", summary: "Communicating what is not known without undermining your expertise." },
    ],
    workshop: {
      code: "W4",
      title: "Workshop IV — Unexpected Questions",
      summary: "A rapid-fire question round with escalating difficulty, followed by structured feedback on clarity and composure.",
      format: "Simulation Centre",
    },
  },
  {
    number: 9,
    slug: "media-interviews-and-podcasts",
    title: "Media, Interviews and Podcasts",
    weeks: "Week 8",
    summary:
      "Communicate medical expertise to journalists and public audiences: key messages, sound bites, and staying accurate under time pressure.",
    outcomes: [
      "Prepare three key messages for any interview",
      "Handle media formats from live radio to long-form podcasts",
    ],
    lessons: [
      { code: "L23", title: "Key Messages and Media Preparation", summary: "Message houses, sound bites and avoiding misquotation." },
      { code: "L24", title: "Interviews, Podcasts and Video", summary: "Format-specific technique for broadcast, recorded and online media." },
    ],
    workshop: {
      code: "W5",
      title: "Workshop V — Media Interview Simulation",
      summary: "A recorded mock interview with the AI Media Interviewer, including a bridging exercise for difficult questions.",
      format: "Simulation Centre",
    },
  },
  {
    number: 10,
    slug: "teaching-leadership-and-influence",
    title: "Teaching, Leadership and Influence",
    weeks: "Weeks 8–9",
    summary:
      "Apply communication skills beyond the podium: teaching, leading meetings, and influencing colleagues and decision-makers.",
    outcomes: [
      "Teach clinical concepts interactively",
      "Communicate persuasively in leadership settings",
    ],
    lessons: [
      { code: "L25", title: "Teaching and Interactive Lecturing", summary: "Engagement techniques for lectures, ward teaching and journal clubs." },
      { code: "L26", title: "Leadership Communication and Persuasion", summary: "Proposals, meetings and difficult conversations with colleagues." },
    ],
  },
  {
    number: 11,
    slug: "advanced-rehearsal-and-performance",
    title: "Advanced Rehearsal and Performance",
    weeks: "Week 9",
    summary:
      "Professional rehearsal methods, managing technical problems, and speaking online with the same presence as in the room.",
    outcomes: [
      "Rehearse efficiently with deliberate practice",
      "Recover gracefully from mistakes and technical failures",
    ],
    lessons: [
      { code: "L27", title: "Deliberate Rehearsal", summary: "How professionals rehearse: segmenting, recording, reviewing and refining." },
      { code: "L28", title: "Online Presenting and Recovery Skills", summary: "Webinars, hybrid sessions, and what to do when something goes wrong." },
    ],
    workshop: {
      code: "W6",
      title: "Workshop VI — Group Coaching and Dress Rehearsal",
      summary: "The programme’s live group coaching session with an Academy instructor, followed by a full rehearsal of your final keynote.",
      format: "Live group session with a human instructor",
    },
  },
  {
    number: 12,
    slug: "final-medical-keynote",
    title: "Final Medical Keynote",
    weeks: "Week 10",
    summary:
      "Prepare, deliver and defend an 8–10-minute medical keynote, assessed by an Academy instructor against the published rubric.",
    outcomes: [
      "Deliver a complete 8–10-minute presentation",
      "Answer simulated audience questions",
      "Receive a human-reviewed final assessment",
    ],
    lessons: [
      { code: "L29", title: "Preparing Your Final Keynote", summary: "Topic selection, the assessment rubric, and a final preparation plan." },
      { code: "L30", title: "Delivery, Questions and Reflection", summary: "Final examination guidance, the simulated Q&A, and planning your continued development." },
    ],
  },
];

export const totals = {
  modules: modules.length,
  lessons: modules.reduce((n, m) => n + m.lessons.length, 0),
  workshops: modules.filter((m) => m.workshop).length,
};

export const rubric = [
  { criterion: "Structure and clarity", weight: 20 },
  { criterion: "Voice and delivery", weight: 15 },
  { criterion: "English fluency and intelligibility", weight: 15 },
  { criterion: "Audience engagement", weight: 15 },
  { criterion: "Body language", weight: 10 },
  { criterion: "Medical storytelling", weight: 10 },
  { criterion: "Handling questions", weight: 10 },
  { criterion: "Professional communication", weight: 5 },
] as const;
