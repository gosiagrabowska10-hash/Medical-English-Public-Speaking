import { Award, BookOpen, CalendarDays, ClipboardList, LayoutDashboard, LibraryBig, MessagesSquare, Mic, Route, Settings, Theater, TrendingUp, type LucideIcon } from "lucide-react";

/** Student navigation. `stage` marks sections built in later stages (shown, not linked). */
export const studentNav: { href: string; label: string; icon: LucideIcon; stage?: number }[] = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/path", label: "My Learning Path", icon: Route, stage: 3 },
  { href: "/app/curriculum", label: "Curriculum", icon: BookOpen, stage: 3 },
  { href: "/app/teachers", label: "AI Teachers", icon: MessagesSquare, stage: 4 },
  { href: "/app/studio", label: "Speaking Studio", icon: Mic, stage: 4 },
  { href: "/app/simulations", label: "Simulation Center", icon: Theater, stage: 4 },
  { href: "/app/assignments", label: "Assignments", icon: ClipboardList, stage: 5 },
  { href: "/app/progress", label: "My Progress", icon: TrendingUp, stage: 3 },
  { href: "/app/resources", label: "Resources", icon: LibraryBig, stage: 3 },
  { href: "/app/coaching", label: "Live Coaching", icon: CalendarDays, stage: 5 },
  { href: "/app/certificates", label: "Certificates", icon: Award, stage: 6 },
  { href: "/app/settings", label: "Account Settings", icon: Settings },
];
