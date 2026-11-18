# Feature Specification: Botão Nova Unidade em Largura Total

**Feature Branch**: `012-nova-unidade-button`

**Created**: 2026-11-18

**Status**: Ready for planning

**Input**: User description: "Na tela inicial, ajustar o botão de unidade para ocupar toda a largura disponível e exibir o nome ‘Nova Unidade’."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Encontrar e iniciar a criação de unidade (Priority: P1)

Na tela inicial, a pessoa usuária identifica facilmente a ação de criar uma unidade por meio de um botão que ocupa toda a largura disponível na área de conteúdo e apresenta o texto “Nova Unidade”.

**Why this priority**: O botão é o ponto de entrada para criar unidades; um rótulo claro e uma área de ação mais fácil de localizar melhoram a descoberta sem mudar o fluxo existente.

**Independent Test**: Abrir a tela inicial, verificar o texto e a largura do botão, e acioná-lo para confirmar que a criação de unidade continua acessível.

**Acceptance Scenarios**:

1. **Given** a tela inicial está aberta, **When** a pessoa usuária visualiza a ação de criar unidade, **Then** o botão exibe exatamente “Nova Unidade” e ocupa toda a largura disponível na área de conteúdo.
2. **Given** a tela inicial está aberta, **When** a pessoa usuária aciona “Nova Unidade”, **Then** a tela de unidades é aberta e o fluxo existente de criação permanece acessível.
3. **Given** a tela inicial é exibida em uma largura de 320 pontos lógicos, **When** o botão aparece, **Then** o rótulo permanece legível e o botão fica dentro da área de conteúdo, sem corte ou rolagem horizontal causada pelo botão.

### Edge Cases

- A tela inicial não possui unidades cadastradas; “Nova Unidade” continua visível e acionável.
- Em uma largura de 320 pontos lógicos, o rótulo permanece legível e o botão não ultrapassa os limites da área de conteúdo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A tela inicial MUST exibir o botão de criação de unidade com o texto exato “Nova Unidade”.
- **FR-002**: O botão MUST ocupar toda a largura disponível dentro da área de conteúdo da tela inicial.
- **FR-003**: Acionar o botão MUST abrir a tela de unidades, onde o fluxo existente de criação de unidade permanece acessível.
- **FR-004**: Em uma largura de 320 pontos lógicos, o botão MUST permanecer dentro da área de conteúdo, com o rótulo legível e sem corte ou rolagem horizontal causada pelo botão.
- **FR-005**: A mudança MUST ser verificada manualmente na tela inicial, incluindo a apresentação e a ação do botão.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em todas as verificações da tela inicial, o botão apresenta o texto exato “Nova Unidade” e alcança as bordas internas da área de conteúdo sem ultrapassá-las.
- **SC-002**: Em uma largura de 320 pontos lógicos, o rótulo permanece legível e o botão não causa corte nem rolagem horizontal.
- **SC-003**: Em todas as verificações, acionar o botão abre a tela de unidades e deixa acessível o fluxo existente de criação.

## Assumptions

- “Largura total” significa a largura interna disponível na área de conteúdo da tela inicial, respeitando o espaçamento aplicado ao restante do conteúdo; não significa ocupar a largura física total da tela até as bordas.
- Para tornar “tela estreita” verificável, a largura de referência é 320 pontos lógicos.
- O botão mantém a navegação atual para a tela de unidades e deixa acessível o fluxo de criação existente; não há mudanças no fluxo posterior, nos dados ou nas demais telas.
- A tela inicial continua mostrando a ação mesmo quando ainda não existem unidades cadastradas.
