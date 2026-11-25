"use client";
import { Accordion as A } from "radix-ui";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items, className }: { items: { q: string; a: React.ReactNode }[]; className?: string }) {
  return (
    <A.Root type="multiple" className={cn("border-t border-stone-deep", className)}>
      {items.map((item, i) => (
        <A.Item key={i} value={`item-${i}`} className="border-b border-stone-deep">
          <A.Header>
            <A.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left font-serif text-[1.375rem] leading-snug text-midnight md:text-2xl">
              {item.q}
              <Plus
                aria-hidden
                className="mt-1.5 size-5 shrink-0 text-gold-deep transition-transform duration-300 group-data-[state=open]:rotate-45"
              />
            </A.Trigger>
          </A.Header>
          <A.Content className="overflow-hidden data-[state=closed]:animate-none">
            <div className="max-w-3xl pb-7 text-[1.0625rem] leading-relaxed text-ink-muted">{item.a}</div>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
