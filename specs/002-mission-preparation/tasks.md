---

description: "Tasks for refreshing home data after saves"
---

# Tasks: Gestão de Preparação Missionária

**Input**: Design documents from `/specs/002-mission-preparation/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/), [quickstart.md](quickstart.md)

**Tests**: No automated test tasks. The constitution prohibits automated tests; use the manual validation tasks below.

**Scope**: This list covers the save-and-return freshness increment plus focused manual regression checks for the clarified progress-date rule and the existing list-volume criterion. App setup, database foundation, and the original user-story implementation are already complete and are not repeated.

**Organization**: Tasks are grouped by the affected user stories. The shared home-focus refresh is implemented once and then manually verified through creation and edit flows.

## Phase 1: Setup

**Purpose**: Project initialization and shared infrastructure.

No setup task is required; the Expo app, Expo Router, and SQLite are already configured.

## Phase 2: Foundational

**Purpose**: Blocking prerequisites for user-story implementation.

No foundational task is required; the existing SQLite repository already loads ordered units and young people.

## Phase 3: User Story 1 - Consultar unidades e jovens (Priority: P1) 🎯 MVP

**Goal**: Ensure the home screen shows current persisted unit and young data whenever it regains focus, without changing sorting or accordion behavior.

**Independent Test**: Use the already implemented create or edit flow to change persisted data while the home route is blurred; return home and verify the current records appear without restarting or reopening the screen, with ordering and accordion state intact. This test setup does not depend on implementing User Story 2 in this task list.

### Implementation for User Story 1

- [X] T001 [US1] Update `app/index.tsx` to load `loadUnitsWithYoungs()` through Expo Router's `useFocusEffect`, ensuring database initialization precedes the first read, prior async results are ignored after blur, the existing error state is updated on failures, and `expandedUnitIds` is not reset on subsequent focus refreshes.

**Checkpoint**: Home focus refresh replaces the stale data snapshot while retaining the current list interaction state.

## Phase 4: User Story 2 - Cadastrar unidade e jovem (Priority: P1)

**Goal**: Show newly created units and young people after their save flows return to home.

**Independent Test**: Save a unit, return home, and verify it appears in alphabetical order; save a young in a unit, return home, expand that unit, and verify the young's saved name and age.

### Manual validation for User Story 2

- [ ] T002 [US2] Manually run the unit-create and young-create return flows in `app/units/index.tsx` and `app/young/new.tsx` using `specs/002-mission-preparation/quickstart.md`; confirm each success message, the refreshed home list in `app/index.tsx`, alphabetical ordering, and the young's displayed age, then record the target and outcome in the change review.

**Checkpoint**: Both creation flows return to a current home list while preserving alphabetical ordering.

## Phase 5: User Story 3 - Atualizar acompanhamento e remover jovem (Priority: P2)

**Goal**: Reflect saved young-person edits on the home screen after returning from the detail route.

**Independent Test**: Change a young person's name or age, save, return home, expand the associated unit, and verify the updated values appear without reopening the app.

### Manual validation for User Story 3

- [ ] T003 [US3] Manually verify the edit-save-return and progress-entry flows in `app/young/[youngId].tsx` against `app/index.tsx` using `specs/002-mission-preparation/quickstart.md`; confirm edited values appear under the correct unit, report dates are assigned automatically and displayed as DD/MM/YYYY, text over 1000 characters is rejected, and the success message appears; record the target and outcome in the change review.

**Checkpoint**: Editing a young uses the same home-focus refresh without changing the existing edit or persistence behavior.

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify shared behavior and record manual evidence.

- [ ] T004 Using the app flows in `app/index.tsx`, `components/UnitAccordion.tsx`, and `db/seed.ts` as a starting point, prepare a manual dataset of at least 20 units and 100 young people; verify alphabetical ordering and findability before and after a save-and-return refresh, confirm expand/collapse state remains intact, and record the target and outcome in the change review. Do not add automated tests or permanent seed data.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No tasks; project initialization is complete.
- **Foundational (Phase 2)**: No tasks; existing persistence and ordered loading are ready.
- **User Story 1 (Phase 3)**: T001 implements the shared refresh behavior.
- **User Story 2 (Phase 4)**: T002 depends on T001 and validates unit and young creation.
- **User Story 3 (Phase 5)**: T003 depends on T001 and validates young editing.
- **Polish (Phase 6)**: T004 depends on T001, T002, and T003.

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on another task story; existing create/edit forms may be used only to set up the independent refresh check.
- **User Story 2 (P1)**: Depends on the shared home refresh from User Story 1; creation forms and persistence are already implemented.
- **User Story 3 (P2)**: Depends on the same home refresh from User Story 1; the existing edit flow remains unchanged.

### Dependency Graph

```text
T001
├── T002 ──┐
└── T003 ──┴── T004
```

### Parallel Opportunities

No tasks are marked `[P]`: the implementation changes one shared screen, and the manual flows use the same running app and persisted data. Execute T002 and T003 after T001; complete the 20-unit/100-young cross-cutting check last.

### Execution Examples by Story

- **US1**: Run T001 by itself; it is the shared implementation prerequisite.
- **US2**: Run T002 after T001, using the same app session for unit and young creation.
- **US3**: Run T003 after T001. Run it sequentially with T002 because both manual checks use the same app and local database.
- **Cross-cutting**: Run T004 after T002 and T003 with the prepared 20-unit/100-young dataset.

## Implementation Strategy

### MVP First

1. Complete T001 to refresh the home data whenever the route regains focus.
2. Complete T002 to verify that newly saved units and young people appear on return.
3. Complete T003 to verify that edited young people also appear with current values.
4. Complete T004 with the 20-unit/100-young dataset and record manual verification evidence.

### Incremental Delivery

- T001 delivers the shared refresh mechanism.
- T002 validates the P1 create-and-return flows.
- T003 validates the P2 edit-and-return flow using the same mechanism.
- T004 confirms the list-volume criterion and existing sorting and accordion behavior remain unchanged.

## Notes

- All task lines use the required unchecked checklist format and include sequential IDs, applicable story labels, and concrete file paths.
- The plan reuses Expo Router and the existing SQLite query; no schema, dependency, or automated-test work is planned.