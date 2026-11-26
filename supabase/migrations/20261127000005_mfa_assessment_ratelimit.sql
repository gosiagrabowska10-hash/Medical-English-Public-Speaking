-- 0005 · Staff MFA enforcement, instructor-confirmed workshop competence, rate limiting.
-- Audit references: SEC-09 (staff MFA), EDU-03 / W1 Quality Gate F1 (two statuses), SEC-08 (rate limiting).

-- ── Staff MFA: every staff privilege requires an aal2 (MFA-verified) session ──
create or replace function public.is_mfa_verified()
returns boolean language sql stable set search_path = '' as $$
  select coalesce((select auth.jwt()) ->> 'aal', 'aal1') = 'aal2';
$$;
revoke all on function public.is_mfa_verified() from public;
grant execute on function public.is_mfa_verified() to authenticated;

-- The student role needs no MFA; any staff role is effective only in an MFA-verified session.
create or replace function public.has_role(_role public.app_role)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = _role
      and (role = 'student' or public.is_mfa_verified())
  );
$$;

create or replace function public.has_any_role(_roles public.app_role[])
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = any (_roles)
      and (role = 'student' or public.is_mfa_verified())
  );
$$;

create or replace function public.is_content_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select public.is_mfa_verified() and exists (select 1 from public.user_roles where user_id = (select auth.uid())
    and role in ('content_editor', 'academic_director', 'academy_owner'));
$$;

create or replace function public.is_teaching_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select public.is_mfa_verified() and exists (select 1 from public.user_roles where user_id = (select auth.uid())
    and role in ('instructor', 'assessor', 'student_support', 'content_editor', 'academic_director', 'academy_owner'));
$$;

-- ── Workshop competence: confirmed only by an instructor or assessor ──
-- "Workshop completed" = all activities + Final Task (lesson_progress.completed_at).
-- "Competent" = a staff assessment against the rubric. Self-assessment never sets it.
create type public.rubric_level as enum ('beginning', 'developing', 'competent');
-- How the assessor observed the performance. Recordings are never uploaded before Phase 4
-- privacy requirements are met, so assessment is based on live observation only.
create type public.assessment_basis as enum ('live_session', 'recording_shown_live');

create table public.workshop_assessments (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  lesson_id   uuid not null references public.lessons (id) on delete cascade,
  assessor_id uuid references auth.users (id) on delete set null,
  basis       public.assessment_basis not null,
  levels      public.rubric_level[] not null,
  competent   boolean not null,
  comment     text not null check (char_length(comment) between 20 and 4000),
  assessed_at timestamptz not null default now(),
  check (assessor_id is distinct from user_id)
);
create index workshop_assessments_learner on public.workshop_assessments (user_id, lesson_id, assessed_at desc);
alter table public.workshop_assessments enable row level security;
create policy "assessments: read own" on public.workshop_assessments for select to authenticated using (user_id = (select auth.uid()));
create policy "assessments: staff read" on public.workshop_assessments for select to authenticated using (public.is_teaching_staff());
revoke all on public.workshop_assessments from anon, authenticated;
grant select on public.workshop_assessments to authenticated;

create or replace function public.record_workshop_assessment(_user uuid, _lesson uuid, _basis public.assessment_basis, _levels public.rubric_level[], _comment text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  c record; n_criteria int; rule jsonb; n_comp int; req int; ok boolean := true; res boolean;
begin
  if not public.has_any_role(array['instructor','assessor','academic_director','academy_owner']::public.app_role[]) then
    raise exception 'only instructors and assessors with MFA can record assessments' using errcode = '42501';
  end if;
  if _user = (select auth.uid()) then raise exception 'staff cannot assess themselves' using errcode = '42501'; end if;
  select lc.body into c from public.lesson_content lc join public.lessons l on l.id = lc.lesson_id
    where lc.lesson_id = _lesson and l.kind = 'workshop';
  if not found or c.body -> 'workshop' -> 'rubric' is null then raise exception 'not a workshop with a rubric' using errcode = '22023'; end if;
  n_criteria := jsonb_array_length(c.body -> 'workshop' -> 'rubric');
  if coalesce(array_length(_levels, 1), 0) <> n_criteria or array_position(_levels, null) is not null then
    raise exception 'a level is required for each of the % criteria', n_criteria using errcode = '22023';
  end if;
  if not exists (select 1 from public.assignment_submissions where user_id = _user and lesson_id = _lesson) then
    raise exception 'the learner has not submitted the Final Task' using errcode = '22023';
  end if;
  rule := coalesce(c.body -> 'workshop' -> 'competence', '{"min": 0, "required": []}'::jsonb);
  select count(*) into n_comp from unnest(_levels) v where v = 'competent';
  for req in select (jsonb_array_elements_text(rule -> 'required'))::int loop
    if _levels[req] is distinct from 'competent' then ok := false; end if;
  end loop;
  res := ok and n_comp >= coalesce((rule ->> 'min')::int, n_criteria);
  insert into public.workshop_assessments (user_id, lesson_id, assessor_id, basis, levels, competent, comment)
    values (_user, _lesson, (select auth.uid()), _basis, _levels, res, trim(_comment));
  update public.assignment_submissions set status = case when res then 'approved' else 'needs_revision' end::public.submission_status,
    reviewed_by = (select auth.uid()), reviewed_at = now(), feedback = trim(_comment)
    where user_id = _user and lesson_id = _lesson;
  perform public.log_event('workshop.assessed', 'lesson', _lesson::text, jsonb_build_object('learner', _user, 'competent', res));
  return jsonb_build_object('competent', res, 'competent_criteria', n_comp);
end $$;
revoke all on function public.record_workshop_assessment(uuid, uuid, public.assessment_basis, public.rubric_level[], text) from public, anon;
grant execute on function public.record_workshop_assessment(uuid, uuid, public.assessment_basis, public.rubric_level[], text) to authenticated;

-- ── Rate limiting (fixed window, keyed by a salted hash; no raw IP addresses stored) ──
create table public.rate_limits (
  bucket       text primary key check (bucket ~ '^[a-z_]{3,20}:[0-9a-f]{64}$'),
  window_start timestamptz not null default now(),
  hits         int not null default 0
);
alter table public.rate_limits enable row level security;
revoke all on public.rate_limits from anon, authenticated;

create or replace function public.rate_limit_hit(_bucket text, _max int, _window_seconds int)
returns boolean language plpgsql security definer set search_path = '' as $$
declare h int;
begin
  if _bucket !~ '^[a-z_]{3,20}:[0-9a-f]{64}$' or _max not between 1 and 1000 or _window_seconds not between 10 and 86400 then
    raise exception 'invalid rate limit request' using errcode = '22023';
  end if;
  insert into public.rate_limits as r (bucket, window_start, hits) values (_bucket, now(), 1)
  on conflict (bucket) do update set
    hits = case when r.window_start < now() - make_interval(secs => _window_seconds) then 1 else r.hits + 1 end,
    window_start = case when r.window_start < now() - make_interval(secs => _window_seconds) then now() else r.window_start end
  returning hits into h;
  if random() < 0.02 then delete from public.rate_limits where window_start < now() - interval '2 days'; end if;
  return h <= _max;
end $$;
revoke all on function public.rate_limit_hit(text, int, int) from public;
grant execute on function public.rate_limit_hit(text, int, int) to anon, authenticated;

-- ── Audit trail of role changes (who granted or removed which staff role) ──
create or replace function public.audit_role_change()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.audit_log (actor_id, action, entity, entity_id, metadata)
  values ((select auth.uid()),
          case when tg_op = 'INSERT' then 'role.granted' else 'role.revoked' end,
          'user_roles', coalesce(new.user_id, old.user_id)::text,
          jsonb_build_object('role', coalesce(new.role, old.role)));
  return coalesce(new, old);
end $$;
revoke all on function public.audit_role_change() from public, anon, authenticated;
create trigger user_roles_audit after insert or delete on public.user_roles
  for each row execute function public.audit_role_change();
