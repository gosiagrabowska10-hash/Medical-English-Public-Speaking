import Link from "next/link";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/forms";
import { integrations } from "@/lib/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Sign in", description: "Sign in to The Medical Speaking Academy student platform.", path: "/login", noindex: true });

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back."
      lead="Sign in to continue your programme."
      footer={<>New to the Academy? <Link href="/register" className="font-medium text-midnight underline decoration-gold underline-offset-4">Apply to the Academy</Link></>}
    >
      <Suspense fallback={<div className="h-72" aria-hidden />}>
        <LoginForm disabled={!integrations.supabase} />
      </Suspense>
    </AuthShell>
  );
}
