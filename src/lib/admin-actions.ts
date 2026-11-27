"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

/**
 * Enrolment, cohort and module-unlock administration. Authorisation (roles with an
 * MFA-verified session) and logging are enforced in the database functions (migration 0006).
 */
export type AdminState = { status: "idle" | "error" | "success"; message?: string };

function explain(code: string | undefined, fallback: string) {
  if (code === "42501") return "You need a learner-administration role and a session verified with two-factor authentication.";
  return fallback;
}

async function sb() {
  const supabase = await createClient();
  if (!supabase) throw new Error("The platform is not configured.");
  return supabase;
}

const cohortSchema = z.object({
  name: z.string().trim().min(2, "Enter a cohort name (at least 2 characters).").max(80),
  starts_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter the start date.").or(z.literal("")),
  notes: z.string().trim().max(1000).optional(),
});

export async function createCohortAction(_: AdminState, form: FormData): Promise<AdminState> {
  const p = cohortSchema.safeParse({ name: form.get("name"), starts_on: form.get("starts_on") ?? "", notes: form.get("notes") ?? "" });
  if (!p.success) return { status: "error", message: p.error.issues[0].message };
  const { error } = await (await sb()).rpc("admin_create_cohort", { _name: p.data.name, _starts_on: p.data.starts_on || null, _notes: p.data.notes ?? null });
  if (error) return { status: "error", message: error.code === "23505" ? "A cohort with this name already exists." : explain(error.code, "The cohort could not be created.") };
  revalidatePath("/app/admin/learners");
  return { status: "success", message: `Cohort “${p.data.name}” created.` };
}

const enrolSchema = z.object({ email: z.email("Enter the learner's email address."), cohort: z.uuid().or(z.literal("")) });

export async function enrolAction(_: AdminState, form: FormData): Promise<AdminState> {
  const p = enrolSchema.safeParse({ email: String(form.get("email") ?? "").trim(), cohort: form.get("cohort") ?? "" });
  if (!p.success) return { status: "error", message: p.error.issues[0].message };
  const { error } = await (await sb()).rpc("admin_enrol", { _email: p.data.email, _cohort: p.data.cohort || null });
  if (error) {
    const msg = error.code === "P0002" ? "No account exists for this email address. The learner must register first."
      : error.code === "23505" ? "This learner already has an active enrolment."
      : explain(error.code, "The learner could not be enrolled.");
    return { status: "error", message: msg };
  }
  revalidatePath("/app/admin/learners");
  return { status: "success", message: `${p.data.email} is enrolled. Module 1 is open; later modules open as the learner completes each module.` };
}

const statusSchema = z.object({ enrolment: z.coerce.number().int().positive(), status: z.enum(["active", "paused", "completed", "cancelled"]), cohort: z.uuid().or(z.literal("")), learner: z.uuid() });

export async function setEnrolmentAction(_: AdminState, form: FormData): Promise<AdminState> {
  const p = statusSchema.safeParse({ enrolment: form.get("enrolment"), status: form.get("status"), cohort: form.get("cohort") ?? "", learner: form.get("learner") });
  if (!p.success) return { status: "error", message: p.error.issues[0].message };
  const { error } = await (await sb()).rpc("admin_set_enrolment", { _enrolment: p.data.enrolment, _status: p.data.status, _cohort: p.data.cohort || null });
  if (error) return { status: "error", message: error.code === "23505" ? "This learner already has another active enrolment." : explain(error.code, "The enrolment could not be updated.") };
  revalidatePath(`/app/admin/learners/${p.data.learner}`);
  return { status: "success", message: "Enrolment updated." };
}

const unlockSchema = z.object({ learner: z.uuid(), module: z.uuid(), reason: z.string().trim().min(5, "Give a reason (at least 5 characters). It is recorded in the audit log.").max(500) });

export async function unlockModuleAction(_: AdminState, form: FormData): Promise<AdminState> {
  const p = unlockSchema.safeParse({ learner: form.get("learner"), module: form.get("module"), reason: form.get("reason") });
  if (!p.success) return { status: "error", message: p.error.issues[0].message };
  const { error } = await (await sb()).rpc("admin_unlock_module", { _user: p.data.learner, _module: p.data.module, _reason: p.data.reason });
  if (error) return { status: "error", message: error.code === "23505" ? "This module is already unlocked for the learner." : explain(error.code, "The module could not be unlocked.") };
  revalidatePath(`/app/admin/learners/${p.data.learner}`);
  return { status: "success", message: "Module unlocked for this learner." };
}

export async function revokeUnlockAction(_: AdminState, form: FormData): Promise<AdminState> {
  const id = Number(form.get("unlock")); const learner = String(form.get("learner") ?? "");
  if (!Number.isInteger(id) || id <= 0) return { status: "error", message: "Invalid request." };
  const { error } = await (await sb()).rpc("admin_revoke_unlock", { _unlock: id });
  if (error) return { status: "error", message: explain(error.code, "The unlock could not be revoked.") };
  revalidatePath(`/app/admin/learners/${learner}`);
  return { status: "success", message: "Unlock revoked. Lessons the learner has already started stay open." };
}
