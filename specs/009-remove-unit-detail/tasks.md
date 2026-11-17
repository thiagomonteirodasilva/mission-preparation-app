---

description: "Task list for removing the unused unit-detail screen safely"
---

# Tasks: Remove Unused Unit Detail Screen

**Input**: Design documents from `specs/009-remove-unit-detail/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, and `quickstart.md`

**Tests**: No automated test tasks are included. Manual verification tasks are required by the specification and project constitution.

**Organization**: Tasks are grouped by the three user stories in `spec.md` so route removal, preserved unit management, and obsolete-link recovery are independently verifiable.

## Phase 1: Setup

**Purpose**: Confirm exact route ownership and removal boundaries before changing navigation.

- [X] T001 Review the removal boundary in `specs/009-remove-unit-detail/spec.md` and trace route registrations in `app/_layout.tsx`, `app/units/[unitId]/_layout.tsx`, and unit actions in `components/UnitAccordion.tsx` before editing.

---

## Phase 2: Foundational

**Purpose**: No shared data, service, or infrastructure prerequisite is needed; the change is limited to route configuration and regression validation.

No foundational tasks are required.

---

## Phase 3: User Story 1 - View young people from the home screen (Priority: P1) 🎯 MVP

**Goal**: Remove the separate unit-detail page while keeping unit expansion and young-person navigation on the home screen.

**Independent Test**: Expand and collapse populated and empty units on the home screen; confirm young people and ages appear inline, and selecting a young person still opens their details.

### Implementation for User Story 1

- [X] T002 [P] [US1] Delete the unused unit-detail page at `app/units/[unitId]/index.tsx`; keep the home accordion as the browsing interface.
- [X] T003 [P] [US1] Remove only the `index` child declaration from `app/units/[unitId]/_layout.tsx`, retaining the nested stack and edit child route.
- [X] T004 [P] [US1] Audit `app/_layout.tsx` so the former unit-detail page is no longer an exposed destination while retaining any root parent configuration required by the nested edit route.
- [ ] T005 [US1] Manually verify the populated/empty unit expansion and young-person opening scenarios in `specs/009-remove-unit-detail/quickstart.md`, recording the observed result.

**Checkpoint**: Home-screen browsing works inline and the unit-detail index is no longer reachable through in-app navigation.

---

## Phase 4: User Story 2 - Continue managing a unit (Priority: P1)

**Goal**: Preserve add-young, edit-unit, young-person update, and unit-removal flows after route removal.

**Independent Test**: Use a unit's actions menu to add a young person, rename the unit, and cancel/confirm removal; open and save a young-person profile; confirm each flow returns to current home data.

### Implementation for User Story 2

- [X] T006 [US2] Preserve the unit edit destination and its title, single app bar, selected-unit loading, save, and back behavior in `app/units/[unitId]/_layout.tsx`, `app/units/[unitId]/edit.tsx`, and `app/_layout.tsx`; correct any regression caused by removing the index route.
- [ ] T007 [US2] Manually verify add-young, edit/save, young-person profile save/return, and unit-removal cancel/confirm flows using `specs/009-remove-unit-detail/quickstart.md`; use a disposable unit for destructive removal and record the results.

**Checkpoint**: All existing unit-management and young-person flows remain usable without the removed detail page.

---

## Phase 5: User Story 3 - Reach a safe destination from an obsolete entry point (Priority: P2)

**Goal**: Ensure a direct or saved entry to the removed detail destination does not crash, render blank, or strand the user.

**Independent Test**: Open the former unit-detail URL directly and confirm the not-found state is visible and the user can return home.

### Implementation for User Story 3

- [X] T008 [P] [US3] Ensure the unmatched-route screen in `app/+not-found.tsx` has a non-blank state; add an explicit home action only if the shared back control already provided by `app/_layout.tsx` proves insufficient.
- [ ] T009 [US3] Manually open the former unit-detail URL using the configured deep-link mechanism (or corresponding web path), verify not-found and return-home behavior, and record the result in `specs/009-remove-unit-detail/quickstart.md`.

**Checkpoint**: Obsolete links recover safely and retained routes continue to work.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Complete final build/startup checks and record validation evidence.

- [X] T010 Run `npm run typecheck` and the required Android startup check from `specs/009-remove-unit-detail/quickstart.md`; record platform and outcome in the implementation review, and do not claim Android verification if no device/emulator is available. Typecheck passed; Android startup was attempted but remains unverified because `adb` is unavailable.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001; no dependencies.
- **Foundational (Phase 2)**: No tasks; no shared infrastructure changes are needed.
- **User Story 1 (Phase 3)**: Depends on T001. T002, T003, and T004 can run in parallel because they touch separate files; T005 follows all three.
- **User Story 2 (Phase 4)**: Starts after User Story 1. T006 preserves the edit route; T007 follows T006 for end-to-end manual verification.
- **User Story 3 (Phase 5)**: Starts after User Story 1. T008 can run in parallel with T006 because it targets `app/+not-found.tsx`; T009 follows T008.
- **Polish (Phase 6)**: T010 follows all user-story implementation and manual verification tasks.

### User Story Dependencies

- **User Story 1 (P1)**: Depends only on setup. Delivers the primary requested removal and inline browsing behavior.
- **User Story 2 (P1)**: Depends on User Story 1 so the existing management flows are checked against the removed route structure.
- **User Story 3 (P2)**: Depends on User Story 1; can proceed in parallel with User Story 2 after the route removal is complete.

### Parallel Opportunities

- T002, T003, and T004 can be implemented in parallel after T001 because each targets a distinct route file.
- After User Story 1, T006 (edit-route preservation) and T008 (not-found recovery) can be worked on in parallel; the corresponding manual checks T007 and T009 follow their own implementation tasks.

## Parallel Example: User Story 1

```text
Task: T002 Delete app/units/[unitId]/index.tsx
Task: T003 Remove the index child from app/units/[unitId]/_layout.tsx
Task: T004 Audit the nested parent registration in app/_layout.tsx
```

## Implementation Strategy

### MVP First (User Story 1)

1. Complete T001 route-boundary review.
2. Complete T002-T004 to remove the unused destination without removing the edit route.
3. Complete T005 to manually verify accordion and young-person navigation behavior.
4. Continue to User Stories 2 and 3 before declaring the feature complete, because preserving management flows and safe obsolete-link handling are explicit requirements.

### Incremental Delivery

1. Deliver User Story 1: remove the detail page and verify home browsing.
2. Deliver User Story 2: verify and correct any regression in existing unit and young-person actions.
3. Deliver User Story 3: verify obsolete-link fallback.
4. Complete T010 and record typecheck, Android startup, and manual validation outcomes.

## Notes

- Every task is a checkbox with a sequential ID; `[P]` appears only on tasks targeting distinct files that can proceed independently.
- User-story implementation tasks include `[US1]`, `[US2]`, or `[US3]`; setup and polish tasks do not.
- File paths are included in every task description.
- Manual verification is required; automated tests are prohibited by the project constitution and are not added.
