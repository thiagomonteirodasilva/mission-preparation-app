# Quickstart: Verificação manual de Editar Unidade

## Pré-requisitos

- Dependências existentes instaladas; ambiente Expo e dispositivo ou emulador Android disponíveis.
- Duas unidades com nomes distintos, uma delas com pelo menos um jovem; usar dados de teste que possam ser renomeados e restaurados.
- Registrar versão/dispositivo, data e resultados antes e depois da alteração. Não criar nem executar testes automatizados.
- Contrato esperado: [contracts/edit-unit-ui.md](contracts/edit-unit-ui.md); dados preservados: [data-model.md](data-model.md).

## Inicialização e verificação estática

1. Na raiz do projeto, executar `npm run typecheck` e registrar o resultado.
2. Executar `npx expo start --android` e confirmar que o aplicativo inicia no Android. Se não houver dispositivo ou emulador, registrar a limitação e não declarar a verificação Android concluída.
3. Observar o console durante navegação: não deve haver aviso de rota declarada inexistente ou erro de navegação.

## Cenários de navegação e edição

1. Para cada uma das duas unidades, abrir o menu de ações e escolher `Editar Unidade`. Confirmar nome correto, uma barra azul com título `Editar Unidade`, botão Voltar e campo/botão com apresentação original. Observar a indicação de carregamento e controles desabilitados se perceptíveis.
2. Alterar o nome sem salvar e usar Voltar. Confirmar retorno à tela anterior, nome original e ausência de confirmação de sucesso. Reabrir para confirmar que a mudança foi descartada.
3. Na unidade com jovens, salvar um nome válido com espaços externos. Confirmar retorno, `Salvo com sucesso`, nome sem espaços externos na lista e mesmos jovens. Reabrir e confirmar o nome persistido. Restaurar o nome de teste ao terminar.
4. Abrir edição, limpar o nome e salvar; repetir com somente espaços. Confirmar `Nome da unidade é obrigatório.`, permanência na tela, ausência de sucesso e dados anteriores intactos.
5. Se possível observar um salvamento em andamento, confirmar `Salvando...` e que campo e botão não permitem interação ou novo salvamento. Se a operação for rápida demais, registrar como não observado, sem declarar aprovado.
6. Voltar à tela inicial e abrir a criação de unidade e uma tela de jovem; confirmar que seus títulos, barra única e retorno permanecem corretos. Verificar que não há aviso de rota inválida no console.

## Casos excepcionais

1. Quando o ambiente permitir, abrir diretamente a rota de edição com identificador inexistente e conferir `Unidade não encontrada.`, campo e botão desabilitados e retorno seguro. Um identificador literal `undefined` é um identificador inválido, não equivale à ausência do parâmetro.
2. Se for possível iniciar a tela sem parâmetro, confirmar `Unidade não informada.` e controles desabilitados. A rota dinâmica pode impedir esse estado; registrar como não reproduzido quando aplicável.
3. Em ambiente de teste isolado, somente se for seguro simular falha de leitura ou de salvamento, confirmar mensagem de erro, ausência de sucesso e, na falha de salvamento, texto preservado. Não excluir dados reais nem criar mecanismos permanentes de falha apenas para essa verificação.
4. Se for possível abrir a edição sem histórico anterior, confirmar que Voltar leva à tela inicial. Caso contrário, registrar a limitação.
5. Sempre que um caso não puder ser reproduzido, registrar o motivo e não assinalá-lo como aprovado.

## Registro e decisão

Registrar resultados por cenário, divergências, avisos de navegação, resultado do TypeScript e início no Android. Registrar a decisão sobre remover ou manter a stack aninhada, com justificativa e evidências; se algum requisito regredir, preservar a estrutura original até que exista alternativa validada.

### Tentativa de implementação — 2026-11-26

- `npx expo start --android`: a porta 8081 estava ocupada; a alternativa de usar a porta 8082 foi recusada e o Expo não iniciou outro servidor.
- `adb` e `emulator` não estavam disponíveis no PATH; `ANDROID_HOME` e `ANDROID_SDK_ROOT` não estavam definidos. Essas observações não comprovam que não exista dispositivo ou instalação Android em outro local.
- A inicialização no Android, a preparação das unidades e a linha de base manual não foram confirmadas. T001 e as tarefas dependentes permanecem pendentes; nenhuma remoção de layout foi validada ou realizada.

### Reconexão — 2026-11-26

- O processo Expo anterior foi encerrado e `npx expo start --android` reiniciado na porta 8081, com o SDK Android localizado em `%LOCALAPPDATA%\Android\Sdk`.
- O emulador `emulator-5554` está conectado e a tela inicial `Unidades` está visível. Há pelo menos duas unidades distintas, incluindo uma com jovem vinculado; não foi necessário alterar os dados existentes para preparar o cenário.
- A linha de base dos fluxos de edição ainda não foi verificada. Nenhuma remoção de layout foi validada ou realizada.

### Linha de base manual — 2026-11-26

- Android `emulator-5554`, Metro na porta 8081: a edição de `Gama 2` e `Jardim Das Oliveiras` carregou os nomes corretos, com uma barra de título `Editar Unidade` e botão `Voltar`.
- Alterar o campo de `Jardim Das Oliveiras` e voltar sem salvar preservou o nome na lista.
- Nome vazio em `Gama 2` exibiu a mensagem de campo obrigatório, sem sair da tela. A alteração temporária para `Gama 2 Verificacao` foi salva, exibiu `Salvo com sucesso` e retornou à lista com o jovem vinculado; o nome original `Gama 2` foi restaurado e confirmado na lista com o mesmo vínculo.
- O estado de carregamento foi observado brevemente; o estado `Salvando...`, o caminho sem histórico e as falhas de infraestrutura não foram verificados nesta linha de base. A comparação visual de cor por imagem também permanece pendente.

### Verificação após alteração — navegação

- Android `emulator-5554`, Metro na porta 8081: `Gama 2` e `Jardim Das Oliveiras` abriram com seus nomes corretos, título `Editar Unidade` e botão `Voltar`. A captura da segunda edição mostrou uma única barra azul e os controles esperados.
- Alterar o campo de `Gama 2` e voltar sem salvar preservou o nome original na lista. O caminho sem histórico e os estados transitórios de carregamento não foram reproduzidos após a alteração.
- As telas `Nova unidade` e `Detalhes do jovem` abriram com título e botão de retorno. A pesquisa nos registros recentes do aplicativo não encontrou aviso de rota inexistente; o console completo do Metro não foi inspecionado.

### Verificação após alteração — salvamento

- Um nome temporário com espaços externos foi salvo em `Gama 2`: os espaços desapareceram na lista e ao reabrir a edição, `Salvo com sucesso` apareceu e o jovem vinculado continuou na unidade.
- O nome original `Gama 2` foi restaurado, salvo e confirmado na lista com o mesmo jovem vinculado.
- O salvamento ocorreu rápido demais para observar `Salvando...` e os controles desabilitados; esse cenário permanece não verificado, não aprovado.

### Verificação após alteração — validação

- Nome vazio e nome com apenas três espaços exibiram `Nome da unidade é obrigatório.`, mantiveram a tela de edição e não exibiram confirmação de sucesso. Após Voltar, `Gama 2` e o jovem vinculado permaneciam na lista.
- Uma abertura direta em `/units/unidade-inexistente-016/edit` exibiu `Unidade não encontrada.`, campo e botão desabilitados; `Voltar` levou à lista. Não foi determinado se havia histórico de navegação, portanto o fallback sem histórico continua não verificado.
- A abertura direta no Expo Go mostrou aviso de configuração de `scheme` para builds de produção; a configuração atual não define esse campo. Não foi observada falha na navegação de desenvolvimento e nenhuma configuração de links foi alterada.
- Ausência de parâmetro e falhas artificiais de leitura ou salvamento não foram reproduzidas: a rota exige identificador e não havia ambiente isolado de falha. A ocultação de confirmação anterior em erro também não foi observada; esses cenários não foram aprovados.

### Verificação final e decisão

- `npm run typecheck` e `git diff --check` concluíram sem erros. A abertura direta na porta 8081 reiniciou a experiência Android com a configuração alterada e exibiu a tela de edição; nenhuma segunda porta foi utilizada.
- **Decisão**: manter a remoção da stack específica. Os fluxos principais e o erro de unidade inexistente foram observados no Android; o formulário, o repositório, o toast e a ação de retorno compartilhada não tiveram sua lógica alterada. O layout raiz registra diretamente a edição e preserva o título e a barra.
- **Limitações**: não foram reproduzidos o estado `Salvando...`, parâmetro ausente, falhas artificiais de leitura/gravação, ocultação do toast anterior ou o fallback comprovadamente sem histórico. Esses casos permanecem não verificados; não se afirma paridade integral para eles. O iOS não foi verificado.
- A revisão final não identificou novas dependências, testes automatizados criados ou mudanças no esquema de dados. O aviso de `scheme` na abertura direta está registrado acima.