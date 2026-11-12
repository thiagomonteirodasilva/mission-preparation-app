# Implementation Plan: Espaçamento Consistente nas Telas

**Branch**: `003-body-padding` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-body-padding/spec.md`

## Summary

A feature de interface exige que todas as telas mantenham um padding de 1rem na área principal de conteúdo, preservando navegação e legibilidade. A implementação mais simples e segura para esse app Expo é tratar esse espaçamento como uma regra compartilhada de layout, sem introduzir abstrações de dados ou integrações adicionais.

## Technical Context

**Language/Version**: TypeScript, React 18, Expo SDK 51

**Primary Dependencies**: expo-router, nativewind, react-native, expo-sqlite

**Storage**: SQLite local via `expo-sqlite` (unchanged for this feature)

**Testing**: Manual verification only, consistent with the project constitution

**Target Platform**: Mobile and web via Expo/React Native Web

**Project Type**: mobile/web application

**Performance Goals**: Keep navigation and render updates immediate; no data-heavy processing introduced

**Constraints**: All screens must still respect app navigation conventions, including top app bar and back navigation; no automated test suite expansion

**Scale/Scope**: Small app with multiple routed screens in `app/` and shared UI components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Simplicidade: a regra visual é aplicada em um único ponto de composição e não cria camadas ou abstrações extras.
- [x] Código legível: o padrão é explícito e fácil de inspecionar em telas e layouts compartilhados.
- [x] Navegação consistente: a mudança respeita a top app bar e as regras de botão de retorno exigidas pela constituição.
- [x] Verificação manual proporcional: a validação ocorrerá por inspeção visual em cada tela relevante; nenhum teste automatizado será adicionado.
- [x] Sem infraestruturas desnecessárias: não há necessidade de novas dependências, APIs ou serviços para atender ao requisito.

## Project Structure

### Documentation (this feature)

```text
specs/003-body-padding/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
├── spec.md              # Feature specification
└── checklists/
```

### Source Code (repository root)

```text
app/
├── _layout.tsx
├── index.tsx
├── units/
│   ├── index.tsx
│   └── [unitId].tsx
├── young/
│   ├── new.tsx
│   └── [youngId].tsx
components/
├── ConfirmDeleteModal.tsx
├── ProgressEntryList.tsx
├── SaveToast.tsx
├── UnitAccordion.tsx
├── YoungListItem.tsx
constants/
├── strings.ts
├── validation.ts
db/
├── repository.ts
├── schema.ts
├── seed.ts
styles/
└── global.css
types/
└── index.ts
```

**Structure Decision**: The feature stays within the existing Expo route layout and shared styling layer; the adjustment is applied as a shared layout contract rather than a new project structure or backend module.

## Complexity Tracking

No constitution violations require formal justification. The change is intentionally small and centered on visual consistency.
