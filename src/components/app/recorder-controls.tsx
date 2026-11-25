"use client";

import { Mic, Pause, RotateCcw, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type RecorderState = "idle" | "recording" | "paused" | "recorded";

/** Presentational audio recording controls. The MediaRecorder logic is wired in Milestone 4. */
export function RecorderControls({
  state,
  seconds,
  levels = [],
  onStart,
  onStop,
  onPause,
  onRetake,
}: {
  state: RecorderState;
  seconds: number;
  levels?: number[];
  onStart?: () => void;
  onStop?: () => void;
  onPause?: () => void;
  onRetake?: () => void;
}) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <div className="on-dark rounded-sm bg-midnight p-6 text-ivory md:p-8">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ivory/60">
          <span className={cn("size-2 rounded-full", state === "recording" ? "animate-pulse bg-danger" : "bg-ivory/30")} />
          {state === "recording" ? "Recording" : state === "paused" ? "Paused" : state === "recorded" ? "Ready to review" : "Ready"}
        </span>
        <span className="font-serif text-3xl tabular-nums lining-nums" aria-live="polite" aria-label={`Elapsed ${mm} minutes ${ss} seconds`}>
          {mm}:{ss}
        </span>
      </div>
      <div className="mt-6 flex h-16 items-center gap-[3px]" aria-hidden>
        {(levels.length ? levels : Array.from({ length: 48 }, () => 4)).map((l, i) => (
          <span key={i} className="flex-1 rounded-full bg-gold/70 transition-[height]" style={{ height: `${Math.max(4, l)}%` }} />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        {state === "idle" && (
          <Button variant="gold" size="lg" onClick={onStart}><Mic /> Start recording</Button>
        )}
        {(state === "recording" || state === "paused") && (
          <>
            <Button variant="outline-light" size="icon" onClick={onPause} aria-label={state === "paused" ? "Resume" : "Pause"}><Pause /></Button>
            <Button variant="light" size="lg" onClick={onStop}><Square /> Stop</Button>
          </>
        )}
        {state === "recorded" && (
          <Button variant="outline-light" onClick={onRetake}><RotateCcw /> Retake</Button>
        )}
      </div>
    </div>
  );
}
