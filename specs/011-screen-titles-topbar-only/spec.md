# Feature Specification: Screen Titles Only in Top Bars

**Feature Branch**: `011-screen-titles-topbar-only`

**Created**: 2026-11-18

**Status**: Ready for planning

**Input**: User description: "Em todas as telas exibem repetidamente os seus respectivos nomes na top bar e nas tags de text logo após a abertura da tag View. Ajuste para que os nomes das telas apareçam somente nas top bars."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read a screen name once (Priority: P1)

As a user, I want each screen's name to appear only in its top bar, so I can identify the current screen without seeing the same title repeated in its content.

**Why this priority**: Removing repeated titles makes the screens clearer while preserving the navigation cue that tells users where they are.

**Independent Test**: Open each existing screen and confirm its name appears in the top bar and is not repeated as the first content heading.

**Acceptance Scenarios**:

1. **Given** any existing screen with a named top bar, **When** the screen is displayed, **Then** its name appears in the top bar and not again as a duplicate heading in the screen content.
2. **Given** a screen whose title was also shown in its content, **When** that screen is displayed after the change, **Then** the duplicate title is absent and the top-bar title remains visible.
3. **Given** a screen with content below its title, **When** the duplicate title is removed, **Then** the remaining content and available interactions continue to be displayed and usable.

### User Story 2 - Keep screen content understandable (Priority: P2)

As a user, I want field labels, messages, and other meaningful content to remain in place, so removing a repeated screen name does not remove useful information.

**Why this priority**: The change is limited to duplicate screen titles and must not hide information users need to complete tasks.

**Independent Test**: On screens where the duplicate heading is removed, verify that form labels, instructions, messages, and actions remain present and usable.

**Acceptance Scenarios**:

1. **Given** a screen containing a duplicate title and other content, **When** the screen is displayed, **Then** only the duplicate title is removed while other content remains.
2. **Given** a user completing an existing screen workflow, **When** the screen title is shown only in the top bar, **Then** the workflow remains understandable and can be completed as before.

### Edge Cases

- A screen has no duplicate title in its content; its content and top-bar title remain unchanged.
- A content label or message resembles the screen name but serves a distinct purpose; it remains visible.
- A screen is opened directly or reached through navigation; its top-bar title remains visible in either case.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every existing screen MUST continue to display its screen name in its top bar.
- **FR-002**: A screen name shown in a top bar MUST NOT be repeated as a duplicate screen-title heading in that screen's content.
- **FR-003**: The change MUST preserve other screen content, including field labels, instructions, status messages, and actions.
- **FR-004**: The change MUST NOT alter screen navigation or the behavior of existing interactions.
- **FR-005**: The result MUST be verified manually across all existing screens and affected workflows, consistent with the project verification policy.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of existing screens continue to show their screen name in the top bar.
- **SC-002**: 100% of screens that previously repeated the screen name in their content show that name only in the top bar after the change.
- **SC-003**: All existing content other than duplicate screen-title headings remains visible, and affected screen workflows remain completable in manual verification.

## Assumptions

- The requested removal applies to duplicate screen-name headings in the content area, not to labels or messages that serve a separate user purpose.
- Existing top-bar titles, visual styling, navigation, and screen functionality remain unchanged.
- The scope covers every existing app screen where its top-bar name is repeated as a body heading; it does not introduce new screens or change screen names.