"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

/** Two-factor authentication (TOTP authenticator app). Audit SEC-09. */
type Result = { ok: true } | { ok: false; message: string };
const code = z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code from your authenticator app.");

async function client() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user ? supabase : null;
}

export async function startTotpEnrolment(): Promise<{ ok: true; factorId: string; qr: string; secret: string } | { ok: false; message: string }> {
  const sb = await client();
  if (!sb) return { ok: false, message: "Your session has expired. Please sign in again." };
  // Remove abandoned, never-verified enrolments first.
  const { data: list } = await sb.auth.mfa.listFactors();
  for (const f of list?.all ?? []) if (f.status === "unverified") await sb.auth.mfa.unenroll({ factorId: f.id });
  const { data, error } = await sb.auth.mfa.enroll({ factorType: "totp", friendlyName: `Authenticator ${new Date().toISOString().slice(0, 10)}` });
  if (error || !data) return { ok: false, message: "Two-factor set-up could not be started. Please try again." };
  return { ok: true, factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret };
}

export async function confirmTotpEnrolment(factorId: string, value: string): Promise<Result> {
  const sb = await client();
  if (!sb) return { ok: false, message: "Your session has expired. Please sign in again." };
  const c = code.safeParse(value);
  if (!c.success) return { ok: false, message: c.error.issues[0].message };
  const { error } = await sb.auth.mfa.challengeAndVerify({ factorId, code: c.data });
  if (error) return { ok: false, message: "That code was not accepted. Check the time on your phone and try the current code." };
  await sb.rpc("log_event", { _action: "security.mfa_enabled", _entity: "profile" });
  revalidatePath("/app", "layout");
  return { ok: true };
}

export async function removeTotpFactor(factorId: string): Promise<Result> {
  const sb = await client();
  if (!sb) return { ok: false, message: "Your session has expired. Please sign in again." };
  const { error } = await sb.auth.mfa.unenroll({ factorId });
  if (error) return { ok: false, message: "The authenticator could not be removed. Verify with your current code first, then try again." };
  await sb.rpc("log_event", { _action: "security.mfa_removed", _entity: "profile" });
  revalidatePath("/app", "layout");
  return { ok: true };
}

const safeNext = (n: string) => (n.startsWith("/app") && !n.startsWith("//") ? n : "/app");

export async function verifyMfaAction(_: { message?: string }, form: FormData): Promise<{ message?: string }> {
  const sb = await client();
  if (!sb) redirect("/login");
  const c = code.safeParse(form.get("code"));
  if (!c.success) return { message: c.error.issues[0].message };
  const { data } = await sb.auth.mfa.listFactors();
  const factor = data?.totp?.[0];
  if (!factor) redirect("/app");
  const { error } = await sb.auth.mfa.challengeAndVerify({ factorId: factor.id, code: c.data });
  if (error) return { message: "That code was not accepted. Please enter the current code from your authenticator app." };
  redirect(safeNext(String(form.get("next") ?? "/app")));
}
