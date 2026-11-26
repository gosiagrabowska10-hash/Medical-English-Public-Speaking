import type { Instrumentation } from "next";

/**
 * Server error monitoring (audit SEC-05 / S8).
 * Emits one structured JSON line per server error, without personal data: no query
 * string, no headers, no cookies, no request body, no error message text (which can
 * contain user input). Hosting log drains (e.g. Vercel) collect these lines; an
 * EU-hosted monitoring service can be connected via MONITORING_WEBHOOK_URL.
 */
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  const e = err as { name?: string; digest?: string };
  const event = {
    level: "error",
    type: "server_error",
    at: new Date().toISOString(),
    route: context.routePath,
    routeType: context.routeType,
    method: request.method,
    path: request.path.split("?")[0],
    error: e?.name ?? "Error",
    digest: e?.digest,
  };
  console.error(JSON.stringify(event));
  const hook = process.env.MONITORING_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(event), signal: AbortSignal.timeout(2000) });
    } catch {
      // Monitoring must never break the request.
    }
  }
};
