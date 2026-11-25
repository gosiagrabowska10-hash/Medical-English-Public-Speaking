-- RLS acceptance tests. Run against a fresh database after the migrations:
--   psql -v ON_ERROR_STOP=1 -f supabase/tests/rls_test.sql
-- Every check raises an exception on failure.
\set QUIET on
set client_min_messages = warning;

create or replace function pg_temp.act_as(_uid uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', _uid, 'role', 'authenticated')::text, false);
  execute 'set role authenticated';
end $$;
create or replace function pg_temp.check(_ok boolean, _name text) returns void language plpgsql as $$
begin
  if not coalesce(_ok, false) then raise exception 'FAIL: %', _name; end if;
  raise notice 'PASS: %', _name;
end $$;

-- Seed two students and one owner (as superuser, like Supabase Auth would).
reset role;
insert into auth.users (id, email, raw_user_meta_data) values
  ('11111111-1111-1111-1111-111111111111', 'anna@example.org', '{"title":"Dr","first_name":"Anna","last_name":"Nowak","country":"Poland","specialty":"Cardiology","accepted_terms":true}'),
  ('22222222-2222-2222-2222-222222222222', 'jan@example.org',  '{"title":"Hacker","first_name":"Jan","last_name":"Kowalski","accepted_terms":false}'),
  ('99999999-9999-9999-9999-999999999999', 'owner@example.org','{"first_name":"Owner","last_name":"Academy","accepted_terms":true}');
insert into public.user_roles (user_id, role) values ('99999999-9999-9999-9999-999999999999', 'academy_owner');

set client_min_messages = notice;

-- Sign-up trigger
select pg_temp.check((select count(*) = 3 from public.profiles where id in ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','99999999-9999-9999-9999-999999999999')), 'trigger creates a profile for every new user');
select pg_temp.check((select title = 'Dr' and first_name = 'Anna' and specialty = 'Cardiology' from public.profiles where id = '11111111-1111-1111-1111-111111111111'), 'profile is populated from sign-up metadata');
select pg_temp.check((select title is null from public.profiles where id = '22222222-2222-2222-2222-222222222222'), 'invalid title from metadata is discarded');
select pg_temp.check((select count(*) = 1 from public.user_roles where user_id = '11111111-1111-1111-1111-111111111111' and role = 'student'), 'new user receives the student role');
select pg_temp.check((select count(*) = 2 from public.consents where user_id = '11111111-1111-1111-1111-111111111111'), 'terms and privacy consent recorded when accepted');
select pg_temp.check((select count(*) = 0 from public.consents where user_id = '22222222-2222-2222-2222-222222222222'), 'no consent recorded when not accepted');

-- Anonymous access
set role anon;
do $$ begin
  perform 1 from public.profiles;
  raise exception 'FAIL: anon can read profiles';
exception when insufficient_privilege then raise notice 'PASS: anonymous visitors cannot read profiles';
end $$;
do $$ begin
  perform public.log_event('anon.spam');
  raise exception 'FAIL: anon can write audit events';
exception when insufficient_privilege then raise notice 'PASS: anonymous visitors cannot write to the audit log';
end $$;
reset role;

-- Student A
select pg_temp.act_as('11111111-1111-1111-1111-111111111111');
select pg_temp.check((select count(*) = 1 from public.profiles), 'student sees only their own profile');
update public.profiles set first_name = 'Hacked' where id = '22222222-2222-2222-2222-222222222222';
reset role; select pg_temp.check((select first_name = 'Jan' from public.profiles where id = '22222222-2222-2222-2222-222222222222'), 'student cannot update another profile');
select pg_temp.act_as('11111111-1111-1111-1111-111111111111');
update public.profiles set specialty = 'Interventional Cardiology' where id = '11111111-1111-1111-1111-111111111111';
reset role; select pg_temp.check((select specialty = 'Interventional Cardiology' from public.profiles where id = '11111111-1111-1111-1111-111111111111'), 'student can update own profile');

select pg_temp.act_as('11111111-1111-1111-1111-111111111111');
do $$ begin
  update public.profiles set id = gen_random_uuid() where id = '11111111-1111-1111-1111-111111111111';
  raise exception 'FAIL: student changed own id';
exception when insufficient_privilege then raise notice 'PASS: student cannot change protected profile columns';
end $$;

do $$ begin
  insert into public.user_roles (user_id, role, granted_by) values ('11111111-1111-1111-1111-111111111111', 'academy_owner', '11111111-1111-1111-1111-111111111111');
  raise exception 'FAIL: student escalated privileges';
exception when insufficient_privilege then raise notice 'PASS: student cannot grant themselves a staff role';
end $$;

select pg_temp.check((select count(*) = 0 from public.audit_log), 'student cannot read the audit log');
select public.log_event('test.event', 'profile', 'x');
reset role; select pg_temp.check((select actor_id = '11111111-1111-1111-1111-111111111111' from public.audit_log where action = 'test.event'), 'log_event records the real caller as actor');

select pg_temp.act_as('11111111-1111-1111-1111-111111111111');
do $$ begin
  insert into public.audit_log (action) values ('forged');
  raise exception 'FAIL: direct audit insert allowed';
exception when insufficient_privilege then raise notice 'PASS: audit log cannot be written directly';
end $$;

insert into public.consents (user_id, kind, granted) values ('11111111-1111-1111-1111-111111111111', 'recording', true);
select pg_temp.check((select granted from public.current_consents where kind = 'recording'), 'student can record a consent; current view returns it');
do $$ begin
  insert into public.consents (user_id, kind, granted) values ('22222222-2222-2222-2222-222222222222', 'marketing_email', true);
  raise exception 'FAIL: consent forged for another user';
exception when insufficient_privilege then raise notice 'PASS: student cannot record consent for another user';
end $$;
do $$ begin
  update public.consents set granted = false;
  raise exception 'FAIL: consents editable';
exception when insufficient_privilege then raise notice 'PASS: consent history cannot be edited by students';
end $$;
do $$ begin
  delete from public.consents;
  raise exception 'FAIL: consents deletable';
exception when insufficient_privilege then raise notice 'PASS: consent history cannot be deleted by students';
end $$;

insert into public.data_deletion_requests (user_id, reason) values ('11111111-1111-1111-1111-111111111111', 'Test');
select pg_temp.check((select count(*) = 1 from public.data_deletion_requests), 'student can request deletion of their data');
do $$ begin
  insert into public.data_deletion_requests (user_id) values ('11111111-1111-1111-1111-111111111111');
  raise exception 'FAIL: duplicate open request';
exception when unique_violation then raise notice 'PASS: only one open deletion request per user';
end $$;
do $$ begin
  delete from public.data_deletion_requests;
  raise exception 'FAIL: deletion request deletable';
exception when insufficient_privilege then raise notice 'PASS: students cannot delete their deletion request record';
end $$;
update public.data_deletion_requests set status = 'completed';
reset role; select pg_temp.check((select status = 'pending' from public.data_deletion_requests), 'student cannot mark their own request as processed');

-- Student B cannot see A
select pg_temp.act_as('22222222-2222-2222-2222-222222222222');
select pg_temp.check((select count(*) = 0 from public.data_deletion_requests), 'students cannot see other students'' deletion requests');
select pg_temp.check((select count(*) = 0 from public.consents), 'students cannot see other students'' consents');

-- Owner
select pg_temp.act_as('99999999-9999-9999-9999-999999999999');
select pg_temp.check((select count(*) = 3 from public.profiles where id in ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','99999999-9999-9999-9999-999999999999')), 'owner can read all profiles');
select pg_temp.check((select count(*) >= 4 from public.audit_log), 'owner can read the audit log');
insert into public.user_roles (user_id, role, granted_by) values ('22222222-2222-2222-2222-222222222222', 'instructor', '99999999-9999-9999-9999-999999999999');
select pg_temp.check((select count(*) = 1 from public.user_roles where user_id = '22222222-2222-2222-2222-222222222222' and role = 'instructor'), 'owner can grant a staff role');
delete from public.user_roles where user_id = '99999999-9999-9999-9999-999999999999' and role = 'academy_owner';
reset role; select pg_temp.check((select count(*) = 1 from public.user_roles where user_id = '99999999-9999-9999-9999-999999999999' and role = 'academy_owner'), 'owner cannot remove their own owner role');

-- New instructor can read student profiles but not the audit log
select pg_temp.act_as('22222222-2222-2222-2222-222222222222');
select pg_temp.check((select count(*) = 3 from public.profiles where id in ('11111111-1111-1111-1111-111111111111','22222222-2222-2222-2222-222222222222','99999999-9999-9999-9999-999999999999')), 'instructor can read student profiles');
select pg_temp.check((select count(*) = 0 from public.audit_log), 'instructor cannot read the audit log');

-- Deleting an auth user cascades
reset role;
delete from auth.users where id = '11111111-1111-1111-1111-111111111111';
select pg_temp.check((select count(*) = 0 from public.profiles where id = '11111111-1111-1111-1111-111111111111') and (select count(*) = 0 from public.consents where user_id = '11111111-1111-1111-1111-111111111111'), 'deleting an account removes its profile and consents');
\echo ALL RLS TESTS COMPLETED
