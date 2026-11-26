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
