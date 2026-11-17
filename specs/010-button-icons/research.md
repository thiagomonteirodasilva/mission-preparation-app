# Research: Button Icons

## Is the icon library installed?

- Finding: `@expo/vector-icons` 14.1.0 exists in `node_modules` (hoisted), pulled in by `expo` (which depends on `^14.0.3`). `npm ls @expo/vector-icons` shows it is not a direct dependency of the project.
- Decision: declare it with `npx expo install @expo/vector-icons` so the version matches SDK 51 and the dependency is explicit.
- Rationale: relying on a transitive dependency is fragile; the package is already part of Expo, so no extra weight.
- Alternatives: use as-is (rejected: implicit dependency); `react-native-vector-icons` (rejected: needs native linking).

## Icon set and names

- Decision: `MaterialIcons` with names `arrow-back`, `group`, `save`, `list`, `delete`. The user's names match Material Icons.
- Alternatives: Ionicons/FontAwesome (rejected: names requested are Material).

## Colors

- Decision: primary buttons use `bg-sky-700` (the top bar color per constitution VII); icon and text white. "Excluir jovem" uses `bg-red-600` with `text-white` and a white icon.
- Rationale: NativeWind classes only; icon color passed as `#ffffff` since `MaterialIcons` takes a `color` prop.

## Layout

- Decision: wrap icon and text in a `flex-row items-center justify-center gap-2` container inside the existing `Pressable`.
- Back button: replace the text with `<MaterialIcons name="arrow-back" size={24} color="#ffffff" />`, keeping `accessibilityLabel="Voltar"`.
