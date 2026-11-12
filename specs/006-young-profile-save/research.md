# Research: Young Profile Save and Action Availability

## Decision 1: Persist profile edits through the existing SQLite repository

- **Decision**: Add a focused update operation for an existing young-person record. It updates the editable profile values (`name`, `age`, `gender`) and refreshes `updatedAt`, keyed by the existing profile ID. Return the updated record or fail if no record was updated.
- **Rationale**: The existing details handler currently validates values and updates only local screen state ([details screen](../../app/young/%5ByoungId%5D.tsx#L68-L96)). The repository has an insert-only `saveYoung()` operation ([repository](../../db/repository.ts#L25-L52)), but the `youngs` table already includes all needed profile columns and an `updatedAt` field ([schema](../../db/schema.ts#L8-L16)). An update operation fixes persistence without a schema migration or a new abstraction.
- **Alternatives considered**: Reusing `saveYoung()` was rejected because it performs an insert and could create a duplicate record. Moving SQL into the screen was rejected because the repository is the established database boundary.

## Decision 2: Preserve validation while keeping both actions available

- **Decision**: Remove field-dependent disabled state and disabled styling from Save and Add Report. Keep validation in the action handlers and repository: profile name must be non-empty after trimming, age must remain an integer from 16 through 25, and report text must be non-empty after trimming and no longer than 1,000 characters.
- **Rationale**: Action availability and valid submission are separate concerns in the feature requirements. The user must be able to invoke each action; invalid values must still be rejected with the existing validation feedback in the [details screen](../../app/young/%5ByoungId%5D.tsx#L68-L117) and [repository](../../db/repository.ts#L81-L95).
- **Alternatives considered**: Removing validation was rejected because it could persist invalid profile data or empty reports. Keeping disabled state for invalid values was rejected because it contradicts the request.

## Decision 3: Refresh the unit's young-person list when it regains focus

- **Decision**: Reload the list from SQLite when the unit detail route receives focus, using Expo Router's existing `useFocusEffect` pattern and an active-result guard.
- **Rationale**: The [unit detail screen](../../app/units/%5BunitId%5D.tsx#L14-L35) currently fetches once on mount and can remain mounted underneath the pushed profile details route. A focus-time reload reads the committed source of truth when the user returns, using the existing [home-screen focus refresh pattern](../../app/index.tsx#L13-L38).
- **Alternatives considered**: Passing edited profile data through route parameters or shared state was rejected because it couples the editor to the list and can leave other entry paths stale. Polling was rejected as unnecessary for a local single-user app.

## Decision 4: Keep the current schema, app structure, and manual verification policy

- **Decision**: Reuse the `Young` and `ProgressEntry` types and current `youngs`/`progress_entries` tables. Add no dependency, table, or separate service layer. Verify the interactions manually, including Android launch, without automated tests.
- **Rationale**: All required fields and relationships already exist. The [project constitution](../../.specify/memory/constitution.md#L43-L46) requires manual-only verification and an [Android startup check for implementation tasks](../../.specify/memory/constitution.md#L80-L85), while also favoring a small codebase.
- **Alternatives considered**: A schema migration, an external API, a new state-management dependency, or automated tests were rejected as unnecessary or inconsistent with the project constitution.

## Error handling decision

- **Decision**: Keep entered values visible and do not show success or update the details screen's saved profile state until the profile update succeeds. If persistence fails, use the screen's existing error-feedback area to communicate that the save did not complete.
- **Rationale**: This avoids a false success state and follows the constitution's requirement for explicit, predictable error handling.
- **Alternatives considered**: Optimistically updating local state before the database confirms the write was rejected because it could make the screen disagree with the persisted record.

## Resolved Technical Context

The project uses TypeScript 5.5, Expo SDK 51, React Native 0.74, Expo Router 3, Expo SQLite 14, and NativeWind 4. Data is stored locally in SQLite. No unresolved technical choices or specification clarifications remain.
