/**
 * Academy content standard (approved 2026-11-25).
 * Main lessons: 1,200–1,800 words of teaching content (intro, section text, callouts, examples).
 * Quiz, phrase bank, headings and instructions are not counted.
 */

/** How a statement is supported. Shown to students so evidence, guidance and illustration are never confused. */
export type CalloutKind = "evidence" | "recommendation";
export type Callout = { kind: CalloutKind; text: string; refs?: number[] };

export type Phrase = {
  phrase: string;
  use: string;            // when to use it
  register: string;       // e.g. "neutral–formal"
  pronunciation?: string; // stress / sound notes
  example: string;        // in a real presentation
};

export type LessonBody = {
  intro: string;
  objectives: string[];
  sections: { heading: string; paragraphs: string[]; callout?: Callout }[];
  examples: { title: string; setting: string; text: string }[];
  phrase_bank?: Phrase[];
  phrase_practice?: string; // how to use the expressions in real presentations
  demonstration: string;
  mistakes: ({ mistake: string; correction: string } | string)[];
  reflection: string[];
  references?: string[];
  workshop?: WorkshopData;
};

export type Exercise = {
  title: string;
  instructions: string;
  steps?: string[];
  prompt: string;
  min_chars: number;
  model_answer?: string;
  self_check?: string[];
};

export type Assignment = {
  title: string;
  brief: string;
  min_words: number;
  required: boolean;
  criteria?: { criterion: string; description: string }[];
};

export type Quiz = { prompt: string; options: string[]; correct: number; explanation: string; scenario?: boolean }[];

export type LessonSpec = {
  code: string;
  week: number;
  minutes: number;
  preview?: boolean;
  aiTeacher: string;
  video?: { status: "sample"; url: string; captions: string; note: string };
  status: "ready" | "sample" | "in_preparation";
  body?: LessonBody;
  exercise?: Exercise;
  quiz?: Quiz;
  assignment?: Assignment;
  resources?: { title: string; description: string; file_url: string; is_sample: boolean }[];
};

/** Words of teaching content, per the approved standard. */
export function teachingWords(b: LessonBody): number {
  const text = [
    b.intro,
    ...b.sections.flatMap((s) => [...s.paragraphs, s.callout?.text ?? ""]),
    ...b.examples.map((e) => e.text),
  ].join(" ");
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

/* ───────────── Workshop structure (approved W1 template, 2026-11-26) ───────────── */

export type WorkshopStepKey =
  | "briefing" | "round1" | "stationA" | "round2" | "stationB" | "stationC" | "round3" | "debrief";

export type WorkshopStep = {
  key: WorkshopStepKey;
  title: string;
  kind: "briefing" | "round" | "station" | "debrief";
  facilitatedMinutes: number;
  selfPacedMinutes: [number, number];
  purpose: string;
  instructions: string[];        // learner instructions (both versions)
  selfPacedNotes?: string[];     // extra guidance for the independent version
  checklist?: string[];          // items the learner confirms (stations, debrief)
  output: string;
  facilitator: { setup: string; observe: string[]; difficulties: { issue: string; response: string }[] };
  basedOn?: string[];            // lesson codes
};

export type PressureCard = {
  code: string;
  title: string;
  situation: string;     // what happens
  task: string;          // what the speaker must do
  recovery: string;      // suggested phrase / strategy (shown after the round)
  intensity: "standard" | "stretch";
};

export type RubricCriterion = {
  number: number;
  title: string;
  question: string;
  mandatory: boolean;
  evidence: string;
  levels: { beginning: string; developing: string; competent: string };
  examples: { beginning: string; developing: string; competent: string };
};

export type WorkshopData = {
  outcomes: { outcome: string; producedIn: string; evidence: string }[];
  assessmentPrinciples: string[];
  completionRule: string;
  /** Rule for the instructor-confirmed Competent status (criteria numbered from 1). */
  competence: { min: number; required: number[] };
  steps: WorkshopStep[];
  readinessMinutes: { facilitated: number; selfPaced: [number, number] };
  sessions: { title: string; steps: WorkshopStepKey[] }[];
  roundFields: { key: string; label: string; help: string; type: "text" | "number" | "choice" | "textarea"; options?: string[] }[];
  pressureCards: PressureCard[];
  pressureGuidance: string[];
  rubric: RubricCriterion[];
  debriefQuestions: string[];
  transferPlan: { heading: string; prompt: string }[];
  practicePassage: { title: string; text: string; criticalNumbers: string[] };
  termCard: { term: string; stress: string; ipa: string }[];
  facilitatorGeneral: string[];
};

export type WorkshopSpec = LessonSpec & { workshop: WorkshopData };
