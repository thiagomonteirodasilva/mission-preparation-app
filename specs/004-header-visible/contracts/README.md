# UI Contract: Shared App Bar

## Scope

The app bar is a user-facing navigation contract shared by all Expo Router screens. It does not expose a network API or change persistence behavior.

## Route presentation

| Route | App-bar title | Back affordance |
|---|---|---|
| `/` (`app/index.tsx`) | Unidades | Hidden |
| `/units` (`app/units/index.tsx`) | Nova unidade | Shown; returns to the preceding screen or home fallback |
| `/units/[unitId]` (`app/units/[unitId].tsx`) | Jovens da unidade | Shown; returns to the preceding screen or home fallback |
| `/young/new` (`app/young/new.tsx`) | Novo jovem | Shown; returns to the preceding screen or home fallback |
| `/young/[youngId]` (`app/young/[youngId].tsx`) | Detalhes do jovem | Shown; returns to the preceding screen or home fallback |
| `+not-found` (`app/+not-found.tsx`) | Página não encontrada | Shown; returns to the preceding screen or home fallback |

## Shared behavior and appearance

- The app bar is visible on every listed route.
- The background uses the existing NativeWind class `bg-sky-700`.
- Title and back affordances remain legible against the background and respect platform safe areas.
- Activating back returns to the previous in-app route; with no prior route, it navigates to `/`.
- Route content and existing data/navigation actions remain otherwise unchanged.
