# Local app contracts

This feature does not expose a remote backend API. The contracts here are local application contracts used by the UI and SQLite layer.

## Data contract: Unit

```ts
interface Unit {
  id: string;
  name: string;
  createdAt: string;
}
```

## Data contract: Young

```ts
interface Young {
  id: string;
  unitId: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  createdAt: string;
  updatedAt: string;
}
```

## Data contract: ProgressEntry

```ts
interface ProgressEntry {
  id: string;
  youngId: string;
  date: string;
  text: string;
  createdAt: string;
}
```

## Form validation contract

```ts
interface ValidationResult {
  isValid: boolean;
  message?: string;
}
```

Validation rules:
- age < 16 => "Não é permitido cadastrar jovem com idade menor que 16 anos"
- age > 25 => "Não é permitido cadastrar jovem com idade maior que 25 anos"
- progress text longer than 1000 chars => invalid
- progress entry date MUST NOT be provided by the user; the repository auto-assigns the device timestamp (ISO 8601) at save time. The UI must not show a date input for progress entries. When displaying progress entries, the UI must render the stored timestamp as a Brazilian date string in DD/MM/YYYY format.

## UI interaction contract

- Home screen: list units alphabetically and expand/collapse per unit.
- Unit detail: list young people alphabetically with age shown immediately after the name.
- Young form: create and edit young details; save triggers a visible success message.
- Delete flow: show confirmation and block removal unless confirmed.
- Save-and-return flow: after a unit is created, or a young is created/edited successfully, returning to the home route reloads the unit and young list from SQLite. The new or changed data is available without restarting the app or reopening the home route; unit and young alphabetical ordering remains unchanged. A collapsed unit may be expanded to inspect its refreshed young list.
