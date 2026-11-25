import { cn } from "@/lib/utils";

export function Eyebrow({ className, light, ...props }: React.ComponentProps<"p"> & { light?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[var(--tracking-eyebrow)]",
        light ? "text-gold-light" : "text-gold-deep",
        className,
      )}
      {...props}
    />
  );
}

export function Rule({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-hidden className={cn("inline-block h-px w-10 bg-gold", className)} {...props} />;
}

type HeadingProps = React.ComponentProps<"h2"> & { as?: "h1" | "h2" | "h3"; size?: "display" | "h1" | "h2" | "h3" };
export function Heading({ as: Tag = "h2", size = "h2", className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-serif font-medium tracking-[-0.01em] text-balance",
        size === "display" && "text-display",
        size === "h1" && "text-h1",
        size === "h2" && "text-h2",
        size === "h3" && "text-h3",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-lead text-pretty", className)} {...props} />;
}

export function Container({ className, size = "default", ...props }: React.ComponentProps<"div"> & { size?: "default" | "narrow" | "wide" }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "default" && "max-w-[1240px]",
        size === "narrow" && "max-w-[880px]",
        size === "wide" && "max-w-[1440px]",
        className,
      )}
      {...props}
    />
  );
}

export function Section({ className, tone = "ivory", ...props }: React.ComponentProps<"section"> & { tone?: "ivory" | "white" | "midnight" | "navy" | "stone" }) {
  return (
    <section
      className={cn(
        "py-20 md:py-28 lg:py-32",
        tone === "ivory" && "bg-ivory text-ink",
        tone === "white" && "bg-white text-ink",
        tone === "stone" && "bg-ivory-deep text-ink",
        tone === "midnight" && "on-dark bg-midnight text-ivory",
        tone === "navy" && "on-dark bg-navy text-ivory",
        className,
      )}
      {...props}
    />
  );
}

/** Standard section header: eyebrow + serif heading + optional lead. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  light,
  as = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow light={light} className={cn("mb-6", align === "center" && "justify-center")}>
          <Rule className={light ? "bg-gold-light" : undefined} />
          {eyebrow}
        </Eyebrow>
      )}
      <Heading as={as} size={as === "h1" ? "h1" : "h2"} className={light ? "text-ivory" : "text-midnight"}>
        {title}
      </Heading>
      {lead && <Lead className={cn("mt-6", light ? "text-ivory/75" : "text-ink-muted")}>{lead}</Lead>}
    </div>
  );
}
