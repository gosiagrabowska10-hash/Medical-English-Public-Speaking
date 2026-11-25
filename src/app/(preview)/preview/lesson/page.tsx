import { ChevronDown, ChevronUp, Download, FileText, MessagesSquare, Play, Bookmark, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TeacherGlyph } from "@/components/marketing/teacher-card";
import { modules } from "@/content/curriculum";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Lesson player preview", description: "Design preview.", path: "/preview/lesson", noindex: true });

export default function LessonPreview() {
  const m = modules[2];
  return (
    <div className="grid gap-8 p-5 md:p-8 xl:grid-cols-[1fr_380px]">
      <div className="min-w-0">
        <p className="text-sm text-ink-subtle">Curriculum / Module 03 · {m.title} / <span className="text-ink">L07</span></p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-serif text-h2 text-midnight">Pace, Pause and Emphasis</h1>
          <div className="flex gap-2"><Badge tone="info" dot>In progress</Badge><Badge>35 min</Badge></div>
        </div>

        <div className="mt-6 overflow-hidden rounded-sm bg-midnight shadow-lifted">
          <div className="relative flex aspect-video items-center justify-center bg-[radial-gradient(ellipse_at_30%_80%,#2A3B52,#101B2D_70%)]">
            <span className="flex size-20 items-center justify-center rounded-full bg-gold text-midnight shadow-lifted"><Play aria-hidden className="ml-1 size-8" fill="currentColor" /></span>
            <span className="absolute bottom-4 left-5 text-xs uppercase tracking-[0.18em] text-ivory/60">Instructor video · lesson recording slot</span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-ivory/60">
            <span>Speed 1× · Captions EN</span><span className="inline-flex items-center gap-1.5"><Bookmark aria-hidden className="size-3.5" /> Bookmark</span>
          </div>
        </div>

        <Tabs defaultValue="lesson" className="mt-8">
          <TabsList>
            <TabsTrigger value="lesson">Lesson</TabsTrigger>
            <TabsTrigger value="exercise">Exercise</TabsTrigger>
            <TabsTrigger value="quiz">Knowledge check</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="assignment">Assignment</TabsTrigger>
          </TabsList>
          <TabsContent value="lesson">
            <div className="prose-academy">
              <h2 className="!mt-0">Why we rush in a second language</h2>
              <p>When speaking under pressure, most presenters speed up. In a second language, the effect is stronger: we hurry to reach the end of a sentence before we lose the words. The audience pays the price — they need time to process technical content.</p>
              <blockquote>A pause is not an absence of speech. It is where your audience understands you.</blockquote>
              <h3>Learning objectives</h3>
              <ul><li>Measure your natural speaking pace</li><li>Place deliberate pauses before key messages</li><li>Use emphasis to signal what matters</li></ul>
            </div>
          </TabsContent>
          <TabsContent value="exercise"><p className="text-ink-muted">Record your conference opening twice: once naturally, once with three deliberate pauses. Compare the two reports in the Speaking Studio.</p></TabsContent>
          <TabsContent value="quiz">
            <fieldset className="max-w-xl rounded-sm bg-white p-6 shadow-hairline">
              <legend className="font-serif text-2xl text-midnight">Where is a pause most effective?</legend>
              {["Before your key result", "In the middle of a technical term", "Only at the end of the talk"].map((o, i) => (
                <label key={o} className="mt-3 flex items-center gap-3 rounded-xs border border-stone-deep p-3 text-sm"><input type="radio" name="q" defaultChecked={i === 0} className="accent-midnight" />{o}</label>
              ))}
            </fieldset>
          </TabsContent>
          <TabsContent value="materials">
            {["Workbook — Pace and Pause (PDF)", "Pause-marking worksheet (PDF)"].map((f) => (
              <div key={f} className="mb-3 flex max-w-xl items-center justify-between rounded-sm bg-white p-4 shadow-hairline"><span className="flex items-center gap-3 text-sm"><FileText aria-hidden className="size-4 text-gold-deep" />{f}</span><Download aria-hidden className="size-4 text-ink-subtle" /></div>
            ))}
          </TabsContent>
          <TabsContent value="assignment"><p className="text-ink-muted">Submit a 90-second recording of your opening with deliberate pauses. Reviewed by AI; eligible for instructor feedback.</p></TabsContent>
        </Tabs>
      </div>

      <aside className="space-y-6">
        <div className="rounded-sm bg-white shadow-hairline">
          <div className="border-b border-stone p-5"><Progress value={38} label="Module 03 progress" /></div>
          {modules.slice(1, 5).map((mod) => {
            const open = mod.number === 3;
            return (
              <div key={mod.number} className="border-b border-stone last:border-0">
                <div className="flex items-center justify-between px-5 py-4">
                  <span><span className="font-serif text-lg text-gold-deep">{String(mod.number).padStart(2, "0")}</span> <span className="ml-1 font-medium text-ink">{mod.title}</span></span>
                  {open ? <ChevronUp aria-hidden className="size-4 text-ink-subtle" /> : <ChevronDown aria-hidden className="size-4 text-ink-subtle" />}
                </div>
                {open && (
                  <ul className="bg-ivory/70 pb-2">
                    {mod.lessons.map((l, i) => (
                      <li key={l.code} className={`flex items-center gap-3 px-5 py-2.5 text-sm ${i === 0 ? "border-l-2 border-gold bg-white text-midnight" : "text-ink-muted"}`}>
                        {i === 0 ? <Play aria-hidden className="size-3.5 text-gold-deep" fill="currentColor" /> : <span className="size-3.5 rounded-full border border-stone-deep" />}
                        <span className="flex-1">{l.title}</span><span className="text-xs text-ink-subtle">{30 + i * 5} min</span>
                      </li>
                    ))}
                    {mod.workshop && <li className="flex items-center gap-3 px-5 py-2.5 text-sm text-ink-muted"><Check aria-hidden className="size-3.5 opacity-0" /><span className="flex-1">{mod.workshop.title}</span><Badge tone="gold">W</Badge></li>}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className="on-dark rounded-sm bg-navy p-6 text-ivory">
          <div className="flex items-center gap-4"><TeacherGlyph slug="voice-coach" className="size-11 text-gold-light" /><div><p className="text-eyebrow uppercase tracking-[0.18em] text-gold-light">AI Teacher</p><p className="font-serif text-2xl">Voice Coach</p></div></div>
          <p className="mt-4 text-sm leading-relaxed text-ivory/70">“Let’s practise one sentence from your opening. Read it aloud, and pause where you would like your audience to think.”</p>
          <Button variant="gold" className="mt-5 w-full"><MessagesSquare /> Practise with the Voice Coach</Button>
        </div>
      </aside>
    </div>
  );
}
