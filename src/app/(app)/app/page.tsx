import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Circle, Mic, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { aiTeachers } from "@/content/teachers";
import { TeacherGlyph } from "@/components/marketing/teacher-card";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
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
  const { data: consents } = await supabase.from("current_consents").select("kind,granted");
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
            ? `Your account is ready. ${remaining === 1 ? "One step remains" : `${remaining} steps remain`} before your program begins.`
            : "Your account is fully prepared. Your learning path will appear here when your program begins."}
        </p>
      </header>

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
          <h2 className="mt-5 font-serif text-2xl">Your program</h2>
          <p className="mt-3 text-sm leading-relaxed text-ivory/70">
            You are not enrolled in a cohort yet. Once enrolment is confirmed, your ten-week learning path, lessons and progress will appear here.
          </p>
          <div className="mt-auto pt-6">
            <Button asChild variant="gold"><Link href="/curriculum">Review the curriculum <ArrowRight /></Link></Button>
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
