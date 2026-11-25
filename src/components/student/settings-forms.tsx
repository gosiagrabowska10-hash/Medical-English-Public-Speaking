"use client";

import { useActionState, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label, Select, Textarea, FieldHint } from "@/components/ui/form";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { requestDeletionAction, setConsentAction, updateProfileAction } from "@/lib/account-actions";
import type { FormState } from "@/lib/auth-actions";
import type { Profile } from "@/lib/auth";

const idle: FormState = { status: "idle" };

function Msg({ s }: { s: FormState }) {
  if (s.status === "idle" || !s.message) return null;
  return <p role={s.status === "error" ? "alert" : "status"} className={`text-sm ${s.status === "error" ? "text-danger" : "text-success"}`}>{s.message}</p>;
}

export function ProfileForm({ profile, email }: { profile: Profile; email: string }) {
  const [state, action, pending] = useActionState(updateProfileAction, idle);
  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-[110px_1fr_1fr]">
        <div><Label htmlFor="title">Title</Label><Select id="title" name="title" defaultValue={profile.title ?? "Dr"}>{["Dr", "Prof.", "Mr", "Ms", "Mx"].map((t) => <option key={t}>{t}</option>)}</Select></div>
        <div><Label htmlFor="first_name">First name</Label><Input id="first_name" name="first_name" defaultValue={profile.first_name} required maxLength={80} autoComplete="given-name" /></div>
        <div><Label htmlFor="last_name">Last name</Label><Input id="last_name" name="last_name" defaultValue={profile.last_name} required maxLength={80} autoComplete="family-name" /></div>
      </div>
      <div><Label htmlFor="email">Email address</Label><Input id="email" value={email} disabled readOnly /><FieldHint>To change your email address, please contact student support.</FieldHint></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><Label htmlFor="country">Country</Label><Input id="country" name="country" defaultValue={profile.country ?? ""} maxLength={80} autoComplete="country-name" /></div>
        <div><Label htmlFor="specialty">Specialty or role</Label><Input id="specialty" name="specialty" defaultValue={profile.specialty ?? ""} maxLength={120} /></div>
      </div>
      <div><Label htmlFor="timezone">Time zone</Label><Input id="timezone" name="timezone" defaultValue={profile.timezone ?? ""} placeholder="e.g. Europe/Warsaw" maxLength={64} /><FieldHint>Used to schedule live coaching sessions at a sensible time for you.</FieldHint></div>
      <div className="flex items-center gap-4"><Button type="submit" disabled={pending}>{pending ? "Saving…" : "Save profile"}</Button><Msg s={state} /></div>
    </form>
  );
}

export function ConsentToggle({ kind, granted, title, description }: { kind: "recording" | "marketing_email"; granted: boolean; title: string; description: string }) {
  const [value, setValue] = useState(granted);
  const [state, setState] = useState<FormState>(idle);
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-xl">
        <p className="flex items-center gap-3 font-medium text-ink">{title}<Badge tone={value ? "success" : "neutral"} dot>{value ? "Given" : "Not given"}</Badge></p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{description}</p>
        <div className="mt-2"><Msg s={state} /></div>
      </div>
      <Button
        variant={value ? "outline" : "primary"}
        size="sm"
        disabled={pending}
        onClick={() => start(async () => {
          const r = await setConsentAction(kind, !value);
          setState(r);
          if (r.status === "success") setValue(!value);
        })}
      >
        {pending ? "Saving…" : value ? "Withdraw consent" : "Give consent"}
      </Button>
    </div>
  );
}

export function DeletionRequest({ open }: { open: { status: string; created_at: string } | null }) {
  const [state, action, pending] = useActionState(requestDeletionAction, idle);
  if (open || state.status === "success") {
    return (
      <div role="status" className="rounded-sm bg-warning-bg p-5 text-sm text-warning">
        {state.status === "success" ? state.message : `Your deletion request (${open!.status.replace("_", " ")}) was received on ${new Date(open!.created_at).toLocaleDateString("en-GB")}. Our team will confirm by email.`}
      </div>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline" className="border-danger/60 text-danger hover:bg-danger hover:text-white">Request deletion of my data</Button></DialogTrigger>
      <DialogContent title="Delete my account and data" description="This asks the Academy to permanently delete your account, profile, recordings and learning records. Certain records, such as payment records, may need to be kept where the law requires it.">
        <form action={action} className="grid gap-5">
          <div><Label htmlFor="reason">Reason <span className="font-normal text-ink-subtle">(optional)</span></Label><Textarea id="reason" name="reason" maxLength={2000} className="min-h-24" /></div>
          <div><Label htmlFor="confirm">Type DELETE to confirm</Label><Input id="confirm" name="confirm" autoComplete="off" required /></div>
          <Msg s={state} />
          <div className="flex justify-end gap-3">
            <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
            <Button type="submit" disabled={pending} className="bg-danger hover:bg-danger/90">{pending ? "Submitting…" : "Submit request"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
