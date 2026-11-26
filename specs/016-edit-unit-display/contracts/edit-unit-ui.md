# UI Contract: Editar Unidade

## Entrada e navegação

- A ação `Editar Unidade` de uma unidade abre `/units/[unitId]/edit` com o identificador da unidade selecionada.
- A tela exibe uma única barra superior azul `bg-sky-700`, título `Editar Unidade` e botão acessível `Voltar`. O botão retorna à tela anterior; se não houver histórico, retorna à tela inicial.
- Voltar antes de salvar não persiste alterações. A navegação de outras telas deve continuar apresentando seus próprios títulos e retorno.

## Formulário e operações

- Ao carregar, exibir `Carregando unidade...` e desabilitar campo e botão. Quando a unidade for encontrada, apresentar seu nome no campo acessível `Nome da unidade` e disponibilizar `Salvar`.
- Para nome vazio ou só espaços, exibir `Nome da unidade é obrigatório.`, permanecer na edição e não alterar os dados.
- Nome válido é salvo sem espaços externos; durante a operação, campo e botão ficam desabilitados e a ação exibe `Salvando...`.
- Em sucesso, apresentar `Salvo com sucesso`, voltar e exibir o nome atualizado na lista; os jovens permanecem vinculados.
- Em erro de carregamento, informar a causa e desabilitar o formulário; em erro de salvamento, manter texto e tela, mostrar o erro e ocultar qualquer confirmação de sucesso anterior.
- Mensagens de carregamento existentes: `Unidade não informada.`, `Unidade não encontrada.` e `Não foi possível carregar a unidade.`. Falhas de salvamento exibem a mensagem disponível ou `Não foi possível salvar a unidade.`.

## Dados e escopo

Apenas o nome da unidade selecionada pode ser modificado. A estrutura de dados, as outras unidades e os jovens vinculados permanecem inalterados; consulte [data-model.md](../data-model.md).