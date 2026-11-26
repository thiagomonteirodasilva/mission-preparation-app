# Feature Specification: Confirmação de salvamento com biblioteca de toast

**Feature Branch**: `main` (ramo atual; nenhum ramo criado)

**Created**: 2026-11-26

**Status**: Draft

**Input**: Substituir a apresentação atual de confirmação de salvamento pela biblioteca solicitada, mantendo a mensagem e a cor de sucesso, ajustando a duração e a posição e incluindo um ícone de check quando suportado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Confirmar salvamentos (Priority: P1)

Como pessoa usuária, quero receber uma confirmação consistente ao criar ou editar uma unidade, cadastrar ou editar um jovem e adicionar um relato, para saber que minha alteração foi concluída.

**Why this priority**: A confirmação visível é o objetivo principal da mudança e reduz a dúvida sobre o resultado do salvamento.

**Independent Test**: Criar e editar uma unidade, cadastrar e editar um jovem e adicionar um relato; verificar a confirmação em cada fluxo, inclusive após os retornos automáticos de tela.

**Acceptance Scenarios**:

1. **Given** dados válidos para criar uma unidade ou cadastrar um jovem, **When** o salvamento termina e a aplicação retorna à tela anterior, **Then** a mensagem “Salvo com sucesso” aparece na parte inferior, em verde, por 3 segundos e desaparece automaticamente.
2. **Given** uma unidade existente válida em sua tela de edição, **When** a edição é salva e a tela retorna, **Then** a mesma confirmação aparece na parte inferior, em verde, por 3 segundos.
3. **Given** um perfil de jovem válido ou um relato válido, **When** a alteração é salva com sucesso, **Then** a mesma mensagem aparece na parte inferior, em verde, por 3 segundos e desaparece automaticamente.
4. **Given** uma tela longa em qualquer posição de rolagem, **When** um salvamento é concluído, **Then** a confirmação permanece visível junto à parte inferior da tela, sem depender da posição do conteúdo.
5. **Given** qualquer um dos cinco fluxos de salvamento bem-sucedido, **When** a confirmação aparece, **Then** ela mostra um ícone de check junto à mensagem, de forma visível e legível.

---

### User Story 2 - Preservar informações de erro (Priority: P2)

Como pessoa usuária, quero continuar recebendo informações claras quando não for possível carregar ou salvar dados, para não confundir uma falha com um salvamento concluído.

**Why this priority**: A substituição da notificação não deve eliminar mensagens existentes nem apresentar sucesso em caso de falha.

**Independent Test**: Tentar salvar dados inválidos e abrir um perfil indisponível; verificar a mensagem de erro e o comportamento de navegação existentes.

**Acceptance Scenarios**:

1. **Given** dados inválidos ou uma falha de salvamento, **When** a operação não é concluída, **Then** qualquer confirmação de sucesso anteriormente visível é ocultada, nenhuma nova confirmação de sucesso é exibida e a pessoa recebe uma indicação de erro.
2. **Given** um perfil de jovem que não pode ser carregado, **When** a falha é identificada, **Then** a mensagem “Não foi possível exibir as informações do jovem. Tente novamente” continua visível antes do retorno à tela anterior.
3. **Given** o formulário de unidade com nome vazio ou contendo apenas espaços, **When** a pessoa tenta salvar, **Then** o salvamento é recusado, a tela permanece aberta e uma mensagem informa que o nome é obrigatório.
4. **Given** uma confirmação de sucesso visível, **When** uma validação falha ou ocorre falha de salvamento ou carregamento, **Then** a confirmação anterior é ocultada e a indicação de erro correspondente é exibida.

### Edge Cases

- Se outro salvamento for concluído enquanto a confirmação estiver visível, a confirmação mais recente substitui a anterior e dispõe de novos 3 segundos de visibilidade, sem duplicação sobreposta.
- Se houver retorno automático à tela anterior após salvar, a confirmação deve continuar visível nessa tela pelo tempo previsto.
- Se a validação impedir o salvamento ou a operação falhar, qualquer confirmação anterior deve ser ocultada e não deve surgir uma nova confirmação de sucesso.
- Se o perfil não puder ser carregado, a mensagem de falha e o retorno automático existentes devem ser preservados; a mensagem de erro não deve ser substituída por uma confirmação de sucesso.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir exatamente “Salvo com sucesso” após a criação ou edição bem-sucedida de uma unidade, o cadastro ou edição de um jovem e a inclusão de um relato.
- **FR-002**: Cada confirmação de sucesso MUST aparecer na parte inferior visível da tela e desaparecer automaticamente após 3 segundos, salvo se for ocultada antes por uma validação inválida ou falha, conforme FR-006 e FR-010.
- **FR-003**: A confirmação MUST usar o mesmo verde de sucesso da notificação existente e manter a mensagem legível.
- **FR-004**: A confirmação MUST permanecer visível após o retorno automático à tela anterior e não depender da posição de rolagem do conteúdo, salvo se ocorrer erro que exija sua ocultação.
- **FR-005**: Um novo salvamento concluído durante uma confirmação existente MUST substituí-la e reiniciar o período de 3 segundos, sem exibir confirmações sobrepostas.
- **FR-006**: Entradas inválidas e falhas de salvamento MUST exibir uma indicação de erro, preservar mensagens existentes quando aplicáveis, ocultar qualquer confirmação de sucesso anterior e MUST NOT produzir uma nova confirmação de sucesso. Nome de unidade vazio ou contendo apenas espaços MUST ser rejeitado com mensagem de nome obrigatório, sem sair da tela.
- **FR-007**: A falha ao carregar o perfil MUST preservar a mensagem existente e o retorno automático à tela anterior, sem apresentar sucesso.
- **FR-008**: A mudança MUST abranger todos os pontos atuais que utilizam a notificação de salvamento, sem alterar as regras de validação, persistência ou navegação dos fluxos afetados.
- **FR-009**: Cada confirmação de sucesso MUST exibir um ícone de check visível junto à mensagem, sem prejudicar sua legibilidade.
- **FR-010**: Ao ocorrer falha de carregamento do perfil, o sistema MUST ocultar qualquer confirmação de sucesso anteriormente visível antes de apresentar a mensagem de erro.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Nos cinco fluxos cobertos — criação e edição de unidade, cadastro e edição de jovem e inclusão de relato — 100% das operações bem-sucedidas verificadas exibem a mensagem exata na parte inferior com o verde de sucesso existente.
- **SC-002**: Em cada fluxo verificado sem erro subsequente, a confirmação permanece visível por 3 segundos, com tolerância de 0,5 segundo, e desaparece sem intervenção da pessoa usuária.
- **SC-003**: Em 100% dos fluxos verificados com retorno automático ou rolagem e sem erro subsequente, a confirmação permanece visível na área inferior da tela pelo período previsto.
- **SC-004**: Em verificações manuais de dados inválidos, incluindo nome de unidade vazio, falha de salvamento e falha de carregamento de perfil, uma indicação de erro é visível, nenhuma nova confirmação de sucesso é exibida e qualquer confirmação anterior é ocultada.
- **SC-005**: Em verificações manuais de dois salvamentos consecutivos durante a exibição, há no máximo uma confirmação visível e a última dispõe de 3 segundos, com tolerância de 0,5 segundo.
- **SC-006**: Em 100% dos cinco fluxos de salvamento verificados, a confirmação apresenta um ícone de check visível e a mensagem permanece legível.

## Assumptions

- A solicitação determina a adoção da biblioteca `react-native-toast-message`; essa dependência é uma restrição explícita para o planejamento, não uma mudança no comportamento de negócio.
- A biblioteca permite um layout de confirmação personalizado; portanto, o ícone de check solicitado pode ser incluído sem uma nova dependência de ícones.
- O verde de referência é o da confirmação atual; usar a classe existente de cor quando isso for possível, ou uma representação equivalente quando não for.
- A duração de 3 segundos aplica-se à confirmação de sucesso sem erro subsequente; erros a ocultam antes. A mensagem de erro de carregamento mantém seu fluxo existente, inclusive o retorno automático após aproximadamente 2 segundos.
- A exibição explícita de erro para nome de unidade vazio acrescenta feedback, mas preserva a regra existente de não salvar nem navegar com nome vazio.
- A mudança inclui a edição de unidade, que não usava a confirmação anteriormente, pois a pessoa usuária identificou a ausência de feedback nesse fluxo. Não altera outras operações além das cinco listadas. A verificação será manual, conforme a constituição do projeto.