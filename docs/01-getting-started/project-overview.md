---
title: Project overview
description: Purpose, profile, stack, entrypoints, and known gaps for tugOwar
type: explanation
status: draft
last_review: 2026-08-11
confidence: high
status_evidence: verified
generated_with_standard: "1.0"
sources:
  - README.md
  - package.json
  - angular.json
  - src/main.ts
  - src/app/app.component.ts
  - src/app/services/auth.service.ts
  - src/app/services/vote.service.ts
  - supabase/migrations/0001_votes.sql
  - supabase/migrations/0002_allowed_voters.sql
related:
  - ../02-architecture/system-overview.md
  - local-setup.md
---

# Project overview

`tugowar` is an Angular poll application for voting on OpenSpec adoption. The existing README describes a GitHub-authenticated yes/no vote with aggregate results after voting (`README.md`).

## Repository profile

Profile: **frontend-app** with high confidence.

Evidence: Angular dependencies and scripts are in `package.json`; project build/test configuration is in `angular.json`; the app bootstraps through `src/main.ts`.

## Stack

- Angular 19 and TypeScript (`package.json`, `tsconfig.json`).
- Tailwind CSS (`tailwind.config.js`, `src/styles.css`).
- Supabase JS client for Auth/Postgres (`src/app/supabase.provider.ts`).
- GitHub OAuth through Supabase (`src/app/services/auth.service.ts`).
- Supabase SQL migrations for votes, RLS, aggregate RPC, and allowed voters (`supabase/migrations/`).

## Main entrypoints

- `src/main.ts` bootstraps `AppComponent`.
- `src/app/app.config.ts` provides routing and Supabase.
- `src/app/app.component.html` switches between anonymous, authorized voter, unauthorized voter, and tally UI states.
- `src/app/services/vote.service.ts` reads, upserts, and aggregates votes.

## Verification status

Prior reports show successful automated build/tests for earlier work (`reports/task-5-final.md`). Manual OAuth, E2E, and allowed-voter checks are still documented as pending in `reports/task-4-e2e.md` and `reports/task-6-allowed-voters-manual.md`.

## Open questions

- Has the allowed-voters migration been applied remotely?
- Is GitHub Pages deployment still required? No workflow file was found during discovery.
