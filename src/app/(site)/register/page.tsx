import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Checkbox, FieldHint, Input, Label, Select } from "@/components/ui/form";
import { integrations } from "@/lib/integrations";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Apply to the Academy", description: "Create your account to apply to The Medical Speaking Academy.", path: "/register", noindex: true });

export default function RegisterPage() {
  const disabled = !integrations.supabase;
  return (
    <AuthShell
      title="Apply to the Academy."
      lead="Create your account to begin enrolment in the Medical Public Speaking Professional Program."
      footer={<>Already enrolled? <Link href="/login" className="font-medium text-midnight underline decoration-gold underline-offset-4">Sign in</Link></>}
    >
      <form className="grid gap-5">
        <fieldset disabled={disabled} className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-[110px_1fr_1fr]">
            <div>
              <Label htmlFor="title">Title</Label>
              <Select id="title" name="title" defaultValue="Dr">
                <option>Dr</option>
                <option>Prof.</option>
                <option>Mr</option>
                <option>Ms</option>
                <option>Mx</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="first">First name</Label>
              <Input id="first" name="first" autoComplete="given-name" required />
            </div>
            <div>
              <Label htmlFor="last">Last name</Label>
              <Input id="last" name="last" autoComplete="family-name" required />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" autoComplete="country-name" required />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty or role</Label>
              <Input id="specialty" name="specialty" />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete="new-password" minLength={10} required />
            <FieldHint>At least 10 characters.</FieldHint>
          </div>
          <label className="flex gap-3 text-sm leading-relaxed text-ink-muted">
            <Checkbox name="terms" required />
            <span>
              I accept the <Link href="/terms" className="text-gold-deep underline underline-offset-2">Terms and Conditions</Link> and have read the{" "}
              <Link href="/privacy" className="text-gold-deep underline underline-offset-2">Privacy Policy</Link>.
            </span>
          </label>
          <Button type="submit" size="lg" className="mt-2 w-full">Create account</Button>
        </fieldset>
      </form>
    </AuthShell>
  );
}
