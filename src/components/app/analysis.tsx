import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Performance metric card. `source` states how the value was obtained. */
export function MetricCard({ label, value, unit, guidance, source, tone = "neutral" }: { label: string; value: string; unit?: string; guidance: string; source: "measured" | "ai-estimate"; tone?: "neutral" | "success" | "warning" }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-ink-subtle">{label}</p>
        <Badge tone={source === "measured" ? "info" : "gold"}>{source === "measured" ? "Measured" : "AI estimate"}</Badge>
      </div>
      <p className={cn("mt-4 font-serif text-5xl leading-none tabular-nums lining-nums", tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-midnight")}>
        {value}
        {unit && <span className="ml-1.5 font-sans text-sm text-ink-subtle">{unit}</span>}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{guidance}</p>
    </Card>
  );
}

/** Rubric-based assessment panel. */
export function AssessmentPanel({ rows, status }: { rows: { criterion: string; weight: number; score?: number }[]; status: "draft" | "submitted" | "approved" }) {
  const scored = rows.filter((r) => r.score !== undefined);
  const total = scored.length === rows.length ? rows.reduce((n, r) => n + (r.weight * (r.score ?? 0)) / 5, 0) : undefined;
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-stone px-6 py-4">
        <p className="font-serif text-2xl text-midnight">Final assessment</p>
        <Badge tone={status === "approved" ? "success" : status === "submitted" ? "info" : "neutral"} dot>
          {status === "approved" ? "Approved by assessor" : status === "submitted" ? "Awaiting approval" : "Draft"}
        </Badge>
      </div>
      <table className="w-full text-sm">
        <caption className="sr-only">Rubric scores</caption>
        <thead>
          <tr className="text-left text-xs uppercase tracking-[0.14em] text-ink-subtle">
            <th scope="col" className="px-6 py-3 font-semibold">Criterion</th>
            <th scope="col" className="px-6 py-3 text-right font-semibold">Weight</th>
            <th scope="col" className="px-6 py-3 text-right font-semibold">Score (0–5)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone">
          {rows.map((r) => (
            <tr key={r.criterion}>
              <td className="px-6 py-3 text-ink">{r.criterion}</td>
              <td className="px-6 py-3 text-right tabular-nums lining-nums text-ink-muted">{r.weight}%</td>
              <td className="px-6 py-3 text-right tabular-nums lining-nums text-ink">{r.score ?? "—"}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-midnight">
            <th scope="row" className="px-6 py-4 text-left font-medium">Weighted result</th>
            <td />
            <td className="px-6 py-4 text-right font-serif text-2xl tabular-nums lining-nums text-midnight">{total !== undefined ? `${total.toFixed(0)}%` : "—"}</td>
          </tr>
        </tfoot>
      </table>
    </Card>
  );
}
