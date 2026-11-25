import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { TeacherCard } from "@/components/marketing/teacher-card";
import { aiTeachers } from "@/content/teachers";

export const metadata = { title: "AI Teachers" };

export default function TeachersPage() {
  return (
    <div className="space-y-10">
      <header>
        <Eyebrow className="mb-4"><Rule />AI Faculty</Eyebrow>
        <h1 className="font-serif text-h1 text-midnight">Your AI teachers</h1>
        <p className="mt-4 max-w-2xl text-lead text-ink-muted">Six practice partners with distinct roles. <Badge className="align-middle">Conversations open in Stage 4</Badge></p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {aiTeachers.map((t, i) => (
          <Link key={t.slug} href={`/app/teachers/${t.slug}`} className="block"><TeacherCard t={t} index={i} /></Link>
        ))}
      </div>
    </div>
  );
}
