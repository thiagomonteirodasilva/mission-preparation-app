# Feature Specification: Young Profile Save and Action Availability

**Feature Branch**: `006-young-profile-save`

**Created**: 2026-11-12

**Status**: Draft

**Input**: User description: "Na tela de Detalhes do Jovem, remova a regra dos botões disabled nos botões Salvar e Adicionar Relato. E também, corrigir o bug de não estar atualizando as informações do jovem no banco quando se muda qualquer campo ao clicar em Salvar. E também ao clicar em Salvar, certificar de que, quando o usuário voltar a tela anterior, os dados do jovem estejam atualizados."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Save edited profile information (Priority: P1)

As a user, I want to save changes to any field in a young person's profile, so the saved profile reflects the information I entered.

**Why this priority**: Saving profile changes is the primary purpose of editing the young person's details; losing changes makes the screen unreliable.

**Independent Test**: Change one editable profile field at a time, save, reopen the details, and confirm each saved value is retained. Also verify the Save action can be pressed with incomplete values and that existing validation prevents invalid data from being committed.

**Acceptance Scenarios**:

1. **Given** a young person's details are open, **When** the user changes any editable profile field and selects Save, **Then** the changed value is persisted and shown when the details are reopened.
2. **Given** one or more profile fields are incomplete or invalid, **When** the user selects Save, **Then** the action remains available and existing validation prevents invalid profile data from being committed.
3. **Given** the user has not changed a field, **When** the user saves other profile changes, **Then** the unchanged profile values are retained.

---

### User Story 2 - See saved profile changes on the previous screen (Priority: P1)

As a user, I want the previous screen to show the latest saved profile information when I return from the details, so I can trust that the save succeeded and continue with current information.

**Why this priority**: Stale information after saving contradicts the saved profile and can lead to confusion or follow-up actions using old details.

**Independent Test**: Change a profile value, save successfully, return to the previous screen, and confirm that the relevant displayed information matches the saved value without reopening or manually refreshing the previous screen.

**Acceptance Scenarios**:

1. **Given** the user changes and successfully saves profile information, **When** the user returns to the previous screen, **Then** that screen displays the newly saved information rather than a stale value.
2. **Given** the user returns to the previous screen after saving, **When** the user opens the same young person's details again, **Then** the saved values remain consistent on both screens.

---

### User Story 3 - Use the progress-entry action at any time (Priority: P2)

As a user, I want the Add Report action to remain available regardless of the report field's current contents, so I can invoke it and receive the appropriate validation when needed.

**Why this priority**: Keeping the action consistently available makes the form behavior predictable while preserving protection against empty reports.

**Independent Test**: Verify the Add Report action can be pressed with an empty, whitespace-only, and non-empty report; confirm only valid report content is added and displayed in the progress history.

**Acceptance Scenarios**:

1. **Given** the report field is empty or contains only whitespace, **When** the user views or presses Add Report, **Then** the action remains available, existing validation is shown, and no empty report is added.
2. **Given** the report field contains valid non-whitespace text, **When** the user presses Add Report, **Then** the report is saved and appears in the progress history.

### Edge Cases

- A user changes only one profile field; that field must still be persisted without reverting or discarding other profile values.
- A profile save is attempted with incomplete or invalid values; the action remains available, but validation prevents invalid data from being committed.
- A report contains only spaces; Add Report remains available, but no empty report is added.
- After a successful save, the previous screen must reflect the latest saved values even if it was already open before navigating to the details.
- A report save succeeds and clears the report field; the action remains available after the field is cleared.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Save and Add Report actions MUST remain available for interaction while the young person's details are displayed, regardless of profile-field completeness or report-field contents.
- **FR-002**: Selecting Save MUST validate the current profile values using the existing validation rules; invalid values MUST NOT be committed as a successful profile update.
- **FR-003**: When profile values pass validation, Save MUST persist every editable field's current value, including any field changed independently of the others.
- **FR-004**: After a successful profile save, reopening the young person's details MUST show all values from the saved profile.
- **FR-005**: After a successful profile save, returning to the previous screen MUST show the latest saved young-person information without requiring a manual refresh.
- **FR-006**: Selecting Add Report with an empty or whitespace-only report MUST preserve existing validation behavior and MUST NOT create an empty progress entry.
- **FR-007**: Selecting Add Report with valid report text MUST preserve the existing report-saving and progress-history display behavior.
- **FR-008**: The feature MUST be verified manually and MUST NOT introduce automated tests, in accordance with the project constitution.

### Key Entities *(include if feature involves data)*

- **Young person's profile**: The saved information for the selected young person, including all fields editable on the details screen.
- **Progress entry**: A report associated with a young person's profile and shown in that person's progress history.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 100% of manual checks where a valid profile field is changed and saved, the changed value is still present when the details are reopened.
- **SC-002**: In 100% of manual checks, both actions remain available regardless of whether profile fields or report text are empty.
- **SC-003**: In 100% of successful-save checks, the previous screen shows the newly saved profile information immediately after the user returns to it.
- **SC-004**: In 100% of empty or whitespace-only report checks, no empty progress entry is created; valid submitted reports appear in the progress history.
- **SC-005**: In 100% of invalid-profile checks, the existing validation behavior prevents invalid values from being committed despite the Save action remaining available.
- **SC-006**: Users can complete the edit-save-return flow and confirm that the same saved profile values appear on both screens without an extra refresh action in 100% of manual checks.

## Assumptions

- “Any field” means every profile field that is editable on the young person's details screen; fields not editable there are outside this feature's scope.
- Save remains on the details screen unless the existing behavior already navigates elsewhere; the user may then return to the previous screen using the existing navigation.
- Removing disabled-state rules does not remove existing validation or allow invalid profile values or empty reports to be saved.
- Existing success and error feedback, report ordering, and profile presentation remain unchanged except that the previous screen must reflect successfully saved values.
- Verification is manual only, as required by the project constitution.
