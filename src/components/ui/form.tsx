import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xs border border-stone-deep bg-white px-4 text-[0.9375rem] text-ink placeholder:text-ink-subtle/80 transition-colors focus:border-midnight focus:outline-none focus-visible:outline-2 focus-visible:outline-gold-deep aria-invalid:border-danger disabled:bg-stone/60";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("mb-2 block text-[0.8125rem] font-medium text-ink", className)} {...props} />;
}
export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(field, "h-12", className)} {...props} />;
}
export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(field, "min-h-36 py-3 leading-relaxed", className)} {...props} />;
}
export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        field,
        "h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23101B2D%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10",
        className,
      )}
      {...props}
    />
  );
}
export function FieldHint({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("mt-2 text-[0.8125rem] text-ink-subtle", className)} {...props} />;
}
export function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  return <p role="alert" className={cn("mt-2 text-[0.8125rem] text-danger", className)} {...props} />;
}
export function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
  return <input type="checkbox" className={cn("mt-0.5 size-4 shrink-0 accent-midnight", className)} {...props} />;
}
