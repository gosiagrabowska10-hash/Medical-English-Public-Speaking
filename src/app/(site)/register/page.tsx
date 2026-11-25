import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/forms";
import { integrations } from "@/lib/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Apply to the Academy", description: "Create your account to apply to The Medical Speaking Academy.", path: "/register", noindex: true });

export default function RegisterPage() {
  return (
    <AuthShell
      title="Apply to the Academy."
      lead="Create your account to begin enrolment in the Medical Public Speaking Professional Program."
      footer={<>Already have an account? <Link href="/login" className="font-medium text-midnight underline decoration-gold underline-offset-4">Sign in</Link></>}
    >
      <RegisterForm disabled={!integrations.supabase} />
    </AuthShell>
  );
}
