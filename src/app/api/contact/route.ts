import { z } from "zod";
import { integrations } from "@/lib/integrations";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  topic: z.enum(["admissions", "program", "founder", "faculty", "partnerships", "media", "other"]),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  // Honeypot: must stay empty.
  website: z.string().max(0).optional(),
});

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "validation", issues: parsed.error.issues.map((i) => i.path.join(".")) }, { status: 422 });
  }

  if (!integrations.email) {
    // Never pretend the message was delivered.
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const d = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Academy Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_INBOX],
      reply_to: d.email,
      subject: `[Website · ${d.topic}] ${d.name}`,
      html: `<p><strong>${escape(d.name)}</strong> &lt;${escape(d.email)}&gt;</p><p>Topic: ${escape(d.topic)}</p><p>${escape(d.message).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  if (!res.ok) return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
