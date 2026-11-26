import { Monogram } from "@/components/brand/wordmark";
import { site } from "@/lib/site";

/**
 * Certificate of Completion layout (screen preview). The downloadable PDF
 * with QR verification is generated server-side in Milestone 6.
 */
/**
 * `competent` lists only workshops in which an Academy instructor has confirmed the
 * Competent standard using the rubric. Self-assessed results are never printed.
 */
export function CertificateLayout({ name, date, number, signatory, specimen, competent = [] }: { name: string; date: string; number: string; signatory: string; specimen?: boolean; competent?: string[] }) {
  return (
    <div className="relative mx-auto aspect-[1.414/1] w-full max-w-4xl overflow-hidden bg-ivory p-[3%] shadow-lifted">
      <div className="relative flex size-full flex-col items-center border border-gold p-[1%]">
        <div className="flex size-full flex-col items-center border border-gold/50 px-[6%] py-[4%] text-center">
          <Monogram className="size-[7%] min-w-8" />
          <p className="mt-[2%] text-[clamp(0.45rem,1.1vw,0.75rem)] font-semibold uppercase tracking-[0.4em] text-gold-deep">{site.name}</p>
          <p className="mt-[4%] font-serif text-[clamp(1.25rem,4vw,3rem)] leading-none text-midnight">Certificate of Completion</p>
          <p className="mt-[3%] text-[clamp(0.5rem,1.1vw,0.8rem)] uppercase tracking-[0.2em] text-ink-subtle">This certifies that</p>
          <p className="mt-[2%] font-serif text-[clamp(1.1rem,3.4vw,2.5rem)] italic leading-none text-midnight">{name}</p>
          <p className="mt-[3%] max-w-[80%] text-[clamp(0.5rem,1.15vw,0.85rem)] leading-relaxed text-ink-muted">
            has successfully completed the {site.program.name} at {site.name} and fulfilled the academy&rsquo;s published educational and practical assessment requirements.
          </p>
          {competent.length > 0 && (
            <p className="mt-[2%] max-w-[80%] text-[clamp(0.45rem,1vw,0.72rem)] leading-relaxed text-ink-muted">
              Assessed as Competent by an Academy instructor in: {competent.join(" · ")}
            </p>
          )}
          <div className="mt-auto grid w-full grid-cols-3 items-end gap-4 text-[clamp(0.45rem,1vw,0.72rem)] text-ink-muted">
            <div className="text-left">
              <p className="border-t border-midnight/40 pt-1.5 font-medium text-ink">{signatory}</p>
              <p>Authorised Academy Representative</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.16em]">Issued {date}</p>
              <p className="mt-1 font-mono tracking-wider">No. {number}</p>
            </div>
            <div className="flex flex-col items-end">
              <div aria-label="QR verification code (generated on issue)" className="grid size-[clamp(2rem,6vw,4rem)] place-items-center border border-midnight/30 text-[0.5rem] uppercase text-ink-subtle">QR</div>
              <p className="mt-1">Verify online</p>
            </div>
          </div>
        </div>
      </div>
      {specimen && (
        <p aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif text-[clamp(3rem,12vw,9rem)] uppercase tracking-[0.2em] text-danger/12 [transform:rotate(-18deg)]">Specimen</p>
      )}
    </div>
  );
}
