# Data Model: Unit Management Actions

## Unit

Represents a named group displayed on the initial screen.

| Field | Type / meaning | Constraints and behavior |
|---|---|---|
| `id` | Stable unit identifier | Required; unchanged when renaming. |
| `name` | User-visible unit name | Required and trimmed on save; whitespace-only names are rejected. No new uniqueness rule is introduced. |
| `createdAt` | Creation timestamp | Preserved when renaming. |

### Relationships

- A unit has zero or more young people through `Young.unitId`.
- Removing a unit removes all of its young people after explicit confirmation.

## Young person

Represents a person associated with one unit.

| Field | Type / meaning | Constraints and behavior |
|---|---|---|
| `id` | Stable person identifier | Required. |
| `unitId` | Associated unit identifier | Required; points to a unit. |
| `name`, `age`, `gender` | Existing profile attributes | Unchanged by unit rename. The complete record is removed when its unit is removed. |
| `createdAt`, `updatedAt` | Existing timestamps | Unchanged by unit rename. |

### Relationships

- A young person belongs to one unit.
- A young person has zero or more progress entries.

## Progress entry

Represents a saved progress report belonging to a young person.

| Field | Type / meaning | Constraints and behavior |
|---|---|---|
| `id` | Stable entry identifier | Required. |
| `youngId` | Associated young-person identifier | Required; points to a young person. |
| `date`, `text`, `createdAt` | Existing report data | Removed with the owning young person when its unit is removed, to preserve referential integrity. |

## State transitions and persistence rules

- **Rename**: `Unit.name` changes to the trimmed non-empty submitted value; `id`, `createdAt`, and all associated young-person and progress-entry data remain unchanged.
- **Cancel edit**: no persisted data changes.
- **Cancel removal**: no persisted data changes.
- **Confirm removal**: within one transaction, delete the unit's progress entries, then its young people, then the unit. Roll back all changes if any operation fails.
- **Refresh after navigation**: when the initial screen regains focus, load units and their current young-person lists from SQLite.
- **Refresh after removal**: after the repository confirms deletion, remove that unit from the displayed collection and reload remaining units and young people. If reloading fails, keep the deleted unit absent and show an error instead of presenting it as current data.