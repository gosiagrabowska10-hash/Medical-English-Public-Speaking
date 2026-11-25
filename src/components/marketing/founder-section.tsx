import Link from "next/link";
import { founder } from "@/content/founder";
import { Monogram } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { EditorialVisual } from "@/components/marketing/editorial-visual";
import { Container, Eyebrow, Heading, Rule, Section } from "@/components/ui/typography";

export function FounderPortrait({ className }: { className?: string }) {
  if (founder.portrait) {
    return <EditorialVisual src={founder.portrait} alt={`Portrait of ${founder.name}`} className={className} />;
  }
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-sm bg-ivory-deep ring-1 ring-stone-deep ${className ?? ""}`}>
      <div className="absolute inset-5 border border-gold/40" aria-hidden />
      <div className="text-center">
        <Monogram className="mx-auto size-20" />
        <p className="mt-6 text-eyebrow font-semibold uppercase tracking-[0.2em] text-ink-subtle">Founder portrait</p>
        <p className="mt-1 text-xs text-ink-subtle">Photograph to be supplied</p>
      </div>
    </div>
  );
}

export function FounderSection() {
  return (
    <Section tone="white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <FounderPortrait className="aspect-[4/5] w-full max-w-md" />
          <div>
            <Eyebrow className="mb-6">
              <Rule />
              The Founder
            </Eyebrow>
            <Heading className="text-midnight">Founded on a Vision of Better Medical Communication.</Heading>
            <blockquote className="mt-8 border-l border-gold pl-6 font-serif text-[1.5rem] italic leading-[1.45] text-midnight md:text-[1.75rem]">
              {founder.message}
            </blockquote>
            <div className="mt-8">
              <p className="font-medium text-ink">{founder.name}</p>
              <p className="text-sm text-ink-subtle">{founder.title}</p>
            </div>
            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">{founder.positioning}</p>
            <Button asChild variant="link" className="mt-6">
              <Link href="/founder">Read the founder&rsquo;s profile</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
