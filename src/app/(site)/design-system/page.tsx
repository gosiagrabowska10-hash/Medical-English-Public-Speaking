import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox, FieldError, FieldHint, Input, Label, Select, Textarea } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Container, Heading, Section, SectionHeader } from "@/components/ui/typography";
import { Monogram, Wordmark } from "@/components/brand/wordmark";
import { TeacherCard, aiTeachers } from "@/components/marketing/teacher-card";
import { CourseCard, ProgressCard, VideoLesson } from "@/components/app/learning-cards";
import { AssessmentPanel, MetricCard } from "@/components/app/analysis";
import { CertificateLayout } from "@/components/app/certificate";
import { rubric } from "@/content/curriculum";
import { pageMetadata } from "@/lib/seo";
import { OverlayDemos, RecorderDemo, TabsDemo } from "./demos";

export const metadata = pageMetadata({ title: "Design System", description: "Internal design reference.", path: "/design-system", noindex: true });

const colors = [
  ["Midnight", "#101B2D", "bg-midnight", "text-ivory"],
  ["Deep Navy", "#18283C", "bg-navy", "text-ivory"],
  ["Ivory", "#F7F4EE", "bg-ivory", "text-midnight"],
  ["White", "#FFFFFF", "bg-white", "text-midnight"],
  ["Champagne Gold", "#B69A68", "bg-gold", "text-midnight"],
  ["Gold (text)", "#7A6235", "bg-gold-deep", "text-ivory"],
  ["Soft Grey", "#E9E7E1", "bg-stone", "text-midnight"],
];

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-stone-deep py-12">
      <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-deep">{String(n).padStart(2, "0")}</p>
      <h2 className="mt-2 font-serif text-3xl text-midnight">{title}</h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <Section className="pt-14 md:pt-20">
      <Container>
        <SectionHeader as="h1" eyebrow="Internal · not indexed" title="Design System" lead="Tokens and components for every surface of the Academy. All data on this page is specimen data for design reference only." />

        <Block n={0} title="Brand marks">
          <div className="grid gap-5 md:grid-cols-3">
            <Card className="flex items-center justify-center p-10"><Wordmark variant="primary" /></Card>
            <Card tone="dark" className="flex items-center justify-center p-10"><Wordmark light /></Card>
            <Card className="flex items-center justify-center gap-6 p-10"><Monogram className="size-20" /><Monogram className="size-10" /></Card>
          </div>
        </Block>

        <Block n={0} title="Colour tokens">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {colors.map(([n, hex, bg, fg]) => (
              <div key={n} className={`${bg} ${fg} flex aspect-[3/4] flex-col justify-end rounded-sm p-4 shadow-hairline`}>
                <span className="text-sm font-medium">{n}</span>
                <span className="font-mono text-xs opacity-70">{hex}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {(["neutral", "gold", "navy", "success", "warning", "danger", "info"] as const).map((t) => <Badge key={t} tone={t} dot>{t}</Badge>)}
          </div>
        </Block>

        <Block n={0} title="Typography">
          <div className="space-y-6">
            <Heading as="h3" size="display" className="text-midnight">Display — Cormorant</Heading>
            <Heading as="h3" size="h1" className="text-midnight">Heading 1 — Editorial serif</Heading>
            <Heading as="h3" size="h2" className="text-midnight">Heading 2 — Section titles</Heading>
            <Heading as="h3" size="h3" className="text-midnight">Heading 3 — Card titles</Heading>
            <p className="text-lead text-ink-muted">Lead — Inter, for introductions and supporting statements.</p>
            <p className="max-w-2xl text-ink-muted">Body — Inter 16–17px, line-height 1.65–1.8, maximum line length around 68 characters for comfortable reading.</p>
            <p className="text-eyebrow font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-gold-deep">Eyebrow label — spaced uppercase</p>
          </div>
        </Block>

        <Block n={1} title="Navigation bar & 20 · Mobile navigation">
          <p className="text-ink-muted">See the sticky header on this page. Below 1280px it collapses into a full-height midnight drawer with focus trapping, Escape to close and a skip link.</p>
        </Block>

        <Block n={4} title="Buttons">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Primary</Button>
            <Button variant="gold">Gold</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Text link</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="on-dark mt-6 flex flex-wrap gap-4 rounded-sm bg-midnight p-8">
            <Button variant="gold">Gold on dark</Button>
            <Button variant="light">Light</Button>
            <Button variant="outline-light">Outline light</Button>
          </div>
        </Block>

        <Block n={5} title="Course cards">
          <div className="grid gap-5 md:grid-cols-3">
            <CourseCard code="L07" title="Pace, Pause and Emphasis" summary="Why speakers rush in a second language, and how pauses create authority." minutes={35} status="completed" href="/design-system" />
            <CourseCard code="L08" title="Voice Projection and Vocal Variety" summary="Breath support, resonance and intonation to avoid a monotone delivery." minutes={40} status="in_progress" href="/design-system" />
            <CourseCard code="L09" title="Body Language and Presence" summary="Stance, movement, gesture and eye contact." minutes={30} status="locked" href="/design-system" />
          </div>
        </Block>

        <Block n={7} title="AI teacher cards">
          <div className="grid gap-5 md:grid-cols-2">
            <TeacherCard t={aiTeachers[1]} index={1} />
            <TeacherCard t={aiTeachers[4]} index={4} dark />
          </div>
        </Block>

        <Block n={8} title="Progress cards & 18 · Progress bars">
          <div className="grid gap-5 md:grid-cols-3">
            <ProgressCard title="Program completion" value={42} detail="Specimen value" />
            <Card className="space-y-6 p-6 md:col-span-2">
              <Progress value={68} label="Module 3 — Voice and Stage Presence" />
              <Progress value={20} label="Required assignments" tone="navy" />
            </Card>
          </div>
        </Block>

        <Block n={9} title="Video lesson container">
          <div className="max-w-3xl"><VideoLesson title="L07 · Pace, Pause and Emphasis" /></div>
        </Block>

        <Block n={10} title="Audio recording controls (interactive)">
          <div className="max-w-2xl"><RecorderDemo /></div>
        </Block>

        <Block n={11} title="Performance analytics cards">
          <div className="grid gap-5 md:grid-cols-3">
            <MetricCard label="Speaking pace" value="148" unit="wpm" source="measured" guidance="Specimen. Within a comfortable range for international audiences." tone="success" />
            <MetricCard label="Filler words" value="9" unit="per 5 min" source="measured" guidance="Specimen. Most occurred at slide transitions." tone="warning" />
            <MetricCard label="Structure" value="Clear" source="ai-estimate" guidance="Specimen. Core message stated in the opening and repeated in the close." />
          </div>
        </Block>

        <Block n={12} title="Assessment panel">
          <div className="max-w-3xl"><AssessmentPanel status="submitted" rows={rubric.map((r, i) => ({ ...r, score: [4, 3, 4, 4, 3, 4, 3, 5][i] }))} /></div>
        </Block>

        <Block n={13} title="Certificate layout">
          <CertificateLayout name="Dr Specimen Name" date="1 February 2027" number="MSA-0000-0000" signatory="[Authorised signatory]" specimen />
        </Block>

        <Block n={14} title="Modal windows & 17 · Dropdowns">
          <OverlayDemos />
        </Block>

        <Block n={15} title="Forms">
          <div className="grid max-w-3xl gap-6 md:grid-cols-2">
            <div><Label htmlFor="ds-a">Text input</Label><Input id="ds-a" placeholder="Placeholder" /><FieldHint>Helper text.</FieldHint></div>
            <div><Label htmlFor="ds-b">Invalid input</Label><Input id="ds-b" aria-invalid defaultValue="not-an-email" /><FieldError>Enter a valid email address.</FieldError></div>
            <div><Label htmlFor="ds-c">Select</Label><Select id="ds-c"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></Select></div>
            <div><Label htmlFor="ds-d">Disabled</Label><Input id="ds-d" disabled value="Disabled" readOnly /></div>
            <div className="md:col-span-2"><Label htmlFor="ds-e">Textarea</Label><Textarea id="ds-e" /></div>
            <label className="flex gap-3 text-sm text-ink-muted"><Checkbox defaultChecked /> Checkbox</label>
          </div>
        </Block>

        <Block n={16} title="Tabs">
          <div className="max-w-2xl"><TabsDemo /></div>
        </Block>

        <Block n={19} title="Status labels">
          <div className="flex flex-wrap gap-3">
            <Badge tone="neutral" dot>Not started</Badge>
            <Badge tone="info" dot>In progress</Badge>
            <Badge tone="warning" dot>Revision requested</Badge>
            <Badge tone="success" dot>Approved</Badge>
            <Badge tone="danger" dot>Revoked</Badge>
            <Badge tone="gold">Workshop</Badge>
            <Badge tone="navy">Final exam</Badge>
          </div>
        </Block>
      </Container>
    </Section>
  );
}
