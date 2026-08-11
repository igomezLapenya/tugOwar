## Why

The repository now contains an Angular/Supabase poll app, but onboarding is still mostly captured in a single README and stale planning context. A documentation baseline is needed so humans and AI agents can safely understand the project, verify changes, and avoid unsafe assumptions before modifying the app.

## What Changes

- Add a root AI operating contract in `AGENTS.md` that orients agents to the stack, safe edit boundaries, ignored/generated paths, and verified/inferred commands.
- Add a `docs/` baseline in English following documentation standard version `1.0`, including valid frontmatter, evidence-backed claims, `## Open questions`, and `## How to verify` in every how-to.
- Add the minimum documentation set for a `frontend-app` profile plus frontend-specific extras: project overview, local setup, system overview, component model, coding conventions, UI conventions, glossary, and initial bootstrap decision record.
- Keep existing product behavior unchanged; this change is documentation-only except for updating stale planning/documentation context when needed.
- Surface unresolved risks instead of inventing facts, including pending manual OAuth/E2E verification and stale OpenSpec context that still describes the app as greenfield.

## Capabilities

### New Capabilities

- `repository-documentation`: Defines the required documentation baseline, profile-specific docs, evidence requirements, validation expectations, and AI-safe onboarding contract for this repository.

### Modified Capabilities

- None. No base OpenSpec specs exist under `openspec/specs/` yet.

## Impact

- Documentation files: `AGENTS.md` and `docs/**`.
- Planning/documentation context: may update stale repository context such as `openspec/config.yaml` only when it affects safe future planning; no product source behavior changes are intended.
- Build/test/deploy configuration: no dependency or runtime changes are expected.
- Verification: documentation validation, link/frontmatter checks, and existing Angular build/test commands should be run or explicitly marked as inferred/unverified in reports.
