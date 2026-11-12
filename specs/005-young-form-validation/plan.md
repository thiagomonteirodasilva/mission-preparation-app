# Implementation Plan: Young Profile and Entry Validation

**Branch**: `005-young-form-validation` | **Date**: 2026-11-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/005-young-form-validation/spec.md`

## Summary

Load the selected young person's actual profile from local storage, then keep the profile save and progress-entry actions unavailable until their required field values are present. If the profile is missing or loading profile details fails, show the specified Portuguese error toast for two seconds and return to the previous screen. Apply the existing app-bar blue to both actions, preserve current validation and submission behavior, and verify the flows manually without introducing automated tests.

## Technical Context

**Language/Version**: TypeScript 5.5; Expo SDK 51 / React Native 0.74

**Primary Dependencies**: Expo Router 3, Expo SQLite 14, React Native, NativeWind 4; no new dependencies

**Storage**: Existing local SQLite database; `youngs` and `progress_entries` tables; no schema change

**Testing**: Manual verification only, as required by the constitution; do not add automated tests

**Target Platform**: Existing Expo targets: Android, iOS, and web

**Project Type**: Mobile app with Expo web target

**Performance Goals**: No additional performance target is defined for this change; use the existing local database access pattern.

**Constraints**: Reuse the repository's synchronous SQLite access pattern; use `bg-sky-700` for both actions; preserve current validation and submission behavior; manual validation only

**Scale/Scope**: One young-person details screen, a single-profile read operation, and its two form actions; no schema or route changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: The change is localized to the existing details screen and repository, with no new dependency or unnecessary abstraction.
- PASS: The required app-bar color class `bg-sky-700` is reused for the profile and progress-entry actions.
- PASS: Existing name/age validation and progress-entry length and persistence behavior remain in force.
- PASS: Database access remains in the repository; the screen consumes a typed profile record.
- PASS: No automated tests are introduced; the feature is verified manually.
- PASS: The details screen's fabricated sample profile is replaced by a focused read of the selected record; absent records and read failures follow the specified toast-and-return flow.
- ASSUMPTION: The existing profile save only updates screen state, not the database. This feature preserves that behavior and does not add profile-update persistence because the specification requires existing behavior to remain unchanged.

## Project Structure

### Documentation (this feature)

```text
specs/005-young-form-validation/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
```text
app/young/[youngId].tsx       # Load the selected profile; gate both form actions; apply shared color
db/repository.ts              # Add a focused lookup for a young person by ID
types/index.ts                # Reuse the existing Young and ProgressEntry types
```

**Structure Decision**: Keep the existing Expo application structure. Add only the single-record read needed for the screen to display the actual saved profile; keep action readiness derived from current screen values and retain existing repository and validation boundaries. Reuse the screen-level toast for the specified error message, leave the route active for its two-second display duration, and then return with the existing router back action. The feature exposes a user-facing UI contract, documented in `contracts/README.md`; it does not add an external API.

## Complexity Tracking

No constitution violations are planned. The focused profile lookup is necessary to replace the fabricated sample with the selected saved record; adding a schema change or new persistence abstraction is not needed.

## Constitution Check (Post-Design)

- PASS: The design uses the existing SQLite repository and screen state without adding dependencies or architecture.
- PASS: Both actions use the required `bg-sky-700` background and communicate disabled state without changing the required color.
- PASS: Existing profile validation, progress-entry validation, and data ordering are preserved.
- PASS: Missing-profile and profile-loading failures show the exact Portuguese message before returning to the previous screen.
- PASS: No automated tests are planned; manual Android verification is documented in the quickstart.
- PASS: No schema migration, route change, or unrelated persistence behavior is introduced.
