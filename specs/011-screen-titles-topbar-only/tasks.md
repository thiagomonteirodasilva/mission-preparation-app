---

description: "Task list for Screen Titles Only in Top Bars"
---

# Tasks: Screen Titles Only in Top Bars

**Input**: Design documents from `specs/011-screen-titles-topbar-only/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Tests**: No automated test tasks are included, in accordance with the project constitution. The story phases include manual independent verification.

**Organization**: Tasks are grouped by the prioritized user stories in [spec.md](spec.md).

## Phase 1: Setup

**Purpose**: Confirm the existing screen-title ownership and implementation scope before making changes.

- [X] T001 Review route title configuration in `app/_layout.tsx`, the six route components listed in `specs/011-screen-titles-topbar-only/plan.md`, and the validation scripts in `package.json`; confirm only duplicate body headings are in scope

---

## Phase 2: Foundational

**Purpose**: Shared prerequisites blocking the user stories.

No shared components, dependencies, storage changes, or infrastructure are required. Complete T001 before beginning screen edits.

**Checkpoint**: The title mapping and scope are confirmed; User Story 1 can begin.

---

## Phase 3: User Story 1 - Read a screen name once (Priority: P1) 🎯 MVP

**Goal**: Keep each screen's name in its top bar and remove its duplicate body heading.

**Independent Test**: Visit each of the six routes and confirm the screen name remains in the top bar and is not repeated as a body title; confirm screens without a duplicate remain unchanged.

### Implementation for User Story 1

- [X] T002 [P] [US1] Remove the duplicate “Unidades” body heading from `app/index.tsx`; preserve the unit action and list content
- [X] T003 [P] [US1] Remove the duplicate “Nova unidade” body heading from `app/units/index.tsx`; preserve the form and save action
- [X] T004 [P] [US1] Remove the duplicate edit-unit body heading from `app/units/[unitId]/edit.tsx`; preserve loading, validation, form, and save behavior
- [X] T005 [P] [US1] Remove the duplicate “Novo jovem” body heading from `app/young/new.tsx`; preserve form fields, validation, and save behavior
- [X] T006 [P] [US1] Remove the duplicate “Detalhes do jovem” body heading from `app/young/[youngId].tsx`; preserve profile fields, progress sections, and actions
- [X] T007 [P] [US1] Remove the duplicate “Página não encontrada” body heading from `app/+not-found.tsx`; preserve the not-found screen and top-bar title

**Checkpoint**: All six routes show their screen names only in their top bars, without changes to the shared layout in `app/_layout.tsx`.

---

## Phase 4: User Story 2 - Keep screen content understandable (Priority: P2)

**Goal**: Ensure removing a duplicate title does not remove useful content or disrupt existing user workflows.

**Independent Test**: Inspect screen labels, messages, section headings, and actions; then complete representative existing create, edit, save, and back-navigation flows.

### Manual verification for User Story 2

- [ ] T008 [US2] Manually compare the six route screens in `app/index.tsx`, `app/units/index.tsx`, `app/units/[unitId]/edit.tsx`, `app/young/new.tsx`, `app/young/[youngId].tsx`, and `app/+not-found.tsx` with `specs/011-screen-titles-topbar-only/contracts/ui.md`; confirm all non-title content remains visible
- [ ] T009 [US2] Manually exercise unit creation, unit editing, young-person creation, young-person details, and back navigation through `app/units/index.tsx`, `app/units/[unitId]/edit.tsx`, `app/young/new.tsx`, and `app/young/[youngId].tsx`; confirm existing actions still work

**Checkpoint**: Useful content is preserved, and representative existing flows remain usable.

---

## Phase 5: Polish & Cross-Cutting Validation

**Purpose**: Complete project-level validation required by the constitution and the feature quickstart.

- [X] T010 Run `npm run typecheck` using the project scripts in `package.json`; resolve any type errors introduced by the screen edits
- [ ] T011 Run `npm run android` and follow `specs/011-screen-titles-topbar-only/quickstart.md`; record whether Android starts and note any device/emulator limitation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No external dependencies; T001 confirms source scope and project validation commands.
- **Foundational (Phase 2)**: No implementation prerequisite is needed beyond T001.
- **User Story 1 (Phase 3)**: Depends on T001; T002–T007 modify separate route files and can proceed in parallel.
- **User Story 2 (Phase 4)**: Depends on all User Story 1 heading removals, then verifies content and workflows.
- **Polish (Phase 5)**: Depends on both user-story phases being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Setup; independently delivers screen names only in top bars.
- **User Story 2 (P2)**: Starts after User Story 1 because its preservation checks verify the resulting screens; it introduces no separate implementation dependency.

### Parallel Opportunities

- T002–T007 can run in parallel because each targets a distinct route file and no shared layout or state changes are planned.
- User Story 2's manual content and workflow checks should follow the screen edits; do not perform simultaneous navigation checks on the same device.
- Project type-check and Android launch validation occur after both stories are complete.

### Parallel Example: User Story 1

```text
Task: T002 Remove the duplicate home title in app/index.tsx
Task: T003 Remove the duplicate new-unit title in app/units/index.tsx
Task: T004 Remove the duplicate edit-unit title in app/units/[unitId]/edit.tsx
Task: T005 Remove the duplicate new-young title in app/young/new.tsx
Task: T006 Remove the duplicate young-details title in app/young/[youngId].tsx
Task: T007 Remove the duplicate not-found title in app/+not-found.tsx
```

## Implementation Strategy

### MVP First (User Story 1)

1. Complete T001 to confirm the route and title scope.
2. Complete T002–T007, in parallel if capacity allows.
3. Independently visit every route and verify the screen name appears only in its top bar.
4. Continue to User Story 2 and the required project validation before considering the feature complete.

### Incremental Delivery

1. Deliver User Story 1 as the visual MVP, preserving the shared top-bar layout and other screen content.
2. Complete User Story 2's manual content and workflow checks.
3. Complete the type check and Android launch validation in Phase 5.

## Notes

- `[P]` tasks edit distinct route files and have no inter-task dependencies.
- User Story labels map to the stories in `specs/011-screen-titles-topbar-only/spec.md`.
- No automated tests are added, consistent with the project constitution.
- Android launch outcome and any verification limitation must be recorded during implementation.
- Source edits and TypeScript validation are complete. Runtime visual/interaction checks T008–T009 remain unchecked: the web fallback showed an unmatched route, and Android launch could not be confirmed because `adb` is unavailable in the environment. T011 remains unchecked until Android startup is confirmed or its device/emulator limitation is reviewed and accepted.
