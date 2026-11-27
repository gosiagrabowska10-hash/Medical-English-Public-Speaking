import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { StatusIcon } from "@/components/course/status-icon";
import { requireUser } from "@/lib/auth";
import { formatDuration, getCurriculum } from "@/lib/course";
import Loading from "../loading";

export const metadata = { title: "Curriculum" };

export default function CurriculumPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Curriculum />
    </Suspense>
  );
}

async function Curriculum() {
  await requireUser("/app/curriculum");
  const { modules, enrolled, totals } = await getCurriculum();
  const all = modules.flatMap((m) => m.lessons);
  const next = all.find((l) => l.status === "in_progress") ?? all.find((l) => l.status === "not_started" && !l.locked && (enrolled || l.is_preview));

  return (
    <div className="space-y-10">
      <header>
        <Eyebrow className="mb-4"><Rule />Academy Curriculum</Eyebrow>
        <h1 className="font-serif text-h1 text-midnight">Medical Public Speaking Professional Programme</h1>
        <p className="mt-4 max-w-2xl text-lead text-ink-muted">Ten weeks · {modules.length} modules · {totals.lessons} lessons · {totals.workshops} practical workshops · approximately {Math.round(totals.minutes / 60)} hours of learning and practice.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-7">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle">Your progress</p>
          <p className="mt-3 font-serif text-5xl text-midnight lining-nums">{totals.completed}<span className="text-2xl text-ink-subtle"> / {totals.mandatory}</span></p>
          <Progress value={totals.mandatory ? (totals.completed / totals.mandatory) * 100 : 0} label="Lessons and workshops completed" className="mt-6" />
        </Card>
        <Card tone="dark" className="flex flex-col p-7">
          {enrolled ? (
            <>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-light">{next ? "Continue learning" : "All available lessons complete"}</p>
              {next && <><p className="mt-3 font-serif text-2xl">{next.code} · {next.title}</p><p className="mt-1 text-sm text-ivory/60">Week {next.week} · {next.duration_minutes} min</p></>}
              {next && <Button asChild variant="gold" className="mt-auto self-start"><Link href={`/app/learn/${next.code}`}>Continue <ArrowRight /></Link></Button>}
            </>
          ) : (
            <>
              <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-light">Preview access</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">You are not enrolled in a cohort yet. Lesson 1 is open as a preview; the full programme unlocks when your enrolment is confirmed.</p>
              <Button asChild variant="gold" className="mt-6 self-start"><Link href="/app/learn/L01">Open the preview lesson <ArrowRight /></Link></Button>
            </>
          )}
        </Card>
      </div>

      <ol className="space-y-5">
        {modules.map((m) => {
          const done = m.lessons.filter((l) => l.status === "completed").length;
          const minutes = m.lessons.reduce((n, l) => n + l.duration_minutes, 0);
          return (
            <li key={m.id}>
              <Card className="overflow-hidden">
                <details open={m.lessons.some((l) => l.code === next?.code)} className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-5 p-6 hover:bg-ivory/50 md:p-7 [&::-webkit-details-marker]:hidden">
                    <span className="font-serif text-4xl text-gold-muted lining-nums">{String(m.number).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-2xl leading-tight text-midnight">{m.title}</span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-ink-subtle"><span>{m.weeks_label}</span><span>{m.lessons.length} items</span><span>{formatDuration(minutes)}</span>
                        {enrolled && (m.completed && done > 0 ? <Badge tone="success">Module completed</Badge>
                          : m.overridden ? <Badge tone="info">Unlocked by the Academy</Badge>
                          : !m.unlocked ? <span className="inline-flex items-center gap-1"><Lock aria-hidden className="size-3.5" /> Opens when the previous module is completed</span> : null)}
                      </span>
                    </span>
                    <span className="hidden w-40 sm:block"><Progress value={(done / m.lessons.length) * 100} label={`${done}/${m.lessons.length}`} /></span>
                  </summary>
                  <ul className="divide-y divide-stone border-t border-stone">
                    {m.lessons.map((l) => {
                      const locked = (!enrolled && !l.is_preview) || l.locked;
                      return (
                        <li key={l.id}>
                          <Link href={`/app/learn/${l.code}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-4 hover:bg-ivory/50 md:px-7">
                            <StatusIcon status={l.status} locked={locked} />
                            <span className="w-9 text-xs font-semibold tracking-wider text-gold-deep">{l.code}</span>
                            <span className="min-w-0 flex-1 font-medium text-ink">{l.title}</span>
                            <span className="flex flex-wrap items-center gap-2">
                              {l.kind === "workshop" && <Badge tone="gold">Workshop</Badge>}
                              {l.is_preview && <Badge tone="info">Preview</Badge>}
                              {l.content_status === "in_preparation" && <Badge>In preparation</Badge>}
                              {l.video_status === "sample" && <Badge tone="warning">Sample video</Badge>}
                              <span className="flex items-center gap-1 text-xs text-ink-subtle lining-nums"><Clock aria-hidden className="size-3.5" />{l.duration_minutes} min · Week {l.week}</span>
                              {locked && <><Lock aria-hidden className="size-3.5 text-ink-subtle" /><span className="sr-only">Locked</span></>}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
