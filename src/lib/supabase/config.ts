/**
 * Public Supabase configuration. The URL and publishable (anon) key are safe
 * in the browser: every table is protected by Row Level Security.
 * The service-role key is NOT used in Stage 2 and must never be exposed.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
