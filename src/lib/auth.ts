import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AppRole =
  | "student" | "instructor" | "assessor" | "content_editor"
  | "student_support" | "academic_director" | "academy_owner";

export type Profile = {
  id: string;
  title: string | null;
  first_name: string;
  last_name: string;
  country: string | null;
  specialty: string | null;
  locale: string;
  timezone: string | null;
  created_at: string;
};

export type CurrentUser = {
  id: string; email: string; profile: Profile; roles: AppRole[];
  /** Assurance level of this session: "aal2" after a verified second factor. */
  aal: "aal1" | "aal2";
  /** True when the account holds any staff role (staff privileges require aal2). */
  isStaff: boolean;
};

export const STAFF_ROLES: AppRole[] = ["instructor", "assessor", "content_editor", "student_support", "academic_director", "academy_owner"];
export const ASSESSOR_ROLES: AppRole[] = ["instructor", "assessor", "academic_director", "academy_owner"];

/**
 * Data Access Layer: the single place the app reads the signed-in user.
 * Redirects to /login when there is no valid session.
 */
export async function requireUser(next = "/app"): Promise<CurrentUser> {
  const supabase = await createClient();
  if (!supabase) redirect("/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);

  const [{ data: profile, error: pErr }, { data: roles }, { data: aal }] = await Promise.all([
    supabase.from("profiles").select("id,title,first_name,last_name,country,specialty,locale,timezone,created_at").eq("id", user.id).single(),
    supabase.from("user_roles").select("role").eq("user_id", user.id),
    supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
  ]);
  // Accounts with a verified authenticator must finish the second factor (also enforced in the proxy).
  if (aal?.nextLevel === "aal2" && aal.currentLevel !== "aal2") redirect(`/verify-mfa?next=${encodeURIComponent(next)}`);
  if (pErr || !profile) throw new Error("Your profile could not be loaded. Please try again.");

  const roleList = (roles ?? []).map((r) => r.role as AppRole);
  return {
    id: user.id, email: user.email ?? "", profile: profile as Profile, roles: roleList,
    aal: aal?.currentLevel === "aal2" ? "aal2" : "aal1",
    isStaff: roleList.some((r) => STAFF_ROLES.includes(r)),
  };
}

/** Staff pages: the role must be held AND the session must be MFA-verified (enforced again by RLS). */
export async function requireStaff(allowed: AppRole[], next: string) {
  const user = await requireUser(next);
  const hasRole = user.roles.some((r) => allowed.includes(r));
  return { user, hasRole, mfaOk: user.aal === "aal2" };
}

export function displayName(p: Pick<Profile, "title" | "first_name" | "last_name">) {
  return [p.title, p.first_name, p.last_name].filter(Boolean).join(" ");
}
