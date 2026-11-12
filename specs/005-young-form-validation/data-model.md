# Data Model: Young Profile and Entry Validation

This feature uses the existing local SQLite entities. No table or schema changes are required.

## Young

Represents the selected young person's saved profile, loaded by the route's ID.

| Field | Type | Source / rule |
|---|---|---|
| `id` | string | Primary identifier; matches the details route parameter |
| `unitId` | string | Existing parent-unit reference |
| `name` | string | Required saved name; displayed in the name field and trimmed for readiness |
| `age` | integer | Existing saved age; presented as text in the form, required to be non-empty for action readiness, and still subject to the existing integer and 16–25 validation when saved |
| `gender` | `male \| female` | Existing selected value; required to be present for action readiness |
| `createdAt` | ISO date-time string | Existing creation timestamp |
| `updatedAt` | ISO date-time string, optional | Existing update timestamp |

**Relationship**: One `Young` profile can have zero or more `ProgressEntry` records. A profile lookup returns zero or one record for an ID.

## ProgressEntry

Represents a saved progress report associated with one young person.

| Field | Type | Source / rule |
|---|---|---|
| `id` | string | Primary identifier |
| `youngId` | string | References the associated young person's ID |
| `date` | ISO date-time string | Existing report timestamp and display-order value |
| `text` | string | Required after trimming; existing maximum length is 1,000 characters |
| `createdAt` | ISO date-time string | Record creation timestamp |

## Form readiness and state transitions

- Profile state begins as loading. A successful lookup populates the profile fields; an absent record or profile/detail data-loading failure shows the specified error toast for two seconds, then returns to the previous screen without displaying a fabricated profile.
- Profile save continues the existing in-screen validation and state-update behavior; profile-edit persistence is unchanged and remains out of scope.
- Profile save is enabled only after a profile is available and the trimmed name, non-empty age text, and selected gender are present. Existing age validation remains responsible for rejecting non-integer or out-of-range values.
- Progress-entry action is enabled only when report text contains at least one non-whitespace character. Existing maximum-length validation and persistence behavior remain unchanged.
- After a report is added successfully, the report input is cleared and the progress-entry action becomes disabled again.