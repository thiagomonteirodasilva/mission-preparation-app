# Research: Young Profile and Entry Validation

## Decision 1: Load the selected profile through a focused repository query

- **Decision**: Add a typed repository lookup by young-person ID using the existing `youngs` table and the project's synchronous SQLite query pattern.
- **Rationale**: The details screen currently creates a fabricated sample profile, while the repository only exposes list queries. A single-record lookup provides the actual saved name and profile values without changing the schema or loading unrelated profiles.
- **Alternatives considered**: Reusing a unit-scoped list query was rejected because the detail route has the young-person ID but not a trusted unit ID. Moving SQL into the screen was rejected because the repository owns database access.
- **Failure handling**: Keep loading distinct from not-found or query failure. Do not populate a fabricated profile. If the profile is absent or profile/detail loading fails, use the existing screen-level `SaveToast` with the exact message `Não foi possível exibir as informações do jovem. Tente novamente`, keep it visible for the existing two-second toast duration, and then call the existing back navigation action. The toast is currently local to the details screen, so navigating back immediately would unmount it before the user could see it.

## Decision 2: Derive action readiness from current field values

- **Decision**: Keep the profile action unavailable until the profile is loaded and the trimmed name, age text, and selected gender are present. Keep the report action unavailable until its trimmed text is non-empty. Use the existing pressable disabled behavior and a visually distinct disabled treatment while retaining the required shared blue background.
- **Rationale**: This directly expresses the feature's required-field rules, prevents whitespace-only submissions, and avoids changing age validation or report-length validation.
- **Alternatives considered**: Duplicating readiness rules in the repository was rejected because action availability is immediate UI state; removing existing validation was rejected because presence does not imply a valid age or an allowed report length.

## Decision 3: Preserve existing save and report behavior

- **Decision**: Keep the existing profile validation and local save response, and keep the existing progress-entry persistence, ordering, toast, and field-clearing behavior. Do not introduce a profile-update database operation as part of this feature.
- **Rationale**: The specification requires preserving current behavior and focuses on the source of the displayed profile plus when actions are enabled. The current profile handler updates screen state but does not persist profile edits; broadening persistence would exceed the stated scope.
- **Alternatives considered**: Adding a profile update query was rejected as unrelated scope that would change existing save semantics and require a separate requirement.

## Decision 4: Reuse the existing button color and avoid automated tests

- **Decision**: Use the existing NativeWind `bg-sky-700` utility for both actions and verify the profile load, field readiness, report submission, and appearance manually on Android.
- **Rationale**: The project constitution mandates this shared color, prohibits automated tests, and requires Android launch verification during implementation.
- **Alternatives considered**: Introducing a new color token or dependency was rejected because the project already defines the required utility and styling system. Automated UI tests were rejected because they violate the constitution.

## Decision 5: Preserve profile-save persistence semantics

- **Decision**: Preserve the current profile save behavior, which validates and updates the in-screen profile state but does not write profile edits to SQLite. Do not add a profile-update operation.
- **Rationale**: The specification requires preserving existing save behavior and does not ask to change persistence. The added database interaction is a read required to show the selected saved profile; profile-update persistence is a separate behavior change.
- **Alternatives considered**: Adding a profile update query was rejected as scope expansion not required by the current functional requirements.

## Resolved Technical Context

The app is TypeScript 5.5 on Expo SDK 51 / React Native 0.74, with Expo Router 3, Expo SQLite 14, and NativeWind 4. The `Young` and `ProgressEntry` types and the SQLite schema already contain all required fields. Only a single-profile read and screen-level readiness styling are needed; there is no data migration or external service integration.