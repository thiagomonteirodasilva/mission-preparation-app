# Research

## Decision: Expo Router with local SQLite and NativeWind

The application will be built as a single Expo mobile app using Expo Router for route-based navigation, Expo SQLite for local persistence, and NativeWind for styling. This is the most direct fit for a small offline-first app with simple screen flows and no server backend.

### Rationale
- Expo Router keeps navigation simple and aligned with a small app that has a unit list, unit detail list, and young details screens.
- Expo SQLite removes the need for an external database service while supporting local CRUD and chronological listing of progress entries.
- NativeWind follows the project requirement and keeps styling concise without introducing a separate CSS-in-JS or platform-specific setup.
- TypeScript keeps validation and data contracts explicit without adding complexity beyond the expected scope.

### Alternatives considered
- React Navigation + custom screen components: workable, but Expo Router is more integrated with Expo and reduces boilerplate for a small route-heavy app.
- AsyncStorage: simpler for tiny persisted values, but not a good fit for structured relational data with queries and chronological sorting.
- Tailwind or custom style objects without NativeWind: possible, but NativeWind matches the requested styling system directly.

## Decision: Single app with focused local data layer

The app will use one Expo project with a lightweight local repository module (`db/repository.ts`) and a single schema (`db/schema.ts`). Business rules stay close to the feature and are validated in a small `lib/validators.ts` helper instead of a formal service layer.

### Rationale
- The feature is intentionally small and should not require a backend or layered architecture.
- Local database access is best kept central in a repository module so screens remain simple and consistent.
- Age and text validation are straightforward enough to live near the form logic without creating an unnecessary abstraction.

### Alternatives considered
- Full repository/service pattern across modules: more maintainable at scale but too heavy for this size.
- Put SQL directly in each screen: faster to prototype but harder to maintain and validate consistently.

## Decision: Portuguese UI, English source identifiers

The feature UI is written in Portuguese to match the user expectation, while the data model, code identifiers, table names, columns, and comments remain in English to satisfy the constitution.

### Rationale
- This keeps the app natural for end users while preserving a consistent codebase for collaborative maintenance.
- It also matches the project rule that code identifiers stay in English even when the UI uses Portuguese.

### Alternatives considered
- Entire app in Portuguese code identifiers: simpler for a single developer, but violates the constitution.
- Entire app in English UI: less aligned with the product requirement and end-user expectations.

## Decision: Manual validation only

The project will not add an automated test suite. Validation will be manual through a short checklist on the Expo app flows: create unit, create young, form validation errors, edit young, add progress entries, delete confirm flow, and ordering checks.

### Rationale
- The constitution explicitly requires no automated tests for this project.
- The feature is small enough for direct manual verification without building test infrastructure.

### Alternatives considered
- Jest/Expo testing setup: conflicts with the no-automated-tests rule.
- No validation plan: does not meet the governance requirement.

## Decision: Refresh home data when its route regains focus

The home route will reload `loadUnitsWithYoungs()` through Expo Router's existing `useFocusEffect` lifecycle API. The root route remains mounted while a form route is pushed, so the current mount-only `useEffect` does not run again after `router.back()` and leaves its local list stale. Refreshing on focus covers unit creation, young creation, and young edits through the same path.

### Rationale
- Expo Router 3 is already a project dependency and exposes the screen-focus lifecycle needed for this behavior.
- The SQLite repository is already the source of truth and provides the combined ordered unit/young data needed by the home screen.
- A focus-triggered reload avoids introducing cross-screen state, event channels, route-result parameters, or a new dependency.
- The refresh replaces list data while retaining the existing expanded-unit selection; the user can expand a unit to inspect its latest young list.

### Alternatives considered
- Refresh only after the home screen mounts: rejected because the route is retained in the navigation stack and is not remounted after returning from a form.
- Pass saved records or refresh identifiers through route parameters: rejected because it duplicates persisted state and adds coupling between forms and the home screen.
- Add a shared state store or event bus: rejected as unnecessary for a single local list and an existing focus lifecycle hook.

### Failure handling
- Reuse the home screen's existing loading error message when a focus refresh fails; do not report the refresh as successful or replace the displayed list with partial results.
- Ignore late results from a focus callback after the screen has blurred, preventing an outdated request from overwriting a newer screen state.

## Decision: Assign progress dates automatically

Progress dates remain system-assigned from the device date when the user saves a report. Users enter report text only; the app rejects text longer than 1000 characters and displays the saved date as `DD/MM/YYYY`. The save-and-return refresh does not change this behavior or the existing stored date representation.

### Rationale
- This matches the clarified acceptance scenario and functional requirements: a missing user-entered date is not a valid rejection case because no date field is provided.
- It preserves the existing data model, local persistence, and report ordering.

### Alternatives considered
- Requiring users to enter a date: rejected because the feature specifies automatic date assignment and the progress form has no date input.
