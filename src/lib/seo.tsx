import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is generated from trusted static config only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.url,
  slogan: site.tagline,
  description: site.description,
};

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: site.program.name,
  description:
    "A ten-week online program in medical public speaking and professional English communication for non-native English-speaking doctors and medical professionals: 12 modules, 30 lessons, 6 practical workshops, AI-assisted speaking practice and human-reviewed final assessment.",
  provider: { "@type": "EducationalOrganization", name: site.name, url: site.url },
  inLanguage: "en",
  educationalCredentialAwarded: "Certificate of Completion (issued by the Academy)",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "P10W",
  },
  offers: {
    "@type": "Offer",
    price: site.program.priceAmount,
    priceCurrency: site.program.priceCurrency,
    category: "Paid",
    url: `${site.url}/pricing`,
  },
};
