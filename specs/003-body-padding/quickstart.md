# Quickstart: validação do padding visual

## Objetivo

Validar que toda tela do app mantém um padding de 1rem na área principal de conteúdo, sem quebrar a navegação ou a legibilidade.

## Pré-requisitos

- Node.js e npm instalados
- Dependências do projeto já instaladas
- App em execução via Expo

## Passos

1. Abra o terminal na raiz do projeto.
2. Execute `npm install` se a instalação ainda não estiver concluída.
3. Inicie o app com `npm start`.
4. Abra o app em um emulador, dispositivo físico ou navegador web.
5. Navegue pelas telas principais do fluxo: tela inicial, cadastro de unidade, cadastro de jovens, edição de jovens e qualquer tela de detalhes ou listagem.
6. Verifique visualmente que o conteúdo principal fica afastado 1rem das bordas da tela.
7. Confirme que a top app bar e os botões de retorno continuam visíveis e funcionais.

## Resultado esperado

- 100% das telas exibem o mesmo espaçamento de 1rem na área principal.
- Não há conteúdo colado às bordas.
- A navegação permanece consistente e acessível.
- A regra não introduz quebra de layout em telas longas ou com listas.
