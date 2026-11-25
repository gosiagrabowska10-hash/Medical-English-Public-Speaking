import { RotateCcw, Sparkles, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Speaking Studio preview", description: "Design preview.", path: "/preview/studio", noindex: true });

const pace = [128, 134, 152, 168, 161, 142, 138, 171, 176, 150, 139, 132, 145, 158, 149, 136];
const attempts = [{ n: 1, wpm: 168, f: 14 }, { n: 2, wpm: 157, f: 11 }, { n: 3, wpm: 146, f: 7 }];

function Ring({ value, label }: { value: number; label: string }) {
  const c = 2 * Math.PI * 70;
  return (
    <svg viewBox="0 0 180 180" className="size-44" role="img" aria-label={`${label}: ${value} out of 100`}>
      <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle cx="90" cy="90" r="70" fill="none" stroke="#B69A68" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(value / 100) * c} ${c}`} transform="rotate(-90 90 90)" />
      <text x="90" y="92" textAnchor="middle" className="font-serif" fontSize="46" fill="#F7F4EE" style={{ fontVariantNumeric: "lining-nums" }}>{value}</text>
      <text x="90" y="118" textAnchor="middle" fontSize="8.5" letterSpacing="1.8" fill="rgba(247,244,238,0.55)">{label.toUpperCase()}</text>
    </svg>
  );
}

export default function StudioPreview() {
  const max = 190, min = 110, W = 600, H = 180;
  const pts = pace.map((v, i) => [(i / (pace.length - 1)) * W, H - ((v - min) / (max - min)) * H] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <div className="on-dark min-h-full bg-midnight p-5 text-ivory md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow font-semibold uppercase tracking-[0.2em] text-gold-light">Speaking Studio · Performance report</p>
          <h1 className="mt-2 font-serif text-h2">Conference opening — attempt 3</h1>
        </div>
        <Button variant="outline-light"><RotateCcw /> Record attempt 4</Button>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[320px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-sm bg-navy p-8 ring-1 ring-white/8">
          <Ring value={74} label="Delivery index" />
          <p className="mt-4 max-w-[16rem] text-center text-xs leading-relaxed text-ivory/55">Composite of measured pace, pauses and filler words. Not a grade — your final assessment is made by an instructor.</p>
        </div>
        <div className="rounded-sm bg-navy p-6 ring-1 ring-white/8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[["Speaking pace", "146", "wpm"], ["Pauses > 0.5 s", "23", ""], ["Filler words", "7", "in 4:12"], ["Repetitions", "3", ""]].map(([l, v, u]) => (
              <div key={l}>
                <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-ivory/50">{l}</p>
                <p className="mt-1 font-serif text-3xl text-gold-light lining-nums">{v} <span className="font-sans text-xs text-ivory/40">{u}</span></p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-ivory/50"><span>Pace across the talk (wpm)</span><Badge tone="info">Measured</Badge></div>
          <svg viewBox={`0 0 ${W} ${H + 10}`} className="mt-3 h-44 w-full" preserveAspectRatio="none" aria-label="Speaking pace over time">
            <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#B69A68" stopOpacity="0.35" /><stop offset="1" stopColor="#B69A68" stopOpacity="0" /></linearGradient></defs>
            <rect x="0" y={H - ((160 - min) / (max - min)) * H} width={W} height={((160 - 130) / (max - min)) * H} fill="rgba(255,255,255,0.04)" />
            <path d={`${line} L${W} ${H} L0 ${H} Z`} fill="url(#g)" />
            <path d={line} fill="none" stroke="#B69A68" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
          <p className="text-xs text-ivory/45">Shaded band: 130–160 wpm, a comfortable range for international audiences.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-sm bg-navy p-6 ring-1 ring-white/8">
          <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-light">Attempts</p>
          <table className="mt-4 w-full text-sm"><caption className="sr-only">Comparison of attempts</caption>
            <thead><tr className="text-left text-xs text-ivory/45"><th className="pb-2 font-normal">Attempt</th><th className="pb-2 text-right font-normal">Pace</th><th className="pb-2 text-right font-normal">Fillers</th></tr></thead>
            <tbody className="divide-y divide-white/8">{attempts.map((a) => <tr key={a.n}><td className="py-2.5">#{a.n}</td><td className="py-2.5 text-right lining-nums tabular-nums">{a.wpm}</td><td className="py-2.5 text-right lining-nums tabular-nums">{a.f}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="rounded-sm bg-navy p-6 ring-1 ring-white/8">
          <div className="flex items-center justify-between"><p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold-light">Language & structure</p><Badge tone="gold" className="bg-gold/20 text-gold-light">AI feedback</Badge></div>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ivory/75">
            <li>Your core message is clear and stated within the first 40 seconds.</li>
            <li>“Was observed a reduction” → “we observed a reduction”.</li>
            <li>Signpost the second finding: “The second result is more surprising.”</li>
          </ul>
        </div>
        <div className="rounded-sm bg-gold p-6 text-midnight">
          <Target aria-hidden className="size-5" />
          <p className="mt-4 text-eyebrow font-semibold uppercase tracking-[0.18em]">Your next improvement challenge</p>
          <p className="mt-2 font-serif text-2xl leading-snug">Pause for one full second before stating your key result.</p>
          <Button className="mt-5"><Sparkles /> Practise with the Voice Coach</Button>
        </div>
      </div>
      <p className="mt-6 text-xs text-ivory/40">Specimen data for design review.</p>
    </div>
  );
}
