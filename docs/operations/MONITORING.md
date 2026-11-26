# Monitoring and Logging

**Status:** Implemented in code on 27 November 2026; alerting must be configured when production hosting is set up. Register: SEC-05.

| Signal | Implementation | Personal data | Action on alert |
|---|---|---|---|
| Server errors | `src/instrumentation.ts` (`onRequestError`): one JSON line per error with route, method, path without query string, error name and digest. Optional forwarding to an EU-hosted service via `MONITORING_WEBHOOK_URL`. | None: no query strings, headers, cookies, bodies or error messages | Investigate within one working day; S2 if repeated |
| Availability | `GET /api/health` returns `ok`/`degraded` and database state only | None | Configure an external uptime check every 5 minutes; S2 if down > 15 minutes |
| Security-relevant events | `public.audit_log` (append-only via `log_event`): sign-in and sign-out, password change, profile update, MFA enabled/removed, data export, deletion request, lesson completion, workshop assessment, staff role granted/revoked | Actor id and event | Monthly review by the Academy Owner; immediate review after any incident |
| Abuse | `public.rate_limits` counters (hashed keys only) | None (salted hash) | Spikes reviewed weekly |
| Dependencies | `npm audit --omit=dev --audit-level=high` in CI on every push | None | Fix high/critical within 7 days |

**To configure in production:** log drain to an EU-region log service with 30-day retention; alert routing to the technical lead; uptime monitor on `/api/health`; Supabase project alerts (database CPU, auth anomalies).
