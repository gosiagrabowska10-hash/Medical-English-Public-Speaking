import { modules } from "@/content/curriculum";
import { Badge } from "@/components/ui/badge";

/** Full syllabus — modules with lessons and workshops. */
export function ModuleList({ detailed = true }: { detailed?: boolean }) {
  return (
    <ol className="border-t border-stone-deep">
      {modules.map((m) => (
        <li key={m.number} id={m.slug} className="grid scroll-mt-28 gap-6 border-b border-stone-deep py-10 md:grid-cols-[120px_1fr] md:gap-10 lg:grid-cols-[160px_1fr_1fr]">
          <div className="flex items-baseline gap-4 md:block">
            <span className="font-serif text-5xl leading-none text-gold md:text-6xl">{String(m.number).padStart(2, "0")}</span>
            <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle md:mt-4">{m.weeks}</p>
          </div>
          <div>
            <h3 className="font-serif text-[1.75rem] leading-tight text-midnight md:text-3xl">{m.title}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">{m.summary}</p>
            {detailed && (
              <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-muted">
                {m.outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
                    {o}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {detailed && (
            <div className="md:col-start-2 lg:col-start-auto">
              <ul className="divide-y divide-stone-deep/70 rounded-sm bg-white shadow-hairline">
                {m.lessons.map((l) => (
                  <li key={l.code} className="flex gap-4 p-5">
                    <span className="w-9 shrink-0 pt-0.5 text-xs font-semibold tabular-nums lining-nums tracking-wider text-gold-deep">{l.code}</span>
                    <span>
                      <span className="block font-medium text-ink">{l.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{l.summary}</span>
                    </span>
                  </li>
                ))}
                {m.workshop && (
                  <li className="flex gap-4 bg-ivory-deep/60 p-5">
                    <span className="w-9 shrink-0 pt-0.5 text-xs font-semibold tracking-wider text-gold-deep">{m.workshop.code}</span>
                    <span>
                      <span className="flex flex-wrap items-center gap-2 font-medium text-ink">
                        {m.workshop.title}
                        <Badge tone="gold">Workshop</Badge>
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{m.workshop.summary}</span>
                      <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-ink-subtle">{m.workshop.format}</span>
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Compact module index for the homepage. */
export function ModuleIndex() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-sm bg-stone-deep/70 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((m) => (
        <li key={m.number} className="flex gap-5 bg-ivory p-6 md:p-7">
          <span className="font-serif text-3xl leading-none text-gold">{String(m.number).padStart(2, "0")}</span>
          <span>
            <span className="block font-serif text-xl leading-snug text-midnight">{m.title}</span>
            <span className="mt-1.5 block text-xs uppercase tracking-[0.16em] text-ink-subtle">
              {m.weeks} · {m.lessons.length} lessons{m.workshop ? " · workshop" : ""}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}
