import { CheckCircle2, CircleDot, Circle, Lock } from "lucide-react";
import type { ProgressStatus } from "@/lib/course";
import { cn } from "@/lib/utils";

export function StatusIcon({ status, locked, className }: { status: ProgressStatus; locked?: boolean; className?: string }) {
  if (locked) return <Lock aria-label="Locked" className={cn("size-4 text-ink-subtle", className)} />;
  if (status === "completed") return <CheckCircle2 aria-label="Completed" className={cn("size-4 text-success", className)} />;
  if (status === "in_progress") return <CircleDot aria-label="In progress" className={cn("size-4 text-gold-deep", className)} />;
  return <Circle aria-label="Not started" className={cn("size-4 text-stone-deep", className)} />;
}
