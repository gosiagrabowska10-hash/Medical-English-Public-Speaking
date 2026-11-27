"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronDown, Circle, CircleDot, Lock, Pause, Play, RotateCcw, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea, FieldHint } from "@/components/ui/form";
import { saveWorkshopStepAction } from "@/lib/course-actions";
import type { LessonPage } from "@/lib/course";
import type { PressureCard, WorkshopData, WorkshopStep } from "@/content/lesson-types";
import { cn } from "@/lib/utils";

type StepRow = LessonPage["workshopSteps"][number];
const LEVELS = ["Beginning", "Developing", "Competent"] as const;

function mins(s: WorkshopStep) {
  const [a, b] = s.selfPacedMinutes;
  return { group: `${s.facilitatedMinutes} min`, alone: a === b ? `${a} min` : `${a}–${b} min` };
}

function wpm(d: Record<string, unknown>) {
  const w = Number(d.key_words), sec = Number(d.key_seconds);
  return w > 0 && sec > 0 ? Math.round((w / sec) * 60) : null;
}

/* ───────────── Pressure card (Round 3) ───────────── */
function PressureCardPanel({ cards, guidance, onCard }: { cards: PressureCard[]; guidance: string[]; onCard: (c: PressureCard | null) => void }) {
  const [stretch, setStretch] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [card, setCard] = useState<PressureCard | null>(null);
  const [showRecovery, setShowRecovery] = useState(false);
  const revealAt = useRef(0);
  const pool = useMemo(() => cards.filter((c) => stretch || c.intensity === "standard"), [cards, stretch]);

  useEffect(() => {
    if (!running) return;
    const started = Date.now() - elapsed * 1000;
    const t = setInterval(() => {
      const e = Math.floor((Date.now() - started) / 1000);
      setElapsed(e);
      if (!card && e >= revealAt.current) {
        const c = pool[Math.floor(Math.random() * pool.length)];
        setCard(c); onCard(c);
      }
    }, 250);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, card, pool]);

  const start = () => {
    revealAt.current = 45 + Math.floor(Math.random() * 46); // 45–90 s
    setElapsed(0); setCard(null); onCard(null); setShowRecovery(false); setRunning(true);
  };
  const reset = () => { setRunning(false); setElapsed(0); setCard(null); onCard(null); setShowRecovery(false); };

  return (
    <div className="on-dark rounded-sm bg-midnight p-6 text-ivory">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-light">Pressure card</p>
        <label className="flex items-center gap-2 text-sm text-ivory/80">
          <input type="checkbox" checked={stretch} onChange={(e) => setStretch(e.target.checked)} disabled={running} className="accent-gold" />
          Include stretch cards
        </label>
      </div>
      <ul className="mt-3 space-y-1 text-xs leading-relaxed text-ivory/60">{guidance.slice(0, 3).map((g) => <li key={g}>{g}</li>)}</ul>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <span className="flex items-center gap-2 font-serif text-3xl lining-nums tabular-nums" aria-live="off"><Timer aria-hidden className="size-5 text-gold-light" />{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}</span>
        {!running ? (
          <Button variant="gold" onClick={start}><Play /> {card ? "Draw a new card and repeat" : "Start timer with recording"}</Button>
        ) : (
          <Button variant="outline-light" onClick={() => setRunning(false)}><Pause /> Stop timer</Button>
        )}
        {(card || elapsed > 0) && <Button variant="outline-light" size="sm" onClick={reset}><RotateCcw /> Reset</Button>}
      </div>
      {running && !card && <p className="mt-4 text-sm text-ivory/70">Begin your extract now. A card will appear between 45 and 90 seconds.</p>}
      {card && (
        <div role="alert" className="mt-5 rounded-sm bg-ivory p-5 text-midnight">
          <p className="flex items-center gap-2 text-eyebrow font-semibold uppercase tracking-[0.16em] text-gold-deep">{card.code} · {card.intensity === "stretch" ? "Stretch" : "Standard"}</p>
          <p className="mt-2 font-serif text-2xl">{card.title}</p>
          <p className="mt-2 text-[0.9375rem] text-ink">{card.situation}</p>
          <p className="mt-1 text-[0.9375rem] font-medium text-ink">{card.task}</p>
          {!running && (showRecovery
            ? <p className="mt-3 rounded-xs bg-ivory-deep p-3 text-sm text-ink-muted"><strong className="font-medium text-ink">A strategy that works: </strong>{card.recovery}</p>
            : <Button variant="link" size="sm" className="mt-3" onClick={() => setShowRecovery(true)}>Show a recovery strategy</Button>)}
        </div>
      )}
    </div>
  );
}

/* ───────────── Round form ───────────── */
function RoundForm({ page, step, ws, row, onSaved, criteria }: { page: LessonPage; step: WorkshopStep; ws: WorkshopData; row?: StepRow; onSaved: () => void; criteria: string[] }) {
  const [data, setData] = useState<Record<string, unknown>>(row?.data ?? {});
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const isR3 = step.key === "round3";
  const set = (k: string, v: unknown) => setData((d) => ({ ...d, [k]: v }));
  const rate = wpm(data);
  const ratings = (data.ratings as Record<string, string>) ?? {};
  const missing = [
    !data.comprehension && "comprehension check result",
    !data.pauses && "pauses",
    !data.fillers && "effect of fillers",
    isR3 && !data.recovery && "recovery",
    criteria.some((_, i) => !ratings[`c${i + 1}`]) && "self-ratings on all six criteria",
  ].filter(Boolean) as string[];

  const save = (complete: boolean) => start(async () => {
    if (complete && missing.length) { setMsg({ ok: false, text: `Please complete: ${missing.join(", ")}.` }); return; }
    const r = await saveWorkshopStepAction(page.lesson.id, page.lesson.code, step.key, data, complete);
    setMsg({ ok: r.ok, text: r.ok ? r.message ?? "Saved." : r.message });
    if (r.ok) onSaved();
  });

  return (
    <div className="space-y-5">
      {isR3 && <PressureCardPanel cards={ws.pressureCards} guidance={ws.pressureGuidance} onCard={(c) => c && set("card", c.code)} />}
      {isR3 && typeof data.card === "string" && <p className="text-sm text-ink-muted">Card logged for this attempt: <strong className="text-ink">{data.card}</strong></p>}
      <div className="grid gap-5 sm:grid-cols-3">
        {ws.roundFields.filter((f) => f.type !== "textarea" && f.type !== "choice" && f.key !== "fillers_where").map((f) => (
          <div key={f.key}>
            <Label htmlFor={`${step.key}-${f.key}`}>{f.label}</Label>
            <Input id={`${step.key}-${f.key}`} type={f.type === "number" ? "number" : "text"} min={0} value={String(data[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />
            <FieldHint>{f.help}</FieldHint>
          </div>
        ))}
      </div>
      <p className="text-sm text-ink-muted">Key-segment rate (diagnostic only): <strong className="text-ink lining-nums">{rate ? `${rate} words per minute` : "—"}</strong>. Intelligibility is judged by the comprehension check, not by this number.</p>
      {ws.roundFields.filter((f) => f.type === "textarea" || f.key === "heard_numbers" || f.key === "fillers_where").filter((f) => f.type === "textarea" ? f.key !== "next" : true).map((f) => (
        <div key={f.key}>
          <Label htmlFor={`${step.key}-${f.key}`}>{f.label}</Label>
          {f.type === "textarea"
            ? <Textarea id={`${step.key}-${f.key}`} className="min-h-20" value={String(data[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />
            : <Input id={`${step.key}-${f.key}`} value={String(data[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />}
          <FieldHint>{f.help}</FieldHint>
        </div>
      ))}
      <div className="grid gap-5 sm:grid-cols-2">
        {ws.roundFields.filter((f) => f.type === "choice" && (f.key !== "recovery" || isR3)).map((f) => (
          <div key={f.key}>
            <Label htmlFor={`${step.key}-${f.key}`}>{f.label}</Label>
            <Select id={`${step.key}-${f.key}`} value={String(data[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)}>
              <option value="">Select…</option>
              {f.options!.map((o) => <option key={o}>{o}</option>)}
            </Select>
          </div>
        ))}
      </div>
      <fieldset className="rounded-sm bg-ivory/70 p-5">
        <legend className="px-1 text-sm font-medium text-ink">Self-assessment on the six criteria <span className="font-normal text-ink-subtle">— your own judgement, not an instructor assessment</span></legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {criteria.map((c, i) => (
            <div key={c}>
              <Label htmlFor={`${step.key}-c${i + 1}`} className="text-[0.8125rem]">{i + 1}. {c}</Label>
              <Select id={`${step.key}-c${i + 1}`} value={ratings[`c${i + 1}`] ?? ""} onChange={(e) => set("ratings", { ...ratings, [`c${i + 1}`]: e.target.value })}>
                <option value="">Select…</option>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </Select>
            </div>
          ))}
        </div>
      </fieldset>
      {ws.roundFields.filter((f) => f.key === "next").map((f) => (
        <div key={f.key}>
          <Label htmlFor={`${step.key}-${f.key}`}>{f.label}</Label>
          <Textarea id={`${step.key}-${f.key}`} className="min-h-20" value={String(data[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />
        </div>
      ))}
      {msg && <p role={msg.ok ? "status" : "alert"} className={cn("rounded-sm p-3 text-sm", msg.ok ? "bg-success-bg text-success" : "bg-danger-bg text-danger")}>{msg.text}</p>}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" disabled={pending} onClick={() => save(false)}>Save and continue later</Button>
        <Button disabled={pending} onClick={() => save(true)}>{row?.completed_at ? "Update completed round" : "Complete this round"}</Button>
      </div>
    </div>
  );
}

/* ───────────── Checklist step (briefing, stations, debrief) ───────────── */
function ChecklistStep({ page, step, row, onSaved }: { page: LessonPage; step: WorkshopStep; row?: StepRow; onSaved: () => void }) {
  const [checked, setChecked] = useState<string[]>((row?.data?.checked as string[]) ?? []);
  const [notes, setNotes] = useState(String(row?.data?.notes ?? ""));
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const items = step.checklist ?? [];
  const all = items.every((i) => checked.includes(i));
  const save = (complete: boolean) => start(async () => {
    const r = await saveWorkshopStepAction(page.lesson.id, page.lesson.code, step.key, { checked, notes }, complete);
    setMsg({ ok: r.ok, text: r.ok ? r.message ?? "Saved." : r.message });
    if (r.ok) onSaved();
  });
  return (
    <div className="space-y-4">
      <fieldset className="space-y-2.5">
        <legend className="sr-only">Checklist</legend>
        {items.map((i) => (
          <label key={i} className="flex gap-3 text-[0.9375rem] text-ink">
            <input type="checkbox" className="mt-1 size-4 accent-midnight" checked={checked.includes(i)} onChange={(e) => setChecked((c) => e.target.checked ? [...c, i] : c.filter((x) => x !== i))} />
            {i}
          </label>
        ))}
      </fieldset>
      <div>
        <Label htmlFor={`${step.key}-notes`}>Notes (optional)</Label>
        <Textarea id={`${step.key}-notes`} className="min-h-20" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      {msg && <p role={msg.ok ? "status" : "alert"} className={cn("rounded-sm p-3 text-sm", msg.ok ? "bg-success-bg text-success" : "bg-danger-bg text-danger")}>{msg.text}</p>}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" disabled={pending} onClick={() => save(false)}>Save and continue later</Button>
        <Button disabled={pending || !all} onClick={() => save(true)}>{row?.completed_at ? "Update" : "Mark step complete"}</Button>
      </div>
      {!all && <p className="text-xs text-ink-subtle">Tick every item to complete this step.</p>}
    </div>
  );
}

/* ───────────── Main ───────────── */
export function PracticeRounds({ page }: { page: LessonPage }) {
  const ws = page.content!.body.workshop!;
  const router = useRouter();
  const rows = new Map(page.workshopSteps.map((r) => [r.step_key, r]));
  const order = ws.sessions.flatMap((s) => s.steps);
  const nextKey = order.find((k) => !rows.get(k)?.completed_at);
  const [open, setOpen] = useState<string | null>(nextKey ?? null);
  const criteria = ws.rubric.map((r) => r.title);
  const stepByKey = new Map(ws.steps.map((s) => [s.key, s]));
  const rounds = (["round1", "round2", "round3"] as const).map((k) => ({ k, row: rows.get(k) }));

  if (!page.passedQuiz) {
    return (
      <div className="flex gap-4 rounded-sm bg-white p-6 shadow-hairline">
        <Lock aria-hidden className="mt-1 size-5 shrink-0 text-gold-deep" />
        <div>
          <p className="font-serif text-2xl text-midnight">Pass the Readiness Check to unlock the practice rounds</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">Five questions on L07–L09 (pass mark 70%: at least 4 of 5 correct). You can retake it as often as you like. Meanwhile, read the Briefing and the Workshop Pack.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm bg-white p-5 shadow-hairline">
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-gold-deep">{nextKey ? "Resume where you left off" : "All steps complete"}</p>
          <p className="mt-1 font-serif text-2xl text-midnight">{nextKey ? stepByKey.get(nextKey)!.title : "Submit your Final Task"}</p>
        </div>
        <p className="text-sm text-ink-muted lining-nums">{order.filter((k) => rows.get(k)?.completed_at).length} of {order.length} steps complete · your progress is saved automatically when you save a step</p>
      </div>

      {ws.sessions.map((sess) => (
        <section key={sess.title} aria-labelledby={`sess-${sess.title}`}>
          <h2 id={`sess-${sess.title}`} className="font-serif text-2xl text-midnight">{sess.title}</h2>
          <ul className="mt-3 divide-y divide-stone overflow-hidden rounded-sm bg-white shadow-hairline">
            {sess.steps.map((k) => {
              const step = stepByKey.get(k)!; const row = rows.get(k); const t = mins(step); const isOpen = open === k;
              return (
                <li key={k}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : k)} className="flex w-full items-center gap-4 p-5 text-left hover:bg-ivory/50">
                    {row?.completed_at ? <CheckCircle2 aria-label="Completed" className="size-5 shrink-0 text-success" /> : row ? <CircleDot aria-label="In progress" className="size-5 shrink-0 text-gold-deep" /> : <Circle aria-label="Not started" className="size-5 shrink-0 text-stone-deep" />}
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{step.title}</span>
                      <span className="mt-0.5 block text-xs text-ink-subtle">Independent: {t.alone} · Facilitated group: {t.group}{step.basedOn ? ` · builds on ${step.basedOn.join(", ")}` : ""}</span>
                    </span>
                    <ChevronDown aria-hidden className={cn("size-4 text-ink-subtle transition-transform", isOpen && "rotate-180")} />
                  </button>
                  {isOpen && (
                    <div className="space-y-5 border-t border-stone bg-ivory/40 p-5 md:p-6">
                      <p className="text-[0.9375rem] text-ink"><strong className="font-medium">Purpose: </strong>{step.purpose}</p>
                      <ol className="space-y-2 text-[0.9375rem] leading-relaxed text-ink">
                        {step.instructions.map((ins, i) => <li key={i} className="flex gap-3"><span className="font-serif text-lg leading-6 text-gold-deep lining-nums">{i + 1}</span><span>{ins}</span></li>)}
                      </ol>
                      {step.selfPacedNotes && <div className="rounded-sm bg-info-bg/70 p-4 text-sm text-info">{step.selfPacedNotes.map((n) => <p key={n}>{n}</p>)}</div>}
                      <p className="text-sm text-ink-muted"><strong className="font-medium text-ink">Output: </strong>{step.output}</p>
                      {step.kind === "round"
                        ? <RoundForm page={page} step={step} ws={ws} row={row} criteria={criteria} onSaved={() => router.refresh()} />
                        : <ChecklistStep page={page} step={step} row={row} onSaved={() => router.refresh()} />}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section aria-labelledby="progress-h">
        <h2 id="progress-h" className="font-serif text-2xl text-midnight">Your progress across the three rounds</h2>
        <div className="mt-3 overflow-x-auto rounded-sm bg-white shadow-hairline" tabIndex={0} role="region" aria-labelledby="progress-h">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">Comparison of practice rounds</caption>
            <thead><tr className="border-b border-stone text-xs uppercase tracking-[0.12em] text-ink-subtle"><th scope="col" className="p-3 font-semibold">Measure</th>{rounds.map((r, i) => <th key={r.k} scope="col" className="p-3 font-semibold">Round {i + 1}</th>)}</tr></thead>
            <tbody className="divide-y divide-stone">
              {[
                ["Comprehension check", (d: Record<string, unknown>) => String(d.comprehension ?? "—")],
                ["Numbers as heard", (d: Record<string, unknown>) => String(d.heard_numbers ?? "—")],
                ["Pauses around key result", (d: Record<string, unknown>) => String(d.pauses ?? "—")],
                ["Effect of fillers", (d: Record<string, unknown>) => String(d.fillers ?? "—")],
                ["Key-segment rate (diagnostic)", (d: Record<string, unknown>) => { const r = wpm(d); return r ? `${r} wpm` : "—"; }],
                ["Self-rated Competent (not verified)", (d: Record<string, unknown>) => { const r = (d.ratings as Record<string, string>) ?? {}; const n = Object.values(r).filter((v) => v === "Competent").length; return Object.keys(r).length ? `${n} of 6` : "—"; }],
                ["Pressure card", (d: Record<string, unknown>) => String(d.card ?? "—")],
              ].map(([label, fn]) => (
                <tr key={label as string}><th scope="row" className="p-3 font-medium text-ink">{label as string}</th>{rounds.map((r) => <td key={r.k} className="p-3 text-ink-muted">{r.row ? (fn as (d: Record<string, unknown>) => string)(r.row.data) : "—"}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-ink-subtle">To complete the workshop: {ws.completionRule}</p>
      </section>

      <Badge tone="neutral">Recordings stay on your own device until the Speaking Studio opens.</Badge>
    </div>
  );
}
