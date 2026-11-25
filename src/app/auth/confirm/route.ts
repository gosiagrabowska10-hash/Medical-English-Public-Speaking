import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/** Handles email confirmation and password-recovery links (PKCE code or token hash). */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const rawNext = searchParams.get("next") ?? "/app";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/app";
  const supabase = await createClient();
  if (!supabase) return NextResponse.redirect(`${origin}/login`);

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
      : { error: new Error("missing token") };

  if (error) return NextResponse.redirect(`${origin}/login?error=link_invalid`);
  if (type === "signup" || (!type && next === "/app")) await supabase.rpc("log_event", { _action: "auth.email_confirmed" });
  return NextResponse.redirect(`${origin}${next}`);
}
