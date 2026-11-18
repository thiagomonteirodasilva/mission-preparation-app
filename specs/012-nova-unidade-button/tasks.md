# Tasks: Botão Nova Unidade em Largura Total

**Input**: Design documents from `specs/012-nova-unidade-button/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui.md](contracts/ui.md), [quickstart.md](quickstart.md)

**Tests**: Não adicionar testes automatizados. A constituição exige verificação manual, incluída como tarefa da história.

**Organization**: Tasks grouped by user story for independent implementation and validation.

## Phase 1: Setup

**Purpose**: Project initialization and shared infrastructure.

No setup tasks are required: Expo, Expo Router, NativeWind, and Tailwind are already configured for this application.

---

## Phase 2: Foundational

**Purpose**: Blocking prerequisites shared by user stories.

No foundational tasks are required: this change does not add infrastructure, dependencies, data models, or shared components.

---

## Phase 3: User Story 1 - Encontrar e iniciar a criação de unidade (Priority: P1) 🎯 MVP

**Goal**: A pessoa usuária encontra o botão “Nova Unidade” ocupando toda a largura disponível na área de conteúdo; ao acioná-lo, abre a tela de unidades e mantém acesso ao fluxo existente de criação.

**Independent Test**: Siga [quickstart.md](quickstart.md): iniciar no Android, verificar rótulo e largura, validar legibilidade a 320 pontos lógicos e tocar no botão para confirmar que a tela de unidades abre e o fluxo de criação continua acessível.

### Implementation and Manual Validation

- [x] T001 [US1] Atualizar `app/index.tsx`: remover `flex-row items-center justify-between` do contêiner externo, adicionar `w-full` ao `Pressable` e trocar o rótulo para “Nova Unidade”; preservar o layout interno, ícone, estilo, espaçamento e `Link` para `/units`.
- [x] T002 [US1] Validar manualmente a inicialização Android, o rótulo, a largura dentro da área de conteúdo, a legibilidade a 320 pontos lógicos e a navegação para a tela de unidades com acesso ao fluxo de criação, seguindo `specs/012-nova-unidade-button/quickstart.md`; registrar os resultados.

**Checkpoint**: A história está completa quando T001 e T002 passam, a tela de unidades abre ao tocar no botão e o fluxo existente de criação permanece acessível.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Verificações que atravessam histórias ou componentes.

Nenhuma tarefa adicional de polimento é necessária; a única história e a validação proporcional estão cobertas na Fase 3.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Nenhuma tarefa; configuração existente é reutilizada.
- **Foundational (Phase 2)**: Nenhuma tarefa; não há pré-requisitos compartilhados novos.
- **User Story 1 (Phase 3)**: Independente; T002 depende da implementação T001.
- **Polish (Phase 4)**: Sem tarefas adicionais.

### User Story Dependencies

- **User Story 1 (P1)**: Não depende de outras histórias; entrega o MVP.

### Task Dependency Graph

```text
T001 (alteração de app/index.tsx) → T002 (validação manual via quickstart.md)
```

### Parallel Opportunities

Não há tarefas paralelizáveis com segurança dentro de US1: a alteração e a validação são sequenciais, e só há um arquivo de código-fonte envolvido. Nenhuma tarefa está marcada `[P]`.

---

## Parallel Example: User Story 1

Não há exemplo de execução paralela para US1: T002 só pode começar depois que T001 estiver concluída.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Concluir T001 para atualizar o único botão necessário em `app/index.tsx`.
2. Concluir T002 seguindo `specs/012-nova-unidade-button/quickstart.md`.
3. Considerar o MVP pronto somente após a validação manual do rótulo, largura, legibilidade e navegação.

### Incremental Delivery

A única história forma um incremento independente e completo; não há histórias posteriores nem dependências adicionais.

## Notes

- O identificador `[US1]` corresponde à User Story 1 de `specs/012-nova-unidade-button/spec.md`.
- Não criar testes automatizados nem modificar dependências, persistência ou outras telas.
- Na validação, registrar se a inicialização Android foi concluída ou se ficou bloqueada pela ausência de dispositivo/emulador, conforme a constituição do projeto.

## Manual Validation Record

- Android: `npx expo start --android` iniciou o Metro e abriu o emulador Android.
- Tela inicial: o botão mostrou “Nova Unidade”, ocupou a largura interna disponível e manteve o ícone de grupo.
- Tela estreita: verificação feita a 320 pontos lógicos (840 × 1867 pixels a 420 dpi); o botão e o rótulo permaneceram dentro dos limites, sem corte nem rolagem horizontal causada pelo botão.
- Interação: tocar no botão abriu “Nova unidade” com o formulário de criação existente.
- TypeScript: `npm run typecheck` concluiu sem erros.
- Observação: Expo Go exibiu o aviso existente de configuração `scheme` ausente; a navegação interna testada funcionou. O estado sem unidades não foi alterado no emulador; o botão está fora da condição de renderização da lista e permanece apresentado independentemente da quantidade de unidades.
