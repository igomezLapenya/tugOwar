---
title: Initial documentation bootstrap
description: Decision record for the first AI-ready documentation and SDD bootstrap
type: explanation
status: draft
last_review: 2026-08-11
confidence: high
status_evidence: verified
generated_with_standard: "1.0"
sources:
  - AGENTS.md
  - docs/README.md
  - package.json
  - angular.json
  - openspec/config.yaml
related:
  - ../../README.md
  - ../03-conventions/sdd-workflow.md
---

# Initial documentation bootstrap

## Status

Accepted as the initial repository documentation baseline.

## Context

The repository already contained an Angular/Supabase poll app and an OpenSpec tree, but it lacked `AGENTS.md` and a structured `docs/` baseline.

## Decision

Create an English AI-ready documentation baseline using documentation standard `1.0`, classify the repo as `frontend-app`, and initialize/refresh OpenSpec with `openspec init --tools none` so global OPSX commands are not duplicated into the repo.

## Consequences

- Agents start from `AGENTS.md` and then use `docs/README.md`.
- Technical claims cite repo-relative evidence or are recorded as open questions.
- SDD workflow guidance lives in `docs/03-conventions/sdd-workflow.md` and is referenced by `openspec/config.yaml`.
- Existing Spanish README remains available as the original product-oriented introduction.

## Open questions

- Should future documentation changes translate this baseline into Spanish?
- Should the team add automated Markdown/frontmatter validation?
