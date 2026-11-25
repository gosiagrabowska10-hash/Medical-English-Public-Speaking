import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Eyebrow, Heading, Rule, Section, SectionHeader } from "@/components/ui/typography";
import { FounderPortrait } from "@/components/marketing/founder-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { founder } from "@/content/founder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Founder",
  description:
    "The founder of The Medical Speaking Academy: the vision, philosophy and educational standards behind an academy for medical public speaking.",
  path: "/founder",
});

const philosophy = [
  { t: "Expertise first", d: "Our participants are already experts. The aim is not to change who they are, but to let their expertise come through clearly in English." },
  { t: "Clarity is a form of respect", d: "A clear talk respects the audience’s time and attention. Clarity is a professional responsibility, not a stylistic preference." },
  { t: "Confidence through practice", d: "Confidence is built by preparation and repetition, not by being told to be confident." },
  { t: "An institution, not a personality", d: "The Academy is built on shared standards, a published rubric and a faculty — so its quality does not depend on any single person." },
];

export default function FounderPage() {
  return (
    <>
      <section className="bg-ivory pb-20 pt-14 md:pb-28 md:pt-20">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <FounderPortrait className="aspect-[4/5] w-full max-w-md" />
          <div>
            <Eyebrow className="mb-7">
              <Rule />
              The Founder
            </Eyebrow>
            <Heading as="h1" size="h1" className="text-midnight">{founder.name}</Heading>
            <p className="mt-4 text-lg text-ink-muted">{founder.title}</p>
            {!founder.verified && (
              <Badge tone="warning" className="mt-6">Profile pending verified information</Badge>
            )}
            <p className="mt-8 max-w-xl text-lead leading-relaxed text-ink-muted">{founder.positioning}</p>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <SectionHeader eyebrow="Founder's Message" title="Why I founded the Academy." />
            <blockquote className="mt-10 border-l border-gold pl-6 font-serif text-2xl italic leading-[1.5] text-midnight">{founder.message}</blockquote>
          </div>
          <div>
            <SectionHeader eyebrow="Biography" title="Professional background." />
            <p className="mt-10 leading-relaxed text-ink-muted">{founder.shortBio}</p>
            {founder.background.length > 0 && (
              <ul className="mt-6 space-y-2">
                {founder.background.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Philosophy" title="The educational vision." />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {philosophy.map((p) => (
              <div key={p.t} className="border-t border-midnight pt-6">
                <h3 className="font-serif text-2xl text-midnight">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="midnight">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div className="relative flex aspect-video items-center justify-center rounded-sm bg-navy ring-1 ring-white/10">
            <span className="flex size-16 items-center justify-center rounded-full border border-gold-light/60 text-gold-light">
              <Play aria-hidden className="ml-1 size-6" strokeWidth={1.3} />
            </span>
            <span className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.2em] text-ivory/50">Introduction video forthcoming</span>
          </div>
          <SectionHeader
            light
            eyebrow="A Personal Introduction"
            title="Meet the founder on video."
            lead="A short introduction to the Academy, its mission and what participants can expect will be published here."
          />
        </Container>
      </Section>

      <Section tone="white">
        <Container size="narrow" className="text-center">
          <SectionHeader
            align="center"
            eyebrow="Professional Enquiries"
            title="Speaking, partnerships and media."
            lead="For institutional partnerships, invitations to speak, or media requests, please contact the founder's office."
          />
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/contact?topic=founder">Contact the founder&rsquo;s office</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">Read the Journal</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
