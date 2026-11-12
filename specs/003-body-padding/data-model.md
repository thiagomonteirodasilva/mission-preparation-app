# Data Model: layout e espaçamento visual

## Overview

Esta feature não introduz alterações de persistência ou regras de negócio de domínio. O impacto principal está na camada de apresentação do app: o contêiner principal das telas deve sempre manter um padding horizontal e vertical de 1rem.

## Entities

### ScreenFrame

- **Name**: ScreenFrame
- **Purpose**: define a área principal de conteúdo comum a todas as telas do app
- **Attributes**:
  - `contentPadding`: string, fixed value `1rem`
  - `appliesTo`: all route screens
  - `layoutContext`: route-level content wrapper
- **Relationships**:
  - Each screen route renders inside a single ScreenFrame container
  - ScreenFrame does not replace the top app bar or navigation actions

### Screen

- **Name**: Screen
- **Purpose**: represent an existing route in the app
- **Attributes**:
  - `routeName`: screen identifier
  - `content`: page content
- **Relationships**:
  - A screen may contain lists, forms, and action controls
  - A screen must honor the shared `ScreenFrame` padding rule

## Validation Rules

- Every screen-level content area must keep `padding: 1rem` on all sides.
- No route may override the shared rule with an edge-to-edge or larger spacing without explicit justification.
- The navigation shell must remain independent from the body padding rule.

## State Transitions

Not applicable. This is a presentational contract, not a domain lifecycle.
