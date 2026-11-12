# Tasks: Espaçamento Consistente nas Telas

**Input**: Design documents from `/specs/003-body-padding/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No automated tests were requested in the feature specification; verification will be manual through the app flows.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the shared layout and styling contracts before changing screen spacing.

- [ ] T001 Review the current screen structure in `app/_layout.tsx`, `app/index.tsx`, `app/units/index.tsx`, and `app/young/new.tsx` to confirm where the shared content container is defined.
- [ ] T002 [P] Review the existing global visual baseline in `styles/global.css` and Tailwind setup in `tailwind.config.js` to confirm the spacing system is based on `1rem` semantics.
- [ ] T003 [P] Confirm the navigation contract in `app/_layout.tsx` remains compliant with the project constitution: top app bar and predictable back navigation are preserved while body spacing is adjusted.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared layout rule that all screens need before any visual inconsistency is fixed.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Define the standard content spacing requirement for all application screens and document the scope as the main body area, excluding persistent navigation chrome.
- [ ] T005 [P] Update the shared screen wrapper in `app/_layout.tsx` or the route-level screen container so that the main body area uses `padding: 1rem` consistently across screens.
- [ ] T006 [P] Audit the existing route screens in `app/index.tsx`, `app/units/index.tsx`, `app/young/new.tsx`, and any related screen wrappers for local overrides that would conflict with the global body padding rule.

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Aplicar padding consistente nas telas (Priority: P1) 🎯 MVP

**Goal**: Ensure every screen keeps 1rem padding in the main body area without breaking navigation or readability.

**Independent Test**: Open the main app flows and confirm that each screen exposes content with consistent 1rem spacing from the viewport edges while keeping navigation controls visible and functional.

### Implementation for User Story 1

- [ ] T007 [P] [US1] Apply the shared body spacing rule to the main landing screen in `app/index.tsx` so the list and action controls respect the 1rem body margin.
- [ ] T008 [P] [US1] Apply the same body spacing rule to the unit list screen in `app/units/index.tsx` so lists and forms remain visually aligned with the rest of the app.
- [ ] T009 [US1] Apply the shared spacing rule to the young creation flow in `app/young/new.tsx` so the form and save actions maintain consistent edge spacing.
- [ ] T010 [US1] Review related route containers and shared components for any remaining local `p-*` spacing that conflicts with the requirement in `components/UnitAccordion.tsx`, `components/YoungListItem.tsx`, and other screen-specific wrappers.
- [ ] T011 [US1] Verify empty states and long content scenarios in the app still preserve readability and do not clip content or controls against the viewport edges.

**Checkpoint**: At this point, the main app flow should be visually consistent and independently testable

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final pass for consistency and documentation of the new standard.

- [ ] T012 [P] Document the body-spacing standard in the relevant feature notes and confirm the rule is consistent with the visual spec in `specs/003-body-padding/spec.md`.
- [ ] T013 [P] Perform a quick review of the final layout across the app to ensure no screen reintroduces edge-to-edge content or inconsistent padding.
- [ ] T014 Run manual quickstart validation from `specs/003-body-padding/quickstart.md` and record the final verification result for the feature.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS the user story implementation
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) and is independent from any other user story in this feature.

### Parallel Opportunities

- T002 and T003 can run in parallel in Phase 1.
- T005 and T006 can run in parallel in Phase 2.
- T007, T008, and T010 can proceed in parallel once the foundational layout rule is in place.
- T012 and T013 can be validated together in the final polish phase.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the flows manually before closing the feature

### Incremental Delivery

1. Establish the shared body spacing rule
2. Apply it to the main screen and main flows
3. Review edge cases and final consistency
4. Final manual validation and sign-off

---

## Notes

- [P] tasks = different files or independent screen areas with no dependency on the same wrapper change
- [Story] label maps task to the specific user story for traceability
- Each story should be independently testable and complete before moving to polish
- All tasks are intentionally scoped to the visual design requirement and do not introduce backend or data-model changes
