# Feature Specification: Espaçamento Consistente nas Telas

**Feature Branch**: `003-body-padding`

**Created**: 2026-09-29

**Status**: Draft

**Input**: User description: "toda tela deve ter no body um padding de 1rem"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Usar telas com espaçamento consistente (Priority: P1)

Como usuário da aplicação, quero que o conteúdo principal de todas as telas tenha
espaçamento uniforme de 1rem em relação às bordas, para que as informações e
controles não fiquem encostados nos limites da tela e a navegação mantenha uma
aparência consistente.

**Why this priority**: O espaçamento uniforme melhora a leitura e a interação em
toda a aplicação, independentemente da tela acessada.

**Independent Test**: Acessar cada tela da aplicação — inicial, unidades,
detalhes da unidade e cadastro/edição de jovem — e verificar que a área de
conteúdo apresenta 1rem de espaço em todos os lados.

**Acceptance Scenarios**:

1. **Given** o usuário acessa qualquer tela da aplicação, **When** o conteúdo é
   exibido, **Then** a área principal mantém padding de 1rem em relação às quatro
   bordas disponíveis.
2. **Given** o usuário navega entre telas existentes, **When** cada nova tela é
   aberta, **Then** o conteúdo mantém o mesmo espaçamento de 1rem.
3. **Given** uma tela contém conteúdo longo ou uma lista rolável, **When** o
   usuário percorre o conteúdo, **Then** o espaçamento permanece consistente e
   não encobre nem corta informações ou controles.

### Edge Cases

- Telas com pouco conteúdo ou sem registros devem manter o mesmo espaçamento.
- Conteúdo que excede a altura disponível deve continuar acessível por rolagem,
  sem perder o espaço de 1rem nas bordas laterais.
- O espaçamento do corpo não deve ser somado de forma que produza margens
  externas inconsistentes entre telas.
- O espaço reservado para barras de navegação ou áreas seguras do dispositivo
  não altera a regra de 1rem aplicada à área principal de conteúdo.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST aplicar padding de 1rem nos quatro lados da área
  principal de conteúdo de todas as telas existentes.
- **FR-002**: O sistema MUST manter o padding de 1rem ao navegar entre telas,
  incluindo telas iniciais, listas, detalhes, cadastro e edição.
- **FR-003**: O sistema MUST preservar a visibilidade e a acessibilidade de todo
  o conteúdo e dos controles quando o espaço disponível for limitado ou o
  conteúdo exigir rolagem.
- **FR-004**: Elementos de navegação persistentes e áreas seguras do dispositivo
  não substituem nem alteram o padding definido para o corpo principal da tela.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das telas existentes apresentam padding de 1rem em cada lado
  da área principal de conteúdo.
- **SC-002**: Em uma verificação manual de todas as telas e dos principais
  estados vazios ou com conteúdo longo, nenhuma informação ou controle fica
  cortado, encoberto ou colado à borda por falta do espaçamento especificado.
- **SC-003**: Ao comparar duas telas consecutivas durante a navegação, ambas
  mantêm o mesmo espaçamento de 1rem na área principal.

## Assumptions

- “Body” significa a área principal de conteúdo de cada tela, não as barras de
  navegação persistentes nem as áreas seguras próprias do dispositivo.
- A regra aplica-se às telas existentes da aplicação e deve ser mantida em
  novas telas acrescentadas posteriormente.
- O valor de 1rem deve ser interpretado conforme a unidade de espaçamento já
  adotada pela interface, sem alterar o tamanho ou a escala do conteúdo.
- A conformidade será verificada manualmente, conforme a constituição do
  projeto; não serão criados testes automatizados.
