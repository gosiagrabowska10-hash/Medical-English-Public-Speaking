import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Container, Section, SectionHeader } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingCard } from "@/components/marketing/pricing-card";
import { faq } from "@/content/faq";
import { JsonLd, courseSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tuition & Admissions",
  description:
    "Tuition for the ten-week Medical Public Speaking Professional Programme: PLN 1,490, including AI practice, speaking analysis, group coaching and a human-reviewed final presentation.",
  path: "/pricing",
});

const steps = [
  ["Create your account", "Register with your professional details and confirm your email address."],
  ["Secure enrolment", "Complete payment through our secure payment provider. Access is granted once payment is confirmed by the provider — not before."],
  ["Initial assessment", "Complete a short diagnostic speaking assessment so your learning path reflects your starting point."],
  ["Begin Week 1", "Start Module 1 and meet your AI Faculty."],
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={courseSchema} />
      <PageHero
        eyebrow="Tuition & Admissions"
        title="One programme. Everything included."
        lead="The Professional Programme includes every lesson, workshop, AI practice tool, assessment and the human feedback described below. There are no additional course fees to complete the programme."
      />
      <Section tone="stone" className="pt-12 md:pt-16">
        <Container>
          <PricingCard />
        </Container>
      </Section>

      <Section tone="white" id="apply" className="scroll-mt-20">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <SectionHeader eyebrow="How to Apply" title="Four steps to your first lesson." />
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/register">Apply to the Academy</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact?topic=admissions">Contact admissions</Link>
              </Button>
            </div>
          </div>
          <ol className="border-t border-stone-deep">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-6 border-b border-stone-deep py-7">
                <span className="font-serif text-3xl leading-none text-gold-muted">{i + 1}</span>
                <span>
                  <span className="block font-serif text-2xl text-midnight">{t}</span>
                  <span className="mt-2 block leading-relaxed text-ink-muted">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="Questions" title="About tuition and the programme." />
          <Accordion items={faq.map((f) => ({ q: f.q, a: f.a }))} />
        </Container>
      </Section>
    </>
  );
}
