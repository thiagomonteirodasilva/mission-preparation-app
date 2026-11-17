# Data Model: Remove Unused Unit Detail Screen

## Scope

This feature removes a navigation screen only. It introduces no entity, attribute, relationship, validation rule, or persistence change.

## Existing entities preserved

- **Unit**: Its identifier and name remain unchanged. Editing the name continues to preserve its associated young people.
- **Young person**: Its identity, unit association, profile fields, and progress entries remain unchanged.
- **Progress entry**: Its young-person association, text, and date remain unchanged.

## Data flow

The home screen continues to load units with their young people and present them in expandable groups. The removed detail screen's separate list load is no longer needed for in-app browsing. The feature must not add or remove any database read/write behavior outside removal of that now-unused screen-level load.

## Migration

None. No schema or persisted data migration is required.
