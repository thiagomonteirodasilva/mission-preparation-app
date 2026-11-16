# Feature Specification: Unit Management Actions

**Feature Branch**: `008-unit-management`

**Created**: 2026-11-16

**Status**: Draft

**Input**: User description: "Gerenciar unidades pela tela inicial: adicionar jovens, editar nomes e remover unidades após confirmação. Refinamento: no menu Ações da Unidade, clicar fora do menu deve fechá-lo."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Open unit actions and add a young person (Priority: P1)

As a user managing units, I want one actions menu on each existing unit so I can add a young person to that unit or choose another unit-management action.

**Why this priority**: The menu is the entry point for all requested actions and preserves the existing ability to add a young person to a specific unit.

**Independent Test**: Open the actions menu for an existing unit, verify all three options, choose Add Young, and confirm the new-young-person screen is associated with the selected unit.

**Acceptance Scenarios**:

1. **Given** an existing unit is listed, **When** the user opens its actions menu, **Then** the menu displays “Adicionar Jovem”, “Editar Unidade”, and “Remover Unidade”.
2. **Given** a unit's actions menu is open, **When** the user selects “Adicionar Jovem”, **Then** the “Novo Jovem” screen opens for that unit.

---

### User Story 2 - Edit a unit name (Priority: P1)

As a user, I want to change an existing unit's name so the unit list remains accurate as names change.

**Why this priority**: Correct unit names help users identify the right group and maintain accurate records.

**Independent Test**: Choose “Editar Unidade”, verify the current name is shown, change it, save, and confirm the updated name appears in the unit list; also verify leaving without saving keeps the original name.

**Acceptance Scenarios**:

1. **Given** an existing unit, **When** the user chooses “Editar Unidade”, **Then** an edit screen shows the current name and a “Salvar” action.
2. **Given** the edit screen is open, **When** the user enters a valid new name and saves, **Then** the change is saved and the unit list shows the new name while preserving the unit's young people.
3. **Given** the edit screen is open, **When** the user submits a blank name, **Then** the unit is not renamed and the user receives the existing validation behavior.
4. **Given** the user has made unsaved changes, **When** they leave the edit screen without saving, **Then** the existing unit name remains unchanged.

---

### User Story 3 - Remove a unit and its young people (Priority: P1)

As a user, I want to remove a unit only after confirming the consequence so I can prevent accidental, irreversible deletion of the unit and its young people.

**Why this priority**: Removal affects a unit and all young people belonging to it, so the warning and explicit choice are essential safeguards.

**Independent Test**: Open removal confirmation for a unit with young people and progress reports, verify the unit name and warning, choose “Não” and confirm nothing changes; repeat and choose “Sim”, then confirm the unit, its young people, and their progress reports are removed and the initial screen is updated.

**Acceptance Scenarios**:

1. **Given** an existing unit, **When** the user selects “Remover Unidade”, **Then** a confirmation appears with the header “Remover Unidade” and the requested warning containing the selected unit name, with “Sim” and “Não” choices.
2. **Given** the removal confirmation is open, **When** the user selects “Não”, **Then** the confirmation closes and the unit and its young people remain unchanged.
3. **Given** the removal confirmation is open for a unit with young people and progress reports, **When** the user selects “Sim”, **Then** the unit, all young people belonging to it, and their progress reports are removed and the initial screen shows the updated list.
4. **Given** the unit has no young people, **When** the user confirms its removal, **Then** the unit is removed and the initial screen shows the updated list without that unit.

---

### User Story 4 - Dismiss the unit actions menu (Priority: P2)

As a user, I want the actions menu to close when I tap outside it so I can dismiss it quickly without selecting an action.

**Why this priority**: Tapping outside is a familiar, quick dismissal behavior that lets users leave the menu without triggering an unintended operation.

**Independent Test**: Open the actions menu for an existing unit, tap outside the menu panel, and verify that it closes without navigation, data changes, or a removal confirmation.

**Acceptance Scenarios**:

1. **Given** a unit's actions menu is open, **When** the user taps outside the menu panel, **Then** the menu closes and no menu action is performed.
2. **Given** a unit's actions menu is open, **When** the user selects an option inside the panel, **Then** that option proceeds normally without being dismissed as an outside tap.

### Edge Cases

- An empty unit can be removed after the same explicit confirmation; there are no young people to remove.
- If a unit name contains punctuation or accented characters, the confirmation displays the full name accurately.
- Tapping outside the action-menu panel dismisses only the action menu; it does not dismiss the separate unit-removal confirmation.
- A blank or whitespace-only name cannot replace an existing unit name.
- If a unit no longer exists when its edit screen is opened, the user receives clear feedback and can return without saving.
- Canceling removal or leaving the edit screen without saving must not modify unit or young-person data.
- If a removal or save cannot be completed, the screen must not indicate success or present stale data as updated; existing error feedback behavior is retained.
- If the unit removal succeeds but refreshing the initial screen fails, the removed unit must not reappear in the displayed list, and the user must receive an error explaining that the list could not be refreshed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Each existing unit MUST provide an action button in place of its current “+ jovem” button.
- **FR-002**: Activating a unit's action button MUST present the options “Adicionar Jovem”, “Editar Unidade”, and “Remover Unidade” for that unit.
- **FR-003**: Selecting “Adicionar Jovem” MUST open the “Novo Jovem” screen with the selected unit associated with the new young person's record.
- **FR-004**: Selecting “Editar Unidade” MUST open an edit screen with the app's standard title and back navigation, identify the screen as “Editar Unidade”, show the unit's current name, and provide a “Salvar” action.
- **FR-005**: Saving a non-empty unit name MUST update only that unit's name and preserve its young people.
- **FR-006**: An empty or whitespace-only unit name MUST NOT be saved; existing validation behavior MUST be used.
- **FR-007**: After a successful rename, the initial screen MUST display the updated unit name and current unit data.
- **FR-008**: Selecting “Remover Unidade” MUST show a confirmation headed “Remover Unidade”, with “Sim” and “Não” actions and the message: “Ao remover a unidade {nome da unidade}, os jovens pertencentes a esta unidade também serão removidos. Deseja prosseguir? Esta ação não poderá ser desfeita.” The placeholder MUST be replaced with the selected unit's name.
- **FR-009**: Selecting “Não” MUST cancel removal and leave the unit and its young people unchanged.
- **FR-010**: Selecting “Sim” MUST permanently remove the selected unit, all young people belonging to it, and all progress reports belonging to those young people.
- **FR-011**: After successful removal, the initial screen MUST show the updated unit list without the removed unit or its young people. If refreshing the remaining data fails after removal has succeeded, the removed unit MUST remain absent from the displayed list and the user MUST receive an error explaining that the list could not be refreshed.
- **FR-012**: The feature MUST be verified manually and MUST NOT introduce automated tests, in accordance with the project constitution.
- **FR-013**: When a unit's actions menu is open, tapping outside the menu panel MUST dismiss the menu without triggering an action. Selecting an option inside the panel MUST continue to perform that option normally.

### Key Entities *(include if data involved)*

- **Unit**: A named group that can be renamed or removed and may contain young people.
- **Young person**: A person associated with one unit; all young people belonging to a removed unit are removed with it.
- **Progress report**: A report associated with a young person; all reports belonging to young people in a removed unit are removed with them.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 100% of manual checks, opening an existing unit's action button presents exactly the three requested actions.
- **SC-002**: In 100% of manual checks, choosing “Adicionar Jovem” opens the new-young-person flow with the correct unit associated.
- **SC-003**: In 100% of valid-name edit checks, the saved name appears on the initial screen and the unit's young people remain associated.
- **SC-004**: In 100% of blank-name checks, the original unit name remains unchanged and validation is shown.
- **SC-005**: In 100% of removal-cancel checks, the unit and its young people remain unchanged.
- **SC-006**: In 100% of confirmed-removal checks, the selected unit and its young people are absent from the refreshed initial screen, their progress reports are no longer available, and other units and their young people remain present.
- **SC-007**: In 100% of confirmation checks, the warning header, both choices, full warning text, and selected unit name are displayed correctly.
- **SC-008**: In 100% of manual dismissal checks, tapping outside the actions menu closes it without triggering an action, while tapping an option inside it performs that option normally.

## Assumptions

- “Tela de Unidades” refers to the initial screen listing units, and each unit's action button is scoped to that unit.
- “Novo Jovem” associates the new record with the unit whose menu was used.
- Editing changes only the unit name; it does not change or remove its young people.
- Confirming unit removal permanently removes that unit and its associated young people. The removal is not reversible through the user interface.
- Progress reports belonging to young people in a removed unit are also permanently removed because they belong to those young-person records.
- Existing validation and error-feedback conventions remain in effect where the request does not prescribe different behavior.
- The confirmation copy uses the unit's current name in place of “{nome da unidade}”.