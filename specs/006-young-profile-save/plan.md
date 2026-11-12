# Implementation Plan: Young Profile Save and Action Availability

**Branch**: `006-young-profile-save` | **Date**: 2026-11-12 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/006-young-profile-save/spec.md`

## Summary

Persist valid edits to the selected young person's profile, keep the Save and Add Report actions available regardless of field contents while preserving validation, and refresh the unit's young-person list when the user returns from the details screen. Use the existing SQLite repository and Expo Router focus lifecycle; add no schema changes, dependencies, or automated tests.

## Technical Context

**Language/Version**: TypeScript 5.5; Expo SDK 51 / React Native 0.74

**Primary Dependencies**: Expo Router 3, Expo SQLite 14, React Native, NativeWind 4; no new dependencies

**Storage**: Existing local SQLite database; update the existing `youngs` record and retain `progress_entries`; no schema migration

**Testing**: Manual verification only; automated tests are prohibited by the project constitution

**Target Platform**: Existing Expo targets: Android, iOS, and web; Android startup verification is required during implementation

**Project Type**: Mobile app with Expo web target

**Performance Goals**: No feature-specific performance target; use the existing local SQLite access pattern

**Constraints**: Preserve name and age validation (integer age 16–25), progress text validation (non-empty and at most 1,000 characters), existing data ordering, and `bg-sky-700` styling; keep both actions actionable; do not add automated tests

**Scale/Scope**: Young details screen, unit detail list refresh, and one new profile-update operation in the existing repository; no schema, route, or dependency changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: The change stays within the existing details screen, unit list, and SQLite repository; no new dependency, service layer, or schema is needed.
- PASS: Data access remains in the repository, and the screen consumes the existing typed `Young` profile.
- PASS: Existing validation remains active when users invoke the always-available actions; persistence failures must not be reported as successful saves.
- PASS: No automated tests are planned. Manual checks cover valid and invalid inputs, profile persistence, list refresh, report submission, and relevant failures.
- PASS: The existing top app bar, route structure, app styling, and predictable back navigation are unchanged.
- PASS: Android startup is included in implementation verification; if no device/emulator is available, that limitation must be recorded.

## Project Structure

### Documentation (this feature)

```text
specs/006-young-profile-save/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
```text
app/
├── young/[youngId].tsx       # Validate and persist profile; keep action buttons actionable
└── units/[unitId].tsx        # Reload young-person list when the route regains focus
db/
└── repository.ts             # Update an existing Young record in SQLite
types/
└── index.ts                  # Reuse the existing Young and ProgressEntry types
```

**Structure Decision**: Keep the current single Expo application structure. Add the profile update to the existing repository, retain validation in the existing details-screen flow, and refresh the existing unit list on focus. No API layer, test directory, new module, or data migration is needed. The local user interaction contract is documented in `contracts/README.md`.

## Complexity Tracking

No constitution violations are planned. Updating the existing record and refreshing the existing list on focus are the smallest changes that satisfy the persistence and freshness requirements.

## Constitution Check (Post-Design)

- PASS: The design uses existing SQLite tables and repository boundaries; no schema migration or new dependency is required.
- PASS: Both actions remain actionable while existing validation prevents invalid writes and empty reports.
- PASS: The unit list reloads the persisted source of truth on focus; no navigation-state coupling or polling is introduced.
- PASS: Persistence errors do not produce success feedback or replace the user's entered values.
- PASS: Verification remains manual only and includes Android startup confirmation or a recorded environment limitation.
