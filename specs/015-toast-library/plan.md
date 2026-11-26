# Implementation Plan: Confirmação de salvamento com biblioteca de toast

**Branch**: `main` | **Date**: 2026-11-26 | **Spec**: [spec.md](spec.md)

**Input**: Especificação da funcionalidade em `specs/015-toast-library/spec.md`. O setup retornou `015-toast-library` como identificador de funcionalidade; o ramo Git efetivo é `main`.

## Summary

Usar `react-native-toast-message` para um único toast de sucesso global, com mensagem “Salvo com sucesso”, ícone de check, posição inferior, duração de 3000 ms e apresentação em `bg-emerald-600`. Integrar os cinco fluxos de criação/edição de unidades, cadastro/edição de jovem e inclusão de relato sem alterar retornos automáticos, ocultar qualquer confirmação anterior diante de erro e manter separadamente a mensagem e o retorno de erro de carregamento do perfil. Validar manualmente os fluxos, ícone, navegação e timer reiniciado.

## Technical Context

**Language/Version**: TypeScript `^5.5.0`, React 18.2.0, modo estrito.

**Primary Dependencies**: Expo `~51.0.28`, Expo Router `~3.1.0`, React Native `0.74.5`, NativeWind `^4.0.0`, Tailwind CSS `^3.4.7`; adicionar `react-native-toast-message` 2.5.2, versão pesquisada, com tipos próprios e peers sem restrição de versão. Verificar instalação e compatibilidade real na implementação.

**Storage**: SQLite existente; sem alteração de esquema ou persistência.

**Testing**: verificação manual proporcional; `npm run typecheck` como verificação estática, sem adicionar testes automatizados.

**Target Platform**: aplicativo Expo para Android e iOS, com entrada web existente; verificação Android obrigatória durante `/speckit-implement`.

**Project Type**: aplicativo móvel com navegação por telas.

**Performance Goals**: toast visível por 3 segundos, tolerância de 0,5 segundo nas verificações manuais; sem atrasar o retorno automático.

**Constraints**: mensagem e verde existentes; ícone de check legível; um toast por vez; preservação de erros e navegação; não adicionar testes automatizados; identificadores em inglês.

**Scale/Scope**: cinco ações de salvamento em quatro telas consumidoras, mais a falha de carregamento de perfil; uma instância global.

## Constitution Check

*GATE: Avaliado antes da pesquisa e após o desenho.*

| Princípio | Avaliação antes e após o desenho |
|-----------|----------------------------------|
| I — Código claro | PASSA: configuração e funções curtas, sem lógica de negócio no componente visual. |
| II — Simplicidade | PASSA: uma dependência explicitamente solicitada e justificada pela padronização do toast; sem fila ou camadas adicionais desnecessárias. |
| III — Responsabilidades | PASSA: apresentação centralizada; as telas continuam responsáveis por salvamento, validação e navegação. |
| IV — Erros explícitos | PASSA: sucesso apenas após conclusão; preservar mensagens de erro, cobrindo explicitamente falhas de persistência atualmente sem tratamento local. |
| V — Verificação manual | PASSA: sem testes automatizados; registrar resultados dos casos válidos, inválidos e de falha. |
| VI — Inglês no código | PASSA: novos identificadores e comentários em inglês; textos de interface em português. |
| VII — Navegação | PASSA: preservar cabeçalhos, botão de voltar e `bg-sky-700`, sem criar telas nem retardar `router.back()`. |
| Fluxo Android | PASSA NO DESENHO: executar `expo start --android` na implementação e registrar a limitação caso não haja emulador ou dispositivo; não declarar verificação Android concluída nesse caso. |

Nenhuma violação não justificada ou questão em aberto identificada. Os gates descrevem a conformidade planejada, não uma verificação de execução já realizada.

## Project Structure

### Documentation (this feature)

```text
specs/015-toast-library/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── toast-ui.md
└── tasks.md              # fase posterior; não criado neste planejamento
```

### Source Code (repository root)

```text
app/
├── _layout.tsx           # instância global após a Stack
├── units/index.tsx       # criação de unidade
├── units/[unitId]/edit.tsx # edição de unidade
└── young/
    ├── new.tsx           # criação de jovem
    └── [youngId].tsx     # edição, relato e erro de carregamento
components/
└── SaveToast.tsx         # configuração e apresentação compartilhadas
package.json              # dependência solicitada
package-lock.json         # resolução correspondente
```

**Structure Decision**: manter a estrutura Expo Router existente. `SaveToast` será responsável pelo layout/configuração de sucesso compartilhado, com uma instância da biblioteca no layout raiz. As cinco telas/ações disparam o toast imperativo após o salvamento; removem estados e temporizadores locais de sucesso quando existentes. Falhas permanecem visíveis localmente durante o retorno aplicável, sem persistir como sucesso global.

## Phase 0: Research

Decisões, alternativas, evidências e restrições estão em [research.md](research.md). Não restam questões técnicas bloqueantes; a compatibilidade efetiva depende da instalação e verificação manual na implementação.

## Phase 1: Design

1. Instalar a biblioteca e atualizar o lockfile, verificando resolução e tipos.
2. Renderizar uma única instância global após a `Stack`; configurar o layout de sucesso com elementos nativos e `className="bg-emerald-600"`, texto branco e posição inferior. A biblioteca permite [layouts personalizados](https://github.com/calintamas/react-native-toast-message/blob/v2.5.2/docs/custom-layouts.md): incluir um ícone de check visível junto à mensagem usando `MaterialIcons` de `@expo/vector-icons`, já existente no projeto, sem nova dependência. Usar `visibilityTime: 3000` e ocultação automática.
3. Atualizar os cinco pontos de sucesso, incluindo edição de unidade; invocar a biblioteca somente após a persistência concluir, mantendo os `router.back()` existentes. Não usar timers locais de sucesso, para evitar que um timer antigo encerre uma confirmação recente.
4. Preservar mensagem e retorno após 2000 ms na falha de carregamento, com estado local de erro independente do toast de sucesso. Ocultar o toast de sucesso global ao detectar validação inválida ou falha de salvamento ou carregamento. Manter validações e mensagens existentes; indicar explicitamente falhas de salvamento e nome de unidade vazio sem alterar a regra que impede o salvamento ou a navegação.
5. Realizar as verificações em [quickstart.md](quickstart.md), incluindo repetição, troca de rota, rolagem, falhas com toast anterior visível e inicialização Android; em cada um dos quatro fluxos, conferir também o ícone de check e a legibilidade da mensagem. Registrar os resultados.

Modelo de estado e contrato: [data-model.md](data-model.md) e [contracts/toast-ui.md](contracts/toast-ui.md).

## Complexity Tracking

Nenhuma violação constitucional prevista. A única dependência adicional é uma exigência expressa da funcionalidade; não há introdução de infraestrutura ou abstração antecipatória.