# Quickstart: Verify Young Details Form Readiness

## Prerequisites

- Install the project dependencies and have an Android device or emulator available.
- Create a unit and a young-person record using the existing app flow so the details route can load a real saved profile.

## Start the application

From the repository root, run `npm run android` and wait for the app to open on the Android target. This Android launch check is required by the project constitution for implementation tasks.

## Manual validation scenarios

1. Open a saved young person's details. Confirm the name field matches the saved record and is not a generic example name; confirm the saved age and gender are shown.
2. Confirm **Salvar** uses the app bar's `bg-sky-700` background and is available when all profile fields have values.
3. Clear the name field or enter only spaces. Confirm **Salvar** becomes unavailable. Restore a name, clear the age, and confirm the same behavior; restore a non-empty age.
4. Enter a non-integer or an age outside the existing 16–25 range while keeping all fields present. Confirm the action's readiness follows field presence and existing age validation still rejects the invalid value when attempted.
5. Confirm **Adicionar relato** uses `bg-sky-700` and is unavailable for an empty or whitespace-only report. Enter non-whitespace text and confirm the action becomes available.
6. Submit a report within the existing length limit. Confirm it appears in the progress history, the input clears, the action becomes unavailable again, and the existing success feedback remains.
7. Open a details route for an ID with no saved profile. Confirm no fabricated profile is shown, the toast says **“Não foi possível exibir as informações do jovem. Tente novamente”**, remains visible for about two seconds, then the app returns to the previous screen.
8. If feasible in the manual environment, verify a profile/details loading failure follows the same toast-and-return behavior; record when this failure condition cannot be safely induced.
9. Repeat on each target required for release, if applicable. Record the Android device/emulator, routes and states checked, and any failures in the change review.

Automated tests are intentionally excluded because the project constitution prohibits them.