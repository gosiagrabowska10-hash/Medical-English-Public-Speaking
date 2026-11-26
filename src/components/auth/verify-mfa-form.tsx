"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldHint } from "@/components/ui/form";
import { verifyMfaAction } from "@/lib/mfa-actions";

export function VerifyMfaForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(verifyMfaAction, {});
  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <Label htmlFor="code">Authentication code</Label>
        <Input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} required autoFocus aria-invalid={!!state.message} aria-describedby="code-hint" />
        <FieldHint id="code-hint">Lost access to your authenticator? Contact student support; for security, we verify your identity before resetting it.</FieldHint>
      </div>
      {state.message && <p role="alert" className="text-sm text-danger">{state.message}</p>}
      <Button type="submit" disabled={pending}>{pending ? "Verifying…" : "Verify and continue"}</Button>
    </form>
  );
}
