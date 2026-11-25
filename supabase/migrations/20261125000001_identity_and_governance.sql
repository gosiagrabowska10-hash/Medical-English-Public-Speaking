-- ═══════════════════════════════════════════════════════════════════
-- The Medical Speaking Academy — Stage 2: identity, roles, consent,
-- audit log and data-deletion requests. All tables use Row Level Security.
-- ═══════════════════════════════════════════════════════════════════

-- ── Types ───────────────────────────────────────────────────────────
create type public.app_role as enum (
  'student', 'instructor', 'assessor', 'content_editor',
  'student_support', 'academic_director', 'academy_owner'
);

create type public.consent_kind as enum (
  'terms', 'privacy', 'recording', 'marketing_email', 'cookies_analytics'
);

create type public.deletion_status as enum ('pending', 'in_progress', 'completed', 'rejected');

-- ── Helpers ─────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

-- ── Profiles (1:1 with auth.users) ─────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  title       text check (title in ('Dr', 'Prof.', 'Mr', 'Ms', 'Mx')),
  first_name  text not null check (char_length(first_name) between 1 and 80),
  last_name   text not null check (char_length(last_name) between 1 and 80),
  country     text check (char_length(country) <= 80),
  specialty   text check (char_length(specialty) <= 120),
  locale      text not null default 'en',
  timezone    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
comment on table public.profiles is 'Professional profile of every account. Created automatically on sign-up.';

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- ── Roles ───────────────────────────────────────────────────────────
create table public.user_roles (
  user_id     uuid not null references auth.users (id) on delete cascade,
  role        public.app_role not null,
  granted_by  uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now(),
  primary key (user_id, role)
);

-- SECURITY DEFINER so policies can check roles without recursive RLS.
create or replace function public.has_role(_role public.app_role)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = _role
  );
$$;

create or replace function public.has_any_role(_roles public.app_role[])
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = any (_roles)
  );
$$;

revoke all on function public.has_role(public.app_role) from public;
revoke all on function public.has_any_role(public.app_role[]) from public;
grant execute on function public.has_role(public.app_role) to authenticated;
grant execute on function public.has_any_role(public.app_role[]) to authenticated;

-- ── Consents (append-only record) ───────────────────────────────────
create table public.consents (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  kind        public.consent_kind not null,
  granted     boolean not null,
  version     text not null default '2026-11-25',
  created_at  timestamptz not null default now()
);
create index consents_user_kind_idx on public.consents (user_id, kind, created_at desc);

create view public.current_consents with (security_invoker = true) as
  select distinct on (user_id, kind) user_id, kind, granted, version, created_at
  from public.consents
  order by user_id, kind, created_at desc;

-- ── Audit log ───────────────────────────────────────────────────────
create table public.audit_log (
  id          bigint generated always as identity primary key,
  actor_id    uuid references auth.users (id) on delete set null,
  action      text not null,
  entity      text,
  entity_id   text,
  metadata    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);
create index audit_log_created_idx on public.audit_log (created_at desc);

-- The only way to write to the audit log; actor is always the caller.
create or replace function public.log_event(_action text, _entity text default null, _entity_id text default null, _metadata jsonb default '{}'::jsonb)
returns void language sql security definer set search_path = '' as $$
  insert into public.audit_log (actor_id, action, entity, entity_id, metadata)
  values ((select auth.uid()), _action, _entity, _entity_id, coalesce(_metadata, '{}'::jsonb));
$$;
revoke all on function public.log_event(text, text, text, jsonb) from public;
grant execute on function public.log_event(text, text, text, jsonb) to authenticated;

-- ── Data deletion requests (GDPR) ───────────────────────────────────
create table public.data_deletion_requests (
  id            bigint generated always as identity primary key,
  user_id       uuid not null references auth.users (id) on delete cascade,
  reason        text check (char_length(reason) <= 2000),
  status        public.deletion_status not null default 'pending',
  created_at    timestamptz not null default now(),
  processed_at  timestamptz,
  processed_by  uuid references auth.users (id) on delete set null
);
-- At most one open request per user.
create unique index deletion_one_open_per_user on public.data_deletion_requests (user_id)
  where status in ('pending', 'in_progress');

-- ── New-user bootstrap ──────────────────────────────────────────────
-- Creates the profile, the student role and the sign-up consents from
-- the metadata sent with supabase.auth.signUp().
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  _title text := nullif(meta ->> 'title', '');
begin
  insert into public.profiles (id, title, first_name, last_name, country, specialty)
  values (
    new.id,
    case when _title in ('Dr', 'Prof.', 'Mr', 'Ms', 'Mx') then _title end,
    coalesce(nullif(left(meta ->> 'first_name', 80), ''), 'Student'),
    coalesce(nullif(left(meta ->> 'last_name', 80), ''), '—'),
    nullif(left(meta ->> 'country', 80), ''),
    nullif(left(meta ->> 'specialty', 120), '')
  );

  insert into public.user_roles (user_id, role) values (new.id, 'student');

  if (meta ->> 'accepted_terms')::boolean is true then
    insert into public.consents (user_id, kind, granted, version)
    values (new.id, 'terms', true, coalesce(meta ->> 'terms_version', '2026-11-25')),
           (new.id, 'privacy', true, coalesce(meta ->> 'terms_version', '2026-11-25'));
  end if;

  insert into public.audit_log (actor_id, action, entity, entity_id)
  values (new.id, 'account.created', 'profile', new.id::text);
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ═══════════════════════════════════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════════════════════════════════
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.consents enable row level security;
alter table public.audit_log enable row level security;
alter table public.data_deletion_requests enable row level security;

-- Profiles
create policy "profiles: read own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "profiles: staff read" on public.profiles
  for select to authenticated using (public.has_any_role(array['instructor','assessor','student_support','academic_director','academy_owner']::public.app_role[]));
create policy "profiles: update own" on public.profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "profiles: support update" on public.profiles
  for update to authenticated using (public.has_any_role(array['student_support','academic_director','academy_owner']::public.app_role[]));

-- Roles: users see their own; only the Academy Owner grants or removes roles.
create policy "roles: read own" on public.user_roles
  for select to authenticated using (user_id = (select auth.uid()));
create policy "roles: owner read" on public.user_roles
  for select to authenticated using (public.has_any_role(array['academic_director','academy_owner']::public.app_role[]));
create policy "roles: owner insert" on public.user_roles
  for insert to authenticated with check (public.has_role('academy_owner') and granted_by = (select auth.uid()));
create policy "roles: owner delete" on public.user_roles
  for delete to authenticated using (public.has_role('academy_owner') and user_id <> (select auth.uid()));

-- Consents: append-only, own records.
create policy "consents: read own" on public.consents
  for select to authenticated using (user_id = (select auth.uid()));
create policy "consents: insert own" on public.consents
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "consents: staff read" on public.consents
  for select to authenticated using (public.has_any_role(array['student_support','academic_director','academy_owner']::public.app_role[]));

-- Audit log: readable by leadership only; written only via log_event().
create policy "audit: leadership read" on public.audit_log
  for select to authenticated using (public.has_any_role(array['academic_director','academy_owner']::public.app_role[]));

-- Deletion requests
create policy "deletion: read own" on public.data_deletion_requests
  for select to authenticated using (user_id = (select auth.uid()));
create policy "deletion: create own" on public.data_deletion_requests
  for insert to authenticated with check (user_id = (select auth.uid()) and status = 'pending' and processed_by is null and processed_at is null);
create policy "deletion: support read" on public.data_deletion_requests
  for select to authenticated using (public.has_any_role(array['student_support','academy_owner']::public.app_role[]));
create policy "deletion: support process" on public.data_deletion_requests
  for update to authenticated using (public.has_any_role(array['student_support','academy_owner']::public.app_role[]));

-- ── Privileges ──────────────────────────────────────────────────────
-- Supabase grants ALL on new tables and EXECUTE on new functions to anon and
-- authenticated by default. Revoke everything, then grant only what is needed,
-- so privileges and RLS form two independent layers of protection.
revoke all on public.profiles, public.user_roles, public.consents, public.audit_log, public.data_deletion_requests, public.current_consents from anon, authenticated;
revoke all on function public.has_role(public.app_role), public.has_any_role(public.app_role[]),
  public.log_event(text, text, text, jsonb), public.handle_new_user(), public.set_updated_at() from anon, authenticated, public;
grant execute on function public.has_role(public.app_role) to authenticated;
grant execute on function public.has_any_role(public.app_role[]) to authenticated;
grant execute on function public.log_event(text, text, text, jsonb) to authenticated;
grant select, update (title, first_name, last_name, country, specialty, locale, timezone) on public.profiles to authenticated;
grant select, insert, delete on public.user_roles to authenticated;
grant select, insert on public.consents to authenticated;
grant select on public.current_consents to authenticated;
grant select on public.audit_log to authenticated;
grant select, insert on public.data_deletion_requests to authenticated;
grant update (status, processed_at, processed_by) on public.data_deletion_requests to authenticated;
