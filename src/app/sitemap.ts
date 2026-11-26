import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { articles } from "@/content/articles";

const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/about", priority: 0.8, freq: "monthly" },
  { path: "/methodology", priority: 0.8, freq: "monthly" },
  { path: "/curriculum", priority: 0.9, freq: "monthly" },
  { path: "/ai-teachers", priority: 0.8, freq: "monthly" },
  { path: "/speaking-studio", priority: 0.8, freq: "monthly" },
  { path: "/pricing", priority: 0.9, freq: "monthly" },
  { path: "/instructors", priority: 0.6, freq: "monthly" },
  { path: "/founder", priority: 0.7, freq: "monthly" },
  { path: "/faq", priority: 0.7, freq: "monthly" },
  { path: "/blog", priority: 0.7, freq: "weekly" },
  { path: "/contact", priority: 0.5, freq: "yearly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
  { path: "/terms", priority: 0.2, freq: "yearly" },
  { path: "/cookies", priority: 0.2, freq: "yearly" },
  { path: "/accessibility", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path === "/" ? "" : p.path}`, changeFrequency: p.freq, priority: p.priority })),
    ...articles.map((a) => ({ url: `${site.url}/blog/${a.slug}`, lastModified: a.published, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
