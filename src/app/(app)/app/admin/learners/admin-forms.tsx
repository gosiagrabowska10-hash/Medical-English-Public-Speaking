"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/form";
import { createCohortAction, enrolAction, revokeUnlockAction, setEnrolmentAction, unlockModuleAction, type AdminState } from "@/lib/admin-actions";

const idle: AdminState = { status: "idle" };
function Msg({ s }: { s: AdminState }) {
  if (!s.message) return null;
  return <p role={s.status === "error" ? "alert" : "status"} className={`text-sm ${s.status === "error" ? "text-danger" : "text-success"}`}>{s.message}</p>;
}
type Cohort = { id: string; name: string; starts_on: string | null };

export function EnrolForm({ cohorts }: { cohorts: Cohort[] }) {
  const [state, action, pending] = useActionState(enrolAction, idle);
  return (
    <form action={action} className="grid gap-4 md:grid-cols-[1.4fr_1fr_auto] md:items-end">
      <div><Label htmlFor="enrol-email">Learner&rsquo;s email address</Label><Input id="enrol-email" name="email" type="email" required autoComplete="off" /></div>
      <div><Label htmlFor="enrol-cohort">Cohort</Label>
        <Select id="enrol-cohort" name="cohort" defaultValue=""><option value="">No cohort</option>{cohorts.map((c) => <option key={c.id} value={c.id}>{c.name}{c.starts_on ? ` · starts ${c.starts_on}` : ""}</option>)}</Select></div>
      <Button type="submit" disabled={pending}>{pending ? "Enrolling…" : "Enrol learner"}</Button>
      <div className="md:col-span-3"><Msg s={state} /></div>
    </form>
  );
}

export function CohortForm() {
  const [state, action, pending] = useActionState(createCohortAction, idle);
  return (
    <form action={action} className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_auto] md:items-end">
      <div><Label htmlFor="cohort-name">Cohort name</Label><Input id="cohort-name" name="name" required maxLength={80} /></div>
      <div><Label htmlFor="cohort-start">Start date</Label><Input id="cohort-start" name="starts_on" type="date" /></div>
      <Button type="submit" variant="outline" disabled={pending}>{pending ? "Creating…" : "Create cohort"}</Button>
      <div className="md:col-span-3"><Msg s={state} /></div>
    </form>
  );
}

export function EnrolmentStatusForm({ enrolment, learner, status, cohortId, cohorts }: { enrolment: number; learner: string; status: string; cohortId: string | null; cohorts: Cohort[] }) {
  const [state, action, pending] = useActionState(setEnrolmentAction, idle);
  return (
    <form action={action} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <input type="hidden" name="enrolment" value={enrolment} /><input type="hidden" name="learner" value={learner} />
      <div><Label htmlFor={`st-${enrolment}`}>Enrolment status</Label>
        <Select id={`st-${enrolment}`} name="status" defaultValue={status}>
          <option value="active">Active</option><option value="paused">Paused</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
        </Select></div>
      <div><Label htmlFor={`co-${enrolment}`}>Cohort</Label>
        <Select id={`co-${enrolment}`} name="cohort" defaultValue={cohortId ?? ""}><option value="">Keep current</option>{cohorts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</Select></div>
      <Button type="submit" variant="outline" disabled={pending}>Save</Button>
      <div className="md:col-span-3"><Msg s={state} /></div>
    </form>
  );
}

export function UnlockForm({ learner, module, label }: { learner: string; module: string; label: string }) {
  const [state, action, pending] = useActionState(unlockModuleAction, idle);
  return (
    <form action={action} className="grid gap-2">
      <input type="hidden" name="learner" value={learner} /><input type="hidden" name="module" value={module} />
      <Label htmlFor={`reason-${module}`}>Reason for unlocking {label}</Label>
      <Textarea id={`reason-${module}`} name="reason" rows={2} required minLength={5} maxLength={500} />
      <div className="flex items-center gap-3"><Button type="submit" size="sm" variant="outline" disabled={pending}>Unlock module</Button><Msg s={state} /></div>
    </form>
  );
}

export function RevokeForm({ unlock, learner, label }: { unlock: number; learner: string; label: string }) {
  const [state, action, pending] = useActionState(revokeUnlockAction, idle);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="unlock" value={unlock} /><input type="hidden" name="learner" value={learner} />
      <Button type="submit" size="sm" variant="ghost" disabled={pending} aria-label={`Revoke unlock of ${label}`}>Revoke unlock</Button><Msg s={state} />
    </form>
  );
}
