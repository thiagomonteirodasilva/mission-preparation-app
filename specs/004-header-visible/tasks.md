---

description: "Task list for the consistent visible app bar feature"
---

# Tasks: Consistent Visible App Bar

**Input**: Design documents from `/specs/004-header-visible/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/), [quickstart.md](quickstart.md)

**Tests**: No automated test tasks. The constitution prohibits automated tests; use the manual validation task below.

**Organization**: Tasks are grouped by user story. This feature has one P1 story.

## Phase 1: Setup

**Purpose**: Project initialization and shared infrastructure.

No setup task is required: the Expo project, Expo Router stack, and NativeWind are already configured.

## Phase 2: Foundational

**Purpose**: Blocking prerequisites for user-story implementation.

No separate foundational task is required; the shared root stack is the feature's implementation point.

## Phase 3: User Story 1 - Navigate with a visible app bar (Priority: P1) 🎯 MVP

**Goal**: Show a consistently styled, named app bar on every route, with predictable back behavior on non-home routes.

**Independent Test**: Launch the app and visit `/`, `/units`, `/units/[unitId]`, `/young/new`, `/young/[youngId]`, and an unknown route. Confirm each app-bar title and `bg-sky-700` styling; confirm home has no back affordance and each other route returns to its prior route or home when no history exists.

### Implementation for User Story 1

- [X] T001 [US1] Configure the shared Expo Router header in `app/_layout.tsx`: keep `headerShown: true`, apply the `bg-sky-700` background with readable title/back controls, and assign stable titles for `/`, `/units`, `/units/[unitId]`, `/young/new`, `/young/[youngId]`, and `+not-found` using [contracts/README.md](contracts/README.md) as the route-title source.
- [X] T002 [US1] Add route-aware back behavior in `app/_layout.tsx`: omit the back control on `/`; show it on every other route and return to the previous route when history exists, otherwise navigate to `/`.
- [X] T003 [P] [US1] Configure class-based dark-mode handling in `tailwind.config.js` so NativeWind can initialize its web color-scheme runtime while rendering the required `bg-sky-700` app bar.
- [X] T004 [US1] Enable Metro `require.context` support in `metro.config.js` so Expo Router can discover all files under `app/` rather than rendering every URL as unmatched.

**Checkpoint**: User Story 1 is complete when the shared header and back behavior satisfy the route contract independently of screen data or persistence.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Manually validate the completed story and record any discrepancies.

- [ ] T005 Manually run every scenario in `specs/004-header-visible/quickstart.md` on the configured Expo target(s), verify route behavior against `app/index.tsx`, `app/units/index.tsx`, `app/units/[unitId].tsx`, `app/young/new.tsx`, `app/young/[youngId].tsx`, and `app/+not-found.tsx`, and record the target and outcome in the change review. **Blocked during this run**: Expo Web still renders the root route as “Unmatched Route” and its sitemap lists only `+not-found.tsx`, despite Metro now bundling all route context keys; resolve the route loading/configuration issue before marking this validation complete.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No tasks; project initialization and dependencies already exist.
- **Foundational (Phase 2)**: No tasks; no additional shared infrastructure is needed.
- **User Story 1 (Phase 3)**: Can start immediately. T002 follows T001 because both update `app/_layout.tsx` and back behavior depends on the shared header configuration.
- **User Story 1 (Phase 3)**: T004 fixes Metro's missing route-context prerequisite and must complete before T005.
- **Polish (Phase 4)**: T005 depends on T001, T002, T003, and T004 being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other user stories; it is the only story and is the MVP.

### Within User Story 1

- T001 establishes shared header visibility, styling, and titles.
- T002 adds the home/non-home back behavior in the same root layout.
- T003 adjusts NativeWind web color-scheme initialization in a separate config file and can run independently of T001/T002.
- T004 enables Expo Router route discovery through Metro and must complete before manual route validation.
- T005 validates the complete route flow after implementation.

### Parallel Opportunities

T001 and T002 modify the same file and must run sequentially. T003 modifies `tailwind.config.js` and can run in parallel with either root-layout task. T004 modifies `metro.config.js` independently, but the final manual check T005 must wait for it.

## Parallel Example: User Story 1

T001 and T002 must run sequentially; T003 and T004 change separate configuration files and can proceed independently. After all implementation tasks complete, run T005 for manual verification.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001 and T002 to configure the shared app bar and back behavior; T003 and T004 can proceed independently.
2. Complete T005 and confirm the independent acceptance criteria on a supported Expo target.
3. The feature is complete after the P1 story passes manual verification; no other story or automated test suite is needed.

### Incremental Delivery

This feature contains one independently deliverable story. Implementing and validating US1 delivers the full MVP.

## Notes

- T003 was added after the web runtime exposed a NativeWind color-scheme initialization failure; it is isolated to `tailwind.config.js`.
- T004 was added after Metro's fallback `require.context` threw because route contexts were disabled; this prevented Expo Router from discovering routes.
- T001 through T004 carry `[US1]`; the polish verification T005 does not carry a story label.
- Each task includes its target file path; manual validation uses the existing quickstart and route files.
- The current `headerShown: true` setting in `app/_layout.tsx` is retained; tasks cover the remaining title, style, and fallback requirements.
