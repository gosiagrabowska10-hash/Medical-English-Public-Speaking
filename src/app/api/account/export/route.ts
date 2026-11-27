import { createClient } from "@/lib/supabase/server";

/**
 * GDPR data export (Art. 15 access, Art. 20 portability): every record held about the
 * signed-in user, read through their own session so RLS guarantees nothing else leaks.
 * Tests check that every public table with a user_id column appears in the export.
 */

const lessonCode = "lesson:lessons(code,title)";

export async function GET() {
  const supabase = await createClient();
  if (!supabase) return Response.json({ error: "not_configured" }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });

  const own = <T extends string>(t: T, cols = "*") => supabase.from(t).select(cols).eq(t === "profiles" ? "id" : "user_id", user.id);
  const [profile, roles, consents, deletion, enrollments, progress, quizzes, submissions, workshop, assessments, unlocks, mfa] = await Promise.all([
    own("profiles").single(),
    own("user_roles", "role,created_at"),
    supabase.from("consents").select("kind,granted,version,created_at").eq("user_id", user.id).order("created_at"),
    own("data_deletion_requests", "status,reason,created_at,processed_at"),
    own("enrollments", "status,cohort,starts_on,created_at"),
    own("lesson_progress", `status,video_position_s,exercise_response,exercise_done_at,started_at,completed_at,updated_at,${lessonCode}`),
    own("quiz_attempts", `answers,score,total,passed,created_at,${lessonCode}`),
    own("assignment_submissions", `body,status,feedback,submitted_at,reviewed_at,${lessonCode}`),
    own("workshop_progress", `step_key,data,completed_at,updated_at,${lessonCode}`),
    own("workshop_assessments", `levels,competent,comment,assessed_at,${lessonCode}`),
    own("module_unlocks", "reason,created_at,revoked_at,module:modules(number,title)"),
    supabase.auth.mfa.listFactors(),
  ]);
  const failed = [profile, roles, consents, deletion, enrollments, progress, quizzes, submissions, workshop, assessments, unlocks].find((r) => r.error);
  // Never hand over a partial export as if it were complete.
  if (failed) return Response.json({ error: "export_failed" }, { status: 500 });
  await supabase.rpc("log_event", { _action: "privacy.data_exported", _entity: "profile", _entity_id: user.id });

  const body = {
    exported_at: new Date().toISOString(),
    notice: "This file contains all personal data the Academy holds about you in its learning platform. Recordings are not included because the platform does not store recordings. Security logs kept for legitimate interests can be requested from student support.",
    account: { id: user.id, email: user.email, created_at: user.created_at, email_confirmed_at: user.email_confirmed_at, last_sign_in_at: user.last_sign_in_at },
    two_factor_authentication: (mfa.data?.totp ?? []).map((f) => ({ name: f.friendly_name, status: f.status, created_at: f.created_at })),
    profile: profile.data,
    roles: roles.data,
    consents: consents.data,
    deletion_requests: deletion.data,
    enrollments: enrollments.data,
    learning: {
      lesson_progress: progress.data,
      quiz_attempts: quizzes.data,
      assignment_submissions: submissions.data,
      workshop_progress: workshop.data,
      workshop_assessments: assessments.data,
      module_unlocks: unlocks.data,
    },
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="medical-speaking-academy-data-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "private, no-store",
    },
  });
}
