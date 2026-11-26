# Data Model: Editar Unidade

## Unidade

Representada por `Unit` e persistida em `units`:

| Campo | Tipo | Regra |
|-------|------|-------|
| `id` | texto | Identificador estável e chave primária; seleciona a unidade editada. |
| `name` | texto | Obrigatório após remoção de espaços externos; único campo atualizado nesta operação. |
| `createdAt` | texto | Data de criação existente; não é modificada pela edição. |

## Jovem

Representado por `Young` e persistido em `youngs`. `unitId` referencia `Unit.id`; nome, idade, gênero e datas são dados existentes fora do escopo de edição da unidade. A atualização do nome não deve alterar os jovens nem seus vínculos.

## Estado transitório da tela

- **Carregando**: unidade ainda não disponível; campo e salvamento desabilitados, com indicação de carregamento.
- **Pronta**: unidade encontrada; nome preenchido, campo e salvamento disponíveis.
- **Inválida**: nome vazio após remoção de espaços; exibir erro e manter entrada e tela.
- **Salvando**: campo e botão desabilitados; indicar salvamento.
- **Sucesso**: persistência concluída; exibir confirmação e retornar, permitindo a recarga da lista.
- **Falha de carregamento**: mensagem de erro e edição/salvamento desabilitados.
- **Falha de salvamento**: mensagem de erro, entrada preservada e tela mantida; nenhuma confirmação de sucesso.

**Alterações de persistência**: nenhuma tabela, campo, migração ou regra nova é necessária.