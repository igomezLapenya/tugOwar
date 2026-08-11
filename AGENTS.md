# AGENTS.md

AI operating contract for this repository. Read this file before changing code or documentation.

## Documentation standard

- Active standard version: `1.0`.
- Human docs index: [docs/README.md](docs/README.md).
- SDD workflow: [docs/03-conventions/sdd-workflow.md](docs/03-conventions/sdd-workflow.md).
- Generated `docs/` files use YAML frontmatter, cite repository evidence, and include `## Open questions`.

## Repository profile

- Profile: `frontend-app` (high confidence).
- Evidence: `package.json`, `angular.json`, `src/main.ts`, `src/app/**`.
- App: Angular poll app for deciding OpenSpec adoption, using Supabase Auth/Postgres and GitHub OAuth (`README.md`, `src/app/services/auth.service.ts`, `src/app/services/vote.service.ts`).

## Critical paths

- `src/main.ts` — Angular bootstrap.
- `src/app/app.config.ts` — root providers, router, Supabase provider.
- `src/app/app.component.*` — main UI state shell.
- `src/app/services/` — auth and voting state/services.
- `src/app/components/` — illustration, vote, and tally UI.
- `src/app/allowed-voters.ts` — client-side allowed voter UX list.
- `supabase/migrations/` — database schema, RLS, RPC, and allowlist policies.
- `scripts/generate-env.js` — generates ignored Angular environment files from env vars.
- `openspec/` — Spec-Driven Development planning artifacts.

## Guardrails

- Do not commit secrets. `.env`, `.env.*`, and generated `src/environments/environment*.ts` are ignored by `.gitignore`.
- Treat client-side allowed-voter checks as UX only; database RLS in `supabase/migrations/0002_allowed_voters.sql` is the security boundary.
- Do not edit generated environment files by hand; use `.env.example` and `scripts/generate-env.js`.
- Do not mark OpenSpec implementation tasks done unless you are the implementer verifying evidence.
- Store implementation reports under the active OpenSpec change `reports/` directory.

## Common commands

Verified from `package.json` and `angular.json`:

```bash
pnpm install
pnpm start
pnpm run build
pnpm test
```

Inferred CI-style test command from Angular/Karma config and prior reports:

```bash
pnpm test -- --watch=false --browsers=ChromeHeadless
```

## Excluded paths

- `node_modules/`, `dist/`, `.angular/cache/`, `coverage/`
- `.env`, `.env.*`
- `src/environments/environment.ts`, `src/environments/environment.prod.ts`

## Open questions

- Has `supabase/migrations/0002_allowed_voters.sql` been applied to the remote Supabase project?
- Who owns final browser verification for GitHub OAuth and two-account voting?
- Should README remain Spanish-only while deeper onboarding docs are English?
