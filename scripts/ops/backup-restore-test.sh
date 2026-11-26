#!/usr/bin/env bash
# Backup and restore verification (audit SEC-04).
#
# Takes a full logical backup (pg_dump, custom format) of the database, restores it
# into a throwaway database, and verifies that row counts of every public table match.
# Proves that a backup can actually be restored, which a backup alone does not.
#
#   Local stack:  bash scripts/ops/backup-restore-test.sh
#   Hosted:       DB_CONTAINER= DB_URL='postgresql://…' bash scripts/ops/backup-restore-test.sh
#                 (DB_URL from the Supabase dashboard; never commit it; run from a trusted machine)
#
# Output: backups/<timestamp>.dump (git-ignored) and a PASS/FAIL report.
set -euo pipefail
cd "$(dirname "$0")/../.."
CONTAINER="${DB_CONTAINER-supabase_db_medical-speaking-academy}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p backups && chmod 700 backups
OUT="backups/${STAMP}.dump"

run() { if [ -n "$CONTAINER" ]; then docker exec -i "$CONTAINER" "$@"; else "$@"; fi; }
SRC="${DB_URL:-postgresql://postgres:postgres@localhost:5432/postgres}"
SCRATCH_DB="restore_check_${STAMP,,}"

echo "1/4 Backup → $OUT"
run pg_dump --format=custom --no-owner --schema=public --schema=auth "$SRC" > "$OUT"
echo "    size: $(du -h "$OUT" | cut -f1)"

echo "2/4 Restore into throwaway database $SCRATCH_DB"
ADMIN="${SRC%/*}/postgres"
run psql "$ADMIN" -q -c "create database $SCRATCH_DB" >/dev/null
DST="${SRC%/*}/$SCRATCH_DB"
# Roles and extensions referenced by the dump exist on the same server; errors about
# pre-existing objects are reported but do not stop the restore.
run pg_restore --no-owner --no-privileges --dbname="$DST" < "$OUT" 2> /tmp/restore-$STAMP.log || true
echo "    restore warnings: $(grep -c 'error' /tmp/restore-$STAMP.log || true)"

echo "3/4 Compare row counts of every public table"
COUNT_SQL="select string_agg(format('%s=%s', table_name, (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from public.%I', table_name), false, true, '')))[1]::text), ',' order by table_name) from information_schema.tables where table_schema='public' and table_type='BASE TABLE'"
A="$(run psql "$SRC" -tAc "$COUNT_SQL")"
B="$(run psql "$DST" -tAc "$COUNT_SQL")"
echo "    source:   $A"
echo "    restored: $B"

echo "4/4 Clean up throwaway database"
run psql "$ADMIN" -q -c "drop database $SCRATCH_DB" >/dev/null

if [ "$A" = "$B" ] && [ -n "$A" ]; then echo "PASS: backup restored and verified ($OUT)"; else echo "FAIL: restored data differs from source"; exit 1; fi
