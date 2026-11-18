# Research: Screen Titles Only in Top Bars

## Decision 1: Remove only duplicate body headings

- **Decision**: Keep each existing top-bar title and remove the matching screen-title heading from the screen body. Preserve all other content and interactions.
- **Rationale**: The root navigation layout already owns the named top app bar, while route screens render their duplicate titles as the first content heading. Removing those heading elements directly is the smallest change that satisfies the feature without changing navigation or screen behavior.
- **Alternatives considered**: Hide all body text near the top of each screen (rejected because it could remove useful labels or messages); change the shared top-bar configuration (rejected because the top bar must remain the sole location of the screen name).

## Decision 2: Keep the implementation dependency-free

- **Decision**: Use the existing React Native screen content and routing setup; add no package or shared abstraction.
- **Rationale**: The requested behavior is limited to presentation of six existing route titles, and the current code already separates top-bar titles from body content.
- **Alternatives considered**: Add a shared title component or a new title-management layer (rejected as unnecessary complexity for removing existing headings).

## Decision 3: Verify manually and type-check

- **Decision**: Verify the affected screens and workflows manually, run the existing TypeScript type check, and perform the constitution-required Android launch check during implementation. Do not add automated tests.
- **Rationale**: Project constitution principle V prohibits automated tests and requires proportional manual verification; the development workflow requires an Android launch check for implementation tasks.
- **Alternatives considered**: Add UI automation tests (rejected because it violates the constitution); rely only on source inspection (rejected because the visible result and preserved interactions must be confirmed).

## Resolved Technical Context

- Existing route titles are configured in `app/_layout.tsx`; the route body headings are in the home, unit creation/edit, young-person creation/details, and not-found screens.
- No unknown technology choice, data migration, external service, or new dependency is required.
- There are no unresolved clarification items.
