import { Container, Section, SectionHeader } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Speaking Studio & Simulation Center",
  description:
    "Record your presentations, receive a transcript and measured delivery metrics, and practise in realistic conference, media and Q&A simulations.",
  path: "/speaking-studio",
});

const measured = [
  { t: "Speaking pace", d: "Words per minute across your talk and by section, calculated from the timed transcript." },
  { t: "Pauses", d: "Number, length and placement of silences — and whether you pause before key messages." },
  { t: "Filler words", d: "Frequency of fillers such as “um”, “uh” and “you know”, with where they cluster." },
  { t: "Repetition", d: "Repeated words and phrases that may weaken clarity." },
];
const interpreted = [
  { t: "Language feedback", d: "Grammar, word choice and phrasing that may affect understanding, with suggested alternatives." },
  { t: "Structure feedback", d: "Whether your opening, core message, signposting and conclusion are clear." },
  { t: "Recommendations", d: "Specific, prioritised suggestions and your next improvement challenge." },
];
const simulations = [
  "Medical conference presentation",
  "Scientific presentation",
  "Media interview",
  "Podcast interview",
  "Difficult audience",
  "Unexpected questions",
  "Teaching session",
  "Panel discussion",
];

export default function SpeakingStudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking Studio"
        title="A private rehearsal room for your presentations."
        lead="Record yourself, see exactly what you said, and understand how you said it. Then practise under pressure in the Simulation Center."
      />

      <Section tone="white">
        <Container>
          <SectionHeader
            eyebrow="How It Works"
            title="Four steps, repeated until it feels natural."
          />
          <ol className="mt-14 grid gap-10 md:grid-cols-4">
            {[
              ["Consent and record", "Recording starts only after you consent. Record audio, or video where your browser and device support it."],
              ["Review", "Play back your attempt, or retake it before submitting."],
              ["Transcribe and analyse", "Your recording is securely uploaded, transcribed and analysed."],
              ["Improve", "Read your report, practise the next challenge, and compare your attempts."],
            ].map(([t, d], i) => (
              <li key={t} className="border-t border-midnight pt-6">
                <span className="font-serif text-xl text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-2xl text-midnight">{t}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader eyebrow="Measured" title="What is measured from your recording." />
            <dl className="mt-10 divide-y divide-stone-deep border-y border-stone-deep">
              {measured.map((m) => (
                <div key={m.t} className="py-5">
                  <dt className="font-medium text-ink">{m.t}</dt>
                  <dd className="mt-1 leading-relaxed text-ink-muted">{m.d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionHeader eyebrow="Interpreted" title="What AI interprets for you." />
            <dl className="mt-10 divide-y divide-stone-deep border-y border-stone-deep">
              {interpreted.map((m) => (
                <div key={m.t} className="py-5">
                  <dt className="font-medium text-ink">{m.t}</dt>
                  <dd className="mt-1 leading-relaxed text-ink-muted">{m.d}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-[0.9375rem] leading-relaxed text-ink-muted">
              Reports only include metrics that the connected speech technology can actually measure. We do not display scores for qualities that cannot be measured reliably from audio, such as body language; those are assessed by human instructors from video.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="midnight">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <SectionHeader
            light
            eyebrow="Simulation Center"
            title="Pressure, rehearsed safely."
            lead="Multi-turn simulations by text or voice. The AI plays the chair, the journalist, the host or the sceptical colleague — and adapts to your answers."
          />
          <ul className="grid self-end sm:grid-cols-2">
            {simulations.map((s) => (
              <li key={s} className="border-b border-white/12 py-4 font-serif text-xl text-ivory">
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="narrow">
          <SectionHeader
            eyebrow="Your Privacy"
            title="Your recordings belong to you."
            lead="Recordings are stored securely and are accessible only to you and to the Academy staff reviewing your work. You can delete recordings and request deletion of your data. Please do not include identifiable patient information in any recording."
          />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
