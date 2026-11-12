# Feature Specification: Gestão de Preparação Missionária

**Feature Branch**: `002-mission-preparation`

**Created**: 2026-09-08

**Status**: Draft

**Input**: User description: "Construa uma aplicação que me ajude a gerenciar jovens que estão em idade de se preparar para servir uma missão de tempo integral. Os jovens devem ter nome, idade, gênero (masculino ou feminino). Cada um deles pode ter um ou mais relatos de progresso, sendo que cada relato deve ter no máximo 1000 caracteres e precisa ter data. Esses relatos devem ser exibidos de forma descendente a partir da data. Cada jovem pertencerá a uma unidade, que conterá nome. A tela inicial deve conter essas unidades, exibidas em ordem alfabética, e ao clicar no nome delas, abrirá um collapse com os jovens cadastrados nela, e a exibição delas será por ordem alfabética. Haverá uma opção de cadastro de unidades, e ao lado de cada unidade cadastrada, adicionar um botão ao lado direito para adicionar jovem. Na tela de unidades, na lista de jovens, colocar a idade do jovem logo após o nome. Ao clicar no nome do jovem, se abrirá uma tela de edição de dados do jovem, na qual se poderá editar nome, idade, gênero. Também será possível adicionar novos relatos. Na tela de cadastro e edição de jovens, se o usuário tentar cadastrar um jovem menor que 16 anos, exibir a mensagem de erro: 'Não é permitido cadastrar jovem com idade menor que 16 anos'. Se o usuário tentar cadastrar um jovem com mais de 25 anos, exibir mensagem de erro: 'Não é permitido cadastrar jovem com idade maior que 25 anos'. Nessa tela, adicionar um botão de excluir jovem, que abrirá um confirm perguntando se tem certeza que deseja excluir esse jovem, que os dados serão perdidos e que a ação não poderá ser desfeita. Ao salvar as informações tanto no cadastro de jovens, quanto na edição, exibir uma mensagem de Salvo com sucesso. Para o cadastro de unidades, também exibir essa mensagem."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consultar unidades e jovens (Priority: P1)

Como responsável pelo acompanhamento, quero visualizar as unidades em ordem
alfabética e expandir cada uma para consultar os jovens cadastrados, para
encontrar rapidamente quem pertence a cada unidade.

**Why this priority**: A consulta organizada é a principal forma de acompanhar
os jovens e entrega valor mesmo antes de novos cadastros serem realizados.

**Independent Test**: Cadastrar duas unidades e jovens em ambas, abrir a tela
inicial e confirmar a ordenação das unidades e dos jovens dentro de cada
unidade.

**Acceptance Scenarios**:

1. **Given** existem unidades cadastradas, **When** o usuário acessa a tela
   inicial, **Then** as unidades são exibidas em ordem alfabética pelo nome.
2. **Given** uma unidade está fechada, **When** o usuário clica no nome dela,
   **Then** a unidade se expande e mostra os jovens em ordem alfabética.
3. **Given** uma unidade está expandida, **When** o usuário clica novamente no
   nome dela, **Then** a lista de jovens é recolhida sem alterar os dados.
4. **Given** uma unidade não possui jovens, **When** o usuário a expande,
   **Then** a tela informa claramente que não há jovens cadastrados nela.

---

### User Story 2 - Cadastrar unidade e jovem (Priority: P1)

Como responsável pelo acompanhamento, quero cadastrar unidades e jovens com
seus dados básicos, para manter a lista de jovens que podem se preparar para
uma missão de tempo integral.

**Why this priority**: Sem unidades e jovens, não existe base para o
acompanhamento dos preparativos.

**Independent Test**: Criar uma unidade, adicionar um jovem por meio do botão
da unidade e confirmar que ambos aparecem na tela inicial após o salvamento.

**Acceptance Scenarios**:

1. **Given** o usuário está na tela inicial, **When** informa um nome de unidade
   válido e salva, **Then** a unidade aparece na lista em ordem alfabética e a
    mensagem "Salvo com sucesso" é exibida; ao retornar à tela inicial, a lista
    reflete a unidade salva sem exigir que o usuário reabra a tela.
2. **Given** uma unidade está listada, **When** o usuário aciona o botão de
   adicionar jovem ao lado dela, **Then** o cadastro de jovem é aberto já
   associado àquela unidade.
3. **Given** o cadastro de jovem está aberto, **When** o usuário informa nome,
   idade e gênero válidos e salva, **Then** o jovem aparece na unidade correta,
   em ordem alfabética, com a idade exibida logo após o nome, e a mensagem
    "Salvo com sucesso" é exibida; ao retornar à tela inicial, a lista reflete o
    jovem salvo sem exigir que o usuário reabra a tela.
4. **Given** o cadastro contém campo obrigatório vazio ou valor inválido,
   **When** o usuário tenta salvar, **Then** o sistema informa o campo que
   precisa ser corrigido e não cria o registro.
5. **Given** o usuário tenta salvar um jovem com idade inferior a 16 anos,
   **When** o cadastro ou a edição é submetido, **Then** o sistema exibe a
   mensagem "Não é permitido cadastrar jovem com idade menor que 16 anos" e
   não salva o registro.
6. **Given** o usuário tenta salvar um jovem com idade superior a 25 anos,
   **When** o cadastro ou a edição é submetido, **Then** o sistema exibe a
   mensagem "Não é permitido cadastrar jovem com idade maior que 25 anos" e
   não salva o registro.

---

### User Story 3 - Atualizar acompanhamento e remover jovem (Priority: P2)

Como responsável pelo acompanhamento, quero editar os dados de um jovem,
registrar relatos datados e remover um jovem quando necessário, para manter
as informações atuais e acompanhar a evolução ao longo do tempo.

**Why this priority**: O acompanhamento contínuo transforma um cadastro estático
em um registro útil para orientar a preparação individual.

**Independent Test**: Abrir um jovem cadastrado, alterar seus dados, incluir
dois relatos com datas diferentes, salvar, verificar a ordenação dos relatos e
remover o jovem após confirmar o aviso.

**Acceptance Scenarios**:

1. **Given** um jovem está listado, **When** o usuário clica no nome dele,
   **Then** a tela de edição apresenta nome, idade, gênero e os relatos atuais.
2. **Given** a edição está aberta, **When** o usuário altera nome, idade ou
   gênero e salva, **Then** os dados atualizados são exibidos na unidade correta
    e a mensagem "Salvo com sucesso" é exibida; ao retornar à tela inicial, a
    lista reflete os dados atualizados sem exigir que o usuário reabra a tela.
3. **Given** o usuário está editando um jovem, **When** informa o texto de um
    relato com até 1000 caracteres e salva, **Then** o relato é associado ao
    jovem com a data atribuída automaticamente no momento do salvamento.
4. **Given** um jovem possui vários relatos, **When** a tela de edição é
   exibida, **Then** os relatos aparecem em ordem decrescente de data, do mais
   recente ao mais antigo.
5. **Given** o relato excede 1000 caracteres, **When** o usuário tenta
    adicioná-lo, **Then** o sistema informa o limite permitido e não salva o
    relato.
6. **Given** o usuário aciona excluir jovem, **When** o aviso de confirmação é
   exibido, **Then** ele informa que os dados serão perdidos e que a ação não
   poderá ser desfeita.
7. **Given** o aviso de exclusão está aberto, **When** o usuário cancela,
   **Then** o jovem e todos os seus relatos permanecem intactos.
8. **Given** o aviso de exclusão está aberto, **When** o usuário confirma,
   **Then** o jovem e seus relatos são removidos e ele deixa de aparecer na
   unidade.

### Edge Cases

- Nomes de unidades e jovens devem ser considerados sem espaços extras nas
  extremidades e não podem ser vazios.
- A idade deve ser um número inteiro não negativo; valores fracionários,
  negativos e não numéricos devem ser rejeitados. Idades fora do intervalo de
  16 a 25 anos devem ser rejeitadas com a mensagem específica do caso.
- Nomes iguais devem continuar sendo exibidos; a ordenação deve usar o nome e,
  em caso de empate, manter uma ordem estável sem substituir registros.
- Relatos com a mesma data devem ser exibidos juntos em uma ordem estável.
- Uma unidade excluída não faz parte desta versão; a unidade permanece disponível
  enquanto houver jovens associados a ela.
- Cancelar qualquer edição ou confirmação de exclusão não deve alterar dados já
  salvos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir cadastrar uma unidade informando seu nome.
- **FR-002**: O sistema MUST rejeitar o cadastro de unidade sem nome após remover
  espaços nas extremidades.
- **FR-003**: O sistema MUST exibir as unidades cadastradas em ordem alfabética
  pelo nome na tela inicial.
- **FR-004**: O sistema MUST permitir expandir e recolher cada unidade para
  mostrar ou ocultar os jovens.
- **FR-005**: O sistema MUST oferecer, ao lado de cada unidade, uma ação para
  iniciar o cadastro de um jovem vinculado àquela unidade.
- **FR-006**: O sistema MUST permitir cadastrar um jovem com nome, idade e
  gênero.
- **FR-007**: O sistema MUST aceitar somente os gêneros "masculino" e
  "feminino".
- **FR-008**: O sistema MUST rejeitar jovem sem nome, com idade não inteira ou
  com idade negativa.
- **FR-009**: O sistema MUST exibir os jovens de cada unidade em ordem
  alfabética pelo nome.
- **FR-009A**: Na tela de unidades, a lista de jovens MUST mostrar a idade do
  jovem imediatamente após o nome.
- **FR-009B**: O sistema MUST impedir o cadastro ou a edição de um jovem com
  idade menor que 16 anos e exibir a mensagem "Não é permitido cadastrar jovem
  com idade menor que 16 anos".
- **FR-009C**: O sistema MUST impedir o cadastro ou a edição de um jovem com
  idade maior que 25 anos e exibir a mensagem "Não é permitido cadastrar jovem
  com idade maior que 25 anos".
- **FR-010**: O sistema MUST permitir abrir a edição de um jovem ao clicar no
  nome do jovem.
- **FR-011**: O sistema MUST permitir editar nome, idade e gênero de um jovem.
- **FR-012**: O sistema MUST permitir adicionar um ou mais relatos de progresso
  a um jovem.
- **FR-013**: A data de cada relato MUST ser atribuída automaticamente com base
  na data do dispositivo no momento do salvamento e MUST ser exibida no formato
  brasileiro DD/MM/YYYY.
- **FR-014**: O sistema MUST exibir os relatos de um jovem em ordem
  decrescente de data.
- **FR-015**: O sistema MUST impedir o salvamento de relatos com mais de 1000
  caracteres.
- **FR-016**: O sistema MUST exibir "Salvo com sucesso" após salvar uma unidade,
  um novo jovem ou alterações de jovem, desde que a operação seja concluída.
- **FR-017**: O sistema MUST oferecer uma ação de excluir jovem na tela de
  edição.
- **FR-018**: Antes da exclusão, o sistema MUST pedir confirmação e informar que
  os dados serão perdidos e que a ação não poderá ser desfeita.
- **FR-019**: O sistema MUST excluir o jovem e seus relatos somente após a
  confirmação explícita.
- **FR-020**: O sistema MUST preservar os dados quando a exclusão for cancelada.
- **FR-021**: O sistema MUST manter cada jovem associado a exatamente uma
  unidade.
- **FR-022**: O sistema MUST persistir unidades, jovens e relatos entre acessos
  ao sistema.
- **FR-023**: Após salvar uma unidade ou cadastrar/editar um jovem e retornar à
  tela inicial, o sistema MUST atualizar a lista a partir dos dados persistidos,
  sem exigir que o usuário reabra a tela.

### Key Entities *(include if feature involves data)*

- **Unidade**: Grupo ao qual os jovens pertencem; possui um nome e pode conter
  zero ou mais jovens.
- **Jovem**: Indivíduo em preparação para uma missão de tempo integral; possui
  nome, idade, gênero e pertence a uma única unidade.
- **Relato de progresso**: Registro textual associado a um jovem; possui texto
  com até 1000 caracteres e uma data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em uma sessão de uso, o responsável consegue localizar um jovem
  específico a partir da tela inicial em até 30 segundos após expandir sua
  unidade.
- **SC-002**: O responsável consegue cadastrar uma unidade e um jovem completo
  em até 2 minutos, sem precisar repetir o preenchimento por erro de validação.
- **SC-003**: 100% dos relatos exibidos para um jovem aparecem do mais recente
  ao mais antigo segundo suas datas.
- **SC-004**: 100% dos relatos com mais de 1000 caracteres são rejeitados antes
  de serem salvos.
- **SC-005**: 100% das operações concluídas de cadastro ou edição exibem a
  mensagem "Salvo com sucesso".
- **SC-006**: Em uma revisão manual com pelo menos 20 unidades e 100 jovens,
  todas as unidades e jovens permanecem visualmente ordenadas e localizáveis.
- **SC-007**: Nenhum jovem ou relato é removido quando o usuário cancela a
  confirmação de exclusão.
- **SC-008**: 100% das tentativas de cadastro ou edição de jovem com idade fora
  do intervalo permitido exibem a mensagem correta e bloqueiam a gravação do
  registro.
- **SC-009**: Em 100% dos fluxos concluídos de cadastro de unidade, cadastro de
  jovem e edição de jovem, a tela inicial apresenta os dados salvos ao retornar
  do formulário, sem reiniciar a aplicação nem reabrir a tela.

## Assumptions

- O usuário da aplicação é um responsável autorizado pelo acompanhamento e não
  há, nesta versão, perfis ou permissões diferentes.
- A unidade é criada separadamente do jovem e não pode ser removida nesta
  versão; o escopo concentra-se em cadastro, consulta, edição e exclusão de
  jovens.
- A data do relato representa o dia do progresso e corresponde à data do
  dispositivo no momento do salvamento.
- A mensagem de sucesso pode desaparecer após um curto período, desde que seja
  claramente visível após a conclusão da operação.
- A aplicação deve funcionar em telas de computador e dispositivos móveis sem
  alterar as regras de ordenação ou validação.
- A verificação desta funcionalidade será manual, conforme a constituição do
  projeto, e não serão criados testes automatizados.