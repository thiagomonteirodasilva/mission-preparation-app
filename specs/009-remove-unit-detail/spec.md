# Feature Specification: Remove Unused Unit Detail Screen

**Feature Branch**: `009-remove-unit-detail`

**Created**: 2026-11-17

**Status**: Draft

**Input**: User description: "Remova essa tela de jovens da unidade e faça as verificações e ajustes para que porventura isso não quebre a aplicação."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View young people from the home screen (Priority: P1)

As a user, I want to view each unit's young people by expanding that unit on the home screen, so I can find them without an unnecessary intermediate screen.

**Why this priority**: The expandable home list is the behavior specified for browsing units and young people; removing the unused detail screen must preserve that primary flow.

**Independent Test**: Open the home screen, expand and collapse units with and without young people, and open a young person's details from the expanded list.

**Acceptance Scenarios**:

1. **Given** a unit is listed on the home screen, **When** the user expands it, **Then** its young people and their ages appear in the expanded list without opening a separate unit-detail screen.
2. **Given** a unit is expanded, **When** the user collapses it, **Then** its young people are hidden and no data is changed.
3. **Given** an expanded unit contains a young person, **When** the user selects that person, **Then** the existing young-person details screen opens as before.
4. **Given** a unit has no young people, **When** the user expands it, **Then** the existing empty-list message is shown.

### User Story 2 - Continue managing a unit (Priority: P1)

As a user, I want the unit actions to continue working after the unused screen is removed, so I can add young people, edit unit names, and remove units from the home screen.

**Why this priority**: Removing an unused navigation destination must not disrupt the unit-management actions that users rely on.

**Independent Test**: From a unit's actions menu, add a young person, edit and save the unit name, and cancel or confirm unit removal; verify each flow returns to or updates the home screen appropriately.

**Acceptance Scenarios**:

1. **Given** a unit's actions menu is open, **When** the user chooses to add a young person, **Then** the existing new-young-person form opens for that unit and returning to the home screen shows the updated list.
2. **Given** a unit's actions menu is open, **When** the user chooses to edit the unit, **Then** the edit form opens with the selected unit's current name, a clear title, and working back navigation.
3. **Given** the user saves a valid new unit name, **When** the app returns to the home screen, **Then** the new name is displayed and the unit's young people remain associated with it.
4. **Given** the user opens a young person's details from the home screen, **When** the user saves a profile change and returns, **Then** the home screen shows the saved name and age.
5. **Given** the user cancels or confirms unit removal, **When** the action completes, **Then** the existing confirmation, deletion, and home-list refresh behavior remains intact.

### User Story 3 - Reach a safe destination from an obsolete entry point (Priority: P2)

As a user who may have an old link to the removed unit-detail screen, I want the app to recover safely rather than display a blank or broken screen.

**Why this priority**: Safe handling of outdated links prevents removal of the screen from leaving users stranded.

**Independent Test**: Open a saved or direct link that previously opened the unit-detail screen and confirm that the app shows its normal not-found or home fallback behavior with usable navigation.

**Acceptance Scenarios**:

1. **Given** the user opens an old link that previously targeted the removed screen, **When** the app handles the link, **Then** it does not render a blank screen or crash and provides a safe route back to the home screen.
2. **Given** the user opens the unit-edit screen through the unit actions menu, **When** the screen renders, **Then** it has exactly one visible app bar with the edit title and a working back action.

### Edge Cases

- A unit with no young people remains expandable and shows the existing empty-state message.
- An old link to the removed screen is opened directly or restored from navigation history; it must not prevent returning home.
- Removing the unit-detail destination must not make the edit-unit destination unavailable or cause its title/back control to disappear.
- Removing the screen must not delete or modify any unit, young-person, or progress-entry data.
- Returning from adding or editing a young person must continue to show current data on the home screen.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST remove the separate unit-detail screen that lists young people for a selected unit.
- **FR-002**: The home screen MUST remain the place where users expand a unit to view its young people and ages.
- **FR-003**: The app MUST NOT retain a visible navigation action that sends users to the removed unit-detail screen.
- **FR-004**: The add-young-person and edit-unit actions MUST remain available from the home screen's unit actions and MUST continue to operate for the selected unit.
- **FR-005**: The young-person details screen MUST remain reachable by selecting a young person in an expanded home-screen unit.
- **FR-006**: The edit-unit screen MUST remain reachable after the unit-detail screen is removed and MUST retain a clear title and predictable back navigation.
- **FR-007**: Opening an outdated link to the removed screen MUST result in a safe, non-blank app state with a way to return home.
- **FR-008**: Removing the screen MUST NOT change or delete persisted units, young people, or progress entries.
- **FR-009**: The change MUST be verified manually across the affected home, unit-action, young-person, edit, and outdated-link flows. No automated tests MUST be added, in accordance with the project constitution.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In 100% of manual checks, users can expand and collapse units and view the correct young-person names and ages directly on the home screen.
- **SC-002**: In 100% of manual checks, adding a young person, editing a unit, opening a young person's details, and removing a unit remain usable from the home screen.
- **SC-003**: In 100% of manual checks, the unit-edit screen retains one visible app bar, its title, and working back navigation.
- **SC-004**: In 100% of manual checks, an outdated entry to the removed screen avoids a crash or blank state and provides a safe way home.
- **SC-005**: Existing unit, young-person, and progress-entry data remains unchanged by removing the unused screen.

## Assumptions

- The original unit-browsing behavior remains the expandable list on the home screen; users do not need a separate screen to browse a unit's young people.
- Unit creation, unit actions, young-person profiles, progress entries, and persisted data are outside the removal scope and must remain unchanged.
- If an outdated link targets the removed screen, the app's established not-found or home fallback is an acceptable recovery behavior.
- Verification is manual only, as required by the project constitution.
