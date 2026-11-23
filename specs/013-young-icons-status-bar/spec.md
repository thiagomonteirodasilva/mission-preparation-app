# Feature Specification: Ícones de Jovens e Contraste da Barra de Status

**Feature Branch**: Não criada por esta especificação

**Created**: 2026-11-23

**Status**: Ready for planning

**Input**: User description: "Na tela de unidades, na exibição de jovens, coloque o ícone de um homem para um jovem do sexo masculino, e o ícone de uma mulher para um jovem do sexo feminino. Se possível, que seja somente o rosto. E aproveite para mudar a cor da fonte da status bar para branco. Se possível, use alguma classe do Tailwind pra isso. O preto não dá um contraste legal."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identificar jovens na lista de unidades (Priority: P1)

Ao expandir uma unidade na tela inicial, a pessoa usuária identifica visualmente cada jovem por um ícone correspondente ao sexo registrado, sem perder as informações e ações já disponíveis.

**Why this priority**: A identificação visual facilita a leitura da lista e atende ao principal pedido de mudança na exibição dos jovens.

**Independent Test**: Abrir uma unidade com jovens dos dois sexos, comparar os ícones com os dados registrados e abrir o perfil de cada jovem.

**Acceptance Scenarios**:

1. **Given** uma unidade expandida contém um jovem com sexo masculino registrado, **When** a lista é exibida, **Then** a entrada apresenta um ícone de homem junto ao nome e à idade.
2. **Given** uma unidade expandida contém uma jovem com sexo feminino registrado, **When** a lista é exibida, **Then** a entrada apresenta um ícone de mulher junto ao nome e à idade, visualmente distinto do ícone masculino.
3. **Given** uma entrada de jovem está visível, **When** a pessoa usuária a seleciona, **Then** o perfil correspondente é aberto como antes.
4. **Given** o sexo de um jovem foi alterado e salvo no perfil, **When** a pessoa usuária retorna à lista, **Then** o ícone corresponde ao sexo atualizado.

### User Story 2 - Ler a barra de status com contraste (Priority: P2)

Ao usar qualquer tela do aplicativo, a pessoa usuária consegue ler as informações da barra de status porque seus elementos aparecem em branco sobre um fundo contrastante.

**Why this priority**: O contraste melhora a leitura contínua das informações do dispositivo durante a navegação.

**Independent Test**: Abrir a tela inicial e navegar pelas demais telas disponíveis, observando a cor e a legibilidade das informações da barra de status.

**Acceptance Scenarios**:

1. **Given** a aplicação está aberta em uma tela, **When** a barra de status é visível e o dispositivo permite controlar sua aparência, **Then** o texto e os ícones da barra aparecem em branco sobre um fundo com contraste suficiente para leitura.
2. **Given** a pessoa usuária navega entre a tela inicial e as demais telas, **When** cada tela é exibida, **Then** a apresentação branca e legível da barra de status é mantida, sem alterar a navegação existente.

### Edge Cases

- Uma unidade sem jovens continua mostrando a mensagem existente de lista vazia, sem ícones de jovens fictícios.
- Se o sexo estiver ausente ou for inesperado em um registro, a entrada continua visível e acionável com um ícone neutro, sem atribuir um dos dois sexos.
- Nomes longos e telas estreitas mantêm o nome, a idade e o ícone legíveis, sem sobreposição ou corte causado pelo ícone.
- Caso o dispositivo não permita controlar a cor da barra de status, a aparência definida pelo dispositivo é preservada e as demais funcionalidades permanecem disponíveis.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Para cada jovem com sexo masculino em uma unidade expandida, a lista MUST apresentar um ícone de homem junto à respectiva entrada.
- **FR-002**: Para cada jovem com sexo feminino em uma unidade expandida, a lista MUST apresentar um ícone de mulher, visualmente distinto do ícone masculino, junto à respectiva entrada.
- **FR-003**: Os ícones MUST representar preferencialmente apenas o rosto; se não houver representações adequadas disponíveis, MUST representar claramente homem e mulher de outra forma.
- **FR-004**: A lista MUST continuar exibindo nome e idade e permitindo abrir o perfil correto ao selecionar cada entrada.
- **FR-005**: Após uma alteração de sexo ser salva, a lista MUST apresentar o ícone correspondente quando for exibida novamente.
- **FR-006**: Um registro com sexo ausente ou inesperado MUST continuar visível e acionável com um ícone neutro, sem ser apresentado como masculino ou feminino.
- **FR-007**: Em uma largura de 320 pontos lógicos, cada entrada MUST manter ícone, nome e idade legíveis, sem sobreposição ou corte causado pelo ícone; o nome pode ocupar mais de uma linha.
- **FR-008**: Em todas as telas, quando o dispositivo permitir controlar a aparência da barra de status, o texto e os ícones dessa barra MUST ser brancos e ter contraste de pelo menos 3:1 com o fundo adjacente.
- **FR-009**: Se o dispositivo não permitir controlar a cor da barra de status, a aparência definida pelo dispositivo MUST ser preservada sem impedir o uso das telas.
- **FR-010**: A mudança MUST preservar a expansão das unidades, a mensagem de unidade vazia e a navegação existente entre as telas.
- **FR-011**: A verificação MUST ser manual e cobrir os dois sexos, a atualização do sexo, a unidade vazia, a seleção de uma entrada, uma tela estreita e a barra de status nas telas disponíveis.

### Key Entities

- **Jovem**: Pessoa vinculada a uma unidade, identificada na lista por nome e idade e com sexo registrado utilizado para selecionar o ícone.
- **Unidade**: Agrupamento de jovens cuja lista é exibida quando a unidade é expandida.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em todas as entradas verificadas com sexo masculino ou feminino, o ícone corresponde ao sexo registrado e é distinto do ícone do outro sexo.
- **SC-002**: Em todas as verificações de abertura de perfil e de retorno após alterar o sexo, a entrada selecionada abre o perfil correto e apresenta o ícone atualizado.
- **SC-003**: Em todas as telas verificadas nos dispositivos que permitem controle da barra de status, os elementos da barra são brancos e apresentam contraste mínimo de 3:1 com o fundo adjacente.
- **SC-004**: Em uma tela de 320 pontos lógicos, 100% das entradas verificadas mantêm ícone, nome e idade legíveis, sem sobreposição ou corte causado pelo ícone.

## Assumptions

- A tela de unidades referida no pedido é a tela inicial que apresenta unidades expansíveis e os jovens de cada unidade.
- O cadastro atual oferece os valores masculino e feminino; dados ausentes ou inesperados são tratados de modo neutro, sem alterar os registros.
- A preferência por rostos é atendida quando houver representações adequadas disponíveis; caso contrário, representações de pessoa claramente distinguíveis são aceitáveis.
- A preferência por uma classe de estilo existente para a barra de status será considerada no planejamento quando a plataforma permitir; ela não se sobrepõe à legibilidade.
- A cor branca da barra de status aplica-se a todas as telas do aplicativo, sujeita às possibilidades do dispositivo; não há mudanças em dados, regras de cadastro ou fluxos fora da apresentação descrita.
- A verificação segue a constituição do projeto e é manual, sem introduzir testes automatizados.