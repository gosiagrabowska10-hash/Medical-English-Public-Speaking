import { cn } from "@/lib/utils";

export function Progress({
  value,
  label,
  className,
  tone = "gold",
}: {
  value: number;
  label: string;
  className?: string;
  tone?: "gold" | "navy";
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="text-ink-muted">{label}</span>
        <span className="font-medium tabular-nums lining-nums text-ink">{v}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1 w-full overflow-hidden rounded-full bg-stone"
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-700", tone === "gold" ? "bg-gold" : "bg-midnight")}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}
