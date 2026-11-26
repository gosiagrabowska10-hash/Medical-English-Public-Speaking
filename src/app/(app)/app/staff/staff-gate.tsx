import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Shown when a staff page is opened without the role or without an MFA-verified session. */
export function StaffGate({ hasRole }: { hasRole: boolean }) {
  return (
    <div className="mt-10 max-w-xl rounded-sm bg-white p-8 shadow-hairline">
      <ShieldAlert aria-hidden className="size-6 text-gold-deep" strokeWidth={1.5} />
      <h2 className="mt-4 font-serif text-2xl text-midnight">{hasRole ? "Two-factor authentication required" : "Staff access only"}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        {hasRole
          ? "Staff tools give access to learners’ work. Set up two-factor authentication in Account Settings, then sign in again with your authenticator code."
          : "This area is available to instructors and assessors."}
      </p>
      {hasRole && <Button asChild className="mt-6"><Link href="/app/settings#security">Set up two-factor authentication</Link></Button>}
    </div>
  );
}
