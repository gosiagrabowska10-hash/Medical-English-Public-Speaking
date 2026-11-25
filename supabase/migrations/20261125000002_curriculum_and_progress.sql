-- ═══════════════════════════════════════════════════════════════════
-- Stage 3: curriculum content (admin-managed) and student learning
-- progress. Content is editable by content staff without redeploying.
-- Student progress changes only through validated functions.
-- ═══════════════════════════════════════════════════════════════════

create type public.lesson_kind as enum ('lesson', 'workshop');
create type public.video_status as enum ('not_recorded', 'sample', 'published');
create type public.content_status as enum ('in_preparation', 'sample', 'ready');
create type public.progress_status as enum ('not_started', 'in_progress', 'completed');
create type public.submission_status as enum ('submitted', 'needs_revision', 'approved');
create type public.enrollment_status as enum ('active', 'paused', 'completed', 'cancelled');

-- ── Enrolment (granted by staff now; by verified Stripe webhook in Stage 7) ──
create table public.enrollments (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  status      public.enrollment_status not null default 'active',
  cohort      text,
  starts_on   date,
  granted_by  uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now()
);
create unique index enrollments_one_active on public.enrollments (user_id) where status = 'active';

create or replace function public.is_enrolled()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.enrollments where user_id = (select auth.uid()) and status = 'active');
$$;

create or replace function public.is_content_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_roles where user_id = (select auth.uid())
    and role in ('content_editor', 'academic_director', 'academy_owner'));
$$;

create or replace function public.is_teaching_staff()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_roles where user_id = (select auth.uid())
    and role in ('instructor', 'assessor', 'student_support', 'content_editor', 'academic_director', 'academy_owner'));
$$;

-- ── Syllabus (public: titles, durations, structure) ─────────────────
create table public.modules (
  id          uuid primary key default gen_random_uuid(),
  number      smallint not null unique check (number between 1 and 99),
  slug        text not null unique,
  title       text not null,
  weeks_label text not null,
  summary     text not null,
  outcomes    text[] not null default '{}',
  published   boolean not null default true,
  updated_at  timestamptz not null default now()
);

create table public.lessons (
  id                uuid primary key default gen_random_uuid(),
  module_id         uuid not null references public.modules (id) on delete restrict,
  code              text not null unique check (code ~ '^(L\d{2}|W\d)$'),
  kind              public.lesson_kind not null default 'lesson',
  slug              text not null unique,
  title             text not null,
  summary           text not null,
  duration_minutes  smallint not null check (duration_minutes between 5 and 600),
  week              smallint not null check (week between 1 and 10),
  position          smallint not null,
  is_mandatory      boolean not null default true,
  is_preview        boolean not null default false,
  published         boolean not null default true,
  video_status      public.video_status not null default 'not_recorded',
  content_status    public.content_status not null default 'in_preparation',
  ai_teacher        text,
  updated_at        timestamptz not null default now(),
  unique (module_id, position)
);
create index lessons_module_idx on public.lessons (module_id, position);

-- ── Protected lesson content ────────────────────────────────────────
create table public.lesson_content (
  lesson_id     uuid primary key references public.lessons (id) on delete cascade,
  body          jsonb not null default '{}'::jsonb,   -- intro, objectives, sections, examples, demonstration, mistakes, reflection, completion
  exercise      jsonb,                               -- { title, instructions, prompt, min_chars }
  assignment    jsonb,                               -- { title, brief, min_words, required }
  video_url     text,
  captions_url  text,
  video_note    text,
  updated_at    timestamptz not null default now()
);

create table public.quiz_questions (
  id             uuid primary key default gen_random_uuid(),
  lesson_id      uuid not null references public.lessons (id) on delete cascade,
  position       smallint not null,
  prompt         text not null,
  options        text[] not null check (array_length(options, 1) between 2 and 6),
  correct_index  smallint not null,
  explanation    text not null,
  unique (lesson_id, position),
  check (correct_index >= 0 and correct_index < array_length(options, 1))
);

create table public.lesson_resources (
  id          uuid primary key default gen_random_uuid(),
  lesson_id   uuid not null references public.lessons (id) on delete cascade,
  position    smallint not null default 1,
  title       text not null,
  description text,
  file_url    text not null,
  file_type   text not null default 'pdf',
  is_sample   boolean not null default false
);

create trigger modules_updated before update on public.modules for each row execute function public.set_updated_at();
create trigger lessons_updated before update on public.lessons for each row execute function public.set_updated_at();
create trigger lesson_content_updated before update on public.lesson_content for each row execute function public.set_updated_at();

create or replace function public.can_access_lesson(_lesson uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.lessons l
    where l.id = _lesson and (
      public.is_content_staff() or public.is_teaching_staff()
      or (l.published and (l.is_preview or public.is_enrolled()))
    )
  );
$$;

-- Quiz questions without answers, for students with access.
create view public.quiz_questions_public as
  select id, lesson_id, position, prompt, options
  from public.quiz_questions
  where public.can_access_lesson(lesson_id);

-- ── Student learning records ────────────────────────────────────────
create table public.lesson_progress (
  user_id            uuid not null references auth.users (id) on delete cascade,
  lesson_id          uuid not null references public.lessons (id) on delete cascade,
  status             public.progress_status not null default 'in_progress',
  video_position_s   integer not null default 0 check (video_position_s >= 0),
  exercise_response  text check (char_length(exercise_response) <= 10000),
  exercise_done_at   timestamptz,
  started_at         timestamptz not null default now(),
  completed_at       timestamptz,
  updated_at         timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.quiz_attempts (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  lesson_id   uuid not null references public.lessons (id) on delete cascade,
  answers     smallint[] not null,
  score       smallint not null,
  total       smallint not null,
  passed      boolean not null,
  created_at  timestamptz not null default now()
);
create index quiz_attempts_user_lesson on public.quiz_attempts (user_id, lesson_id, created_at desc);

create table public.assignment_submissions (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users (id) on delete cascade,
  lesson_id    uuid not null references public.lessons (id) on delete cascade,
  body         text not null check (char_length(body) between 1 and 20000),
  status       public.submission_status not null default 'submitted',
  feedback     text,
  reviewed_by  uuid references auth.users (id) on delete set null,
  submitted_at timestamptz not null default now(),
  reviewed_at  timestamptz,
  unique (user_id, lesson_id)
);

-- ── Learning functions (the only way students change progress) ──────
create or replace function public.start_lesson(_lesson uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if (select auth.uid()) is null or not public.can_access_lesson(_lesson) then
    raise exception 'access denied' using errcode = '42501';
  end if;
  insert into public.lesson_progress (user_id, lesson_id) values ((select auth.uid()), _lesson)
  on conflict (user_id, lesson_id) do nothing;
end $$;

create or replace function public.save_video_position(_lesson uuid, _seconds integer)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not public.can_access_lesson(_lesson) then raise exception 'access denied' using errcode = '42501'; end if;
  update public.lesson_progress set video_position_s = greatest(0, least(_seconds, 36000)), updated_at = now()
  where user_id = (select auth.uid()) and lesson_id = _lesson;
end $$;

create or replace function public.save_exercise(_lesson uuid, _response text)
returns void language plpgsql security definer set search_path = '' as $$
declare min_chars int;
begin
  if not public.can_access_lesson(_lesson) then raise exception 'access denied' using errcode = '42501'; end if;
  select coalesce((exercise ->> 'min_chars')::int, 1) into min_chars from public.lesson_content where lesson_id = _lesson;
  if min_chars is null then raise exception 'this lesson has no exercise' using errcode = '22023'; end if;
  if char_length(trim(coalesce(_response, ''))) < min_chars then
    raise exception 'response too short: at least % characters', min_chars using errcode = '22023';
  end if;
  perform public.start_lesson(_lesson);
  update public.lesson_progress
     set exercise_response = left(_response, 10000), exercise_done_at = coalesce(exercise_done_at, now()), updated_at = now()
   where user_id = (select auth.uid()) and lesson_id = _lesson;
end $$;

-- Scores on the server; returns per-question feedback.
create or replace function public.submit_quiz(_lesson uuid, _answers smallint[])
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  q record; s int := 0; t int := 0; fb jsonb := '[]'::jsonb; passed boolean;
begin
  if not public.can_access_lesson(_lesson) then raise exception 'access denied' using errcode = '42501'; end if;
  for q in select * from public.quiz_questions where lesson_id = _lesson order by position loop
    t := t + 1;
    if _answers[t] = q.correct_index then s := s + 1; end if;
    fb := fb || jsonb_build_object('position', q.position, 'correct', _answers[t] = q.correct_index,
                                   'correct_index', q.correct_index, 'explanation', q.explanation);
  end loop;
  if t = 0 then raise exception 'this lesson has no quiz' using errcode = '22023'; end if;
  if coalesce(array_length(_answers, 1), 0) <> t then raise exception 'please answer every question' using errcode = '22023'; end if;
  passed := s * 10 >= t * 7;  -- pass mark 70%
  perform public.start_lesson(_lesson);
  insert into public.quiz_attempts (user_id, lesson_id, answers, score, total, passed)
  values ((select auth.uid()), _lesson, _answers, s, t, passed);
  return jsonb_build_object('score', s, 'total', t, 'passed', passed, 'feedback', fb);
end $$;

create or replace function public.submit_assignment(_lesson uuid, _body text)
returns void language plpgsql security definer set search_path = '' as $$
declare min_words int; words int;
begin
  if not public.can_access_lesson(_lesson) then raise exception 'access denied' using errcode = '42501'; end if;
  select (assignment ->> 'min_words')::int into min_words from public.lesson_content where lesson_id = _lesson and assignment is not null;
  if not found then raise exception 'this lesson has no assignment' using errcode = '22023'; end if;
  words := coalesce(array_length(regexp_split_to_array(trim(coalesce(_body, '')), '\s+'), 1), 0);
  if trim(coalesce(_body, '')) = '' or words < coalesce(min_words, 1) then
    raise exception 'assignment too short: at least % words', coalesce(min_words, 1) using errcode = '22023';
  end if;
  perform public.start_lesson(_lesson);
  insert into public.assignment_submissions (user_id, lesson_id, body)
  values ((select auth.uid()), _lesson, left(_body, 20000))
  on conflict (user_id, lesson_id) do update
    set body = excluded.body, submitted_at = now(), status = 'submitted'
    where public.assignment_submissions.status <> 'approved';
end $$;

-- Lists what is still missing before a lesson can be completed.
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
  if coalesce((c.assignment ->> 'required')::boolean, false)
     and not exists (select 1 from public.assignment_submissions where user_id = uid and lesson_id = _lesson) then
    missing := array_append(missing, 'assignment');
  end if;
  return missing;
end $$;

create or replace function public.complete_lesson(_lesson uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare missing text[];
begin
  if not public.can_access_lesson(_lesson) then raise exception 'access denied' using errcode = '42501'; end if;
  missing := public.lesson_requirements(_lesson);
  if array_length(missing, 1) > 0 then
    return jsonb_build_object('completed', false, 'missing', to_jsonb(missing));
  end if;
  perform public.start_lesson(_lesson);
  update public.lesson_progress set status = 'completed', completed_at = coalesce(completed_at, now()), updated_at = now()
   where user_id = (select auth.uid()) and lesson_id = _lesson;
  insert into public.audit_log (actor_id, action, entity, entity_id) values ((select auth.uid()), 'lesson.completed', 'lesson', _lesson::text);
  return jsonb_build_object('completed', true, 'missing', '[]'::jsonb);
end $$;

-- ═══════════════════════════════════════════════════════════════════
-- Row Level Security
-- ═══════════════════════════════════════════════════════════════════
alter table public.enrollments enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_content enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.lesson_resources enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.assignment_submissions enable row level security;

create policy "enrollments: read own" on public.enrollments for select to authenticated using (user_id = (select auth.uid()));
create policy "enrollments: staff read" on public.enrollments for select to authenticated
  using (public.has_any_role(array['student_support','academic_director','academy_owner']::public.app_role[]));
create policy "enrollments: staff manage" on public.enrollments for all to authenticated
  using (public.has_any_role(array['student_support','academy_owner']::public.app_role[]))
  with check (public.has_any_role(array['student_support','academy_owner']::public.app_role[]));

-- Syllabus is public; drafts only for content staff.
create policy "modules: public read" on public.modules for select to anon using (published);
create policy "modules: member read" on public.modules for select to authenticated using (published or public.is_content_staff());
create policy "modules: staff write" on public.modules for all to authenticated using (public.is_content_staff()) with check (public.is_content_staff());
create policy "lessons: public read" on public.lessons for select to anon using (published);
create policy "lessons: member read" on public.lessons for select to authenticated using (published or public.is_content_staff());
create policy "lessons: staff write" on public.lessons for all to authenticated using (public.is_content_staff()) with check (public.is_content_staff());

create policy "content: enrolled read" on public.lesson_content for select to authenticated using (public.can_access_lesson(lesson_id));
create policy "content: staff write" on public.lesson_content for all to authenticated using (public.is_content_staff()) with check (public.is_content_staff());
create policy "resources: enrolled read" on public.lesson_resources for select to authenticated using (public.can_access_lesson(lesson_id));
create policy "resources: staff write" on public.lesson_resources for all to authenticated using (public.is_content_staff()) with check (public.is_content_staff());
-- Answer keys: content staff only. Students use quiz_questions_public + submit_quiz().
create policy "quiz: staff all" on public.quiz_questions for all to authenticated using (public.is_content_staff()) with check (public.is_content_staff());

create policy "progress: read own" on public.lesson_progress for select to authenticated using (user_id = (select auth.uid()));
create policy "progress: staff read" on public.lesson_progress for select to authenticated using (public.is_teaching_staff());
create policy "attempts: read own" on public.quiz_attempts for select to authenticated using (user_id = (select auth.uid()));
create policy "attempts: staff read" on public.quiz_attempts for select to authenticated using (public.is_teaching_staff());
create policy "submissions: read own" on public.assignment_submissions for select to authenticated using (user_id = (select auth.uid()));
create policy "submissions: staff read" on public.assignment_submissions for select to authenticated using (public.is_teaching_staff());
create policy "submissions: staff review" on public.assignment_submissions for update to authenticated
  using (public.has_any_role(array['instructor','assessor','academic_director','academy_owner']::public.app_role[]));

-- ── Privileges (Supabase defaults revoked; grant only what is needed) ──
revoke all on public.enrollments, public.modules, public.lessons, public.lesson_content, public.quiz_questions,
  public.lesson_resources, public.lesson_progress, public.quiz_attempts, public.assignment_submissions,
  public.quiz_questions_public from anon, authenticated;

grant select on public.modules, public.lessons to anon, authenticated;
grant insert, update, delete on public.modules, public.lessons, public.lesson_content, public.lesson_resources, public.quiz_questions to authenticated; -- RLS: content staff only
grant select on public.lesson_content, public.lesson_resources, public.quiz_questions, public.quiz_questions_public to authenticated;
grant select on public.lesson_progress, public.quiz_attempts, public.assignment_submissions to authenticated;
grant update (status, feedback, reviewed_by, reviewed_at) on public.assignment_submissions to authenticated; -- RLS: reviewers only
grant select, insert, update, delete on public.enrollments to authenticated; -- RLS: own read; staff manage

revoke all on function public.is_enrolled(), public.is_content_staff(), public.is_teaching_staff(), public.can_access_lesson(uuid),
  public.start_lesson(uuid), public.save_video_position(uuid, integer), public.save_exercise(uuid, text),
  public.submit_quiz(uuid, smallint[]), public.submit_assignment(uuid, text), public.lesson_requirements(uuid),
  public.complete_lesson(uuid) from public, anon, authenticated;
grant execute on function public.is_enrolled(), public.is_content_staff(), public.is_teaching_staff(), public.can_access_lesson(uuid),
  public.start_lesson(uuid), public.save_video_position(uuid, integer), public.save_exercise(uuid, text),
  public.submit_quiz(uuid, smallint[]), public.submit_assignment(uuid, text), public.lesson_requirements(uuid),
  public.complete_lesson(uuid) to authenticated;
