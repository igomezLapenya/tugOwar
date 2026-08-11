---
title: SDD workflow
description: Spec-Driven Development checklist for OpenSpec changes with planner, implementer, code-writer, reviewer, and task agents
type: explanation
status: draft
last_review: 2026-08-11
confidence: medium
status_evidence: inferred
generated_with_standard: "1.0"
sources:
  - openspec/config.yaml
  - openspec/changes/document-repository-baseline/tasks.md
  - AGENTS.md
related:
  - coding-conventions.md
  - ../../AGENTS.md
---

# SDD workflow

## Overview

Spec-Driven Development uses **OpenSpec** for change artifacts and role separation:

| Agent | Role | OPSX workflows | Session |
| --- | --- | --- | --- |
| **planner** | Planning | propose, explore, new, continue, ff | planning only |
| **implementer** | Orchestrate apply | apply, verify | implementation |
| **code-writer** | Execute task group(s) | delegated by implementer | one batch session or one subagent per main group |
| **reviewer** | Review and close | sync, archive, commit when requested | separate from implementer |
| **task** | Ad-hoc work | none required | direct questions or small non-SDD tasks |

Global OPSX commands are expected to be installed on the developer machine. This repository was initialized with `openspec init --tools none`, so repo-local OPSX command files should not be created.

## OPSX syntax by tool

| Workflow | Cursor / Claude / Codex | OpenCode | Skill id fallback |
| --- | --- | --- | --- |
| explore | `/opsx:explore` | `/opsx-explore` | `openspec-explore` |
| propose | `/opsx:propose` | `/opsx-propose` | `openspec-propose` |
| ff | `/opsx:ff` | `/opsx-ff` | `openspec-ff-change` |
| apply | `/opsx:apply` | `/opsx-apply` | `openspec-apply-change` |
| verify | `/opsx:verify` | `/opsx-verify` | `openspec-verify-change` |
| sync | `/opsx:sync` | `/opsx-sync` | `openspec-sync-specs` |
| archive | `/opsx:archive` | `/opsx-archive` | `openspec-archive-change` |

OpenCode uses **hyphens**. Cursor, Claude Code, and Codex use **colons**. When slash syntax is uncertain, use the skill id fallback.

## Recommended flow

```text
/init-repo
planner      → explore → clarify scope → propose | ff
implementer  → delegate to code-writer → verify → reviewer handoff
reviewer     → review vs spec + verify evidence → sync → archive → commit only when requested
task         → ad-hoc questions or small direct work outside SDD
```

Use SDD when a change needs traceable requirements, implementation evidence, or spec-gated review. Use ad-hoc task work only for small informal changes.

## Task checklist rules

Planner-authored `tasks.md` files must use OpenSpec checkbox format:

```text
- [ ] 2.1 Task description
```

Include:

1. Step 0 branch creation or switch.
2. Tests run by code-writer and verified by implementer.
3. Manual/API/browser checks when behavior is user-facing.
4. Reports under the active change `reports/` directory.
5. Consumer documentation updates when APIs, behavior, or workflows change.

## Apply orchestration

Task states during apply:

| State | Format | Who writes |
| --- | --- | --- |
| Pending | `- [ ] 2.1 Description` | planner |
| In progress | `- [ ] 2.1 [wip] Description` | code-writer |
| Done | `- [x] 2.1 Description` | implementer after verification |

The implementer delegates by batch or by main group `X` for lines like `X.1`–`X.n`. Do not spawn one subagent per sub-line.

Batch mode is binding when `tasks.md` contains `<!-- execution: batch -->` or `<!-- execution: batch-force -->`. In batch mode, delegate all pending sub-lines in one code-writer session.

## Post-apply rule

If scope shifts after apply begins but before archive, update the OpenSpec change artifacts first. Then re-run apply and verify before reviewer handoff.

## Anti-patterns

- Planner running apply or archive.
- Implementer implementing tasks without code-writer delegation when code-writer is available.
- Code-writer marking `[x]` in `tasks.md`.
- Reviewer implementing features instead of reviewing.
- Skipping verify before reviewer handoff.
- Creating repo-local OPSX command duplicates after `openspec init --tools none`.
- Mixing OpenCode hyphen syntax with Cursor/Claude/Codex colon syntax in the same instruction.

## Open questions

- Should this repository require `/jira-prd` links for larger changes?
- Should documentation validation be automated before reviewer handoff?
