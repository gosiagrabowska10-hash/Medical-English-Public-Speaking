/**
 * Lesson-level course data: schedule, durations and authored content.
 * Authored lessons live in src/content/lessons/*.ts and follow the approved
 * content standard (src/content/lesson-types.ts). This file is the source for
 * the database seed (scripts/generate-content-sql.ts); after seeding, the
 * database is the source of truth and content staff edit it there.
 */
import type { LessonSpec } from "./lesson-types";
import { L01 } from "./lessons/l01";
import { L02 } from "./lessons/l02";
import { L03 } from "./lessons/l03";
import { L04 } from "./lessons/l04";
import { L05 } from "./lessons/l05";
import { L06 } from "./lessons/l06";
import { L07 } from "./lessons/l07";
import { L08 } from "./lessons/l08";
import { L09 } from "./lessons/l09";
import { L10 } from "./lessons/l10";
import { L11 } from "./lessons/l11";
import { L12 } from "./lessons/l12";
import { W1 } from "./workshops/w1";

export type { LessonSpec, LessonBody, Quiz } from "./lesson-types";

/** Schedule for every lesson and workshop (36 items). */
const schedule: { code: string; week: number; minutes: number; aiTeacher: string }[] = [
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
  L01, L02, L03, L04, L05, L06, L07, L08, L09, W1, L10, L11, L12,
  ...schedule.map((s) => ({ ...s, status: "in_preparation" as const })),
];

export const totalMinutes = lessonSpecs.reduce((n, l) => n + l.minutes, 0);
