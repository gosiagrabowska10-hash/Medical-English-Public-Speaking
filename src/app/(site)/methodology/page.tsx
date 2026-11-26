import { Container, Section, SectionHeader } from "@/components/ui/typography";
import { PageHero } from "@/components/marketing/page-hero";
import { CtaBand } from "@/components/marketing/cta-band";
import { rubric } from "@/content/curriculum";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Methodology",
  description:
    "Learn, practise, simulate, receive feedback, improve: how The Medical Speaking Academy combines structured lessons, AI practice, realistic simulations and human assessment.",
  path: "/methodology",
});

const pillars = [
  {
    n: "I",
    t: "Learn",
    d: "Each lesson introduces one communication principle, explains why it works, and shows it through professional medical examples. Lessons end with a short knowledge check so you know you have understood before you practise.",
  },
  {
    n: "II",
    t: "Practise",
    d: "Understanding is not the same as ability. Every lesson includes a practical exercise and an AI teacher activity designed to build one specific skill through repetition — a stronger opening, a clearer explanation, a calmer pause.",
  },
  {
    n: "III",
    t: "Simulate",
    d: "Skills are tested under realistic conditions in the Simulation Centre: a conference Q&A, a journalist’s interview, a sceptical panel. Difficulty increases as you progress, so pressure is introduced gradually and safely.",
  },
  {
    n: "IV",
    t: "Receive Feedback",
    d: "The Speaking Studio provides objective measures derived from your recordings, such as speaking pace, pause patterns and filler words, alongside explanations of language and structure. At key milestones, human instructors provide professional judgement.",
  },
  {
    n: "V",
    t: "Improve",
    d: "You repeat, compare attempts and track progress over ten weeks. Each report ends with one specific next challenge, because sustainable improvement comes from focused, incremental change.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Methodology"
        title="A method built on deliberate practice."
        lead="Confident speaking is a skill, not a personality trait. Our method treats it the way medicine treats any complex skill: clear principles, supervised practice, realistic simulation and structured feedback."
      />

      <Section tone="white">
        <Container>
          <ol className="border-t border-stone-deep">
            {pillars.map((p) => (
              <li key={p.t} className="grid gap-4 border-b border-stone-deep py-12 md:grid-cols-[120px_280px_1fr] md:gap-10">
                <span className="font-serif text-5xl text-gold-muted">{p.n}</span>
                <h2 className="font-serif text-4xl text-midnight">{p.t}</h2>
                <p className="max-w-2xl text-lead leading-relaxed text-ink-muted">{p.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <SectionHeader
            eyebrow="AI and Human Roles"
            title="Clear boundaries between AI and human judgement."
            lead="AI teachers make frequent, personalised practice possible at any hour. They can explain, question, simulate and measure. They can also be wrong, so their feedback is always presented as guidance. Decisions that matter — your final assessment and your certificate — are made by authorised people."
          />
          <dl className="grid gap-px self-end overflow-hidden rounded-sm bg-stone-deep/70 sm:grid-cols-2">
            <div className="bg-white p-8">
              <dt className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-deep">AI teachers</dt>
              <dd className="mt-4 space-y-2 text-ink-muted">
                <p>Daily practice and drills</p>
                <p>Conversation and simulations</p>
                <p>Transcripts and measurable delivery metrics</p>
                <p>Preliminary feedback</p>
              </dd>
            </div>
            <div className="bg-white p-8">
              <dt className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-deep">Human instructors</dt>
              <dd className="mt-4 space-y-2 text-ink-muted">
                <p>Group coaching</p>
                <p>Review of your final presentation</p>
                <p>Rubric-based assessment</p>
                <p>Graduation and certificate approval</p>
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <SectionHeader
            eyebrow="Assessment"
            title="A published rubric. No hidden criteria."
            lead="Your final 8–10-minute medical keynote and simulated Q&A are assessed against the same rubric you study throughout the programme."
          />
          <table className="w-full self-end text-left">
            <caption className="sr-only">Final assessment rubric and weightings</caption>
            <thead>
              <tr className="border-b border-midnight text-eyebrow uppercase tracking-[0.18em] text-ink-subtle">
                <th scope="col" className="pb-4 font-semibold">Criterion</th>
                <th scope="col" className="pb-4 text-right font-semibold">Weight</th>
              </tr>
            </thead>
            <tbody>
              {rubric.map((r) => (
                <tr key={r.criterion} className="border-b border-stone-deep">
                  <td className="py-4 text-ink">{r.criterion}</td>
                  <td className="py-4 text-right font-serif text-2xl tabular-nums lining-nums text-midnight">{r.weight}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
