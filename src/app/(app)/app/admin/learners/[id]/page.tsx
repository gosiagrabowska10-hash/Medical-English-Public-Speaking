import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle, CircleDot, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { LEARNER_ADMIN_ROLES, requireStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import { StaffGate } from "../../../staff/staff-gate";
import { EnrolmentStatusForm, RevokeForm, UnlockForm } from "../admin-forms";
import Loading from "../../../loading";

export const metadata = { title: "Learner record" };

export default function LearnerRecordPage({ params }: PageProps<"/app/admin/learners/[id]">) {
  return (
    <>
      <Link href="/app/admin/learners" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-midnight"><ArrowLeft className="size-4" aria-hidden /> All learners</Link>
      <Suspense fallback={<div className="mt-10"><Loading /></div>}><Record params={params} /></Suspense>
    </>
  );
}

type Lesson = { id: string; code: string; title: string; kind: string; module_id: string; is_mandatory: boolean; content_status: string };
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);

async function Record({ params }: { params: PageProps<"/app/admin/learners/[id]">["params"] }) {
  const { id } = await params;
  const { hasRole, mfaOk } = await requireStaff(LEARNER_ADMIN_ROLES, `/app/admin/learners/${id}`);
  if (!hasRole || !mfaOk) return <StaffGate hasRole={hasRole} />;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const supabase = (await createClient())!;
  const [{ data: all }, { data: enrolments }, { data: cohorts }, { data: mods }, { data: states }, { data: lessons }, { data: progress }, { data: attempts }, { data: subs }, { data: assess }, { data: unlocks }] = await Promise.all([
    supabase.rpc("admin_learners"),
    supabase.from("enrollments").select("id,status,cohort_id,cohort,starts_on,created_at").eq("user_id", id).order("created_at", { ascending: false }),
    supabase.from("cohorts").select("id,name,starts_on").order("name"),
    supabase.from("modules").select("id,number,title").order("number"),
    supabase.rpc("module_states", { _user: id }),
    supabase.from("lessons").select("id,code,title,kind,module_id,is_mandatory,content_status").order("position"),
    supabase.from("lesson_progress").select("lesson_id,status,started_at,completed_at").eq("user_id", id),
    supabase.from("quiz_attempts").select("lesson_id,score,total,passed,created_at").eq("user_id", id),
    supabase.from("assignment_submissions").select("lesson_id,status,submitted_at").eq("user_id", id),
    supabase.from("workshop_assessments").select("lesson_id,competent,assessed_at").eq("user_id", id).order("assessed_at", { ascending: false }),
    supabase.from("module_unlocks").select("id,module_id,reason,created_at,revoked_at").eq("user_id", id).order("created_at", { ascending: false }),
  ]);
  const learner = ((all ?? []) as { user_id: string; email: string; name: string; country: string | null; specialty: string | null; registered_at: string }[]).find((r) => r.user_id === id);
  if (!learner) notFound();
  const st = new Map(((states ?? []) as { module_id: string; unlocked: boolean; completed: boolean; unlocked_by_override: boolean }[]).map((s) => [s.module_id, s]));
  const prog = new Map((progress ?? []).map((p) => [p.lesson_id, p]));
  const activeUnlock = new Map((unlocks ?? []).filter((u) => !u.revoked_at).map((u) => [u.module_id, u]));
  const ls = (lessons ?? []) as Lesson[];
  const done = ls.filter((l) => prog.get(l.id)?.status === "completed").length;

  return (
    <div className="mt-6 space-y-6">
      <header>
        <Eyebrow className="mb-3"><Rule />Learner record</Eyebrow>
        <h1 className="font-serif text-h2 text-midnight">{learner.name || learner.email}</h1>
        <p className="mt-2 text-sm text-ink-subtle">{learner.email}{learner.specialty ? ` · ${learner.specialty}` : ""}{learner.country ? ` · ${learner.country}` : ""} · registered {formatDate(learner.registered_at)} · {done} of {ls.length} items completed ({pct(done, ls.length)}%)</p>
      </header>

      <Card className="p-7 md:p-8">
        <h2 className="font-serif text-2xl text-midnight">Enrolment</h2>
        {(enrolments ?? []).length === 0 ? <p className="mt-2 text-sm text-ink-muted">Not enrolled. Use “Enrol a learner” on the learner list.</p> : (
          <div className="mt-4 space-y-6">{enrolments!.map((e) => (
            <div key={e.id} className="border-t border-stone pt-4 first:border-0 first:pt-0">
              <p className="text-sm text-ink-muted">Enrolment #{e.id} · created {formatDate(e.created_at)}{e.cohort ? ` · cohort ${e.cohort}` : ""}{e.starts_on ? ` · starts ${formatDate(e.starts_on)}` : ""}</p>
              <div className="mt-3"><EnrolmentStatusForm enrolment={e.id} learner={id} status={e.status} cohortId={e.cohort_id} cohorts={cohorts ?? []} /></div>
            </div>
          ))}</div>
        )}
      </Card>

      <section aria-labelledby="mods-h">
        <h2 id="mods-h" className="font-serif text-2xl text-midnight">Modules and progress</h2>
        <p className="mt-1 text-sm text-ink-muted">Modules open in order as each is completed. An override opens one module for this learner; lessons the learner has started always stay open.</p>
        <ol className="mt-4 space-y-4">
          {(mods ?? []).map((m) => {
            const s = st.get(m.id); const items = ls.filter((l) => l.module_id === m.id);
            const c = items.filter((l) => prog.get(l.id)?.status === "completed").length; const u = activeUnlock.get(m.id);
            const label = `Module ${String(m.number).padStart(2, "0")}`;
            return (
              <li key={m.id}><Card className="p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-xl text-midnight">{label} · {m.title}</h3>
                  {s?.completed && c > 0 ? <Badge tone="success">Completed</Badge> : s?.unlocked_by_override ? <Badge tone="info">Unlocked by override</Badge> : s?.unlocked ? <Badge tone="gold">Open</Badge> : <Badge tone="neutral"><Lock className="size-3" aria-hidden /> Locked</Badge>}
                  <span className="text-sm text-ink-subtle">{c} of {items.length} completed</span>
                </div>
                <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
                  {items.map((l) => {
                    const p = prog.get(l.id); const a = (attempts ?? []).filter((x) => x.lesson_id === l.id);
                    const best = a.reduce((n, x) => Math.max(n, x.score), 0); const passed = a.some((x) => x.passed);
                    const sub = (subs ?? []).find((x) => x.lesson_id === l.id); const ws = (assess ?? []).find((x) => x.lesson_id === l.id);
                    const Icon = p?.status === "completed" ? CheckCircle2 : p ? CircleDot : Circle;
                    return (
                      <li key={l.id} className="flex gap-2">
                        <Icon aria-hidden className={`mt-0.5 size-4 shrink-0 ${p?.status === "completed" ? "text-success" : "text-ink-subtle"}`} />
                        <span><span className="text-midnight">{l.code}</span> <span className="text-ink-muted">{l.title}</span>
                          <span className="block text-xs text-ink-subtle">
                            {p?.status === "completed" ? `Completed ${formatDate(p.completed_at!)}` : p ? "In progress" : l.content_status === "in_preparation" ? "Content in preparation" : "Not started"}
                            {a.length > 0 && ` · quiz ${best}/${a[0].total}${passed ? " passed" : ""} (${a.length} attempt${a.length > 1 ? "s" : ""})`}
                            {sub && ` · assignment ${sub.status.replace("_", " ")}`}
                            {l.kind === "workshop" && (ws ? ` · ${ws.competent ? "Competent confirmed" : "not yet Competent"}` : p?.status === "completed" ? " · awaiting instructor assessment" : "")}
                          </span></span>
                      </li>
                    );
                  })}
                </ul>
                {u ? (
                  <div className="mt-4 border-t border-stone pt-3 text-sm text-ink-muted">Override since {formatDate(u.created_at)}: “{u.reason}”<div className="mt-2"><RevokeForm unlock={u.id} learner={id} label={label} /></div></div>
                ) : !s?.unlocked ? (
                  <div className="mt-4 border-t border-stone pt-3"><UnlockForm learner={id} module={m.id} label={label} /></div>
                ) : null}
              </Card></li>
            );
          })}
        </ol>
      </section>

      {(unlocks ?? []).some((u) => u.revoked_at) && (
        <section aria-labelledby="hist-h"><h2 id="hist-h" className="font-serif text-2xl text-midnight">Override history</h2>
          <ul className="mt-2 space-y-1 text-sm text-ink-muted">{unlocks!.filter((u) => u.revoked_at).map((u) => <li key={u.id}>{(mods ?? []).find((m) => m.id === u.module_id)?.title}: unlocked {formatDate(u.created_at)}, revoked {formatDate(u.revoked_at!)} — “{u.reason}”</li>)}</ul>
        </section>
      )}
    </div>
  );
}
