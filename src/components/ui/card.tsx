import { cn } from "@/lib/utils";

/** Card system: `paper` (white on ivory), `quiet` (hairline only), `dark` (on midnight). */
export function Card({
  className,
  tone = "paper",
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & { tone?: "paper" | "quiet" | "dark" | "ivory"; interactive?: boolean }) {
  return (
    <div
      className={cn(
        "relative rounded-sm",
        tone === "paper" && "bg-white shadow-hairline",
        tone === "ivory" && "bg-ivory shadow-hairline",
        tone === "quiet" && "border border-stone-deep/70",
        tone === "dark" && "bg-navy text-ivory ring-1 ring-white/8",
        interactive &&
          "transition-[box-shadow,transform] duration-500 ease-[var(--ease-refined)] hover:-translate-y-0.5 hover:shadow-lifted",
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-7 md:p-8", className)} {...props} />;
}
