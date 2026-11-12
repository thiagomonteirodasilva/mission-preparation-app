# Quickstart: Verify Young Profile Save and Action Availability

## Prerequisites

- Install project dependencies and have an Android device or emulator available.
- Create a unit and a young-person record through the app so the young person's details route can be opened.

## Start the application

From the repository root, run `npm run android` and wait for the app to start on Android. The project constitution requires confirming Android startup during implementation. If no device or emulator is available, record that limitation and do not claim Android verification passed.

## Manual validation scenarios

1. Open a young person's details and change only the name. Select **Salvar**, confirm success feedback, return to the unit's young-person list, and verify the updated name and unchanged age are shown without restarting or manually refreshing the app.
2. Reopen the same profile and confirm the new name is still present. Repeat with age and gender individually, using valid values, and confirm each saved value persists.
3. Clear the name and select **Salvar**. Confirm the button remains available, existing validation appears, and the previously saved name remains unchanged. Repeat with an age below 16, above 25, or non-integer.
4. Confirm **Adicionar relato** remains available with an empty field. Select it and verify existing validation appears and no entry is added. Repeat with whitespace-only text.
5. Enter valid report text within the 1,000-character limit and select **Adicionar relato**. Confirm the report appears in the history and the input clears.
6. If a persistence failure can be induced safely, attempt a profile save and confirm the form retains the user's edits, no success feedback is shown, and the failure is communicated. Otherwise record that this failure case could not be induced manually.
7. Record the Android device/emulator, profile values used, routes checked, and any failures in the implementation review.

Automated tests are intentionally excluded because the project constitution prohibits them. Do not add a test suite for this feature.
