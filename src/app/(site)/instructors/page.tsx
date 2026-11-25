import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { FounderSection } from "@/components/marketing/founder-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Faculty",
  description:
    "The human faculty of The Medical Speaking Academy: the standards our instructors and assessors meet, and the roles they play in coaching and assessment.",
  path: "/instructors",
});

const roles = [
  { t: "Instructors", d: "Lead the group coaching session, review submitted speaking assignments, and provide written and timestamped feedback." },
  { t: "Assessors", d: "Evaluate final presentations against the published rubric. Only authorised assessors can approve a final result." },
  { t: "Academic Director", d: "Oversees curriculum quality, assessment standards and the consistency of feedback across the faculty." },
];

const standards = [
  "Substantial professional experience in public speaking, presentation coaching or communication teaching",
  "High-level English proficiency and experience working with non-native speakers",
  "Understanding of medical and scientific communication contexts",
  "Training in the Academy rubric before assessing any participant",
  "Regular calibration so that assessments are consistent and fair",
];

export default function InstructorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Faculty"
        title="The people behind your feedback."
        lead="AI makes daily practice possible. Human instructors and assessors provide the professional judgement at the moments that matter most."
      />

      <Section tone="white">
        <Container>
          <SectionHeader eyebrow="Faculty Roles" title="Who does what." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-stone-deep/70 md:grid-cols-3">
            {roles.map((r) => (
              <div key={r.t} className="bg-white p-8 md:p-10">
                <h3 className="font-serif text-3xl text-midnight">{r.t}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{r.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <SectionHeader
            eyebrow="Faculty Standards"
            title="What we require of every instructor."
            lead="Individual instructor profiles will be published here as faculty appointments are confirmed. We will only publish verified names, backgrounds and qualifications."
          />
          <ul className="self-end border-t border-stone-deep">
            {standards.map((s) => (
              <li key={s} className="flex gap-4 border-b border-stone-deep py-5 leading-relaxed text-ink">
                <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-gold" />
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FounderSection />

      <Section tone="stone">
        <Container size="narrow" className="text-center">
          <SectionHeader align="center" eyebrow="Join the Faculty" title="Teach with the Academy." lead="Experienced communication coaches and medical educators interested in teaching with the Academy are welcome to get in touch." />
          <Button asChild className="mt-10">
            <Link href="/contact?topic=faculty">Faculty enquiries</Link>
          </Button>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
