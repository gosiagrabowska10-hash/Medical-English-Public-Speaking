import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forms";
import { integrations } from "@/lib/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Reset your password", description: "Request a password reset link.", path: "/forgot-password", noindex: true });

export default function ForgotPasswordPage() {
  return (
    <AuthShell title="Reset your password." lead="Enter the email address of your account and we will send you a secure link to choose a new password." footer={<Link href="/login" className="font-medium text-midnight underline decoration-gold underline-offset-4">Back to sign in</Link>}>
      <ForgotPasswordForm disabled={!integrations.supabase} />
    </AuthShell>
  );
}
