import { LogOut } from "lucide-react";
import { requireUser, displayName } from "@/lib/auth";
import { signOutAction } from "@/lib/auth-actions";

export async function UserFooter() {
  const { profile, email } = await requireUser();
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="flex size-9 shrink-0 items-center justify-center border border-gold/60 font-serif text-sm text-gold-light">
        {profile.first_name.charAt(0)}{profile.last_name.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-ivory">{displayName(profile)}</p>
        <p className="truncate text-xs text-ivory/50">{email}</p>
      </div>
      <form action={signOutAction}>
        <button type="submit" className="rounded-xs p-2 text-ivory/60 hover:bg-white/5 hover:text-ivory" aria-label="Sign out"><LogOut className="size-4" /></button>
      </form>
    </div>
  );
}
