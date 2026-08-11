---
title: Coding conventions
description: Observed TypeScript, Angular, testing, and environment conventions
type: reference
status: draft
last_review: 2026-08-11
confidence: medium
status_evidence: inferred
generated_with_standard: "1.0"
sources:
  - tsconfig.json
  - package.json
  - angular.json
  - src/app/app.component.ts
  - src/app/services/auth.service.ts
  - src/app/services/vote.service.ts
  - scripts/generate-env.js
related:
  - ui-conventions.md
  - ../02-architecture/component-model.md
---

# Coding conventions

## TypeScript and Angular

- Keep TypeScript strict. `tsconfig.json` enables `strict`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and strict Angular compiler options.
- Prefer standalone Angular components, matching `AppComponent`, `VoteComponent`, `TallyComponent`, and `IllustrationComponent`.
- Keep shared app state in injectable services when it crosses components. Current examples are `AuthService` and `VoteService`.
- Use Angular signals/computed values consistently for local reactive state.

## Supabase integration

- Use the injected `SUPABASE_CLIENT` from `src/app/supabase.provider.ts` rather than creating ad-hoc clients.
- Treat the publishable key as client-safe but never introduce service-role secrets into frontend code or `.env`.
- Keep database authorization in RLS migrations, not client-only checks.

## Tests

- Keep unit specs near the code they cover as `*.spec.ts`.
- Existing test runner is Karma/Jasmine through Angular CLI (`angular.json`, `package.json`).

## Open questions

- No lint or format script is declared in `package.json`; should one be added?
- Should Spanish comments/UI copy remain the default style for product code?
