import type { WorkshopData } from "@/content/lesson-types";

/** Workshop-at-a-glance, shown in the Briefing tab: outcomes, both schedules and assessment principles. */
export function WorkshopOverview({ ws }: { ws: WorkshopData }) {
  const byKey = new Map(ws.steps.map((s) => [s.key, s]));
  const facTotal = ws.readinessMinutes.facilitated + ws.steps.reduce((n, s) => n + s.facilitatedMinutes, 0);
  const lo = ws.readinessMinutes.selfPaced[0] + ws.steps.reduce((n, s) => n + s.selfPacedMinutes[0], 0);
  const hi = ws.readinessMinutes.selfPaced[1] + ws.steps.reduce((n, s) => n + s.selfPacedMinutes[1], 0);
  const range = (a: number, b: number) => (a === b ? `${a}` : `${a}–${b}`);
  return (
    <div className="mt-12 space-y-10">
      <section aria-labelledby="ws-outcomes">
        <h2 id="ws-outcomes" className="font-serif text-3xl text-midnight">What you will leave with</h2>
        <div className="mt-4 overflow-hidden rounded-sm bg-white shadow-hairline">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b border-stone text-xs uppercase tracking-[0.12em] text-ink-subtle"><th scope="col" className="p-4 font-semibold">Outcome</th><th scope="col" className="p-4 font-semibold">Produced in</th><th scope="col" className="hidden p-4 font-semibold md:table-cell">Evidence you keep</th></tr></thead>
            <tbody className="divide-y divide-stone">{ws.outcomes.map((o) => <tr key={o.outcome}><td className="p-4 align-top font-medium text-ink">{o.outcome}</td><td className="p-4 align-top text-ink-muted">{o.producedIn}</td><td className="hidden p-4 align-top text-ink-muted md:table-cell">{o.evidence}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="ws-schedule">
        <h2 id="ws-schedule" className="font-serif text-3xl text-midnight">Two ways to take this workshop</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <div className="rounded-sm bg-white p-6 shadow-hairline">
            <p className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-gold-deep">Independent · self-paced</p>
            <p className="mt-2 font-serif text-2xl text-midnight lining-nums">About {Math.round(lo / 6) / 10}–{Math.round(hi / 6) / 10} hours</p>
            <p className="mt-1 text-sm text-ink-muted">Three sittings. Pause after any step; your progress is saved and every station can be repeated.</p>
            <ol className="mt-4 space-y-3 text-sm">
              <li className="text-ink-muted"><span className="font-medium text-ink">Before you start:</span> Readiness Check ({range(...ws.readinessMinutes.selfPaced)} min)</li>
              {ws.sessions.map((s) => (
                <li key={s.title}><span className="font-medium text-ink">{s.title}</span><span className="block text-ink-muted">{s.steps.map((k) => `${byKey.get(k)!.title} (${range(...byKey.get(k)!.selfPacedMinutes)} min)`).join(" · ")}</span></li>
              ))}
            </ol>
          </div>
          <div className="rounded-sm bg-white p-6 shadow-hairline">
            <p className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-gold-deep">Facilitated · groups of three</p>
            <p className="mt-2 font-serif text-2xl text-midnight lining-nums">{facTotal} minutes</p>
            <p className="mt-1 text-sm text-ink-muted">Speaker, timekeeper and listener rotate. Agenda and guidance in the Facilitator Guide (Workshop Pack).</p>
            <ol className="mt-4 divide-y divide-stone text-sm">
              <li className="flex justify-between py-1.5 text-ink-muted"><span>Readiness Check (before the session)</span><span className="lining-nums">{ws.readinessMinutes.facilitated}</span></li>
              {ws.steps.map((s) => <li key={s.key} className="flex justify-between py-1.5 text-ink-muted"><span>{s.title}</span><span className="lining-nums">{s.facilitatedMinutes}</span></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="ws-principles">
        <h2 id="ws-principles" className="font-serif text-3xl text-midnight">Assessment principles</h2>
        <ul className="mt-4 space-y-3">{ws.assessmentPrinciples.map((p) => { const [h, ...rest] = p.split(". "); return <li key={p} className="rounded-sm bg-white p-4 text-[0.9375rem] text-ink-muted shadow-hairline"><strong className="font-medium text-ink">{h}.</strong> {rest.join(". ")}</li>; })}</ul>
        <p className="mt-4 text-sm text-ink-muted"><strong className="font-medium text-ink">Completion: </strong>{ws.completionRule} The full rubric, with examples for every level, is in the Workshop Pack.</p>
      </section>
    </div>
  );
}
