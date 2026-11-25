import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only routes that need the session: the student app, auth pages and callbacks.
  matcher: ["/app/:path*", "/app", "/login", "/register", "/forgot-password", "/reset-password", "/auth/:path*"],
};
