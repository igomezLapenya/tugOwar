---
title: Glossary
description: Project terms used by the tugOwar app and documentation
type: reference
status: draft
last_review: 2026-08-11
confidence: high
status_evidence: verified
generated_with_standard: "1.0"
sources:
  - README.md
  - src/app/allowed-voters.ts
  - src/app/services/auth.service.ts
  - src/app/services/vote.service.ts
  - supabase/migrations/0001_votes.sql
  - supabase/migrations/0002_allowed_voters.sql
related:
  - ../01-getting-started/project-overview.md
---

# Glossary

**Allowed voter** — An authenticated GitHub user whose email appears in `src/app/allowed-voters.ts` and the `allowed_voters` table from `supabase/migrations/0002_allowed_voters.sql`.

**GitHub OAuth** — Authentication provider used through Supabase Auth in `src/app/services/auth.service.ts`.

**OpenSpec Poll** — The poll application described in `README.md` for deciding whether to adopt OpenSpec.

**Publishable key** — Supabase client key used by the frontend. It is configured through `.env` from `.env.example`; service-role keys must not be used in this frontend.

**RLS** — Row Level Security. The migrations under `supabase/migrations/` enable and configure RLS for voting access.

**RPC** — Remote procedure call. `get_poll_results()` is a Supabase/Postgres function returning aggregate yes/no counts.

**Tally** — The aggregate vote result UI and data, represented by `TallyComponent` and `PollResults`.

**Vote** — One row per user in the `votes` table, upserted by `VoteService.castVote`.

## Open questions

- Should allowlist ownership and update process be documented in a dedicated operations runbook?
