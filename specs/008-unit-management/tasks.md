---

description: "Task list for Unit Management Actions"
---

# Tasks: Unit Management Actions

**Input**: Design documents from `specs/008-unit-management/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`, `quickstart.md`

**Tests**: No automated test tasks are included. The project constitution requires manual verification only.

**Organization**: Tasks are grouped by the four independently verifiable user journeys in the specification.

## Phase 1: Setup

**Purpose**: Capture the current static-check baseline before changes.

- [X] T001 Run `npm run typecheck` from the repository root and record existing diagnostics against `package.json` before feature changes

---

## Phase 2: Foundational

**Purpose**: Shared project setup required before story work.

No new dependencies, database migration framework, or shared infrastructure are required. The existing Expo Router app, SQLite repository, and NativeWind setup provide the foundation; no blocking foundational tasks are needed.

---

## Phase 3: User Story 1 - Open unit actions and add a young person (Priority: P1) 🎯 MVP

**Goal**: Replace each existing “+ jovem” button with a unit-scoped menu listing the three requested actions and make “Adicionar Jovem” open the existing new-young-person flow for that unit.

**Independent Test**: On a unit in the running app, open its actions menu, verify all three labels, select “Adicionar Jovem”, save a young person, and verify that the person is associated with that unit. See scenario 1 in `specs/008-unit-management/quickstart.md`.

### Implementation

- [X] T002 [US1] Replace the “+ jovem” control with an accessible per-unit actions menu listing “Adicionar Jovem”, “Editar Unidade”, and “Remover Unidade”; wire “Adicionar Jovem” to `/young/new` with the selected `unitId` in `components/UnitAccordion.tsx`
- [ ] T003 [US1] Manually verify the menu labels and selected-unit add-young-person flow using `specs/008-unit-management/quickstart.md`

**Checkpoint**: The menu is available on every unit, and the add action retains the unit context.

---

## Phase 4: User Story 2 - Edit a unit name (Priority: P1)

**Goal**: Let the user open a prefilled edit screen, save a non-empty unit name, and see the updated name without changing the unit's young people.

**Independent Test**: Open “Editar Unidade”, verify the current name is prefilled and the app bar title is “Editar Unidade”; save a new name and confirm it appears on the initial screen with young people intact. Verify blank-name validation, a missing/nonexistent unit ID, and back-without-saving. See scenario 2 in `specs/008-unit-management/quickstart.md`.

### Implementation

- [X] T004 [P] [US2] Add `loadUnitById` and a validated `updateUnit` operation that trims and persists only the selected unit name in `db/repository.ts`
- [X] T005 [P] [US2] Register the nested unit stack and edit title with the standard app-bar/back behavior in `app/units/[unitId]/_layout.tsx` and hide the root header for this nested stack in `app/_layout.tsx`
- [X] T006 [US2] Create `app/units/[unitId]/edit.tsx` to load and prefill the selected unit, reject blank values with visible feedback, save through `updateUnit`, and return to the refreshed unit list; if the ID is missing or the unit no longer exists, show a clear not-found error and allow safe return without saving
- [ ] T007 [US2] Manually verify rename, associated-young-person preservation, blank-name rejection, missing/nonexistent-unit feedback, and cancel-without-saving using `specs/008-unit-management/quickstart.md`

**Checkpoint**: A unit can be renamed and the initial screen reflects the change after returning.

---

## Phase 5: User Story 3 - Remove a unit and its young people (Priority: P1)

**Goal**: Require explicit confirmation before atomically deleting a unit and its dependent young people and progress entries, then refresh the unit list.

**Independent Test**: For a unit with young people and progress entries, verify the confirmation header, dynamic warning, and choices. “Não” must leave all data intact; “Sim” must remove the selected unit and its dependents, refresh the list, and leave other units untouched. Also check removal of an empty unit. See scenario 3 in `specs/008-unit-management/quickstart.md`.

### Implementation

- [X] T008 [US3] Add a transactional `deleteUnitWithDependents` operation that removes the selected unit's progress entries, young people, and unit in foreign-key-safe order, rolling back on failure, in `db/repository.ts`
- [X] T009 [US3] Add an async unit-removal handler in `app/index.tsx` that calls `deleteUnitWithDependents`, removes the deleted unit from displayed state only after repository success, then reloads the remaining units and young people; if that reload fails, keep the deleted unit absent and show a list-refresh error without reporting stale data as current
- [X] T010 [US3] Add the unit confirmation flow in `components/UnitAccordion.tsx` with header “Remover Unidade”, the exact dynamic warning from `specs/008-unit-management/spec.md`, “Sim” and “Não”, and a parent callback only on confirmation; preserve data and show failure feedback if the callback fails
- [X] T011 [US3] Manually verify cancel, confirmed removal of the unit, young people, and their progress reports, preservation of other units, and empty-unit removal using `specs/008-unit-management/quickstart.md`

**Checkpoint**: Confirmed removal deletes only the selected unit and its dependent data; cancel and failure do not report or display a successful deletion.

---

## Phase 6: User Story 4 - Dismiss the unit actions menu (Priority: P2)

**Goal**: Dismiss the unit actions menu when tapping outside its panel without triggering an action, while preserving selection behavior for taps inside the menu.

**Independent Test**: Open the menu, tap outside and verify it closes with no navigation or data changes; reopen and select an option inside to verify the option still works. See scenario 1 in `specs/008-unit-management/quickstart.md`.

### Implementation

- [X] T012 [US4] Review and, if needed, adjust the outside-backdrop handling in `components/UnitAccordion.tsx` so outside taps dismiss the actions menu without performing an action and inside-panel taps continue to select their option
- [ ] T013 [US4] Manually verify outside dismissal and normal selection of an inside menu option using `specs/008-unit-management/quickstart.md`

**Checkpoint**: The action menu can be dismissed with an outside tap and remains fully interactive inside the panel; the removal confirmation is unaffected.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete feature and satisfy the required Android startup check.

- [X] T014 Run `npm run typecheck` from the repository root after implementation and resolve feature-related diagnostics using `package.json`
- [ ] T015 Run `npm run android` from the repository root and confirm the app starts on Android; record any unavailable device/emulator limitation and result in the implementation review, following `specs/008-unit-management/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Complete the baseline typecheck before changes so existing diagnostics can be distinguished from feature regressions.
- **Foundational (Phase 2)**: No tasks; existing app infrastructure is sufficient.
- **User Story 1 (Phase 3)**: Depends on the baseline task; delivers the MVP menu and Add Young journey.
- **User Story 2 (Phase 4)**: Follows US1 because its edit action is exposed by the shared menu.
- **User Story 3 (Phase 5)**: Follows US1 and US2 to avoid concurrent changes to the shared menu component; deletion behavior itself does not depend on renaming.
- **User Story 4 (Phase 6)**: Depends only on US1 because it refines the shared unit actions menu; scheduled after US3 to avoid concurrent changes to that component.
- **Polish (Phase 7)**: Depends on the desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: After T001; no dependencies on other stories. MVP scope.
- **US2 (P1)**: After US1, because the edit option is exposed by the shared per-unit menu.
- **US3 (P1)**: After US1 and US2 for sequential shared-component integration; no data dependency on US2.
- **US4 (P2)**: After US1; no functional dependency on US2 or US3.

### Within-Story Dependencies

- **US1**: T002 implements the menu and add navigation; T003 verifies the complete journey.
- **US2**: T004 repository work and T005 route registration touch different files and can proceed in parallel; T006 depends on both; T007 follows implementation.
- **US3**: T008 provides the repository operation; T009 wires deletion and refresh into the parent screen; T010 connects the confirmation UI to the parent callback; T011 verifies the journey.
- **US4**: T012 ensures the backdrop and panel have distinct tap behavior; T013 manually verifies outside dismissal and inside selection.
- Automated tests are intentionally omitted by the project constitution; use the manual scenarios in `quickstart.md`.

## Parallel Execution Examples

### User Story 1

No independent tasks are marked parallel; the menu and add navigation are implemented together in `components/UnitAccordion.tsx` to avoid an incomplete menu interaction.

### User Story 2

After US1 is complete, these file-independent tasks may run in parallel:

- T004: Repository lookup and rename operation in `db/repository.ts`
- T005: Edit-route title and standard navigation registration in `app/units/[unitId]/_layout.tsx` and `app/_layout.tsx`

Then complete T006 and T007 in order.

### User Story 3

No tasks are marked parallel because deletion, parent refresh, and confirmation callback integration form a dependency chain and the UI work shares `components/UnitAccordion.tsx` with US1.

### User Story 4

T012 and T013 are sequential because manual dismissal verification follows the behavior check in `components/UnitAccordion.tsx`.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001 to record the existing typecheck baseline.
2. Complete T002 and T003 to deliver and manually verify the unit menu and Add Young journey.
3. Stop at the US1 checkpoint for the initial demonstrable increment.

### Incremental Delivery

1. Add US1 menu and Add Young behavior; verify independently.
2. Add US2 rename repository behavior, route, and form; verify independently.
3. Add US3 transactional removal, confirmation, and explicit list refresh; verify independently.
4. Add US4 outside-tap dismissal; verify that inside-panel selection and removal confirmation continue working.
5. Complete T014 and T015; record the Android startup result or device/emulator limitation.

## Notes

- Every task follows the checklist format: checkbox, sequential ID, optional parallel marker, required user-story label for story tasks, and a specific file path or documentation reference.
- `[P]` appears only on independent tasks that modify different files.
- Use English for source identifiers and Portuguese for the specified user-visible copy.
- Do not add automated tests or dependencies.
- Task IDs are sequential in execution order; follow the explicit dependencies before starting dependent tasks.
