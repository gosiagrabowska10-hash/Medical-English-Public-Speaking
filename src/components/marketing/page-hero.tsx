import { Container, Eyebrow, Heading, Lead, Rule } from "@/components/ui/typography";

/** Interior page hero — editorial, typographic, no imagery required. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="border-b border-stone-deep/60 bg-ivory pb-16 pt-16 md:pb-24 md:pt-24">
      <Container>
        <div className="max-w-4xl">
          <Eyebrow className="mb-7">
            <Rule />
            {eyebrow}
          </Eyebrow>
          <Heading as="h1" size="h1" className="text-midnight">{title}</Heading>
          {lead && <Lead className="mt-7 max-w-2xl text-ink-muted">{lead}</Lead>}
          {children}
        </div>
      </Container>
    </section>
  );
}
