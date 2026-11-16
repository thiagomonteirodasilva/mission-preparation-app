# Quickstart: Unit Management Actions

## Prerequisites

- Node.js and the project dependencies are installed.
- An Android device or emulator is available for the required implementation startup check.
- The app can create at least two units, and one unit can have one or more young people with progress entries.

## Start and static validation

1. Run `npm run typecheck`; expect no TypeScript errors.
2. Run `npm run android`; confirm the Expo app starts on Android. If no device or emulator is available, record the limitation and do not claim Android startup passed.
3. Use the app's existing screens to create two units; add at least one young person and progress entry to one unit.

## Manual end-to-end scenarios

1. **Menu, dismissal, and add young person**: On the initial unit list, open a unit's action menu. Confirm the three options are shown. Tap outside the menu panel and verify it closes without navigation, mutation, or confirmation. Reopen it and select “Adicionar Jovem”; save a young person, return to the initial screen, and verify that person belongs to the unit used to open the menu. Also select an option inside the panel to verify the menu's interior remains interactive.
2. **Rename**: Select “Editar Unidade”. Verify the current name is prefilled and the app bar says “Editar Unidade”. Save a new non-empty name; verify the updated name appears on the initial screen and the unit's young people remain. Repeat with an empty/whitespace name and confirm it is rejected. Change a name and navigate back without saving; verify no change persisted. If practical, open the edit route with a missing or nonexistent unit ID and verify clear feedback and safe return without saving.
3. **Cancel removal**: Select “Remover Unidade”. Verify the header, exact warning copy with the selected unit name, and “Sim”/“Não” choices. Choose “Não”; verify the unit, its young people, and their progress entries remain.
4. **Confirm removal**: Repeat removal and choose “Sim”. Verify the unit, its young people, and their progress reports are removed; the initial screen omits the unit and the other unit and its young people remain.
5. **Remove empty unit**: Remove a unit with no young people after confirmation; verify only that unit disappears.
6. **Error behavior**: If a persistence failure can be safely induced in the local development environment, confirm the app does not show success and no partial deletion is visible. If a post-deletion refresh failure can be safely simulated, confirm the deleted unit remains absent and a refresh error is shown. Do not corrupt user data to force either scenario.

## Expected outcome

All manual scenarios match the [UI contract](contracts/ui.md) and [data model](data-model.md). Automated tests are intentionally not part of this project.