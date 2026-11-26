"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CheckCircle2, Circle } from "lucide-react";
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

export function CompletionPanel({ page }: { page: LessonPage }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const done = page.progress?.status === "completed";
  const labels = page.lesson.kind === "workshop" ? workshopLabels : lessonLabels;
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
      <h2 id="completion-h" className="font-serif text-2xl text-midnight">{done ? (noun === "workshop" ? "Workshop completed" : "Lesson completed") : "Completion requirements"}</h2>
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
    </section>
  );
}
