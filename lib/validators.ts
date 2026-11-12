import { normalizeName, isValidAge, VALIDATION_MESSAGES } from '../constants/validation';

export function validateYoungName(name: string): string | null {
  const normalized = normalizeName(name);
  return normalized ? null : VALIDATION_MESSAGES.requiredName;
}

export function validateUnitName(name: string): string | null {
  const normalized = normalizeName(name);
  return normalized ? null : VALIDATION_MESSAGES.requiredUnitName;
}

export function validateYoungAge(age: number): string | null {
  if (!Number.isInteger(age)) {
    return VALIDATION_MESSAGES.requiredName;
  }
  if (age < 16) return VALIDATION_MESSAGES.minAge;
  if (age > 25) return VALIDATION_MESSAGES.maxAge;
  return null;
}

export function validateProgressText(text: string): string | null {
  const normalized = text.trim();
  if (!normalized) return VALIDATION_MESSAGES.requiredProgressText;
  if (normalized.length > 1000) return VALIDATION_MESSAGES.maxProgressLength;
  return null;
}

export function validateYoungPayload(payload: { name: string; age: number }): string | null {
  const nameError = validateYoungName(payload.name);
  if (nameError) return nameError;
  return validateYoungAge(payload.age);
}

export const isAgeInRange = isValidAge;
