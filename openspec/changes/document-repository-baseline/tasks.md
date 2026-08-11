## 0. Branch

- [ ] 0.1 Create or switch to the feature branch for `document-repository-baseline` before editing documentation files.

## 1. AI Operational Contract

- [ ] 1.1 Create root `AGENTS.md` first, in English, linking to `docs/README.md` and declaring documentation standard version `1.0`.
- [ ] 1.2 Document agent guardrails, excluded/generated paths, stack orientation, critical repo paths, verified versus inferred commands, and open questions using evidence from `package.json`, `angular.json`, `.gitignore`, `.env.example`, `src/main.ts`, and `src/app/**`.

## 2. Documentation Index and Getting Started

- [ ] 2.1 Create `docs/README.md` with `standard_version: "1.0"`, maturity status, reading order, folder purpose table, relative links, and open questions.
- [ ] 2.2 Create `docs/01-getting-started/project-overview.md` with evidence-backed frontend-app profile, app purpose, stack, entrypoints, and known verification gaps.
- [ ] 2.3 Create `docs/01-getting-started/local-setup.md` as a how-to with setup commands, environment-variable handling, Supabase/GitHub OAuth notes, `## How to verify`, and `## Open questions`.

## 3. Architecture and Conventions

- [ ] 3.1 Create `docs/02-architecture/system-overview.md` describing the Angular/Supabase boundary, auth/vote/result flow, data ownership, and pending manual checks with sources.
- [ ] 3.2 Create `docs/02-architecture/component-model.md` covering Angular root/component/service structure, signal-based state, Supabase provider injection, and template responsibilities.
- [ ] 3.3 Create `docs/03-conventions/coding-conventions.md` and `docs/03-conventions/ui-conventions.md` using observed TypeScript strictness, standalone components, Tailwind usage, test patterns, and known open questions.

## 4. Reference, Decisions, and Context Hygiene

- [ ] 4.1 Create `docs/07-reference/glossary.md` defining project terms such as OpenSpec Poll, vote, tally, GitHub OAuth, Supabase Auth, RLS, RPC, and publishable key with sources.
- [ ] 4.2 Create `docs/99-decisions/0001-initial-bootstrap.md` recording the English docs baseline decision, frontend-app profile inference, evidence contract, and manual verification ownership gaps.
- [ ] 4.3 Review existing `README.md` and `openspec/config.yaml`; only add safe navigation or stale-context corrections if needed, without changing product behavior or overwriting existing documentation blindly.

## 5. Validation and Reports

- [ ] 5.1 Validate every generated `docs/` Markdown file has required frontmatter fields, one Diataxis type, valid relative links, `## Open questions`, and sources or inline repo-relative evidence for technical claims.
- [ ] 5.2 Validate every how-to includes `## How to verify` before `## Open questions`, especially `docs/01-getting-started/local-setup.md`.
- [ ] 5.3 Run feasible automated verification commands such as `pnpm run build` and `pnpm test -- --watch=false --browsers=ChromeHeadless`; if a command is not run, mark it inferred/unverified with rationale.
- [ ] 5.4 Document manual/API checks for GitHub OAuth, Supabase provider setup, and two-account voting/E2E flow, including that a human implementer or reviewer must run browser-based checks before claiming user-facing behavior is fully verified.
- [ ] 5.5 Store validation results, command logs, and manual-check status under `openspec/changes/document-repository-baseline/reports/`, and leave implementation tasks unchecked for implementer verification.

<!-- apply: [wip]=started/incomplete; [x]=verified by implementer -->
<!-- execution: batch -->
