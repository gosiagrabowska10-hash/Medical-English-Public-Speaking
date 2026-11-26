import "server-only";
import { createHash } from "node:crypto";
import { createClient as createSupabase } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/config";

/**
 * Fixed-window rate limiting (audit SEC-08).
 * The client address is never stored: only a salted SHA-256 hash is used as the key.
 * Primary store: Postgres (public.rate_limit_hit), shared across server instances.
 * Fallback: per-instance memory, used only when the database is unavailable.
 */
const memory = new Map<string, { start: number; hits: number }>();

export function clientKey(req: Request) {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = fwd || req.headers.get("x-real-ip") || "unknown";
  const salt = process.env.RATE_LIMIT_SALT ?? "msa-rate-limit";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function rateLimit(scope: string, req: Request, max: number, windowSeconds: number): Promise<boolean> {
  const bucket = `${scope}:${clientKey(req)}`;
  if (isSupabaseConfigured) {
    const sb = createSupabase(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
    const { data, error } = await sb.rpc("rate_limit_hit", { _bucket: bucket, _max: max, _window_seconds: windowSeconds });
    if (!error) return data === true;
  }
  const now = Date.now();
  const e = memory.get(bucket);
  if (!e || now - e.start > windowSeconds * 1000) { memory.set(bucket, { start: now, hits: 1 }); return true; }
  e.hits += 1;
  return e.hits <= max;
}
