import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Editorial image slot. Pass `src` (licensed photography) when available.
 * Without a photograph, it renders a restrained brand composition — fine
 * champagne arcs suggesting a voice carrying across a hall — so the layout
 * never shows a broken image or an unlicensed stock photo.
 */
export function EditorialVisual({
  src,
  alt = "",
  caption,
  className,
  variant = "arcs",
  priority,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
  variant?: "arcs" | "lectern" | "grid";
  priority?: boolean;
}) {
  return (
    <figure className={cn("relative overflow-hidden rounded-sm bg-midnight", className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      ) : (
        <svg viewBox="0 0 600 720" preserveAspectRatio="xMidYMid slice" aria-hidden className="absolute inset-0 size-full">
          <defs>
            <radialGradient id={`glow-${variant}`} cx="30%" cy="78%" r="80%">
              <stop offset="0%" stopColor="#2A3B52" />
              <stop offset="60%" stopColor="#18283C" />
              <stop offset="100%" stopColor="#101B2D" />
            </radialGradient>
          </defs>
          <rect width="600" height="720" fill={`url(#glow-${variant})`} />
          {variant === "arcs" &&
            Array.from({ length: 11 }).map((_, i) => (
              <circle key={i} cx="170" cy="560" r={70 + i * 52} fill="none" stroke="#B69A68" strokeOpacity={0.55 - i * 0.045} strokeWidth={i === 0 ? 1.25 : 0.6} />
            ))}
          {variant === "arcs" && <circle cx="170" cy="560" r="5" fill="#B69A68" />}
          {variant === "lectern" && (
            <g stroke="#B69A68" fill="none">
              {Array.from({ length: 14 }).map((_, i) => (
                <line key={i} x1={40 + i * 40} y1="0" x2={40 + i * 40} y2="720" strokeOpacity="0.08" strokeWidth="0.6" />
              ))}
              <path d="M220 470 L380 470 L360 640 L240 640 Z" strokeOpacity="0.7" strokeWidth="0.9" />
              <line x1="200" y1="470" x2="400" y2="470" strokeOpacity="0.9" strokeWidth="1.2" />
              <path d="M300 470 L300 420 Q300 400 320 395" strokeOpacity="0.7" strokeWidth="0.9" />
              {Array.from({ length: 6 }).map((_, i) => (
                <path key={i} d={`M ${330 + i * 22} ${380 - i * 30} q ${30 + i * 8} ${40} 0 ${80 + i * 20}`} strokeOpacity={0.5 - i * 0.07} strokeWidth="0.7" />
              ))}
            </g>
          )}
          {variant === "grid" && (
            <g stroke="#B69A68" fill="none" strokeWidth="0.5">
              {Array.from({ length: 9 }).map((_, r) =>
                Array.from({ length: 7 }).map((_, c) => (
                  <path key={`${r}-${c}`} d={`M ${60 + c * 80} ${130 + r * 60} a 26 18 0 0 1 52 0`} strokeOpacity={0.12 + (r / 9) * 0.45} />
                )),
              )}
              <line x1="60" y1="90" x2="540" y2="90" strokeOpacity="0.8" strokeWidth="1" />
            </g>
          )}
        </svg>
      )}
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/90 to-transparent p-6 pt-16 text-xs uppercase tracking-[0.2em] text-ivory/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
