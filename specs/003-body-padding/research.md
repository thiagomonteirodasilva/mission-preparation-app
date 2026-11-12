# Research: padding do corpo das telas

## Decision

- Aplicar a regra visual em um ponto único de composição da interface, preferencialmente no contêiner principal compartilhado das telas, em vez de repetir classes de espaçamento em cada rota.
- O valor visual padronizado será 1rem em todos os lados da área principal de conteúdo.
- A regra será aplicada sem alterar as convenções de navegação já definidas no projeto, incluindo a top app bar e os botões de retorno.

## Rationale

A aplicação é um app Expo com várias rotas e um padrão visual consistente baseado em `nativewind`. Como a necessidade é global e não específica de uma tela, a solução mais simples e menos sujeita a regressões é controlar o espaçamento em nível de layout compartilhado. Isso reduz a chance de uma tela esquecer a regra e deixa a regra verificável em inspeção manual de cada fluxo.

## Alternatives considered

- Repetir `p-6` ou `p-4` em cada tela: rejeitado porque introduz divergência entre telas e cria manutenção dispersa.
- Aplicar padding apenas na tela inicial: rejeitado porque não atende ao requisito de todas as telas.
- Alterar o CSS global do `body` em nível de plataforma sem considerar a estrutura das telas: rejeitado porque não é o nível de composição correta no app e pode conflitar com outros containers.

## Findings

- O app já usa `expo-router` com rotas declaradas em `app/` e classes de estilo com `nativewind`.
- As telas observadas, como `app/index.tsx`, `app/units/index.tsx` e `app/young/new.tsx`, usam `p-6`, que equivale a 1.5rem em Tailwind. Isso confirma que a consistência visual está pendente e que a padronização para `1rem` deve ocorrer como regra de layout centralizada.
- Não há interface externa nem contrato de API para este requisito; o impacto é exclusivamente de UI e visual.

## Status

- Need for clarification: none
- Design decision: resolved
