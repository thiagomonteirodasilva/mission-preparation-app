# Implementation Plan: Ícones de Jovens e Contraste da Barra de Status

**Branch**: `main` | **Date**: 2026-11-23 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/013-young-icons-status-bar/spec.md`

## Summary

Na lista de jovens das unidades expandidas, apresentar rostos distintos conforme o sexo registrado e um ícone neutro para dados inesperados, mantendo nome, idade e abertura do perfil. Definir o conteúdo da barra de status como branco para as telas do aplicativo e assegurar fundo contrastante, respeitando as limitações de cada plataforma. Reutilizar dependências existentes e verificar os fluxos manualmente.

## Technical Context

**Language/Version**: TypeScript ^5.5.0; React 18.2.0.

**Primary Dependencies**: Expo ~51.0.28, React Native 0.74.5, Expo Router ~3.1.0, `@expo/vector-icons` ^14.0.3, `expo-status-bar` ~1.2.0, NativeWind ^4.0.0 e Tailwind CSS ^3.4.7; todas já declaradas.

**Storage**: SQLite local existente; sem migração ou mudança de dados.

**Testing**: Verificação manual dos fluxos e de casos de borda, mais `npm run typecheck`; a constituição proíbe testes automatizados. A execução posterior de `/speckit-implement` deve iniciar com `expo start --android` e confirmar o lançamento no Android ou registrar a indisponibilidade sem declarar a verificação concluída.

**Target Platform**: Android e iOS; web não expõe controle da barra de status do sistema. Restrições de versão e área segura devem ser verificadas nos dispositivos disponíveis.

**Project Type**: Aplicativo móvel Expo Router com persistência local.

**Performance Goals**: Preservar a navegação e a atualização já existentes; não há meta de desempenho nova na especificação.

**Constraints**: Ícones e texto legíveis a 320 pontos lógicos; branco sobre fundo com contraste mínimo 3:1; sem dependências novas ou mudanças de cadastro; o controle da barra pode ser limitado pelo sistema operacional.

**Scale/Scope**: Lista de jovens dentro das unidades na tela inicial e barra de status nas telas existentes; sem alterações no esquema ou nos fluxos de gestão.

## Constitution Check

**Antes da pesquisa — aprovado:**

| Princípio | Verificação |
|-----------|-------------|
| I e II — clareza e simplicidade | Seleção direta de três ícones e ajuste localizado, sem abstrações antecipadas. |
| III e IV — responsabilidades e previsibilidade | A lista controla a representação; a barra global fica no layout; valores inesperados recebem ícone neutro, sem alterar dados. |
| V — verificação manual | Guia cobre fluxos, caso inválido, responsividade e plataformas; não criar testes automatizados. |
| VI — inglês no código | Manter nomes e comentários técnicos em inglês; textos de interface podem permanecer em português. |
| VII — navegação | Preservar a barra superior com `bg-sky-700`, títulos e botões de retorno existentes. |
| Restrições e fluxo | Reutilizar dependências; registrar verificação manual e execução Android obrigatória na implementação. |

**Após o desenho — aprovado:** Nenhuma exceção identificada. A alternativa para dados inválidos é visual e não altera as regras de persistência; a solução para contraste deve preservar cabeçalho, áreas seguras e navegação. Confirmação em dispositivos é uma condição de conclusão da implementação, não um resultado já alcançado pelo planejamento.

## Project Structure

### Documentation (this feature)

```text
specs/013-young-icons-status-bar/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui.md
└── tasks.md              # fase posterior, ainda não criado
```

### Source Code (repository root)

```text
app/
├── _layout.tsx           # layout global, cabeçalho e barra de status
├── index.tsx             # recarregamento das unidades ao recuperar foco
├── units/                # rotas de cadastro e edição de unidade
└── young/                # cadastro e perfil de jovem
components/
└── UnitAccordion.tsx     # lista efetivamente renderizada e links de perfil
db/
├── repository.ts         # leitura e atualização existentes
└── schema.ts             # esquema existente, sem migração prevista
types/index.ts            # entidade Young existente
```

**Structure Decision**: Alterar diretamente a lista usada em `UnitAccordion.tsx` e a configuração global em `app/_layout.tsx`; não depender de `YoungListItem.tsx`, que atualmente não é usado nessa tela. Manter a atualização existente por foco em `app/index.tsx`. Adaptações de área segura devem ficar localizadas e preservar o comportamento de navegação.

## Implementation Approach

1. Usar `MaterialIcons` já utilizado no aplicativo, com `face` e `face-3` e a opção neutra `account-circle`, conforme preferência posterior do usuário; confirmar a aparência visual no dispositivo. Selecionar por comparação explícita dos dois valores, com fallback neutro para qualquer outro.
2. Na entrada existente, organizar ícone e texto em linha com área de texto flexível, permitindo quebra do nome e mantendo nome, idade e link de perfil. Não introduzir dependência ou componente genérico sem necessidade.
3. Configurar `StatusBar` de `expo-status-bar` com `style="light"` no layout global; usar `bg-sky-700` para a superfície aplicável atrás da barra e, quando apropriado, a propriedade Android `backgroundColor`. Conferir a superfície real sob a barra em cada plataforma, inclusive transparência e edge-to-edge; não assumir que o fundo do cabeçalho cobre a barra. Ajustar área segura/superfície se necessário, sem prejudicar título ou retorno. A propriedade nativa, não uma classe de texto, controla a cor dos indicadores.
4. Executar os cenários em [quickstart.md](quickstart.md), incluindo recarga após edição, nome longo, dado inesperado, tela vazia, rotas e contraste. Registrar dispositivos e limitações reais; aplicar a exigência Android da constituição durante a implementação.

## Complexity Tracking

Nenhuma violação constitucional ou complexidade excepcional prevista.