import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessagesSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TeacherGlyph } from "@/components/marketing/teacher-card";
import { aiTeachers } from "@/content/teachers";
import { modules } from "@/content/curriculum";

export function generateStaticParams() {
  return aiTeachers.map((t) => ({ slug: t.slug }));
}

export default async function TeacherPage({ params }: PageProps<"/app/teachers/[slug]">) {
  const { slug } = await params;
  const t = aiTeachers.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <div className="space-y-8">
      <Button asChild variant="ghost" size="sm"><Link href="/app/teachers"><ArrowLeft /> AI Faculty</Link></Button>
      <Card tone="dark" className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:p-10">
        <TeacherGlyph slug={t.slug} className="size-20 text-gold-light" />
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-light">{t.role}</p>
          <h1 className="mt-1 font-serif text-h2">AI {t.name}</h1>
          <p className="mt-3 max-w-2xl text-ivory/70">{t.approach}</p>
        </div>
      </Card>
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="p-7">
          <h2 className="font-serif text-2xl text-midnight">Teaching focus</h2>
          <p className="mt-3 text-ink-muted">{t.focus}</p>
          <h3 className="mt-6 text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle">Typical practice</h3>
          <ul className="mt-3 space-y-2 text-ink">{t.practises.map((p) => <li key={p}>{p}</li>)}</ul>
        </Card>
        <Card className="p-7">
          <h2 className="font-serif text-2xl text-midnight">Linked modules</h2>
          <ul className="mt-4 space-y-2">
            {t.modules.map((n) => { const m = modules.find((x) => x.number === n)!; return <li key={n} className="text-ink"><span className="mr-2 font-serif text-gold-deep lining-nums">{String(n).padStart(2, "0")}</span>{m.title}</li>; })}
          </ul>
        </Card>
      </div>
      <Card className="flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-3 font-serif text-2xl text-midnight">Conversation <Badge>Opens in Stage 4</Badge></h2>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">Live conversations with the AI {t.name} are being built in the next stage, together with the Speaking Studio. No conversation is simulated here.</p>
        </div>
        <Button disabled><MessagesSquare /> Start a conversation</Button>
      </Card>
    </div>
  );
}
