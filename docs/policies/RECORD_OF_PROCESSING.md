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
