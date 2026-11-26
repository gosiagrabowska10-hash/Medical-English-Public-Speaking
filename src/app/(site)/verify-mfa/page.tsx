import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyMfaForm } from "@/components/auth/verify-mfa-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Two-factor verification", description: "Confirm your sign-in with your authenticator app.", path: "/verify-mfa", noindex: true });

export default function VerifyMfaPage({ searchParams }: PageProps<"/verify-mfa">) {
  return (
    <AuthShell title="One more step." lead="Enter the 6-digit code from your authenticator app to finish signing in." footer={<>Two-factor authentication protects learner data. <a href="/contact?topic=other" className="font-medium text-midnight underline decoration-gold underline-offset-4">Contact support</a></>}>
      <Suspense fallback={<div className="h-40" aria-hidden />}>
        <Next searchParams={searchParams} />
      </Suspense>
    </AuthShell>
  );
}

async function Next({ searchParams }: { searchParams: PageProps<"/verify-mfa">["searchParams"] }) {
  const sp = await searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/app";
  return <VerifyMfaForm next={next} />;
}
