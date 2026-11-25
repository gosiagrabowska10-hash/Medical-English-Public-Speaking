import Link from "next/link";
import { ArrowRight, AudioLines, FileAudio, MessagesSquare, Mic, UserCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { Container, Eyebrow, Heading, Lead, Rule, Section, SectionHeader } from "@/components/ui/typography";
import { EditorialVisual } from "@/components/marketing/editorial-visual";
import { TeacherGrid } from "@/components/marketing/teacher-card";
import { ModuleIndex } from "@/components/marketing/module-list";
import { PricingCard } from "@/components/marketing/pricing-card";
import { FounderSection } from "@/components/marketing/founder-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { faq } from "@/content/faq";
import { site } from "@/lib/site";
import { JsonLd, courseSchema, organizationSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Medical Public Speaking & English Communication for Doctors",
  description:
    "A ten-week international program helping non-native English-speaking doctors present research, speak at conferences and answer difficult questions with confidence. AI practice plus human feedback.",
  path: "/",
});

const challenges = [
  { t: "Speaking anxiety", d: "Fear of public speaking is common, and it is often amplified when you have to present in a second language." },
  { t: "Complex research, limited time", d: "Turning years of work into ten clear minutes for an international audience is a skill in its own right." },
  { t: "Conference confidence", d: "Expertise that is obvious in your own language can feel harder to convey from an international stage." },
  { t: "Difficult questions", d: "Unexpected, critical or unclear questions are hardest to handle when you also search for the right words." },
  { t: "Pace and monotone", d: "Under pressure, many speakers rush, drop pauses and lose the vocal variety that keeps listeners engaged." },
  { t: "Reaching international audiences", d: "Mixed audiences need clearer structure, simpler sentences and stronger signposting than a home audience." },
];

const outcomes = [
  "Professional speaking confidence",
  "Clearer, more structured communication",
  "Stronger presentation architecture",
  "Effective and ethical medical storytelling",
  "Greater stage presence and vocal control",
  "Composure when handling questions",
  "Improved English speaking intelligibility",
];

const pillars = [
  { n: "I", t: "Learn", d: "Concise lessons on the principles of medical communication, with professional examples." },
  { n: "II", t: "Practise", d: "Targeted exercises with specialised AI teachers, as often as your schedule allows." },
  { n: "III", t: "Simulate", d: "Realistic conferences, interviews and question sessions in a safe environment." },
  { n: "IV", t: "Receive Feedback", d: "AI analysis of what can be measured, and human expertise where judgement matters." },
  { n: "V", t: "Improve", d: "Compare attempts, track progress and refine your delivery week by week." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={courseSchema} />

      {/* 1 — HERO */}
      <section className="relative overflow-hidden bg-ivory">
        <Container size="wide" className="grid items-center gap-12 pb-20 pt-12 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28">
          <div className="animate-fade-up">
            <Eyebrow className="mb-8">
              <Rule />
              An International Academy for Medical Professionals
            </Eyebrow>
            <Heading as="h1" size="display" className="text-midnight">
              Your Expertise Deserves to Be&nbsp;Heard.
            </Heading>
            <Lead className="mt-8 max-w-xl text-ink-muted">
              Develop the confidence, clarity and communication skills to present your medical expertise to the world.
            </Lead>
            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/about">Explore the Academy</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/curriculum">Discover the Program</Link>
              </Button>
            </div>
            <dl className="mt-16 grid max-w-xl grid-cols-2 gap-y-8 border-t border-stone-deep pt-8 sm:grid-cols-4">
              {[
                [String(site.program.weeks), "Weeks"],
                [String(site.program.modules), "Modules"],
                [String(site.program.lessons), "Lessons"],
                [String(site.program.workshops), "Workshops"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block font-serif text-4xl leading-none text-midnight">{v}</span>
                    <span className="mt-2 block text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <EditorialVisual variant="arcs" priority className="aspect-[4/3] w-full sm:aspect-[4/5]" />
            <div className="absolute -bottom-6 left-6 right-6 rounded-sm bg-white p-6 shadow-lifted md:-left-10 md:right-auto md:max-w-xs">
              <p className="font-serif text-xl leading-snug text-midnight">&ldquo;{site.secondary}&rdquo;</p>
              <p className="mt-3 text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-deep">The Academy Principle</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — THE PROBLEM */}
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="The Challenge"
            title="Brilliant medicine is not always heard clearly."
            lead="Many highly accomplished doctors and researchers feel that speaking in English does not reflect the depth of their knowledge. These are the challenges we hear most often."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-stone-deep/70 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((c, i) => (
              <div key={c.t} className="bg-white p-8 md:p-10">
                <span className="font-serif text-lg text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-serif text-2xl text-midnight">{c.t}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{c.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3 — TRANSFORMATION */}
      <Section tone="midnight">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <SectionHeader
            light
            eyebrow="The Transformation"
            title="From knowing your subject to commanding the room."
            lead="The program is built around practical communication outcomes. Progress depends on your starting point and the practice you invest; we do not promise career or clinical results — we promise a rigorous method and honest feedback."
          />
          <ul className="self-end border-t border-white/12">
            {outcomes.map((o) => (
              <li key={o} className="flex items-center justify-between gap-6 border-b border-white/12 py-5">
                <span className="font-serif text-[1.375rem] text-ivory md:text-2xl">{o}</span>
                <ArrowRight aria-hidden className="size-4 shrink-0 text-gold-light" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4 — METHOD */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader eyebrow="The Academy Method" title="Five pillars. One continuous cycle." />
            <Button asChild variant="link" className="self-start md:self-auto">
              <Link href="/methodology">Read the methodology</Link>
            </Button>
          </div>
          <ol className="mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
            {pillars.map((p) => (
              <li key={p.t} className="border-t border-midnight pt-6">
                <span className="font-serif text-xl text-gold-deep">{p.n}</span>
                <h3 className="mt-3 font-serif text-2xl text-midnight">{p.t}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 5 — PROGRAM */}
      <Section tone="white">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <EditorialVisual variant="grid" className="order-last aspect-[5/4] w-full lg:order-first" />
          <div>
            <SectionHeader
              eyebrow="The Program"
              title="A ten-week professional program."
              lead="A structured weekly path from foundations to a final medical keynote. Each lesson combines explanation, examples, practical exercises, AI practice and a short knowledge check."
            />
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-stone-deep/70">
              {[
                ["10", "weeks of guided learning"],
                ["12", "modules"],
                ["30", "core lessons"],
                ["6", "practical workshops"],
              ].map(([v, l]) => (
                <div key={l} className="bg-ivory p-6">
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block font-serif text-5xl leading-none text-midnight">{v}</span>
                    <span className="mt-3 block text-sm text-ink-muted">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <Button asChild className="mt-10">
              <Link href="/curriculum">View the full curriculum</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 6 — AI FACULTY */}
      <Section tone="navy">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader
              light
              eyebrow="The AI Learning Faculty"
              title="Six specialised practice partners."
              lead="Each AI teacher has a distinct role, teaching style and set of exercises — so you can practise the right skill, at the right difficulty, whenever you have time."
            />
            <Button asChild variant="outline-light">
              <Link href="/ai-teachers">Meet the AI Faculty</Link>
            </Button>
          </div>
          <div className="mt-16">
            <TeacherGrid dark />
          </div>
        </Container>
      </Section>

      {/* 7 — SPEAKING STUDIO */}
      <Section>
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <SectionHeader
              eyebrow="The Speaking Studio"
              title="Record. Review. Refine."
              lead="A focused workspace for rehearsing your presentations. You see a transcript of what you said and objective measures of how you said it — so each attempt improves on the last."
            />
            <ol className="mt-10 space-y-6">
              {[
                { i: Mic, t: "Record", d: "Rehearse with audio, or video where your device supports it, after giving recording consent." },
                { i: FileAudio, t: "Transcribe and analyse", d: "Your recording is transcribed and analysed for speaking pace, pauses, filler words and repetition." },
                { i: MessagesSquare, t: "Receive feedback", d: "Clear explanations of language and structure, with a specific next improvement challenge." },
                { i: AudioLines, t: "Compare attempts", d: "Track how your delivery changes across rehearsals of the same talk." },
              ].map(({ i: Icon, t, d }) => (
                <li key={t} className="flex gap-5">
                  <span className="flex size-11 shrink-0 items-center justify-center border border-gold/60 text-midnight">
                    <Icon aria-hidden className="size-5" strokeWidth={1.4} />
                  </span>
                  <span>
                    <span className="block font-medium text-ink">{t}</span>
                    <span className="mt-1 block leading-relaxed text-ink-muted">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Button asChild variant="link" className="mt-8">
              <Link href="/speaking-studio">Explore the Speaking Studio</Link>
            </Button>
          </div>
          <StudioPreview />
        </Container>
      </Section>

      {/* 8 — HUMAN FEEDBACK */}
      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="Human Expert Feedback"
            title="Technology for practice. People for judgement."
            lead="AI makes frequent practice possible. Your most important milestones are reviewed by people."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <Card className="p-8 md:p-10">
              <Users aria-hidden className="size-6 text-gold-deep" strokeWidth={1.4} />
              <h3 className="mt-6 font-serif text-3xl text-midnight">Group coaching session</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                A live session with an Academy instructor and fellow participants, focused on delivery, structure and handling questions — and a full rehearsal ahead of your final keynote.
              </p>
            </Card>
            <Card className="p-8 md:p-10">
              <UserCheck aria-hidden className="size-6 text-gold-deep" strokeWidth={1.4} />
              <h3 className="mt-6 font-serif text-3xl text-midnight">Human-reviewed final presentation</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Your 8–10-minute medical keynote is reviewed by an Academy instructor against the published assessment rubric, with written, timestamped feedback. Final results are approved by an authorised assessor.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* 9 — FOUNDER */}
      <FounderSection />

      {/* 10 — CURRICULUM */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader eyebrow="Curriculum" title="Twelve modules, from confidence to keynote." />
            <Button asChild variant="link" className="self-start md:self-auto">
              <Link href="/curriculum">See every lesson</Link>
            </Button>
          </div>
          <div className="mt-14">
            <ModuleIndex />
          </div>
        </Container>
      </Section>

      {/* 11 — PRICING */}
      <Section tone="stone" id="pricing">
        <Container>
          <SectionHeader align="center" eyebrow="Tuition" title="The Professional Program" lead="One comprehensive program, with everything you need to complete it included." className="mb-14" />
          <PricingCard />
        </Container>
      </Section>

      {/* 12 — FAQ */}
      <Section tone="white">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow="Questions" title="Before you apply." />
            <Button asChild variant="link" className="mt-6">
              <Link href="/faq">All questions</Link>
            </Button>
          </div>
          <Accordion items={faq.slice(0, 7).map((f) => ({ q: f.q, a: f.a }))} />
        </Container>
      </Section>

      {/* 13 — FINAL CTA */}
      <CtaBand />
    </>
  );
}

function StudioPreview() {
  const bars = [14, 28, 42, 22, 56, 34, 62, 40, 18, 48, 70, 36, 24, 52, 30, 64, 44, 20, 38, 58, 26, 46, 16, 34, 54, 28, 40, 22];
  return (
    <figure aria-label="Illustration of the Speaking Studio interface" className="on-dark relative rounded-sm bg-midnight p-6 text-ivory shadow-lifted md:p-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-ivory/50">
        <span>Speaking Studio</span>
        <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.625rem] normal-case tracking-normal text-ivory/60">Interface illustration</span>
      </div>
      <p className="mt-6 font-serif text-2xl">Conference opening — attempt 3</p>
      <div className="mt-6 flex h-20 items-center gap-[3px]" aria-hidden>
        {bars.map((h, i) => (
          <span key={i} className="flex-1 rounded-full bg-gold/70" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xs bg-white/10 text-center">
        {["Speaking pace", "Pauses", "Filler words"].map((m) => (
          <div key={m} className="bg-navy px-3 py-4">
            <span className="block text-[0.6875rem] uppercase tracking-[0.14em] text-ivory/55">{m}</span>
            <span className="mt-2 block font-serif text-lg text-gold-light">Measured</span>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-xs leading-relaxed text-ivory/50">
        Illustration only. Real reports show metrics measured from your own recording.
      </figcaption>
    </figure>
  );
}
