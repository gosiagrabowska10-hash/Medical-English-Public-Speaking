import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { ASSESSOR_ROLES, requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import { StaffGate } from "../staff-gate";
import Loading from "../../loading";

export const metadata = { title: "Workshop assessments" };

export default function AssessmentsPage() {
  return (
    <>
      <Eyebrow className="mb-4"><Rule />Staff</Eyebrow>
      <h1 className="font-serif text-h1 text-midnight">Workshop assessments</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">Learners who have submitted a workshop Final Task. Confirm the Competent status only after observing the learner’s Round 3 performance live; their self-assessment is shown for context and is never a substitute.</p>
      <Suspense fallback={<div className="mt-10"><Loading /></div>}><List /></Suspense>
    </>
  );
}

type Row = { id: number; user_id: string; lesson_id: string; status: string; submitted_at: string; lesson: { code: string; title: string; kind: string } | null };

async function List() {
  const { hasRole, mfaOk } = await requireStaff(ASSESSOR_ROLES, "/app/staff/assessments");
  if (!hasRole || !mfaOk) return <StaffGate hasRole={hasRole} />;
  const supabase = (await createClient())!;
  const { data } = await supabase.from("assignment_submissions").select("id,user_id,lesson_id,status,submitted_at,lesson:lessons!inner(code,title,kind)").eq("lesson.kind", "workshop").order("submitted_at");
  const rows = (data ?? []) as unknown as Row[];
  const ids = [...new Set(rows.map((r) => r.user_id))];
  const { data: people } = ids.length ? await supabase.from("profiles").select("id,title,first_name,last_name").in("id", ids) : { data: [] };
  const name = (id: string) => { const p = people?.find((x) => x.id === id); return p ? [p.title, p.first_name, p.last_name].filter(Boolean).join(" ") : "Learner"; };
  const tone = { submitted: "gold", approved: "success", needs_revision: "warning" } as const;
  const label = { submitted: "Awaiting assessment", approved: "Competent confirmed", needs_revision: "Not yet Competent" } as const;
  if (!rows.length) return <p className="mt-10 text-sm text-ink-muted">No workshop Final Tasks have been submitted yet.</p>;
  return (
    <ul className="mt-10 divide-y divide-stone rounded-sm bg-white shadow-hairline">
      {rows.map((r) => (
        <li key={r.id}>
          <Link href={`/app/staff/assessments/${r.id}`} className="flex flex-wrap items-center gap-4 p-5 hover:bg-ivory/60">
            <span className="w-12 font-serif text-2xl text-gold-muted">{r.lesson?.code}</span>
            <span className="min-w-0 flex-1"><span className="block font-medium text-midnight">{name(r.user_id)}</span><span className="text-sm text-ink-subtle">{r.lesson?.title} · submitted {formatDate(r.submitted_at)}</span></span>
            <Badge tone={tone[r.status as keyof typeof tone] ?? "neutral"}>{label[r.status as keyof typeof label] ?? r.status}</Badge>
          </Link>
        </li>
      ))}
    </ul>
  );
}
