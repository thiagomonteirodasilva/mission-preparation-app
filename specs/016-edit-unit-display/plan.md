# Implementation Plan: Preservar a exibição de Editar Unidade

**Branch**: `main` | **Date**: 2026-11-26 | **Spec**: [spec.md](spec.md)

**Input**: Especificação em `specs/016-edit-unit-display/spec.md`. O setup identificou `016-edit-unit-display` como identificador da funcionalidade; a branch Git efetiva é `main`.

## Summary

Avaliar a remoção da stack específica de `[unitId]`, preservando integralmente a edição e o restante da navegação. Como o Expo Router instalado promove filhos de diretórios sem layout para o layout ancestral mais próximo, a alternativa preferida é registrar `units/[unitId]/edit` diretamente na stack raiz, com o título atual, e eliminar o ajuste de título que depende do navegador pai. A retirada só será mantida se os cenários manuais comprovarem paridade; caso contrário, preservar o layout e registrar a justificativa. Nenhuma alteração de dados ou dependências está prevista.

## Technical Context

**Language/Version**: TypeScript `^5.5.0`; React `18.2.0`; React Native `0.74.5`.

**Primary Dependencies**: Expo `~51.0.28`, Expo Router `~3.1.0` (instalado `3.1.2`), NativeWind `^4.0.0` e `react-native-toast-message` `2.5.2`; sem novas dependências.

**Storage**: SQLite local existente, acessado pelo repositório; nenhum ajuste de esquema ou migração.

**Testing**: Verificação manual conforme a constituição; `npm run typecheck` como verificação estática, sem adicionar ou executar testes automatizados.

**Target Platform**: Aplicativo Expo para Android e iOS, com inicialização em Android obrigatória durante `/speckit-implement`; registrar ausência de dispositivo ou emulador sem declarar verificação concluída.

**Project Type**: Aplicativo móvel com navegação baseada em arquivos e persistência local.

**Performance Goals**: Preservar as indicações e a experiência de carregamento e salvamento existentes; nenhum novo objetivo numérico de desempenho foi solicitado.

**Constraints**: Não alterar rota pública de edição, dados, regras, textos ou aparência; manter apenas uma barra superior `bg-sky-700`, retorno previsível e confirmação compartilhada; não criar testes automatizados.

**Scale/Scope**: Uma tela de edição e sua ligação com a lista de unidades, navegação e repositório; outras telas devem continuar funcionando.

## Constitution Check

**Antes da pesquisa — aprovado para planejamento:**

| Princípio | Aplicação ao plano |
|-----------|--------------------|
| I. Clareza | Mudanças localizadas e remoção de código de navegação redundante quando comprovadamente segura. |
| II. Simplicidade | Preferir a stack raiz existente; sem abstrações ou dependências novas. Preservar o layout se a alternativa não mantiver a paridade. |
| III. Responsabilidades | Navegação continua na camada de telas; regras e persistência permanecem no repositório existente. |
| IV. Erros explícitos | Manter carregamento, validação, falhas e feedback de sucesso como documentados. |
| V. Verificação manual | Executar e registrar cenários válidos, inválidos e falhas reproduzíveis; não criar testes automatizados. |
| VI. Inglês no código | Manter identificadores e comentários técnicos em inglês; textos de interface permanecem em português. |
| VII. Navegação consistente | Preservar título, `bg-sky-700` e retorno, incluindo a ausência de histórico. |

**Após o design — aprovado condicionalmente:** os artefatos não introduzem violações. A implementação depende de evidência manual, de verificação de outras telas e da inicialização Android; falhas ou limitações não são consideradas aprovações. Não é necessária exceção à constituição.

## Project Structure

### Documentation (this feature)

```text
specs/016-edit-unit-display/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── edit-unit-ui.md
└── tasks.md             # futura saída de /speckit-tasks
```

### Source Code (repository root)

```text
app/
├── _layout.tsx                # stack raiz, barra superior e toast global
├── index.tsx                  # lista atualizada ao recuperar foco
└── units/[unitId]/
    ├── _layout.tsx            # stack aninhada, candidata à remoção
    └── edit.tsx               # formulário e dependência atual do navegador pai
components/
├── UnitAccordion.tsx          # entrada para edição
└── SaveToast.tsx              # confirmação e ocultação em erro
db/
├── repository.ts              # leitura e atualização da unidade
└── schema.ts                  # esquema existente, sem alterações planejadas
types/index.ts                 # entidades existentes
```

**Structure Decision**: Alterar somente os arquivos de navegação necessários para a solução validada. A rota de entrada e o formulário permanecem no mesmo endereço; o repositório e os dados permanecem inalterados. Evitar criar `index.tsx` ou um wrapper substituto.

## Phase 0: Research

Consultar [research.md](research.md) para a promoção da rota ao navegador raiz, mudança de título, riscos do histórico e alternativas. Nenhuma questão de produto está pendente; o comportamento real de execução permanece sujeito à validação manual, não presumido como aprovado.

## Phase 1: Design and Implementation Approach

1. Registrar a linha de base manual da navegação, título, formulário, confirmação e vínculos em duas unidades, incluindo uma com jovens.
2. Avaliar a alternativa sem o layout aninhado: apontar a configuração da stack raiz para `units/[unitId]/edit`, preservar exatamente o título `Editar Unidade` e substituir/remover a lógica que altera as opções do navegador pai, evitando efeitos em outras telas.
3. Preservar `unitId`, `router.push`, regras de formulário, atualização, toast e retorno; conferir a ausência de avisos de rota e de cabeçalhos duplicados.
4. Executar [quickstart.md](quickstart.md), incluindo rotas excepcionais quando viáveis, regressão de outras telas e Android. Documentar resultados observados e limitações.
5. Se a alternativa não preservar algum comportamento, restaurar a estrutura original e registrar a causa e a decisão; não afirmar que a remoção foi validada sem evidência.

Os contratos estão em [contracts/edit-unit-ui.md](contracts/edit-unit-ui.md) e o modelo em [data-model.md](data-model.md).

## Complexity Tracking

Nenhuma violação constitucional ou complexidade adicional está prevista.