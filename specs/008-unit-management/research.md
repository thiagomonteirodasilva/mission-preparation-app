# Research: Unit Management Actions

## Decision 1: Use the existing Expo Router, React Native, and NativeWind stack

- **Decision**: Implement the unit action menu and edit flow with dependencies already installed. Register the nested edit route in the existing Expo Router Stack.
- **Rationale**: The app already uses Expo Router for navigation, React Native `Pressable`/`Modal` for interactions, and NativeWind classes for styling. The root Stack supplies the required title bar, `bg-sky-700` background, and back navigation.
- **Alternatives considered**: Adding a menu package or a new navigation library was unnecessary and violates the project's simplicity preference.

## Decision 2: Keep rename and removal in the SQLite repository

- **Decision**: Add focused repository operations for loading a unit by ID, updating its name, and removing it with its dependent records.
- **Rationale**: Existing reads and writes are centralized in `db/repository.ts`. Loading by ID lets the edit route handle missing units explicitly; updating only `units.name` leaves the unit ID and young-person associations unchanged.
- **Alternatives considered**: Performing SQL directly in the screen would duplicate persistence responsibilities and make transaction handling less explicit.

## Decision 3: Delete dependent records in a single transaction

- **Decision**: When confirming removal, delete progress entries for the unit's young people, then those young people, then the unit, within one SQLite transaction. If any step fails, roll back and show an error rather than showing success.
- **Rationale**: The existing schema declares foreign keys from progress entries to young people and from young people to units, but does not enable `ON DELETE CASCADE`. The app enables SQLite foreign-key enforcement. Explicit ordered deletion prevents constraint failures and avoids orphaned progress records; the transaction prevents partial removal.
- **Alternatives considered**: Adding cascading foreign keys would require schema migration and database reinitialization decisions beyond this feature. Disabling foreign-key enforcement or deleting the unit alone risks invalid data and is rejected.

## Decision 4: Refresh home data on focus and after in-place removal

- **Decision**: Keep the unit list's existing focus-triggered load when edit navigation returns, and explicitly reload/update the list after confirmed removal because removal happens in a modal while the home screen remains focused.
- **Rationale**: `app/index.tsx` already reloads units and their young people in `useFocusEffect` after the edit route returns. Dismissing an in-place confirmation modal does not cause a focus event, so successful removal must notify the parent screen to load the updated SQLite data (or remove that unit from the displayed collection after repository success).
- **Alternatives considered**: Adding a global event bus or parallel state cache would duplicate the existing source of truth. Relying on focus after closing an in-place modal would leave stale data on screen.

## Decision 5: Use a unit-scoped menu and an explicit destructive confirmation

- **Decision**: The unit action button opens a menu with exactly the three specified choices. Remove opens a confirmation that interpolates the selected unit name and offers “Sim” and “Não”.
- **Rationale**: Each action must retain the unit context, and confirmation is required because deletion is irreversible and includes dependent people.
- **Alternatives considered**: Separate buttons increase clutter and do not match the request. Reusing the existing young-person confirmation unchanged cannot express the requested header, text, and choices; adapt or extend the existing modal pattern without changing the existing young-person flow.

## Decision 6: Dismiss the actions menu on outside tap only

- **Decision**: The open actions menu closes when the user taps its outside backdrop; tapping an option inside the panel continues to select that option. This behavior applies to the actions menu only, not the destructive-removal confirmation.
- **Rationale**: This matches the explicit dismissal requirement while preserving the confirmation safeguard for irreversible deletion. The current menu is presented with a transparent modal and a full-screen backdrop press target behind the panel, so the behavior can remain within existing React Native primitives.
- **Alternatives considered**: Requiring a dedicated close button adds an extra interaction and does not meet the requested outside-tap behavior. Making the whole modal dismiss on any press could swallow menu choices or dismiss the removal confirmation unexpectedly.

## Unresolved Questions

None. The feature description and existing app conventions provide reasonable defaults for routing, persistence, validation, and refresh behavior.