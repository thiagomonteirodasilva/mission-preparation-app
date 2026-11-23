# Quickstart: Verificação Manual

## Pré-requisitos

- Dependências instaladas e ambiente Expo configurado; emulador ou dispositivo Android disponível. Usar iOS também se estiver disponível.
- A aplicação com a funcionalidade implementada, uma unidade vazia e outra com jovens dos dois sexos, incluindo um nome longo; usar apenas dados de teste.
- Para o caso de sexo inesperado, usar uma instalação descartável e um registro criado exclusivamente para teste, nunca dados reais. O esquema não aceita `NULL`, mas aceita uma string inesperada.
- Referências: [contrato de interface](contracts/ui.md) e [modelo de dados](data-model.md).

## Iniciar e verificar

1. Na raiz do projeto, instalar dependências se necessário com `npm install`. Executar `npm run typecheck` e registrar o resultado.
2. Executar `npx expo start --android` e confirmar que o aplicativo inicia no dispositivo ou emulador. Se não estiver disponível, registrar a limitação e não declarar a verificação Android concluída. Se houver iOS, iniciar com `npm run ios` e repetir a inspeção nativa.
3. Expandir a unidade com jovens dos dois sexos: verificar rostos distintos e adequados, nome e idade; selecionar cada entrada e confirmar que abre o perfil correspondente.
4. No perfil, alterar o sexo, salvar e voltar. Confirmar que o ícone muda conforme o valor salvo, sem atualização manual. Confirmar que a expansão da unidade continua funcionando.
5. Expandir uma unidade vazia: confirmar a mensagem existente e ausência de entradas fictícias. Para o fallback, fechar o aplicativo descartável, abrir seu banco `mission-preparation.db` em um editor SQLite, localizar pelo nome o `id` do jovem de teste e alterar somente o `gender` dessa linha para `unexpected`. Reabrir o aplicativo e confirmar ícone neutro, nome e idade visíveis e perfil acionável; ao terminar, restaurar o valor original ou descartar a instalação de teste. A ausência do campo, não persistível nesse esquema, pode ser conferida com dados temporários de desenvolvimento sem alterar o banco.
6. Em dispositivo ou emulador configurado para 320 pontos lógicos de largura, verificar o nome longo: nome, idade e ícone devem permanecer legíveis, sem sobreposição ou corte causado pelo ícone.
7. Navegar pela tela inicial, cadastro e edição de unidade, cadastro e perfil de jovem e tela não encontrada. Quando a barra de status estiver visível e controlável, confirmar indicadores brancos e fundo efetivo legível; checar contraste mínimo 3:1 com as cores realmente exibidas. Para `#ffffff` sobre `#0369a1`, o contraste calculado é 5,93:1. Verificar também títulos, botões de voltar, área segura e eventuais modais.
8. Repetir a observação após voltar às telas e, se disponível, em versões Android com e sem edge-to-edge e em iOS. Registrar sistema, versão, dispositivo, cenários e eventuais limitações de controle nativo; não considerar a web evidência de controle da barra do sistema.

Não criar testes automatizados. O planejamento não executa nem declara concluída esta verificação.