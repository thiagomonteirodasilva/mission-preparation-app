<!--
Sync Impact Report
- Version change: 1.3.0 -> 1.4.0
- Modified principles: none
- Added sections: none
- Removed sections: none
- Expanded sections: Development Workflow (required Android launch check for
  Speckit implementation tasks)
- Follow-up TODOs: RATIFICATION_DATE remains TODO because the original adoption
  date is not available.
-->

# Todo Constitution

## Core Principles

### I. Código Claro e Legível
Todo código MUST ser fácil de ler, nomear conceitos pelo domínio e manter funções
curtas, coesas e com uma única responsabilidade. Nomes ambíguos, comentários que
repetem o código e abstrações que escondem operações simples MUST NOT ser
introduzidos. A clareza reduz o custo de manutenção e torna o comportamento
verificável durante a revisão.

### II. Simplicidade Antes de Abstração
Cada mudança MUST usar a solução mais simples que atende ao requisito atual. O
projeto MUST permanecer pequeno: YAGNI, DRY apenas quando houver duplicação real
e nenhuma camada, dependência ou padrão MUST ser adicionado sem necessidade
documentada. A simplicidade reduz pontos de falha e mantém o sistema compreensível.

### III. Responsabilidades e Dependências Explícitas
Módulos, funções e dados MUST ter limites claros, baixo acoplamento e dependências
visíveis. Regras de negócio MUST permanecer separadas de detalhes de entrada,
saída e infraestrutura quando essa separação reduzir complexidade; para casos
pequenos, uma separação artificial MUST NOT ser criada. Esse equilíbrio mantém as
mudanças localizadas sem criar arquitetura desnecessária.

### IV. Comportamento Previsível e Erros Explícitos
Entradas inválidas, estados impossíveis e falhas de dependências MUST ser tratados
de forma explícita e consistente. Funções MUST evitar efeitos colaterais ocultos,
retornos ambíguos e captura silenciosa de erros. O comportamento previsível torna
o código mais fácil de operar, revisar e corrigir.

### V. Verificação Manual Proporcional
O projeto MUST NOT conter testes automatizados. Toda mudança MUST ser verificada
manualmente pelo fluxo afetado, incluindo casos válidos, entradas inválidas e
falhas relevantes quando aplicável; a verificação realizada MUST ser registrada
na revisão ou na descrição da mudança. Como não há suíte automatizada, essa
verificação manual é o controle mínimo obrigatório para evitar regressões sem
expandir o projeto além de sua escala pretendida.

### VI. Inglês no Código-Fonte
Todo código-fonte MUST usar inglês em nomes de tabelas, colunas, variáveis,
funções, classes, módulos, arquivos técnicos e comentários. A regra aplica-se
também a identificadores de dados persistidos e mensagens internas; textos
visíveis ao usuário podem permanecer em português quando fizerem parte da
interface da aplicação. A separação mantém o código consistente e acessível a
colaboradores, sem impor alteração ao idioma da experiência do usuário.

### VII. Navegação Consistente
Toda tela MUST exibir uma top app bar com o nome da tela e MUST incluir a classe
`bg-sky-700`. Toda tela, exceto a tela inicial, MUST oferecer um botão de voltar
que retorne à tela anterior de forma previsível. A regra cria uma orientação
espacial e visual consistente e torna a navegação verificável em todos os
fluxos da aplicação.

## Project Constraints

O projeto MUST manter uma base pequena e simples, com poucas dependências e sem
infraestrutura criada apenas para antecipar necessidades futuras. A implementação
MUST preferir recursos já disponíveis na linguagem e na plataforma. Requisitos de
segurança, correção e clareza não podem ser sacrificados para reduzir linhas de
código; quando houver conflito, a decisão MUST ser registrada na revisão.

## Development Workflow

Cada mudança MUST começar com um requisito observável e terminar com uma
verificação manual proporcional ao risco. A revisão MUST conferir nomes,
responsabilidades, dependências, tratamento de erros e ausência de testes
automatizados. Mudanças que aumentem significativamente a complexidade MUST
explicar o motivo, as alternativas consideradas e o impacto de manutenção.
Ao executar tarefas por meio de `/speckit-implement`, a implementação MUST
executar `expo start --android` e confirmar que a aplicação inicia no Android
antes de declarar a tarefa concluída. Se não houver dispositivo ou emulador
disponível, a limitação e o resultado MUST ser registrados, e a verificação
Android MUST NOT ser declarada como concluída.

## Governance

Esta constituição prevalece sobre práticas locais conflitantes. Uma alteração
MUST atualizar este arquivo, incluir um Sync Impact Report, explicar o impacto
para o código existente e receber revisão antes de ser adotada.

O versionamento segue SemVer para governança: MAJOR para remover ou redefinir uma
regra de forma incompatível; MINOR para adicionar ou expandir materialmente uma
regra ou seção; PATCH para esclarecimentos sem mudança semântica. A data de
alteração MUST ser atualizada a cada mudança efetiva.

Toda revisão de mudança MUST verificar conformidade com os princípios aplicáveis,
registrar a verificação manual e justificar qualquer exceção. Exceções MUST ser
temporárias, ter escopo explícito e indicar uma ação de correção; não podem ser
usadas para introduzir testes automatizados ou complexidade não necessária.

**Version**: 1.4.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2026-11-11
