# Backup and Recovery Procedure

**Status:** Technical procedure, implemented and tested locally on 27 November 2026. Production configuration pending (hosted Supabase project not yet connected). Register: SEC-04.

## 1. What must be recoverable

| Data | Where | Criticality |
|---|---|---|
| Accounts, profiles, roles, consents, audit log | Supabase Postgres (`auth`, `public`) | Critical |
| Learning records: progress, quiz attempts, Final Tasks, workshop logs, instructor assessments | Supabase Postgres (`public`) | Critical |
| Curriculum content | Git repository (source of truth) → generated migration | Recoverable from Git |
| Learning materials (PDFs) | Git repository (`public/materials`) | Recoverable from Git |
| Recordings | **Not stored** (stay on learners' devices) | Not applicable until Phase 4 |

## 2. Targets (proposed, to be confirmed by the Academy Owner)

- **Recovery Point Objective (RPO):** at most 24 hours of data loss; 5 minutes once point-in-time recovery is enabled.
- **Recovery Time Objective (RTO):** service restored within 8 hours.

## 3. Production configuration (to do when the hosted project is created)

1. Use a Supabase plan with **daily automated backups**; enable **Point-in-Time Recovery** before real learner data is stored.
2. Choose an **EU region** for the project.
3. In addition to provider backups, run `scripts/ops/backup-restore-test.sh` **weekly** from a trusted machine against production (`DB_CONTAINER= DB_URL=…`) and store the encrypted dump in a separate EU storage location with 35-day retention. Never store dumps in the repository (`backups/` is git-ignored).
4. Protect dumps: encryption at rest, access limited to the Academy Owner and technical lead, deletion after the retention period (dumps contain personal data and are covered by the Retention Schedule).

## 4. Restore test (quarterly, and after any major migration)

`bash scripts/ops/backup-restore-test.sh` performs the full cycle automatically:

1. Logical backup (`pg_dump`, custom format) of `public` and `auth`.
2. Restore into a throwaway database.
3. Row-count comparison of every public table.
4. Clean-up; PASS/FAIL report.

Record each run (date, operator, result) in the evidence folder. The first run: `docs/compliance/evidence/backup-restore-2026-11-27.txt` — **PASS**, 17 tables verified.

## 5. Recovery procedure

1. Declare an incident (see `INCIDENT_RESPONSE.md`) and appoint an incident lead.
2. Put the platform into maintenance mode (hosting dashboard) to prevent new writes.
3. Choose the restore point (PITR timestamp or latest verified dump).
4. Restore to a **new** database first; run the RLS tests (`npm run test:rls:supabase`) and the security suites against it.
5. Switch the application to the restored database; verify sign-in, curriculum and a sample learner record.
6. Inform affected learners if data was lost; document the incident and lessons learned.
