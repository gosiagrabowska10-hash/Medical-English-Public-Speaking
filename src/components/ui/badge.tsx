import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Status labels — used across student app, instructor portal and admin. */
export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]",
  {
    variants: {
      tone: {
        neutral: "bg-stone text-ink-muted",
        gold: "bg-gold/15 text-gold-deep",
        navy: "bg-midnight text-ivory",
        success: "bg-success-bg text-success",
        warning: "bg-warning-bg text-warning",
        danger: "bg-danger-bg text-danger",
        info: "bg-info-bg text-info",
      },
      dot: { true: "before:size-1.5 before:rounded-full before:bg-current", false: "" },
    },
    defaultVariants: { tone: "neutral", dot: false },
  },
);

export function Badge({
  className,
  tone,
  dot,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone, dot }), className)} {...props} />;
}
