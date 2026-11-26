# Data Model: Confirmação de salvamento

## Escopo

Não há nova entidade persistente, migração ou alteração no esquema SQLite. Unidade, jovem e relato continuam com as regras e relações existentes. O modelo abaixo descreve apenas estado transitório de interface.

## Confirmação de sucesso transitória

| Atributo | Regra |
|----------|-------|
| Mensagem | Exatamente “Salvo com sucesso”. |
| Estado | Oculta ou visível; no máximo uma confirmação visível. |
| Posição | Parte inferior visível da tela, independente da rolagem. |
| Aparência | Fundo equivalente a `bg-emerald-600`, texto legível e ícone de check visível junto à mensagem. |
| Duração | 3000 ms com ocultação automática. |
| Origem | Criação/edição de unidade, cadastro/edição de jovem ou inclusão de relato concluída. |

**Transições**: oculta → visível após sucesso; visível → visível com o tempo reiniciado após outro sucesso; visível → oculta após o tempo expirar ou quando ocorre validação inválida, falha de salvamento ou falha de carregamento. Retorno automático após sucesso não encerra a confirmação. Falha ou validação inválida não cria confirmação de sucesso.

## Erro de carregamento de perfil

Estado transitório local com a mensagem “Não foi possível exibir as informações do jovem. Tente novamente”. Após aproximadamente 2000 ms, retorna à tela anterior; a mensagem deixa de ser exibida com a tela. É independente do estado de sucesso e não representa dados persistidos. Falhas e validações de salvamento mantêm as indicações existentes ou recebem indicação explícita quando ainda ausente.