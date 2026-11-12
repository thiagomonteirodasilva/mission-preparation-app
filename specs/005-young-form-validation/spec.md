# Feature Specification: Young Profile and Entry Validation

**Feature Branch**: `005-young-form-validation`

**Created**: 2026-11-11

**Status**: Ready for planning

**Input**: User description: "Na tela Detalhes do Jovem, o botão Salvar só deverá ser habilitado se os campos name, age and gender estiverem preenchidos. E no name, deve estar com o nome do jovem conforme está no banco, no lugar de Jovem Exemplo. O botão adicionar relato só deve estar habilitado caso a textarea do relato esteja preenchida. Também colocar nos botões Salvar e Adicionar Relato a cor azul-céu escura da barra superior. Em caso de perfil ausente ou falha de carregamento, exibir um toast com a mensagem 'Não foi possível exibir as informações do jovem. Tente novamente' e retornar à tela anterior."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Edit the correct young person's profile (Priority: P1)

As a user, I want the young person's saved name and profile information to appear when I open their details, so I can confirm that I am viewing and editing the correct person.

**Why this priority**: Showing the stored person's identity is essential to prevent confusion and unintended edits.

**Independent Test**: Open a young person's details and compare the displayed name with that person's saved record; verify the profile save action is available only when name, age, and gender all have values.

**Acceptance Scenarios**:

1. **Given** a young person has a saved profile, **When** the user opens that person's details, **Then** the name field shows the name from that saved profile rather than a generic example name.
2. **Given** the details are loading or any of the name, age, or gender values is missing, **When** the profile form is displayed, **Then** the save action is unavailable.
3. **Given** name, age, and gender all have values, **When** the profile form is displayed, **Then** the save action is available.
4. **Given** the user clears or enters only whitespace in the name field, **When** the profile form is evaluated, **Then** the save action is unavailable.
5. **Given** all profile fields have values, **When** the user saves the profile, **Then** existing profile validation and save behavior are preserved.
6. **Given** the profile save action is displayed, **When** the user views it, **Then** its background uses the same deep sky-blue color as the app's top app bar.
7. **Given** the selected profile is absent or fails to load, **When** the details screen attempts to load it, **Then** the user sees a toast with the message "Não foi possível exibir as informações do jovem. Tente novamente" and is returned to the previous screen.

### User Story 2 - Add a non-empty progress entry (Priority: P2)

As a user, I want to add a progress entry only after entering its text, so I do not accidentally submit an empty report.

**Why this priority**: Preventing empty entries keeps the young person's progress history meaningful.

**Independent Test**: On a young person's details, verify the add-entry action is unavailable for an empty or whitespace-only report and becomes available after non-whitespace text is entered.

**Acceptance Scenarios**:

1. **Given** the report field is empty or contains only whitespace, **When** the user views the entry form, **Then** the add-entry action is unavailable.
2. **Given** the report field contains non-whitespace text, **When** the user views the entry form, **Then** the add-entry action is available.
3. **Given** a non-empty report is submitted successfully, **When** the entry is added, **Then** the existing entry save, display, and field-clearing behavior is preserved.
4. **Given** the add-entry action is displayed, **When** the user views it, **Then** its background uses the same deep sky-blue color as the app's top app bar.

### Edge Cases

- The saved young-person record is absent or cannot be loaded; the screen must not display a generic example and must show the specified error toast before returning to the previous screen.
- Name or report text consists only of spaces; it is treated as empty for enabling the corresponding action.
- Age is present but invalid under the existing age rules; the action's enabled state reflects field presence, while existing validation continues to determine whether saving is accepted.
- Gender is considered filled when the profile has a selected gender value; the existing selection behavior remains unchanged.
- After a report is submitted and the field is cleared, the add-entry action becomes unavailable again.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: When a user opens a young person's details, the name field MUST display the name belonging to that selected person's saved profile.
- **FR-002**: If the selected profile is absent or fails to load, the details screen MUST NOT present a generic example profile; it MUST show a toast with the exact message "Não foi possível exibir as informações do jovem. Tente novamente" and return the user to the previous screen.
- **FR-003**: The profile save action MUST be unavailable while the profile is loading or whenever name, age, or gender has no value.
- **FR-004**: The profile save action MUST be available when name, age, and gender all have values; whitespace-only name input MUST count as having no value.
- **FR-005**: The feature MUST preserve existing profile validation and save behavior; enabling the action based on field presence MUST NOT bypass validation of entered values.
- **FR-006**: The progress-entry action MUST be unavailable when its text is empty or contains only whitespace, and MUST be available when the text contains non-whitespace characters.
- **FR-007**: After a progress entry is successfully added and its text field is cleared, the progress-entry action MUST return to the unavailable state.
- **FR-008**: Existing progress-entry save, display, and profile-editing behavior MUST otherwise remain unchanged.
- **FR-009**: The profile save and progress-entry actions MUST use the same deep sky-blue background color required for the app's top app bar.
- **FR-010**: The feature MUST be verified manually and MUST NOT introduce automated tests, in accordance with the project constitution.

### Key Entities *(include if feature involves data)*

- **Young person's profile**: The saved name, age, and gender associated with the selected young person; these values populate and determine readiness of the profile form.
- **Progress entry**: A text report associated with a young person's profile; it can be submitted only when it contains non-whitespace text.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 100% of manually checked profile-loading scenarios, the displayed name matches the selected young person's saved name, and a generic example is never shown as that person's saved name.
- **SC-002**: In 100% of checks, the profile save action is unavailable if any required field is missing and available when all three fields have values.
- **SC-003**: In 100% of checks, an empty or whitespace-only report cannot be submitted, while a non-empty report can be submitted and appears in the progress history.
- **SC-004**: In 100% of checks, the profile save and progress-entry actions use the same deep sky-blue background color as the app's top app bar.
- **SC-005**: Users can distinguish whether each save action is available from the form's current values without attempting to submit it.
- **SC-006**: In 100% of manually checked missing-profile and load-failure scenarios, the specified error toast is displayed and the user is returned to the previous screen without seeing fabricated profile data.

## Assumptions

- The screen is associated with an existing saved young-person profile; name, age, and gender should be populated from that profile.
- A field is considered filled based on having a value, with whitespace-only text treated as empty. Existing age validation remains authoritative for whether a profile can ultimately be saved.
- Existing gender defaults or saved selections remain unchanged; this feature does not introduce a new gender-selection requirement.
- Existing limits, validation messages, persistence behavior, and progress-entry ordering remain unchanged.
- If the selected profile cannot be loaded or is absent, the user receives the specified toast and returns to the previous screen; there is no retry-in-place flow.
- The requested button color matches the existing deep sky-blue visual standard required for the app's top app bar.
- Manual verification is required; automated tests are out of scope under the project constitution.