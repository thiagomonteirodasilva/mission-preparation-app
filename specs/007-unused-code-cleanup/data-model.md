# Data Model: Remove Unused Code

This cleanup introduces no entities, fields, relationships, persistence changes, or state transitions. The existing SQLite data model is unaffected.

## Affected source artifacts

| Artifact | Current role | Planned change |
|---|---|---|
| `hooks/useUnits.ts` | Unreferenced hook definition | Remove after confirming no application-source consumer |
| `hooks/useYoungs.ts` | Unreferenced hook definition | Remove after confirming no application-source consumer |
| `constants/strings.ts` | Unreferenced `STRINGS` export | Remove after confirming no application-source consumer |
| `hooks/` | Contains only the two unreferenced hook files | Remove if empty after file deletion |
