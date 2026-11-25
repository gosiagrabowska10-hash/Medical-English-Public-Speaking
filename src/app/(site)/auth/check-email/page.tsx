import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/typography";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Confirm your email", description: "Confirm your email address to activate your account.", path: "/auth/check-email", noindex: true });

export default function CheckEmailPage() {
  return (
    <Section>
      <Container size="narrow" className="text-center">
        <MailCheck aria-hidden className="mx-auto size-10 text-gold-deep" strokeWidth={1.3} />
        <h1 className="mt-8 font-serif text-h2 text-midnight">Please confirm your email address.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lead text-ink-muted">
          If this address can be registered, we have sent a confirmation link to it. Open the link to activate your account. It may take a few minutes to arrive — please also check your spam folder.
        </p>
        <Button asChild variant="outline" className="mt-10"><Link href="/login">Go to sign in</Link></Button>
      </Container>
    </Section>
  );
}
