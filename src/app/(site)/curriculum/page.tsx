import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { ModuleList } from "@/components/marketing/module-list";
import { CtaBand } from "@/components/marketing/cta-band";
import { totals } from "@/content/curriculum";
import { JsonLd, courseSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Curriculum — 12 Modules, 30 Lessons, 6 Workshops",
  description:
    "The complete ten-week curriculum of the Medical Public Speaking Professional Program: confidence, spoken English, voice, structure, storytelling, conferences, difficult questions, media and a final medical keynote.",
  path: "/curriculum",
});

export default function CurriculumPage() {
  return (
    <>
      <JsonLd data={courseSchema} />
      <PageHero
        eyebrow="Curriculum"
        title="Ten weeks from confidence to keynote."
        lead={`${totals.modules} modules, ${totals.lessons} core lessons and ${totals.workshops} practical workshops. Every lesson includes learning objectives, detailed explanation, examples, a practical exercise, an AI teacher activity, a knowledge check and an assignment.`}
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/pricing">Tuition and admissions</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/methodology">How lessons work</Link>
          </Button>
        </div>
      </PageHero>
      <Section tone="ivory" className="pt-12 md:pt-16">
        <Container>
          <ModuleList />
        </Container>
      </Section>
      <CtaBand title="Ready to begin the program?" />
    </>
  );
}
