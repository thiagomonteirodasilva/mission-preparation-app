# Research: Ícones de Jovens e Contraste da Barra de Status

## 1. Local da lista e atualização

**Decision**: Alterar a renderização direta em `components/UnitAccordion.tsx` e reutilizar a recarga por foco de `app/index.tsx` após o retorno do perfil.

**Rationale**: O acordeão renderiza as entradas ativas e os links; `YoungListItem.tsx` existe, mas não é utilizado ali. O perfil salva com `updateYoung` e a tela inicial relê as unidades ao recuperar o foco.

**Alternatives considered**: Alterar apenas `YoungListItem.tsx` não afetaria a lista efetiva; substituir o fluxo existente ou criar armazenamento duplicado adicionaria complexidade sem necessidade.

## 2. Ícones de rosto e valor desconhecido

**Decision**: Usar `MaterialIcons` com `face`, `face-3` e o ícone neutro `account-circle`, verificando visualmente sua adequação no dispositivo. Comparar explicitamente `male` e `female` e usar o neutro nos demais casos.

**Rationale**: Os três nomes constam no mapa de glifos instalado de `MaterialIcons`, família já usada pelo aplicativo; a escolha atende ao pedido posterior do usuário de usar a mesma família quando possível. O cadastro atual é binário, mas um valor inesperado não deve ser identificado indevidamente como um dos sexos. A tipagem não elimina dados inesperados em tempo de execução.

**Alternatives considered**: `MaterialCommunityIcons` oferece `face-man` e `face-woman` na mesma dependência, mas não é a família já usada nas outras telas; `male` e `female` são símbolos de sexo, não rostos; imagens próprias ou nova biblioteca aumentariam a manutenção; assumir feminino como alternativa genérica viola FR-006.

## 3. Barra de status e fundo

**Decision**: Utilizar `StatusBar` de `expo-status-bar` com `style="light"` no layout global e verificar em cada tela a cor efetiva da superfície sob a barra; usar fundo `bg-sky-700` e/ou a propriedade de fundo suportada no Android conforme a plataforma e área segura.

**Rationale**: A dependência já está declarada e sua versão instalada expõe `style`, `backgroundColor` para Android e `translucent`; `style="light"` controla indicadores brancos. A barra é do sistema, não um texto do layout ao qual se aplica `text-white`. O `bg-sky-700` padrão é `#0369a1`; contra branco `#ffffff` o contraste calculado é aproximadamente 5,93:1, superior a 3:1, **somente quando essa cor estiver realmente por trás da barra**.

**Alternatives considered**: Apenas `text-white` no cabeçalho não altera os indicadores nativos. Confiar somente no fundo do cabeçalho não garante a cor da área da barra em iOS ou Android transparente/edge-to-edge. Uma dependência adicional ou ajustes nativos antecipados não são necessários para iniciar a implementação.

**Platform risks**: O fundo nativo pode ser limitado ou ignorado em Android com edge-to-edge; quando isso ocorrer, a superfície do aplicativo precisa cobrir a região adequada. A barra web não é controlável pelo aplicativo. Não declarar conformidade visual sem conferir o dispositivo; se o sistema não permitir controle, preservar a aparência disponível conforme FR-009.

**Sources**: `package.json`; definições instaladas em `node_modules/expo-status-bar/build/StatusBar.types.d.ts`; [documentação Expo StatusBar](https://docs.expo.dev/versions/latest/sdk/status-bar/); [React Native StatusBar](https://reactnative.dev/docs/statusbar). A documentação pública atual pode diferir do SDK 51; as propriedades acima foram conferidas na versão instalada.

## 4. Layout e verificação

**Decision**: Usar linha flexível com ícone de tamanho fixo e texto que possa quebrar; verificar a 320 pontos lógicos. Efetuar verificação manual, incluindo dado inesperado em cópia descartável do banco e navegação entre telas.

**Rationale**: O nome pode ser longo e o projeto proíbe testes automatizados. A tabela atual exige `gender NOT NULL`, mas não impõe `CHECK` dos valores; um valor não reconhecido pode ser preparado em uma cópia de teste sem alterar o esquema de produção.

**Alternatives considered**: Truncar o nome não satisfaz a legibilidade especificada. Alterar dados reais ou enfraquecer o esquema apenas para verificar o fallback é desnecessário.

**Open clarifications**: Nenhuma; os detalhes de posicionamento da superfície dependem de validação em plataforma durante a implementação.