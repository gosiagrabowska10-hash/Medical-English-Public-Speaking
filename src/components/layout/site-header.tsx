"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog as D } from "radix-ui";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-ivory/92 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-stone-deep/70" : "border-transparent",
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-midnight focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="shrink-0">
          <Wordmark />
          <span className="sr-only"> — home</span>
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.8125rem] font-medium tracking-[0.04em] text-ink-muted transition-colors hover:text-midnight",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100",
                      active && "text-midnight after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/pricing#apply">Apply to the Academy</Link>
          </Button>
        </div>

        <D.Root open={open} onOpenChange={setOpen}>
          <D.Trigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
              <Menu className="size-5!" />
            </Button>
          </D.Trigger>
          <D.Portal>
            <D.Overlay className="fixed inset-0 z-50 bg-midnight/40 xl:hidden" />
            <D.Content className="on-dark fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-midnight text-ivory shadow-lifted focus:outline-none xl:hidden">
              <D.Title className="sr-only">Menu</D.Title>
              <D.Description className="sr-only">Site navigation</D.Description>
              <div className="flex h-20 items-center justify-between px-6">
                <Wordmark light />
                <D.Close asChild>
                  <Button variant="outline-light" size="icon" aria-label="Close menu" className="border-0">
                    <X className="size-5!" />
                  </Button>
                </D.Close>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-6">
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {[{ href: "/", label: "Home" }, ...mainNav, { href: "/founder", label: "Founder" }, { href: "/faq", label: "Questions" }, { href: "/blog", label: "Journal" }, { href: "/contact", label: "Contact" }].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-4 font-serif text-2xl text-ivory transition-colors hover:text-gold-light aria-[current=page]:text-gold-light"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="grid gap-3 p-6">
                <Button asChild variant="gold" size="lg">
                  <Link href="/pricing#apply" onClick={() => setOpen(false)}>Apply to the Academy</Link>
                </Button>
                <Button asChild variant="outline-light" size="lg">
                  <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
                </Button>
              </div>
            </D.Content>
          </D.Portal>
        </D.Root>
      </div>
    </header>
  );
}
