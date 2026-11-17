# Feature Specification: Button Icons

**Feature Branch**: `010-button-icons`

**Created**: 2026-11-17

**Status**: Draft

**Input**: User description: "Verificar se a biblioteca vector-icons está devidamente instalada e adicionar ícones em alguns botões: ícone de voltar no cabeçalho, ícone de grupo no botão de unidade da tela inicial, ícone de salvar nos botões Salvar, ícone de lista no botão Ações das unidades e ícone de lixeira no botão Excluir jovem, com ajustes de cor."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ícone de voltar no cabeçalho (Priority: P1)

Nas telas que exibem o botão de voltar na barra superior, o usuário vê um ícone de seta para trás no lugar do texto "‹ Voltar".

**Why this priority**: A navegação está presente em quase todas as telas e o ícone padroniza a barra superior.

**Independent Test**: Abrir qualquer tela secundária e verificar que a barra superior mostra a seta de voltar, e que tocá-la retorna à tela anterior.

**Acceptance Scenarios**:

1. **Given** uma tela secundária aberta, **When** o usuário observa a barra superior, **Then** vê o ícone de seta para trás, sem o texto "‹ Voltar".
2. **Given** uma tela secundária aberta, **When** o usuário toca no ícone, **Then** retorna à tela anterior (ou à tela inicial se não houver histórico).
3. **Given** a tela inicial, **When** o usuário observa a barra superior, **Then** nenhum botão de voltar é exibido.

---

### User Story 2 - Ícones e cor nos botões de ação principal (Priority: P2)

O usuário identifica rapidamente as ações principais por meio de ícones ao lado do texto e por uma cor consistente com a barra superior:

- Botão "+ unidade" da tela inicial: ícone de grupo.
- Todo botão "Salvar": ícone de salvar.
- Botão "Ações" de cada unidade: ícone de lista.

Todos esses botões usam a mesma cor de fundo da barra superior.

**Why this priority**: Melhora a identificação visual e a consistência, sem alterar o comportamento.

**Independent Test**: Abrir a tela inicial, as telas com botão Salvar e a lista de unidades, e verificar ícone e cor de cada botão.

**Acceptance Scenarios**:

1. **Given** a tela inicial, **When** o usuário vê o botão "+ unidade", **Then** o ícone de grupo aparece ao lado do texto e o fundo tem a cor da barra superior.
2. **Given** qualquer tela com botão "Salvar", **When** o botão é exibido, **Then** o ícone de salvar aparece ao lado do texto e o fundo tem a cor da barra superior.
3. **Given** uma unidade na lista, **When** o botão "Ações" é exibido, **Then** o ícone de lista aparece ao lado do texto e o fundo tem a cor da barra superior.
4. **Given** qualquer um desses botões, **When** o usuário o toca, **Then** a ação existente continua funcionando como antes.

---

### User Story 3 - Botão Excluir jovem em destaque (Priority: P3)

Na tela Detalhes do jovem, o botão "Excluir jovem" exibe um ícone de lixeira ao lado do texto, com fundo vermelho e texto branco, sinalizando uma ação destrutiva.

**Why this priority**: Reforça visualmente o risco da ação.

**Independent Test**: Abrir Detalhes do jovem e verificar aparência e comportamento do botão.

**Acceptance Scenarios**:

1. **Given** a tela Detalhes do jovem, **When** o botão "Excluir jovem" é exibido, **Then** mostra ícone de lixeira ao lado do texto, fundo vermelho e texto branco.
2. **Given** o botão exibido, **When** o usuário o toca, **Then** a confirmação de exclusão continua sendo apresentada como antes.

---

### Edge Cases

- Botão "Salvar" em estado de carregamento ("Salvando..."): o ícone permanece ao lado do texto e o botão continua legível.
- Leitores de tela: botões que perderem o texto (voltar) mantêm um rótulo acessível.
- Se os ícones não puderem ser carregados, os botões devem continuar exibindo texto e funcionando.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A biblioteca de ícones MUST estar disponível e funcional no aplicativo; caso não esteja declarada como dependência do projeto, MUST ser declarada.
- **FR-002**: O botão de voltar da barra superior MUST exibir o ícone de seta para trás em vez do texto "‹ Voltar", mantendo rótulo acessível "Voltar" e o comportamento atual.
- **FR-003**: O botão "+ unidade" da tela inicial MUST exibir o ícone de grupo ao lado do texto e ter a cor de fundo da barra superior.
- **FR-004**: Todo botão "Salvar" em qualquer tela MUST exibir o ícone de salvar ao lado do texto e ter a cor de fundo da barra superior.
- **FR-005**: O botão "Ações" de cada unidade MUST exibir o ícone de lista ao lado do texto e ter a cor de fundo da barra superior.
- **FR-006**: O botão "Excluir jovem" MUST exibir o ícone de lixeira ao lado do texto, com fundo vermelho e texto branco.
- **FR-007**: A mudança MUST NOT alterar o comportamento funcional de nenhum botão.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das telas secundárias exibem o ícone de voltar e nenhuma exibe o texto "‹ Voltar".
- **SC-002**: 100% dos botões "Salvar", "+ unidade" e "Ações" exibem o ícone indicado e a mesma cor da barra superior.
- **SC-003**: O botão "Excluir jovem" é identificado como ação destrutiva (vermelho, texto branco, lixeira) em 100% das visualizações.
- **SC-004**: Todos os fluxos que usam esses botões continuam concluindo normalmente, sem regressões.

## Assumptions

- "Mesma cor da barra superior" refere-se à cor de fundo atual da barra superior do aplicativo.
- Os nomes de ícones citados (arrow-back, group, save, list, lixeira/delete) pertencem ao conjunto Material Icons.
- Botões "Salvar" existentes: tela de nova unidade, edição de unidade, novo jovem e detalhes do jovem.
- Textos visíveis ao usuário permanecem em português.
- A biblioteca de ícones já está presente no ambiente via Expo; a verificação de declaração explícita faz parte do planejamento.
