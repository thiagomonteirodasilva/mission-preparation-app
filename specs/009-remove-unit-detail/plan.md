# Implementation Plan: Remove Unused Unit Detail Screen

**Branch**: `009-remove-unit-detail` | **Date**: 2026-11-17 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [spec.md](spec.md)

## Summary

Remove the unused standalone unit-detail page while preserving the home-screen unit accordion and every existing unit-management and young-person flow. Research indicates that no in-app action navigates to the detail index. The safest approach is to remove that index screen and its nested Stack child entry, while retaining the nested unit layout and edit route so the edit form's parent-title and header behavior remains stable. Verify old links, navigation, data preservation, and app startup manually.

## Technical Context

**Language/Version**: TypeScript 5.5; Expo SDK 51 / React Native 0.74

**Primary Dependencies**: Expo Router 3.1, NativeWind 4; no new dependencies

**Storage**: SQLite through the existing repository; no schema or data changes

**Testing**: Manual flow verification only, as required by the constitution; run the existing TypeScript typecheck, but add no automated tests

**Target Platform**: Existing Expo targets: Android, iOS, and web

**Project Type**: Expo mobile application with a web target

**Performance Goals**: No new runtime work; home, edit, and young-person screens must remain responsive

**Constraints**: Keep unit editing nested under the unit ID, preserve the current shared app bar and predictable back behavior, retain the home accordion as the only unit-young-person list, and leave persistent data unchanged

**Scale/Scope**: Remove one unused route component and its child-screen registration; retain the nested layout and edit route; verify the root route configuration and affected user flows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: The change removes an unused screen without adding architectural layers or dependencies.
- PASS: Unit/young-person records and SQLite behavior are unchanged.
- PASS: Only manual functional verification is planned; no automated tests will be added.
- PASS: The existing unit edit route remains a non-home screen with its title and back action; the detail screen is not replaced by another page.
- PASS: Source changes remain small, explicit, and within the existing route structure.

## Project Structure

### Documentation (this feature)

```text
specs/009-remove-unit-detail/
├── plan.md              # This implementation plan
├── research.md          # Route and fallback decisions
├── data-model.md        # Confirms no persisted-model changes
├── quickstart.md        # Manual regression and startup checks
├── contracts/
│   └── README.md        # User-facing navigation contract
└── tasks.md             # Created later by /speckit-tasks
```

### Source Code (repository root)

```text
app/
├── _layout.tsx                    # Preserve root stack configuration for nested edit route
├── +not-found.tsx                 # Verify obsolete unit links have a safe return path
├── index.tsx                      # Preserve home accordion and focus refresh
└── units/
    └── [unitId]/
        ├── _layout.tsx             # Retain nested stack for edit; remove index child registration
        ├── edit.tsx                # Preserve edit form, title, save, and back behavior
        └── index.tsx               # Remove unused unit-detail page
components/
└── UnitAccordion.tsx              # Preserve direct young/edit/action navigation
```

**Structure Decision**: Keep the existing single Expo application and nested unit route container because the unit edit form is a child route and sets its title on the parent navigator. Remove only the unit-detail index and its nested Stack declaration. Keep the root's parent route configuration if required by the nested edit navigator; verify that the obsolete base URL resolves to the configured not-found flow rather than a blank route. Do not change the accordion, repository, persisted schema, or young-person screens except to correct a regression directly caused by route removal.

## Phase 0: Research

Research findings and decisions are recorded in [research.md](research.md). There are no unresolved technology or data-model choices. The remaining platform-specific risk—how the installed Expo Router 3.1 runtime resolves an obsolete deep link after removing the index—is addressed by an explicit manual check on supported targets.

## Phase 1: Design

- [data-model.md](data-model.md) records that no entities, fields, relationships, or persistence operations change.
- [contracts/README.md](contracts/README.md) defines the retained home, edit, new-young, and young-detail flows plus safe obsolete-link behavior.
- [quickstart.md](quickstart.md) defines manual regression checks, typecheck, and the required Android startup verification.

## Constitution Check (Post-Design)

- PASS: The design changes only route availability and navigation configuration needed to remove the unused page.
- PASS: The nested edit route, standard app bar title/back action, home accordion, and persistence flows remain within scope and are covered by manual checks.
- PASS: No database migration, dependency, abstraction, or automated test is introduced.
- PASS: Android startup verification is required before implementation is declared complete; if no emulator/device is available, the limitation must be recorded and Android verification must not be claimed as complete.

## Complexity Tracking

No constitution violations are introduced. The nested layout is intentionally retained because it already owns the edit child route and keeps its navigator/title relationship stable; removing it would add avoidable navigation and header risk.
