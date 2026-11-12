# Research: Consistent Visible App Bar

## Decision 1: Configure the shared Expo Router stack

- **Decision**: Keep one shared header configuration in the root Expo Router stack and provide stable titles for each route.
- **Rationale**: All current screens are stack routes, and the root layout already owns the stack-wide `headerShown` setting. A single shared configuration prevents route-level drift and does not add a dependency.
- **Alternatives considered**: Duplicating full header configuration on each screen was rejected because it repeats behavior and makes consistency harder to maintain.

## Decision 2: Preserve the native stack's navigation affordances

- **Decision**: Use the stack header's route-aware back affordance for non-home routes, with a home fallback when there is no prior in-app history.
- **Rationale**: Expo Router already uses the React Navigation stack, so its navigation state can provide predictable return behavior while keeping platform conventions.
- **Alternatives considered**: Replacing the complete header with a custom navigation implementation was rejected because the feature does not need to replace native stack navigation.

## Decision 3: Apply the constitutional color token through a shared header background

- **Decision**: Render the app bar background using the existing NativeWind `bg-sky-700` utility in shared header configuration, while keeping readable title/back affordances.
- **Rationale**: The constitution explicitly requires this class, and NativeWind is already a project dependency. A shared background avoids introducing a design system or new package.
- **Alternatives considered**: Adding a hex color directly in route styles was rejected because it would duplicate the shared style and would not apply the required class.

## Decision 4: Validate manually, without adding automated tests

- **Decision**: Verify each route and back-navigation path using the running Expo app on configured targets.
- **Rationale**: The constitution explicitly prohibits automated tests and requires proportional manual verification.
- **Alternatives considered**: Adding UI or navigation tests was rejected as a direct constitution violation.

## Resolved Technical Context

The project is an Expo 51 / React Native 0.74 TypeScript app using Expo Router 3 and NativeWind 4. No data migration or persistence change is needed. The current root stack has `headerShown: true`, but route-specific titles, required styling, and predictable non-home back behavior still need to be covered by the feature design and implementation.