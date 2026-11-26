# Research: Preservar a exibição de Editar Unidade

## Decisão 1: Avaliar rota de edição diretamente na stack raiz

- **Decisão**: Experimentar a remoção de `app/units/[unitId]/_layout.tsx` e registrar `units/[unitId]/edit` em `app/_layout.tsx`, mantendo o caminho externo `/units/[unitId]/edit`. Manter a mudança apenas após validação manual de paridade.
- **Justificativa**: O layout atual cria uma stack com apenas a tela `edit`, esconde seu cabeçalho e depende da stack raiz para a barra visível. No Expo Router instalado, `folderNodeToRouteNode` em `node_modules/expo-router/build/getRoutes.js` encaminha filhos de diretórios sem layout ao layout ancestral, concatenando seus segmentos. Assim, a inscrição atual `units/[unitId]` identifica o layout aninhado, não é uma declaração direta do arquivo `edit.tsx`; removê-lo exige revisar o nome da tela registrada. `useScreens.js` alerta sobre nomes sem filho correspondente.
- **Alternativas consideradas**: Remover apenas o arquivo aninhado sem ajustar a inscrição (rejeitada: a inscrição deixa de corresponder à árvore prevista); criar `index.tsx` ou wrapper (rejeitada: introduz rota/estrutura adicional); conservar a stack (fallback se a remoção não preservar o comportamento).
- **Limite da evidência**: A leitura do código do roteador fundamenta a alternativa, mas não confirma inicialização, histórico, deep links ou apresentação em dispositivo. Isso será verificado durante a implementação.

## Decisão 2: Definir o título na tela raiz correta

- **Decisão**: Na alternativa sem a stack aninhada, configurar o título `Editar Unidade` na inscrição direta da edição e retirar o ajuste de título em `navigation.getParent()?.setOptions` se não for mais necessário.
- **Justificativa**: `app/units/[unitId]/edit.tsx` hoje define o título por meio do navegador pai, enquanto a opção raiz usa `Editar unidade`. Ao mudar a hierarquia, não se deve pressupor que o mesmo pai ou efeito continue válido. A opção direta mantém a capitalização exigida e evita alterar inadvertidamente opções de outro navegador.
- **Alternativas consideradas**: Deixar a chamada ao pai inalterada (rejeitada por depender da hierarquia anterior); criar uma nova stack apenas para o título (rejeitada por complexidade desnecessária).

## Decisão 3: Não alterar o contrato de dados ou feedback

- **Decisão**: Manter leitura de unidade, validação de nome, atualização exclusiva do nome, recarga da lista ao retornar e toast compartilhado.
- **Justificativa**: `db/repository.ts` atualiza `units.name`, rejeita nome vazio e sinaliza unidade não encontrada; `app/index.tsx` recarrega a lista ao receber foco; `components/SaveToast.tsx` é compartilhado na raiz. A mudança solicitada é de navegação, não de persistência.
- **Alternativas consideradas**: Alterar repositório, esquema ou mecanismo de toast (rejeitadas por ampliar escopo e risco sem necessidade identificada).

## Decisão 4: Verificação manual e Android

- **Decisão**: Registrar antes/depois os cenários de [quickstart.md](quickstart.md), usar verificação estática TypeScript e executar `expo start --android` na implementação.
- **Justificativa**: A constituição exige verificação manual proporcional, proíbe testes automatizados e exige confirmação de inicialização Android. Erros de carregamento e salvamento podem exigir condições difíceis de reproduzir: registrar separadamente qualquer limitação, sem marcá-los como aprovados.
- **Alternativas consideradas**: Introduzir testes automatizados ou simulações permanentes de falha (rejeitadas pela constituição e pelo escopo); presumir sucesso apenas por análise estática (rejeitada por não verificar navegação real).

## Referências

- `app/_layout.tsx`, `app/units/[unitId]/_layout.tsx` e `app/units/[unitId]/edit.tsx`: configuração existente e dependência do navegador pai.
- `components/UnitAccordion.tsx`: chamada existente para `/units/[unitId]/edit` com `unitId` selecionado.
- `node_modules/expo-router/build/getRoutes.js` e `node_modules/expo-router/build/useScreens.js`: comportamento do Expo Router 3.1.2 instalado.
- `specs/009-remove-unit-detail/research.md`: decisão anterior de preservar o layout para evitar regressão, a ser reavaliada neste escopo.