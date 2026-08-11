## ADDED Requirements

### Requirement: AI operational contract
The repository SHALL provide a root `AGENTS.md` as the first documentation artifact for AI and human operators.

#### Scenario: Agent starts from the repository root
- **WHEN** a user or AI agent opens the repository
- **THEN** `AGENTS.md` explains the active documentation standard, links to `docs/README.md`, lists safe guardrails and excluded/generated paths, summarizes the stack and critical paths, and distinguishes verified commands from inferred commands

#### Scenario: Unsafe assumptions are discovered
- **WHEN** a claim cannot be verified from repository evidence
- **THEN** `AGENTS.md` records the uncertainty under open questions instead of presenting it as fact

### Requirement: Documentation index and standard version
The repository SHALL provide `docs/README.md` as the human reading map and SHALL declare active `standard_version: "1.0"`.

#### Scenario: User navigates documentation
- **WHEN** a user opens `docs/README.md`
- **THEN** it lists documentation maturity, recommended reading order, folder purposes, links to generated documents, and open questions

#### Scenario: Documentation standard is inspected
- **WHEN** a user checks the documentation baseline
- **THEN** `docs/README.md` identifies the active standard version and all generated `docs/` Markdown files use `generated_with_standard: "1.0"` in frontmatter

### Requirement: Minimum frontend documentation set
The repository SHALL include the minimum documentation set plus frontend-app extras required for this Angular frontend repository.

#### Scenario: Baseline files are generated
- **WHEN** the documentation baseline is implemented
- **THEN** the repository contains `docs/01-getting-started/project-overview.md`, `docs/01-getting-started/local-setup.md`, `docs/02-architecture/system-overview.md`, `docs/02-architecture/component-model.md`, `docs/03-conventions/coding-conventions.md`, `docs/03-conventions/ui-conventions.md`, `docs/07-reference/glossary.md`, and `docs/99-decisions/0001-initial-bootstrap.md`

#### Scenario: Existing documentation remains accessible
- **WHEN** baseline docs are added
- **THEN** existing README content is not overwritten blindly and any README change is limited to safe navigation or evidence-backed corrections

### Requirement: Evidence-backed technical claims
Every generated `docs/` Markdown file SHALL include valid frontmatter and SHALL back technical claims with repository evidence.

#### Scenario: Technical claim appears in generated docs
- **WHEN** a generated document describes stack, architecture, commands, configuration, tests, integrations, or behavior
- **THEN** the claim is supported by `sources` frontmatter or inline repo-relative paths such as `package.json`, `angular.json`, `src/app/services/vote.service.ts`, `.env.example`, or `supabase/migrations/0001_votes.sql`

#### Scenario: Claim confidence is partial
- **WHEN** evidence is incomplete, stale, or based on implementation reports rather than a fresh run
- **THEN** the document uses lower confidence/status evidence and records the uncertainty under `## Open questions`

### Requirement: Required sections and frontmatter
Every generated Markdown file under `docs/` SHALL comply with the documentation structure rules.

#### Scenario: Generated docs are validated
- **WHEN** documentation validation is performed
- **THEN** every `docs/` Markdown file starts with YAML frontmatter containing title, description, type, status, last_review, confidence, status_evidence, generated_with_standard, sources, and related

#### Scenario: Open questions are checked
- **WHEN** generated docs are reviewed
- **THEN** every generated `docs/` Markdown file includes `## Open questions`, using `None.` only when there are no known open questions

#### Scenario: How-to docs are checked
- **WHEN** a generated document has `type: how-to`
- **THEN** it includes `## How to verify` before `## Open questions`

### Requirement: Verification and reports
The implementation SHALL record reproducible validation evidence for the documentation baseline.

#### Scenario: Implementation completes documentation work
- **WHEN** the implementer finishes adding or updating documentation files
- **THEN** reports under `openspec/changes/document-repository-baseline/reports/` document frontmatter validation, link checks, evidence review, command verification status, and any manual/API checks that still require a human

#### Scenario: Existing Angular commands are evaluated
- **WHEN** build or test commands are run as part of verification
- **THEN** the reports identify exact commands and outcomes; commands not run are marked inferred or unverified with rationale
