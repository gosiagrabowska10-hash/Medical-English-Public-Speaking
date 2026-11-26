"use client";

import { useState, useTransition } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label, FieldHint } from "@/components/ui/form";
import { confirmTotpEnrolment, removeTotpFactor, startTotpEnrolment } from "@/lib/mfa-actions";

type Factor = { id: string; name: string; created: string };

export function MfaPanel({ factors, isStaff, aal }: { factors: Factor[]; isStaff: boolean; aal: "aal1" | "aal2" }) {
  const [pending, start] = useTransition();
  const [enrol, setEnrol] = useState<{ factorId: string; qr: string; secret: string } | null>(null);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ kind: "error" | "ok"; text: string } | null>(null);
  const enabled = factors.length > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <ShieldCheck aria-hidden className="size-5 text-gold-deep" strokeWidth={1.5} />
        <span className="text-sm font-semibold text-midnight">Two-factor authentication</span>
        {enabled ? <Badge tone="success">On</Badge> : <Badge tone="neutral">Off</Badge>}
        {enabled && <span className="text-sm text-ink-muted">This session: {aal === "aal2" ? "verified with your authenticator" : "not yet verified"}</span>}
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
        {isStaff
          ? "Staff accounts can see learners’ work, so two-factor authentication is required: staff tools and learner data stay locked until you sign in with your authenticator app."
          : "Optional for learners. After you set it up, signing in will also ask for a 6-digit code from an authenticator app on your phone."}
      </p>

      {enabled && (
        <ul className="divide-y divide-stone rounded-sm border border-stone bg-white">
          {factors.map((f) => (
            <li key={f.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
              <span><span className="font-medium text-midnight">{f.name}</span> <span className="text-ink-subtle">· added {f.created}</span></span>
              <Button variant="ghost" size="sm" disabled={pending} onClick={() => start(async () => {
                const r = await removeTotpFactor(f.id);
                setMsg(r.ok ? { kind: "ok", text: "The authenticator was removed." } : { kind: "error", text: r.message });
              })}>Remove</Button>
            </li>
          ))}
        </ul>
      )}

      {!enabled && !enrol && (
        <Button disabled={pending} onClick={() => start(async () => {
          setMsg(null);
          const r = await startTotpEnrolment();
          if (r.ok) setEnrol(r); else setMsg({ kind: "error", text: r.message });
        })}>Set up two-factor authentication</Button>
      )}

      {enrol && (
        <div className="grid gap-6 rounded-sm border border-stone bg-white p-5 md:grid-cols-[180px_1fr]">
          {/* eslint-disable-next-line @next/next/no-img-element -- data URL from Supabase Auth */}
          <img src={enrol.qr} alt="QR code to add The Medical Speaking Academy to your authenticator app" width={180} height={180} className="bg-white" />
          <div className="space-y-4 text-sm text-ink-muted">
            <ol className="list-decimal space-y-1 pl-5">
              <li>Open an authenticator app (for example Microsoft Authenticator, Google Authenticator or 1Password).</li>
              <li>Scan the QR code, or enter this key manually: <code className="break-all font-mono text-midnight">{enrol.secret}</code></li>
              <li>Enter the 6-digit code the app shows.</li>
            </ol>
            <form className="flex flex-wrap items-end gap-3" onSubmit={(e) => { e.preventDefault(); start(async () => {
              const r = await confirmTotpEnrolment(enrol.factorId, code);
              if (r.ok) { setEnrol(null); setCode(""); setMsg({ kind: "ok", text: "Two-factor authentication is now on." }); }
              else setMsg({ kind: "error", text: r.message });
            }); }}>
              <div>
                <Label htmlFor="totp-code">6-digit code</Label>
                <Input id="totp-code" inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} className="w-36" required />
              </div>
              <Button type="submit" disabled={pending}>Verify and turn on</Button>
            </form>
            <FieldHint>Keep the key somewhere safe. If you lose your phone, contact student support to restore access.</FieldHint>
          </div>
        </div>
      )}
      {msg && <p role={msg.kind === "error" ? "alert" : "status"} className={`text-sm ${msg.kind === "error" ? "text-danger" : "text-success"}`}>{msg.text}</p>}
    </div>
  );
}
