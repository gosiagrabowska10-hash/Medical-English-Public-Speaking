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

export type CurrentUser = { id: string; email: string; profile: Profile; roles: AppRole[] };

/**
 * Data Access Layer: the single place the app reads the signed-in user.
 * Redirects to /login when there is no valid session.
 */
export async function requireUser(next = "/app"): Promise<CurrentUser> {
  const supabase = await createClient();
  if (!supabase) redirect("/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);

  const [{ data: profile, error: pErr }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("id,title,first_name,last_name,country,specialty,locale,timezone,created_at").eq("id", user.id).single(),
    supabase.from("user_roles").select("role").eq("user_id", user.id),
  ]);
  if (pErr || !profile) throw new Error("Your profile could not be loaded. Please try again.");

  return { id: user.id, email: user.email ?? "", profile: profile as Profile, roles: (roles ?? []).map((r) => r.role as AppRole) };
}

export function displayName(p: Pick<Profile, "title" | "first_name" | "last_name">) {
  return [p.title, p.first_name, p.last_name].filter(Boolean).join(" ");
}
