import { Suspense } from "react";
import { Container, Section } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { ContactForm } from "./contact-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact The Medical Speaking Academy about admissions, the programme, partnerships, faculty opportunities or media enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We would be glad to hear from you." lead="Questions about admissions, the programme, partnerships or media — send us a message and the right person will reply." />
      <Section tone="white">
        <Container className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div className="space-y-10">
            {[
              ["Admissions", "Questions about eligibility, English level, tuition and enrolment."],
              ["Partnerships", "Hospitals, universities, societies and congress organisers interested in working with the Academy."],
              ["Media", "Interview and press requests for the Academy and its founder."],
            ].map(([t, d]) => (
              <div key={t} className="border-t border-midnight pt-5">
                <h2 className="font-serif text-2xl text-midnight">{t}</h2>
                <p className="mt-2 leading-relaxed text-ink-muted">{d}</p>
              </div>
            ))}
          </div>
          <Suspense fallback={<div className="h-[560px] animate-pulse rounded-sm bg-ivory" aria-hidden />}>
            <ContactForm />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
