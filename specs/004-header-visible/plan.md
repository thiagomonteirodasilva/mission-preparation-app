# Implementation Plan: Consistent Visible App Bar

**Branch**: `004-header-visible` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/004-header-visible/spec.md`

## Summary

Make the shared Expo Router app bar visible on every route, with a stable screen title, the constitution-required `bg-sky-700` appearance, and predictable back navigation on non-home routes. The root layout already sets `headerShown: true`; the remaining design work is to configure route titles and shared styling, and ensure non-home routes return to their prior route or home when entered without history. Preserve screen content, persistence, route destinations, and the project's no-automated-tests rule.

## Technical Context

**Language/Version**: TypeScript 5.x; Expo SDK 51 / React Native 0.74

**Primary Dependencies**: Expo Router 3, React Native, NativeWind 4; no new dependencies

**Storage**: N/A; no persisted data changes

**Testing**: Manual verification only, as required by the constitution; do not add automated tests

**Target Platform**: Expo-configured iOS, Android, and web targets

**Project Type**: Mobile app with Expo web target

**Performance Goals**: Header updates with route changes and must not obstruct normal screen interaction

**Constraints**: Use the existing router and NativeWind setup; shared app bar uses `bg-sky-700`; screen content, navigation destinations, and local persistence remain unchanged; manual validation only

**Scale/Scope**: Six existing routes: home, units list, unit detail, new young, young detail, and not-found

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: A shared stack-level solution keeps implementation small and avoids new dependencies.
- PASS: The shared app bar uses the required `bg-sky-700` class and supplies a title for every route.
- PASS: Home omits back navigation; non-home routes return to the preceding route or fall back to home.
- PASS: Verification is manual; no automated tests are introduced.
- PASS: Existing route content, persistence, and destination behavior remain unchanged.
- GAP TO ADDRESS: `headerShown: true` is already set in `app/_layout.tsx`, but the route-specific title, required class, and no-history back fallback are not yet represented by the root configuration. Phase 1 design covers these remaining constitution requirements.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
```text
app/
├── _layout.tsx          # Shared stack/header visibility, style, and route options
├── index.tsx            # Home route; no back control
├── +not-found.tsx       # Not-found route
├── units/
│   ├── index.tsx        # New unit route
│   └── [unitId].tsx     # Unit detail route
└── young/
    ├── new.tsx          # New young route
    └── [youngId].tsx    # Young detail route
styles/
└── global.css           # Existing global stylesheet; no change anticipated
```

**Structure Decision**: Keep the single Expo application and configure the existing root stack in `app/_layout.tsx`. Declare stable route titles and the shared NativeWind app-bar background there. Use the existing stack navigation state for back behavior and a small shared fallback action for non-home routes with no history; do not add a new module, service, or dependency.

## Complexity Tracking

No constitution violations are planned. The fallback back action is required to meet the existing navigation rule for a directly opened non-home route; no additional architecture or dependencies are needed.

## Constitution Check (Post-Design)

- PASS: One root-stack configuration provides consistent appearance and titles without per-screen duplication.
- PASS: The shared background uses the existing NativeWind utility `bg-sky-700`.
- PASS: Home has no back affordance; other routes go back predictably and have a home fallback.
- PASS: No database, business behavior, or route destinations change.
- PASS: Only manual verification is planned; no automated test artifacts are added.
- PASS: No new dependency or unnecessary abstraction is introduced.
