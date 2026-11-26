# Quickstart: Validação manual do toast

## Pré-requisitos e execução

- Node.js e npm compatíveis com o projeto, dependências instaladas e dispositivo ou emulador Android disponível. Usar dados locais de teste; a aplicação grava unidades, jovens e relatos.
- Após implementar a instalação da dependência planejada, executar na raiz:

```powershell
npm install
npm run typecheck
npm run android
```

`npm run android` executa `expo start --android`, obrigatório para tarefas executadas por `/speckit-implement`. Registrar o início bem-sucedido no Android; se não houver dispositivo ou emulador, registrar a limitação e não declarar a verificação Android concluída. Nenhum teste automatizado deve ser criado.

## Cenários

1. Criar uma unidade válida. Confirmar retorno imediato à tela anterior e mensagem “Salvo com sucesso” no rodapé verde por 3 segundos, com tolerância de 0,5 segundo. Usar cronômetro e verificar desaparecimento automático.
2. Editar o nome de uma unidade existente. Confirmar retorno à tela anterior e a mesma mensagem por 3 segundos.
3. Na unidade criada, cadastrar um jovem válido. Confirmar o mesmo comportamento após o retorno automático.
4. Abrir o perfil, editar dados válidos e salvar. Verificar confirmação e dados salvos; repetir após rolar a tela para garantir que a posição do toast acompanha a tela, não o conteúdo.
5. Adicionar um relato válido. Confirmar inclusão e a mesma notificação; realizar dois salvamentos consecutivos enquanto a primeira notificação está visível e verificar um único toast com 3 segundos a partir do último sucesso.

Nos cinco fluxos dos passos 1–5, conferir um ícone de check visível junto à mensagem legível.

6. Tentar salvar uma unidade nova ou editada com nome vazio e somente espaços: verificar mensagem de nome obrigatório, ausência de salvamento e permanência na tela. Tentar cadastrar ou editar jovem com dados inválidos e um relato vazio ou longo demais; confirmar as mensagens de validação e que nenhuma nova confirmação de sucesso aparece. Repetir cada fluxo de validação com uma confirmação anterior ainda visível e verificar que ela é ocultada.
7. Em ambiente de teste, provocar falhas de persistência controladas para criação/edição de unidade, cadastro/edição de jovem e relato, sem comprometer dados reais. Confirmar indicação de falha e ausência de nova confirmação; repetir com uma confirmação anterior visível e verificar que ela é ocultada. Se não for possível induzir uma falha com segurança, registrar o cenário como não verificado.
8. Em ambiente de teste, abrir um perfil inexistente ou indisponível. Verificar a mensagem “Não foi possível exibir as informações do jovem. Tente novamente” antes do retorno automático após aproximadamente 2 segundos, sem tratá-la como sucesso. Repetir com uma confirmação anterior visível e verificar que ela é ocultada.
9. Verificar que cabeçalhos e botão de voltar seguem funcionando. Registrar dispositivo, plataforma, resultados e eventuais limitações na revisão.

Os resultados esperados completos estão em [contracts/toast-ui.md](contracts/toast-ui.md); as transições de estado estão em [data-model.md](data-model.md).

## Registro de execução

- **2026-11-26 — TypeScript**: `npm run typecheck` passou após a implementação, sem erros.
- **2026-11-26 — Android**: `npm run android` abriu o emulador `Medium_Phone`, iniciou o Metro e concluiu `Android Bundled` (1248 módulos) no Expo Go; inicialização confirmada. O Expo reportou avisos de versões esperadas divergentes para dependências preexistentes e configuração `userInterfaceStyle` ausente; não foram alteradas como parte desta funcionalidade.
- **Reteste reportado pela pessoa usuária**: os quatro fluxos originais exibiram o toast; a edição de unidade foi identificada sem toast e corrigida. Confirmar manualmente a edição da unidade após esta correção.
- **2026-11-26 — Fluxos de erro**: cenários de validação e falha de persistência ainda aguardam verificação manual; manter T012 aberta até executá-los.