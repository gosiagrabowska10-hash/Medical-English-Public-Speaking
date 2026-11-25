import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/typography";
import { CtaBand } from "@/components/marketing/cta-band";
import { articles } from "@/content/articles";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  const m = pageMetadata({ title: a.title, description: a.description, path: `/blog/${a.slug}` });
  return { ...m, openGraph: { ...m.openGraph, type: "article", publishedTime: a.published } };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: a.published,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/blog/${a.slug}`,
        }}
      />
      <article>
        <header className="border-b border-stone-deep/60 bg-ivory pb-14 pt-14 md:pb-20 md:pt-20">
          <Container size="narrow">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-midnight">
              <ArrowLeft aria-hidden className="size-4" /> The Journal
            </Link>
            <div className="mt-10">
              <Badge tone="gold">{a.category}</Badge>
            </div>
            <h1 className="mt-6 font-serif text-h1 text-balance text-midnight">{a.title}</h1>
            <p className="mt-6 text-lead text-ink-muted">{a.description}</p>
            <p className="mt-8 text-sm text-ink-subtle">
              {a.author} · <time dateTime={a.published}>{formatDate(a.published)}</time> · {a.readingMinutes} min read
            </p>
          </Container>
        </header>
        <Section tone="white">
          <Container size="narrow">
            <div className="prose-academy mx-auto">
              {a.body.map((b, i) => {
                if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
                if (b.type === "quote") return <blockquote key={i}>{b.text}</blockquote>;
                if (b.type === "ul")
                  return (
                    <ul key={i}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                return <p key={i}>{b.text}</p>;
              })}
            </div>
          </Container>
        </Section>
      </article>
      <CtaBand title="Practise these skills with structure and feedback." />
    </>
  );
}
