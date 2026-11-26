"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { site } from "@/lib/site";

export type FormState = { status: "idle" | "error" | "success"; message?: string; fields?: Record<string, string> };

const TERMS_VERSION = "2026-11-25";
const notConfigured: FormState = { status: "error", message: "Student accounts are not open yet. Please try again when the platform launches." };

function safeNext(next: FormDataEntryValue | null) {
  const n = typeof next === "string" ? next : "";
  return n.startsWith("/app") && !n.startsWith("//") ? n : "/app";
}

function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "The email address or password is incorrect.";
  if (m.includes("email not confirmed")) return "Please confirm your email address first. We sent you a confirmation link when you registered.";
  if (m.includes("rate limit") || m.includes("too many")) return "Too many attempts. Please wait a few minutes and try again.";
  if (m.includes("password") && (m.includes("weak") || m.includes("pwned") || m.includes("known"))) return "Please choose a stronger password that has not appeared in a data breach.";
  if (m.includes("same") && m.includes("password")) return "Your new password must be different from the current one.";
  return "Something went wrong. Please try again.";
}

const registerSchema = z.object({
  title: z.enum(["Dr", "Prof.", "Mr", "Ms", "Mx"]),
  first: z.string().trim().min(1, "Please enter your first name.").max(80),
  last: z.string().trim().min(1, "Please enter your last name.").max(80),
  email: z.email("Please enter a valid email address.").max(200),
  country: z.string().trim().min(2, "Please enter your country.").max(80),
  specialty: z.string().trim().max(120).optional(),
  password: z.string().min(10, "Your password must be at least 10 characters.").max(128),
  terms: z.literal("on", { error: "Please accept the Terms and Conditions to continue." }),
});

export async function registerAction(_: FormState, form: FormData): Promise<FormState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const i of parsed.error.issues) fields[String(i.path[0])] ??= i.message;
    return { status: "error", message: "Please correct the highlighted fields.", fields };
  }
  const supabase = await createClient();
  if (!supabase) return notConfigured;

  const d = parsed.data;
  const { error } = await supabase.auth.signUp({
    email: d.email,
    password: d.password,
    options: {
      emailRedirectTo: `${site.url}/auth/confirm?next=/app`,
      data: {
        title: d.title, first_name: d.first, last_name: d.last, country: d.country,
        specialty: d.specialty ?? "", accepted_terms: true, terms_version: TERMS_VERSION,
      },
    },
  });
  if (error) return { status: "error", message: friendly(error.message) };
  // Same response whether or not the address already has an account (no account enumeration).
  redirect(`/auth/check-email?email=${encodeURIComponent(d.email)}`);
}

const loginSchema = z.object({ email: z.email("Please enter a valid email address."), password: z.string().min(1, "Please enter your password.") });

export async function loginAction(_: FormState, form: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({ email: form.get("email"), password: form.get("password") });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };
  const supabase = await createClient();
  if (!supabase) return notConfigured;
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { status: "error", message: friendly(error.message) };
  await supabase.rpc("log_event", { _action: "auth.sign_in" });
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal?.nextLevel === "aal2" && aal.currentLevel !== "aal2") redirect(`/verify-mfa?next=${encodeURIComponent(safeNext(form.get("next")))}`);
  redirect(safeNext(form.get("next")));
}

export async function forgotPasswordAction(_: FormState, form: FormData): Promise<FormState> {
  const email = z.email().safeParse(form.get("email"));
  if (!email.success) return { status: "error", message: "Please enter a valid email address." };
  const supabase = await createClient();
  if (!supabase) return notConfigured;
  const { error } = await supabase.auth.resetPasswordForEmail(email.data, {
    redirectTo: `${site.url}/auth/confirm?next=/reset-password`,
  });
  if (error && /rate limit|too many/i.test(error.message)) return { status: "error", message: friendly(error.message) };
  return { status: "success", message: "If an account exists for that address, we have sent a link to reset your password. The link expires after one hour." };
}

const resetSchema = z
  .object({ password: z.string().min(10, "Your password must be at least 10 characters.").max(128), confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: "The passwords do not match.", path: ["confirm"] });

export async function resetPasswordAction(_: FormState, form: FormData): Promise<FormState> {
  const parsed = resetSchema.safeParse({ password: form.get("password"), confirm: form.get("confirm") });
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0].message };
  const supabase = await createClient();
  if (!supabase) return notConfigured;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Your reset link has expired. Please request a new one." };
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) return { status: "error", message: friendly(error.message) };
  await supabase.rpc("log_event", { _action: "auth.password_changed" });
  redirect("/app?password=updated");
}

export async function signOutAction() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.rpc("log_event", { _action: "auth.sign_out" });
    await supabase.auth.signOut();
  }
  redirect("/login?signed_out=1");
}
