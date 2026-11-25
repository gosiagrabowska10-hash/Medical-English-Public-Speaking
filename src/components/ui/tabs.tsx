"use client";
import { Tabs as T } from "radix-ui";
import { cn } from "@/lib/utils";

export const Tabs = T.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof T.List>) {
  return <T.List className={cn("flex gap-8 overflow-x-auto border-b border-stone-deep", className)} {...props} />;
}
export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof T.Trigger>) {
  return (
    <T.Trigger
      className={cn(
        "-mb-px whitespace-nowrap border-b-2 border-transparent pb-4 text-sm font-medium text-ink-subtle transition-colors hover:text-ink data-[state=active]:border-gold data-[state=active]:text-midnight",
        className,
      )}
      {...props}
    />
  );
}
export function TabsContent({ className, ...props }: React.ComponentProps<typeof T.Content>) {
  return <T.Content className={cn("pt-8 focus-visible:outline-none", className)} {...props} />;
}
