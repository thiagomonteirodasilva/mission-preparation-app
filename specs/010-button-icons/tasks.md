# Tasks: Button Icons

**Input**: Design documents from `/specs/010-button-icons/`

**Prerequisites**: plan.md, spec.md, research.md, contracts/README.md, quickstart.md

**Tests**: None. The constitution forbids automated tests; verification is manual (see quickstart.md).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story the task belongs to

## Phase 1: Setup

- [X] T001 Declare the icon library by running `npx expo install @expo/vector-icons` and confirm it appears in `package.json` dependencies

---

## Phase 2: Foundational

No blocking work beyond T001.

---

## Phase 3: User Story 1 - Back icon in header (Priority: P1)

**Goal**: The top bar back button shows an arrow icon instead of "‹ Voltar".

**Independent Test**: Open any secondary screen; the arrow shows and returns to the previous screen; home has no back button.

- [X] T002 [US1] In `app/_layout.tsx`, replace the `‹ Voltar` text with `<MaterialIcons name="arrow-back" size={24} color="#ffffff" />`, keeping `accessibilityLabel="Voltar"` and the `onPress` logic; remove the unused `Text` import

---

## Phase 4: User Story 2 - Icons and color on primary buttons (Priority: P2)

**Goal**: "+ unidade", every "Salvar" and "Ações" show their icon and use `bg-sky-700`.

**Independent Test**: Check each button for icon and color; actions still work.

- [X] T003 [P] [US2] In `app/index.tsx`, add the `group` icon (white) beside "+ unidade" in a `flex-row items-center gap-2` container and set the button background to `bg-sky-700`
- [X] T004 [P] [US2] In `app/units/index.tsx`, add the `save` icon beside "Salvar" and set the button background to `bg-sky-700`
- [X] T005 [P] [US2] In `app/units/[unitId]/edit.tsx`, add the `save` icon beside the Salvar/"Salvando..." label and set the button background to `bg-sky-700`
- [X] T006 [P] [US2] In `app/young/new.tsx`, add the `save` icon beside "Salvar" and set the button background to `bg-sky-700`
- [X] T007 [P] [US2] In `app/young/[youngId].tsx`, add the `save` icon beside the "Salvar" button text (button already `bg-sky-700`)
- [X] T008 [P] [US2] In `components/UnitAccordion.tsx`, add the `list` icon beside "Ações" and set the button background to `bg-sky-700`

---

## Phase 5: User Story 3 - Delete button emphasis (Priority: P3)

**Goal**: "Excluir jovem" is red with white text and a trash icon.

**Independent Test**: Open Detalhes do jovem; the button is red/white with the icon and still opens the confirmation modal.

- [X] T009 [US3] In `app/young/[youngId].tsx`, change the "Excluir jovem" button to `bg-red-600` with `text-white`, remove the red border/`bg-red-50` classes, and add the `delete` icon (white) beside the text

---

## Phase 6: Polish

- [X] T010 Run `npm run typecheck` and fix any errors introduced by the new imports
- [X] T011 Run `npx expo start --android`, execute the quickstart.md validation steps, and record the result (constitution requires the Android launch check; if no device is available, record that limitation)

---

## Dependencies & Execution Order

- T001 first; all icon tasks depend on it.
- US1, US2 and US3 are independent of each other; T007 and T009 edit the same file, so run them sequentially.
- T003-T008 (except T007 relative to T009) are parallel.
- T010 and T011 after all story tasks.

## Implementation Strategy

- MVP: T001 + T002 (User Story 1), then add US2 and US3 incrementally.
- Use `import { MaterialIcons } from '@expo/vector-icons';` and wrap icon + text in `flex-row items-center justify-center gap-2`.
