---
description: "Tarefas para ícones de jovens e contraste da barra de status"
---

# Tasks: Ícones de Jovens e Contraste da Barra de Status

**Input**: Artefatos de `specs/013-young-icons-status-bar/`.

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md` e `quickstart.md`.

**Verificação**: Manual, conforme a constituição; não criar testes automatizados. As tarefas de validação só são concluídas quando executadas; registrar bloqueios e resultados reais, sem declarar verificação Android concluída se não houver dispositivo ou emulador.

**Organização**: Tarefas agrupadas por história, com caminhos relativos à raiz do projeto. `[P]` identifica trabalho sem dependência de outra tarefa incompleta e em arquivo diferente; tarefas sem marcador são sequenciais dentro de sua história.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirmar o ambiente existente sem introduzir dependências ou estrutura desnecessárias.

- [X] T001 Conferir em `package.json` e `specs/013-young-icons-status-bar/research.md` as dependências existentes, os glifos `face`, `face-3` e `account-circle` e a disponibilidade do ambiente Expo; instalar as dependências declaradas somente se necessário.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Identificar pré-requisitos comuns às histórias.

Não há tarefas fundamentais adicionais: o projeto, a navegação, os modelos e as dependências já existem. Não criar migração, infraestrutura ou componentes compartilhados para esta fase.

**Checkpoint**: Após T001, US1 e US2 podem começar independentemente.

## Phase 3: User Story 1 - Identificar jovens na lista (Priority: P1) 🎯 MVP

**Goal**: Mostrar um rosto correspondente ao sexo registrado, ou um ícone neutro para dados inesperados, preservando o conteúdo e a navegação da lista.

**Independent Test**: Expandir uma unidade com jovens dos dois sexos, comparar rostos com os dados, abrir os perfis e verificar a atualização após editar o sexo; verificar unidade vazia, fallback e largura de 320 pontos lógicos.

### Implementation and manual validation

- [X] T002 [P] [US1] Em `components/UnitAccordion.tsx`, renderizar `MaterialIcons` com `face` para `male`, `face-3` para `female` e `account-circle` para valor ausente ou inesperado; dispor ícone e texto em linha flexível com quebra de nome, mantendo nome, idade, ordenação e link para o perfil correto.
- [X] T003 [US1] Executar `npx expo start --android` conforme `specs/013-young-icons-status-bar/quickstart.md`, confirmar o lançamento Android quando disponível e verificar visualmente em `components/UnitAccordion.tsx` os rostos distintos, nome, idade e abertura do perfil correspondente para ambos os sexos; registrar indisponibilidade sem declarar o lançamento verificado.
- [X] T004 [US1] Alterar e salvar o sexo em `app/young/[youngId].tsx`, voltar à lista e verificar em `app/index.tsx` e `components/UnitAccordion.tsx` a recarga por foco e o ícone atualizado, preservando expansão e navegação.
- [ ] T005 [US1] Verificar em `components/UnitAccordion.tsx` a mensagem de unidade vazia e o fallback neutro para sexo inesperado, usando somente instalação e registro descartáveis conforme `specs/013-young-icons-status-bar/quickstart.md`; verificar também sexo ausente com dados temporários de desenvolvimento sem alterar o banco, restaurando ou descartando os dados após a inspeção.
- [X] T006 [US1] Em dispositivo ou emulador com 320 pontos lógicos de largura, verificar em `components/UnitAccordion.tsx` que nome longo, idade e ícone são legíveis, podem quebrar em linhas e não se sobrepõem nem são cortados pelo ícone.

**Checkpoint**: US1 está funcional e verificável independentemente quando T002–T006 forem concluídas; se uma verificação não puder ser executada, manter a tarefa pendente e registrar o motivo.

## Phase 4: User Story 2 - Ler a barra de status com contraste (Priority: P2)

**Goal**: Exibir indicadores brancos na barra de status com fundo suficientemente contrastante em todas as telas, quando a plataforma permitir.

**Independent Test**: Iniciar o aplicativo e navegar entre todas as telas disponíveis, conferindo indicadores brancos, fundo efetivo com contraste mínimo 3:1 e navegação preservada.

### Implementation and manual validation

- [X] T007 [P] [US2] Em `app/_layout.tsx`, configurar o `StatusBar` existente de `expo-status-bar` com `style="light"` para as telas e garantir superfície contrastante sob a barra usando `bg-sky-700` e, quando apropriado, `backgroundColor` no Android; considerar transparência, área segura e edge-to-edge sem presumir que o cabeçalho cubra a barra, preservando títulos e botões de retorno.
- [ ] T008 [US2] Iniciar ou reutilizar a execução Android conforme `specs/013-young-icons-status-bar/quickstart.md` e verificar em `app/_layout.tsx`, `app/index.tsx`, `app/units/index.tsx`, `app/units/[unitId]/edit.tsx`, `app/young/new.tsx`, `app/young/[youngId].tsx` e `app/+not-found.tsx` a barra branca e o contraste mínimo 3:1 com o fundo efetivo, inclusive após navegação de ida e volta.
- [X] T009 [US2] Verificar em `app/_layout.tsx` os títulos, `bg-sky-700`, áreas seguras e retorno das telas; quando disponíveis, repetir em iOS e em Android com edge-to-edge e sem ele, registrando limitações do sistema e preservando sua aparência quando não houver controle.

**Checkpoint**: US2 é verificável sem US1; quando não houver plataforma necessária, registrar a limitação e manter pendente a verificação correspondente.

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Conferir integração, regressões e evidências sem acrescentar testes automatizados.

- [X] T010 Executar `npm run typecheck` conforme `package.json`, corrigir eventuais erros introduzidos pela implementação em `components/UnitAccordion.tsx` e `app/_layout.tsx` e registrar o resultado.
- [X] T011 Revisar `components/UnitAccordion.tsx` e `app/_layout.tsx` quanto à simplicidade, nomes técnicos em inglês, ausência de dependências adicionais, preservação de dados e navegação e conformidade com `.specify/memory/constitution.md`.
- [ ] T012 Registrar na revisão ou descrição da mudança os resultados dos cenários de `specs/013-young-icons-status-bar/quickstart.md`, dispositivos e versões utilizados, contraste observado e bloqueios; confirmar o lançamento com `npx expo start --android` após a implementação ou registrar a indisponibilidade sem marcar a verificação Android como concluída.

## Dependencies & Execution Order

### Phase Dependencies

- Setup T001 antecede as histórias; a fase fundamental não exige novas tarefas.
- US1 e US2 não dependem uma da outra. T002 antecede T003–T006; T007 antecede T008–T009.
- As verificações em um mesmo dispositivo devem ser coordenadas para evitar interferência; concluir os cenários de cada história antes de declarar seu checkpoint.
- T010–T012 seguem as histórias pretendidas; T012 registra tanto sucessos quanto limitações, sem substituir tarefas manuais pendentes.

### User Story Dependencies

- **US1 (P1)**: Após T001; não depende de US2. Reutiliza a persistência e a recarga existentes sem modificar o esquema.
- **US2 (P2)**: Após T001; não depende de US1. Sua configuração global deve preservar a navegação existente.

### Parallel Opportunities

- T002 e T007 podem ser executadas em paralelo após T001: editam, respectivamente, `components/UnitAccordion.tsx` e `app/_layout.tsx`.
- Não paralelizar tarefas que editam o mesmo arquivo nem verificações concorrentes no mesmo dispositivo. Validações em dispositivos independentes podem ser coordenadas após as respectivas implementações.

## Parallel Examples

### User Story 1

Uma pessoa executa T002 em `components/UnitAccordion.tsx` enquanto outra executa T007 em `app/_layout.tsx`. Depois de T002, a validação de US1 ocorre em T003–T006, sem depender de T007.

### User Story 2

Uma pessoa executa T007 em `app/_layout.tsx` enquanto outra executa T002 em `components/UnitAccordion.tsx`. Depois de T007, a validação de US2 ocorre em T008–T009, sem depender de T002.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Concluir T001 e implementar T002.
2. Executar T003–T006 e avaliar o checkpoint de US1; registrar qualquer bloqueio em vez de declarar a verificação concluída.
3. Demonstrar os ícones, a seleção do perfil e a atualização após salvar antes de incluir US2.

### Incremental Delivery

1. Entregar US1 como incremento independente.
2. Implementar e verificar US2 como segundo incremento, incluindo as telas existentes.
3. Concluir T010–T012 e registrar evidências, resultados e limitações reais.

## Notes

- 2026-11-23, nova verificação: emulador Android 17, 420 dpi; indicadores brancos observados na tela inicial, cadastro e edição de unidade, cadastro e perfil de jovem e tela de rota inexistente do Expo Router. O fundo azul `#0369a1` com branco tem contraste calculado de 5,93:1. Verificados retorno, unidade vazia, abertura de perfil, alteração de sexo em registro temporário e atualização do ícone; nome longo e idade permaneceram legíveis a 320 pontos lógicos (840 px a 420 dpi). Unidade e jovem temporários foram removidos; resolução original restaurada. `npm run typecheck` passou. iOS e outras versões Android não estavam disponíveis.
- T005 permanece pendente para valores inesperados/ausentes em instalação descartável. T008 permanece pendente porque a rota inexistente exibiu a tela padrão do Expo Router, sem confirmar a tela específica `app/+not-found.tsx`; T012 permanece pendente até concluir os cenários restantes.
- 2026-11-23: `npm run typecheck` passou; ícones e barra foram implementados sem novas dependências. `npx expo start --android` iniciou o Metro. O emulador Android 17 estava conectado, mas a recarga da versão atual permaneceu na tela de carregamento. O manifesto respondeu e a consulta ao bundle retornou HTTP 200 após mais de 30 segundos. A inicialização e a verificação visual da versão alterada não foram confirmadas. T003–T006, T008–T009 e T012 permanecem pendentes.
- Nenhuma nova migração, alteração de valores persistidos em produção, dependência ou teste automatizado é prevista.
- As verificações em iOS e em versões alternativas de Android dependem de disponibilidade; não presumir resultados não observados.