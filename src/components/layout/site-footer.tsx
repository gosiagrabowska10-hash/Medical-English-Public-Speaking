import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { CookieSettingsLink } from "@/components/layout/cookie-consent";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-midnight text-ivory">
      <div className="mx-auto max-w-[1240px] px-5 pb-10 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Wordmark variant="primary" light />
            <p className="mt-8 max-w-sm font-serif text-2xl leading-snug text-ivory/90">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
              An independent international academy for medical public speaking and professional English communication.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {Object.entries(footerNav).map(([group, links]) => (
              <nav key={group} aria-label={group}>
                <p className="text-eyebrow font-semibold uppercase tracking-[var(--tracking-eyebrow)] text-gold-light">{group}</p>
                <ul className="mt-5 space-y-3">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-ivory/70 transition-colors hover:text-ivory">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  {group === "Legal" && (
                    <li>
                      <CookieSettingsLink className="text-sm text-ivory/70 transition-colors hover:text-ivory" />
                    </li>
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs leading-relaxed text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© <CopyrightYear /> {site.name}. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            The Academy issues its own Certificate of Completion. It is not a university, and the program does not currently carry external accreditation or CME/CPD credit.
          </p>
        </div>
      </div>
    </footer>
  );
}

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
