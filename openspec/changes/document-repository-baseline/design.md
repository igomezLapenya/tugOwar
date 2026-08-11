## Context

This repository is an Angular 19 frontend application named `tugowar` with Tailwind CSS and Supabase Auth/Postgres integration. Discovery evidence includes `package.json`, `angular.json`, `src/main.ts`, `src/app/supabase.provider.ts`, `src/app/services/auth.service.ts`, `src/app/services/vote.service.ts`, `.env.example`, `.gitignore`, and `supabase/migrations/0001_votes.sql`.

The current documentation baseline is thin: `README.md` explains the app and local setup in Spanish, but there is no `AGENTS.md` and no `docs/` tree. Reports show automated build/test evidence, while manual GitHub OAuth and E2E checks remain pending in `reports/task-2-4-manual-pending.md`, `reports/task-3-manual.md`, and `reports/task-4-e2e.md`. `openspec/config.yaml` also still says the project is greenfield even though product code now exists.

This change plans documentation only. It must not alter Angular behavior, Supabase schema behavior, dependencies, or deployment semantics.

## Goals / Non-Goals

**Goals:**

- Establish an English documentation baseline that follows documentation standard version `1.0`.
- Provide a root `AGENTS.md` as the AI operational contract before other docs.
- Add the minimum docs set plus frontend-app extras required by the `docs-generation` skill.
- Back technical claims with repository-relative evidence paths and make uncertainty explicit.
- Include reproducible verification expectations, especially for frontmatter, links, how-to sections, and existing Angular commands.
- Record implementation reports under this change's `reports/` directory.

**Non-Goals:**

- No product source changes to Angular components, services, Supabase migrations, styling, or tests.
- No new runtime dependencies or package scripts unless a later implementer explicitly identifies a documentation validation helper as necessary and documents the rationale.
- No completion of pending manual OAuth or E2E validation; this change documents who must run those checks and how to report them.
- No broad rewrite of the existing Spanish README unless needed to link to the new documentation baseline.

## Decisions

1. **Use English for generated baseline docs.**
   - Rationale: the user selected English after discovery. English improves AI/human onboarding consistency even though existing README and UI copy are Spanish.
   - Alternative considered: Spanish to match current README/UI. Rejected because the requested baseline is intended for broad safe onboarding.

2. **Create root `AGENTS.md` first, then `docs/README.md`, then topic docs.**
   - Rationale: `AGENTS.md` is the safety contract for AI agents and must point to the human reading map in `docs/README.md`.
   - Alternative considered: only expanding README. Rejected because README does not provide agent guardrails, excluded paths, or evidence rules.

3. **Classify the repo as `frontend-app` with high confidence.**
   - Rationale: `package.json` dependencies, `angular.json`, `src/main.ts`, and Angular component/service layout all indicate a single frontend application.
   - Alternative considered: backend-api because Supabase is used. Rejected because the backend is external/Supabase SQL, not an in-repo API service.

4. **Use evidence-backed docs with explicit uncertainty.**
   - Rationale: several claims are verified from repo files, but manual OAuth/E2E status is pending and should not be represented as complete.
   - Alternative considered: polished docs that omit uncertainty. Rejected because the baseline must help users and agents work safely.

5. **Keep implementation documentation-only.**
   - Rationale: this change is an onboarding baseline and must not change application behavior.
   - Alternative considered: fixing stale implementation/spec mismatches during docs work. Rejected; those should be separate behavior changes if desired.

## Risks / Trade-offs

- **Risk: Documentation claims drift from implementation** → Mitigation: require `sources` frontmatter or inline repo-relative evidence for technical claims.
- **Risk: Generated docs imply manual OAuth/E2E is complete** → Mitigation: require open questions and manual verification ownership for user-facing checks.
- **Risk: Root README remains Spanish while baseline docs are English** → Mitigation: keep README intact unless linking to docs, and document the language choice in the initial decision record.
- **Risk: Stale OpenSpec context misleads future agents** → Mitigation: allow a minimal `openspec/config.yaml` context update if implementation confirms it is needed for safe planning.
- **Risk: Link/frontmatter validation is manual and error-prone** → Mitigation: tasks require an explicit validation report covering frontmatter, links, sections, and evidence.

## Migration Plan

1. Create or switch to a feature branch for `document-repository-baseline`.
2. Draft `AGENTS.md` and the required `docs/` tree in English.
3. Add frontend-app extras: component model and UI conventions.
4. Optionally update stale repository planning/docs context without changing product behavior.
5. Validate documentation structure, links, evidence, and how-to verification sections.
6. Run existing build/test commands when feasible and record results; otherwise mark commands as inferred/unverified with rationale.
7. Store reports under `openspec/changes/document-repository-baseline/reports/`.

Rollback is straightforward: revert the documentation files and any planning-context-only updates from this change.

## Open Questions

- Should the existing Spanish `README.md` remain as the main user-facing entrypoint, or should it be lightly updated to link to English docs?
- Who will run and sign off on the pending manual OAuth and two-account E2E checks after docs are added?
- Should future changes add automated docs validation tooling, or is checklist-based validation sufficient for this small repo?
