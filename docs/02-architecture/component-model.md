---
title: Component model
description: Angular component and service responsibilities for the poll UI
type: explanation
status: draft
last_review: 2026-08-11
confidence: high
status_evidence: verified
generated_with_standard: "1.0"
sources:
  - src/app/app.component.ts
  - src/app/app.component.html
  - src/app/components/vote/vote.component.ts
  - src/app/components/tally/tally.component.ts
  - src/app/components/illustration/illustration.component.ts
  - src/app/services/auth.service.ts
  - src/app/services/vote.service.ts
related:
  - system-overview.md
  - ../03-conventions/coding-conventions.md
---

# Component model

The frontend uses Angular standalone components and services.

## Root shell

`AppComponent` imports `RouterOutlet`, `VoteComponent`, `TallyComponent`, and `IllustrationComponent` directly (`src/app/app.component.ts`). Its template controls the main states: anonymous login, authenticated allowed voter, authenticated unauthorized user, and post-vote tally (`src/app/app.component.html`).

## Services

`AuthService` owns Supabase session/user state and computed authentication/allowlist state. `VoteService` owns vote, results, loading state, and Supabase table/RPC operations.

Both services use Angular `signal` and `computed`, so components read state through signal functions such as `auth.isAuthenticated()` or `voteService.hasVoted()`.

## Leaf components

- `VoteComponent` receives `userId` and calls `voteService.castVote`.
- `TallyComponent` derives total and percentages from `voteService.results()`.
- `IllustrationComponent` provides the landing illustration.

## Testing model

Unit specs live next to app services/components as `*.spec.ts`, and Angular/Karma test configuration appears in `angular.json` and `tsconfig.spec.json`.

## Open questions

- Should route configuration remain empty, or will future pages require route-level documentation?
- Should component state flows be diagrammed if the UI grows beyond this single shell?
