"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionResult<T = undefined> = { ok: true; data?: T; message?: string } | { ok: false; message: string };

async function client() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user ? supabase : null;
}
const expired = { ok: false as const, message: "Your session has expired. Please sign in again." };
const fail = (m: string | undefined) => {
  const msg = m ?? "";
  if (/access denied/.test(msg)) return { ok: false as const, message: "You do not have access to this lesson." };
  const short = msg.match(/(response too short: .*|assignment too short: .*|please answer every question)/);
  if (short) return { ok: false as const, message: short[1].charAt(0).toUpperCase() + short[1].slice(1) + "." };
  return { ok: false as const, message: "Something went wrong. Please try again." };
};
const refresh = (code: string) => { revalidatePath(`/app/learn/${code}`); revalidatePath("/app/curriculum"); revalidatePath("/app"); };

export async function startLessonAction(lessonId: string): Promise<ActionResult> {
  const s = await client(); if (!s) return expired;
  const { error } = await s.rpc("start_lesson", { _lesson: lessonId });
  return error ? fail(error.message) : { ok: true };
}

export async function saveVideoPositionAction(lessonId: string, seconds: number): Promise<ActionResult> {
  const s = await client(); if (!s) return expired;
  const { error } = await s.rpc("save_video_position", { _lesson: lessonId, _seconds: Math.max(0, Math.floor(seconds)) });
  return error ? fail(error.message) : { ok: true };
}

export async function saveExerciseAction(lessonId: string, code: string, response: string): Promise<ActionResult> {
  const s = await client(); if (!s) return expired;
  const { error } = await s.rpc("save_exercise", { _lesson: lessonId, _response: response });
  if (error) return fail(error.message);
  refresh(code);
  return { ok: true, message: "Your exercise has been saved." };
}

export type QuizResult = { score: number; total: number; passed: boolean; feedback: { position: number; correct: boolean; correct_index: number; explanation: string }[] };
export async function submitQuizAction(lessonId: string, code: string, answers: number[]): Promise<ActionResult<QuizResult>> {
  const s = await client(); if (!s) return expired;
  const { data, error } = await s.rpc("submit_quiz", { _lesson: lessonId, _answers: answers });
  if (error) return fail(error.message);
  refresh(code);
  return { ok: true, data: data as QuizResult };
}

export async function submitAssignmentAction(lessonId: string, code: string, body: string): Promise<ActionResult> {
  const s = await client(); if (!s) return expired;
  const { error } = await s.rpc("submit_assignment", { _lesson: lessonId, _body: body });
  if (error) return fail(error.message);
  refresh(code);
  return { ok: true, message: "Your assignment has been submitted." };
}

export async function completeLessonAction(lessonId: string, code: string): Promise<ActionResult<{ missing: string[] }>> {
  const s = await client(); if (!s) return expired;
  const { data, error } = await s.rpc("complete_lesson", { _lesson: lessonId });
  if (error) return fail(error.message);
  const r = data as { completed: boolean; missing: string[] };
  refresh(code);
  return r.completed ? { ok: true, message: "Lesson completed." } : { ok: false, message: "Some requirements are still open.", };
}
