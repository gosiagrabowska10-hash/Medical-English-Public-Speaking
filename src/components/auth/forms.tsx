"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, FieldError, FieldHint, Input, Label, Select } from "@/components/ui/form";
import { forgotPasswordAction, loginAction, registerAction, resetPasswordAction, type FormState } from "@/lib/auth-actions";

const idle: FormState = { status: "idle" };

function Alert({ state }: { state: FormState }) {
  if (state.status === "idle" || !state.message) return null;
  return (
    <p role={state.status === "error" ? "alert" : "status"} className={`rounded-sm p-4 text-sm leading-relaxed ${state.status === "error" ? "bg-danger-bg text-danger" : "bg-success-bg text-success"}`}>
      {state.message}
    </p>
  );
}

function PasswordInput({ id, name, autoComplete, invalid }: { id: string; name: string; autoComplete: string; invalid?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input id={id} name={name} type={show ? "text" : "password"} autoComplete={autoComplete} required aria-invalid={invalid || undefined} className="pr-12" />
      <button type="button" onClick={() => setShow((s) => !s)} className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-ink-subtle hover:text-ink" aria-label={show ? "Hide password" : "Show password"}>
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

export function LoginForm({ disabled }: { disabled: boolean }) {
  const params = useSearchParams();
  const [state, action, pending] = useActionState(loginAction, idle);
  const notice =
    params.get("signed_out") ? "You have been signed out." :
    params.get("error") === "link_invalid" ? "That link is invalid or has expired. Please sign in, or request a new link." : null;
  return (
    <form action={action} className="grid gap-5">
      {notice && state.status === "idle" && <p role="status" className="rounded-sm bg-info-bg p-4 text-sm text-info">{notice}</p>}
      <Alert state={state} />
      <fieldset disabled={disabled || pending} className="grid gap-5">
        <input type="hidden" name="next" value={params.get("next") ?? "/app"} />
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="mb-2 text-[0.8125rem] text-gold-deep underline underline-offset-2">Forgot password?</Link>
          </div>
          <PasswordInput id="password" name="password" autoComplete="current-password" />
        </div>
        <Button type="submit" size="lg" className="mt-2 w-full">{pending ? "Signing in…" : "Sign in"}</Button>
      </fieldset>
    </form>
  );
}

export function RegisterForm({ disabled }: { disabled: boolean }) {
  const [state, action, pending] = useActionState(registerAction, idle);
  const f = state.fields ?? {};
  const err = (k: string) => (f[k] ? <FieldError id={`${k}-error`}>{f[k]}</FieldError> : null);
  return (
    <form action={action} className="grid gap-5" noValidate>
      <Alert state={state} />
      <fieldset disabled={disabled || pending} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-[110px_1fr_1fr]">
          <div>
            <Label htmlFor="title">Title</Label>
            <Select id="title" name="title" defaultValue="Dr">
              {["Dr", "Prof.", "Mr", "Ms", "Mx"].map((t) => <option key={t}>{t}</option>)}
            </Select>
          </div>
          <div><Label htmlFor="first">First name</Label><Input id="first" name="first" autoComplete="given-name" required aria-invalid={!!f.first || undefined} />{err("first")}</div>
          <div><Label htmlFor="last">Last name</Label><Input id="last" name="last" autoComplete="family-name" required aria-invalid={!!f.last || undefined} />{err("last")}</div>
        </div>
        <div><Label htmlFor="email">Email address</Label><Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!f.email || undefined} />{err("email")}</div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><Label htmlFor="country">Country</Label><Input id="country" name="country" autoComplete="country-name" required aria-invalid={!!f.country || undefined} />{err("country")}</div>
          <div><Label htmlFor="specialty">Specialty or role <span className="font-normal text-ink-subtle">(optional)</span></Label><Input id="specialty" name="specialty" /></div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" name="password" autoComplete="new-password" invalid={!!f.password} />
          {f.password ? err("password") : <FieldHint>At least 10 characters. A passphrase of several words works well.</FieldHint>}
        </div>
        <div>
          <label className="flex gap-3 text-sm leading-relaxed text-ink-muted">
            <Checkbox name="terms" required />
            <span>
              I accept the <Link href="/terms" className="text-gold-deep underline underline-offset-2">Terms and Conditions</Link> and have read the{" "}
              <Link href="/privacy" className="text-gold-deep underline underline-offset-2">Privacy Policy</Link>.
            </span>
          </label>
          {err("terms")}
        </div>
        <Button type="submit" size="lg" className="mt-2 w-full">{pending ? "Creating your account…" : "Create account"}</Button>
      </fieldset>
    </form>
  );
}

export function ForgotPasswordForm({ disabled }: { disabled: boolean }) {
  const [state, action, pending] = useActionState(forgotPasswordAction, idle);
  return (
    <form action={action} className="grid gap-5">
      <Alert state={state} />
      {state.status !== "success" && (
        <fieldset disabled={disabled || pending} className="grid gap-5">
          <div><Label htmlFor="email">Email address</Label><Input id="email" name="email" type="email" autoComplete="email" required /></div>
          <Button type="submit" size="lg" className="w-full">{pending ? "Sending…" : "Send reset link"}</Button>
        </fieldset>
      )}
    </form>
  );
}

export function ResetPasswordForm({ disabled }: { disabled: boolean }) {
  const [state, action, pending] = useActionState(resetPasswordAction, idle);
  return (
    <form action={action} className="grid gap-5">
      <Alert state={state} />
      <fieldset disabled={disabled || pending} className="grid gap-5">
        <div><Label htmlFor="password">New password</Label><PasswordInput id="password" name="password" autoComplete="new-password" /><FieldHint>At least 10 characters.</FieldHint></div>
        <div><Label htmlFor="confirm">Confirm new password</Label><PasswordInput id="confirm" name="confirm" autoComplete="new-password" /></div>
        <Button type="submit" size="lg" className="w-full">{pending ? "Saving…" : "Set new password"}</Button>
      </fieldset>
    </form>
  );
}
