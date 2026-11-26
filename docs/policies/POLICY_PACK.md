
---

# Academy Policies — drafts

These documents were prepared by the development team on 27 November 2026 so that the platform is built around them from the start. **None of them is legal advice, and none is in force until it has been reviewed by the specialist named in its header and approved by the Academy Owner.** Implemented technical controls are marked **[Implemented]** with a reference to the evidence; obligations that still depend on decisions or professional verification are marked **[Requires review]**.

| Policy | Reviewer needed | Register |
|---|---|---|
| [Reasonable Adjustments](REASONABLE_ADJUSTMENTS_POLICY.md) | Academic Director; accessibility adviser recommended | ACC-05 |
| [Certificate and Assessment](CERTIFICATE_AND_ASSESSMENT_POLICY.md) | Academic Director; lawyer (consumer information) | EDU-02, EDU-03 |
| [Responsible AI](RESPONSIBLE_AI_POLICY.md) | AI-regulation specialist; data-protection specialist | AI-01 – AI-06 |
| [Data Retention Schedule](DATA_RETENTION_SCHEDULE.md) | Data-protection specialist; tax adviser (financial records) | GDPR-08 |
| [Record of Processing Activities](RECORD_OF_PROCESSING.md) | Data-protection specialist | GDPR-02 |
| [Processor Register](PROCESSOR_REGISTER.md) | Data-protection specialist | GDPR-06, GDPR-07 |
| [Information Security](INFORMATION_SECURITY_POLICY.md) | Security adviser recommended | SEC-01 |
| [Academic Integrity](ACADEMIC_INTEGRITY_POLICY.md) | Academic Director | EDU-01 |
| [Complaints and Contact](COMPLAINTS_PROCEDURE.md) | Consumer lawyer | CON-06 |

Operational procedures are in `docs/operations/` (backup and recovery, incident and breach response, monitoring).

---

# Reasonable Adjustments Policy

**Status:** Draft, 27 November 2026 · Owner: Academic Director · **[Requires review]** by the Academic Director; an accessibility adviser is recommended.

## Purpose
Every learner should be able to reach the programme's learning outcomes. Where a disability, health condition or temporary injury makes a task or an assessment harder, the Academy changes *how* the outcome is shown — not the standard itself.

## How to request
- Contact form topic **“Accessibility and adjustments”** **[Implemented]**, or tell a facilitator. Public statement: `/accessibility` **[Implemented]**.
- Learners describe what is difficult and what would help. No diagnosis or medical evidence is required for standard adjustments.
- Response within **five working days**; urgent requests before a live session are handled the same day where possible.

## Standard adjustments (no approval beyond the facilitator)
Seated delivery · written comprehension check · captions or a transcript instead of listening back · written recovery plan instead of a spoken pressure card · extra time for any step · breaks · camera off in group sessions.

## Adjustments needing Academic Director approval
Delivery with text-to-speech or another communication aid, and replacement of voice-dependent rubric criteria (W1 criteria 2, 3 and 5) by equivalent planning criteria (e.g. annotated pause and emphasis plan, slide design that protects critical numbers). The decision and the replacement criteria are recorded with the learner's agreement.

## Confidentiality and data
Information about a learner's needs is shared only with the staff who arrange the adjustment, is kept separately from assessment records, and is deleted with the learner's account. If a learner volunteers health information, it is treated as special-category data (GDPR Art. 9) on the basis of explicit consent; **[Requires review]** by the data-protection specialist.

## Assessment
An adjusted route leads to the same statuses (Workshop Completed, Competent). Certificates do not mention adjustments.

## Built into content **[Implemented]**
Every workshop must contain an “If you need an adjustment” section and facilitator guidance on adjustments; this is enforced automatically by `scripts/check-content-quality.ts`.

---

# Certificate and Assessment Policy

**Status:** Draft, 27 November 2026 · Owner: Academic Director · **[Requires review]** by the Academic Director and a consumer lawyer.

## 1. Two statuses for every workshop **[Implemented]**
| Status | Meaning | Set by |
|---|---|---|
| **Workshop Completed** | Readiness Check passed, all Practice Rounds logged, written Final Task submitted | The platform, when the requirements are met (`lesson_requirements`, `complete_lesson`) |
| **Competent** | The rubric standard is met (W1: Competent in at least 5 of 6 criteria, including criteria 2 and 4) | Only an instructor or assessor, in an MFA-verified session, after observing the performance live (`record_workshop_assessment`) |

Self-assessment is a learning tool. It is labelled as such everywhere in the platform, it is shown to assessors as context only, and it **never** sets the Competent status. Evidence: `tests/e2e/priority1.cjs` (self-ratings do not create a Competent status; learners cannot record or insert assessments; MFA required; self-assessment by staff refused).

## 2. Basis of assessment
Recordings are not uploaded before the Phase 4 privacy requirements are met. Assessors therefore observe the Round 3 performance **live** (facilitated workshop or coaching session) or watch the learner play their own recording during a live session. The basis is recorded with each assessment **[Implemented]**.

## 3. Assessor duties
Use the rubric descriptors and examples; record observable evidence; give written feedback with one strength and one priority; no assessment of accent; no assessment of oneself or of a close relative or direct report (declare conflicts of interest).

## 4. Reassessment and appeals
- Unlimited reassessment of a workshop after further practice. All assessments are kept and visible to the learner **[Implemented]**.
- **Appeal:** within 14 days of an assessment, through the contact form (topic “Complaint”). A different assessor reviews it within 14 days. The Academic Director decides final appeals. **[Requires review]**

## 5. Certificate of Completion
- Issued only when all published programme requirements are met and an authorised assessor approves the final assessment (Terms §9).
- Lists only instructor-confirmed Competent workshops as assessments **[Implemented in layout]**; self-assessed results never appear.
- Unique number and online verification showing only name, programme, date and status (Privacy Policy §9).
- Not a university qualification; no external accreditation or CME/CPD credit is claimed.
- May be revoked for misrepresentation or academic misconduct, after the learner has been heard.

## 6. AI
No AI is used in assessment today. If AI feedback is introduced, it remains advisory and never decides a status or a certificate (see Responsible AI Policy).

---

# Responsible AI Policy

**Status:** Draft, 27 November 2026 · Owner: Academy Owner · **[Requires review]** by an AI-regulation specialist and a data-protection specialist before any AI feature goes live. No AI system is in operation today.

This policy turns the AI governance requirements of the compliance audit (`docs/compliance/AUDIT_REPORT.md` §3) into binding rules for Phase 4.

## 1. Principles
1. **Disclosure.** Every AI teacher, simulated audience member and AI report is labelled as AI before and during the interaction (EU AI Act Art. 50). AI teachers are emblems, never human-like portraits.
2. **Observable behaviour only.** AI may describe rate, pauses, volume, pitch movement, intelligibility of specific words and numbers, structure, filler position, eye-line and visible gesture.
3. **Prohibited inferences.** No inference of emotions or intentions (EU AI Act Art. 5(1)(f), applicable since 2 February 2025), personality, psychological conditions, clinical competence, intelligence or ethnicity. “You sounded nervous” is prohibited; “your rate rose from 140 to 185 wpm after the interruption” is permitted.
4. **No accent penalty.**
5. **Advisory only.** AI never sets Workshop Completed, Competent or a certificate. A human decides, and the learner can request a human-only review.
6. **Transparent limits** shown with every report.
7. **Fictional scenarios only;** no patient data.

## 2. Data
Separate recording consent; minimisation (audio by default); EU storage; retention per the Retention Schedule; deletion on request; **no training** of any model on learner data by the Academy or its providers; no voice or face identification; access only by the learner and assigned staff with MFA; all access logged.

## 3. Before go-live (gate for Phase 4)
DPIA completed · AI Act classification documented (Annex III point 3 and Art. 6(3)) · provider vs deployer role decided · provider settings verified (no training, retention) · staff AI-literacy training recorded (Art. 4) · automated acceptance tests from the audit §3.4 passing.

## 4. Oversight
Assessors can override or discard AI feedback (logged). Each cohort, a sample of AI reports is reviewed for accuracy and prohibited inferences; findings go to the Compliance Register.

---

# Data Retention Schedule (proposal)

**Status:** Proposal, 27 November 2026 · **[Requires review]** by a data-protection specialist (periods) and a tax adviser (financial records). Periods below are proposals, not decisions. Automated deletion is **not yet implemented**; it will be built once the periods are approved. Register: GDPR-08.

| Data | Proposed period | Basis for the period | Deletion method |
|---|---|---|---|
| Account and profile | Enrolment + 24 months of inactivity, or on request | Contract; learner access to records | Account deletion (cascades through all learner tables via foreign keys) |
| Learning records (progress, quizzes, Final Tasks, workshop logs) | As account | Contract | Cascade |
| Instructor assessments | As account; certificate verification record kept longer | Contract; certificate verification | Cascade; verification record kept separately |
| Certificate verification record (name, programme, date, number, status) | 10 years | Legitimate interest of holders and third parties in verification | Scheduled job |
| Consent history | Duration of account + 3 years | Proof of consent (GDPR Art. 7(1)); limitation periods | Scheduled job |
| Audit log | 24 months | Security, legitimate interests | Scheduled job |
| Rate-limit counters (hashed) | 2 days | Abuse prevention | **[Implemented]** automatic clean-up in `rate_limit_hit` |
| Contact-form messages (email inbox) | 24 months after last contact | Responding to enquiries; complaints | Manual review quarterly |
| Invoices and payment records | As required by Polish tax law (generally 5 years from the end of the tax year) | Legal obligation | **[Requires review]** by tax adviser |
| Backups | 35 days rolling | Recovery | Provider/automatic |
| Recordings (Phase 4) | Raw recordings 90 days after cohort end or on request; transcripts and feedback as learning records | To be fixed in the DPIA | To be implemented with Phase 4 |

---

# Record of Processing Activities (GDPR Art. 30) — draft

**Status:** Draft, 27 November 2026 · Controller: [legal entity name, address, contact] · **[Requires review]** by a data-protection specialist. Must be kept up to date and made available to the supervisory authority on request. Register: GDPR-02.

| # | Purpose | Data subjects | Data categories | Legal basis (proposed) | Recipients / processors | Third-country transfer | Retention | Security measures |
|---|---|---|---|---|---|---|---|---|
| 1 | Account and authentication | Applicants, learners, staff | Name, title, email, country, specialty, password hash, MFA factor | Contract (6(1)(b)); legitimate interest for security (6(1)(f)) | Supabase (hosting, auth) | Per Processor Register | Retention Schedule | RLS, MFA for staff, hashed passwords, TLS |
| 2 | Delivering the programme | Learners | Progress, quiz answers, Final Tasks, workshop logs, self-assessments | Contract | Supabase; Vercel (hosting) | Per register | Retention Schedule | RLS, per-user filtering, audit log |
| 3 | Instructor assessment and certification | Learners, staff | Assessment levels, feedback, assessor identity, certificate data | Contract; legitimate interest (verification) | Supabase | Per register | Retention Schedule | MFA-only assessment, audit log |
| 4 | Consent management and marketing | Learners | Consent records, email | Consent (6(1)(a)); legal obligation (proof) | Supabase; email provider (future) | Per register | Retention Schedule | Append-only history |
| 5 | Enquiries and complaints | Public, learners | Name, email, message | Legitimate interest / steps prior to contract | Email provider (Resend, planned) | Per register | 24 months | Rate limiting, honeypot |
| 6 | Security and abuse prevention | All users | Audit events, hashed network-address keys, error events without personal data | Legitimate interest | Supabase; hosting logs | Per register | 2 days – 24 months | Minimised by design |
| 7 | Payments and invoicing (Stage 7) | Buyers | Name, address, VAT number, order and payment status | Contract; legal obligation (6(1)(c)) | Stripe (partly independent controller) | Per register | Tax law | Hosted checkout, no card data stored |
| 8 | Reasonable adjustments | Learners | Description of needs; possibly health data | Explicit consent (9(2)(a)) **[Requires review]** | Internal only | None | As account | Restricted access |
| 9 | AI practice and recordings (Phase 4, not active) | Learners | Voice/video, transcripts, AI feedback | To be decided in DPIA | AI providers (to be selected) | To be decided | To be decided | See Responsible AI Policy |

---

# Processor Register

**Status:** Draft, 27 November 2026 · **[Requires review]** by a data-protection specialist. No production provider has been contracted yet; every row below is **planned**. Register: GDPR-06, GDPR-07.

| Provider | Service | Role | Data | Region to select | DPA | Transfer mechanism | Training on customer data | Status |
|---|---|---|---|---|---|---|---|---|
| Supabase | Database, authentication | Processor | All platform data | EU (e.g. Frankfurt) | Supabase DPA — accept and file | Verify: sub-processors outside the EU; SCCs / Data Privacy Framework | Not applicable | Planned |
| Vercel | Hosting, edge network, logs | Processor | Request metadata, server logs | EU functions region | Vercel DPA | DPF certification / SCCs — verify | Not applicable | Planned |
| Resend (or EU alternative) | Transactional email, contact form | Processor | Names, emails, messages | EU if available | Provider DPA | Verify | Not applicable | Planned |
| Stripe | Payments | Processor and independent controller | Payer details, payment status | EU entity (Stripe Payments Europe) | Stripe DSA/DPA | SCCs | Not applicable | Stage 7 |
| AI providers (speech-to-text, TTS, language model) | AI practice | Processor | Recordings, transcripts, messages | EU / zero-retention options | Provider DPA | To be assessed (TIA) | **Must be contractually excluded** | Phase 4, not selected |
| Monitoring service | Error alerts | Processor | Error events without personal data | EU | Provider DPA | Verify | Not applicable | Optional |

For each provider, before go-live: accept the DPA, record the sub-processor list, choose the region, confirm the transfer mechanism, and record settings (retention, training opt-out).

---

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

---

# Academic Integrity Policy

**Status:** Draft, 27 November 2026 · Owner: Academic Director · **[Requires review]** by the Academic Director.

1. **Own work.** Final Tasks, logs and self-assessments must be the learner's own work and describe their own performance.
2. **AI tools.** Learners may use AI tools to check language, provided they say so at the end of the Final Task (“Language checked with [tool]”). Submitting AI-generated analysis as one's own, or describing a performance that did not take place, is misconduct.
3. **Honest measurement.** Measure the first take of each round; do not invent comprehension-check results.
4. **Confidentiality.** No identifiable patient information, no confidential institutional data, no recordings of others without consent.
5. **Sources.** Quote and cite sources used in presentations; respect copyright in slides and images.
6. **Process.** Suspected misconduct is discussed with the learner first; the Academic Director decides on outcomes (resubmission, withdrawal of an assessment, revocation of a certificate) after the learner has been heard; appeals as in the Certificate and Assessment Policy.

---

# Complaints and Contact Procedure

**Status:** Draft, 27 November 2026 · **[Requires review]** by a consumer lawyer (Polish Consumer Rights Act; Act on Providing Services by Electronic Means). Contact details in brackets to be completed. Register: CON-06.

1. **How to complain.** Contact form, topic **“Complaint”** **[Implemented]**, or by email to [complaints email] or post to [registered address]. Include your name, email used for your account, what happened and what you would like us to do.
2. **Acknowledgement** within 3 working days.
3. **Response** in writing within **14 days** of receipt [period to be confirmed by legal review]. If we do not respond in time, the complaint is treated as accepted where the law so provides [to be confirmed].
4. **Who handles it.** Student Support, with escalation to the Academic Director (teaching and assessment) or the Academy Owner (contract, payments, data protection).
5. **Assessment appeals** follow the Certificate and Assessment Policy.
6. **Data protection complaints** may also be made to the President of UODO; **consumer disputes** may be referred to out-of-court bodies [details to be confirmed].
7. **Records.** Complaints are logged (date, topic, outcome, time to respond) and reviewed quarterly for improvements.

---

# Backup and Recovery Procedure

**Status:** Technical procedure, implemented and tested locally on 27 November 2026. Production configuration pending (hosted Supabase project not yet connected). Register: SEC-04.

## 1. What must be recoverable

| Data | Where | Criticality |
|---|---|---|
| Accounts, profiles, roles, consents, audit log | Supabase Postgres (`auth`, `public`) | Critical |
| Learning records: progress, quiz attempts, Final Tasks, workshop logs, instructor assessments | Supabase Postgres (`public`) | Critical |
| Curriculum content | Git repository (source of truth) → generated migration | Recoverable from Git |
| Learning materials (PDFs) | Git repository (`public/materials`) | Recoverable from Git |
| Recordings | **Not stored** (stay on learners' devices) | Not applicable until Phase 4 |

## 2. Targets (proposed, to be confirmed by the Academy Owner)

- **Recovery Point Objective (RPO):** at most 24 hours of data loss; 5 minutes once point-in-time recovery is enabled.
- **Recovery Time Objective (RTO):** service restored within 8 hours.

## 3. Production configuration (to do when the hosted project is created)

1. Use a Supabase plan with **daily automated backups**; enable **Point-in-Time Recovery** before real learner data is stored.
2. Choose an **EU region** for the project.
3. In addition to provider backups, run `scripts/ops/backup-restore-test.sh` **weekly** from a trusted machine against production (`DB_CONTAINER= DB_URL=…`) and store the encrypted dump in a separate EU storage location with 35-day retention. Never store dumps in the repository (`backups/` is git-ignored).
4. Protect dumps: encryption at rest, access limited to the Academy Owner and technical lead, deletion after the retention period (dumps contain personal data and are covered by the Retention Schedule).

## 4. Restore test (quarterly, and after any major migration)

`bash scripts/ops/backup-restore-test.sh` performs the full cycle automatically:

1. Logical backup (`pg_dump`, custom format) of `public` and `auth`.
2. Restore into a throwaway database.
3. Row-count comparison of every public table.
4. Clean-up; PASS/FAIL report.

Record each run (date, operator, result) in the evidence folder. The first run: `docs/compliance/evidence/backup-restore-2026-11-27.txt` — **PASS**, 17 tables verified.

## 5. Recovery procedure

1. Declare an incident (see `INCIDENT_RESPONSE.md`) and appoint an incident lead.
2. Put the platform into maintenance mode (hosting dashboard) to prevent new writes.
3. Choose the restore point (PITR timestamp or latest verified dump).
4. Restore to a **new** database first; run the RLS tests (`npm run test:rls:supabase`) and the security suites against it.
5. Switch the application to the restored database; verify sign-in, curriculum and a sample learner record.
6. Inform affected learners if data was lost; document the incident and lessons learned.

---

# Incident and Personal Data Breach Response Procedure

**Status:** Draft operational procedure, 27 November 2026. **Requires review by a data protection specialist** (GDPR Arts. 33–34) before launch. Contact details in square brackets must be completed. Register: GDPR-09, SEC-11.

## 1. Scope

Any event that affects, or may affect, the confidentiality, integrity or availability of the platform or of personal data: unauthorised access, leaked credentials, data sent to the wrong person, lost device with learner data, ransomware, prolonged outage, vulnerability reported by a third party, a processor's breach notification.

## 2. Roles

| Role | Person | Responsibility |
|---|---|---|
| Incident lead | [Academy Owner] | Decisions, notifications, communication |
| Technical lead | [name] | Containment, investigation, recovery |
| Privacy adviser | [external DPO / adviser] | Risk assessment, notification wording |
| Communications | [name] | Learner and partner messages |

Contact list (phone, email, out-of-hours): [to be completed and kept outside the repository].

## 3. Severity

- **S1 Critical:** confirmed access to learner data by an unauthorised party; service compromise; leaked service credentials.
- **S2 High:** suspected breach under investigation; staff account compromise; outage longer than 4 hours.
- **S3 Medium:** vulnerability without evidence of exploitation; misdirected email with limited data.
- **S4 Low:** no personal data involved.

## 4. Steps and timings

1. **Detect and record (immediately).** Open an entry in the Breach and Incident Register (section 6) with the time of awareness. The 72-hour clock under GDPR Art. 33 starts when the Academy becomes *aware* of a personal data breach.
2. **Contain (within hours).** Revoke sessions (`auth.sessions`), rotate keys (Supabase publishable/secret keys, email and AI provider keys, `RATE_LIMIT_SALT`), remove a compromised staff role, disable affected features, preserve logs (audit log, hosting logs).
3. **Assess risk (within 24 hours).** Which data, how many people, special categories (e.g. health), likely consequences. Use the privacy adviser.
4. **Notify the supervisory authority (within 72 hours of awareness)** unless the breach is unlikely to result in a risk to individuals: President of UODO (Poland) via the online form. If information is incomplete, notify in phases and explain the delay.
5. **Notify learners (without undue delay)** where the risk is high: clear language, what happened, likely consequences, measures taken, what they can do, contact point.
6. **Notify partners** (institutional clients, processors) where contracts require it.
7. **Recover** (see `BACKUP_AND_RECOVERY.md`) and verify with the security test suites.
8. **Review (within 2 weeks).** Root cause, corrective actions added to the Compliance Register, update of this procedure.

## 5. Processor breaches

Processors (Supabase, Vercel, email and AI providers) must notify the Academy without undue delay under their DPAs. Treat their notice as step 1 above.

## 6. Breach and Incident Register (mandatory, GDPR Art. 33(5))

Kept outside the repository, access-restricted. For every personal data breach — including those **not** notified — record: date and time of awareness; description; categories and approximate number of people and records; consequences; measures taken; whether notified (authority, individuals) and when; reasons for not notifying.

## 7. Exercises

A tabletop exercise (scenario: compromised instructor account) before launch, then once a year. Record participants and findings.

---

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
