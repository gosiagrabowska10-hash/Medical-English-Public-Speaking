import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const inclusions = [
  "Ten-week guided program with a structured weekly learning path",
  "12 modules, 30 core lessons and 6 practical workshops",
  "Unlimited practice with six specialised AI teachers (fair-use limits apply)",
  "Speaking Studio: record, review and analyse your presentations",
  "Simulation Center: conferences, interviews, podcasts and difficult audiences",
  "Initial, intermediate and final assessments",
  "One live group coaching session with an Academy instructor",
  "Human review of your final presentation against the published rubric",
  "Workbooks, worksheets and a personalised development plan",
  "Academy Certificate of Completion with online verification, on meeting all requirements",
];

export function formatPrice(amount: number, currency: string, locale = "en-GB") {
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export function PricingCard() {
  return (
    <div className="grid overflow-hidden rounded-sm bg-white shadow-lifted lg:grid-cols-[1fr_1.3fr]">
      <div className="on-dark flex flex-col bg-midnight p-8 text-ivory md:p-12">
        <p className="text-eyebrow font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-gold-light">Professional Program</p>
        <h3 className="mt-4 font-serif text-4xl leading-tight">{site.program.name}</h3>
        <p className="mt-4 text-ivory/70">Ten weeks · Online · Taught in English</p>
        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="font-serif text-6xl leading-none tabular-nums lining-nums">{formatPrice(site.program.priceAmount, site.program.priceCurrency)}</p>
          <p className="mt-3 text-sm text-ivory/60">
            Reference tuition in Polish złoty. Equivalent prices in your local currency are displayed at checkout. Applicable taxes are shown before payment.
          </p>
        </div>
        <div className="mt-auto grid gap-3 pt-10">
          <Button asChild variant="gold" size="lg">
            <Link href="/register">Apply to the Academy</Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <Link href="/contact?topic=admissions">Ask an admissions question</Link>
          </Button>
        </div>
      </div>
      <div className="p-8 md:p-12">
        <p className="text-eyebrow font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-gold-deep">Included in tuition</p>
        <ul className="mt-6 divide-y divide-stone">
          {inclusions.map((i) => (
            <li key={i} className="flex gap-4 py-3.5 text-[0.9375rem] leading-relaxed text-ink">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-gold-deep" />
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
