# Compliance and Quality Audit

**The Medical Speaking Academy · Audit date: 26 November 2026 · Scope: the whole platform as built (Stages 1–3, Workshop I package) and the planned Phase 4 (AI simulations and recordings) and Stage 7 (payments)**

> **Status of this document.** This is an internal compliance assessment prepared during development. It is **not legal advice** and it does not certify compliance. Wherever a conclusion depends on legal interpretation, it is marked **⚖ Specialist review** and listed in Section 8. Statements of law reflect the position as understood on the audit date; several EU instruments are being amended, and dates must be re-verified before launch.

Companion documents:

- `COMPLIANCE_REGISTER.md` / `.csv` — the central register (61 requirements), generated from `register.json`.
- `W1_QUALITY_GATE.md` — the quality gate for Workshop I, required before Workshops II–VI.
- `evidence/axe-2026-11-26.json` — raw output of the automated accessibility audit.

## Contents

1. Method and assumptions
2. Legal and regulatory applicability
3. AI simulations and learner privacy: governance requirements
4. Accessibility audit
5. Educational quality framework
6. Technical and operational security audit
7. Legal documents checklist
8. Items for specialist review
9. Prioritised corrective actions (for approval)

---

## 1. Method and assumptions

**Evidence collected for this audit (26 November 2026):**

| Check | Tool / method | Result |
|---|---|---|
| Automated accessibility | axe-core 4 (WCAG 2.0–2.2 A/AA rules) via Playwright over 33 views: 19 public pages, cookie banner, 9 signed-in pages, 4 Workshop I tabs | 219 failing nodes in 3 rule groups (Section 4) |
| Responsive layout | Playwright at 390, 820, 1280 and 1440 px | One defect found and fixed (workshop tabs overlapped by the course sidebar at 1280 px) |
| Database access control | `pg_class.relrowsecurity`, grants, 33 RLS SQL tests, 33 course-security and 23 API-security tests | RLS on 15/15 tables; anonymous role can only read the public syllabus |
| Dependencies | `npm audit` (production and all), licence scan of the production tree | 0 vulnerabilities; licence obligations noted (Section 6) |
| HTTP headers | `curl -I` against the production build | No security headers; framework banner exposed |
| Abuse resistance | 20 rapid POSTs to `/api/contact` | All processed; no rate limit |
| PDFs | `pdfinfo` on handouts and Workshop Pack | Untagged |
| Content | Manual review of all public pages, W1 package and six authored lessons | Section 5 and the W1 Quality Gate |

**Assumptions to be confirmed by the Academy** (each changes the analysis if wrong):

1. The operator is established in **Poland** (prices in PLN). Its legal form (sole trader, company) is not yet known.
2. Learners are **adults** — qualified doctors and doctors in training.
3. Buyers are **both consumers and professionals** (some doctors buy personally, some employers or sole-practice doctors buy for professional purposes).
4. Sales are **EU-wide and international** (UK, Switzerland and other countries).
5. Phase 4 will use **third-party AI providers** (speech-to-text, text-to-speech, language models), some established in the US.
6. Hosting on **Supabase and Vercel**; payments via **Stripe**; a transactional email provider (e.g. Resend).
7. The Academy is currently a **microenterprise** (fewer than 10 people and annual turnover or balance sheet ≤ EUR 2 million).

**What “compliant” means in this audit.** A requirement is marked “Compliant — verified with evidence” only where the control exists in the code or documentation *and* evidence of it is recorded. A passing test or the existence of a draft policy is not, on its own, treated as compliance.

---

## 2. Legal and regulatory applicability

Each regime below is assessed separately. The conclusion states **why** it applies, applies conditionally or does not apply.

### 2.1 GDPR and Polish data-protection law — **Applies**

*Sources:* Regulation (EU) 2016/679 (GDPR); Polish Personal Data Protection Act of 10 May 2018; supervisory authority: President of UODO.

**Why it applies.** The Academy is established in the EU and processes personal data of identifiable learners: account and profile data, consent records, learning progress, quiz and assignment content, practice logs, contact-form messages, and — from Phase 4 — voice and video recordings and AI-generated feedback.

**Key conclusions.**

| Topic | Finding |
|---|---|
| Controller | The Academy will be the controller. Its legal identity and contact details are still placeholders in the Privacy Policy. |
| Lawful bases | Contract (Art. 6(1)(b)) for delivering the programme; legal obligation (6(1)(c)) for invoices and tax records; legitimate interests (6(1)(f)) for security logs; **consent (6(1)(a))** for marketing and for optional recording-based features. ⚖ The choice between contract and consent for recordings that are integral to assessment needs specialist review. |
| Records of processing (Art. 30) | **Required.** The exemption for organisations under 250 employees does not apply because processing is regular, not occasional. Not yet written. |
| DPIA (Art. 35) | **Likely required before Phase 4.** AI evaluation of individuals, voice and video recording and innovative technology together meet several criteria on the UODO list of operations requiring a DPIA. ⚖ |
| DPO (Art. 37) | **Probably not mandatory**: the core activity is not large-scale monitoring or large-scale special-category processing. The decision and reasoning must be documented. ⚖ |
| Special categories (Art. 9) | Recordings are **not biometric data** as long as they are not processed to identify a person (Art. 4(14)). The platform must never use voiceprints or face recognition. Health data is not collected, but learners may volunteer it (e.g. anxiety, a stammer) in free text; guidance is needed at input points. |
| Patient data | Learners are doctors who hold patient data as controllers in their own right. The Terms, Privacy Policy, FAQ and every exercise prohibit identifiable patient information; all examples are fictional. A removal procedure for reported content is still needed. |
| Processors (Art. 28) | DPAs needed with Supabase, Vercel, the email provider, AI providers and any analytics provider. Stripe acts partly as an independent controller (fraud and regulatory obligations). |
| Transfers (Chapter V) | US providers need the EU–US Data Privacy Framework (if the provider is certified) or Standard Contractual Clauses plus a transfer impact assessment. EU data regions should be chosen where available. ⚖ |
| Rights | Self-service export and deletion request exist (tested). The export does not yet include learning records; there is no staff workflow to complete deletion requests within one month. |
| Automated decisions (Art. 22) | None exist. The approved rule that certificates need human approval must be kept when AI is introduced. |
| Breach notification (Arts. 33–34) | No procedure. 72-hour notification to UODO must be operationally possible. |
| Retention | Periods are placeholders; no automated deletion. |

### 2.2 EU Artificial Intelligence Act — **Applies to Phase 4; partly already relevant**

*Source:* Regulation (EU) 2024/1689. ⚖ The Commission's “digital omnibus” proposals (November 2025) would postpone parts of the high-risk regime; their adoption status and final dates must be verified before Phase 4.

**Current platform:** no AI system is in operation. The analysis governs the design of Phase 4.

| Provision | Applicability | Reasoning |
|---|---|---|
| **Art. 5(1)(f) — prohibition of emotion recognition in education** (applies since 2 Feb 2025) | **Applies as a design constraint** | The Academy is an education and training provider. Any system that infers learners' emotions or intentions (e.g. “nervousness”, “anxiety”, “confidence” detected from face or voice) is prohibited, except for medical or safety reasons. AI feedback must therefore describe **observable behaviour** (pauses, rate, volume, eye-line, wording) — never inferred inner states. ⚖ Confirm that a private online academy falls within “education institutions”; the Academy should assume it does. |
| **Art. 6 and Annex III point 3 — high-risk education systems** | **Conditional** | AI that *evaluates learning outcomes* or *steers the learning process* in education and vocational training is high-risk. If AI scores determine completion, assessment or certification, the Academy (as provider or deployer) would face Chapter III obligations (risk management, data governance, logging, human oversight, conformity assessment). The Art. 6(3) derogation may apply if AI only performs a narrow preparatory task and a human makes the assessment. **Recommended design:** AI feedback is formative and advisory only; completion and certification decisions are human. ⚖ Formal classification is required before Phase 4. |
| **Art. 50 — transparency** (applies from 2 Aug 2026) | **Applies once AI teachers or simulated audiences are live** | Learners must be told they are interacting with an AI system, and AI-generated audio (synthetic voices of simulated audience members) must be marked as artificially generated in a machine-readable way where the Academy is the provider. |
| **Art. 4 — AI literacy** (applies since 2 Feb 2025) | **Applies to staff once AI is deployed** | Instructors and assessors who interpret AI feedback need documented AI-literacy training. |
| Provider or deployer | ⚖ To be determined | If the Academy builds its own AI feedback system on top of a general-purpose model and places it on the market under its own name, it may be a **provider**; if it only uses a third-party system as intended, a **deployer**. This affects which obligations apply. |
| General-purpose AI model obligations | **Not applicable** to the Academy | They fall on model providers (e.g. OpenAI), not on downstream users. |

### 2.3 ePrivacy and cookies — **Applies**

*Sources:* Directive 2002/58/EC Art. 5(3); Polish Electronic Communications Law (*Prawo komunikacji elektronicznej*), in force since 10 November 2024.

Storing or reading information on a user's device requires consent unless strictly necessary. **Current state:** only strictly necessary storage is used (authentication cookies; the consent choice itself in `localStorage`); no analytics are loaded; the banner offers “Necessary only” and “Accept all” with equal prominence and can be reopened. **Gaps:** the Cookie Policy is a draft; any future analytics or video embed (e.g. a third-party player) must be consent-gated. The consent choice is not recorded server-side, which is acceptable for necessary-only storage but should be reconsidered if analytics are introduced.

### 2.4 Electronic marketing — **Applies if newsletters are sent**

*Sources:* Polish Electronic Communications Law (prior consent for direct marketing by electronic means); GDPR Art. 7.

The platform collects a separate, optional, off-by-default marketing consent with a history record. No sending system exists yet. Before any newsletter: unsubscribe link in every message, suppression list, and consideration of double opt-in as evidence of consent.

### 2.5 Consumer protection and distance selling — **Applies to sales to consumers**

*Sources:* Directive 2011/83/EU (Consumer Rights) as amended by Directive (EU) 2019/2161 (Omnibus); Polish Consumer Rights Act of 30 May 2014; Directive 2005/29/EC (unfair commercial practices) and the Polish Act on counteracting unfair market practices.

| Topic | Finding |
|---|---|
| Pre-contract information | Identity, address, price including taxes, main characteristics, duration, withdrawal right and complaint procedure must be given before purchase. The pricing page provides price and inclusions; identity and withdrawal information are missing. |
| Order button | Must state an obligation to pay (e.g. “Order with obligation to pay”). To be built in Stage 7. |
| **Right of withdrawal** | 14 days. For digital content and digital services, the consumer can lose the right only if they **expressly consent** to immediate performance and **acknowledge** the loss, and the Academy confirms this on a durable medium. The programme mixes digital content (lessons, PDFs), a digital service (platform, AI practice) and possibly live sessions. ⚖ Requires a specific legal structure. |
| Sole traders | Polish law extends some consumer protections to natural persons running a business when the contract is **not of a professional nature** for them (checked against their registered activity). Whether a doctor in private practice buying a communication course is protected is fact-specific. ⚖ |
| Fair practices | No testimonials, statistics, accreditation, CME/CPD or endorsement claims are made; the certificate is described as a certificate of completion only. Any future discount must show the lowest price of the previous 30 days (Omnibus). ⚖ Confirm application of the price-indication rules to a service. |
| Terms of service | The Polish Act on Providing Services by Electronic Means (2002) requires published terms (*regulamin*) for electronic services, including technical requirements, prohibited content and a complaints procedure. A draft exists. |
| Geo-blocking | Regulation (EU) 2018/302 may restrict differential treatment of customers from other Member States; localised pricing in Stage 7 must be checked. ⚖ |

### 2.6 Digital content and online services — **Applies**

*Sources:* Directive (EU) 2019/770, implemented in the Polish Consumer Rights Act from 1 January 2023; Digital Services Act (Regulation (EU) 2022/2065).

The Academy must supply digital content and services in conformity with the contract, provide updates needed to keep them in conformity, and offer remedies. The Terms do not yet cover this. **DSA:** learner submissions are stored at learners' request (hosting) but are not disseminated to the public, so the Academy is probably not an online platform; basic hosting-provider duties (points of contact, notice-and-action) may still apply. ⚖

### 2.7 Accessibility law, including the European Accessibility Act — **Conditional**

*Sources:* Directive (EU) 2019/882 (EAA), applicable since 28 June 2025; Polish Act of 26 April 2024 on ensuring compliance of certain products and services with accessibility requirements; EN 301 549; WCAG 2.2.

The EAA covers e-commerce services, which would include the online purchase of the programme. **Microenterprises providing services are exempt.** If the Academy remains a microenterprise it is probably exempt; if it grows beyond that threshold, the purchase flow and related services must meet the requirements and an accessibility statement is required. ⚖ Confirm scope and size. The Polish act on digital accessibility of public bodies does not apply (the Academy is not a public entity). **Regardless of legal obligation, the Academy has adopted WCAG 2.2 AA as its target** — see Section 4.

### 2.8 Intellectual property, copyright, image and video rights — **Applies**

*Sources:* Polish Act on Copyright and Related Rights of 4 February 1994; licence terms of third-party components.

| Topic | Finding |
|---|---|
| Course content | Original works of the Academy. Ownership depends on who wrote it: works by employees vest in the employer in the scope of employment; works by contractors require a **written** transfer or licence specifying the fields of exploitation. ⚖ Contracts needed for all authors, reviewers and instructors. |
| Instructor video and image | Distributing a person's image requires their consent (Art. 81 of the Copyright Act). Written releases are needed before any recording. No recordings exist yet. |
| Academic sources | Content cites research by reference; no figures, tables or long passages are reproduced. Short quotation is permitted within the quotation right with attribution. |
| Dictionary pronunciation data | IPA transcriptions were verified against Cambridge and Oxford dictionaries and re-written in the Academy's own notation; no dictionary content or audio is copied. |
| Fonts and icons | Cormorant Garamond and Inter: SIL Open Font License 1.1; Lucide icons: ISC. Both permit commercial use. |
| Open-source software | 102 MIT, 7 Apache-2.0, 3 ISC, 2 0BSD, 1 BSD-3-Clause packages in the production tree. **LGPL-3.0-or-later**: `@img/sharp-libvips` (dynamically linked image library used by `next/image`) — permitted; keep notices and do not modify. **CC-BY-4.0**: `caniuse-lite` data — attribution required. A third-party notices page is recommended. |
| Learner content | Learners keep ownership of their submissions; the Academy needs a limited licence to process them for teaching and assessment (draft in Terms). ⚖ |
| AI-generated content | Content generated by AI in Phase 4 may not be protected by copyright; provider terms on output ownership must be checked. |

### 2.9 International sales outside the EU — **Conditional, market by market**

| Jurisdiction | Assessment |
|---|---|
| United Kingdom | UK GDPR and the Data Protection Act 2018 apply if the Academy offers services to people in the UK (Art. 3(2)). An **Art. 27 UK representative** may be required. UK consumer law (Consumer Contracts Regulations 2013) applies to UK consumers. UK VAT registration is required for digital services to UK consumers from the first sale. ⚖ |
| Switzerland | The revised Federal Act on Data Protection (FADP) applies when targeting Swiss residents; a Swiss representative may be required. ⚖ |
| United States | Most state privacy laws have revenue or volume thresholds unlikely to be met by the Academy at launch; this must be re-checked as the business grows. |
| Other countries | Review before targeted marketing. |

### 2.10 Tax — **Applies** (outside the strict scope of this audit but blocks Stage 7)

*Sources:* Council Directive 2006/112/EC; Polish VAT Act.

The VAT treatment of a mixed programme (electronically supplied services; education; live or virtual events whose place-of-supply rules changed on 1 January 2025) determines the VAT rate and the country of taxation. Cross-border B2C sales will likely use the One-Stop Shop (OSS). Polish mandatory e-invoicing (KSeF) is being phased in from 2026. ⚖ **Tax adviser opinion required before payments are taken.**

### 2.11 Regimes assessed as not applicable

| Regime | Reason | Re-assess if |
|---|---|---|
| Medical Device Regulation (EU) 2017/745 | The software's intended purpose is communication education; it does not diagnose, monitor, predict or treat. | Any feature processes patient data or supports clinical decisions. |
| Accreditation and CME/CPD rules | The Academy makes no accreditation or CME/CPD claims. | Accreditation is pursued; claims then require the accrediting body's written approval. |
| Rules on professional qualifications | The certificate is a certificate of completion and confers no professional qualification or language certification. | The Academy issues anything presented as a language qualification. |
| Children's data rules | Adults only. | — |
| PCI DSS (direct) | Card data will be handled entirely by Stripe Checkout. | Card fields are ever embedded in Academy pages. |

---

## 3. AI simulations and learner privacy: governance requirements

These requirements are **binding design rules for Phase 4**. None of them is implemented yet, because Phase 4 has not started. They are recorded so that Phase 4 can be accepted or rejected against them.

### 3.1 Principles

1. **Disclosure.** Every AI teacher, simulated audience member or AI feedback report is clearly labelled as AI, before and during the interaction. AI teachers remain gold emblems, never human-like portraits or names that imply a real person.
2. **Observable behaviour only.** AI feedback may describe *what can be observed and measured*: speaking rate, pause placement and length, volume relative to the room, pitch movement on key words, intelligibility of numbers and terms, filler frequency and position, structure of the message, eye-line toward the camera, posture and gesture visible in video, and the effect on a simulated listener's comprehension.
3. **Prohibited inferences.** The AI must not infer or report emotions (nervousness, anxiety, confidence, enthusiasm), personality, psychological conditions, intelligence, clinical competence, medical knowledge, honesty, or nationality or ethnicity from accent. Wording such as “you sounded nervous” is prohibited; “your rate rose from 140 to 185 wpm after the interruption” is permitted.
4. **No accent penalty.** Accent is never scored. Pronunciation feedback addresses intelligibility of specific words only.
5. **Formative, not decisive.** AI feedback never determines completion, grades or certificates. A named human assessor makes every assessment decision, and the learner can see and challenge it.
6. **Transparent limits.** Every AI report carries a limitation notice: what the system can and cannot assess, typical error sources (microphone, room noise, accents underrepresented in training data) and how to request human review.
7. **Fictional scenarios only.** All simulation scenarios are fictional and composite. The platform never asks for, and warns against, real patient data, colleagues' names or identifiable cases.

### 3.2 Data rules for recordings

| Rule | Requirement |
|---|---|
| Consent | Separate, specific, informed recording consent before the first recording, withdrawable at any time, recorded with version and timestamp (the `consents` table already supports this). Learners who decline must have an alternative route (Section 4.4). |
| Minimisation | Audio-only by default; video only for presence exercises and only when the learner chooses. No background capture; recording starts and stops only on the learner's action. |
| Storage | Private storage bucket; access only by the learner and the assigned assessor (row-level policies); short-lived signed URLs; encryption at rest by the provider; EU region. |
| Retention | Default proposal (⚖ to be confirmed in the DPIA): raw recordings deleted 90 days after the end of the cohort or on request; transcripts and feedback kept for the duration of enrolment plus 12 months; certificates and their verification record kept longer. Automated deletion jobs with logs. |
| Deletion | Learner can delete any recording at any time; deletion propagates to processors within their stated periods. |
| No training | Recordings, transcripts and conversations are not used to train or improve AI models — by the Academy or by providers. Providers are selected and configured accordingly (zero or limited data retention, training opt-out), and this is documented in the processor register. Any future research use requires a separate legal basis, explicit consent and ethics review. |
| No identification | Voice and face are never used to identify or authenticate learners (this keeps recordings outside the definition of biometric data). |
| Access control | Instructors see only learners in their assigned cohorts; every access to a recording is logged in the audit log. |
| Sharing | No recording leaves the platform without the learner's explicit action. |

### 3.3 Human oversight

- Assessors receive AI-literacy training (Art. 4 AI Act) covering limitations, bias and the prohibition on emotion inference.
- Assessors can override, annotate or discard AI feedback; overrides are logged.
- A sample of AI reports is reviewed each cohort for accuracy and for prohibited inferences; findings are recorded.
- A learner can request a human-only review of any AI report.

### 3.4 Acceptance tests for Phase 4 (to be automated)

1. No AI output contains terms from a prohibited-inference list (e.g. *nervous, anxious, confident, stressed, personality*) — checked against a test set of transcripts.
2. Every AI interaction screen shows the AI disclosure.
3. A learner without recording consent cannot start a recording, and can still complete the module through the alternative route.
4. Another learner, an unassigned instructor and an anonymous user cannot access a recording (RLS and signed-URL tests).
5. Deleting a recording removes the object and its metadata; retention jobs delete expired objects.
6. Completion and certificates cannot be granted by AI output alone.

---

## 4. Accessibility audit

**Target:** WCAG 2.2 Level AA across the website, the learning platform and all downloadable materials.

### 4.1 Automated audit results (axe-core, 33 views)

| Rule (WCAG SC) | Impact | Nodes | Pages | Cause | Proposed correction |
|---|---|---|---|---|---|
| `color-contrast` (1.4.3) | Serious | 186 | 18 | (a) Subtle grey text `#6b7280` on ivory: 4.40:1, and 4.32:1 on `#f5f2ec` (minimum 4.5:1). (b) Large gold numerals `#b69a68` on ivory: 2.44:1, on white 2.68:1 (minimum 3:1 for large text). (c) Ivory at 40 % opacity on navy: 3.41:1. | (a) `#646b77` → 4.89:1. (b) Darker gold `#9e8356` for text on light backgrounds → 3.28:1 on ivory, 3.60:1 on white; keep `#b69a68` for lines, borders and on dark backgrounds (6.42:1 on midnight). (c) `#959dab` → 5.46:1. **These change approved brand colours and need your decision.** |
| `label-content-name-mismatch` (2.5.3) | Serious | 32 | 32 | The logo link's accessible name “The Medical Speaking Academy — home” does not start with the visible text, because the two visible lines are adjacent spans with no space (“The Medical SpeakingAcademy”). Speech-input users saying “click The Medical Speaking Academy” may fail. | Add a space between the spans and drop the custom `aria-label` (or make it begin with the visible text). |
| `scrollable-region-focusable` (2.1.1) | Serious | 1 | 1 | The W1 progress comparison table scrolls horizontally on narrow screens but cannot be reached by keyboard. | `tabIndex={0}`, `role="region"` and an `aria-label` on the scroll container. |

**Passed checks of note:** the first keyboard Tab stop on every page is the “Skip to content” link; landmarks, headings, form labels, image alternatives, dialog semantics and language attribute (`en-GB`) produced no violations.

**Limits of automated testing.** Automated tools find roughly a third of WCAG issues. No manual screen-reader test (NVDA, JAWS, VoiceOver), zoom/reflow test at 400 %, or test with speech input has been done. **These must be done before the platform is declared WCAG 2.2 AA.**

### 4.2 Keyboard and responsive behaviour

- Navigation menu, cookie banner, dialogs, tabs and forms are built on Radix primitives, which provide keyboard support; this is only partly covered by automated tests (skip link, first Tab stop) and must be confirmed manually.
- **Fixed during this audit:** at 1280 px the course sidebar overlapped the workshop tabs and intercepted clicks. The tab list now wraps below the 2xl breakpoint. Tests now cover 1280 px.
- The pressure-card timer in Practice Round 3 reveals a card at a random time; it is under the learner's control (start, repeat), so SC 2.2.1 (Timing adjustable) is met. To confirm in manual testing.

### 4.3 Media and documents

| Item | Status |
|---|---|
| Video captions | The player supports WebVTT captions (tested with the sample video). Instructor videos are not yet recorded; **captions must be a publication requirement**. |
| Transcripts | Not available. Required for every video and audio item (SC 1.2.3/1.2.5 alternative and good practice for second-language learners). |
| PDFs | All learner PDFs (lesson handouts, Workshop Pack) are **untagged** — screen readers cannot read their structure. Correction: generate tagged PDFs with an outline (supported by the current Playwright pipeline; already applied to these audit documents), and provide the same content as accessible HTML in the platform. |
| Audio-only content | None yet. |

### 4.4 Alternatives for learners who cannot use voice

W1, and later the Speaking Studio, assume the learner can speak, hear a recording and stand. There is **no reasonable-adjustment route** today. Required before launch:

- A **Reasonable Adjustments policy**: how to request, response time, confidentiality, who decides.
- **Alternative tasks** with equivalent learning outcomes, for example: seated delivery; use of augmentative communication or a pre-written script read by text-to-speech, assessed on structure, slide design, signposting and written recovery strategies; captioned self-review instead of audio self-review for learners who are deaf or hard of hearing; extended time.
- **Assessment equivalence**: rubric criteria that depend on voice (2, 3, 5) replaced by documented equivalents, decided by the Academic Director.
- Non-voice pressure-card alternatives (e.g. written interruption responses).

### 4.5 Clear instructions

The content standard already requires plain British English, numbered steps, explicit time estimates and a “what you will produce” statement for every step; the W1 package follows it. Readability for B2-level learners should be checked by a language specialist (Section 5).

---

## 5. Educational quality framework

### 5.1 Standards

| Element | Standard | Current state |
|---|---|---|
| Learning outcomes | Every module and lesson states measurable outcomes (observable verb, condition, criterion). Outcomes map to assessment. | Done for 8 authored items; W1 outcomes mapped to evidence. 28 items in preparation. |
| Evidence-based teaching | Claims about learning, speech or communication are supported by peer-reviewed or authoritative sources. | References included in each authored lesson. **Not yet verified against originals by a second person.** |
| Evidence vs. recommendation vs. illustration | Each lesson visually separates: **Evidence** (what research shows, with references), **Recommendation** (professional practice, marked as such), **Illustration** (fictional example). | Implemented as callouts and labelled examples. |
| Limits of evidence | Popular claims are corrected (e.g. the “7–38–55” misreading of Mehrabian; power-posing effects not replicated — Ranehill et al. 2015). | Done in L09. Continue in all lessons. |
| Medical expert review | A medical educator checks clinical plausibility of every scenario, terminology and number. | **Not done for any item.** |
| Language review | A qualified English-language specialist checks British English, IPA and B2 readability. | Pronunciation verified against Cambridge and Oxford dictionaries; full language review not done. |
| Transparent assessment | Published rubric with level descriptors and examples; learners know how they will be assessed before they start. | Done for W1 (6 criteria, 3 levels, examples). |
| Fair assessment | No accent penalty; rate diagnostic only; fillers judged by effect; natural delivery valued. | Built into W1 criteria. |
| British English | Spelling and usage (programme, organise, anaesthesia); consistent terminology (“Simulation Centre”). | Consistency checker in CI; manual review needed for new content. |
| Academic integrity | Learners submit their own work; AI-generated submissions disclosed; no plagiarism. | **No academic integrity policy yet.** |
| Copyright in teaching | Sources cited, not reproduced; images and media licensed. | Compliant so far; no third-party media used. |
| Fictional cases | All clinical examples are fictional and composite; no real patients, hospitals or colleagues named. | Verified in authored content. |

### 5.2 Review workflow (proposed)

1. **Author** drafts to the Content Standard.
2. **Automated checks**: consistency checker (terminology, references present, word count, resources exist).
3. **Medical educator review**: clinical plausibility, numbers, terminology.
4. **Language review**: British English, IPA, readability.
5. **Reference verification**: each reference checked against the original source (author, year, title, claim supported).
6. **Accessibility check**: headings, alternatives, captions/transcripts, tagged PDF.
7. **Academic Director sign-off**, recorded in a review log with date and version.
8. **Post-cohort review**: learner feedback, assessment data, corrections log.

No content should be marked “Published” without steps 3–7. Today all authored content is correctly labelled as being in review.

---

## 6. Technical and operational security audit

| # | Area | Finding | Risk | Proposed action |
|---|---|---|---|---|
| S1 | HTTP security headers | None set (no CSP, HSTS, `frame-ancestors`/X-Frame-Options, `X-Content-Type-Options`, Referrer-Policy, Permissions-Policy); `X-Powered-By: Next.js` exposed. | High | Configure headers in `next.config`; nonce-based CSP; disable `poweredByHeader`; header test in CI. |
| S2 | Rate limiting | `/api/contact` accepts unlimited requests. Supabase Auth applies its own limits to authentication emails. | Medium (High once an email provider sends messages) | Per-IP rate limit; privacy-friendly bot challenge. |
| S3 | Staff MFA | Instructors, assessors and administrators sign in with password only. | High once real learner data exists | Supabase MFA (TOTP) required for staff roles; enforce `aal2` in RLS for staff functions. |
| S4 | Authorisation scope | Teaching staff can read progress of all learners, not only their cohorts. | Medium | Cohort assignment table; restrict staff policies. |
| S5 | Database security | RLS on 15/15 tables; Supabase default grants revoked; security-definer functions with empty `search_path`; anonymous users can read only the public syllabus; 33 SQL + 56 E2E security tests. | Controlled | Keep RLS tests mandatory for every migration; add them to CI against a Supabase container. |
| S6 | Secrets | No secrets in the repository or its history (scanner with negative test in CI); service-role key not used by the app; `.env*` ignored. | Controlled | Rotate keys on staff change; secret store per environment. |
| S7 | Backups and recovery | Hosted Supabase not yet connected; no backup or restore plan. | High at launch | Plan with daily backups (consider point-in-time recovery); documented recovery objectives; quarterly restore test. |
| S8 | Logging and monitoring | Audit log of key account and learning events (readable by leadership only, append-only through functions). No error monitoring or alerting. | Medium | EU-hosted error monitoring with PII scrubbing; alerts for auth anomalies and 5xx rates. |
| S9 | File storage | None yet (W1 recordings stay on the learner's device). | Not yet applicable | Design in Section 3.2. |
| S10 | Payments | Not implemented. | Not yet applicable | Stripe Checkout (hosted), webhook signature verification, idempotent fulfilment, no card data on Academy servers. |
| S11 | Dependencies | `npm audit`: 0 vulnerabilities on 26 Nov 2026. | Low | `npm audit` and automated update PRs in CI. |
| S12 | Data leakage | Quiz answers hidden behind a public view; learner data only via RLS; errors shown to users are generic. Data export includes only the user's own rows. | Controlled | Review again when AI prompts include learner content (prompt-injection and cross-learner leakage tests). |
| S13 | Incident response | No procedure, contacts or breach register. | High (legal duty under GDPR Art. 33) | Incident and Data Breach Response Procedure; tabletop exercise before launch. |
| S14 | Penetration test | None. | — | Independent test before public launch and before Phase 4 goes live. |

---

## 7. Legal documents checklist

**Legend.** *Required* = required by law in the Academy's assumed situation. *Conditional* = required if a stated condition is met. *Recommended* = best practice, not a legal requirement. Every document must be drafted or reviewed by a qualified lawyer (and, for privacy documents, a data-protection specialist); **no document in the repository should be presented as legally compliant until that review is recorded.**

| # | Document | Legal status | Basis | Current state | Action |
|---|---|---|---|---|---|
| 1 | Terms of Service (*Regulamin*) | **Required** | Polish Act on Providing Services by Electronic Means; Consumer Rights Act | Draft page with placeholders, labelled “Draft — pending legal review” | Lawyer drafting / review |
| 2 | Privacy Policy | **Required** | GDPR Arts. 12–14 | Draft page with placeholders | Complete; DP specialist review |
| 3 | Cookie Policy and consent mechanism | **Required** (information + consent for non-essential storage) | ePrivacy Directive Art. 5(3); Electronic Communications Law | Draft policy; working consent banner | Review; keep analytics gated |
| 4 | Record of Processing Activities | **Required** (internal) | GDPR Art. 30 | Not started | Prepare |
| 5 | Data Retention Schedule | **Required in substance** (storage limitation; information duty) | GDPR Arts. 5(1)(e), 13(2)(a) | Not started | Prepare and implement |
| 6 | Data Processing Agreements and processor register | **Required** | GDPR Art. 28 | Not started | Accept provider DPAs; register |
| 7 | DPIA for recordings and AI feedback | **Required if high risk** (likely) | GDPR Art. 35 | Not started | Before Phase 4 |
| 8 | Incident and Data Breach Response Procedure, breach register | **Required in substance** (Art. 33(5) register is mandatory) | GDPR Arts. 32–34 | Not started | Prepare |
| 9 | Refund, Cancellation and Withdrawal Policy, model withdrawal form | **Required** (information and form) | Consumer Rights Act; Directive 2011/83/EU | Placeholder in Terms | Lawyer drafting |
| 10 | Subscription and Payment Terms | **Conditional** (if instalments, subscriptions or renewals are offered) | Consumer Rights Act; PSD2 | Not started | With Stage 7 |
| 11 | Complaints and Contact Procedure | **Required** (complaints procedure in Terms) | Electronic Services Act; Consumer Rights Act | Contact form only | Prepare |
| 12 | AI Transparency Notice | **Conditional → Required** once AI interacts with learners | AI Act Art. 50; GDPR Arts. 13–14 | Public note on AI teachers; no in-product notice | With Phase 4 |
| 13 | AI Simulation Disclaimer | **Recommended** (supports Art. 50 and consumer information) | Best practice | Partial (public pages) | With Phase 4 |
| 14 | Responsible AI Policy | **Recommended** (supports Arts. 4, 5, 14) | Best practice | Requirements in Section 3 of this audit | Adopt as policy |
| 15 | Medical Education Disclaimer | **Recommended** | Best practice; fair commercial practice | Present in footer, FAQ and Terms draft | Consolidate |
| 16 | IP and Copyright Notice, third-party notices | **Required** for licence attribution (CC-BY, LGPL notices); otherwise recommended | Licence terms; Copyright Act | Not started | Prepare |
| 17 | Contributor, instructor and image-release agreements | **Required** before engaging authors or recording people | Copyright Act Arts. 41–53, 81 | Not started | Lawyer drafting |
| 18 | Accessibility Statement | **Conditional** (required if EAA applies); recommended otherwise | EAA; Polish act of 26 April 2024 | Not started | After remediation |
| 19 | Information Security Policy | **Recommended** (evidence for GDPR Art. 32) | Best practice | Not started | Prepare |
| 20 | Certificate and Assessment Policy (including appeals and reasonable adjustments) | **Recommended** | Fair practice; consumer information | Wording approved; no policy | Prepare |
| 21 | Academic Integrity Policy | **Recommended** | Best practice | Not started | Prepare |
| 22 | Marketing consent wording and unsubscribe process | **Required** if marketing is sent | Electronic Communications Law; GDPR Art. 7 | Consent captured; no sending process | With email provider |
| 23 | UK / Swiss representative appointment | **Conditional** | UK GDPR Art. 27; FADP | Not assessed | Decide target markets |

---

## 8. Items for specialist review

**Lawyer (Polish and EU consumer and e-commerce law):** legal form and identity disclosures; Terms of Service; withdrawal structure for the mixed product; sole-trader consumer protection; price-indication rules; geo-blocking; DSA status; conformity of digital content; contributor and image agreements; learner content licence.

**Data-protection specialist:** lawful bases for recordings; Record of Processing; DPIA; DPO decision; transfer mechanisms per provider; retention periods; privacy and cookie policies; breach procedure; UK and Swiss representatives.

**AI-regulation specialist:** whether the Academy is an “education institution” for Art. 5(1)(f); high-risk classification and the Art. 6(3) derogation; provider vs. deployer status; current dates after the digital omnibus proposals; Art. 50 marking of synthetic audio.

**Tax adviser:** VAT treatment and place of supply; OSS; UK VAT; KSeF invoicing.

**Accessibility auditor (recommended):** manual WCAG 2.2 AA audit with assistive technologies; EAA scope.

**Independent medical educator and English-language specialist (recommended):** content review per Section 5.

---

## 9. Prioritised corrective actions (for your approval)

Nothing in this list has been implemented, except the 1280 px layout defect found and fixed during the audit and the tagged output of these audit PDFs.

**Priority 1 — can be done now, no legal input needed (proposed for the next technical step):**

1. Accessibility: logo accessible name; keyboard access to the scrollable table; colour-contrast corrections — **pending your decision on the brand colours** (Section 4.1).
2. Tagged, outlined PDFs for all learner materials, plus HTML equivalents.
3. HTTP security headers and removal of the framework banner.
4. Rate limiting on the contact API.
5. Extend the data export to all learning records.
6. Clarify the W1 completion wording (W1 Quality Gate F1).
7. `npm audit` and RLS tests in CI.

**Priority 2 — before any real learner data or payment (launch blockers):**

8. Legal identity and completed Terms, Privacy Policy, Cookie Policy, withdrawal policy and complaints procedure, reviewed by a lawyer and a data-protection specialist.
9. Record of Processing, Retention Schedule, processor DPAs, breach procedure.
10. Staff MFA, cohort-scoped staff access, backups with a tested restore, monitoring.
11. Reasonable Adjustments policy and alternative tasks for voice-based work.
12. Medical, language and reference review of all published content.
13. Tax opinion; Stage 7 checkout built to consumer-law requirements.
14. Manual accessibility audit; Accessibility Statement.

**Priority 3 — before Phase 4 starts:**

15. DPIA; AI Act classification; provider selection with no-training and EU-region settings.
16. Responsible AI Policy, AI transparency notice, staff AI-literacy training.
17. Phase 4 acceptance tests (Section 3.4).
18. Penetration test.
