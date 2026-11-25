import Link from "next/link";
import { Info } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { EditorialVisual } from "@/components/marketing/editorial-visual";
import { integrations } from "@/lib/integrations";

export function AuthShell({ title, lead, children, footer }: { title: string; lead: string; children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <section className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <h1 className="font-serif text-h2 text-midnight">{title}</h1>
          <p className="mt-4 text-ink-muted">{lead}</p>
          {!integrations.supabase && (
            <div role="status" className="mt-8 flex gap-3 rounded-sm bg-info-bg p-4 text-sm leading-relaxed text-info">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
              <p>
                Student accounts are not open yet. Registration and sign-in will be enabled when the student platform launches. For admissions questions, please{" "}
                <Link href="/contact?topic=admissions" className="underline underline-offset-2">contact us</Link>.
              </p>
            </div>
          )}
          <div className="mt-8">{children}</div>
          <div className="mt-8 border-t border-stone-deep pt-6 text-sm text-ink-muted">{footer}</div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <EditorialVisual variant="arcs" className="absolute inset-0 rounded-none" />
        <div className="on-dark absolute inset-x-12 bottom-12 text-ivory">
          <Wordmark variant="primary" light className="items-start text-left" />
          <p className="mt-8 max-w-sm font-serif text-3xl leading-snug">Your Expertise Deserves to Be Heard.</p>
        </div>
      </div>
    </section>
  );
}
