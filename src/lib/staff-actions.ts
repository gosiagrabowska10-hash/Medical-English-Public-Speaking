"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

/** Records an instructor-confirmed workshop assessment. Authorisation and the competence
 *  rule are enforced in the database (record_workshop_assessment, MFA required). */
const schema = z.object({
  learner: z.uuid(),
  lesson: z.uuid(),
  submission: z.coerce.number().int().positive(),
  basis: z.enum(["live_session", "recording_shown_live"], { message: "Choose how you observed the performance." }),
  levels: z.array(z.enum(["beginning", "developing", "competent"], { message: "Choose a level for every criterion." })).min(4),
  comment: z.string().trim().min(20, "Write at least a short piece of feedback (20 characters or more).").max(4000),
});

export type AssessState = { status: "idle" | "error" | "success"; message?: string };

export async function recordAssessmentAction(_: AssessState, form: FormData): Promise<AssessState> {
  const supabase = await createClient();
  if (!supabase) return { status: "error", message: "The platform is not configured." };
  const n = Number(form.get("criteria") ?? 0);
  const parsed = schema.safeParse({
    learner: form.get("learner"), lesson: form.get("lesson"), submission: form.get("submission"),
    basis: form.get("basis") ?? undefined,
    levels: Array.from({ length: n }, (_, i) => form.get(`c${i + 1}`) ?? undefined),
    comment: form.get("comment"),
  });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };
  const d = parsed.data;
  const { data, error } = await supabase.rpc("record_workshop_assessment", { _user: d.learner, _lesson: d.lesson, _basis: d.basis, _levels: d.levels, _comment: d.comment });
  if (error) {
    const msg = error.code === "42501" ? "You need an instructor or assessor role and a session verified with two-factor authentication." : "The assessment could not be saved. Please try again.";
    return { status: "error", message: msg };
  }
  revalidatePath(`/app/staff/assessments/${d.submission}`);
  const r = data as { competent: boolean; competent_criteria: number };
  return { status: "success", message: r.competent ? `Saved: Competent confirmed (${r.competent_criteria} criteria at Competent).` : `Saved: not yet Competent (${r.competent_criteria} criteria at Competent). The learner sees your feedback.` };
}
