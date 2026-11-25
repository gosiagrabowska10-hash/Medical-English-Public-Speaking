import { CookieSettingsLink } from "@/components/layout/cookie-consent";
import { LegalPage } from "@/components/marketing/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Cookie Policy", description: "How The Medical Speaking Academy uses cookies and similar technologies, and how to change your preferences.", path: "/cookies" });

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="25 November 2026">
      <h2>What cookies are</h2>
      <p>Cookies and similar technologies (such as local storage) store small pieces of information on your device. Some are essential for a website to work; others help us understand how the site is used.</p>

      <h2>Categories we use</h2>
      <h3>Strictly necessary — always active</h3>
      <ul>
        <li><strong>msa-cookie-consent</strong> (local storage): remembers your cookie choices. Kept until you change or clear them.</li>
        <li>Authentication cookies (when student accounts open): keep you securely signed in. Session or up to [duration].</li>
        <li>Payment security cookies set by our payment provider during checkout.</li>
      </ul>
      <h3>Analytics — only with your consent</h3>
      <p>If you allow analytics, we will use Google Analytics 4 to measure anonymous usage such as page views and enrolment steps. Analytics are not currently active on this website. When enabled, the specific cookies and their durations will be listed here.</p>
      <h3>Marketing — only with your consent</h3>
      <p>We do not currently use marketing cookies. If this changes, they will be listed here and will only be used with your consent.</p>

      <h2>Changing your choice</h2>
      <p>You can change or withdraw your consent at any time: <CookieSettingsLink className="font-medium text-gold-deep underline underline-offset-2" />.</p>
    </LegalPage>
  );
}
