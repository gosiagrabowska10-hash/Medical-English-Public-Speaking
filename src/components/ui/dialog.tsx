"use client";
import { Dialog as D } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogClose = D.Close;

export function DialogContent({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <D.Portal>
      <D.Overlay className="fixed inset-0 z-50 bg-midnight/55 backdrop-blur-[2px] data-[state=open]:animate-[fade-up_0.3s_ease-out]" />
      <D.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2.5rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-sm bg-ivory p-8 shadow-lifted focus:outline-none md:p-10",
          className,
        )}
      >
        <D.Title className="pr-8 font-serif text-3xl text-midnight">{title}</D.Title>
        {description ? (
          <D.Description className="mt-3 text-ink-muted">{description}</D.Description>
        ) : (
          <D.Description className="sr-only">{title}</D.Description>
        )}
        <div className="mt-6">{children}</div>
        <D.Close className="absolute right-5 top-5 rounded-xs p-1.5 text-ink-muted hover:bg-stone hover:text-ink" aria-label="Close">
          <X className="size-5" />
        </D.Close>
      </D.Content>
    </D.Portal>
  );
}
