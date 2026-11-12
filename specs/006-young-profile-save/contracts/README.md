# Local UI Contract: Young Profile Save and Action Availability

This feature adds no external API. The following contract describes user-visible interactions between the details screen, local profile storage, and the unit's young-person list.

## Profile save contract

- The details screen is associated with one existing young-person ID.
- **Salvar** remains actionable for empty, incomplete, or invalid form values; availability is not determined by field contents.
- On submit, the existing profile rules apply: name must contain non-whitespace text and age must be an integer from 16 through 25. Invalid values are not persisted, and existing validation feedback is shown.
- A valid submission updates the selected profile's name, age, and gender. Its identity, unit association, and creation timestamp remain unchanged; its update timestamp advances.
- The screen shows persisted profile values and success feedback only after the update succeeds. A failed update must not be presented as successful and must retain the user's entered values.
- When the user returns to the unit detail screen, that screen reloads its young-person list and shows the latest saved name and age without requiring an app restart or manual refresh.

## Progress-entry contract

- **Adicionar relato** remains actionable regardless of the report field's contents.
- Empty or whitespace-only text, or text longer than 1,000 characters, is rejected by existing validation and does not create an entry.
- Valid report text is saved using the existing persistence behavior, appears in the progress history, and clears the input after successful saving.

## Scope boundaries

- No remote API, route destination, table, or new dependency is introduced.
- Existing report ordering, delete behavior, profile fields, and validation rules remain unchanged.
- Both actions retain the existing app styling; this feature changes action availability, not their visual color standard.
