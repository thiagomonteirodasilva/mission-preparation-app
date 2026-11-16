# Quickstart: Remove Unused Code

## Prerequisites

- Node.js and the project dependencies are installed.
- An Android device or emulator is available for the required launch check.

## Validation

1. Search application source for `useUnits`, `useYoungs`, and `STRINGS`; verify there are no remaining code references after deletion. Ignore historical specification documents.
2. Run `npm run typecheck` from the repository root. Expected result: TypeScript exits successfully with no diagnostics.
3. Run `expo start --android` from the repository root. Expected result: Expo starts the app on the Android device/emulator.
4. Manually navigate through the existing primary app flows. Expected result: the screens behave as before and existing persisted data remains available.

If no Android device or emulator is available, record the limitation and startup result; do not mark Android verification complete.
