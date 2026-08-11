---
title: System overview
description: High-level Angular, Supabase, authentication, voting, and data boundary overview
type: explanation
status: draft
last_review: 2026-08-11
confidence: high
status_evidence: verified
generated_with_standard: "1.0"
sources:
  - src/app/app.component.html
  - src/app/services/auth.service.ts
  - src/app/services/vote.service.ts
  - src/app/supabase.provider.ts
  - src/app/allowed-voters.ts
  - supabase/migrations/0001_votes.sql
  - supabase/migrations/0002_allowed_voters.sql
related:
  - component-model.md
  - ../01-getting-started/project-overview.md
---

# System overview

The app is a browser-based Angular frontend backed by Supabase Auth and Postgres.

```text
Browser Angular app
  ├─ AuthService ── Supabase Auth ── GitHub OAuth
  ├─ VoteService ── votes table with RLS
  └─ Tally UI ───── get_poll_results() RPC
```

## Authentication and authorization

`AuthService` calls Supabase `signInWithOAuth({ provider: 'github' })` and tracks session/user state with Angular signals (`src/app/services/auth.service.ts`). It also exposes `isAllowedVoter`, checking `src/app/allowed-voters.ts` for immediate UI feedback.

The security boundary is database RLS, not the client. `supabase/migrations/0002_allowed_voters.sql` adds `allowed_voters` and replaces vote policies so authenticated users must match both `auth.uid() = user_id` and an allowed email.

## Voting and results

`VoteService` reads the current user's vote, upserts on `user_id`, and calls `get_poll_results` after voting (`src/app/services/vote.service.ts`). The `votes` table and aggregate RPC are defined in `supabase/migrations/0001_votes.sql`.

## UI flow

`src/app/app.component.html` renders login for anonymous users, vote/tally for allowed authenticated voters, and an unauthorized notice for authenticated users not on the allowlist.

## Open questions

- Has the remote database applied both migrations in order?
- Should `get_poll_results()` be restricted further if unauthorized authenticated users should not see aggregate totals by direct RPC?
