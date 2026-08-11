---
title: Local setup
description: How to install, configure, run, and verify the Angular/Supabase app locally
type: how-to
status: draft
last_review: 2026-08-11
confidence: high
status_evidence: verified
generated_with_standard: "1.0"
sources:
  - README.md
  - package.json
  - .env.example
  - .gitignore
  - scripts/generate-env.js
  - angular.json
related:
  - project-overview.md
  - ../02-architecture/system-overview.md
---

# Local setup

## Prerequisites

- Node.js compatible with Angular 19.
- pnpm; the repo declares `pnpm@9.15.9` in `package.json`.
- Supabase project URL and publishable key.
- GitHub OAuth configured in Supabase for real login testing.

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create local environment config:

   ```bash
   cp .env.example .env
   ```

3. Fill `.env` with values from Supabase Settings → API:

   ```text
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_KEY=your-publishable-key
   ```

4. Start the dev server:

   ```bash
   pnpm start
   ```

`pnpm start`, `pnpm run build`, and `pnpm test` run `scripts/generate-env.js` first through package pre-scripts. Generated `src/environments/environment*.ts` files are ignored by `.gitignore`.

## How to verify

```bash
pnpm run build
pnpm test -- --watch=false --browsers=ChromeHeadless
```

For browser verification, open `http://localhost:4200`, sign in with GitHub, and use the manual checklists in `reports/task-4-e2e.md` and `reports/task-6-allowed-voters-manual.md`.

## Open questions

- Which Supabase project should new contributors use for local/manual checks?
- Are all invited voters using GitHub accounts with the allowed corporate email verified?
