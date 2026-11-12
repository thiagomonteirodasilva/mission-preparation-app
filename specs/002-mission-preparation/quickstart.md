# Quickstart

## Prerequisites

- Node.js 18+ with npm enabled
- Expo CLI available through the local project install or `npx expo`
- An Android or iOS simulator, or a physical device with Expo Go

## Setup

```bash
npm install
```

If the project does not yet include the required Expo packages, install them explicitly:

```bash
npm install expo expo-router expo-sqlite nativewind tailwindcss
```

## Run the app

```bash
npx expo start
```

Then open the app in an emulator or via Expo Go.

## Manual validation checklist

1. Open the home screen and verify units are listed alphabetically.
2. Expand a unit and confirm young people appear alphabetically.
3. Add a new unit and confirm the success toast appears.
4. After saving the unit and returning home, verify it appears in the alphabetically sorted list without restarting or reopening the home screen.
5. Add a young to a unit and verify age is shown next to the name.
6. After saving the young and returning home, expand the associated unit and verify the young appears with the saved name and age.
7. Edit a young's name or age, save, return home, expand the associated unit, and verify the updated values appear without reopening the app.
8. Attempt to save a young with age 15 and confirm the exact validation message appears.
9. Attempt to save a young with age 26 and confirm the exact validation message appears.
10. Open a young detail screen, add a progress entry without entering a date, and verify the app assigns the date automatically, displays it as DD/MM/YYYY, and lists newest entries first. Attempt to add text longer than 1000 characters and confirm it is rejected.
11. Confirm the delete flow shows the confirmation message and no data is lost if canceled.
12. Confirm deletion removes the young and their progress entries only after explicit confirmation.

## Expected results

- The screen flow is fully usable without a backend.
- Local persistence remains available across app restarts because the database is stored in Expo SQLite.
- Labels and success messages appear in Portuguese while application code remains English-compliant.
