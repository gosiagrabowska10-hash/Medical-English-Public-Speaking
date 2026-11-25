import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Container, Section, SectionHeader } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { articles, forthcoming } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

export const metadata = pageMetadata({
  title: "Journal — Medical Public Speaking Insights",
  description:
    "Practical articles on medical public speaking, conference presentations, English communication for doctors, medical storytelling and media communication.",
  path: "/blog",
});

export default function BlogPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHero eyebrow="The Journal" title="Insights on medical communication." lead="Practical, evidence-informed guidance for medical professionals who present, teach and lead in English." />
      <Section tone="white">
        <Container>
          <Link href={`/blog/${lead.slug}`} className="group grid gap-8 border-b border-stone-deep pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <Badge tone="gold">{lead.category}</Badge>
              <h2 className="mt-5 font-serif text-h2 text-midnight decoration-gold decoration-1 underline-offset-8 group-hover:underline">{lead.title}</h2>
            </div>
            <div className="self-end">
              <p className="text-lead leading-relaxed text-ink-muted">{lead.description}</p>
              <p className="mt-5 text-sm text-ink-subtle">
                {formatDate(lead.published)} · {lead.readingMinutes} min read
              </p>
            </div>
          </Link>
          <div className="grid gap-x-12 md:grid-cols-2">
            {rest.map((a) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="group border-b border-stone-deep py-10">
                <Badge tone="gold">{a.category}</Badge>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-midnight decoration-gold decoration-1 underline-offset-8 group-hover:underline">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{a.description}</p>
                <p className="mt-4 text-sm text-ink-subtle">
                  {formatDate(a.published)} · {a.readingMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeader eyebrow="Forthcoming" title="In preparation." lead="Articles currently being written by the Academy editorial team." />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-stone-deep/70 md:grid-cols-2 lg:grid-cols-3">
            {forthcoming.map((f) => (
              <li key={f.title} className="bg-ivory p-7">
                <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle">{f.category}</p>
                <p className="mt-3 font-serif text-xl leading-snug text-midnight">{f.title}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
