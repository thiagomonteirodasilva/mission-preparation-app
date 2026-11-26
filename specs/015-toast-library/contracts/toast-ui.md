# UI Contract: Confirmação e erros

## Confirmação de sucesso

| Entrada | Pré-condição | Resultado observável |
|---------|--------------|----------------------|
| Criar unidade | Nome válido; persistência concluída | Retorno existente à tela anterior e “Salvo com sucesso” no rodapé, verde, durante 3 segundos. |
| Editar unidade | Unidade carregada e nome válido; persistência concluída | Retorno existente à tela anterior e mesma confirmação no rodapé. |
| Cadastrar jovem | Unidade e dados válidos; persistência concluída | Retorno existente à tela anterior e mesma confirmação. |
| Salvar perfil | Perfil e dados válidos; persistência concluída | Mesma confirmação no rodapé da tela atual, inclusive com rolagem. |
| Adicionar relato | Relato válido; persistência concluída | Mesma confirmação no rodapé da tela atual. |
| Concluir outro salvamento durante confirmação | Salvamento válido concluído | Uma única confirmação é visível e o prazo de 3 segundos recomeça. |

O texto deve ser legível, um ícone de check visível deve aparecer junto à mensagem nos cinco fluxos e o fundo deve reproduzir `bg-emerald-600`. Sem erro subsequente, a confirmação deve desaparecer automaticamente após 3 segundos, com tolerância de 0,5 segundo na aferição manual.

## Falhas

- Validação inválida ou falha de persistência: ocultar qualquer confirmação de sucesso anterior e não disparar outra; manter as mensagens existentes e indicar explicitamente falhas de persistência ainda não tratadas.
- Nome de unidade vazio ou somente com espaços: exibir mensagem de nome obrigatório, sem salvar nem navegar, ocultando qualquer confirmação anterior.
- Falha de validação, carregamento ou salvamento da unidade em edição: ocultar qualquer confirmação anterior e manter a indicação de erro na tela.
- Falha de carregamento do perfil: ocultar qualquer confirmação anterior e exibir exatamente “Não foi possível exibir as informações do jovem. Tente novamente” antes do retorno à tela anterior após aproximadamente 2 segundos; não apresentar a falha como sucesso.
- Cabeçalho e comportamento de voltar permanecem inalterados.