# Feature Specification: Preservar a exibição de Editar Unidade

**Feature Branch**: `main` (nenhuma nova branch criada)

**Created**: 2026-11-26

**Status**: Draft

**Input**: Refatorar a exibição de Editar Unidade; analisar a possibilidade de remover o layout específico de `[unitId]`, considerando a declaração da tela no layout principal; revisar a funcionalidade para garantir que permaneça como originalmente.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Abrir e navegar pela edição (Priority: P1)

Uma pessoa acessa a edição a partir das ações de uma unidade e encontra a mesma tela, com seus dados e navegação habituais, sem cabeçalhos duplicados ou alterações visuais indesejadas.

**Why this priority**: A tela precisa continuar acessível e reconhecível após a revisão de sua exibição.

**Independent Test**: Na tela inicial, escolher Editar Unidade em uma unidade existente, conferir o formulário e a barra superior e retornar sem salvar.

**Acceptance Scenarios**:

1. **Given** uma unidade existente na tela inicial, **When** a pessoa escolhe Editar Unidade, **Then** a tela de edição abre com o nome da unidade selecionada preenchido.
2. **Given** a tela de edição aberta, **When** a pessoa observa a navegação, **Then** vê uma única barra superior azul com o título "Editar Unidade" e o botão Voltar.
3. **Given** uma alteração não salva no nome, **When** a pessoa usa Voltar, **Then** retorna à tela anterior e o nome original permanece inalterado.

---

### User Story 2 - Salvar o nome da unidade (Priority: P1)

Uma pessoa altera o nome de uma unidade e recebe a mesma confirmação e retorno à lista, sem afetar os jovens vinculados.

**Why this priority**: A preservação da edição e dos dados associados é essencial para evitar regressões funcionais.

**Independent Test**: Abrir uma unidade com jovens, alterar seu nome, salvar e verificar a lista e os vínculos após retornar.

**Acceptance Scenarios**:

1. **Given** uma unidade carregada, **When** a pessoa informa um nome válido e salva, **Then** retorna à tela anterior, recebe a confirmação "Salvo com sucesso" e vê o nome atualizado.
2. **Given** uma unidade com jovens vinculados, **When** seu nome é alterado com sucesso, **Then** os mesmos jovens continuam vinculados à unidade.
3. **Given** um nome válido com espaços no início ou no fim, **When** a pessoa salva, **Then** o nome é armazenado sem esses espaços externos.

---

### User Story 3 - Receber feedback em situações inválidas ou de falha (Priority: P2)

Uma pessoa compreende por que não pode editar ou salvar uma unidade e não recebe uma confirmação de sucesso indevida.

**Why this priority**: A revisão não pode ocultar problemas nem levar à perda silenciosa de alterações.

**Independent Test**: Tentar salvar um nome vazio e verificar o comportamento; verificar também os estados de unidade indisponível e falha de salvamento quando reproduzíveis.

**Acceptance Scenarios**:

1. **Given** uma unidade carregada, **When** a pessoa tenta salvar um nome vazio ou composto apenas por espaços, **Then** vê "Nome da unidade é obrigatório.", permanece na tela e nenhum nome é alterado.
2. **Given** uma unidade não informada, inexistente ou que não pode ser carregada, **When** a tela de edição é aberta, **Then** uma mensagem informa o problema e a edição e o salvamento ficam indisponíveis.
3. **Given** um nome válido digitado, **When** ocorre uma falha ao salvar, **Then** a pessoa permanece na tela, vê uma mensagem de erro, conserva o texto digitado e não recebe confirmação de sucesso.

### Edge Cases

- Enquanto a unidade carrega ou uma gravação está em andamento, a edição e o salvamento ficam indisponíveis para evitar interações prematuras ou repetidas.
- Se a unidade deixar de existir antes do salvamento, a operação informa a falha e não exibe confirmação de sucesso.
- Se não houver tela anterior no histórico, Voltar conduz à tela inicial.
- Se um aviso de sucesso anterior estiver visível quando ocorre um erro, ele deixa de ser exibido para não contradizer o erro atual.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A pessoa MUST conseguir abrir Editar Unidade pelas ações da unidade selecionada, mantendo a associação correta entre a seleção e o formulário.
- **FR-002**: A tela MUST preservar o título "Editar Unidade", uma única barra superior azul, o botão Voltar e a apresentação existente do campo e da ação Salvar.
- **FR-003**: Ao abrir uma unidade existente, o formulário MUST carregar seu nome atual; durante o carregamento, MUST apresentar indicação de carregamento e impedir edição e salvamento.
- **FR-004**: Voltar sem salvar MUST retornar à tela anterior sem gravar alterações; na ausência de tela anterior, MUST conduzir à tela inicial.
- **FR-005**: Salvar um nome válido MUST remover espaços externos, atualizar somente o nome da unidade selecionada e preservar seus jovens vinculados.
- **FR-006**: Após salvar com sucesso, o aplicativo MUST retornar à tela anterior, exibir "Salvo com sucesso" e apresentar o nome atualizado na lista.
- **FR-007**: Um nome vazio ou formado somente por espaços MUST ser rejeitado com "Nome da unidade é obrigatório.", sem salvar nem sair da tela.
- **FR-008**: Quando a unidade não for informada, não existir ou não puder ser carregada, o aplicativo MUST informar o problema e impedir edição e salvamento.
- **FR-009**: Quando o salvamento falhar, o aplicativo MUST informar o erro, manter a tela e o texto digitado e não apresentar confirmação de sucesso; avisos anteriores de sucesso MUST ser ocultados ao mostrar o erro.
- **FR-010**: Enquanto um salvamento estiver em andamento, o aplicativo MUST impedir edição e novo salvamento e indicar que está salvando.
- **FR-011**: A revisão MUST avaliar se a estrutura específica da edição pode ser eliminada sem alterar a navegação ou os comportamentos descritos; caso não possa, MUST preservar essa estrutura e registrar o motivo.
- **FR-012**: A revisão MUST verificar manualmente os fluxos de abertura, retorno, edição válida, validação e falhas relevantes, registrando resultados e limitações de reprodução.

### Key Entities *(include if feature involves data)*

- **Unidade**: agrupamento identificado de forma estável, com nome editável e jovens associados.
- **Jovem**: pessoa vinculada a uma unidade; seus dados e vínculo devem permanecer inalterados ao renomeá-la.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em todas as verificações manuais de abertura para pelo menos duas unidades distintas, o formulário mostra o nome da unidade selecionada e exatamente uma barra superior com título e retorno corretos.
- **SC-002**: Em todas as verificações manuais de salvamento válido e retorno sem salvar, respectivamente, o nome atualizado ou original aparece corretamente na lista e os jovens vinculados permanecem os mesmos.
- **SC-003**: Em todas as verificações manuais de nome vazio e somente espaços, o salvamento é bloqueado e a mensagem esperada é exibida sem confirmação de sucesso.
- **SC-004**: Em todas as situações de falha reproduzíveis de carregamento e salvamento, o problema é comunicado sem falsa confirmação; situações não reproduzíveis são registradas como limitações, não como aprovadas.
- **SC-005**: A revisão registra uma decisão sobre a eliminação da estrutura específica, com justificativa e evidência manual de preservação dos fluxos afetados antes de declarar a mudança concluída.

## Assumptions

- O comportamento atualmente observado na tela de edição é a referência de comparação; não se pretende mudar textos, aparência, regras ou fluxo de negócio.
- A decisão sobre remover a estrutura específica é condicional à preservação integral do comportamento; a simples presença de uma declaração na navegação principal não comprova que sua remoção é segura.
- A funcionalidade depende de unidades existentes e do armazenamento local da aplicação; criação e remoção de unidades e edição de jovens estão fora do escopo, exceto pela verificação de que os vínculos são preservados.
- A verificação será manual, conforme a constituição do projeto; a execução no Android e suas eventuais limitações serão registradas durante a implementação.