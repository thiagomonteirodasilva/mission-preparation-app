# Implementation Plan: Screen Titles Only in Top Bars

**Branch**: `011-screen-titles-topbar-only` | **Date**: 2026-11-18 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [spec.md](spec.md)

## Summary

Remove the repeated screen-name headings from the content area while preserving each existing top-bar title, the remaining screen content, and all navigation and interactions. Research confirms the top-bar titles are centralized in the root navigation layout and the repeated headings are individual route content; removing only those headings is the smallest solution and needs no new dependency or abstraction.

## Technical Context

**Language/Version**: TypeScript 5.5, React 18.2, React Native 0.74.5, Expo SDK 51

**Primary Dependencies**: Expo Router 3, NativeWind 4, React Native

**Storage**: N/A; no data or persistence changes

**Testing**: TypeScript type check and manual UI/workflow verification; no automated tests per constitution

**Target Platform**: Expo-supported application platforms; Android launch verification is required by the project workflow

**Project Type**: Mobile application

**Performance Goals**: No runtime or performance behavior changes

**Constraints**: Keep the top-bar titles and `bg-sky-700` styling; preserve back navigation, content other than duplicate titles, and existing interactions; do not add dependencies or automated tests

**Scale/Scope**: Six existing route screens; presentation-only change, no persistence or API scope

## Constitution Check

*Gate before Phase 0 research: PASS.*

- **I. Clear and readable code**: Remove only redundant title elements; no new abstractions or comments are needed. PASS
- **II. Simplicity before abstraction**: Use the existing route screens and layout; add no component or dependency. PASS
- **III. Explicit responsibilities and dependencies**: No new module, dependency, or data responsibility. PASS
- **IV. Predictable behavior**: Keep route behavior, handlers, and content unchanged apart from duplicate headings. PASS
- **V. Proportional manual verification**: No automated tests; verify the screens and user flows manually. PASS
- **VI. English in source code**: No new identifiers or source comments are required; existing user-facing Portuguese remains unchanged. PASS
- **VII. Consistent navigation**: Preserve all named `bg-sky-700` top bars and existing back navigation. PASS
- **Development workflow**: Include the Android launch check in implementation validation. PASS

## Project Structure

### Documentation (this feature)

```text
specs/011-screen-titles-topbar-only/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
├── checklists/
│   └── requirements.md
└── tasks.md             # created by /speckit-tasks
```

### Source Code (repository root)

```text
app/
├── _layout.tsx             # owns the persistent top-bar titles; unchanged
├── +not-found.tsx          # remove duplicate body title
├── index.tsx               # remove duplicate home title
├── units/
│   ├── index.tsx           # remove duplicate new-unit title
│   └── [unitId]/
│       ├── _layout.tsx     # nested route layout; unchanged
│       └── edit.tsx        # remove duplicate edit-unit title
└── young/
    ├── new.tsx             # remove duplicate new-young title
    └── [youngId].tsx       # remove duplicate young-details title
```

**Structure Decision**: Keep the existing single Expo Router mobile application. Modify only the six route components containing the duplicate body titles; leave the shared app-bar configuration and nested route layout unchanged. The feature introduces no API, storage, or test directories.

## Post-Design Constitution Check

- The design changes only screen presentation, uses no added dependency or abstraction, preserves the top bars and navigation, and requires manual verification without automated tests. Android launch verification is documented in [quickstart.md](quickstart.md). PASS

No constitution violations or exceptions.
