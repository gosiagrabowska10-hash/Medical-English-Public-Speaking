"use client";

import { useEffect, useRef, useState } from "react";
import { Clapperboard, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { saveVideoPositionAction } from "@/lib/course-actions";

const speeds = [0.75, 1, 1.25, 1.5];

/**
 * Lesson video. Uses the native player (keyboard accessible, fullscreen,
 * captions menu) plus speed control and resume-from-last-position.
 * Never shows a fake video: lessons without a recording show a clear notice.
 */
export function VideoPlayer({
  lessonId, title, src, captions, status, note, startAt,
}: {
  lessonId: string; title: string; src: string | null; captions: string | null;
  status: "not_recorded" | "sample" | "published"; note: string | null; startAt: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const lastSaved = useRef(startAt);
  const [speed, setSpeed] = useState(1);
  const [resumed, setResumed] = useState(false);

  // Resume from the saved position once metadata is available (it may load before hydration).
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const apply = () => {
      if (startAt > 3 && startAt < v.duration - 3) { v.currentTime = startAt; setResumed(true); }
    };
    if (v.readyState >= 1) apply();
    else v.addEventListener("loadedmetadata", apply, { once: true });
    return () => v.removeEventListener("loadedmetadata", apply);
  }, [startAt]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const save = () => {
      const t = Math.floor(v.currentTime);
      if (Math.abs(t - lastSaved.current) >= 5) {
        lastSaved.current = t;
        void saveVideoPositionAction(lessonId, t);
      }
    };
    const onTime = () => { if (Math.floor(v.currentTime) - lastSaved.current >= 15) save(); };
    v.addEventListener("pause", save);
    v.addEventListener("timeupdate", onTime);
    return () => { v.removeEventListener("pause", save); v.removeEventListener("timeupdate", onTime); save(); };
  }, [lessonId]);

  if (!src || status === "not_recorded") {
    return (
      <figure className="on-dark overflow-hidden rounded-sm bg-midnight shadow-lifted">
        <div className="relative flex aspect-video flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_30%_80%,#2A3B52,#101B2D_70%)] px-6 text-center">
          <Clapperboard aria-hidden className="size-10 text-gold-light" strokeWidth={1.2} />
          <p className="font-serif text-2xl text-ivory">Instructor recording in production</p>
          <p className="max-w-md text-sm text-ivory/60">The video for this lesson has not been recorded yet. The written lesson, exercise and quiz below are available now.</p>
        </div>
        <figcaption className="border-t border-white/10 px-5 py-3 text-xs text-ivory/60">{title}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="on-dark overflow-hidden rounded-sm bg-midnight shadow-lifted">
      <div className="relative aspect-video bg-black">
        <video
          ref={ref}
          controls
          preload="metadata"
          playsInline
          className="size-full"
          aria-label={`Lesson video: ${title}`}
          onLoadedMetadata={(e) => { e.currentTarget.playbackRate = speed; }}
        >
          <source src={src} />
          {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
          Your browser cannot play this video.
        </video>
        {status === "sample" && (
          <Badge tone="warning" className="pointer-events-none absolute left-4 top-4">Sample video</Badge>
        )}
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-xs text-ivory/70">
        <span>{resumed ? `Resumed at ${Math.floor(startAt / 60)}:${String(startAt % 60).padStart(2, "0")} · ` : ""}{captions ? "English captions available" : "No captions"}</span>
        <label className="flex items-center gap-2">
          <Gauge aria-hidden className="size-3.5" />
          <span className="sr-only">Playback speed</span>
          <select
            value={speed}
            onChange={(e) => { const s = Number(e.target.value); setSpeed(s); if (ref.current) ref.current.playbackRate = s; }}
            className="rounded-xs border border-white/15 bg-navy px-2 py-1 text-ivory"
            aria-label="Playback speed"
          >
            {speeds.map((s) => <option key={s} value={s}>{s}×</option>)}
          </select>
        </label>
      </figcaption>
      {note && <p className="border-t border-white/10 bg-warning-bg px-5 py-2.5 text-xs text-warning">{note}</p>}
    </figure>
  );
}
