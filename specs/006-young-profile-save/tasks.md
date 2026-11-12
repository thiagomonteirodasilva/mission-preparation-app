# Tasks: Young Profile Save and Action Availability

**Input**: Design documents from `/specs/006-young-profile-save/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/README.md, quickstart.md

**Tests**: No automated test tasks are included. The project constitution prohibits automated tests; verification is manual, plus the existing TypeScript typecheck.

**Organization**: Tasks are grouped by the three user stories in spec.md. IDs follow execution order, and all implementation tasks identify exact files.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure.

No setup tasks are needed: the Expo project, dependencies, database, routes, and shared UI structure already exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure that must be completed before user stories.

No separate foundational work is required. Each change uses existing app and repository infrastructure and is scoped to its user story.

---

## Phase 3: User Story 1 - Save edited profile information (Priority: P1) 🎯 MVP

**Goal**: Persist valid edits to every editable field while keeping Save available and preserving validation.

**Independent Test**: Change one valid profile field at a time, save, reopen the details, and verify that the changed value persisted and all unchanged values remain intact. Press Save with incomplete or invalid values and verify validation prevents a write.

### Implementation for User Story 1

- [X] T001 [US1] Add an update operation in db/repository.ts that updates name, age, gender, and updatedAt for the existing Young record by ID, preserves id/unitId/createdAt, applies the existing name and age constraints, and fails when no record is updated.
- [X] T002 [US1] Update handleSave and the Save Pressable in app/young/[youngId].tsx to call the repository update after validation, reflect the returned persisted Young record and show success only after the write succeeds, retain entered values and show failure feedback when it fails, and remove field-dependent disabled/accessibility/opacity behavior from Save.

**Checkpoint**: A valid profile edit persists across reopening, invalid values do not persist, and Save remains actionable for incomplete values.

---

## Phase 4: User Story 2 - See saved profile changes on the previous screen (Priority: P1)

**Goal**: Refresh the unit's young-person list when the user returns from a successfully saved profile.

**Independent Test**: After a valid profile save, return to the unit details and verify the young person's displayed name and age match the persisted values without restarting the app or manually refreshing.

### Implementation for User Story 2

- [X] T003 [P] [US2] Refresh young-person records when the unit detail route regains focus in app/units/[unitId].tsx, using the existing loadYoungsByUnit repository query and an active-result guard consistent with app/index.tsx.

**Checkpoint**: Returning to the unit detail screen reloads and displays the saved profile values; reopening the profile shows the same values.

---

## Phase 5: User Story 3 - Use the progress-entry action at any time (Priority: P2)

**Goal**: Keep Add Report actionable for empty and populated input while retaining validation and report persistence behavior.

**Independent Test**: Press Add Report with empty and whitespace-only text and verify existing validation appears without creating an entry; submit valid text and verify the entry appears and the input clears.

### Implementation for User Story 3

- [X] T004 [US3] Remove the field-dependent disabled, accessibility-state, and opacity behavior from the Add Report Pressable in app/young/[youngId].tsx while retaining handleAddEntry validation, maximum-length enforcement, persistence, history ordering, and successful field clearing.

**Checkpoint**: Add Report is always actionable while invalid reports remain rejected and valid reports continue to save and display.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify the integrated feature and record manual evidence.

- [X] T005 [P] Run npm run typecheck from package.json and resolve any TypeScript errors introduced by the feature.
- [X] T006 Launch the app with npm run android from package.json and manually execute the scenarios in specs/006-young-profile-save/quickstart.md; record the Android device/emulator, profile and report cases checked, persistence outcome, return-screen freshness, validation behavior, and any unavailable failure scenario in the implementation review.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No work required; project infrastructure is already present.
- **Foundational (Phase 2)**: No separate blocking work is required.
- **User stories (Phases 3–5)**: US1 is the MVP. US2's implementation task can be developed in parallel with US1 because it changes a separate screen, but its end-to-end acceptance check requires a successful profile save. US3 touches the same details screen as US1 and should follow T002 to avoid conflicting edits.
- **Polish (Phase 6)**: Starts after all desired story tasks are complete. Typecheck and manual verification can run independently.

### User Story Dependencies

- **US1 (P1)**: No dependency on another story. T001 must complete before T002.
- **US2 (P1)**: Its list-refresh implementation is independent of US1 code, but verifying the complete save-and-return journey depends on the persisted update from US1.
- **US3 (P2)**: Behavior is independent of profile persistence, but its UI edit shares app/young/[youngId].tsx with T002; implement after T002.

### Task Dependency Graph

```text
T001 → T002 → T004
T003 (parallel with T001/T002)
T002, T003, T004 → T006
T001, T002, T003, T004 → T005 (parallel with T006)
```

T006 requires the feature tasks T001–T004 to be complete. T005 also runs after implementation, and may run in parallel with T006.

### Parallel Opportunities

- T003 can run in parallel with T001 and T002; it modifies app/units/[unitId].tsx while US1 modifies db/repository.ts and app/young/[youngId].tsx.
- T001 and T002 are sequential because the screen integration requires the repository update operation.
- T004 follows T002 because both modify app/young/[youngId].tsx.
- T005 and T006 can run in parallel after T001–T004; one checks TypeScript while the other exercises the app manually.

### Parallel Execution Examples

**User Story 1**: No intra-story parallel work; complete T001 before T002. T003 from US2 may be assigned concurrently because it changes a separate file.

**User Story 2**: Run T003 in parallel with T001/T002 when multiple workers are available. Validate its behavior with the US1 save flow after both are complete.

**User Story 3**: No parallel implementation task; wait for T002 to finish editing app/young/[youngId].tsx, then perform T004.

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete T001 to add the focused update operation.
2. Complete T002 to connect Save, retain validation, report persistence errors, and remove Save's disabled rule.
3. Manually verify valid and invalid profile values and that saved data persists when the details are reopened.
4. Continue to US2 and US3 for the complete feature.

### Incremental Delivery

1. Implement US1 and verify profile persistence independently.
2. Implement US2 and verify the previous screen refreshes after returning.
3. Implement US3 and verify Add Report remains actionable without allowing invalid reports.
4. Run typecheck and the complete manual quickstart, including Android startup.

## Notes

- [P] marks tasks that can run concurrently in different files without waiting on one another.
- [US1], [US2], and [US3] map directly to the user stories in spec.md.
- No automated tests are planned or permitted by the project constitution.
- Android startup must be confirmed during implementation; if no device or emulator is available, record the limitation rather than marking it successful.

## Manual Verification Record

- Android startup: `npm run android` launched on the `sdk_gphone16k_x86_64` emulator; Metro bundled the app successfully.
- Profile persistence: changed Gabriel's name to `Gabriel_QA`, saved, and observed the new name immediately on the unit list. Changed age from 20 to 21 and gender from male to female; the list showed age 21 and reopening the profile showed female selected. Restored the profile to Gabriel, age 20, male.
- Invalid profile: submitted age 15; Save remained available, the existing minimum-age validation appeared, and the saved value remained unchanged.
- Progress entry: empty Add Report remained available, showed `Relato é obrigatório.`, and created no entry. A valid `Valid_report` entry appeared in history and the field cleared. The temporary report remains in the emulator's local test database.
- Persistence-failure handling could not be safely induced manually; it remains unverified.
- `npm run typecheck` completed successfully. No automated tests were added or run.
