# Feature Specification: Consistent Visible App Bar

**Feature Branch**: `004-header-visible`

**Created**: 2026-11-09

**Status**: Ready for planning

**Input**: Ensure the application header is visible by setting `headerShown: true` in the root Expo Router layout. The project constitution additionally requires a named, sky-blue top app bar on every screen and predictable back navigation on non-home screens.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.

  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Navigate with a visible app bar (Priority: P1)

As a user, I want every screen to show a consistently styled app bar with the current screen name, so I can tell where I am in the app and navigate back from secondary screens.

**Why this priority**: The app bar is a required navigation and orientation element under the project constitution.

**Independent Test**: Open the home route and each secondary route, verify its title and appearance, then use the back control to return to the preceding route.

**Acceptance Scenarios**:

1. **Given** the app is opened at the home route, **When** the screen renders, **Then** a top app bar with the home screen name and `bg-sky-700` styling is visible and no back control is shown.
2. **Given** a secondary route is open, **When** the screen renders, **Then** the app bar displays that screen's name and a back control.
3. **Given** a secondary route was reached from another screen, **When** the user activates the back control, **Then** the preceding screen is restored; if there is no prior in-app history, the user is returned to home.
4. **Given** the user navigates between any existing routes, **When** each route becomes active, **Then** the app bar remains visible and uses the same visual treatment.

### Edge Cases

- A route is opened directly without an in-app navigation history; its back action returns to home.
- A route title is not explicitly provided; the app must use a stable, user-readable route label rather than a blank or raw parameter value.
- A not-found route is rendered; it must retain the shared app bar and provide a safe way back to home.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST display a top app bar on every existing route, including the home and not-found routes.
- **FR-002**: The app bar MUST display a readable name for the active screen and use the shared `bg-sky-700` visual treatment.
- **FR-003**: The home route MUST NOT show a back control.
- **FR-004**: Every non-home route MUST provide a back control that returns to the preceding in-app screen, or to home when no prior in-app history exists.
- **FR-005**: Showing the app bar MUST NOT change route content, persistence, or existing navigation destinations.
- **FR-006**: The feature MUST be verified manually; it MUST NOT introduce automated tests, in accordance with the project constitution.

### Key Entities

- **Screen**: An existing navigable app route with a stable display name and a home/non-home role.
- **App bar**: Shared navigation UI showing the active screen name, consistent styling, and a back affordance when the screen is not home.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of existing application routes display the shared app bar with a non-empty screen name.
- **SC-002**: 100% of non-home routes expose a working back action, and the home route exposes none.
- **SC-003**: Manual verification confirms the app bar uses the required `bg-sky-700` styling across supported app targets without blocking existing screen interactions.

## Assumptions

- Existing routes and their screen names remain unchanged; names can be sourced from current user-facing screen headings.
- The root Expo Router stack is the shared mechanism for app-bar visibility and common appearance.
- The app supports the platforms already configured by Expo in the project; no new platform or dependency is introduced.
