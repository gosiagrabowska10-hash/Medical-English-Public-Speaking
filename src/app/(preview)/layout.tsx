import Link from "next/link";
import { BookOpen, Award, CalendarDays, ClipboardList, GraduationCap, LayoutDashboard, LibraryBig, Mic, MessagesSquare, Route, Settings, Theater, TrendingUp } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";

const nav = [
  [LayoutDashboard, "Dashboard"], [Route, "My Learning Path"], [BookOpen, "Curriculum"], [MessagesSquare, "AI Teachers"],
  [Mic, "Speaking Studio"], [Theater, "Simulation Centre"], [ClipboardList, "Assignments"], [TrendingUp, "My Progress"],
  [LibraryBig, "Resources"], [CalendarDays, "Live Coaching"], [Award, "Certificates"], [Settings, "Settings"],
] as const;

/** Design preview shell for the student platform (Milestone 3). Specimen data only. */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <aside className="on-dark sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-midnight text-ivory lg:flex">
        <div className="px-6 py-6"><Link href="/"><Wordmark light /></Link></div>
        <nav aria-label="Student" className="flex-1 overflow-y-auto px-3">
          {nav.map(([Icon, label]) => (
            <span key={label} className={`mb-0.5 flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm ${label === "Curriculum" ? "bg-white/8 text-ivory" : "text-ivory/60"}`}>
              <Icon aria-hidden className={`size-4 ${label === "Curriculum" ? "text-gold-light" : ""}`} strokeWidth={1.5} /> {label}
            </span>
          ))}
        </nav>
        <div className="border-t border-white/10 p-5 text-xs text-ivory/50"><GraduationCap aria-hidden className="mb-2 size-4 text-gold-light" />Week 3 of 10</div>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="bg-warning-bg px-6 py-2 text-center text-xs text-warning">Design preview — specimen data, not connected to any account</div>
        {children}
      </div>
    </div>
  );
}
