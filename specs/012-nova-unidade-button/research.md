# Research: Botão Nova Unidade em Largura Total

## Contexto técnico confirmado

- A tela inicial está em `app/index.tsx`; o botão de unidade usa `Link` do Expo Router com `asChild` envolvendo um `Pressable`.
- O destino atual é `/units`; o botão mostra um ícone Material de grupo e o rótulo “+ unidade”.
- O conteúdo da tela inicial está dentro de um `ScrollView` com espaçamento interno `p-6`.
- O projeto já usa NativeWind 4 e Tailwind CSS 3.4; não é necessário instalar dependência.
- A constituição exige verificação manual e proíbe testes automatizados.

## Decisões

### Decisão: reutilizar as classes utilitárias existentes para largura total

**Rationale**: O projeto já estiliza componentes React Native com `className` do NativeWind. Uma classe utilitária de largura total atende ao requisito sem dependência ou abstração nova.

**Alternativas consideradas**: Largura numérica calculada em código ou estilos inline. Rejeitadas por introduzirem cálculo e manutenção desnecessários para um requisito de preenchimento da área pai.

### Decisão: permitir que o botão ocupe a área de conteúdo sem alterar a apresentação interna

**Rationale**: O contêiner externo atual aplica alinhamento de linha e distribuição de espaço a um único filho. Remover esse layout externo permite que o botão ocupe a largura disponível; a organização interna em linha permanece para manter o ícone e o rótulo juntos. O espaçamento `p-6` do conteúdo continua definindo as margens laterais.

**Alternativas consideradas**: Adicionar uma nova composição de botão ou alterar padding, cor, alinhamento interno e tamanho do ícone. Rejeitadas por não serem necessárias ao pedido e por ampliarem a mudança visual.

### Decisão: preservar navegação e ação atuais

**Rationale**: O `Link` existente navega para `/units`, onde o fluxo de criação atual está disponível. Manter esse vínculo evita regressões e atende ao requisito de preservar o comportamento.

**Alternativas consideradas**: Navegar diretamente para uma tela diferente de criação. Rejeitada porque isso alteraria o fluxo existente e não foi solicitado.

### Decisão: validar manualmente, sem testes automatizados

**Rationale**: A constituição do projeto proíbe testes automatizados e exige verificação manual proporcional. O guia de validação cobre a inicialização Android, rótulo, largura, legibilidade e navegação.

**Alternativas consideradas**: Adicionar teste automatizado de interface. Rejeitada por contrariar a constituição.

## Questões pendentes

Nenhuma. O escopo e as decisões técnicas são determinados pela especificação e pela estrutura atual do projeto.
