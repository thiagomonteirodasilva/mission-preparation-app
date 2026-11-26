# Tasks: Preservar a exibição de Editar Unidade

**Input**: `specs/016-edit-unit-display/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/edit-unit-ui.md` e `quickstart.md`.

**Organização**: tarefas agrupadas por história. `[P]` indica trabalho independente em arquivos distintos, sem depender de tarefas ainda incompletas no mesmo grupo. Os cenários são verificações manuais; a constituição proíbe testes automatizados.

## Phase 1: Setup

**Objetivo**: preparar ambiente e registrar a referência antes de alterar a navegação.

- [X] T001 Preparar duas unidades distintas, uma com jovens, e executar `npx expo start --android` conforme `specs/016-edit-unit-display/quickstart.md`; registrar dispositivo, resultado e eventual indisponibilidade, sem marcar a inicialização Android como aprovada se não houver dispositivo ou emulador.
- [X] T002 Registrar em `specs/016-edit-unit-display/quickstart.md` a linha de base manual de abertura das duas unidades, título, barra, retorno sem salvar, salvamento válido, vínculos e validação de nome vazio; anotar cenários não observados e limitações antes de modificar a aplicação.

## Phase 2: Foundational

**Objetivo**: confirmar a árvore de navegação e os contratos existentes antes de alterá-los. Concluir T003 e T004 antes das histórias.

- [X] T003 [P] Examinar `app/_layout.tsx` e `app/units/[unitId]/_layout.tsx` para confirmar a inscrição da stack aninhada, barra superior, retorno e os ajustes necessários para inscrever `units/[unitId]/edit` diretamente.
- [X] T004 [P] Examinar `components/UnitAccordion.tsx` e `db/repository.ts` para confirmar o parâmetro `unitId`, a rota pública e a atualização exclusiva do nome, preservando a associação com jovens.

## Phase 3: User Story 1 — Abrir e navegar pela edição (P1)

**Objetivo**: avaliar a eliminação da stack específica sem alterar abertura, título, aparência ou retorno.

**Verificação independente**: abrir duas unidades diferentes, confirmar o nome correto e uma barra azul com `Editar Unidade`, alterar sem salvar e voltar sem alterar os dados.

- [X] T005 [US1] Em `app/_layout.tsx`, substituir a inscrição `units/[unitId]` pela tela `units/[unitId]/edit` com título exato `Editar Unidade`, preservando barra azul, botão Voltar e toast global.
- [X] T006 [US1] Em `app/units/[unitId]/edit.tsx`, remover o ajuste de título dependente de `navigation.getParent()` e os imports ou variáveis que se tornarem desnecessários, mantendo carregamento, formulário, parâmetros e operações existentes.
- [X] T007 [US1] Remover `app/units/[unitId]/_layout.tsx` como alternativa experimental, sem criar wrapper ou alterar a rota usada por `components/UnitAccordion.tsx`.
- [X] T008 [US1] Executar manualmente em `specs/016-edit-unit-display/quickstart.md` os cenários de abertura de duas unidades, aparência, carregamento quando observável, retorno sem salvar e retorno sem histórico quando reproduzível; registrar resultados, avisos e limitações.
- [X] T009 [US1] Verificar manualmente em `specs/016-edit-unit-display/quickstart.md` os títulos, barras e retorno da criação de unidade e de uma tela de jovem, sem avisos de rota inexistente; registrar qualquer regressão.

## Phase 4: User Story 2 — Salvar o nome da unidade (P1)

**Objetivo**: preservar atualização do nome, confirmação, retorno e vínculos existentes.

**Verificação independente**: editar unidade com jovens, salvar nome válido com espaços externos e conferir confirmação, nome persistido, retorno e vínculos.

- [X] T010 [P] [US2] Inspecionar em `db/repository.ts` que `updateUnit` continua removendo espaços externos e atualizando apenas o nome da unidade selecionada, sem alterar identificador, data ou vínculos; corrigir somente se a alteração de navegação tiver causado regressão.
- [X] T011 [US2] Verificar manualmente em `specs/016-edit-unit-display/quickstart.md` o salvamento válido com espaços externos, confirmação `Salvo com sucesso`, retorno, recarga da lista, persistência após reabrir e preservação dos jovens; restaurar o nome de teste e registrar o resultado.
- [X] T012 [US2] Verificar manualmente em `specs/016-edit-unit-display/quickstart.md` que campo e botão ficam indisponíveis com `Salvando...` durante o salvamento, se o estado for observável; caso contrário, registrar a limitação sem marcar o cenário como aprovado.

## Phase 5: User Story 3 — Receber feedback de validação e falha (P2)

**Objetivo**: manter validação, mensagens de falha e ausência de sucesso indevido.

**Verificação independente**: tentar salvar nome vazio e somente espaços, e verificar casos de unidade indisponível e erro de salvamento quando reproduzíveis.

- [X] T013 [P] [US3] Inspecionar `components/SaveToast.tsx` para confirmar que a confirmação compartilhada pode ser ocultada ao apresentar erros, sem alterar a configuração ou criar novas dependências.
- [X] T014 [US3] Verificar manualmente em `specs/016-edit-unit-display/quickstart.md` nome vazio e somente espaços: exigir mensagem `Nome da unidade é obrigatório.`, permanência na tela, ausência de confirmação e nome persistido inalterado; registrar os resultados.
- [X] T015 [US3] Verificar manualmente em `specs/016-edit-unit-display/quickstart.md` unidade inexistente, ausência de parâmetro e falha de carregamento quando reproduzíveis, incluindo controles desabilitados e retorno seguro; registrar separadamente casos impossíveis de reproduzir.
- [X] T016 [US3] Verificar manualmente em `specs/016-edit-unit-display/quickstart.md` falha de salvamento em ambiente isolado quando seguro, incluindo unidade removida durante a edição se reproduzível, texto preservado, erro visível, ausência de navegação e ocultação de confirmação anterior; registrar limitações sem aprovar cenários não observados.

## Phase 6: Polish & Cross-Cutting Concerns

**Objetivo**: comprovar a decisão, verificar o projeto e registrar evidências sem ampliar o escopo.

- [X] T017 Executar `npm run typecheck` conforme `package.json` e registrar resultado e erros em `specs/016-edit-unit-display/quickstart.md`.
- [X] T018 Comparar resultados antes/depois em `specs/016-edit-unit-display/quickstart.md` com os critérios de `specs/016-edit-unit-display/spec.md`; se houver regressão ou não houver evidência suficiente, restaurar a configuração anterior em `app/_layout.tsx`, `app/units/[unitId]/_layout.tsx` e `app/units/[unitId]/edit.tsx`, verificar novamente os fluxos afetados e registrar a decisão e o motivo.
- [X] T019 Registrar em `specs/016-edit-unit-display/quickstart.md` a decisão final de manter ou remover a stack, evidências de cada história, resultado do Android, avisos, falhas e limitações; não declarar concluída a verificação Android quando indisponível nem aprovar cenários não observados.
- [X] T020 Revisar `app/_layout.tsx`, `app/units/[unitId]/edit.tsx` e o estado de `app/units/[unitId]/_layout.tsx` quanto a nomes em inglês, mudanças mínimas, barra `bg-sky-700`, retorno, ausência de novas dependências e ausência de testes automatizados criados.

## Dependencies & Execution Order

- **Setup → Foundation**: T001–T002 registram a referência; T003 e T004 podem ser feitos em paralelo após o setup.
- **Foundation → US1**: T005 → T006 → T007; T008 e T009 verificam o resultado antes das demais validações de navegação.
- **US2 e US3**: suas regras já existem e podem ser analisadas independentemente; executar suas verificações manuais após a alteração de US1 para demonstrar ausência de regressão. T010 e T013 podem ocorrer em paralelo após T007, pois inspecionam arquivos distintos e não dependem um do outro.
- **Uso do dispositivo e registro**: executar T008, T009, T011, T012, T014, T015 e T016 sequencialmente no mesmo dispositivo e registro; não compartilhar alterações simultâneas em `quickstart.md`.
- **Finalização**: T017 após alterações; T018 após as verificações disponíveis; T019 após a decisão; T020 após a configuração final. A restauração por T018 exige repetir as verificações afetadas e a verificação estática.

## Parallel Examples

- **US1**: não paralelizar T005–T007: em conjunto, mudam a hierarquia de navegação e precisam de uma configuração coerente antes de verificar.
- **US2**: T010 pode ser realizado em paralelo com T013 de US3 após T007; T011 e T012 usam dispositivo e registro compartilhados, portanto são sequenciais.
- **US3**: T013 pode ser realizado em paralelo com T010 de US2; T014–T016 são sequenciais pelo uso do mesmo dispositivo e registro.

## Implementation Strategy

1. **MVP**: concluir setup, foundation e US1 para avaliar navegação direta e retorno preservados.
2. **Incrementos**: validar US2 e US3 sobre a mesma configuração, sem alterar regras ou dados não relacionados.
3. **Conclusão**: executar verificações finais, decidir com evidência se a remoção é segura e registrar limitações; se houver regressão ou evidência insuficiente, manter a estrutura original. Nenhuma história ou verificação manual deve ser declarada aprovada apenas por inspeção estática.