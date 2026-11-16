# UI Contract: Unit Management Actions

## Unit row actions

- Each existing unit row has one action control replacing “+ jovem”.
- Opening it shows exactly: “Adicionar Jovem”, “Editar Unidade”, and “Remover Unidade”.
- Tapping outside the open menu panel dismisses the menu without performing an action. Tapping an option inside the panel performs that option normally.
- Outside-tap dismissal applies only to the actions menu; it does not dismiss the separate unit-removal confirmation.
- Every action is scoped to the unit whose control was opened.
- “Adicionar Jovem” navigates to “Novo jovem” with that unit selected, preserving the existing unit association behavior.
- “Editar Unidade” navigates to a screen titled “Editar Unidade”, prefilled with the current name and offering “Salvar”. Standard app back navigation returns without saving.

## Rename

- Blank or whitespace-only names are rejected using current validation/error behavior.
- A successful save updates the selected unit's displayed name and returns to a refreshed initial list.
- Existing young-person associations and other unit data remain intact.

## Remove confirmation

- Header: “Remover Unidade”.
- Message: “Ao remover a unidade {nome da unidade}, os jovens pertencentes a esta unidade também serão removidos. Deseja prosseguir? Esta ação não poderá ser desfeita.” Replace the placeholder with the selected unit's current name.
- Choices: “Sim” and “Não”.
- “Não” closes the confirmation without modifying data.
- “Sim” removes the selected unit and its associated young people and progress entries, then refreshes the initial list. If persistence fails, do not report success and preserve data through transaction rollback. If deletion succeeds but refreshing fails, keep the deleted unit absent and show a list-refresh error rather than displaying stale data as current.

## Accessibility and navigation

- Action controls and menu choices are pressable controls with meaningful Portuguese accessibility labels/roles.
- All screens use the existing root Stack top app bar (`bg-sky-700`) and predictable back navigation.