import { createClient } from "@/lib/supabase/server";

/** GDPR data export: everything the signed-in user can read about themselves. */
export async function GET() {
  const supabase = await createClient();
  if (!supabase) return Response.json({ error: "not_configured" }, { status: 503 });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });

  const [profile, roles, consents, deletion] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("user_roles").select("role,created_at").eq("user_id", user.id),
    supabase.from("consents").select("kind,granted,version,created_at").eq("user_id", user.id).order("created_at"),
    supabase.from("data_deletion_requests").select("status,reason,created_at,processed_at").eq("user_id", user.id),
  ]);
  await supabase.rpc("log_event", { _action: "privacy.data_exported", _entity: "profile", _entity_id: user.id });

  const body = {
    exported_at: new Date().toISOString(),
    account: { id: user.id, email: user.email, created_at: user.created_at, email_confirmed_at: user.email_confirmed_at },
    profile: profile.data,
    roles: roles.data,
    consents: consents.data,
    deletion_requests: deletion.data,
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="medical-speaking-academy-data-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "private, no-store",
    },
  });
}
