import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/course/video-player";
import { LessonTabs } from "@/components/course/lesson-tabs";
import { CurriculumSidebar } from "@/components/course/curriculum-sidebar";
import { CompletionPanel } from "@/components/course/completion-panel";
import { AiTeacherCard } from "@/components/course/ai-teacher-card";
import { requireUser } from "@/lib/auth";
import { getCurriculum, getLesson, type LessonBody } from "@/lib/course";
import Loading from "../../loading";

export const metadata = { title: "Lesson" };

export default function LessonPage({ params }: PageProps<"/app/learn/[code]">) {
  return (
    <Suspense fallback={<Loading />}>
      <Lesson params={params} />
    </Suspense>
  );
}

function LessonText({ body, inPreparation }: { body: LessonBody; inPreparation: boolean }) {
  return (
    <article className="prose-academy">
      {inPreparation && (
        <p className="rounded-sm border border-dashed border-stone-deep bg-white p-4 text-[0.9375rem] !text-ink-muted">
          <strong>Outline only.</strong> The full written lesson, exercise, knowledge check and assignment for this item are in preparation. The summary and module outcomes below show what it will cover.
        </p>
      )}
      <p className="!text-lead !text-ink">{body.intro}</p>
      <h2>Learning objectives</h2>
      <ul>{body.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
      {body.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </section>
      ))}
      {body.examples.length > 0 && (
        <>
          <h2>Professional examples</h2>
          {body.examples.map((e) => (<div key={e.title}><h3>{e.title}</h3><p>{e.text}</p></div>))}
        </>
      )}
      {body.demonstration && (<><h2>Demonstration</h2><p>{body.demonstration}</p></>)}
      {body.mistakes.length > 0 && (<><h2>Common mistakes</h2><ul>{body.mistakes.map((m) => <li key={m}>{m}</li>)}</ul></>)}
      {body.reflection.length > 0 && (<><h2>Reflection</h2><ul>{body.reflection.map((m) => <li key={m}>{m}</li>)}</ul></>)}
    </article>
  );
}

async function Lesson({ params }: { params: PageProps<"/app/learn/[code]">["params"] }) {
  const { code } = await params;
  await requireUser(`/app/learn/${code}`);
  const page = await getLesson(code);
  if (!page) notFound();
  const { modules, enrolled, totals } = await getCurriculum();
  const all = modules.flatMap((m) => m.lessons);
  const idx = all.findIndex((l) => l.id === page.lesson.id);
  const prev = all[idx - 1], next = all[idx + 1];
  const { lesson, module: mod } = page;

  return (
    <div className="flex gap-8">
      <div className="min-w-0 flex-1 space-y-8">
        <div>
          <p className="text-sm text-ink-subtle">
            <Link href="/app/curriculum" className="hover:text-ink">Curriculum</Link> / Module {String(mod.number).padStart(2, "0")} · {mod.title} / <span className="text-ink">{lesson.code}</span>
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-serif text-h2 text-midnight">{lesson.title}</h1>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge tone={page.progress?.status === "completed" ? "success" : page.progress ? "info" : "neutral"} dot>{page.progress?.status === "completed" ? "Completed" : page.progress ? "In progress" : "Not started"}</Badge>
              <Badge>{lesson.duration_minutes} min</Badge>
              <Badge>Week {lesson.week} of 10</Badge>
              {lesson.kind === "workshop" && <Badge tone="gold">Workshop</Badge>}
            </div>
          </div>
          <div className="mt-5"><CurriculumSidebarMobile modules={modules} code={lesson.code} enrolled={enrolled} completed={totals.completed} total={totals.mandatory} /></div>
        </div>

        {!page.access ? (
          <div className="rounded-sm bg-white p-8 text-center shadow-hairline md:p-12">
            <Lock aria-hidden className="mx-auto size-8 text-gold-deep" strokeWidth={1.3} />
            <h2 className="mt-5 font-serif text-3xl text-midnight">This lesson is part of the full program</h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-muted">{lesson.summary}</p>
            <p className="mx-auto mt-3 max-w-lg text-sm text-ink-subtle">Lessons unlock when your enrolment is confirmed. Lesson 1 is available as a preview.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild><Link href="/app/learn/L01">Open the preview lesson</Link></Button>
              <Button asChild variant="outline"><Link href="/pricing">Tuition and enrolment</Link></Button>
            </div>
          </div>
        ) : (
          <>
            <VideoPlayer
              lessonId={lesson.id}
              title={`${lesson.code} · ${lesson.title}`}
              src={page.content?.video_url ?? null}
              captions={page.content?.captions_url ?? null}
              status={lesson.video_status}
              note={page.content?.video_note ?? null}
              startAt={page.progress?.video_position_s ?? 0}
            />
            <LessonTabs page={page} lessonContent={<LessonText body={page.content!.body} inPreparation={lesson.content_status === "in_preparation"} />} />
            <CompletionPanel page={page} />
            <AiTeacherCard slug={lesson.ai_teacher} lessonTitle={lesson.title} />
          </>
        )}

        <nav aria-label="Lesson navigation" className="grid grid-cols-2 gap-4 border-t border-stone-deep pt-6">
          {prev ? (
            <Link href={`/app/learn/${prev.code}`} className="group flex min-w-0 items-start gap-2 rounded-xs p-2 text-sm text-ink-muted hover:bg-stone/60 hover:text-ink">
              <ArrowLeft aria-hidden className="mt-0.5 size-4 shrink-0" />
              <span className="min-w-0"><span className="block text-xs uppercase tracking-[0.14em] text-ink-subtle">Previous</span><span className="block">{prev.code}<span className="hidden sm:inline"> · {prev.title}</span></span></span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/app/learn/${next.code}`} className="group flex min-w-0 items-start justify-end gap-2 rounded-xs p-2 text-right text-sm text-ink-muted hover:bg-stone/60 hover:text-ink">
              <span className="min-w-0"><span className="block text-xs uppercase tracking-[0.14em] text-ink-subtle">Next</span><span className="block">{next.code}<span className="hidden sm:inline"> · {next.title}</span></span></span>
              <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0" />
            </Link>
          ) : <span />}
        </nav>
      </div>
      <CurriculumSidebarDesktop modules={modules} code={lesson.code} enrolled={enrolled} completed={totals.completed} total={totals.mandatory} />
    </div>
  );
}

type SidebarProps = { modules: Awaited<ReturnType<typeof getCurriculum>>["modules"]; code: string; enrolled: boolean; completed: number; total: number };
function CurriculumSidebarDesktop(p: SidebarProps) {
  return <div className="hidden xl:block"><CurriculumSidebar modules={p.modules} currentCode={p.code} enrolled={p.enrolled} completed={p.completed} total={p.total} /></div>;
}
function CurriculumSidebarMobile(p: SidebarProps) {
  return <div className="xl:hidden"><CurriculumSidebar modules={p.modules} currentCode={p.code} enrolled={p.enrolled} completed={p.completed} total={p.total} /></div>;
}
