# Implementation Plan: Remove Unused Code

**Branch**: `007-unused-code-cleanup` | **Date**: 2026-11-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/007-unused-code-cleanup/spec.md`

## Summary

Remove the two unreferenced hook modules and the unreferenced shared strings module, deleting the hooks directory only after it becomes empty. No replacement behavior or data-model changes are required. Verify the source references before deletion, then run the project's type check and manually launch the Android app.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.5; React Native 0.74.5

**Primary Dependencies**: Expo ~51.0.28, Expo Router ~3.1.0, React 18.2.0

**Storage**: Expo SQLite (unchanged; no data changes)

**Testing**: No automated test suite per project constitution; use `npm run typecheck` and manual app verification

**Target Platform**: Android and iOS via Expo; Android launch is required for implementation verification

**Project Type**: Mobile application

**Performance Goals**: No performance change; cleanup removes unused source only

**Constraints**: Preserve application behavior and persisted data; add no dependencies or automated tests; remove only artifacts confirmed unused

**Scale/Scope**: Three source files (`hooks/useUnits.ts`, `hooks/useYoungs.ts`, `constants/strings.ts`) and the hooks directory if empty

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Constitution requirement | Assessment |
|---|---|
| Keep the change simple and avoid unnecessary dependencies or abstractions | PASS — delete only confirmed-unused files; no dependencies or replacement abstractions |
| Preserve clear module boundaries and predictable behavior | PASS — verify references before removal; no runtime behavior or data changes are intended |
| Do not add automated tests; perform proportional manual verification | PASS — use the existing type-check command and manually launch the app |
| Follow English naming in source | PASS — no new source identifiers or user-facing text are introduced |
| Required Android launch check for implementation work | PASS as a plan requirement — `expo start --android` must be attempted and its result recorded |

No constitution violations are anticipated.

## Project Structure

### Documentation (this feature)

```text
specs/007-unused-code-cleanup/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md             # Created by /speckit-tasks, not by /speckit-plan
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
app/                    # Expo Router screens
components/             # Shared UI components
constants/              # Shared constants; strings.ts is unused
db/                     # SQLite schema, seed, and repository
hooks/                  # Contains only the two unused hook modules
lib/                    # Shared utilities
types/                  # Shared types
```

**Structure Decision**: Keep the existing single Expo application structure. This cleanup only removes the three confirmed-unused modules and the hooks directory if it is empty; no new source directories or public interfaces are introduced.

**Contracts**: No contract artifact is needed. The change removes internal, unreferenced modules and does not change the app's screens, navigation, or interactions exposed to users or other systems.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | No constitution violations identified | Not applicable |
