import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { EditorialVisual } from "@/components/marketing/editorial-visual";
import { CtaBand } from "@/components/marketing/cta-band";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the Academy",
  description:
    "The Medical Speaking Academy is an independent international academy dedicated to medical public speaking and professional English communication for non-native English-speaking medical professionals.",
  path: "/about",
});

const principles = [
  { t: "Intelligibility over perfection", d: "We do not try to erase accents. We help you be clearly understood by international audiences, which is what actually matters on stage." },
  { t: "Practice over theory", d: "Every principle is followed by deliberate practice: recording, simulating, reviewing and repeating." },
  { t: "Honest feedback", d: "AI measures what technology can measure reliably. Human instructors judge what requires professional judgement. We are explicit about which is which." },
  { t: "Scientific integrity", d: "Clear communication never comes at the expense of accuracy. We teach you to simplify without distorting evidence." },
  { t: "Confidentiality", d: "We teach ethical case narratives and never ask you to share identifiable patient information." },
  { t: "Respect for expertise", d: "Our participants are experienced professionals. The program is designed to respect their time, knowledge and professional standing." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Academy"
        title="An academy for the international voice of medicine."
        lead="The Medical Speaking Academy is an independent, founder-led international academy specialising in medical public speaking and professional communication for medical professionals whose first language is not English."
      />

      <Section tone="white">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div className="prose-academy">
            <h2 className="!mt-0">Why the Academy exists</h2>
            <p>
              Medicine is practised locally but discussed globally. Research is presented at international congresses, guidelines are debated across borders, and clinicians increasingly teach, publish and speak in English — often in a language they learned long after they learned medicine.
            </p>
            <p>
              Many of these professionals are outstanding in their fields. Yet when they speak in English, they often feel that their words do not carry the authority their knowledge deserves. General language courses rarely address this. Generic public speaking training rarely understands medicine.
            </p>
            <p>
              The Academy was created for exactly this intersection: <strong>medical expertise, public speaking and English as a professional language</strong>.
            </p>
            <h2>Who we teach</h2>
            <p>
              Physicians, surgeons, researchers, medical educators, residents and other healthcare professionals who use English professionally and want to present, teach, lead and answer questions with greater clarity and confidence.
            </p>
            <h2>How we teach</h2>
            <p>
              The ten-week Professional Program combines structured lessons, practice with six specialised AI teachers, a recording and analysis studio, realistic simulations and human feedback at the most important milestones. You can read more about our approach in the <Link href="/methodology">Methodology</Link>.
            </p>
          </div>
          <EditorialVisual variant="lectern" className="aspect-[4/5] w-full lg:sticky lg:top-28 lg:self-start" />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Our Principles" title="Standards we hold ourselves to." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-stone-deep/70 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <div key={p.t} className="bg-ivory p-8 md:p-10">
                <h3 className="font-serif text-2xl text-midnight">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Transparency"
            title="What our certificate is — and is not."
            lead="Graduates who meet every published requirement receive an Academy Certificate of Completion with a unique number and online verification. It is issued by The Medical Speaking Academy. The Academy is not a university, and the program does not currently carry external accreditation or CME/CPD credit. If that changes, it will be stated here with documented authorisation."
          />
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/founder">Meet the founder</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/instructors">Our faculty</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
