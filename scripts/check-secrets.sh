#!/usr/bin/env bash
# Fails if tracked files (or the full git history with --history) contain credential-like strings.
set -uo pipefail
P='sb_secret_[A-Za-z0-9_-]{10,}|sb_publishable_[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}|sk_(live|test)_[A-Za-z0-9]{10,}|rk_(live|test)_|whsec_[A-Za-z0-9]{10,}|re_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|github_pat_|-----BEGIN [A-Z ]*PRIVATE KEY|postgres(ql)?://[^:@/ ]+:[^@/ ]+@'
status=0
if git ls-files | grep -E '(^|/)\.env($|\.)' | grep -v '\.env\.example$'; then echo "ERROR: environment file is tracked"; status=1; fi
if git grep -nIE "$P" -- . ':!package-lock.json' ':!scripts/check-secrets.sh'; then echo "ERROR: credential-like string in tracked files"; status=1; fi
if [[ "${1:-}" == "--history" ]] && git log --all -p -- . ':!scripts/check-secrets.sh' | grep -nE "$P"; then echo "ERROR: credential-like string in git history"; status=1; fi
[[ $status == 0 ]] && echo "Secret check passed."
exit $status
