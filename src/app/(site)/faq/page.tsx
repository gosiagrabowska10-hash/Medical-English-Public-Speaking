import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Container, Section } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { faq } from "@/content/faq";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about English level, programme duration, AI teachers, human feedback, assessments, certificates and access for the Medical Public Speaking Professional Programme.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHero eyebrow="Questions" title="Frequently asked questions." lead="If your question is not answered here, our admissions team will be glad to help." />
      <Section tone="white">
        <Container size="narrow">
          <Accordion items={faq.map((f) => ({ q: f.q, a: f.a }))} />
          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <Button asChild>
              <Link href="/contact">Ask a question</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">Tuition and admissions</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
