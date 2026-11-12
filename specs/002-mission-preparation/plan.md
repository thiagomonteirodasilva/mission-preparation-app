# Implementation Plan: Gestão de Preparação Missionária

**Branch**: `002-mission-preparation` | **Date**: 2026-11-11 | **Spec**: `/specs/002-mission-preparation/spec.md`

**Input**: Feature specification from `/specs/002-mission-preparation/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

This plan adds a focused freshness fix to the existing mission-preparation app: after a unit or young person is successfully saved and the user returns to the home screen, the screen reloads units and young people from local SQLite. The home route currently loads once on mount while Expo Router keeps it mounted behind pushed forms, so returning can show a stale in-memory list. Refresh on route focus using the existing Expo Router lifecycle API; preserve current accordion expansion where possible and leave persistence, sorting, validation, progress-date assignment, and navigation destinations unchanged.

## Technical Context

**Language/Version**: TypeScript 5.5, React Native 0.74, Expo SDK 51.

**Primary Dependencies**: Expo SDK 51, Expo Router 3, expo-sqlite, React 18, React Native 0.74, NativeWind 4; use the existing `useFocusEffect` API, with no new dependency.

**Storage**: Expo SQLite local database with tables for units, young people, and progress entries.

**Testing**: No automated tests per constitution; manual validation only through app flows.

**Target Platform**: Existing Expo targets: iOS, Android, and web.

**Project Type**: mobile-app

**Performance Goals**: No separate latency target is introduced for the existing low-volume local query. Refresh must occur as the home route regains focus, without a restart or manual reload; avoid background polling and duplicate state stores.

**Constraints**: offline-first local persistence; no external service dependencies or new packages; no automated test suite; preserve current list sorting, accordion state, route destinations, and Portuguese UI/English source identifiers.

**Scale/Scope**: Small app for a single support team; expected data volume is limited to dozens of units and a few hundred young people with progress logs.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- PASS: The project remains small and simple, with one mobile app and a local SQLite database only.
- PASS: No automated tests are introduced, maintaining compliance with the no-tests rule.
- PASS: Source code naming is in English; user-facing strings remain in Portuguese.
- PASS: Validation is explicit and local to the screen/form layer for age range and field constraints.
- PASS: Complexity remains low by avoiding unnecessary abstractions or additional service layers.
- PASS: Reuse Expo Router focus lifecycle and the existing SQLite query; do not add a cache, event bus, or dependency.
- PASS: The change only refreshes the home screen after navigation returns; it does not alter saved data or form behavior.
- PASS: Add manual checks for saving a unit, creating a young, and editing a young; automated tests remain prohibited.

## Project Structure

### Documentation (this feature)

```text
specs/002-mission-preparation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── README.md
└── tasks.md   # focused, actionable tasks for this refresh increment
```

### Source Code (repository root)

```text
app/
├── _layout.tsx
├── index.tsx             # Reload local unit/young data whenever home regains focus
├── units/
│   ├── index.tsx
│   └── [unitId].tsx
├── young/
│   ├── new.tsx
│   └── [youngId].tsx
├── +not-found.tsx
components/
├── UnitAccordion.tsx
├── YoungListItem.tsx
├── ProgressEntryList.tsx
├── ConfirmDeleteModal.tsx
├── SaveToast.tsx
constants/
├── validation.ts
└── strings.ts
db/
├── schema.ts
├── repository.ts
├── seed.ts
hooks/
├── useUnits.ts
├── useYoungs.ts
lib/
├── formatters.ts
├── validators.ts
types/
├── index.ts
styles/
└── global.css
```

**Structure Decision**: Keep the existing single Expo application. Update `app/index.tsx` to reload `loadUnitsWithYoungs()` on each focus using Expo Router's `useFocusEffect`; reuse the current repository and error feedback. Retain the current expanded-unit state across refreshes and keep the existing sort and navigation behavior. No schema, repository, form, or dependency changes are anticipated.

## Complexity Tracking

No constitution violations were identified, so no complexity exceptions are required.

## Constitution Check (Post-Design)

- PASS: The focus callback is the smallest change that addresses the stale home snapshot; no new layer or dependency is required.
- PASS: Persisted SQLite data remains the source of truth, and existing schema and ordering rules are unchanged.
- PASS: Existing expanded/collapsed state is retained while refreshed data replaces the stale list.
- PASS: Progress dates remain automatically assigned at save time; this refresh introduces no date entry or persistence changes.
- PASS: Manual verification only, including successful saves and return-to-home behavior; no automated tests are introduced.
