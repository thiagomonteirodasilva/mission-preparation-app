# Data Model: Consistent Visible App Bar

This feature introduces no persisted data and does not change the SQLite schema.

## Screen Metadata

- **Purpose**: Describes the presentation and navigation role of an existing Expo Router route.
- **Fields**:
  - `route`: Existing route path/name.
  - `title`: Stable, user-readable app-bar name.
  - `isHome`: Whether the route is the root screen and therefore omits the back affordance.
  - `backFallback`: Destination used when a non-home route has no prior in-app history; set to home.
- **Validation rules**: Every existing route must have a non-empty title. Exactly the home route is marked as home. Every other route has a back action and home fallback.

## App Bar

- **Purpose**: Shared, non-persistent navigation UI displayed while a screen is active.
- **Fields**:
  - `visible`: Always true for all existing routes.
  - `backgroundStyle`: NativeWind class `bg-sky-700`.
  - `screenTitle`: The active route's `title`.
  - `backAction`: Omitted on home; available on all non-home routes.
- **State transitions**: The app bar updates its title and back behavior when the active route changes. It does not own screen data or navigation history; it reflects the existing router state.
