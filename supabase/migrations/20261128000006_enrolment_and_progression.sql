-- 0006 · Enrolment management, cohorts, progressive module unlocking with administrator override.
-- Stage 1 of the product completion plan (approved 27 November 2026).
--
-- Progression rule:
--   * Module 1 (the first published module) is open to every enrolled learner.
--   * Module N opens when module N-1 is open AND completed by the learner.
--     A module is completed when every published, mandatory item in it whose content
--     is not "in preparation" has status "completed". (Items still in preparation do
--     not block progress while the curriculum is being completed.)
--   * An administrator may unlock a module for a learner (reason required, logged).
--   * A lesson the learner has already started or completed always stays accessible
--     (revisiting), even if an override is later revoked.
--   * Preview lessons and staff access are unchanged.

-- ── Cohorts ──────────────────────────────────────────────────────────
create table public.cohorts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique check (char_length(name) between 2 and 80),
  starts_on   date,
  notes       text check (char_length(notes) <= 1000),
  created_by  uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now()
);
alter table public.cohorts enable row level security;
alter table public.enrollments add column cohort_id uuid references public.cohorts (id) on delete set null;
create policy "cohorts: staff read" on public.cohorts for select to authenticated using (public.is_teaching_staff());
create policy "cohorts: learner reads own" on public.cohorts for select to authenticated
  using (exists (select 1 from public.enrollments e where e.cohort_id = cohorts.id and e.user_id = (select auth.uid())));


-- ── Module unlock overrides ─────────────────────────────────────────
create table public.module_unlocks (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  module_id   uuid not null references public.modules (id) on delete cascade,
  reason      text not null check (char_length(reason) between 5 and 500),
  granted_by  uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now(),
  revoked_at  timestamptz,
  revoked_by  uuid references auth.users (id) on delete set null
);
create unique index module_unlocks_active on public.module_unlocks (user_id, module_id) where revoked_at is null;
alter table public.module_unlocks enable row level security;
create policy "unlocks: read own" on public.module_unlocks for select to authenticated using (user_id = (select auth.uid()));
create policy "unlocks: staff read" on public.module_unlocks for select to authenticated using (public.is_teaching_staff());

revoke all on public.cohorts, public.module_unlocks from anon, authenticated;
grant select on public.cohorts, public.module_unlocks to authenticated;

-- ── Administrators of learner records ───────────────────────────────
create or replace function public.is_learner_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select public.has_any_role(array['student_support','academic_director','academy_owner']::public.app_role[]);
$$;
revoke all on function public.is_learner_admin() from public, anon;
grant execute on function public.is_learner_admin() to authenticated;

-- ── Progression ─────────────────────────────────────────────────────
create or replace function public.module_completed_by(_module uuid, _user uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select not exists (
    select 1 from public.lessons l
    where l.module_id = _module and l.published and l.is_mandatory and l.content_status <> 'in_preparation'
      and not exists (select 1 from public.lesson_progress p
                      where p.user_id = _user and p.lesson_id = l.id and p.status = 'completed')
  );
$$;

-- One row per published module, in order, for the given learner.
create or replace function public.module_states_for(_user uuid)
returns table (module_id uuid, number smallint, unlocked boolean, completed boolean, unlocked_by_override boolean)
language plpgsql stable security definer set search_path = '' as $$
declare m record; prev_open boolean := null; prev_done boolean := null; ovr boolean; done boolean; open boolean;
begin
  for m in select id, mo.number from public.modules mo where mo.published order by mo.number loop
    ovr := exists (select 1 from public.module_unlocks u where u.user_id = _user and u.module_id = m.id and u.revoked_at is null);
    done := public.module_completed_by(m.id, _user);
    open := (prev_open is null) or (prev_open and prev_done) or ovr;
    module_id := m.id; number := m.number; unlocked := open; completed := done;
    unlocked_by_override := ovr and not ((prev_open is null) or (prev_open and prev_done));
    return next;
    prev_open := open; prev_done := done;
  end loop;
end $$;

-- Self, or any learner for teaching staff (MFA-verified via is_teaching_staff).
create or replace function public.module_states(_user uuid default null)
returns table (module_id uuid, number smallint, unlocked boolean, completed boolean, unlocked_by_override boolean)
language plpgsql stable security definer set search_path = '' as $$
declare target uuid := coalesce(_user, (select auth.uid()));
begin
  if target is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if target <> (select auth.uid()) and not public.is_teaching_staff() then
    raise exception 'access denied' using errcode = '42501';
  end if;
  return query select * from public.module_states_for(target);
end $$;

create or replace function public.can_access_lesson(_lesson uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.lessons l
    where l.id = _lesson and (
      public.is_content_staff() or public.is_teaching_staff()
      or (l.published and l.is_preview)
      or (l.published and public.is_enrolled() and (
            exists (select 1 from public.lesson_progress p where p.user_id = (select auth.uid()) and p.lesson_id = l.id)
            or exists (select 1 from public.module_states_for((select auth.uid())) s where s.module_id = l.module_id and s.unlocked)
         ))
    )
  );
$$;

-- Why a lesson is or is not available to the current user (for clear messages in the UI).
create or replace function public.lesson_access_state(_lesson uuid)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare l record; prev smallint;
begin
  select le.*, mo.number as module_number into l from public.lessons le join public.modules mo on mo.id = le.module_id where le.id = _lesson;
  if not found or not l.published then return jsonb_build_object('state', 'unavailable'); end if;
  if public.can_access_lesson(_lesson) then return jsonb_build_object('state', 'open'); end if;
  if (select auth.uid()) is null or not public.is_enrolled() then return jsonb_build_object('state', 'not_enrolled'); end if;
  select max(number) into prev from public.modules where published and number < l.module_number;
  return jsonb_build_object('state', 'locked', 'requires_module', prev);
end $$;

-- ── Administrator actions (MFA-verified roles; every action is logged) ──
create or replace function public.admin_create_cohort(_name text, _starts_on date, _notes text default null)
returns uuid language plpgsql security definer set search_path = '' as $$
declare cid uuid;
begin
  if not public.is_learner_admin() then raise exception 'access denied' using errcode = '42501'; end if;
  insert into public.cohorts (name, starts_on, notes, created_by) values (trim(_name), _starts_on, nullif(trim(_notes), ''), (select auth.uid()))
  returning id into cid;
  perform public.log_event('cohort.created', 'cohort', cid::text, jsonb_build_object('name', trim(_name), 'starts_on', _starts_on));
  return cid;
end $$;

create or replace function public.admin_enrol(_email text, _cohort uuid default null)
returns bigint language plpgsql security definer set search_path = '' as $$
declare uid uuid; eid bigint;
begin
  if not public.is_learner_admin() then raise exception 'access denied' using errcode = '42501'; end if;
  select id into uid from auth.users where lower(email) = lower(trim(_email));
  if uid is null then raise exception 'no account exists for this email address; the learner must register first' using errcode = 'P0002'; end if;
  if exists (select 1 from public.enrollments where user_id = uid and status = 'active') then
    raise exception 'this learner already has an active enrolment' using errcode = '23505';
  end if;
  insert into public.enrollments (user_id, status, cohort_id, cohort, starts_on, granted_by)
  values (uid, 'active', _cohort, (select name from public.cohorts where id = _cohort), (select starts_on from public.cohorts where id = _cohort), (select auth.uid()))
  returning id into eid;
  perform public.log_event('enrolment.created', 'enrolment', eid::text, jsonb_build_object('learner', uid, 'cohort', _cohort));
  return eid;
end $$;

create or replace function public.admin_set_enrolment(_enrolment bigint, _status public.enrollment_status, _cohort uuid default null)
returns void language plpgsql security definer set search_path = '' as $$
declare e record;
begin
  if not public.is_learner_admin() then raise exception 'access denied' using errcode = '42501'; end if;
  select * into e from public.enrollments where id = _enrolment;
  if not found then raise exception 'enrolment not found' using errcode = 'P0002'; end if;
  if _status = 'active' and e.status <> 'active'
     and exists (select 1 from public.enrollments where user_id = e.user_id and status = 'active' and id <> _enrolment) then
    raise exception 'this learner already has another active enrolment' using errcode = '23505';
  end if;
  update public.enrollments set status = _status,
    cohort_id = coalesce(_cohort, cohort_id),
    cohort = coalesce((select name from public.cohorts where id = _cohort), cohort),
    starts_on = coalesce((select starts_on from public.cohorts where id = _cohort), starts_on)
  where id = _enrolment;
  perform public.log_event('enrolment.updated', 'enrolment', _enrolment::text, jsonb_build_object('learner', e.user_id, 'status', _status, 'cohort', _cohort));
end $$;

create or replace function public.admin_unlock_module(_user uuid, _module uuid, _reason text)
returns bigint language plpgsql security definer set search_path = '' as $$
declare uid bigint;
begin
  if not public.is_learner_admin() then raise exception 'access denied' using errcode = '42501'; end if;
  if char_length(trim(coalesce(_reason, ''))) < 5 then raise exception 'a reason is required' using errcode = '22023'; end if;
  insert into public.module_unlocks (user_id, module_id, reason, granted_by) values (_user, _module, trim(_reason), (select auth.uid()))
  returning id into uid;
  perform public.log_event('module.unlocked', 'module', _module::text, jsonb_build_object('learner', _user, 'reason', trim(_reason)));
  return uid;
end $$;

create or replace function public.admin_revoke_unlock(_unlock bigint)
returns void language plpgsql security definer set search_path = '' as $$
declare u record;
begin
  if not public.is_learner_admin() then raise exception 'access denied' using errcode = '42501'; end if;
  update public.module_unlocks set revoked_at = now(), revoked_by = (select auth.uid())
  where id = _unlock and revoked_at is null returning * into u;
  if not found then raise exception 'active unlock not found' using errcode = 'P0002'; end if;
  perform public.log_event('module.unlock_revoked', 'module', u.module_id::text, jsonb_build_object('learner', u.user_id));
end $$;

-- Learner list for administrators (email comes from the authentication schema).
create or replace function public.admin_learners()
returns table (user_id uuid, email text, name text, country text, specialty text, registered_at timestamptz,
               enrolment_id bigint, enrolment_status public.enrollment_status, cohort_id uuid, cohort_name text,
               completed_items integer, last_activity timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_learner_admin() then raise exception 'access denied' using errcode = '42501'; end if;
  return query
  select p.id, u.email::text, concat_ws(' ', p.title, p.first_name, p.last_name), p.country, p.specialty, p.created_at,
         e.id, e.status, e.cohort_id, c.name,
         (select count(*)::int from public.lesson_progress lp where lp.user_id = p.id and lp.status = 'completed'),
         (select max(lp.updated_at) from public.lesson_progress lp where lp.user_id = p.id)
  from public.profiles p
  join auth.users u on u.id = p.id
  left join lateral (select * from public.enrollments en where en.user_id = p.id order by (en.status = 'active') desc, en.created_at desc limit 1) e on true
  left join public.cohorts c on c.id = e.cohort_id
  where not exists (select 1 from public.user_roles r where r.user_id = p.id and r.role <> 'student')
  order by p.created_at desc;
end $$;

do $$ declare f text; begin
  foreach f in array array[
    'public.module_completed_by(uuid, uuid)', 'public.module_states_for(uuid)'] loop
    execute format('revoke all on function %s from public, anon, authenticated', f);
  end loop;
  foreach f in array array[
    'public.module_states(uuid)', 'public.lesson_access_state(uuid)', 'public.admin_create_cohort(text, date, text)',
    'public.admin_enrol(text, uuid)', 'public.admin_set_enrolment(bigint, public.enrollment_status, uuid)',
    'public.admin_unlock_module(uuid, uuid, text)', 'public.admin_revoke_unlock(bigint)', 'public.admin_learners()'] loop
    execute format('revoke all on function %s from public, anon', f);
    execute format('grant execute on function %s to authenticated', f);
  end loop;
end $$;
