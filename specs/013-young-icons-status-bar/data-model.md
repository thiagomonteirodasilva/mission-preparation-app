# Data Model: Ícones de Jovens e Contraste da Barra de Status

## Entidades existentes

### Unit

- `id`: identificador da unidade.
- `name`: nome apresentado na tela.
- `createdAt`: criação.
- Relacionamento: uma unidade agrupa zero ou mais jovens por `Young.unitId`.

### Young

- `id`, `unitId`, `name`, `age`, `gender`, `createdAt` e `updatedAt` opcional.
- `gender` tem tipo de aplicação `'male' | 'female'`; a coluna existente é texto obrigatório. Em tempo de execução, valores não reconhecidos ainda devem ser tratados defensivamente.
- O cadastro existente valida nome, unidade e idade inteira de 16 a 25 anos; esta funcionalidade não modifica tais regras.

## Projeção de apresentação

| Valor recebido de `gender` | Apresentação planejada |
|----------------------------|------------------------|
| `male` | Rosto masculino. |
| `female` | Rosto feminino. |
| Ausente ou qualquer outro valor | Rosto/ícone neutro, sem inferir sexo. |

A projeção é derivada em memória e não persiste um novo campo. O estado da barra de status também é apenas configuração visual, não uma entidade persistida.

## Transição existente

Ao salvar uma alteração de sexo no perfil, `updateYoung` persiste o novo valor. Ao retornar à tela inicial, a recarga por foco obtém os dados atuais e a lista deriva novamente o ícone. A confirmação do comportamento depende de verificação manual.

Não há nova tabela, migração ou mudança de relação, esquema, valores armazenados ou integridade referencial.