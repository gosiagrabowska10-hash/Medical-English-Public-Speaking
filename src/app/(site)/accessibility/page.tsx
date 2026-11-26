import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Accessibility Statement and Reasonable Adjustments", description: "The Academy's accessibility commitment, current conformance status, known limitations and how to request a reasonable adjustment.", path: "/accessibility" });

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" updated="27 November 2026">
      <h2>1. Our commitment</h2>
      <p>The Medical Speaking Academy wants every doctor to be able to learn with us, including doctors with disabilities and temporary conditions. Our target for the website, the learning platform and all downloadable materials is the Web Content Accessibility Guidelines (WCAG) 2.2, level AA.</p>

      <h2>2. Current status</h2>
      <p>The platform is <strong>partially conformant</strong> with WCAG 2.2 AA: we believe most of it meets the standard, but this has not yet been confirmed by an independent manual audit with assistive technologies. What we have done so far:</p>
      <ul>
        <li>Automated testing of every public page, the cookie banner, the signed-in platform and all workshop views with axe-core on each release, with no known automated failures.</li>
        <li>Text colours chosen to meet the WCAG AA contrast ratios, a visible keyboard focus indicator and a &ldquo;Skip to content&rdquo; link on every page.</li>
        <li>Keyboard-operable menus, tabs, dialogs and forms, with labelled form fields and error messages announced to screen readers.</li>
        <li>Tagged PDF materials with a document outline, and the same content available as web pages in the platform.</li>
        <li>Captions for video; a transcript is published with every video.</li>
        <li>Responsive layouts tested at phone, tablet, laptop and desktop widths.</li>
      </ul>

      <h2>3. Known limitations</h2>
      <ul>
        <li>Most instructor videos have not yet been recorded. Each will be published only with captions and a transcript.</li>
        <li>Speaking workshops assume that you can speak aloud, listen and stand. An adjusted route with the same learning outcomes is available (section 4).</li>
        <li>An independent manual audit with screen readers (NVDA, JAWS, VoiceOver), zoom and speech input is planned before public launch. We will update this statement with its results.</li>
      </ul>

      <h2>4. Reasonable adjustments</h2>
      <p>If a disability, health condition or temporary injury makes any part of the programme difficult, we will make reasonable adjustments so that you can reach the same learning outcomes. Examples include: seated delivery; captions or a transcript of your own recording instead of listening back; a written comprehension check; written alternatives to spoken pressure exercises; extra time; and delivery with text-to-speech or another communication aid, assessed against equivalent criteria agreed with the Academic Director.</p>
      <p><strong>How to ask:</strong> choose &ldquo;Accessibility and adjustments&rdquo; on the <Link href="/contact?topic=accessibility">contact form</Link>, or tell your facilitator. You do not need to give medical details; tell us what is difficult and what would help. We aim to reply within five working days. Information about your needs is shared only with the staff who need it to arrange the adjustment, and is not recorded in your assessment.</p>

      <h2>5. Feedback and complaints</h2>
      <p>If you find an accessibility barrier, please tell us through the <Link href="/contact?topic=accessibility">contact form</Link>, with the page and what happened. If you are not satisfied with our response, you can use our complaints procedure (<Link href="/contact?topic=complaint">contact form, topic &ldquo;Complaint&rdquo;</Link>). [Details of the relevant enforcement or supervisory body to be confirmed by legal review.]</p>

      <h2>6. Preparation of this statement</h2>
      <p>This statement was prepared on 27 November 2026 on the basis of automated testing and internal review. It will be reviewed after the independent audit and at least once a year.</p>
    </LegalPage>
  );
}
