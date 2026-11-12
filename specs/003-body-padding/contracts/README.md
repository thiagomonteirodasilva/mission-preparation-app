# Contracts

This feature does not introduce a network API, backend contract, or persisted service interface.

## UI contract

- Every screen route must render content inside a container with `padding: 1rem` on all sides.
- The app navigation shell and header remain separate from the content padding rule.
- The same layout contract applies across mobile and web presentation.

## Scope note

No external integration contract is required because the change is limited to interface spacing and does not modify data exchange or storage behavior.
