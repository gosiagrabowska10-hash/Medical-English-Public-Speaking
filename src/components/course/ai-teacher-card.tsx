import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeacherGlyph } from "@/components/marketing/teacher-card";
import { aiTeachers } from "@/content/teachers";

export function AiTeacherCard({ slug, lessonTitle }: { slug: string | null; lessonTitle: string }) {
  const t = aiTeachers.find((x) => x.slug === slug) ?? aiTeachers[0];
  return (
    <section aria-labelledby="ai-teacher-h" className="on-dark flex flex-col gap-6 rounded-sm bg-navy p-6 text-ivory md:flex-row md:items-center md:p-8">
      <TeacherGlyph slug={t.slug} className="size-14 text-gold-light" />
      <div className="flex-1">
        <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-light">Practise this lesson with your AI teacher</p>
        <h2 id="ai-teacher-h" className="mt-1 font-serif text-3xl">AI {t.name}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ivory/70">{t.focus}. A guided conversation based on &ldquo;{lessonTitle}&rdquo;.</p>
      </div>
      <Button asChild variant="gold" size="lg"><Link href={`/app/teachers/${t.slug}?from=${encodeURIComponent(lessonTitle)}`}><MessagesSquare /> Start a conversation</Link></Button>
    </section>
  );
}
