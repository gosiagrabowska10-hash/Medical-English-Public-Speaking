-- Progression, enrolment administration and module-unlock overrides (migration 0006).
--   Runs after the migrations on a fresh database (see run_local.sh).
\set QUIET on
set client_min_messages = warning;
create or replace function pg_temp.act_as(_uid uuid, _aal text default 'aal1') returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', _uid, 'role', 'authenticated', 'aal', _aal)::text, false);
  execute 'set role authenticated';
end $$;
create or replace function pg_temp.check(_ok boolean, _name text) returns void language plpgsql as $$
begin
  if not coalesce(_ok, false) then raise exception 'FAIL: %', _name; end if;
  raise notice 'PASS: %', _name;
end $$;
create or replace function pg_temp.lesson(_code text) returns uuid language sql as $$ select id from public.lessons where code = _code $$;
create or replace function pg_temp.module_of(_code text) returns uuid language sql as $$ select module_id from public.lessons where code = _code $$;

reset role;
insert into auth.users (id, email, raw_user_meta_data) values
  ('aaaaaaaa-0000-0000-0000-000000000001', 'learner@example.org', '{"first_name":"Lea","last_name":"Learner","accepted_terms":true}'),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'other@example.org',   '{"first_name":"Oto","last_name":"Other","accepted_terms":true}'),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'support@example.org', '{"first_name":"Sue","last_name":"Support","accepted_terms":true}'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'teacher@example.org', '{"first_name":"Ian","last_name":"Instructor","accepted_terms":true}');
insert into public.user_roles (user_id, role) values
  ('aaaaaaaa-0000-0000-0000-000000000003', 'student_support'),
  ('aaaaaaaa-0000-0000-0000-000000000004', 'instructor');
set client_min_messages = notice;

-- Enrolment administration
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000001');
do $$ begin perform public.admin_enrol('learner@example.org'); raise exception 'FAIL: learner enrolled themselves';
exception when insufficient_privilege then raise notice 'PASS: learners cannot enrol anyone'; end $$;
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000003');
do $$ begin perform public.admin_enrol('learner@example.org'); raise exception 'FAIL: support enrolled without MFA';
exception when insufficient_privilege then raise notice 'PASS: student support cannot enrol without MFA'; end $$;
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000004', 'aal2');
do $$ begin perform public.admin_enrol('learner@example.org'); raise exception 'FAIL: instructor enrolled';
exception when insufficient_privilege then raise notice 'PASS: instructors cannot manage enrolments'; end $$;
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000003', 'aal2');
select pg_temp.check(public.admin_create_cohort('Test cohort A', '2027-03-01') is not null, 'student support with MFA creates a cohort');
select pg_temp.check(public.admin_enrol('LEARNER@example.org', (select id from public.cohorts where name = 'Test cohort A')) is not null, 'student support with MFA enrols a learner by email (case-insensitive)');
do $$ begin perform public.admin_enrol('learner@example.org'); raise exception 'FAIL: duplicate active enrolment';
exception when unique_violation then raise notice 'PASS: a second active enrolment is refused'; end $$;
do $$ begin perform public.admin_enrol('nobody@example.org'); raise exception 'FAIL: enrolled unknown email';
exception when no_data_found then raise notice 'PASS: enrolment requires an existing account'; end $$;
select pg_temp.check((select count(*) = 1 from public.admin_learners() where email = 'learner@example.org' and enrolment_status = 'active' and cohort_name = 'Test cohort A'), 'learner list shows enrolment and cohort');
select pg_temp.check((select count(*) = 0 from public.admin_learners() where email = 'support@example.org'), 'learner list excludes staff accounts');

-- Progressive unlocking
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000001');
select pg_temp.check(public.can_access_lesson(pg_temp.lesson('L02')), 'module 1 is open to an enrolled learner');
select pg_temp.check(not public.can_access_lesson(pg_temp.lesson('L07')), 'module 3 is locked before earlier modules are completed');
select pg_temp.check((public.lesson_access_state(pg_temp.lesson('L07')) ->> 'state') = 'locked', 'locked lesson reports the locked state');
do $$ begin perform public.start_lesson(pg_temp.lesson('L07')); raise exception 'FAIL: started locked lesson';
exception when insufficient_privilege then raise notice 'PASS: a locked lesson cannot be started through the API'; end $$;
select pg_temp.check((select unlocked from public.module_states() where number = 1) and not (select unlocked from public.module_states() where number = 3), 'module states report open and locked modules');
do $$ begin perform * from public.module_states('aaaaaaaa-0000-0000-0000-000000000002'); raise exception 'FAIL: read other states';
exception when insufficient_privilege then raise notice 'PASS: learners cannot read another learner''s module states'; end $$;
do $$ begin perform public.admin_unlock_module(auth.uid(), pg_temp.module_of('L07'), 'Trying to unlock myself'); raise exception 'FAIL: self unlock';
exception when insufficient_privilege then raise notice 'PASS: learners cannot unlock modules'; end $$;

-- Administrator override
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000003', 'aal2');
do $$ begin perform public.admin_unlock_module('aaaaaaaa-0000-0000-0000-000000000001', pg_temp.module_of('L07'), 'no'); raise exception 'FAIL: unlock without reason';
exception when invalid_parameter_value then raise notice 'PASS: an unlock requires a reason'; end $$;
select pg_temp.check(public.admin_unlock_module('aaaaaaaa-0000-0000-0000-000000000001', pg_temp.module_of('L07'), 'Returning learner with prior experience') is not null, 'administrator unlocks module 3 with a reason');
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000001');
select pg_temp.check(public.can_access_lesson(pg_temp.lesson('L07')), 'override opens the module');
select pg_temp.check((select unlocked_by_override from public.module_states() where number = 3), 'module state shows the override');
select public.start_lesson(pg_temp.lesson('L07'));
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000003', 'aal2');
select public.admin_revoke_unlock((select id from public.module_unlocks where user_id = 'aaaaaaaa-0000-0000-0000-000000000001' and revoked_at is null));
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000001');
select pg_temp.check(public.can_access_lesson(pg_temp.lesson('L07')), 'a started lesson stays accessible after the override is revoked (revisit)');
select pg_temp.check(not public.can_access_lesson(pg_temp.lesson('L08')), 'other lessons of the module are locked again after revocation');

-- Completion opens the next modules
reset role;
insert into public.lesson_progress (user_id, lesson_id, status, completed_at)
select 'aaaaaaaa-0000-0000-0000-000000000001', l.id, 'completed', now()
from public.lessons l join public.modules m on m.id = l.module_id
where m.number in (1, 2) and l.content_status <> 'in_preparation'
on conflict (user_id, lesson_id) do update set status = 'completed', completed_at = now();
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000001');
select pg_temp.check(public.can_access_lesson(pg_temp.lesson('L08')), 'completing modules 1 and 2 opens module 3');
select pg_temp.check(public.can_access_lesson(pg_temp.lesson('L01')), 'completed lessons remain accessible for revision');
select pg_temp.check(not public.can_access_lesson(pg_temp.lesson('L10')), 'module 4 stays locked until module 3 is completed');

-- Withdrawn enrolment
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000003', 'aal2');
select public.admin_set_enrolment((select id from public.enrollments where user_id = 'aaaaaaaa-0000-0000-0000-000000000001'), 'paused');
select pg_temp.act_as('aaaaaaaa-0000-0000-0000-000000000001');
select pg_temp.check(not public.can_access_lesson(pg_temp.lesson('L02')) and public.can_access_lesson(pg_temp.lesson('L01')), 'a paused enrolment closes the course except preview lessons');
select pg_temp.check((select count(*) from public.lesson_progress where user_id = auth.uid() and status = 'completed') = (select count(*) from public.lessons l join public.modules m on m.id = l.module_id where m.number in (1, 2) and l.content_status <> 'in_preparation') and exists (select 1 from public.lesson_progress where user_id = auth.uid() and lesson_id = pg_temp.lesson('L07')), 'learning records are kept unchanged while the enrolment is paused');

-- Audit trail
reset role;
select pg_temp.check((select count(*) >= 5 from public.audit_log where action in ('cohort.created','enrolment.created','module.unlocked','module.unlock_revoked','enrolment.updated')), 'enrolment and unlock actions are written to the audit log');
\echo ALL PROGRESSION TESTS COMPLETED
