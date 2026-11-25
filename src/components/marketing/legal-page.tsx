import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title}>
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-ink-subtle">
          <span>Last updated: {updated}</span>
          <Badge tone="warning">Draft — pending legal review</Badge>
        </div>
      </PageHero>
      <Section tone="white">
        <Container size="narrow">
          <div className="prose-academy">
            <p className="rounded-sm bg-warning-bg p-5 text-[0.9375rem] text-warning">
              This document is a working draft prepared for the Academy&rsquo;s launch. Items in square brackets must be completed, and the full text must be reviewed by qualified legal counsel before the Academy accepts students or payments.
            </p>
            {children}
          </div>
        </Container>
      </Section>
    </>
  );
}
