# Implementation Plan: Botão Nova Unidade em Largura Total

**Branch**: `012-nova-unidade-button` | **Date**: 2026-11-18 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from [spec.md](spec.md)

## Summary

Atualizar o botão de criação de unidade da tela inicial para exibir “Nova Unidade” e preencher a largura disponível da área de conteúdo. Ao acioná-lo, a pessoa usuária abre a tela de unidades e mantém acesso ao fluxo de criação existente. A implementação deve reutilizar as classes utilitárias já disponíveis no projeto, remover o layout de linha desnecessário do contêiner externo e preservar o ícone e a navegação atual. Não há alteração de dados nem nova dependência.

## Technical Context

**Language/Version**: TypeScript 5.5, React Native 0.74.5, Expo SDK 51

**Primary Dependencies**: Expo Router 3.1, NativeWind 4, Tailwind CSS 3.4, `@expo/vector-icons`

**Storage**: N/A; a funcionalidade não modifica persistência nem dados existentes.

**Testing**: Verificação manual obrigatória; testes automatizados são proibidos pela constituição do projeto.

**Target Platform**: Aplicativo móvel Expo; validação de inicialização no Android e apresentação em largura de referência de 320 pontos lógicos.

**Project Type**: Aplicativo móvel React Native com Expo Router.

**Performance Goals**: Sem impacto mensurável esperado; mudança restrita à apresentação de um controle existente.

**Constraints**: Reutilizar NativeWind/Tailwind existente; manter a navegação atual para a tela de unidades; validar a apresentação a 320 pontos lógicos; não adicionar dependências nem testes automatizados; preservar a área de espaçamento já aplicada ao conteúdo.

**Scale/Scope**: Um botão na tela inicial, sem mudanças no modelo de dados, em outras telas ou no fluxo de navegação.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Constraint | Assessment |
|---|---|
| I. Código claro e legível | PASS — mudança localizada no botão existente, sem abstrações novas. |
| II. Simplicidade antes de abstração | PASS — reutiliza dependências e utilitários já presentes. |
| III. Responsabilidades e dependências explícitas | PASS — alteração restrita à apresentação na tela inicial; nenhum novo acoplamento. |
| IV. Comportamento previsível e erros explícitos | PASS — mantém o mesmo `Link` e destino; não altera tratamento de dados/erros. |
| V. Verificação manual proporcional | PASS — guia manual incluído; nenhuma suíte ou teste automatizado será adicionado. |
| VI. Inglês no código-fonte | PASS — nomes técnicos existentes permanecem em inglês; rótulo português é texto de interface. |
| VII. Navegação consistente | PASS — não altera top bar nem navegação; a ação continua levando à lista de unidades. |
| Restrições do projeto | PASS — sem dependências, infraestrutura ou mudança de dados adicionais. |

**Gate result before research**: PASS. **Gate result after design**: PASS — os artefatos mantêm a mudança mínima, sem exceções à constituição.

## Project Structure

### Documentation (this feature)

```text
specs/012-nova-unidade-button/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── index.tsx                # Botão de criação de unidade na tela inicial
└── units/
    └── index.tsx            # Destino de navegação atual
components/
└── UnitAccordion.tsx        # Conteúdo existente da lista na tela inicial
tailwind.config.js           # Configuração NativeWind/Tailwind existente
```

**Structure Decision**: Aplicativo Expo Router existente; a mudança de interface fica em `app/index.tsx`. `app/units/index.tsx` e `components/UnitAccordion.tsx` são referências para confirmar que os fluxos existentes continuam intactos, não alvos de alteração.
