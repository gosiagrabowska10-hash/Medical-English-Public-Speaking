"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { FormState } from "@/lib/auth-actions";

async function session() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user ? { supabase, user } : null;
}

const profileSchema = z.object({
  title: z.enum(["Dr", "Prof.", "Mr", "Ms", "Mx"]),
  first_name: z.string().trim().min(1, "Please enter your first name.").max(80),
  last_name: z.string().trim().min(1, "Please enter your last name.").max(80),
  country: z.string().trim().max(80),
  specialty: z.string().trim().max(120),
  timezone: z.string().trim().max(64),
});

export async function updateProfileAction(_: FormState, form: FormData): Promise<FormState> {
  const s = await session();
  if (!s) return { status: "error", message: "Your session has expired. Please sign in again." };
  const parsed = profileSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };
  const d = parsed.data;
  const { error } = await s.supabase
    .from("profiles")
    .update({ ...d, country: d.country || null, specialty: d.specialty || null, timezone: d.timezone || null })
    .eq("id", s.user.id);
  if (error) return { status: "error", message: "Your profile could not be saved. Please try again." };
  await s.supabase.rpc("log_event", { _action: "profile.updated", _entity: "profile", _entity_id: s.user.id });
  revalidatePath("/app", "layout");
  return { status: "success", message: "Your profile has been saved." };
}

const consentKinds = ["recording", "marketing_email"] as const;

export async function setConsentAction(kind: (typeof consentKinds)[number], granted: boolean): Promise<FormState> {
  if (!consentKinds.includes(kind)) return { status: "error", message: "Unknown consent." };
  const s = await session();
  if (!s) return { status: "error", message: "Your session has expired. Please sign in again." };
  const { error } = await s.supabase.from("consents").insert({ user_id: s.user.id, kind, granted });
  if (error) return { status: "error", message: "Your choice could not be saved. Please try again." };
  await s.supabase.rpc("log_event", { _action: granted ? "consent.granted" : "consent.withdrawn", _entity: "consent", _entity_id: kind });
  revalidatePath("/app", "layout");
  return { status: "success", message: granted ? "Consent recorded." : "Consent withdrawn." };
}

export async function requestDeletionAction(_: FormState, form: FormData): Promise<FormState> {
  const s = await session();
  if (!s) return { status: "error", message: "Your session has expired. Please sign in again." };
  if (form.get("confirm") !== "DELETE") return { status: "error", message: "Please type DELETE to confirm your request." };
  const reason = String(form.get("reason") ?? "").slice(0, 2000) || null;
  const { error } = await s.supabase.from("data_deletion_requests").insert({ user_id: s.user.id, reason });
  if (error?.code === "23505") return { status: "error", message: "You already have an open deletion request." };
  if (error) return { status: "error", message: "Your request could not be submitted. Please try again." };
  await s.supabase.rpc("log_event", { _action: "privacy.deletion_requested", _entity: "profile", _entity_id: s.user.id });
  revalidatePath("/app/settings");
  return { status: "success", message: "Your deletion request has been received. Our team will process it and confirm by email." };
}
