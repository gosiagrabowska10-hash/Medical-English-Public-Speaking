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
