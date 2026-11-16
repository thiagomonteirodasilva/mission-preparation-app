# Feature Specification: Remove Unused Code

**Feature Branch**: `007-unused-code-cleanup`

**Created**: 2026-11-16

**Status**: Draft

**Input**: User description: "Remova as definições dos hooks useUnits e useYoungs; se a pasta hooks não for utilizada em lugar nenhum, remova-a também. Confirme se STRINGS em constants/strings.ts não é usada e, se não for, exclua-a e o arquivo."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Remove unused data hooks (Priority: P1)

As a maintainer, I want unused data-hook definitions removed so the project does not retain source files or folders that provide no functionality.

**Why this priority**: These definitions are unreferenced and can be removed without changing application behavior.

**Independent Test**: Search application source for references to either hook, then confirm the unused hook files and now-empty folder are absent.

**Acceptance Scenarios**:

1. **Given** neither hook has a consumer in application source, **When** the cleanup is complete, **Then** both hook definitions and their files are removed.
2. **Given** the hooks folder contains no other files after removal, **When** the cleanup is complete, **Then** the empty folder is removed.
3. **Given** a hook is found to have an application-source consumer, **When** the cleanup is reviewed, **Then** that used definition is retained rather than breaking the consumer.

---

### User Story 2 - Remove the unused shared strings export (Priority: P2)

As a maintainer, I want the unused shared strings constant and its file removed so the codebase contains no obsolete utility module.

**Why this priority**: The export has no consumers, and removing it avoids keeping dead code.

**Independent Test**: Search application source for references to the shared strings export, then confirm the export and its file are absent when no consumer exists.

**Acceptance Scenarios**:

1. **Given** the shared strings export has no application-source consumer, **When** the cleanup is complete, **Then** the export and its file are removed.
2. **Given** a consumer is found, **When** the cleanup is reviewed, **Then** the referenced functionality is not removed in a way that breaks the consumer.

### Edge Cases

- A matching name appears only in historical specifications or documentation; it does not count as an application-source consumer.
- A folder contains another file or a hook has a real source consumer; retain the required content and do not remove a non-empty folder.
- Removing these artifacts must not alter existing screen behavior or persisted data.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The cleanup MUST verify application-source references to each hook before removing its definition.
- **FR-002**: When no application-source consumer exists, the cleanup MUST remove the unused hook definition files.
- **FR-003**: The cleanup MUST remove the hooks folder only if it is empty after removing unused definitions.
- **FR-004**: The cleanup MUST verify application-source references to the shared strings export before removing it.
- **FR-005**: When no application-source consumer exists, the cleanup MUST remove the unused shared strings export and its file.
- **FR-006**: The cleanup MUST preserve existing application behavior and persisted data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Application source contains zero references to the removed hooks or shared strings export.
- **SC-002**: All three unused source files are absent after cleanup; the hooks folder is absent if it has no remaining contents.
- **SC-003**: Manual verification of the existing app flows confirms no user-visible behavior or persisted data changes due to the cleanup.

## Assumptions

- Application source is the authority for determining whether a definition is used; mentions in specification and documentation files are not runtime consumers.
- The current repository search shows no application-source consumers for either hook or the shared strings export, and the hooks folder contains only the two hook files.
- No replacement functionality or user-facing behavior is requested; this is a dead-code cleanup only.
