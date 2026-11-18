# Quickstart: Validação Manual

## Pré-requisitos

- Dependências do projeto instaladas (`npm install`, se necessário).
- Dispositivo Android ou emulador disponível para iniciar o aplicativo conforme a política do projeto.

## Cenários de validação

1. Na raiz do projeto, execute `npm run android` e confirme que o Expo inicia o aplicativo no Android.
2. Na tela inicial, confirme que o botão mostra exatamente **“Nova Unidade”**.
3. Confirme que o botão se estende entre as bordas internas da área de conteúdo, respeitando o espaçamento lateral da tela, sem ultrapassá-las.
4. Confirme que o ícone existente continua visível e que o texto não é cortado.
5. Toque em **“Nova Unidade”** e confirme que a tela de unidades é aberta; nessa tela, confirme que o fluxo existente de criação continua acessível.
6. Retorne à tela inicial e configure o dispositivo/emulador para uma largura de 320 pontos lógicos; confirme que o botão continua dentro da área de conteúdo, o rótulo permanece legível e não há corte ou rolagem horizontal causada pelo botão.
7. Se a tela inicial estiver sem unidades cadastradas, confirme que a ação continua visível e acionável.

## Resultado esperado

Todos os cenários acima passam sem alteração do fluxo de navegação ou dos dados existentes. Registre a inicialização Android, as larguras verificadas e o resultado do toque na revisão/descrição da mudança.

## Política de testes

Não criar nem executar testes automatizados para esta alteração; a constituição do projeto exige verificação manual.
