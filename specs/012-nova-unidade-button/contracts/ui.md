# UI Contract: Ação Nova Unidade

## Escopo

Contrato da ação de criação de unidade exibida na tela inicial.

## Apresentação

- O texto visível do botão é exatamente **“Nova Unidade”**.
- O botão ocupa a largura disponível dentro da área de conteúdo, respeitando o espaçamento lateral da tela.
- O ícone de grupo e o estilo visual existente permanecem inalterados, salvo o ajuste necessário à largura.
- Em uma largura de 320 pontos lógicos, o rótulo permanece legível, sem corte nem rolagem horizontal causada pelo botão.
- A ação permanece disponível mesmo quando a lista de unidades está vazia.

## Interação

- Ao ser acionado, o botão abre a tela de unidades (`/units`).
- Nessa tela, a pessoa usuária continua podendo acessar o fluxo de criação já existente.
- Nenhum dado é criado até que a pessoa usuária prossiga no fluxo atual.

## Compatibilidade

A alteração não muda as demais ações da tela inicial, o destino de navegação, o modelo de dados ou as regras de persistência.
