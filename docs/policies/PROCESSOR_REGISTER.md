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
