export const VALIDATION_MESSAGES = {
  minAge: 'Não é permitido cadastrar jovem com idade menor que 16 anos',
  maxAge: 'Não é permitido cadastrar jovem com idade maior que 25 anos',
  requiredName: 'Nome é obrigatório.',
  requiredUnitName: 'Nome da unidade é obrigatório.',
  requiredProgressText: 'Relato é obrigatório.',
  maxProgressLength: 'O relato deve ter no máximo 1000 caracteres.',
};

export function normalizeName(value: string): string {
  return value.trim();
}

export function isValidAge(age: number): boolean {
  return Number.isInteger(age) && age >= 16 && age <= 25;
}
