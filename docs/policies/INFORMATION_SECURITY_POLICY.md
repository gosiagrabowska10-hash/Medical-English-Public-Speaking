# Information Security Policy

**Status:** Draft, 27 November 2026 · Owner: Academy Owner, with the technical lead · Review by a security adviser recommended. Supports GDPR Art. 32. Register: SEC-01 – SEC-12.

## Controls in place **[Implemented]** (evidence in `docs/compliance/CHANGES.md`)
- **Access control:** Row Level Security on every table; learners see only their own records; every staff privilege requires an MFA-verified session (`has_role`, `is_teaching_staff`, `is_content_staff`); staff cannot assess themselves; role grants and removals are written to the audit log.
- **Authentication:** passwords of at least 10 characters; TOTP two-factor authentication (optional for learners, required for staff privileges); sign-in requires the second factor once enrolled.
- **Least privilege:** Supabase default grants revoked; anonymous visitors can read only the public syllabus; no service-role key in the application.
- **Secrets:** none in the repository or its history (scanner with a negative test, run in CI).
- **Web security:** Content-Security-Policy, HSTS, frame-ancestors/X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy; framework banner removed.
- **Abuse prevention:** rate limiting on the contact form (hashed client key), honeypot field.
- **Data rights:** complete self-service data export; deletion request workflow.
- **Monitoring:** structured server-error events without personal data; health endpoint; audit log.
- **Resilience:** tested backup-and-restore procedure.
- **Supply chain:** `npm audit` (high and critical) in CI; lockfile committed.

## Rules for people
- Staff use MFA and a password manager; never share accounts; lock devices.
- Learner data is never copied to personal devices, email or chat tools; exports for support are deleted after use.
- Access is removed on the day a staff member leaves (role revoked — logged) and shared credentials are rotated.
- Suspected incidents are reported at once (`docs/operations/INCIDENT_RESPONSE.md`).

## Still to do **[Requires decision or setup]**
Staff access limited to assigned cohorts (S4); production backups with PITR; alert routing; nonce- or hash-based CSP; independent penetration test before launch and before Phase 4; annual review of this policy.
