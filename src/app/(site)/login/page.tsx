import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form";
import { integrations } from "@/lib/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Sign in", description: "Sign in to The Medical Speaking Academy student platform.", path: "/login", noindex: true });

export default function LoginPage() {
  const disabled = !integrations.supabase;
  return (
    <AuthShell
      title="Welcome back."
      lead="Sign in to continue your program."
      footer={<>New to the Academy? <Link href="/register" className="font-medium text-midnight underline decoration-gold underline-offset-4">Apply to the Academy</Link></>}
    >
      <form className="grid gap-5">
        <fieldset disabled={disabled} className="grid gap-5">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <Button type="submit" size="lg" className="mt-2 w-full">Sign in</Button>
        </fieldset>
      </form>
    </AuthShell>
  );
}
