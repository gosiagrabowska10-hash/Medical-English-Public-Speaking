import "server-only";
import { createClient } from "@/lib/supabase/server";

export type ProgressStatus = "not_started" | "in_progress" | "completed";
export type LessonRow = {
  id: string; module_id: string; code: string; kind: "lesson" | "workshop"; slug: string; title: string; summary: string;
  duration_minutes: number; week: number; position: number; is_mandatory: boolean; is_preview: boolean;
  video_status: "not_recorded" | "sample" | "published"; content_status: "in_preparation" | "sample" | "ready"; ai_teacher: string | null;
};
export type ModuleRow = { id: string; number: number; slug: string; title: string; weeks_label: string; summary: string; outcomes: string[] };
/** Module progression for the signed-in learner (see migration 0006). */
export type ModuleState = { unlocked: boolean; completed: boolean; overridden: boolean };
export type ModuleWithLessons = ModuleRow & ModuleState & {
  /** `locked`: in a module the learner has not unlocked yet, and never started (started lessons stay open). */
  lessons: (LessonRow & { status: ProgressStatus; locked: boolean })[];
};

import type { Assignment, Exercise, LessonBody } from "@/content/lesson-types";
export type { LessonBody };
export type LessonContent = {
  body: LessonBody;
  exercise: Exercise | null;
  assignment: Assignment | null;
  video_url: string | null; captions_url: string | null; video_note: string | null;
};

const LESSON_COLS = "id,module_id,code,kind,slug,title,summary,duration_minutes,week,position,is_mandatory,is_preview,video_status,content_status,ai_teacher";

async function db() {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured");
  return supabase;
}

/**
 * Staff with MFA can read every learner's rows under RLS, so per-learner queries
 * must always filter by the signed-in user's id explicitly.
 */
async function me(supabase: Awaited<ReturnType<typeof db>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");
  return user.id;
}

export async function isEnrolled() {
  const supabase = await db();
  const { data } = await supabase.rpc("is_enrolled");
  return data === true;
}

/** Full syllabus with the signed-in student's progress (RLS returns only their own rows). */
export async function getCurriculum(): Promise<{ modules: ModuleWithLessons[]; enrolled: boolean; totals: { minutes: number; lessons: number; workshops: number; completed: number; mandatory: number } }> {
  const supabase = await db();
  const uid = await me(supabase);
  const [{ data: mods, error: e1 }, { data: lessons, error: e2 }, { data: progress }, enrolled, { data: states, error: e3 }] = await Promise.all([
    supabase.from("modules").select("id,number,slug,title,weeks_label,summary,outcomes").order("number"),
    supabase.from("lessons").select(LESSON_COLS).order("position"),
    supabase.from("lesson_progress").select("lesson_id,status").eq("user_id", uid),
    isEnrolled(),
    supabase.rpc("module_states"),
  ]);
  if (e1 || e2 || e3) throw new Error("The curriculum could not be loaded.");
  const status = new Map((progress ?? []).map((p) => [p.lesson_id as string, p.status as ProgressStatus]));
  const stateOf = new Map(((states ?? []) as { module_id: string; unlocked: boolean; completed: boolean; unlocked_by_override: boolean }[])
    .map((x) => [x.module_id, { unlocked: x.unlocked, completed: x.completed, overridden: x.unlocked_by_override }]));
  const withStatus = (lessons as LessonRow[]).map((l) => {
    const st = status.get(l.id) ?? ("not_started" as const);
    // Fail closed: a module without a known state is treated as locked for enrolled learners.
    const open = stateOf.get(l.module_id)?.unlocked ?? false;
    return { ...l, status: st, locked: enrolled && !l.is_preview && !open && !status.has(l.id) };
  });
  const modules = (mods as ModuleRow[]).map((m) => ({
    ...m, ...(stateOf.get(m.id) ?? { unlocked: false, completed: false, overridden: false }),
    lessons: withStatus.filter((l) => l.module_id === m.id),
  }));
  const mandatory = withStatus.filter((l) => l.is_mandatory);
  return {
    modules,
    enrolled,
    totals: {
      minutes: withStatus.reduce((n, l) => n + l.duration_minutes, 0),
      lessons: withStatus.filter((l) => l.kind === "lesson").length,
      workshops: withStatus.filter((l) => l.kind === "workshop").length,
      completed: mandatory.filter((l) => l.status === "completed").length,
      mandatory: mandatory.length,
    },
  };
}

export type LessonPage = {
  lesson: LessonRow; module: ModuleRow; access: boolean; enrolled: boolean;
  /** Why the lesson is or is not available: open, not enrolled, or locked until an earlier module is completed. */
  accessState: { state: "open" | "not_enrolled" | "locked" | "unavailable"; requires_module?: number };
  content: LessonContent | null;
  quiz: { id: string; position: number; prompt: string; options: string[] }[];
  resources: { id: string; title: string; description: string | null; file_url: string; file_type: string; is_sample: boolean }[];
  progress: { status: ProgressStatus; video_position_s: number; exercise_response: string | null; exercise_done_at: string | null; completed_at: string | null } | null;
  lastAttempt: { score: number; total: number; passed: boolean; created_at: string } | null;
  passedQuiz: boolean;
  submission: { body: string; status: string; submitted_at: string; feedback: string | null } | null;
  missing: string[];
  workshopSteps: { step_key: string; data: Record<string, unknown>; completed_at: string | null; updated_at: string }[];
  /** Latest instructor assessment (workshops). Self-assessment is never stored here. */
  assessment: { competent: boolean; levels: ("beginning" | "developing" | "competent")[]; comment: string; basis: "live_session" | "recording_shown_live"; assessed_at: string } | null;
};

export async function getLesson(code: string): Promise<LessonPage | null> {
  const supabase = await db();
  const { data: lesson } = await supabase.from("lessons").select(LESSON_COLS).eq("code", code.toUpperCase()).maybeSingle();
  if (!lesson) return null;
  const l = lesson as LessonRow;
  const [{ data: mod }, { data: access }, enrolled] = await Promise.all([
    supabase.from("modules").select("id,number,slug,title,weeks_label,summary,outcomes").eq("id", l.module_id).single(),
    supabase.rpc("can_access_lesson", { _lesson: l.id }),
    isEnrolled(),
  ]);
  const openState = { state: "open" as const };
  if (access !== true) {
    const { data: st } = await supabase.rpc("lesson_access_state", { _lesson: l.id });
    const accessState = (st as LessonPage["accessState"]) ?? { state: "unavailable" };
    return { lesson: l, module: mod as ModuleRow, access: false, enrolled, accessState, content: null, quiz: [], resources: [], progress: null, lastAttempt: null, passedQuiz: false, submission: null, missing: [], workshopSteps: [], assessment: null };
  }
  // Opening a lesson marks it as started (idempotent, validated in the database).
  await supabase.rpc("start_lesson", { _lesson: l.id });
  const uid = await me(supabase);
  const [content, quiz, resources, progress, attempts, submission, missing, wsteps, assess] = await Promise.all([
    supabase.from("lesson_content").select("body,exercise,assignment,video_url,captions_url,video_note").eq("lesson_id", l.id).maybeSingle(),
    supabase.from("quiz_questions_public").select("id,position,prompt,options").eq("lesson_id", l.id).order("position"),
    supabase.from("lesson_resources").select("id,title,description,file_url,file_type,is_sample").eq("lesson_id", l.id).order("position"),
    supabase.from("lesson_progress").select("status,video_position_s,exercise_response,exercise_done_at,completed_at").eq("lesson_id", l.id).eq("user_id", uid).maybeSingle(),
    supabase.from("quiz_attempts").select("score,total,passed,created_at").eq("lesson_id", l.id).eq("user_id", uid).order("created_at", { ascending: false }),
    supabase.from("assignment_submissions").select("body,status,submitted_at,feedback").eq("lesson_id", l.id).eq("user_id", uid).maybeSingle(),
    supabase.rpc("lesson_requirements", { _lesson: l.id }),
    l.kind === "workshop"
      ? supabase.from("workshop_progress").select("step_key,data,completed_at,updated_at").eq("lesson_id", l.id).eq("user_id", uid)
      : Promise.resolve({ data: [] as never[] }),
    l.kind === "workshop"
      ? supabase.from("workshop_assessments").select("competent,levels,comment,basis,assessed_at").eq("lesson_id", l.id).eq("user_id", uid).order("assessed_at", { ascending: false }).limit(1)
      : Promise.resolve({ data: [] as never[] }),
  ]);
  return {
    lesson: l, module: mod as ModuleRow, access: true, enrolled, accessState: openState,
    content: (content.data as LessonContent) ?? null,
    quiz: quiz.data ?? [],
    resources: resources.data ?? [],
    progress: (progress.data as LessonPage["progress"]) ?? null,
    lastAttempt: attempts.data?.[0] ?? null,
    passedQuiz: (attempts.data ?? []).some((a) => a.passed),
    submission: submission.data ?? null,
    // Fail closed: if requirements cannot be evaluated, treat the lesson as not completable.
    missing: missing.error ? ["unavailable"] : ((missing.data as string[]) ?? []),
    workshopSteps: (wsteps.data ?? []) as LessonPage["workshopSteps"],
    assessment: ((assess.data ?? [])[0] as LessonPage["assessment"]) ?? null,
  };
}

export function formatDuration(min: number) {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`;
}
