import Link from "next/link";
import { ArrowRight, Clock, Lock, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type LessonStatus = "not_started" | "in_progress" | "completed" | "locked";
const statusMap: Record<LessonStatus, { label: string; tone: "neutral" | "info" | "success" | "warning" }> = {
  not_started: { label: "Not started", tone: "neutral" },
  in_progress: { label: "In progress", tone: "info" },
  completed: { label: "Completed", tone: "success" },
  locked: { label: "Locked", tone: "neutral" },
};

/** Course / lesson card. */
export function CourseCard({ code, title, summary, minutes, status, href }: { code: string; title: string; summary: string; minutes: number; status: LessonStatus; href: string }) {
  const s = statusMap[status];
  const locked = status === "locked";
  const inner = (
    <Card interactive={!locked} className={cn("flex h-full flex-col p-6", locked && "opacity-70")}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-gold-deep">{code}</span>
        <Badge tone={s.tone} dot>{s.label}</Badge>
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-snug text-midnight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{summary}</p>
      <div className="mt-auto flex items-center justify-between pt-6 text-sm text-ink-subtle">
        <span className="inline-flex items-center gap-1.5"><Clock aria-hidden className="size-4" /> {minutes} min</span>
        {locked ? <Lock aria-label="Locked" className="size-4" /> : <ArrowRight aria-hidden className="size-4 text-midnight" />}
      </div>
    </Card>
  );
  return locked ? inner : <Link href={href} className="block h-full">{inner}</Link>;
}

/** Progress summary card. */
export function ProgressCard({ title, value, detail }: { title: string; value: number; detail: string }) {
  return (
    <Card className="p-6">
      <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle">{title}</p>
      <p className="mt-3 font-serif text-5xl leading-none text-midnight tabular-nums lining-nums">{Math.round(value)}%</p>
      <Progress value={value} label={detail} className="mt-6" />
    </Card>
  );
}

/** Video lesson container. Renders a real <video> when src is provided. */
export function VideoLesson({ src, poster, captions, title }: { src?: string; poster?: string; captions?: string; title: string }) {
  return (
    <figure className="overflow-hidden rounded-sm bg-midnight shadow-soft">
      <div className="relative aspect-video">
        {src ? (
          <video controls preload="metadata" poster={poster} className="size-full" aria-label={title}>
            <source src={src} />
            {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
          </video>
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-4 text-ivory/70">
            <PlayCircle aria-hidden className="size-12 text-gold-light" strokeWidth={1} />
            <span className="text-sm">Video lesson not yet published</span>
          </div>
        )}
      </div>
      <figcaption className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-sm text-ivory/80">
        <span>{title}</span>
        {captions && <span className="text-xs uppercase tracking-[0.14em] text-ivory/50">Captions available</span>}
      </figcaption>
    </figure>
  );
}
