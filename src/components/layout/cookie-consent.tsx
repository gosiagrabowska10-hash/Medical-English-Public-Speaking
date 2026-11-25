"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/form";

/**
 * Cookie consent. Only strictly necessary storage is used until the visitor
 * opts in. Analytics (GA4, Milestone 7) must read `getConsent().analytics`
 * before loading any script.
 */
export type Consent = { necessary: true; analytics: boolean; marketing: boolean; updatedAt: string; version: 1 };
const KEY = "msa-cookie-consent";
const EVENT = "msa-consent-change";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}
function saveConsent(analytics: boolean, marketing: boolean) {
  const value: Consent = { necessary: true, analytics, marketing, updatedAt: new Date().toISOString(), version: 1 };
  window.localStorage.setItem(KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(EVENT));
}
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
const snapshot = () => window.localStorage.getItem(KEY);

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("msa-open-cookie-settings"))}>
      Cookie settings
    </button>
  );
}

export function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, snapshot, () => "server");
  const [customise, setCustomise] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const open = () => {
      const c = getConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setCustomise(true);
      setForceOpen(true);
    };
    window.addEventListener("msa-open-cookie-settings", open);
    return () => window.removeEventListener("msa-open-cookie-settings", open);
  }, []);

  if (stored === "server" || (stored && !forceOpen)) return null;

  const done = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setForceOpen(false);
    setCustomise(false);
  };

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-sm bg-white p-6 shadow-lifted ring-1 ring-stone-deep/60 md:p-8">
        <p id="cookie-title" className="font-serif text-2xl text-midnight">Your privacy</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          We use strictly necessary storage to run this website. With your permission, we would also like to use analytics to understand how the site is used. Nothing optional is enabled unless you agree. Read our{" "}
          <Link href="/cookies" className="text-gold-deep underline underline-offset-2">Cookie Policy</Link>.
        </p>
        {customise && (
          <fieldset className="mt-5 space-y-3 border-t border-stone pt-5 text-sm">
            <legend className="sr-only">Cookie categories</legend>
            <label className="flex gap-3 text-ink-muted">
              <Checkbox checked disabled />
              <span><strong className="font-medium text-ink">Strictly necessary</strong> — security, sign-in and remembering this choice. Always on.</span>
            </label>
            <label className="flex gap-3 text-ink-muted">
              <Checkbox checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
              <span><strong className="font-medium text-ink">Analytics</strong> — anonymous usage measurement (Google Analytics 4).</span>
            </label>
            <label className="flex gap-3 text-ink-muted">
              <Checkbox checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
              <span><strong className="font-medium text-ink">Marketing</strong> — measuring the effectiveness of advertising campaigns.</span>
            </label>
          </fieldset>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          {customise ? (
            <Button size="sm" onClick={() => done(analytics, marketing)}>Save preferences</Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setCustomise(true)}>Customise</Button>
          )}
          <Button size="sm" onClick={() => done(false, false)}>Necessary only</Button>
          <Button size="sm" onClick={() => done(true, true)}>Accept all</Button>
        </div>
      </div>
    </div>
  );
}
