"use client";
import { DropdownMenu as M } from "radix-ui";
import { cn } from "@/lib/utils";

export const Dropdown = M.Root;
export const DropdownTrigger = M.Trigger;

export function DropdownContent({ className, ...props }: React.ComponentProps<typeof M.Content>) {
  return (
    <M.Portal>
      <M.Content
        sideOffset={8}
        align="end"
        className={cn("z-50 min-w-52 rounded-sm bg-white p-1.5 shadow-lifted ring-1 ring-stone-deep/60", className)}
        {...props}
      />
    </M.Portal>
  );
}
export function DropdownItem({ className, ...props }: React.ComponentProps<typeof M.Item>) {
  return (
    <M.Item
      className={cn(
        "flex cursor-pointer select-none items-center gap-2.5 rounded-xs px-3 py-2.5 text-sm text-ink outline-none data-[highlighted]:bg-ivory [&_svg]:size-4 [&_svg]:text-ink-subtle",
        className,
      )}
      {...props}
    />
  );
}
export const DropdownSeparator = (props: React.ComponentProps<typeof M.Separator>) => (
  <M.Separator className="my-1.5 h-px bg-stone" {...props} />
);
export const DropdownLabel = ({ className, ...props }: React.ComponentProps<typeof M.Label>) => (
  <M.Label className={cn("px-3 pb-1 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle", className)} {...props} />
);
