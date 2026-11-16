---

description: "Actionable tasks for removing confirmed-unused code"
---

# Tasks: Remove Unused Code

**Input**: Design documents from `specs/007-unused-code-cleanup/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

**Tests**: No automated test tasks are included; not requested and prohibited by the project constitution. Validate with the existing type check and manual Android/app-flow verification.

## Phase 1: Setup

**Purpose**: No project initialization is needed for this focused cleanup; the existing Expo project is already configured.

No setup tasks.

---

## Phase 2: Foundational

**Purpose**: No shared infrastructure or blocking foundation is needed. Each user story independently verifies its own reference scope before deletion.

No foundational tasks.

---

## Phase 3: User Story 1 - Remove unused data hooks (Priority: P1) 🎯 MVP

**Goal**: Remove both unreferenced hook modules and remove `hooks/` only after it becomes empty.

**Independent Test**: Search application source under `app/`, `components/`, `db/`, `hooks/`, `lib/`, and `types/` for imports or calls to `useUnits` and `useYoungs`; confirm no references remain, both hook files are absent, and `hooks/` is absent if empty.

- [X] T001 [P] [US1] Search application source under `app/`, `components/`, `db/`, `hooks/`, `lib/`, and `types/` for `useUnits` and `useYoungs` consumers; record that neither hook has a consumer
- [X] T002 [US1] Delete the confirmed-unused hook files `hooks/useUnits.ts` and `hooks/useYoungs.ts` after T001 confirms there are no consumers
- [X] T003 [US1] Remove the `hooks/` directory after T002 and verify it contains no remaining files

**Checkpoint**: User Story 1 is complete when the hook files are absent, no app-source consumers remain, and the empty hooks directory has been removed.

---

## Phase 4: User Story 2 - Remove the unused shared strings export (Priority: P2)

**Goal**: Remove `STRINGS` and its module only if application source has no consumers.

**Independent Test**: Search application source for `STRINGS` and imports from `constants/strings`; confirm no consumers remain and `constants/strings.ts` is absent.

- [X] T004 [P] [US2] Search application source under `app/`, `components/`, `db/`, `hooks/`, `lib/`, and `types/` for `STRINGS` or imports from `constants/strings`; record that no consumer exists
- [X] T005 [US2] Delete `constants/strings.ts` after T004 confirms there are no consumers

**Checkpoint**: User Story 2 is complete when no application-source consumer remains and `constants/strings.ts` is absent.

---

## Phase 5: Polish & Cross-Cutting Verification

**Purpose**: Confirm the cleanup did not affect compilation or observable app behavior.

- [X] T006 Run `npm run typecheck` from `package.json`'s project root and confirm it exits without TypeScript diagnostics
- [X] T007 Launch the app with `expo start --android` from the project root and manually verify the primary app flows and existing persisted data; record any unavailable-device/emulator limitation without marking Android verification complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No tasks; the current project structure and tooling are already initialized.
- **Foundational (Phase 2)**: No tasks; no shared infrastructure blocks either user story.
- **User Story 1 (Phase 3)**: T001 → T002 → T003.
- **User Story 2 (Phase 4)**: T004 → T005; independent of User Story 1.
- **Polish (Phase 5)**: T006 and T007 run after both user stories are complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independent; verify hook usage, then delete hook files and empty folder.
- **User Story 2 (P2)**: Independent of User Story 1; verify `STRINGS` usage, then delete its file.

### Parallel Opportunities

- T001 and T004 can run in parallel because they inspect separate symbols and do not modify files.
- The user stories can proceed independently after their own reference checks.
- T006 and T007 can run in parallel after both user stories are complete; they validate separate aspects and do not edit source files.

### Parallel Example: Reference Checks

```text
Task: T001 Search for useUnits/useYoungs consumers in application source
Task: T004 Search for STRINGS/constants/strings consumers in application source
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete T001 and confirm both hooks are unreferenced.
2. Complete T002 and T003 to remove the unused files and empty folder.
3. Independently validate the User Story 1 criteria before proceeding.

### Incremental Delivery

1. Deliver the hook cleanup as the P1 increment.
2. Deliver the independent shared-strings cleanup as the P2 increment.
3. Run the type check and manual Android/app-flow verification after both increments.

## Notes

- Each deletion is conditional on its preceding search confirming no source consumer; retain any artifact for which a consumer is discovered and update the scope accordingly.
- References in historical specs/plans are documentation, not application-source consumers.
- Automated tests are intentionally omitted in accordance with the project constitution.
- Verification record: `npm run typecheck` completed successfully. Android startup was confirmed after adding the installed Android SDK platform-tools directory to `PATH`: Expo Go opened the app and Metro reported a successful Android bundle. No startup exception was found. Full manual primary-flow and persisted-data verification was not completed, so T007 remains unchecked.
