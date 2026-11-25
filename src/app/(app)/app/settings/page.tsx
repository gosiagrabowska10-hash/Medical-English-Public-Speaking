import Link from "next/link";
import { Suspense } from "react";
import { Download, KeyRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { ConsentToggle, DeletionRequest, ProfileForm } from "@/components/student/settings-forms";
import { requireUser } from "@/lib/auth";
import { signOutAction } from "@/lib/auth-actions";
import { createClient } from "@/lib/supabase/server";
import Loading from "../loading";

export const metadata = { title: "Account Settings" };

export default function SettingsPage() {
  return (
    <>
      <Eyebrow className="mb-4"><Rule />Account</Eyebrow>
      <h1 className="font-serif text-h1 text-midnight">Account Settings</h1>
      <Suspense fallback={<div className="mt-10"><Loading /></div>}>
        <Settings />
      </Suspense>
    </>
  );
}

function Panel({ id, title, lead, children }: { id: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <Card className="p-7 md:p-9">
        <h2 id={`${id}-h`} className="font-serif text-3xl text-midnight">{title}</h2>
        {lead && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{lead}</p>}
        <div className="mt-7">{children}</div>
      </Card>
    </section>
  );
}

async function Settings() {
  const user = await requireUser("/app/settings");
  const supabase = (await createClient())!;
  const [{ data: consents }, { data: deletion }] = await Promise.all([
    supabase.from("current_consents").select("kind,granted,created_at"),
    supabase.from("data_deletion_requests").select("status,created_at").in("status", ["pending", "in_progress"]).maybeSingle(),
  ]);
  const given = (k: string) => consents?.some((c) => c.kind === k && c.granted) ?? false;
  const accepted = consents?.find((c) => c.kind === "terms");

  return (
    <div className="mt-10 space-y-6">
      <Panel id="profile" title="Professional profile" lead="How your name appears to instructors and on your Certificate of Completion.">
        <ProfileForm profile={user.profile} email={user.email} />
      </Panel>

      <Panel id="security" title="Sign-in and security">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline"><Link href="/forgot-password"><KeyRound /> Change password</Link></Button>
          <form action={signOutAction}><Button type="submit" variant="ghost"><LogOut /> Sign out</Button></form>
        </div>
        <p className="mt-4 text-sm text-ink-subtle">To change your password we send a secure link to your email address.</p>
      </Panel>

      <Panel id="privacy" title="Privacy and consent" lead="You can change these choices at any time. Each change is recorded with its date.">
        <div className="divide-y divide-stone border-y border-stone">
          <ConsentToggle kind="recording" granted={given("recording")} title="Voice and video recording" description="Allows the Speaking Studio, simulations and assessments to record and analyse your speech. Required for practical exercises. Please never include identifiable patient information." />
          <ConsentToggle kind="marketing_email" granted={given("marketing_email")} title="News and educational articles by email" description="Occasional emails about new articles, programmes and events. Optional." />
        </div>
        {accepted && <p className="mt-4 text-sm text-ink-subtle">Terms and Privacy Policy accepted on {new Date(accepted.created_at).toLocaleDateString("en-GB")}.</p>}
      </Panel>

      <Panel id="data" title="Your data" lead="Download a copy of the personal data we hold about you, or ask us to delete it.">
        <div className="flex flex-col gap-6">
          <div><Button asChild variant="outline"><a href="/api/account/export" download><Download /> Download my data (JSON)</a></Button></div>
          <DeletionRequest open={deletion ?? null} />
        </div>
      </Panel>
    </div>
  );
}
