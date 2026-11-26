import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { ASSESSOR_ROLES, requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import type { RubricCriterion } from "@/content/lesson-types";
import { AssessmentForm } from "./assessment-form";
import { StaffGate } from "../../staff-gate";
import Loading from "../../../loading";

export const metadata = { title: "Assess workshop" };

export default function AssessPage({ params }: PageProps<"/app/staff/assessments/[id]">) {
  return (
    <>
      <Link href="/app/staff/assessments" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-midnight"><ArrowLeft className="size-4" aria-hidden /> All assessments</Link>
      <Suspense fallback={<div className="mt-10"><Loading /></div>}><Assess params={params} /></Suspense>
    </>
  );
}

async function Assess({ params }: { params: PageProps<"/app/staff/assessments/[id]">["params"] }) {
  const { id } = await params;
  const { user, hasRole, mfaOk } = await requireStaff(ASSESSOR_ROLES, `/app/staff/assessments/${id}`);
  if (!hasRole || !mfaOk) return <StaffGate hasRole={hasRole} />;
  const supabase = (await createClient())!;
  const { data: sub } = await supabase.from("assignment_submissions").select("id,user_id,lesson_id,body,status,submitted_at,lesson:lessons!inner(code,title,kind)").eq("id", Number(id) || 0).eq("lesson.kind", "workshop").maybeSingle();
  if (!sub) notFound();
  const lesson = sub.lesson as unknown as { code: string; title: string };
  const [{ data: person }, { data: content }, { data: r3 }, { data: history }] = await Promise.all([
    supabase.from("profiles").select("title,first_name,last_name,specialty,country").eq("id", sub.user_id).single(),
    supabase.from("lesson_content").select("body").eq("lesson_id", sub.lesson_id).single(),
    supabase.from("workshop_progress").select("data,completed_at").eq("user_id", sub.user_id).eq("lesson_id", sub.lesson_id).eq("step_key", "round3").maybeSingle(),
    supabase.from("workshop_assessments").select("competent,levels,comment,basis,assessed_at").eq("user_id", sub.user_id).eq("lesson_id", sub.lesson_id).order("assessed_at", { ascending: false }),
  ]);
  const rubric = ((content?.body as { workshop?: { rubric: RubricCriterion[] } })?.workshop?.rubric ?? []);
  const self = ((r3?.data as { ratings?: Record<string, string> })?.ratings) ?? {};
  const name = person ? [person.title, person.first_name, person.last_name].filter(Boolean).join(" ") : "Learner";
  const self_ = sub.user_id === user.id;

  return (
    <div className="mt-6 space-y-8">
      <div>
        <Eyebrow className="mb-3"><Rule />{lesson.code} · {lesson.title}</Eyebrow>
        <h1 className="font-serif text-h2 text-midnight">{name}</h1>
        <p className="mt-2 text-sm text-ink-subtle">{[person?.specialty, person?.country].filter(Boolean).join(" · ")}{person?.specialty || person?.country ? " · " : ""}Final Task submitted {formatDate(sub.submitted_at)}</p>
      </div>

      <section aria-labelledby="ft-h" className="rounded-sm bg-white p-6 shadow-hairline md:p-8">
        <h2 id="ft-h" className="font-serif text-2xl text-midnight">Final Task</h2>
        <div className="mt-4 whitespace-pre-wrap text-[0.9375rem] leading-relaxed text-ink">{sub.body}</div>
      </section>

      <section aria-labelledby="self-h" className="rounded-sm bg-ivory-deep/50 p-6 md:p-8">
        <h2 id="self-h" className="font-serif text-2xl text-midnight">Learner’s self-assessment (Round 3)</h2>
        <p className="mt-1 text-sm text-ink-muted">For context only. It is the learner’s own judgement and does not count towards the Competent status.</p>
        <ul className="mt-4 grid gap-1 text-sm sm:grid-cols-2">
          {rubric.map((c, i) => <li key={c.title}><span className="text-ink-muted">{c.number}. {c.title}:</span> <span className="text-midnight">{self[`c${i + 1}`] ?? "—"}</span></li>)}
        </ul>
      </section>

      {history && history.length > 0 && (
        <section aria-labelledby="hist-h">
          <h2 id="hist-h" className="font-serif text-2xl text-midnight">Previous assessments</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {history.map((h) => <li key={h.assessed_at}>{formatDate(h.assessed_at)} — {h.competent ? "Competent" : "Not yet Competent"}: {h.comment}</li>)}
          </ul>
        </section>
      )}

      {self_ ? <p className="text-sm text-danger">You cannot assess your own work.</p> : (
        <AssessmentForm learner={sub.user_id} lesson={sub.lesson_id} submission={sub.id} rubric={rubric.map((c) => ({ number: c.number, title: c.title, mandatory: c.mandatory, levels: c.levels }))} />
      )}
    </div>
  );
}
