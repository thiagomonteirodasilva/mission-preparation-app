# Quickstart: Button Icons

## Prerequisites

- `npx expo install @expo/vector-icons` completed; `package.json` lists the package.
- Android emulator or device available.

## Run

```powershell
npx expo start --android
```

## Manual validation

1. Home: no back button; "+ unidade" shows the `group` icon on a `bg-sky-700` button; tapping it still opens the new-unit screen.
2. Open any secondary screen: the top bar shows the `arrow-back` icon, no "‹ Voltar" text; tapping returns to the previous screen.
3. New unit, edit unit, new young and young details: "Salvar" shows the `save` icon on `bg-sky-700`; saving still works, and "Salvando..." keeps the icon (edit unit).
4. Expand a unit: "Ações" shows the `list` icon on `bg-sky-700`; the actions menu still opens.
5. Young details: "Excluir jovem" is red with white text and the `delete` icon; tapping opens the confirmation modal.
6. Record the Android launch result (constitution Development Workflow).

Icon and color mapping: see [contracts/README.md](contracts/README.md).
