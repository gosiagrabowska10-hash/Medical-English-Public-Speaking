import { Container, Section, SectionHeader } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { TeacherDetail, aiTeachers } from "@/components/marketing/teacher-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The AI Learning Faculty",
  description:
    "Six specialised AI teachers for medical public speaking practice: Speaking Mentor, Voice Coach, Presentation Coach, Media Interviewer, Conference Audience and English Speaking Coach.",
  path: "/ai-teachers",
});

const how = [
  { t: "One question at a time", d: "Sessions are conversations, not lectures. Each teacher asks, listens, then responds to what you actually said." },
  { t: "Corrections with reasons", d: "When something can be improved, you are told what, why it matters for your audience, and how to try again." },
  { t: "Adaptive difficulty", d: "Exercises become more demanding as you succeed, and simpler when you need consolidation." },
  { t: "Connected to your progress", d: "Sessions are linked to your current lessons, so practice reinforces what you are learning that week." },
];

export default function AiTeachersPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Learning Faculty"
        title="Six teachers. Six distinct purposes."
        lead="Each AI teacher has its own role, teaching style, objectives and exercises. Together they give you a place to practise every skill in the programme — whenever your clinical schedule allows."
      />
      <Section tone="white" className="py-0 md:py-0 lg:py-0">
        <Container>
          {aiTeachers.map((t, i) => (
            <TeacherDetail key={t.slug} t={t} index={i} />
          ))}
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader eyebrow="How AI Teaching Works" title="Conversation and active practice." />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {how.map((h) => (
              <div key={h.t} className="border-t border-midnight pt-6">
                <h3 className="font-serif text-2xl text-midnight">{h.t}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{h.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-16 max-w-3xl border-l border-gold pl-6 text-[0.9375rem] leading-relaxed text-ink-muted">
            <strong className="font-medium text-ink">A note on AI.</strong> AI teachers are software, not people, and they can make mistakes. They are designed for practice and preliminary feedback. They do not give medical advice, and they do not make assessment or certification decisions — those are made by authorised Academy staff.
          </p>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
