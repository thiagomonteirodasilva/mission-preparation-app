# Data Model: Young Profile Save and Action Availability

This feature uses the existing local SQLite entities. No schema migration is required.

## Young

Represents a young person's persistent profile. The details route loads and updates the record selected by its ID.

| Field | Type | Update behavior / validation |
|---|---|---|
| `id` | string | Primary identifier; immutable during profile edit |
| `unitId` | string | Existing parent-unit reference; immutable during profile edit |
| `name` | string | Editable; required after trimming whitespace |
| `age` | integer | Editable; must be an integer from 16 through 25 |
| `gender` | `male \| female` | Editable selected value |
| `createdAt` | string | Existing creation timestamp; unchanged by update |
| `updatedAt` | string, optional | Set to the update time after a successful profile save |

**Relationship**: A `Young` profile belongs to one unit and can have zero or more progress entries. Saving edits does not change the profile ID, unit association, or creation timestamp.

## ProgressEntry

Represents a saved progress report associated with one young person; its storage shape and behavior are unchanged by this feature.

| Field | Type | Validation / behavior |
|---|---|---|
| `id` | string | Primary identifier |
| `youngId` | string | References the associated young person's ID |
| `date` | string | Existing report timestamp used for display ordering |
| `text` | string | Required after trimming; maximum 1,000 characters |
| `createdAt` | string | Record creation timestamp |

## State and persistence transitions

### Profile editing

1. The details screen loads the selected `Young` record and fills the form.
2. Save is available whenever the details form is displayed, regardless of field completeness.
3. On submission, existing validation rejects an empty name or an age outside the integer range 16–25. The action does not write invalid values.
4. A valid submission updates `name`, `age`, `gender`, and `updatedAt` for the selected `id`.
5. The details screen reflects the returned persisted record and shows success only after the update succeeds. On failure it retains the entered form values and reports the failure.
6. When the user returns to the unit detail screen, its focus refresh reloads the young-person list so the saved name and age are current.

### Progress report

1. Add Report remains available regardless of report-field contents.
2. Empty or whitespace-only text and text longer than 1,000 characters remain invalid under existing validation; no invalid entry is persisted.
3. Valid text is saved through the existing progress-entry operation, displayed in the existing ordering, and the input is cleared after success.
