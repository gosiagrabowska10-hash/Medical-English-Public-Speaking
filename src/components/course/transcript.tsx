"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

/** Parses WebVTT cues into plain paragraphs (timings kept for reference). */
export function parseVtt(vtt: string) {
  return vtt.replace(/\r/g, "").split(/\n\n+/).map((block) => {
    const lines = block.split("\n").filter(Boolean);
    const t = lines.findIndex((l) => l.includes("-->"));
    if (t < 0) return null;
    const text = lines.slice(t + 1).join(" ").replace(/<[^>]+>/g, "").trim();
    return text ? { start: lines[t].split("-->")[0].trim().replace(/\.\d+$/, "").replace(/^00:/, ""), text } : null;
  }).filter((c): c is { start: string; text: string } => c !== null);
}

/** Transcript of a video, generated from its caption file (WCAG 1.2.3 / 1.2.5 alternative). */
export function Transcript({ captions, title }: { captions: string; title: string }) {
  const [cues, setCues] = useState<{ start: string; text: string }[] | null>(null);
  const [error, setError] = useState(false);
  return (
    <details
      className="group border-t border-white/10 bg-navy/60 text-sm text-ivory/85"
      onToggle={(e) => {
        if (!(e.currentTarget as HTMLDetailsElement).open || cues) return;
        fetch(captions).then((r) => (r.ok ? r.text() : Promise.reject())).then((t) => setCues(parseVtt(t))).catch(() => setError(true));
      }}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.14em] text-ivory/80 hover:text-ivory [&::-webkit-details-marker]:hidden">
        <FileText aria-hidden className="size-3.5" /> Transcript
      </summary>
      <div className="max-h-80 overflow-y-auto px-5 pb-5" tabIndex={0} role="region" aria-label={`Transcript: ${title}`}>
        {error && <p role="alert">The transcript could not be loaded. Please reload the page.</p>}
        {!cues && !error && <p>Loading transcript…</p>}
        {cues && (
          <ol className="space-y-2">
            {cues.map((c, i) => (
              <li key={i} className="grid grid-cols-[3.5rem_1fr] gap-3 leading-relaxed">
                <span className="font-mono text-xs text-mist">{c.start}</span>
                <span>{c.text}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </details>
  );
}
