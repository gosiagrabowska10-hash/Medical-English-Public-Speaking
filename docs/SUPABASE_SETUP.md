# Supabase setup (Stage 2)

No secret key is required for Stage 2. The app uses only the **Project URL** and the **publishable (anon) key**, which are designed to be public; every table is protected by Row Level Security and column privileges.

## 1. Apply the database migrations (no credentials needed)
Supabase Dashboard → **SQL Editor** → New query → paste and **Run** each file, in this order:
1. `supabase/migrations/20261125000001_identity_and_governance.sql` (Stage 2: accounts, roles, consent)
2. `supabase/migrations/20261125000002_curriculum_and_progress.sql` (Stage 3: course structure, progress)
3. `supabase/migrations/20261125000003_curriculum_content.sql` (Stage 3: 12 modules, 36 lessons/workshops)
4. `supabase/migrations/20261126000004_workshop_progress.sql` (workshop practice rounds: save, pause and resume)
5. `supabase/migrations/20261127000005_mfa_assessment_ratelimit.sql` (staff MFA enforcement, instructor-confirmed workshop assessments, rate limiting, role-change audit)

**Two-factor authentication (required for staff):** in the Supabase dashboard, Authentication → Multi-Factor, make sure **TOTP (authenticator app)** enrolment and verification are enabled (they are on by default on hosted projects; locally they are enabled in `supabase/config.jsonc`). Staff roles have no effect until the staff member has enrolled an authenticator and signed in with it.

Expected result for each: "Success. No rows returned".

(Alternative for developers: `npx supabase link --project-ref <ref>` then `npx supabase db push`; this asks for the database password locally — never share it.)

## 2. Authentication settings
Dashboard → **Authentication**:
- **Sign In / Providers → Email**: enabled; **Confirm email: ON**.
- **Password security**: minimum length **10**. Enable *leaked password protection* if your plan supports it.
- **URL Configuration**:
  - Site URL: your production domain, e.g. `https://www.your-domain.com`
  - Redirect URLs: `https://www.your-domain.com/auth/confirm`, plus your Vercel preview URL pattern and `http://localhost:3000/auth/confirm` for development.
- **Emails → SMTP**: before launch, configure a custom SMTP sender (e.g. Resend). Supabase's built-in sender is rate-limited and intended for testing only.
- **Emails → Templates**: optional branding of the confirmation and reset emails.

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)
| Name | Value | Secret? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.your-domain.com` | No |
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard → Project Settings → API → Project URL | No |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Dashboard → Project Settings → API Keys → Publishable key | No |

`NEXT_PUBLIC_*` values are embedded at build time: redeploy after setting them.

## 4. Create the Academy Owner account
1. Register normally on the website and confirm the email.
2. SQL Editor (runs as an administrator):
```sql
insert into public.user_roles (user_id, role)
select id, 'academy_owner' from auth.users where email = 'owner@your-domain.com';
```
After that, staff roles are granted by the Owner (admin UI arrives in Stage 7).

## 5. Verify
- Register a test account → confirmation email arrives → link signs you in at `/app`.
- `/app` when signed out redirects to `/login`.
