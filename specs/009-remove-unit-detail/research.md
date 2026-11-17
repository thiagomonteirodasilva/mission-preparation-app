# Research: Remove Unused Unit Detail Screen

## Decisions

### Keep the nested unit stack for the edit route

- **Decision**: Remove only the unit-detail index screen and its `index` child registration. Keep the nested unit layout and the edit child route; audit the root Stack registration so it continues to support the nested edit path without exposing the removed screen.
- **Rationale**: The actions menu navigates directly to the edit route, and the edit screen sets its title on its parent navigator. Removing the nested layout could change header/title behavior and is unnecessary for removing the unused page.
- **Alternatives considered**: Delete the entire dynamic unit directory or nested layout. Rejected because the directory contains the required edit route and the nested navigator supplies its current title/header relationship.

### Preserve home-screen browsing and data flows

- **Decision**: Leave unit expansion, the young-person list, direct young-person navigation, unit actions, and persistence behavior unchanged.
- **Rationale**: The original unit-management requirement is fulfilled by expanding units on the home screen. Repository inspection found no application navigation call to the unit-detail index; actions navigate directly to adding a young person, editing a unit, or a modal removal flow.
- **Alternatives considered**: Redirect existing actions through the unit-detail page. Rejected because it would restore the unnecessary intermediate flow and contradict the feature specification.

### Handle obsolete entries through the existing unmatched-route behavior

- **Decision**: Verify that an old direct link to a unit's former detail URL resolves to the app's not-found screen and that the shared back action returns to home when no prior route exists. Add a visible home action only if runtime verification shows the current back affordance is insufficient.
- **Rationale**: Expo Router documents automatic unmatched-route handling and recommends providing a link to `/`; the app has a shared back action that falls back to `/` and a configured not-found route. Exact behavior must still be checked in the project's Expo Router 3.1 / SDK 51 runtime.
- **Alternatives considered**: Add a redirect for every obsolete unit URL. Rejected unless manual validation demonstrates it is needed; no current in-app caller uses that route.

## Findings

- The root layout declares the dynamic unit parent route and a title for “Jovens da unidade”. The nested unit layout hides its own header and currently declares both the detail index and edit child.
- The unit actions menu links to `/young/new` with the selected unit ID and `/units/[unitId]/edit`; unit removal is handled in place.
- The home screen already loads units with their young people and expands/collapses them. Selecting a young person opens that person's details directly.
- The edit form updates only the selected unit and returns with `router.back()`. It currently updates the parent navigator title to “Editar Unidade”.
- No database or persisted-model change is required. The unit-detail screen's `loadYoungsByUnit` call is not required by the other in-app browsing flow, which loads unit/young data on the home screen.
- The current `+not-found` screen displays “Página não encontrada”; the shared root header supplies a back control that falls back to home when navigation history is unavailable.

## References

- [Expo Router Stack documentation](https://docs.expo.dev/router/advanced/stack/): file-based Stack routes and static/dynamic screen options.
- [Expo Router error handling documentation](https://docs.expo.dev/router/error-handling/): unmatched routes and `+not-found` behavior; recommends a way to navigate to `/`.
- Project runtime is Expo SDK 51 with Expo Router 3.1. No dependency upgrade is part of this feature.
