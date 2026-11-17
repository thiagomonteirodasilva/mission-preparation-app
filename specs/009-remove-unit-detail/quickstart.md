# Quickstart: Remove Unused Unit Detail Screen

## Prerequisites

- Use an Android emulator/device for the required startup check; use iOS or web as additional supported targets when available.
- Have a unit with at least one young person, a unit with no young people, and a disposable unit available for removal checks.
- Use existing sample data only; no database reset or migration is expected.

## Static and startup checks

From the repository root:

1. Run `npm run typecheck`; expect no TypeScript errors.
2. Run `npm run android`; confirm the Expo app starts on an Android emulator/device and reaches the home screen. If no device is available, record the limitation and do not mark Android startup verification complete.

## Manual regression scenarios

1. **Home accordion**: Open the home screen. Expand a populated unit and confirm young-person names and ages appear inline. Collapse it, then expand the empty unit and confirm the existing empty-state message. No separate “Jovens da unidade” page should appear.
2. **Young-person details**: From an expanded unit, open a young person. Change and save a profile field, return, and confirm the updated name/age is shown on the home screen. Confirm the young person's progress entries remain available.
3. **Add young person**: From a unit's actions menu, open the new-young-person form, save a valid record, and return. Confirm the new record is associated with that unit and is shown in its expanded list.
4. **Edit unit**: From a unit's actions menu, open “Editar Unidade”. Confirm exactly one visible app bar, the expected title, and a working back action. Rename the unit and save. Confirm the home list shows the new name and retains its young people.
5. **Remove unit**: Cancel a removal and confirm nothing changes. Then remove only the disposable unit and confirm it is absent while other units and their young people remain. This is destructive; do not use a unit containing data that must be retained.
6. **Obsolete link**: Open a direct link to the former unit-detail destination using the target's configured deep-link mechanism (or the corresponding web path). Confirm a non-blank not-found state, a visible way to return home, and no crash. Repeat after returning home through the offered control.
7. **Persistence**: Reopen or refresh the app and confirm the retained unit, young-person, and progress-entry data is unchanged.

## Validation policy

These are manual checks, not automated tests. Record the target platform and observed outcomes in the implementation review, consistent with the project constitution.

## Implementation Attempt Record — 2026-11-17

- `npm run typecheck`: passed.
- `npm run android`: invoked and Expo reported that it was starting the project. Android startup could not be confirmed because `adb` is unavailable in this environment; this is not a passing Android launch check.
- The UI regression scenarios (home accordion, unit actions/edit, young-person details, removal, and obsolete link) remain pending manual verification on a runnable app target.
