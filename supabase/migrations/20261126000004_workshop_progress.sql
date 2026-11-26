-- ═══════════════════════════════════════════════════════════════════
-- Workshop progress (approved W1 template). Learners can pause, repeat
-- and resume: every step is saved as a draft or marked complete.
-- Steps unlock after the Readiness Check is passed.
-- ═══════════════════════════════════════════════════════════════════

create table public.workshop_progress (
  user_id       uuid not null references auth.users (id) on delete cascade,
  lesson_id     uuid not null references public.lessons (id) on delete cascade,
  step_key      text not null check (step_key in ('briefing','round1','stationA','round2','stationB','stationC','round3','debrief')),
  data          jsonb not null default '{}'::jsonb check (pg_column_size(data) < 20000),
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),
  primary key (user_id, lesson_id, step_key)
);

alter table public.workshop_progress enable row level security;
create policy "workshop: read own" on public.workshop_progress for select to authenticated using (user_id = (select auth.uid()));
create policy "workshop: staff read" on public.workshop_progress for select to authenticated using (public.is_teaching_staff());
revoke all on public.workshop_progress from anon, authenticated;
grant select on public.workshop_progress to authenticated;

create or replace function public.save_workshop_step(_lesson uuid, _step text, _data jsonb, _complete boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare k public.lesson_kind;
begin
  if not public.can_access_lesson(_lesson) then raise exception 'access denied' using errcode = '42501'; end if;
  select kind into k from public.lessons where id = _lesson;
  if k <> 'workshop' then raise exception 'not a workshop' using errcode = '22023'; end if;
  if not exists (select 1 from public.quiz_attempts where user_id = (select auth.uid()) and lesson_id = _lesson and passed) then
    raise exception 'readiness check not passed' using errcode = '42501';
  end if;
  if jsonb_typeof(coalesce(_data, '{}'::jsonb)) <> 'object' then raise exception 'invalid data' using errcode = '22023'; end if;
  perform public.start_lesson(_lesson);
  insert into public.workshop_progress (user_id, lesson_id, step_key, data, completed_at)
  values ((select auth.uid()), _lesson, _step, coalesce(_data, '{}'::jsonb), case when _complete then now() end)
  on conflict (user_id, lesson_id, step_key) do update
    set data = excluded.data,
        completed_at = case when _complete then coalesce(public.workshop_progress.completed_at, now()) else public.workshop_progress.completed_at end,
        updated_at = now();
end $$;

-- Requirements now include the three practice rounds for workshops.
create or replace function public.lesson_requirements(_lesson uuid)
returns text[] language plpgsql stable security definer set search_path = '' as $$
declare
  uid uuid := (select auth.uid()); c record; missing text[] := '{}'; l record;
begin
  select * into l from public.lessons where id = _lesson;
  select * into c from public.lesson_content where lesson_id = _lesson;
  if l.content_status = 'in_preparation' then missing := array_append(missing, 'content_in_preparation'); end if;
  if c.exercise is not null and not exists (select 1 from public.lesson_progress where user_id = uid and lesson_id = _lesson and exercise_done_at is not null) then
    missing := array_append(missing, 'exercise');
  end if;
  if exists (select 1 from public.quiz_questions where lesson_id = _lesson)
     and not exists (select 1 from public.quiz_attempts where user_id = uid and lesson_id = _lesson and passed) then
    missing := array_append(missing, 'quiz');
  end if;
  if l.kind = 'workshop' and c.body ? 'workshop'
     and (select count(*) from public.workshop_progress where user_id = uid and lesson_id = _lesson
          and step_key in ('round1','round2','round3') and completed_at is not null) < 3 then
    missing := array_append(missing, 'practice_rounds');
  end if;
  if coalesce((c.assignment ->> 'required')::boolean, false)
     and not exists (select 1 from public.assignment_submissions where user_id = uid and lesson_id = _lesson) then
    missing := array_append(missing, 'assignment');
  end if;
  return missing;
end $$;

revoke all on function public.save_workshop_step(uuid, text, jsonb, boolean) from public, anon, authenticated;
grant execute on function public.save_workshop_step(uuid, text, jsonb, boolean) to authenticated;
revoke all on function public.lesson_requirements(uuid) from public, anon;
grant execute on function public.lesson_requirements(uuid) to authenticated;
