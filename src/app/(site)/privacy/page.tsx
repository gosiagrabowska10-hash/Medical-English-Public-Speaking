import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How The Medical Speaking Academy collects, uses and protects personal data, including voice and video recordings.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="27 November 2026">
      <h2>1. Who we are</h2>
      <p>The Medical Speaking Academy (&ldquo;the Academy&rdquo;, &ldquo;we&rdquo;) is operated by [legal entity name], registered at [registered address], company number [number]. We are the data controller for the personal data described in this policy. You can contact us about privacy at [privacy contact email].</p>

      <h2>2. Data we collect</h2>
      <ul>
        <li><strong>Account data:</strong> title, name, email address, country, professional specialty or role, and password (stored only as a secure hash by our authentication provider).</li>
        <li><strong>Learning data:</strong> lesson progress, quiz answers, notes, assignments, assessment results and certificates.</li>
        <li><strong>Workshop logs:</strong> what you type into practice-round logs, your self-assessment, reflections and transfer plans, and any assessment an instructor records with written feedback.</li>
        <li><strong>Security data:</strong> whether you have set up two-factor authentication (the authenticator secret is held by our authentication provider), and an audit log of important account events.</li>
        <li><strong>Recordings (planned, not yet collected):</strong> when the Speaking Studio and Simulation Centre open, audio and, where you choose, video recordings, with transcripts and feedback derived from them. <em>At present the platform does not upload or store any recordings: workshop recordings stay on your own device.</em></li>
        <li><strong>AI conversations (planned, not yet collected):</strong> messages you exchange with AI teachers and simulations, once these features open.</li>
        <li><strong>Payment data:</strong> order and payment status. Card details are processed by our payment provider and are never stored by the Academy.</li>
        <li><strong>Communications:</strong> messages you send us through the contact form or by email.</li>
        <li><strong>Technical data:</strong> data necessary to operate and secure the website, and — only with your consent — analytics data.</li>
      </ul>

      <h2>3. Why we use your data, and on what legal basis</h2>
      <ul>
        <li>To provide the programme you enrol in, including AI practice, human feedback, assessment and certification — <strong>performance of a contract</strong>.</li>
        <li>To record and analyse your speech — <strong>your explicit consent</strong>, which you give before any recording and can withdraw at any time.</li>
        <li>To process payments, keep accounting records and meet legal obligations — <strong>legal obligation</strong>.</li>
        <li>To keep the platform secure, prevent misuse and maintain audit logs — <strong>legitimate interests</strong>.</li>
        <li>To measure website usage — <strong>your consent</strong>, through our cookie settings.</li>
      </ul>

      <h2>4. Recordings and AI processing</h2>
      <p><strong>Current status:</strong> no AI features are active and the platform does not store recordings. The rules below describe how these features will work when they open; before then we will complete a data protection impact assessment and update this policy.</p>
      <p>Recording begins only after you give consent. Recordings are stored in secure, access-controlled storage and are available only to you and to the Academy staff responsible for reviewing your work. To provide transcription, analysis and AI teaching, your recordings and messages are processed by our AI service providers under data processing agreements. We do not use your recordings to train AI models, and we instruct our providers not to do so where that option is available. AI feedback describes observable features of your speaking, such as pace, pauses and the clarity of numbers; it never infers your emotions, personality or clinical competence, and it never decides your assessment or certificate on its own.</p>
      <p><strong>Please never include identifiable patient information</strong>, images or confidential clinical data in recordings, presentations, assignments or AI conversations.</p>

      <h2>5. Security</h2>
      <p>Access to learner data is restricted by database-level access rules, so each learner can see only their own records. Staff who can see learners&rsquo; work must use two-factor authentication. To protect our forms from abuse we keep a short-lived counter keyed by a one-way hash of your network address; the address itself is not stored.</p>

      <h2>6. Who we share data with</h2>
      <p>We use carefully selected service providers (processors) for hosting, database and storage, authentication, payment processing, email delivery, AI services and — with your consent — analytics. A current list of processors is available on request at [privacy contact email]. We do not sell personal data.</p>

      <h2>7. International transfers</h2>
      <p>Some providers may process data outside the European Economic Area. Where this happens, we rely on appropriate safeguards such as the European Commission&rsquo;s Standard Contractual Clauses.</p>

      <h2>8. How long we keep data</h2>
      <p>[Retention periods to be confirmed — for example: account and learning data for the duration of your access plus [period]; recordings until you delete them or [period] after programme completion; certificate records for as long as verification is offered; payment records as required by tax law.]</p>

      <h2>9. Certificate verification</h2>
      <p>Certificates can be verified online using their unique number. The verification page shows only the information necessary to confirm authenticity: the certificate holder&rsquo;s name as printed, the programme, issue date and status. It does not show your contact details or results.</p>

      <h2>10. Your rights</h2>
      <p>You may request access to, correction, deletion or a copy of your personal data, object to or restrict certain processing, and withdraw consent at any time. You can download a complete copy of your data and request account deletion from your account settings, or by contacting us. You also have the right to lodge a complaint with a data protection supervisory authority.</p>

      <h2>11. Cookies</h2>
      <p>See our <Link href="/cookies">Cookie Policy</Link>.</p>

      <h2>12. Changes</h2>
      <p>We will publish any changes to this policy on this page and, where changes are significant, notify enrolled students by email.</p>
    </LegalPage>
  );
}
