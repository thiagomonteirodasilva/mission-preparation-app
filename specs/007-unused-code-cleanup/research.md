# Research: Remove Unused Code

## Decision 1: Determine usage from application source, not historical planning documents

- **Decision**: Treat imports, calls, and other references in application source as usage; mentions in specs/plans are historical documentation and do not keep dead modules alive.
- **Rationale**: The requested cleanup concerns runtime/application code. Existing repository search found no source references to `useUnits`, `useYoungs`, or `STRINGS`; textual mentions occur only in the target modules and older planning artifacts.
- **Alternatives considered**: Preserve files because their names appear in historical plans. Rejected because those documents describe earlier designs and are not executable consumers.

## Decision 2: Remove only the confirmed-unused modules and empty folder

- **Decision**: Delete `hooks/useUnits.ts`, `hooks/useYoungs.ts`, and `constants/strings.ts`; remove `hooks/` only if it is empty after deletion.
- **Rationale**: The folder contains only the two unused hook files, and `STRINGS` has no application-source consumer. The deletion is behavior-preserving and introduces no dependencies or abstractions.
- **Alternatives considered**: Keep an empty hooks directory or replace the shared strings module. Rejected because neither contributes functionality to the current application.

## Decision 3: Validate with existing checks and manual Android launch

- **Decision**: Run `npm run typecheck`, then manually verify application startup using `expo start --android`; record a device/emulator limitation if Android startup cannot be confirmed.
- **Rationale**: The project constitution prohibits automated tests and requires an Android launch check for implementation tasks.
- **Alternatives considered**: Add automated tests or dependencies. Rejected because the constitution explicitly disallows automated tests and the change does not add behavior requiring a test framework.

## Unresolved items

- None. The scope and repository-specific verification approach are clear.
