"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CheckCircle2, Download, FileText, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label, Textarea, FieldHint } from "@/components/ui/form";
import { saveExerciseAction, submitAssignmentAction, submitQuizAction, type QuizResult } from "@/lib/course-actions";
import type { LessonPage } from "@/lib/course";
import { cn } from "@/lib/utils";

function Status({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <p role={ok ? "status" : "alert"} className={cn("rounded-sm p-3 text-sm", ok ? "bg-success-bg text-success" : "bg-danger-bg text-danger")}>{children}</p>
  );
}

function Exercise({ page }: { page: LessonPage }) {
  const ex = page.content!.exercise!;
  const router = useRouter();
  const [value, setValue] = useState(page.progress?.exercise_response ?? "");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const done = Boolean(page.progress?.exercise_done_at);
  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex flex-wrap items-center gap-3"><h2 className="font-serif text-3xl text-midnight">{ex.title}</h2>{done && <Badge tone="success" dot>Saved</Badge>}</div>
      <p className="leading-relaxed text-ink-muted">{ex.instructions}</p>
      <form
        onSubmit={(e) => { e.preventDefault(); start(async () => { const r = await saveExerciseAction(page.lesson.id, page.lesson.code, value); setMsg({ ok: r.ok, text: r.ok ? r.message ?? "Saved." : r.message }); if (r.ok) router.refresh(); }); }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="exercise">{ex.prompt}</Label>
          <Textarea id="exercise" value={value} onChange={(e) => setValue(e.target.value)} className="min-h-48" maxLength={10000} />
          <FieldHint>{value.trim().length} / at least {ex.min_chars} characters</FieldHint>
        </div>
        {msg && <Status ok={msg.ok}>{msg.text}</Status>}
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : done ? "Update exercise" : "Save exercise"}</Button>
      </form>
    </div>
  );
}

function Quiz({ page }: { page: LessonPage }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<(number | null)[]>(page.quiz.map(() => null));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const fb = (i: number) => result?.feedback.find((f) => f.position === page.quiz[i].position);

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-serif text-3xl text-midnight">Knowledge check</h2>
        {page.passedQuiz ? <Badge tone="success" dot>Passed</Badge> : page.lastAttempt ? <Badge tone="warning" dot>Not yet passed</Badge> : null}
      </div>
      <p className="text-sm text-ink-muted">{page.quiz.length} questions · pass mark 70% · you may retake the quiz{page.lastAttempt ? ` · last result ${page.lastAttempt.score}/${page.lastAttempt.total}` : ""}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (answers.some((a) => a === null)) { setError("Please answer every question."); return; }
          setError(null);
          start(async () => {
            const r = await submitQuizAction(page.lesson.id, page.lesson.code, answers as number[]);
            if (r.ok && r.data) { setResult(r.data); router.refresh(); } else if (!r.ok) setError(r.message);
          });
        }}
        className="space-y-5"
      >
        {page.quiz.map((q, i) => {
          const f = fb(i);
          return (
            <fieldset key={q.id} className="rounded-sm bg-white p-6 shadow-hairline">
              <legend className="sr-only">Question {i + 1}</legend>
              <p className="font-serif text-xl leading-snug text-midnight"><span className="mr-2 text-gold-deep lining-nums">{i + 1}.</span>{q.prompt}</p>
              <div className="mt-4 space-y-2">
                {q.options.map((o, k) => {
                  const chosen = answers[i] === k;
                  const isCorrect = f && f.correct_index === k;
                  return (
                    <label key={k} className={cn("flex cursor-pointer items-start gap-3 rounded-xs border p-3 text-sm transition-colors",
                      isCorrect ? "border-success bg-success-bg" : f && chosen && !f.correct ? "border-danger bg-danger-bg" : chosen ? "border-midnight" : "border-stone-deep hover:border-ink-subtle")}>
                      <input type="radio" name={`q${i}`} checked={chosen} disabled={!!result} onChange={() => setAnswers((a) => a.map((x, j) => (j === i ? k : x)))} className="mt-0.5 accent-midnight" />
                      <span className="flex-1">{o}</span>
                    </label>
                  );
                })}
              </div>
              {f && (
                <p className={cn("mt-4 flex gap-2 text-sm", f.correct ? "text-success" : "text-danger")}>
                  {f.correct ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" /> : <XCircle className="mt-0.5 size-4 shrink-0" />}
                  <span><strong className="font-medium">{f.correct ? "Correct." : "Not quite."}</strong> <span className="text-ink-muted">{f.explanation}</span></span>
                </p>
              )}
            </fieldset>
          );
        })}
        {error && <Status ok={false}>{error}</Status>}
        {result && <Status ok={result.passed}>You scored {result.score} of {result.total}. {result.passed ? "Quiz passed." : "The pass mark is 70%. Review the lesson and try again."}</Status>}
        {result ? (
          <Button type="button" variant="outline" onClick={() => { setResult(null); setAnswers(page.quiz.map(() => null)); }}>Retake the quiz</Button>
        ) : (
          <Button type="submit" disabled={pending}>{pending ? "Checking…" : "Submit answers"}</Button>
        )}
      </form>
    </div>
  );
}

function Materials({ page }: { page: LessonPage }) {
  if (!page.resources.length) return <p className="text-ink-muted">No downloadable materials have been published for this lesson yet.</p>;
  return (
    <ul className="max-w-2xl space-y-3">
      {page.resources.map((r) => (
        <li key={r.id}>
          <a href={r.file_url} download className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-hairline transition-shadow hover:shadow-soft">
            <FileText aria-hidden className="size-5 shrink-0 text-gold-deep" strokeWidth={1.4} />
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2 font-medium text-ink">{r.title}{r.is_sample && <Badge tone="warning">Sample</Badge>}</span>
              {r.description && <span className="mt-0.5 block text-sm text-ink-muted">{r.description}</span>}
            </span>
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-ink-subtle"><Download aria-hidden className="size-4" />{r.file_type}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Assignment({ page }: { page: LessonPage }) {
  const a = page.content!.assignment!;
  const router = useRouter();
  const [value, setValue] = useState(page.submission?.body ?? "");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const approved = page.submission?.status === "approved";
  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-serif text-3xl text-midnight">{a.title}</h2>
        {page.submission && <Badge tone={approved ? "success" : page.submission.status === "needs_revision" ? "warning" : "info"} dot>{page.submission.status.replace("_", " ")}</Badge>}
        {a.required && <Badge>Required</Badge>}
      </div>
      <p className="leading-relaxed text-ink-muted">{a.brief}</p>
      {page.submission?.feedback && <div className="rounded-sm bg-info-bg p-4 text-sm text-info"><strong className="font-medium">Instructor feedback: </strong>{page.submission.feedback}</div>}
      <form
        onSubmit={(e) => { e.preventDefault(); start(async () => { const r = await submitAssignmentAction(page.lesson.id, page.lesson.code, value); setMsg({ ok: r.ok, text: r.ok ? r.message ?? "Submitted." : r.message }); if (r.ok) router.refresh(); }); }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="assignment">Your response</Label>
          <Textarea id="assignment" value={value} onChange={(e) => setValue(e.target.value)} className="min-h-56" maxLength={20000} disabled={approved} />
          <FieldHint>{words} words · at least {a.min_words}{page.submission ? ` · submitted ${new Date(page.submission.submitted_at).toLocaleDateString("en-GB")}` : ""}</FieldHint>
        </div>
        {msg && <Status ok={msg.ok}>{msg.text}</Status>}
        {!approved && <Button type="submit" disabled={pending}>{pending ? "Submitting…" : page.submission ? "Resubmit assignment" : "Submit assignment"}</Button>}
      </form>
      <p className="text-xs text-ink-subtle">Please do not include identifiable patient information.</p>
    </div>
  );
}

export function LessonTabs({ page, lessonContent }: { page: LessonPage; lessonContent: React.ReactNode }) {
  const c = page.content!;
  const exDone = Boolean(page.progress?.exercise_done_at);
  return (
    <Tabs defaultValue="lesson">
      <TabsList aria-label="Lesson sections" className="flex-wrap gap-x-6 gap-y-1 overflow-visible sm:flex-nowrap sm:gap-8">
        <TabsTrigger value="lesson">Lesson</TabsTrigger>
        {c.exercise && <TabsTrigger value="exercise">Exercise{exDone && <CheckCircle2 aria-label="done" className="ml-1.5 inline size-3.5 text-success" />}</TabsTrigger>}
        {page.quiz.length > 0 && <TabsTrigger value="quiz">Quiz{page.passedQuiz && <CheckCircle2 aria-label="passed" className="ml-1.5 inline size-3.5 text-success" />}</TabsTrigger>}
        <TabsTrigger value="materials">Materials</TabsTrigger>
        {c.assignment && <TabsTrigger value="assignment">Assignment{page.submission && <CheckCircle2 aria-label="submitted" className="ml-1.5 inline size-3.5 text-success" />}</TabsTrigger>}
      </TabsList>
      <TabsContent value="lesson">{lessonContent}</TabsContent>
      {c.exercise && <TabsContent value="exercise"><Exercise page={page} /></TabsContent>}
      {page.quiz.length > 0 && <TabsContent value="quiz"><Quiz page={page} /></TabsContent>}
      <TabsContent value="materials"><Materials page={page} /></TabsContent>
      {c.assignment && <TabsContent value="assignment"><Assignment page={page} /></TabsContent>}
    </Tabs>
  );
}
