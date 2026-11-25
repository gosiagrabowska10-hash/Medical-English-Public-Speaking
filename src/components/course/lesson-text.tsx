import { BookOpenCheck, FlaskConical, Lightbulb, MessageSquareQuote } from "lucide-react";
import type { Callout, LessonBody } from "@/content/lesson-types";
import { cn } from "@/lib/utils";

function CalloutBox({ c }: { c: Callout }) {
  const evidence = c.kind === "evidence";
  const Icon = evidence ? FlaskConical : Lightbulb;
  return (
    <aside className={cn("not-prose my-6 rounded-sm border-l-2 p-5 text-[0.9375rem] leading-relaxed", evidence ? "border-info bg-info-bg/60" : "border-gold bg-ivory-deep/70")}>
      <p className={cn("mb-2 flex items-center gap-2 text-eyebrow font-semibold uppercase tracking-[0.16em]", evidence ? "text-info" : "text-gold-deep")}>
        <Icon aria-hidden className="size-4" />{evidence ? "Research evidence" : "Professional recommendation"}
      </p>
      <p className="text-ink">
        {c.text}
        {c.refs?.length ? <span className="ml-1 whitespace-nowrap text-ink-subtle">[{c.refs.join(", ")}]</span> : null}
      </p>
    </aside>
  );
}

/** Renders a lesson body according to the approved content standard. */
export function LessonText({ body, inPreparation }: { body: LessonBody; inPreparation: boolean }) {
  return (
    <article className="prose-academy">
      {inPreparation && (
        <p className="rounded-sm border border-dashed border-stone-deep bg-white p-4 text-[0.9375rem] !text-ink-muted">
          <strong>Outline only.</strong> The full written lesson, exercise, knowledge check and assignment for this item are in preparation. The summary and module outcomes below show what it will cover.
        </p>
      )}
      <p className="!text-lead !text-ink">{body.intro}</p>

      <h2>Learning objectives</h2>
      <p className="!mt-2 text-sm !text-ink-subtle">By the end of this lesson you will be able to:</p>
      <ul>{body.objectives.map((o) => <li key={o}>{o}</li>)}</ul>

      {body.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {s.callout && <CalloutBox c={s.callout} />}
        </section>
      ))}

      {body.examples.length > 0 && (
        <section>
          <h2>Professional examples</h2>
          <p className="text-sm !text-ink-subtle">Illustrative, composite examples. Names, institutions and details are fictional; no patient information is used.</p>
          {body.examples.map((e) => (
            <div key={e.title} className="not-prose mt-5 rounded-sm bg-white p-6 shadow-hairline">
              <p className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-gold-deep">{"setting" in e ? (e as { setting: string }).setting : "Example"}</p>
              <h3 className="mt-2 font-serif text-2xl text-midnight">{e.title}</h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">{e.text}</p>
            </div>
          ))}
        </section>
      )}

      {body.phrase_bank && body.phrase_bank.length > 0 && (
        <section>
          <h2>Phrase bank</h2>
          <p>Professional English expressions for this lesson, with guidance on when to use them, register and pronunciation.</p>
          <div className="not-prose mt-5 divide-y divide-stone overflow-hidden rounded-sm bg-white shadow-hairline">
            {body.phrase_bank.map((ph) => (
              <div key={ph.phrase} className="grid gap-2 p-5 md:grid-cols-[1fr_1.2fr] md:gap-6">
                <div>
                  <p className="flex items-start gap-2 font-serif text-xl leading-snug text-midnight"><MessageSquareQuote aria-hidden className="mt-1 size-4 shrink-0 text-gold-deep" />{ph.phrase}</p>
                  <p className="mt-1.5 pl-6 text-xs uppercase tracking-[0.12em] text-ink-subtle">{ph.register}</p>
                </div>
                <div className="space-y-1.5 text-sm leading-relaxed">
                  <p className="text-ink"><span className="font-medium">Use: </span>{ph.use}</p>
                  {ph.pronunciation && <p className="text-ink-muted"><span className="font-medium text-ink">Pronunciation: </span>{ph.pronunciation}</p>}
                  <p className="italic text-ink-muted">&ldquo;{ph.example}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
          {body.phrase_practice && (
            <p className="not-prose mt-5 rounded-sm bg-ivory-deep/70 p-5 text-[0.9375rem] leading-relaxed text-ink"><strong className="font-medium">Using these in your presentations: </strong>{body.phrase_practice}</p>
          )}
        </section>
      )}

      {body.demonstration && (<section><h2>Demonstration</h2><p>{body.demonstration}</p></section>)}

      {body.mistakes.length > 0 && (
        <section>
          <h2>Common mistakes</h2>
          {typeof body.mistakes[0] === "string" ? (
            <ul>{body.mistakes.map((m) => <li key={String(m)}>{String(m)}</li>)}</ul>
          ) : (
            <div className="not-prose mt-4 overflow-hidden rounded-sm bg-white shadow-hairline">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-stone text-xs uppercase tracking-[0.14em] text-ink-subtle"><th scope="col" className="p-4 font-semibold">Mistake</th><th scope="col" className="p-4 font-semibold">Instead</th></tr></thead>
                <tbody className="divide-y divide-stone">
                  {body.mistakes.map((m) => typeof m === "string" ? null : (
                    <tr key={m.mistake}><td className="p-4 align-top text-ink-muted">{m.mistake}</td><td className="p-4 align-top text-ink">{m.correction}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {body.reflection.length > 0 && (<section><h2>Reflection</h2><ul>{body.reflection.map((m) => <li key={m}>{m}</li>)}</ul></section>)}

      {body.references && body.references.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2"><BookOpenCheck aria-hidden className="size-6 text-gold-deep" />References</h2>
          <ol className="not-prose mt-4 list-decimal space-y-2 pl-6 text-sm leading-relaxed text-ink-muted">
            {body.references.map((r) => <li key={r}>{r}</li>)}
          </ol>
          <p className="text-sm !text-ink-subtle">Statements marked <em>Research evidence</em> summarise these sources. <em>Professional recommendations</em> are practical guidance from the Academy, not research findings.</p>
        </section>
      )}
    </article>
  );
}
