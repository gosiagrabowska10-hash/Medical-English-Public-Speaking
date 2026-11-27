"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, PanelRightClose, PanelRightOpen, ListTree } from "lucide-react";
import { Dialog as D } from "radix-ui";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StatusIcon } from "./status-icon";
import type { ModuleWithLessons } from "@/lib/course";
import { cn } from "@/lib/utils";

function Contents({ modules, currentCode, enrolled, onNavigate }: { modules: ModuleWithLessons[]; currentCode: string; enrolled: boolean; onNavigate?: () => void }) {
  const currentModule = modules.find((m) => m.lessons.some((l) => l.code === currentCode))?.number;
  const [open, setOpen] = useState<Set<number>>(new Set(currentModule ? [currentModule] : []));
  const toggle = (n: number) => setOpen((s) => { const x = new Set(s); if (x.has(n)) x.delete(n); else x.add(n); return x; });

  return (
    <ul className="divide-y divide-stone">
      {modules.map((m) => {
        const done = m.lessons.filter((l) => l.status === "completed").length;
        const isOpen = open.has(m.number);
        return (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => toggle(m.number)}
              aria-expanded={isOpen}
              aria-controls={`mod-${m.number}`}
              className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-ivory/60"
            >
              <span className="font-serif text-lg text-gold-deep lining-nums">{String(m.number).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9375rem] font-medium leading-snug text-ink">{m.title}</span>
                <span className="mt-0.5 block text-xs text-ink-subtle">{m.weeks_label} · {done}/{m.lessons.length} complete</span>
              </span>
              <ChevronDown aria-hidden className={cn("size-4 shrink-0 text-ink-subtle transition-transform", isOpen && "rotate-180")} />
            </button>
            {isOpen && (
              <ul id={`mod-${m.number}`} className="bg-ivory/60 pb-2">
                {m.lessons.map((l) => {
                  const current = l.code === currentCode;
                  const locked = (!enrolled && !l.is_preview) || l.locked;
                  return (
                    <li key={l.id}>
                      <Link
                        href={`/app/learn/${l.code}`}
                        onClick={onNavigate}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 border-l-2 px-5 py-2.5 text-sm transition-colors",
                          current ? "border-gold bg-white text-midnight" : "border-transparent text-ink-muted hover:bg-white/70 hover:text-ink",
                        )}
                      >
                        <StatusIcon status={l.status} locked={locked} />
                        <span className="w-8 shrink-0 text-xs font-semibold tracking-wider text-gold-deep">{l.code}</span>
                        <span className="min-w-0 flex-1 leading-snug">{l.title}</span>
                        <span className="shrink-0 text-xs text-ink-subtle lining-nums">{l.duration_minutes} min</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function CurriculumSidebar({ modules, currentCode, enrolled, completed, total }: { modules: ModuleWithLessons[]; currentCode: string; enrolled: boolean; completed: number; total: number }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pct = total ? (completed / total) * 100 : 0;

  return (
    <>
      {/* Desktop: collapsible right column */}
      <aside aria-label="Course contents" className={cn("hidden h-full xl:block", collapsed ? "w-12" : "w-[380px]")}>
        <div className="sticky top-6">
          {collapsed ? (
            <Button variant="outline" size="icon" onClick={() => setCollapsed(false)} aria-label="Show course contents"><PanelRightOpen /></Button>
          ) : (
            <div className="max-h-[calc(100dvh-3rem)] overflow-y-auto rounded-sm bg-white shadow-hairline">
              <div className="flex items-center justify-between border-b border-stone p-5">
                <Progress value={pct} label={`Programme progress · ${completed}/${total} lessons`} className="mr-4" />
                <button type="button" onClick={() => setCollapsed(true)} className="rounded-xs p-1.5 text-ink-subtle hover:bg-stone hover:text-ink" aria-label="Hide course contents"><PanelRightClose className="size-4" /></button>
              </div>
              <Contents modules={modules} currentCode={currentCode} enrolled={enrolled} />
            </div>
          )}
        </div>
      </aside>

      {/* Mobile & tablet: drawer */}
      <div className="xl:hidden">
        <D.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <D.Trigger asChild>
            <Button variant="outline" className="w-full justify-between"><span className="flex items-center gap-2"><ListTree /> Course contents</span><span className="text-xs text-ink-subtle">{completed}/{total} complete</span></Button>
          </D.Trigger>
          <D.Portal>
            <D.Overlay className="fixed inset-0 z-50 bg-midnight/40" />
            <D.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-lifted focus:outline-none">
              <div className="flex items-center justify-between border-b border-stone p-5">
                <D.Title className="font-serif text-2xl text-midnight">Course contents</D.Title>
                <D.Close asChild><Button variant="ghost" size="sm">Close</Button></D.Close>
              </div>
              <D.Description className="sr-only">Modules and lessons of the programme</D.Description>
              <div className="border-b border-stone p-5"><Progress value={pct} label={`${completed}/${total} lessons complete`} /></div>
              <div className="flex-1 overflow-y-auto"><Contents modules={modules} currentCode={currentCode} enrolled={enrolled} onNavigate={() => setMobileOpen(false)} /></div>
            </D.Content>
          </D.Portal>
        </D.Root>
      </div>
    </>
  );
}
