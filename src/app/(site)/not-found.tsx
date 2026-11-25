import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <Section>
      <Container size="narrow" className="py-10 text-center">
        <SectionHeader as="h1" align="center" eyebrow="Page not found" title="This page could not be found." lead="It may have moved, or the address may be incorrect." />
        <div className="mt-10 flex justify-center gap-4">
          <Button asChild><Link href="/">Return home</Link></Button>
          <Button asChild variant="outline"><Link href="/curriculum">View the curriculum</Link></Button>
        </div>
      </Container>
    </Section>
  );
}
