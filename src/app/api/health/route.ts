import { connection } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/config";

/**
 * Health check for uptime monitoring (audit SEC-05). Reports only up/down states;
 * no versions, keys or internal details.
 */
export async function GET() {
  await connection();
  let database: "ok" | "unavailable" | "not_configured" = "not_configured";
  if (isSupabaseConfigured) {
    const sb = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
    const { error } = await sb.from("modules").select("id", { head: true, count: "exact" }).limit(1);
    database = error ? "unavailable" : "ok";
  }
  const ok = database !== "unavailable";
  return Response.json({ status: ok ? "ok" : "degraded", database, checked_at: new Date().toISOString() }, { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
