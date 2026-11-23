# UI Contract: Lista de Jovens e Barra de Status

## Lista nas unidades

**Entrada**: Unidade expandida e lista de jovens, cada um com identificador, nome, idade e sexo registrado.

**Saída e comportamento**:

| Condição | Resultado |
|----------|-----------|
| `gender = male` | Exibir rosto masculino junto a nome e idade. |
| `gender = female` | Exibir rosto feminino distinto junto a nome e idade. |
| `gender` ausente ou inesperado | Exibir ícone neutro, mantendo nome, idade e ação da entrada. |
| Unidade sem jovens | Preservar a mensagem existente, sem entradas fictícias. |
| Seleção de uma entrada | Abrir o perfil identificado pelo `id` da própria entrada. |
| Sexo salvo no perfil e retorno | Recarregar a lista e apresentar o ícone correspondente ao valor salvo. |

A 320 pontos lógicos, o nome pode quebrar em linhas, mas ícone, nome e idade não devem sobrepor-se nem ser cortados pelo ícone. A ordem e a expansão existentes são preservadas.

## Barra de status

**Entrada**: Qualquer tela do aplicativo em plataforma com barra de status visível.

**Saída**: Quando houver controle disponível, indicadores brancos sobre fundo efetivo com contraste mínimo 3:1; títulos, fundo da barra superior e navegação existentes permanecem intactos. Quando o sistema não oferecer controle, preservar sua apresentação e não impedir a navegação.

**Limites**: A web não oferece controle da barra de status do sistema; a verificação nativa considera transparência e área segura, não apenas a cor declarada do cabeçalho.