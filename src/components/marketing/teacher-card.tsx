import { aiTeachers, type AiTeacher } from "@/content/teachers";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const glyphs: Record<string, React.ReactNode> = {
  "speaking-mentor": <path d="M24 10v28M10 24h28" />,
  "voice-coach": <path d="M8 24h4l3-8 4 16 4-22 4 26 4-18 3 6h6" />,
  "presentation-coach": <path d="M10 14h28M10 22h20M10 30h24M10 38h12" />,
  "media-interviewer": <><rect x="18" y="8" width="12" height="20" rx="6" /><path d="M13 24a11 11 0 0 0 22 0M24 35v5" /></>,
  "conference-audience": <><path d="M8 34a6 4 0 0 1 12 0M18 34a6 4 0 0 1 12 0M28 34a6 4 0 0 1 12 0" /><circle cx="14" cy="24" r="3" /><circle cx="24" cy="24" r="3" /><circle cx="34" cy="24" r="3" /></>,
  "english-speaking-coach": <path d="M10 34 18 12l8 22M13 26h10M30 20h8M34 16v4m-4 4c1 6 5 9 9 10M38 20c-1 7-6 12-10 14" />,
};

export function TeacherGlyph({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("size-12 shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
      <rect x="0.5" y="0.5" width="47" height="47" stroke="#B69A68" strokeOpacity="0.6" strokeWidth="1" />
      {glyphs[slug]}
    </svg>
  );
}

export function TeacherCard({ t, index, dark }: { t: AiTeacher; index: number; dark?: boolean }) {
  return (
    <Card tone={dark ? "dark" : "paper"} className="flex h-full flex-col p-7 md:p-8">
      <div className="flex items-start justify-between">
        <TeacherGlyph slug={t.slug} className={dark ? "text-gold-light" : "text-midnight"} />
        <span className={cn("font-serif text-lg", dark ? "text-ivory/40" : "text-ink-subtle")}>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className={cn("mt-8 text-eyebrow font-semibold uppercase tracking-[0.18em]", dark ? "text-gold-light" : "text-gold-deep")}>{t.role}</p>
      <h3 className={cn("mt-2 font-serif text-[1.75rem] leading-tight", dark ? "text-ivory" : "text-midnight")}>AI {t.name}</h3>
      <p className={cn("mt-4 text-[0.9375rem] leading-relaxed", dark ? "text-ivory/70" : "text-ink-muted")}>{t.approach}</p>
      <div className={cn("mt-auto pt-6 text-sm", dark ? "text-ivory/60" : "text-ink-subtle")}>
        <span className="font-medium">Focus: </span>
        {t.focus}
      </div>
    </Card>
  );
}

export function TeacherGrid({ dark }: { dark?: boolean }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {aiTeachers.map((t, i) => (
        <TeacherCard key={t.slug} t={t} index={i} dark={dark} />
      ))}
    </div>
  );
}

export function TeacherDetail({ t, index }: { t: AiTeacher; index: number }) {
  return (
    <article id={t.slug} className="grid scroll-mt-28 gap-8 border-b border-stone-deep py-14 md:grid-cols-[1fr_1.4fr] md:gap-16">
      <div>
        <div className="flex items-center gap-5">
          <TeacherGlyph slug={t.slug} className="size-14 text-midnight" />
          <span className="font-serif text-2xl text-ink-subtle">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <p className="mt-8 text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-deep">{t.role}</p>
        <h3 className="mt-2 font-serif text-4xl text-midnight">AI {t.name}</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {t.modules.map((n) => (
            <Badge key={n}>Module {n}</Badge>
          ))}
        </div>
      </div>
      <div>
        <p className="text-lead leading-relaxed text-ink-muted">{t.approach}</p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle">Focus</dt>
            <dd className="mt-2 text-ink">{t.focus}</dd>
          </div>
          <div>
            <dt className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle">Typical practice</dt>
            <dd className="mt-2">
              <ul className="space-y-1.5 text-ink">
                {t.practises.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export { aiTeachers };
