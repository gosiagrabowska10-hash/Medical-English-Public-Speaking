import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans font-medium tracking-[0.02em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-refined)] disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-midnight text-ivory hover:bg-navy-soft",
        gold: "bg-gold text-midnight hover:bg-gold-light",
        outline: "border border-midnight/80 text-midnight hover:bg-midnight hover:text-ivory",
        light: "bg-ivory text-midnight hover:bg-white",
        "outline-light": "border border-ivory/40 text-ivory hover:border-gold-light hover:text-gold-light",
        ghost: "text-midnight hover:bg-stone",
        link: "px-0! h-auto! text-midnight underline decoration-gold decoration-1 underline-offset-[7px] hover:decoration-midnight",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem] rounded-xs",
        md: "h-11 px-6 text-sm rounded-xs",
        lg: "h-14 px-8 text-[0.9375rem] rounded-xs",
        icon: "size-10 rounded-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
