# Research: Confirmação de salvamento com biblioteca de toast

## Dependência e compatibilidade

- **Decision**: planejar `react-native-toast-message` 2.5.2, com tipos fornecidos pelo próprio pacote, e confirmar a instalação com as dependências atuais antes de implementar.
- **Rationale**: escolha explícita da solicitação; os metadados consultados em 2026-11-26 declaram peers `react: *` e `react-native: *` e arquivo de tipos. Isso não prova compatibilidade funcional com Expo 51: compilação e execução ainda precisam ser verificadas.
- **Alternatives considered**: manter o componente próprio ou escolher outra biblioteca; rejeitadas porque não atendem à solicitação explícita.
- **Sources**: [package.json da versão 2.5.2](https://raw.githubusercontent.com/calintamas/react-native-toast-message/v2.5.2/package.json); metadados consultados por `npm view`.

## Instância e navegação

- **Decision**: montar uma única instância global após a `Stack` no layout raiz e disparar `Toast.show()` após cada salvamento concluído, preservando o retorno imediato das telas de criação.
- **Rationale**: a documentação recomenda a instância como último filho; assim ela não pertence à tela que retorna e não rola com seu conteúdo. A permanência visível durante a transição precisa ser comprovada no dispositivo.
- **Alternatives considered**: manter instâncias por tela, que podem ser desmontadas ao navegar; atrasar `router.back()`, que altera a navegação exigida.
- **Sources**: [Quick start 2.5.2](https://github.com/calintamas/react-native-toast-message/blob/v2.5.2/docs/quick-start.md); `app/_layout.tsx`, `app/units/index.tsx` e `app/young/new.tsx`.

## Duração e repetição

- **Decision**: configurar `position: 'bottom'`, `visibilityTime: 3000` e `autoHide: true`; usar `Toast.show()` para substituir uma confirmação existente e reiniciar o tempo, sem temporizadores locais de sucesso. Verificar a tolerância e o comportamento em disparos consecutivos durante a implementação.
- **Rationale**: a API documenta duração e posição. Na versão 2.5.2, `show` atualiza opções e visibilidade; o efeito inicia o timer e `startTimer` limpa o timer anterior. Isso sustenta a decisão, mas não substitui verificação manual de animações e transições.
- **Alternatives considered**: filas, que exibiriam mais de uma confirmação sequencialmente; timers por tela, que podem encerrar a confirmação recente antes do tempo.
- **Sources**: [API 2.5.2](https://github.com/calintamas/react-native-toast-message/blob/v2.5.2/docs/api.md), [useToast](https://github.com/calintamas/react-native-toast-message/blob/v2.5.2/src/useToast.ts), [useTimeout](https://github.com/calintamas/react-native-toast-message/blob/v2.5.2/src/hooks/useTimeout.ts).

## Aparência e cor

- **Decision**: substituir o layout de `success` da biblioteca por um layout nativo simples usando `className="bg-emerald-600"` e texto branco. Se a classe não funcionar no contexto real, usar uma representação equivalente como alternativa documentada.
- **Rationale**: a biblioteca aceita layouts personalizados e o componente atual já usa essa classe. O valor padrão Tailwind `emerald-600` é `#059669`; não passar a string da classe como valor de `backgroundColor`, pois esse campo espera uma cor, não uma classe.
- **Alternatives considered**: layout padrão de sucesso, que não garante fundo inteiramente verde; hexadecimal diretamente no estilo, menos alinhado à preferência do usuário.
- **Sources**: [layouts personalizados](https://github.com/calintamas/react-native-toast-message/blob/v2.5.2/docs/custom-layouts.md); [cores Tailwind 3.4.17](https://github.com/tailwindlabs/tailwindcss/blob/v3.4.17/src/public/colors.js); `components/SaveToast.tsx`.

## Erros e limites de escopo

- **Decision**: manter a falha de carregamento do jovem independente do toast global de sucesso, com a mensagem atual visível até o retorno em aproximadamente 2 segundos. Preservar mensagens de validação e salvamento já existentes e dar indicação explícita para falhas de unidade ou relato atualmente não tratadas localmente.
- **Rationale**: o mesmo componente atual também exibe erro de carregamento; convertê-lo indiscriminadamente em sucesso ocultaria o erro ou poderia mantê-lo após a navegação. A constituição exige falhas explícitas.
- **Alternatives considered**: encaminhar todos os eventos para o tipo de sucesso; rejeitado por confundir falha e sucesso. Alterar o fluxo de navegação; rejeitado pela especificação.
- **Sources**: `app/young/[youngId].tsx`, `app/young/new.tsx`, `app/units/index.tsx` e constituição do projeto.