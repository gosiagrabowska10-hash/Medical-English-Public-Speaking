import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { LEARNER_ADMIN_ROLES, requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import { StaffGate } from "../../staff/staff-gate";
import { CohortForm, EnrolForm } from "./admin-forms";
import Loading from "../../loading";

export const metadata = { title: "Learners and enrolment" };

export default function LearnersPage() {
  return (
    <>
      <Eyebrow className="mb-4"><Rule />Administration</Eyebrow>
      <h1 className="font-serif text-h1 text-midnight">Learners and enrolment</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">Enrol registered learners, organise cohorts and open learners&rsquo; course records. Every action is recorded in the audit log.</p>
      <Suspense fallback={<div className="mt-10"><Loading /></div>}><Learners /></Suspense>
    </>
  );
}

type Row = { user_id: string; email: string; name: string; country: string | null; specialty: string | null; registered_at: string; enrolment_id: number | null; enrolment_status: string | null; cohort_name: string | null; completed_items: number; last_activity: string | null };
const tone = { active: "success", paused: "warning", completed: "info", cancelled: "neutral" } as const;

async function Learners() {
  const { hasRole, mfaOk } = await requireStaff(LEARNER_ADMIN_ROLES, "/app/admin/learners");
  if (!hasRole || !mfaOk) return <StaffGate hasRole={hasRole} />;
  const supabase = (await createClient())!;
  const [{ data: rows }, { data: cohorts }, { count: total }] = await Promise.all([
    supabase.rpc("admin_learners"),
    supabase.from("cohorts").select("id,name,starts_on").order("starts_on", { ascending: false, nullsFirst: false }),
    supabase.from("lessons").select("id", { count: "exact", head: true }).eq("is_mandatory", true),
  ]);
  const learners = (rows ?? []) as Row[];
  return (
    <div className="mt-10 space-y-6">
      <Card className="p-7 md:p-8">
        <h2 className="font-serif text-2xl text-midnight">Enrol a learner</h2>
        <p className="mt-1 text-sm text-ink-muted">The learner must first create an account. Enrolment opens Module 1; later modules open in order as modules are completed.</p>
        <div className="mt-5"><EnrolForm cohorts={cohorts ?? []} /></div>
      </Card>
      <Card className="p-7 md:p-8">
        <h2 className="font-serif text-2xl text-midnight">Cohorts</h2>
        {(cohorts ?? []).length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">{cohorts!.map((c) => <li key={c.id}><Badge tone="gold">{c.name}{c.starts_on ? ` · ${formatDate(c.starts_on)}` : ""}</Badge></li>)}</ul>
        )}
        <div className="mt-5"><CohortForm /></div>
      </Card>
      <section aria-labelledby="learners-h">
        <h2 id="learners-h" className="font-serif text-2xl text-midnight">Learners ({learners.length})</h2>
        {learners.length === 0 ? <p className="mt-3 text-sm text-ink-muted">No learner accounts yet.</p> : (
          <div className="mt-3 overflow-x-auto rounded-sm bg-white shadow-hairline" tabIndex={0} role="region" aria-labelledby="learners-h">
            <table className="w-full min-w-[760px] text-left text-sm">
              <caption className="sr-only">Learner accounts with enrolment status and progress</caption>
              <thead><tr className="border-b border-stone text-xs uppercase tracking-[0.12em] text-ink-subtle">
                <th scope="col" className="p-3 font-semibold">Learner</th><th scope="col" className="p-3 font-semibold">Enrolment</th><th scope="col" className="p-3 font-semibold">Cohort</th><th scope="col" className="p-3 font-semibold">Completed</th><th scope="col" className="p-3 font-semibold">Last activity</th>
              </tr></thead>
              <tbody className="divide-y divide-stone">
                {learners.map((r) => (
                  <tr key={r.user_id}>
                    <td className="p-3"><Link href={`/app/admin/learners/${r.user_id}`} className="font-medium text-midnight underline decoration-gold underline-offset-4">{r.name || "—"}</Link><span className="block text-xs text-ink-subtle">{r.email}</span></td>
                    <td className="p-3">{r.enrolment_status ? <Badge tone={tone[r.enrolment_status as keyof typeof tone] ?? "neutral"}>{r.enrolment_status}</Badge> : <span className="text-ink-subtle">Not enrolled</span>}</td>
                    <td className="p-3 text-ink-muted">{r.cohort_name ?? "—"}</td>
                    <td className="p-3 lining-nums text-ink-muted">{r.completed_items} of {total ?? "—"}</td>
                    <td className="p-3 text-ink-muted">{r.last_activity ? formatDate(r.last_activity) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
