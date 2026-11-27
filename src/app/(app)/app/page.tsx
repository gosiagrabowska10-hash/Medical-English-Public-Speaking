import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Circle, Mic, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { aiTeachers } from "@/content/teachers";
import { TeacherGlyph } from "@/components/marketing/teacher-card";
import { LEARNER_ADMIN_ROLES, requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getCurriculum } from "@/lib/course";
import { Progress } from "@/components/ui/progress";
import Loading from "./loading";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const user = await requireUser("/app");
  const supabase = (await createClient())!;
  const [{ data: consents }, course] = await Promise.all([supabase.from("current_consents").select("kind,granted").eq("user_id", user.id), getCurriculum()]);
  const lessons = course.modules.flatMap((m) => m.lessons);
  const next = lessons.find((l) => l.status === "in_progress") ?? lessons.find((l) => l.status === "not_started" && !l.locked && (course.enrolled || l.is_preview));
  const recordingConsent = consents?.some((c) => c.kind === "recording" && c.granted) ?? false;
  const profileComplete = Boolean(user.profile.country && user.profile.specialty);
  const salutation = user.profile.title === "Dr" || user.profile.title === "Prof." ? `${user.profile.title} ${user.profile.last_name}` : user.profile.first_name;

  const steps = [
    { done: true, label: "Create your account", href: null },
    { done: profileComplete, label: "Complete your professional profile", href: "/app/settings#profile" },
    { done: recordingConsent, label: "Review recording consent for the Speaking Studio", href: "/app/settings#privacy" },
  ];
  const remaining = steps.filter((s) => !s.done).length;

  return (
    <div className="space-y-10">
      <header>
        <Eyebrow className="mb-4"><Rule />Student Dashboard</Eyebrow>
        <h1 className="font-serif text-h1 text-midnight">Welcome back, {salutation}.</h1>
        <p className="mt-4 max-w-2xl text-lead text-ink-muted">
          {remaining > 0
            ? `Your account is ready. ${remaining === 1 ? "One step remains" : `${remaining} steps remain`} before your programme begins.`
            : "Your account is fully prepared. Your learning path will appear here when your programme begins."}
        </p>
      </header>

      {user.isStaff && (
        <Card className="on-dark border-0 bg-midnight p-7 text-ivory md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl">Staff tools</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ivory/75">
                {user.aal === "aal2"
                  ? "Your session is verified with two-factor authentication. Learner data and staff tools are available."
                  : "Staff access to learner data requires two-factor authentication. Set it up in Account Settings, then sign in again with your code."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {user.aal === "aal2" && user.roles.some((r) => LEARNER_ADMIN_ROLES.includes(r)) && (
                <Button asChild variant="outline-light"><Link href="/app/admin/learners">Learners and enrolment</Link></Button>
              )}
              <Button asChild variant={user.aal === "aal2" ? "gold" : "outline-light"}>
                <Link href={user.aal === "aal2" ? "/app/staff/assessments" : "/app/settings#security"}>{user.aal === "aal2" ? "Workshop assessments" : "Set up two-factor authentication"}</Link>
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-7 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-midnight">Getting started</h2>
            <Badge tone={remaining ? "info" : "success"} dot>{steps.length - remaining} of {steps.length} complete</Badge>
          </div>
          <ul className="mt-6 divide-y divide-stone">
            {steps.map((s) => (
              <li key={s.label} className="flex items-center gap-4 py-4">
                {s.done ? <CheckCircle2 aria-hidden className="size-5 text-success" /> : <Circle aria-hidden className="size-5 text-stone-deep" />}
                <span className={s.done ? "flex-1 text-ink-muted line-through decoration-stone-deep" : "flex-1 text-ink"}>{s.label}</span>
                {!s.done && s.href && <Button asChild variant="link" size="sm"><Link href={s.href}>Open</Link></Button>}
                <span className="sr-only">{s.done ? "Completed" : "Not completed"}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card tone="dark" className="flex flex-col p-7 md:p-8">
          <BookOpen aria-hidden className="size-6 text-gold-light" strokeWidth={1.4} />
          <h2 className="mt-5 font-serif text-2xl">Your programme</h2>
          {course.enrolled ? (
            <>
              <div className="mt-4 [&_span]:text-ivory/80"><Progress value={course.totals.mandatory ? (course.totals.completed / course.totals.mandatory) * 100 : 0} label={`${course.totals.completed} of ${course.totals.mandatory} lessons and workshops completed`} /></div>
              {next && <p className="mt-4 text-sm text-ivory/70">Next: <span className="text-ivory">{next.code} · {next.title}</span></p>}
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-ivory/70">
              You are not enrolled in a cohort yet. Lesson 1 is open as a preview; the full ten-week programme unlocks when your enrolment is confirmed.
            </p>
          )}
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {next && <Button asChild variant="gold"><Link href={`/app/learn/${next.code}`}>{next.status === "in_progress" ? "Continue learning" : course.enrolled ? "Start learning" : "Open the preview lesson"} <ArrowRight /></Link></Button>}
            <Button asChild variant="outline-light"><Link href="/app/curriculum">Curriculum</Link></Button>
          </div>
        </Card>
      </div>

      <section aria-labelledby="faculty-heading">
        <div className="flex items-end justify-between">
          <h2 id="faculty-heading" className="font-serif text-3xl text-midnight">Your AI Faculty</h2>
          <Badge>Opens in Stage 4</Badge>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiTeachers.map((t) => (
            <li key={t.slug} className="flex items-center gap-4 rounded-sm bg-white p-5 shadow-hairline">
              <TeacherGlyph slug={t.slug} className="size-11 text-midnight" />
              <span>
                <span className="block font-serif text-xl text-midnight">AI {t.name}</span>
                <span className="block text-sm text-ink-subtle">{t.focus}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="p-7">
          <Mic aria-hidden className="size-5 text-gold-deep" strokeWidth={1.4} />
          <h2 className="mt-4 font-serif text-2xl text-midnight">Speaking practice</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">No recordings yet. Your recordings and performance reports will appear here once the Speaking Studio opens.</p>
        </Card>
        <Card className="p-7">
          <ShieldCheck aria-hidden className="size-5 text-gold-deep" strokeWidth={1.4} />
          <h2 className="mt-4 font-serif text-2xl text-midnight">Your data, your control</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">Download a copy of your data, manage consents or request deletion at any time.</p>
          <Button asChild variant="link" className="mt-4"><Link href="/app/settings#privacy">Privacy settings</Link></Button>
        </Card>
      </div>
    </div>
  );
}
