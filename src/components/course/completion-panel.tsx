"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CheckCircle2, Circle, Clock3, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { completeLessonAction } from "@/lib/course-actions";
import type { LessonPage } from "@/lib/course";

const lessonLabels: Record<string, string> = {
  exercise: "Save the practical exercise",
  quiz: "Pass the knowledge check (70%)",
  assignment: "Submit the assignment",
  content_in_preparation: "Lesson content is still in preparation",
  unavailable: "Requirements could not be checked. Please reload the page.",
};
const workshopLabels: Record<string, string> = {
  ...lessonLabels,
  exercise: "Log your practice rounds",
  quiz: "Pass the readiness check (70%)",
  assignment: "Submit the final task",
  practice_rounds: "Complete all three practice rounds",
};

const BASIS: Record<string, string> = {
  live_session: "observed live in a facilitated workshop or coaching session",
  recording_shown_live: "your Round 3 recording, played by you during a live session (not uploaded or stored)",
};

/** Workshops have two separate statuses; self-assessment never sets the second one. */
function WorkshopStatuses({ page, done }: { page: LessonPage; done: boolean }) {
  const a = page.assessment;
  const rubric = page.content?.body.workshop?.rubric ?? [];
  return (
    <div className="mt-6 space-y-4 border-t border-stone pt-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">Your workshop statuses</h3>
      <div className="flex gap-3 text-sm">
        {done ? <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-success" /> : <Circle aria-hidden className="mt-0.5 size-4 shrink-0 text-stone-deep" />}
        <p><span className="font-semibold text-midnight">Workshop Completed</span> — {done ? "achieved" : "not yet"}<br /><span className="text-ink-muted">All required activities done and the written Final Task submitted.</span></p>
      </div>
      <div className="flex gap-3 text-sm">
        {a?.competent ? <UserCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-success" /> : <Clock3 aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-deep" />}
        <div>
          <p>
            <span className="font-semibold text-midnight">Competent</span> — {a ? (a.competent ? `confirmed by an instructor on ${new Date(a.assessed_at).toLocaleDateString("en-GB")}` : "not yet confirmed: see your instructor’s feedback") : "awaiting instructor assessment"}
            <br /><span className="text-ink-muted">Confirmed only by an instructor using the assessment rubric{a ? `, based on ${BASIS[a.basis]}` : ""}. Your own self-assessment helps you prepare but is not an independent assessment.</span>
          </p>
          {a && (
            <div className="mt-3 rounded-sm bg-ivory p-4">
              <ul className="space-y-1 text-[0.8125rem] text-ink-muted">
                {rubric.map((r, i) => <li key={r.title}><span className="text-midnight">{r.title}</span>: {a.levels[i] ? a.levels[i][0].toUpperCase() + a.levels[i].slice(1) : "—"}</li>)}
              </ul>
              <p className="mt-3 text-sm text-ink"><span className="font-semibold">Instructor feedback:</span> {a.comment}</p>
            </div>
          )}
          {!a && <p className="mt-2 text-[0.8125rem] text-ink-subtle">Assessment takes place when an instructor observes your Round 3 performance live. Recordings are never uploaded to the platform at this stage.</p>}
        </div>
      </div>
    </div>
  );
}

export function CompletionPanel({ page }: { page: LessonPage }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const done = page.progress?.status === "completed";
  const n = page.quiz.length, pass = Math.ceil((n * 7) / 10); // same rule as submit_quiz: score × 10 ≥ total × 7
  const labels: Record<string, string> = {
    ...(page.lesson.kind === "workshop" ? workshopLabels : lessonLabels),
    quiz: `Pass the ${page.lesson.kind === "workshop" ? "readiness" : "knowledge"} check (at least ${pass} of ${n} correct)`,
  };
  const noun = page.lesson.kind === "workshop" ? "workshop" : "lesson";
  const c = page.content!;
  const reqs = [
    ...(c.exercise ? ["exercise"] : []),
    ...(page.quiz.length ? ["quiz"] : []),
    ...(page.lesson.kind === "workshop" && c.body.workshop ? ["practice_rounds"] : []),
    ...(c.assignment?.required ? ["assignment"] : []),
  ];

  if (page.lesson.content_status === "in_preparation") {
    return (
      <div className="rounded-sm border border-dashed border-stone-deep p-6 text-sm text-ink-muted">
        This {page.lesson.kind === "workshop" ? "workshop" : "lesson"} cannot be completed yet because its full content is still in preparation.
      </div>
    );
  }

  return (
    <section aria-labelledby="completion-h" className="rounded-sm bg-white p-6 shadow-hairline md:p-7">
      <h2 id="completion-h" className="font-serif text-2xl text-midnight">{done ? (noun === "workshop" ? "Workshop Completed" : "Lesson completed") : "Completion requirements"}</h2>
      <ul className="mt-4 space-y-2.5">
        {reqs.map((r) => {
          const met = !page.missing.includes(r);
          return (
            <li key={r} className="flex items-center gap-3 text-sm">
              {met ? <CheckCircle2 aria-hidden className="size-4 text-success" /> : <Circle aria-hidden className="size-4 text-stone-deep" />}
              <span className={met ? "text-ink-muted" : "text-ink"}>{labels[r]}</span>
              <span className="sr-only">{met ? "done" : "not done"}</span>
            </li>
          );
        })}
      </ul>
      {done ? (
        <p role="status" className="mt-5 text-sm text-success">Completed on {new Date(page.progress!.completed_at!).toLocaleDateString("en-GB")}.</p>
      ) : (
        <>
          <Button
            className="mt-6 w-full"
            disabled={pending || page.missing.length > 0}
            onClick={() => start(async () => { const r = await completeLessonAction(page.lesson.id, page.lesson.code); setMsg(r.ok ? null : r.message); router.refresh(); })}
          >
            {pending ? "Saving…" : `Mark ${noun} as complete`}
          </Button>
          {page.missing.includes("unavailable") && <p role="alert" className="mt-3 text-sm text-danger">{labels.unavailable}</p>}
          {page.missing.length > 0 && !page.missing.includes("unavailable") && <p className="mt-3 text-xs text-ink-subtle">Complete the items above to finish this {noun}.</p>}
          {msg && <p role="alert" className="mt-3 text-sm text-danger">{msg}</p>}
        </>
      )}
      {noun === "workshop" && <WorkshopStatuses page={page} done={done} />}
    </section>
  );
}
