# Quickstart: Verify Screen Titles Only in Top Bars

## Prerequisites

- Install the project dependencies with `npm install` if they are not already installed.
- Have an Android device or emulator available for the required launch check.

## Validation

1. From the repository root, run `npm run typecheck`. **Expected**: TypeScript completes without errors.
2. Run `npm run android`. **Expected**: The app starts on Android and the home screen appears.
3. Visit the home, new-unit, edit-unit, new-young-person, young-person-details, and not-found screens. **Expected**: Each screen's name remains in the top bar and is not repeated as a body title.
4. On forms and details, inspect labels, section headings, messages, and actions. **Expected**: All content other than the duplicate screen title remains visible.
5. Exercise the existing navigation and screen actions, including back navigation and representative form/detail interactions. **Expected**: They behave as before; no automated test suite is added.

Record the Android launch outcome and any manual verification limitation in the implementation review, as required by the project constitution.