"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox, FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";

const topics = [
  ["admissions", "Admissions and enrolment"],
  ["program", "The programme and curriculum"],
  ["founder", "The founder’s office"],
  ["faculty", "Teaching with the Academy"],
  ["partnerships", "Institutional partnerships"],
  ["media", "Media enquiries"],
  ["other", "Something else"],
] as const;

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = topics.some(([v]) => v === params.get("topic")) ? params.get("topic")! : "admissions";
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          topic: f.get("topic"),
          message: f.get("message"),
          consent: f.get("consent") === "on",
          website: f.get("website") ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) return setState({ kind: "sent" });
      if (data.error === "not_configured")
        return setState({ kind: "error", message: "Online messages cannot be delivered yet because the Academy’s email service is still being set up. Your message has not been sent. Please try again later." });
      if (data.error === "validation")
        return setState({ kind: "error", message: "Please check the highlighted fields: a name, a valid email address, a message of at least 10 characters and your consent are required." });
      setState({ kind: "error", message: "Your message could not be sent. Please try again in a few minutes." });
    } catch {
      setState({ kind: "error", message: "Network error — your message was not sent. Please check your connection and try again." });
    }
  }

  if (state.kind === "sent") {
    return (
      <div role="status" className="rounded-sm bg-success-bg p-8">
        <p className="font-serif text-3xl text-midnight">Thank you. Your message has been sent.</p>
        <p className="mt-3 text-ink-muted">A member of the Academy team will reply to the email address you provided.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" required minLength={2} maxLength={120} autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div>
        <Label htmlFor="topic">Topic</Label>
        <Select id="topic" name="topic" defaultValue={initialTopic}>
          {topics.map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required minLength={10} maxLength={5000} />
      </div>
      <div aria-hidden className="hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="flex gap-3 text-sm leading-relaxed text-ink-muted">
        <Checkbox name="consent" required />
        <span>
          I agree that the Academy may use these details to respond to my enquiry, as described in the{" "}
          <Link href="/privacy" className="text-gold-deep underline underline-offset-2">Privacy Policy</Link>.
        </span>
      </label>
      {state.kind === "error" && <FieldError className="rounded-sm bg-danger-bg p-4 text-sm">{state.message}</FieldError>}
      <div>
        <Button type="submit" size="lg" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
      <p className="text-xs text-ink-subtle">Please do not include patient information or other confidential clinical data.</p>
    </form>
  );
}
