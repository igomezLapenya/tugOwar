---
title: UI conventions
description: Observed Tailwind and Angular template conventions for the poll UI
type: reference
status: draft
last_review: 2026-08-11
confidence: medium
status_evidence: inferred
generated_with_standard: "1.0"
sources:
  - tailwind.config.js
  - src/styles.css
  - src/app/app.component.html
  - src/app/components/vote/vote.component.html
  - src/app/components/tally/tally.component.html
related:
  - coding-conventions.md
  - ../02-architecture/component-model.md
---

# UI conventions

## Styling

The app uses Tailwind CSS. `src/styles.css` imports Tailwind base, components, and utilities; `tailwind.config.js` scans `./src/**/*.{html,ts}`.

Prefer utility classes in component templates for layout, spacing, colors, borders, and responsive behavior, matching `src/app/app.component.html`.

## Template state

Use Angular control-flow blocks such as `@if` for UI states. The root template currently distinguishes anonymous users, authenticated allowed voters, and authenticated unauthorized users.

## Language and copy

Product UI copy is Spanish in current templates. Keep user-facing copy consistent unless a change explicitly updates localization strategy.

## Accessibility

Preserve existing alt text and semantic button behavior when modifying UI. New icon-only or image elements should include accessible names or be marked decorative as appropriate.

## Open questions

- Should the app define shared design tokens beyond Tailwind defaults?
- Should UI documentation include screenshots after manual E2E verification?
