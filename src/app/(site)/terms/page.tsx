import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms & Conditions", description: "Terms and conditions for enrolment in programmes offered by The Medical Speaking Academy.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="25 November 2026">
      <h2>1. About these terms</h2>
      <p>These terms govern your use of the website and your enrolment in programmes offered by The Medical Speaking Academy, operated by [legal entity name], [registered address] (&ldquo;the Academy&rdquo;). By creating an account or enrolling, you agree to these terms.</p>

      <h2>2. The programme</h2>
      <p>The Medical Public Speaking Professional Programme is an online educational programme delivered over ten weeks, comprising 12 modules, 30 core lessons, 6 practical workshops, AI-assisted practice tools, one live group coaching session and a human review of your final presentation. The programme content and schedule may be updated to improve quality without reducing its overall scope.</p>

      <h2>3. Eligibility</h2>
      <p>The programme is intended for medical and healthcare professionals and students. You must be at least 18 years old and provide accurate registration information.</p>

      <h2>4. Fees and payment</h2>
      <p>Tuition is displayed before checkout, including the currency and any applicable taxes. Payment is processed by our payment provider. Access is granted only after the provider confirms successful payment.</p>

      <h2>5. Right of withdrawal and refunds</h2>
      <p>[Withdrawal period, conditions under which the right of withdrawal ends once digital content is accessed with your consent, and refund policy — to be confirmed under applicable consumer law.]</p>

      <h2>6. Access period</h2>
      <p>You will have access to the programme for the duration of your cohort and for [access period] after its end, as confirmed in your enrolment confirmation.</p>

      <h2>7. AI teaching tools</h2>
      <p>AI teachers, simulations and speech analysis are automated educational tools. They may produce inaccurate or incomplete feedback and are provided for practice and guidance only. They do not provide medical, legal or professional advice. Usage of AI tools is subject to reasonable fair-use limits to protect service quality.</p>

      <h2>8. Your conduct and content</h2>
      <ul>
        <li>You must not upload identifiable patient information, confidential clinical data or content you do not have the right to share.</li>
        <li>You remain the owner of your presentations and recordings and grant the Academy a limited licence to process them solely to deliver the programme.</li>
        <li>Your account is personal and may not be shared.</li>
        <li>You must not attempt to misuse, disrupt or extract content from the platform.</li>
      </ul>

      <h2>9. Assessment and certification</h2>
      <p>A Certificate of Completion is issued only when all published graduation requirements are met and an authorised Academy assessor approves the final assessment. The certificate is issued by the Academy. The Academy is not a university, and the programme does not currently carry external accreditation or CME/CPD credit. The Academy may revoke a certificate obtained through misrepresentation or academic misconduct.</p>
      <p>Workshops have two separate statuses. <strong>Workshop Completed</strong> means that all required activities and the written Final Task have been completed. <strong>Competent</strong> means that an Academy instructor or assessor has observed the participant&rsquo;s performance and confirmed, using the published rubric, that the required standard has been met. Self-assessment is a learning tool and is never presented as an independent assessment. The certificate and its verification record list only instructor-confirmed Competent results as assessments. Participants may ask for a reassessment and may appeal an assessment under the Certificate and Assessment Policy.</p>

      <h2>10. Intellectual property</h2>
      <p>All programme content, including lessons, videos, workbooks and AI teacher configurations, is owned by or licensed to the Academy and is provided for your personal educational use only.</p>

      <h2>11. Liability</h2>
      <p>[Limitation of liability clause — to be drafted by legal counsel in accordance with applicable law, without excluding liability that cannot legally be excluded.]</p>

      <h2>12. Privacy</h2>
      <p>Our use of personal data is described in the <Link href="/privacy">Privacy Policy</Link>.</p>

      <h2>13. Governing law</h2>
      <p>[Governing law and jurisdiction — to be confirmed. Consumers retain the protection of mandatory consumer law in their country of residence.]</p>
    </LegalPage>
  );
}
