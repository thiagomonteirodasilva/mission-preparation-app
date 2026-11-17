# Navigation Contract: Remove Unused Unit Detail Screen

## Retained user-facing routes

| Destination | Entry point | Required behavior |
|---|---|---|
| Home / units | App launch or home fallback | Show units; expanding a unit shows its young people and ages inline. No separate unit-detail page is opened. |
| New young person | Unit actions menu | Open the existing form associated with the selected unit; returning shows current home data. |
| Edit unit | Unit actions menu | Open the selected unit's existing edit form with the title “Editar Unidade”, one visible app bar, and a working back action. |
| Young-person details | Select a young person in an expanded unit | Open the existing profile and progress-entry screen; returning shows updated home data. |
| Not found | Obsolete or otherwise unmatched unit-detail link | Show a non-blank not-found state with a safe way to return to home. |

## Removed destination

The standalone young-people list for a single unit is no longer an application destination. No visible control should navigate through it. The expandable home list remains the browsing interface.

## Compatibility and data

- Old links to a removed unit-detail page must not crash or strand the user; use the app's unmatched-route behavior and provide a route to home.
- Unit editing remains reachable at `units/{unitId}/edit` and continues to target the selected unit.
- Removing the destination does not alter unit, young-person, or progress-entry records.
