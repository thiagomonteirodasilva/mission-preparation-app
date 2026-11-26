---
description: "Tarefas para confirmação de salvamento com biblioteca de toast"
---

# Tasks: Confirmação de salvamento com biblioteca de toast

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/toast-ui.md](contracts/toast-ui.md) e [quickstart.md](quickstart.md).

**Organização**: tarefas por história; `[P]` identifica trabalho em arquivos diferentes sem dependência de tarefas incompletas no mesmo grupo. Nenhum teste automatizado deve ser criado, conforme a constituição; as verificações manuais abaixo são obrigatórias e devem ser registradas.

## Phase 1: Setup

**Objetivo**: preparar a dependência solicitada, sem atualizar outras bibliotecas intencionalmente.

- [X] T001 Instalar `react-native-toast-message` 2.5.2 com npm e registrar a dependência e resolução em `package.json` e `package-lock.json`; confirmar que a instalação terminou e a biblioteca inclui seus tipos.

---

## Phase 2: Foundational

**Objetivo**: disponibilizar uma instância global e uma interface comum para as telas consumidoras.

- [X] T002 Adaptar `components/SaveToast.tsx` para fornecer a configuração de layout da biblioteca e uma função de sucesso compartilhada; usar `bg-emerald-600`, texto branco legível, ícone de check de `MaterialIcons` já instalado e mensagem exata “Salvo com sucesso”; configurar posição inferior, `visibilityTime` de 3000 ms e ocultação automática, sem usar timers locais de sucesso. Disponibilizar às telas uma forma de ocultar a confirmação global em caso de erro.
- [X] T003 Montar uma única instância de `react-native-toast-message` com a configuração de `components/SaveToast.tsx` após a `Stack` em `app/_layout.tsx`, preservando barra superior, navegação e configuração da barra de status.

**Checkpoint**: T001 → T002 → T003; a instância permanece montada entre telas. A migração dos consumidores e do erro de carregamento ocorre na próxima fase antes de validar a compilação.

---

## Phase 3: User Story 1 — Confirmar salvamentos (Priority: P1)

**Objetivo**: apresentar o mesmo toast global com ícone nos cinco salvamentos, inclusive depois de navegação e independentemente da rolagem.

**Verificação independente**: criar/editar unidade, cadastrar/editar jovem e adicionar relato; confirmar mensagem, verde, check, posição inferior, 3 segundos (±0,5 s), retorno automático e reinício do prazo no segundo salvamento.

### Implementação

- [X] T004 [P] [US1] Migrar a criação de unidade em `app/units/index.tsx` para disparar a função compartilhada somente depois de `saveUnit` concluir; remover estado, temporizador e componente local de sucesso e preservar `router.back()` imediato.
- [X] T005 [P] [US1] Migrar o cadastro em `app/young/new.tsx` para disparar a função compartilhada somente depois de `saveYoung` concluir; remover estado, temporizador e componente local de sucesso, preservando validação, mensagens de erro existentes e `router.back()` imediato.
- [X] T006 [P] [US1] Migrar edição de perfil e inclusão de relato em `app/young/[youngId].tsx` para disparar a função compartilhada somente após cada persistência; remover estado e temporizadores locais de sucesso e preservar validações e navegação. Ao remover o antigo `SaveToast`, manter a mensagem de falha de carregamento em estado visual local independente, visível até o retorno existente após aproximadamente 2000 ms, com limpeza do timer.
- [X] T007 [P] [US1] Em `app/units/[unitId]/edit.tsx`, disparar a confirmação compartilhada após `updateUnit` concluir e antes de `router.back()`; em validações, falhas de carregamento e falhas de salvamento, ocultar toast anterior e preservar a indicação de erro.
- [ ] T008 [US1] Verificar manualmente em `specs/015-toast-library/quickstart.md` os cinco salvamentos, ícone de check, legibilidade, cor, rolagem, retorno automático e dois salvamentos consecutivos; medir a duração e registrar resultados, dispositivo e eventuais limitações na revisão ou descrição da mudança.

**Checkpoint**: a US1 entrega os quatro fluxos de sucesso sem perder o erro preexistente de carregamento. Uma falha de persistência nunca deve disparar sucesso.

---

## Phase 4: User Story 2 — Preservar informações de erro (Priority: P2)

**Objetivo**: manter validações e falhas claras e impedir confirmação falsa, inclusive nos pontos que atualmente não tratam falhas locais de persistência.

**Verificação independente**: após a migração de US1, tentar entradas inválidas, provocar falhas controladas de persistência e abrir perfil indisponível; confirmar mensagens, ausência de novo sucesso e retorno de erro em aproximadamente 2 segundos.

### Implementação

- [X] T009 [P] [US2] Em `app/units/index.tsx`, exibir mensagem de nome obrigatório quando o nome estiver vazio ou contiver apenas espaços, sem salvar nem navegar; tratar falhas de `saveUnit` com indicação visível e específica, sem navegar nem disparar sucesso; ocultar confirmação anterior nesses erros e preservar a navegação após sucesso.
- [X] T010 [P] [US2] Em `app/young/[youngId].tsx`, tratar falhas de `saveProgressEntry` com indicação visível, preservando texto não salvo e validações; manter erro de carregamento separado do sucesso e seu retorno de aproximadamente 2000 ms, e preservar o tratamento existente de falha de edição. Ocultar confirmação anterior em cada validação inválida ou falha de salvamento ou carregamento.
- [X] T011 [P] [US2] Em `app/young/new.tsx`, ocultar confirmação de sucesso anterior em cada validação inválida ou falha de `saveYoung`, preservando mensagens de erro, dados preenchidos e navegação existentes.
- [ ] T012 [US2] Verificar manualmente em `specs/015-toast-library/quickstart.md` nome de unidade vazio e apenas espaços em criação e edição de unidade, demais dados inválidos, falhas controladas de criação/edição de unidade e jovem e relato, além de perfil inexistente; repetir validações e falhas com uma confirmação anterior visível, confirmar sua ocultação e ausência de novo sucesso e registrar qualquer cenário não reproduzido com segurança como não verificado.

**Checkpoint**: mensagens de erro preservadas ou explicitadas, sem confirmação falsa nem alteração das regras de persistência e navegação.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Objetivo**: validar integração, conformidade e inicialização sem introduzir testes automatizados.

- [X] T013 Executar `npm run typecheck` conforme `package.json`; corrigir erros introduzidos pela mudança e registrar o resultado na revisão.
- [X] T014 Executar `expo start --android` conforme exigido em `.specify/memory/constitution.md` (ou `npm run android` de `package.json`); confirmar inicialização no Android e registrar o resultado; se não houver dispositivo ou emulador, registrar a limitação e não marcar a verificação Android como concluída.
- [X] T015 Revisar `components/SaveToast.tsx`, `app/_layout.tsx`, `app/units/index.tsx`, `app/units/[unitId]/edit.tsx`, `app/young/new.tsx` e `app/young/[youngId].tsx` para remover estados/importações/timers de sucesso obsoletos, preservar nomes em inglês, top bar e botão de voltar, e registrar os resultados manuais e limitações na revisão.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup → Foundation**: T001 antes de T002; T002 antes de T003.
- **Foundation → US1**: após T003, T004, T005, T006 e T007 podem ser executadas em paralelo; T008 depende das cinco e de um ambiente funcional.
- **US1 → US2**: T009 depende de T004; T010 depende de T006; T011 depende de T005; T012 depende de T009, T010 e T011. As tarefas de implementação podem ocorrer em paralelo por arquivo distinto.
- **Polish**: após integração de US1 e US2. T013 e T014 exigem aplicação integrada; T015 ocorre após as verificações para registrar evidências.

### User Story Dependencies

- **US1 (P1)**: depende da fundação; verificável pelos cinco fluxos após T004–T007. A migração preserva imediatamente o erro de carregamento, para não regredir o comportamento existente.
- **US2 (P2)**: depende da migração dos mesmos arquivos na US1 para evitar conflitos; suas verificações de falha são independentes das verificações de sucesso. Nenhuma fila, migração de dados ou tela nova é necessária.

### Parallel Opportunities

- Depois de T003: T004, T005, T006 e T007 podem ser distribuídas a responsáveis em arquivos diferentes.
- Depois de T004–T007: T009, T010 e T011 podem ser distribuídas em paralelo; coordenar os resultados antes de T012.
- T008 e T012 exigem atenção ao mesmo ambiente e dados de teste; executar sequencialmente se compartilharem dispositivo ou registros.

## Parallel Example: User Story 1

- Responsável A: T004 — criação de unidade em `app/units/index.tsx`.
- Responsável B: T005 — cadastro de jovem em `app/young/new.tsx`.
- Responsável C: T006 — perfil, relato e preservação do erro em `app/young/[youngId].tsx`.
- Responsável D: T007 — edição de unidade em `app/units/[unitId]/edit.tsx`.

## Parallel Example: User Story 2

- Responsável A: T008 — falha ao salvar unidade em `app/units/index.tsx`, após T004.
- Responsável B: T009 — falha ao salvar relato em `app/young/[youngId].tsx`, após T006.
- Responsável C: T010 — erros no cadastro em `app/young/new.tsx`, após T005.

## Implementation Strategy

1. **MVP**: implementar T001–T007 e T009–T011 e executar as verificações de T008 e T012, cobrindo os cinco fluxos de US1 e os erros de US2, incluindo ícone, navegação e ocultação de sucesso anterior; não considerar o incremento concluído sem tratar e verificar as falhas relevantes.
2. **Finalização obrigatória do MVP**: concluir T013–T015, registrar resultados reais e limitações; confirmar a inicialização Android conforme a constituição e não afirmar que Android ou cenários manuais foram verificados se não forem executados.

## Notes

- O ícone de check e a ocultação de sucesso anterior diante de falhas constam da especificação, do contrato e das verificações manuais.
- A edição de unidade agora usa a mesma confirmação global após salvar.
- A dependência solicitada justifica a adição ao projeto; não incluir outra biblioteca de ícones nem testes automatizados.