# Dependency Update Log

Policy (Academy Owner, 27 November 2026): Dependabot pull requests are never merged automatically. Minor and patch updates are tested first; GitHub Actions updates are tested separately; major upgrades of ESLint, Node types and TypeScript are separate changes; only changes that pass the complete test suite are merged; unnecessary major upgrades are not introduced.

**Complete test suite** = lint, typecheck, content quality gate, workshop consistency, production build, `npm audit`, RLS tests (PostgreSQL 16 and Supabase), auth flow, API security, course flow, course security, Priority 1 controls, site QA at four widths, accessibility gate.

## 27 November 2026

| PR | Change | Test result | Decision |
|---|---|---|---|
| [#3](https://github.com/gosiagrabowska10-hash/Medical-English-Public-Speaking/pull/3) (part) | react, react-dom 19.3.0 → 19.3.1; tailwindcss, @tailwindcss/turbopack 4.3.3 → 4.3.5 (patch) | All suites passed: lint, typecheck, content gate, consistency, build, 0 vulnerabilities; RLS 44 + Supabase; auth 19/19, API security 24/24, course 64/64, course security 34/34, Priority 1 48/48, site QA no problems, accessibility 0 violations. Next.js 16.4.6 peer range `^19.0.0` satisfied. | **Merged** (applied directly to main; Dependabot rebases #3 to the remaining change) |
| [#3](https://github.com/gosiagrabowska10-hash/Medical-English-Public-Speaking/pull/3) (part) | playwright 1.63 → 1.65 (minor, development only) | Requires a newer browser build (1255) than the one available in the development environment (1243); all PDF generation and browser tests fail to launch. No functional need. | **Held** — revisit together with the browser image |
| [#1](https://github.com/gosiagrabowska10-hash/Medical-English-Public-Speaking/pull/1) | actions/setup-node 4 → 7 | Tested separately in CI after rebase | See CI result below |
| [#2](https://github.com/gosiagrabowska10-hash/Medical-English-Public-Speaking/pull/2) | actions/checkout 4 → 7 | Tested separately in CI after rebase | See CI result below |
| [#4](https://github.com/gosiagrabowska10-hash/Medical-English-Public-Speaking/pull/4) | eslint 9 → 10 (major) | Tested in isolation: lint, typecheck and build pass. | **Not merged** — no functional need; separate change for a later maintenance window |
| [#5](https://github.com/gosiagrabowska10-hash/Medical-English-Public-Speaking/pull/5) | @types/node 20 → 26 (major) | Typecheck and build pass, but the types would describe Node 26 APIs while the application runs on Node 22 (`engines: >=20.9`). | **Not merged** — types should match the runtime Node version |
| [#6](https://github.com/gosiagrabowska10-hash/Medical-English-Public-Speaking/pull/6) | typescript 5 → 7 (major) | **Lint fails**: `eslint-config-next` 16.4.6 cannot load with TypeScript 7. | **Not merged** — incompatible with the current Next.js toolchain |
