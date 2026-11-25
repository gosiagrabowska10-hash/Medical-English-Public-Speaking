import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/forms";
import { integrations } from "@/lib/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Choose a new password", description: "Set a new password for your account.", path: "/reset-password", noindex: true });

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Choose a new password." lead="You opened a secure reset link. Choose a new password for your account." footer={<Link href="/forgot-password" className="font-medium text-midnight underline decoration-gold underline-offset-4">Request a new link</Link>}>
      <ResetPasswordForm disabled={!integrations.supabase} />
    </AuthShell>
  );
}
