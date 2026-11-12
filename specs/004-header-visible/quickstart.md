# Quickstart: Verify the Shared App Bar

## Prerequisites

- Node.js and the project dependencies are installed.
- A supported Expo target is available: web browser, Android emulator/device, or iOS simulator/device.

## Run the application

From the repository root, start the target you want to inspect:

- Web: `npm run web`
- Android: `npm run android`
- iOS: `npm run ios`

## Manual validation scenarios

1. Open the home route. Confirm the top app bar is visible, reads “Unidades,” uses the `bg-sky-700` background, and has no back affordance.
2. Open `/units` from home. Confirm the app bar reads “Nova unidade.” Use back and confirm home is restored.
3. Navigate directly to `/units/header-check` using the target's route/deep-link mechanism. No saved unit is required for this header check. Confirm the title specified in [the UI contract](contracts/README.md), then tap “Novo” to open `/young/new?unitId=header-check`. Confirm the new screen title and use back to return to the unit detail route.
4. Navigate directly to `/young/header-check`. No saved young record is required for this header check. Confirm the app-bar title and use back; with no prior in-app route, it must return to home.
5. Open `/young/new` from a unit detail route without saving. Confirm back restores the unit detail route and no existing data changes.
6. Open an unknown route. Confirm the not-found screen retains the shared app bar and provides a safe return to home.
7. Repeat the checks on each supported target used for release. Confirm title/back controls remain legible and do not overlap platform safe areas or obstruct screen interactions.

## Expected outcome

All existing routes satisfy the shared app-bar UI contract. Record the target(s), routes visited, and any failures in the change review. Automated tests are intentionally not part of this verification because the project constitution prohibits them.
