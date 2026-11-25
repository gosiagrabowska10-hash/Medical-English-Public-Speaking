import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, Heading, Lead, Rule } from "@/components/ui/typography";

export function CtaBand({
  eyebrow = "Admissions",
  title = "Your Medical Knowledge Deserves a Stronger Voice.",
  lead = "Join an international cohort of medical professionals developing the confidence and clarity to present their expertise in English.",
  primary = { href: "/pricing#apply", label: "Apply to the Academy" },
  secondary = { href: "/curriculum", label: "View the Curriculum" },
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-midnight py-24 text-ivory md:py-32">
      <svg aria-hidden className="pointer-events-none absolute -right-40 top-1/2 h-[900px] w-[900px] -translate-y-1/2 opacity-60" viewBox="0 0 900 900">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx="450" cy="450" r={80 + i * 46} fill="none" stroke="#B69A68" strokeOpacity={0.28 - i * 0.028} strokeWidth="0.7" />
        ))}
      </svg>
      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow light className="mb-6">
            <Rule className="bg-gold-light" />
            {eyebrow}
          </Eyebrow>
          <Heading size="h1" className="text-ivory">{title}</Heading>
          <Lead className="mt-6 text-ivory/75">{lead}</Lead>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            {secondary && (
              <Button asChild variant="outline-light" size="lg">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
