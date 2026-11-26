"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Label, Textarea, FieldHint } from "@/components/ui/form";
import { recordAssessmentAction, type AssessState } from "@/lib/staff-actions";

type C = { number: number; title: string; mandatory: boolean; levels: { beginning: string; developing: string; competent: string } };
const LEVELS = ["beginning", "developing", "competent"] as const;

export function AssessmentForm({ learner, lesson, submission, rubric }: { learner: string; lesson: string; submission: number; rubric: C[] }) {
  const [state, action, pending] = useActionState<AssessState, FormData>(recordAssessmentAction, { status: "idle" });
  return (
    <form action={action} className="space-y-6 rounded-sm bg-white p-6 shadow-hairline md:p-8">
      <h2 className="font-serif text-2xl text-midnight">Instructor assessment</h2>
      <input type="hidden" name="learner" value={learner} />
      <input type="hidden" name="lesson" value={lesson} />
      <input type="hidden" name="submission" value={submission} />
      <input type="hidden" name="criteria" value={rubric.length} />

      <fieldset>
        <legend className="text-sm font-semibold text-midnight">How did you observe the Round 3 performance?</legend>
        <div className="mt-3 space-y-2 text-sm">
          <label className="flex gap-3"><input type="radio" name="basis" value="live_session" required className="mt-0.5 accent-midnight" /> Live, in a facilitated workshop or coaching session</label>
          <label className="flex gap-3"><input type="radio" name="basis" value="recording_shown_live" className="mt-0.5 accent-midnight" /> The learner played their recording to me during a live session (not uploaded)</label>
        </div>
      </fieldset>

      {rubric.map((c) => (
        <fieldset key={c.number} className="border-t border-stone pt-5">
          <legend className="text-sm font-semibold text-midnight">{c.number}. {c.title}{c.mandatory && <span className="ml-2 text-xs font-normal uppercase tracking-[0.12em] text-gold-deep">required for Competent</span>}</legend>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {LEVELS.map((lv) => (
              <label key={lv} className="flex cursor-pointer gap-3 rounded-xs border border-stone-deep p-3 text-[0.8125rem] leading-relaxed has-[:checked]:border-midnight has-[:checked]:bg-ivory">
                <input type="radio" name={`c${c.number}`} value={lv} required className="mt-0.5 accent-midnight" />
                <span><span className="block font-semibold capitalize text-midnight">{lv}</span><span className="text-ink-muted">{c.levels[lv]}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="border-t border-stone pt-5">
        <Label htmlFor="comment">Feedback to the learner</Label>
        <Textarea id="comment" name="comment" rows={5} required minLength={20} maxLength={4000} aria-describedby="comment-hint" />
        <FieldHint id="comment-hint">Refer to observable evidence: specific moments, the comprehension check, what to keep and one priority. The learner sees this text.</FieldHint>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Record assessment"}</Button>
        {state.message && <p role={state.status === "error" ? "alert" : "status"} className={`text-sm ${state.status === "error" ? "text-danger" : "text-success"}`}>{state.message}</p>}
      </div>
    </form>
  );
}
