import "server-only";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/** Single source of truth for which external integrations are configured. */
export const integrations = {
  email: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_INBOX),
  supabase: isSupabaseConfigured,
  stripe: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
  openai: Boolean(process.env.OPENAI_API_KEY),
};
