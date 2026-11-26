"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dialog as D } from "radix-ui";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { studentNav } from "./nav";
import { cn } from "@/lib/utils";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className="space-y-0.5">
      {studentNav.map(({ href, label, icon: Icon, stage }) => {
        const active = href === "/app" ? pathname === "/app" : pathname.startsWith(href) || (href === "/app/curriculum" && pathname.startsWith("/app/learn"));
        if (stage) {
          return (
            <li key={href}>
              <span aria-disabled className="flex cursor-default items-center gap-3 rounded-xs px-3 py-2.5 text-sm text-ivory/35">
                <Icon aria-hidden className="size-4" strokeWidth={1.5} />
                <span className="flex-1">{label}</span>
                <span className="text-[0.625rem] uppercase tracking-[0.12em]">Soon</span>
              </span>
            </li>
          );
        }
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn("flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors", active ? "bg-white/8 text-ivory" : "text-ivory/70 hover:bg-white/5 hover:text-ivory")}
            >
              <Icon aria-hidden className={cn("size-4", active && "text-gold-light")} strokeWidth={1.5} />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function StudentSidebar({ footer }: { footer: React.ReactNode }) {
  return (
    <aside className="on-dark sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-midnight text-ivory lg:flex">
      <div className="px-6 py-6"><Link href="/app"><Wordmark light /><span className="sr-only"> — dashboard</span></Link></div>
      <nav aria-label="Student" className="flex-1 overflow-y-auto px-3"><NavList /></nav>
      <div className="border-t border-white/10 p-4">{footer}</div>
    </aside>
  );
}

export function StudentMobileNav({ footer }: { footer: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="on-dark flex h-16 items-center justify-between bg-midnight px-4 text-ivory lg:hidden">
      <Link href="/app"><Wordmark light /><span className="sr-only"> — dashboard</span></Link>
      <D.Root open={open} onOpenChange={setOpen}>
        <D.Trigger asChild><Button variant="outline-light" size="icon" className="border-0" aria-label="Open menu"><Menu className="size-5!" /></Button></D.Trigger>
        <D.Portal>
          <D.Overlay className="fixed inset-0 z-50 bg-midnight/40" />
          <D.Content className="on-dark fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-midnight text-ivory focus:outline-none">
            <D.Title className="sr-only">Student menu</D.Title>
            <D.Description className="sr-only">Navigate the student platform</D.Description>
            <div className="flex h-16 items-center justify-between px-4">
              <Wordmark light />
              <D.Close asChild><Button variant="outline-light" size="icon" className="border-0" aria-label="Close menu"><X className="size-5!" /></Button></D.Close>
            </div>
            <nav aria-label="Student" className="flex-1 overflow-y-auto px-3"><NavList onNavigate={() => setOpen(false)} /></nav>
            <div className="border-t border-white/10 p-4">{footer}</div>
          </D.Content>
        </D.Portal>
      </D.Root>
    </div>
  );
}
