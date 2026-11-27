#!/usr/bin/env bash
# Recreate a throwaway database, apply the auth stub + all migrations, run RLS tests.
set -euo pipefail
DB=msa_test
cd "$(dirname "$0")/.."
psql_su() { su postgres -c "psql -v ON_ERROR_STOP=1 -q $*"; }
su postgres -c "dropdb --if-exists $DB" && su postgres -c "createdb $DB"
psql_su "-d $DB -f $(pwd)/tests/local_auth_stub.sql"
for f in migrations/*.sql; do psql_su "-d $DB -f $(pwd)/$f"; done
psql_su "-d $DB -tA -f $(pwd)/tests/rls_test.sql" 2>&1 | grep -oE "(PASS|FAIL): .*|ALL RLS TESTS COMPLETED"
psql_su "-d $DB -tA -f $(pwd)/tests/progression_test.sql" 2>&1 | grep -oE "(PASS|FAIL): .*|ERROR.*|ALL PROGRESSION TESTS COMPLETED"
