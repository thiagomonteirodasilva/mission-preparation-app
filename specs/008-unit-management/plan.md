# Implementation Plan: Unit Management Actions

**Branch**: `008-unit-management` | **Date**: 2026-11-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/008-unit-management/spec.md`

## Summary

Replace the per-unit “+ jovem” button with a unit-scoped actions menu for adding a young person, editing the unit name, or removing the unit; tapping outside the menu dismisses it without selecting an action. Add a unit edit route and repository operations for loading, renaming, and transactionally deleting a unit and its dependent young people and progress entries. Keep the existing local SQLite storage, Expo Router navigation, and manual-only verification policy; add no packages or automated tests.

## Technical Context

**Language/Version**: TypeScript (project range `^5.5.0`), React 18.2

**Primary Dependencies**: Expo 51, Expo Router 3, React Native 0.74, Expo SQLite 14, NativeWind 4; use installed dependencies only

**Storage**: Local SQLite database (`mission-preparation.db`); units, youngs, and progress_entries tables

**Testing**: Manual verification only; automated tests are prohibited by the project constitution. TypeScript typecheck may be used as a static validation command.

**Target Platform**: Expo mobile application; Android launch is required during implementation by the project constitution

**Project Type**: Mobile app

**Performance Goals**: No feature-specific performance target; interactions operate on local data and should retain current app responsiveness

**Constraints**: Preserve the database schema and data unrelated to the selected unit; confirmed removal deletes that unit, its young people, and their progress entries atomically while respecting foreign keys; no new dependencies or automated tests; retain Portuguese user-facing labels and the app's standard title/back navigation

**Scale/Scope**: One unit menu, unit rename screen, confirmation flow, repository update/delete behavior, and home-list refresh; no broader unit search, sorting, or bulk-management changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / constraint | Gate | Assessment |
|---|---|---|
| Clear, simple code and explicit responsibilities | PASS | Reuse the current component, repository, route, and existing modal patterns; add no abstraction or dependency unless needed by the feature. |
| Predictable behavior and explicit errors | PASS | Validate trimmed unit names, guard missing unit IDs, perform deletes atomically, retain visible error handling on failure, and ensure outside taps dismiss only the actions menu. |
| Manual verification only; no automated tests | PASS | Quickstart specifies manual scenarios only; no tests will be added. |
| English source identifiers; Portuguese UI copy allowed | PASS | New code identifiers remain English; requested labels and warning remain Portuguese. |
| Every screen has standard top app bar, `bg-sky-700`, and predictable back navigation | PASS | Register the edit route in the root stack with an “Editar Unidade” title; reuse the app's standard header and back behavior. |
| Android startup verification is required during implementation | PASS WITH EXECUTION GATE | The implementation phase must run `expo start --android` and record startup confirmation, or record the unavailable device/emulator limitation without claiming success. |
| Small project and few dependencies | PASS | Use React Native/Expo APIs and existing repository patterns; no additional package. |

No constitution violations or exceptions are required.

## Project Structure

### Documentation (this feature)

```text
specs/008-unit-management/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
└── tasks.md              # Created by /speckit-tasks, not by /speckit-plan
```

### Source Code (repository root)
```text
app/
├── _layout.tsx                    # Register edit route and title
├── index.tsx                      # Focus-refresh after edit; reload list after in-place removal
└── units/
    └── [unitId]/
        ├── _layout.tsx             # Nested stack for unit detail and edit screens
        ├── index.tsx                # Existing unit detail screen
        └── edit.tsx                 # Edit unit name
components/
└── UnitAccordion.tsx              # Unit-scoped actions menu and handlers
db/
└── repository.ts                  # Unit lookup, rename, and transactional deletion
```

**Structure Decision**: Extend the existing Expo Router mobile app directly. The root Stack continues to provide the app bar and back navigation. The menu is rendered in the existing unit accordion; its outside backdrop dismisses it while the menu panel remains interactive. The edit form gets a nested unit route so it cannot collide with the dynamic unit-details route. SQLite operations stay in the existing repository. The initial screen reloads units on focus after edit navigation returns and must explicitly reload after a confirmed in-place modal deletion; no global state-management layer is needed.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations.
