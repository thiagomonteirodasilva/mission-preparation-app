# Implementation Plan: Button Icons

**Branch**: `010-button-icons` | **Date**: 2026-11-17 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/010-button-icons/spec.md`

## Summary

Add Material icons to the back button, "+ unidade", every "Salvar", "Ações" and "Excluir jovem" buttons, and align button colors (`bg-sky-700` for primary actions, `bg-red-600` for delete). `@expo/vector-icons` is already installed transitively through Expo, but it is not declared in `package.json`; the plan declares it explicitly with `npx expo install`.

## Technical Context

**Language/Version**: TypeScript 5.5, React 18.2, React Native 0.74.5, Expo SDK 51

**Primary Dependencies**: expo-router, nativewind 4, `@expo/vector-icons` (to be declared)

**Storage**: N/A (no data change)

**Testing**: None by constitution; manual verification on Android

**Target Platform**: Android (Expo)

**Project Type**: mobile-app

**Performance Goals**: N/A

**Constraints**: Small codebase, few dependencies; button behavior must not change

**Scale/Scope**: 7 source files plus `package.json`

## Constitution Check

- I/II Clarity and simplicity: use `MaterialIcons` directly in each button; no wrapper component. PASS
- III Dependencies explicit: declaring the already-used library makes the dependency visible. PASS
- IV Predictable behavior: only presentation changes; handlers untouched. PASS
- V Manual verification: quickstart defines manual checks; no automated tests. PASS
- VI English in code: identifiers in English; user-visible text stays Portuguese. PASS
- VII Navigation: top bar keeps `bg-sky-700`; back button remains on all non-home screens with label "Voltar". PASS
- Development Workflow: implementation must run `expo start --android` and record the result (carry into tasks).

Post-design re-check: PASS, no violations.

## Project Structure

### Documentation (this feature)

```text
specs/010-button-icons/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/README.md
└── tasks.md             # created by /speckit-tasks
```

### Source Code (repository root)

```text
app/
├── _layout.tsx             # back button -> arrow-back icon
├── index.tsx               # "+ unidade" -> group icon, bg-sky-700
├── units/index.tsx         # Salvar -> save icon, bg-sky-700
├── units/[unitId]/edit.tsx # Salvar -> save icon, bg-sky-700
└── young/
    ├── new.tsx             # Salvar -> save icon, bg-sky-700
    └── [youngId].tsx       # Salvar -> save icon; Excluir jovem -> delete icon, red
components/
└── UnitAccordion.tsx       # Ações -> list icon, bg-sky-700
package.json                # declare @expo/vector-icons
```

**Structure Decision**: Existing Expo Router layout; edits in place, no new source files.

## Complexity Tracking

No violations.
