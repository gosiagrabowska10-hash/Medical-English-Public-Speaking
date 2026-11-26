import { cn } from "@/lib/utils";

/**
 * Text-based wordmark (no licensed logo asset yet).
 * primary   — stacked, for hero/footer/certificates
 * secondary — single line, for navigation
 */
export function Wordmark({
  variant = "secondary",
  light = false,
  className,
}: {
  variant?: "primary" | "secondary";
  light?: boolean;
  className?: string;
}) {
  const ink = light ? "text-ivory" : "text-midnight";
  if (variant === "primary") {
    return (
      <span className={cn("inline-flex flex-col items-center text-center leading-none", ink, className)}>
        <span className={cn("text-[0.625rem] font-semibold uppercase tracking-[0.42em]", light ? "text-gold-light" : "text-gold-deep")}>The</span>
        <span className="sr-only"> </span>
        <span className="mt-2 font-serif text-[1.75rem] font-medium tracking-[0.04em]">MEDICAL SPEAKING</span>
        <span className="sr-only"> </span>
        <span className="mt-2 flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-gold" />
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.42em]">Academy</span>
          <span aria-hidden className="h-px w-8 bg-gold" />
        </span>
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-3", ink, className)}>
      <Monogram light={light} className="size-9" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.1875rem] font-medium tracking-[0.03em]">The Medical Speaking</span>
        <span className="sr-only"> </span>
        <span className={cn("mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.38em]", light ? "text-gold-light" : "text-gold-deep")}>Academy</span>
      </span>
    </span>
  );
}

/** Monogram concept: “MSA” ligature in a fine champagne frame. */
export function Monogram({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("shrink-0", className)}>
      <rect x="1" y="1" width="46" height="46" fill="none" stroke="#B69A68" strokeWidth="1" />
      <rect x="4.5" y="4.5" width="39" height="39" fill="none" stroke="#B69A68" strokeWidth="0.5" opacity="0.6" />
      <text
        x="24"
        y="30.5"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), Georgia, serif"
        fontSize="17"
        fontWeight="500"
        letterSpacing="0.5"
        fill={light ? "#F7F4EE" : "#101B2D"}
      >
        MSA
      </text>
    </svg>
  );
}
