import { Suspense } from "react";
import type { Metadata } from "next";
import { StudentMobileNav, StudentSidebar } from "@/components/student/sidebar";
import { UserFooter } from "@/components/student/user-footer";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const footer = (
  <Suspense fallback={<div className="h-9 animate-pulse rounded-xs bg-white/5" />}>
    <UserFooter />
  </Suspense>
);

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-ivory">
      <StudentSidebar footer={footer} />
      <div className="min-w-0 flex-1">
        <StudentMobileNav footer={footer} />
        <main id="main" className="mx-auto max-w-6xl p-5 md:p-10">{children}</main>
      </div>
    </div>
  );
}
