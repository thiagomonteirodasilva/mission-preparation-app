import * as SQLite from 'expo-sqlite';
import { randomUUID } from 'expo-crypto';
import { CREATE_TABLES_SQL } from './schema';
import { ProgressEntry, Unit, Young } from '../types';

const db = SQLite.openDatabaseSync('mission-preparation.db');

export async function initializeDatabase(): Promise<void> {
  db.execSync(`PRAGMA foreign_keys = ON;${CREATE_TABLES_SQL}`);
}

export async function saveUnit(unit: Partial<Unit>): Promise<Unit> {
  const trimmedName = (unit.name ?? '').trim();
  const id = unit.id ?? randomUUID();
  const createdAt = unit.createdAt ?? new Date().toISOString();

  if (!trimmedName) {
    throw new Error('Nome da unidade é obrigatório.');
  }

  db.runSync('INSERT INTO units (id, name, createdAt) VALUES (?, ?, ?);', [id, trimmedName, createdAt]);
  return { id, name: trimmedName, createdAt };
}

export async function saveYoung(young: Partial<Young>): Promise<Young> {
  const trimmedName = (young.name ?? '').trim();
  const id = young.id ?? randomUUID();
  const nowIso = new Date().toISOString();
  const age = Number(young.age);

  if (!young.unitId) {
    throw new Error('unitId is required');
  }

  if (!trimmedName) {
    throw new Error('Nome é obrigatório.');
  }

  if (!Number.isInteger(age) || age < 16 || age > 25) {
    throw new Error('Idade inválida.');
  }

  const gender = (young.gender ?? 'male') as 'male' | 'female';
  const createdAt = young.createdAt ?? nowIso;
  db.runSync(
    'INSERT INTO youngs (id, unitId, name, age, gender, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?);',
    [id, young.unitId, trimmedName, age, gender, createdAt, nowIso],
  );
  return { id, unitId: young.unitId, name: trimmedName, age, gender, createdAt, updatedAt: nowIso };
}

export async function updateYoung(young: Young): Promise<Young> {
  const trimmedName = young.name.trim();
  const age = Number(young.age);
  const updatedAt = new Date().toISOString();

  if (!trimmedName) {
    throw new Error('Nome é obrigatório.');
  }

  if (!Number.isInteger(age) || age < 16 || age > 25) {
    throw new Error('Idade inválida.');
  }

  const result = db.runSync(
    'UPDATE youngs SET name = ?, age = ?, gender = ?, updatedAt = ? WHERE id = ?;',
    [trimmedName, age, young.gender, updatedAt, young.id],
  );

  if (result.changes === 0) {
    throw new Error('Jovem não encontrado.');
  }

  return { ...young, name: trimmedName, age, updatedAt };
}

export async function loadUnits(): Promise<Unit[]> {
  return db.getAllSync<Unit>('SELECT id, name, createdAt FROM units ORDER BY name COLLATE NOCASE ASC;', []);
}

export async function loadYoungsByUnit(unitId: string): Promise<Young[]> {
  return db.getAllSync<Young>(
    'SELECT id, unitId, name, age, gender, createdAt, updatedAt FROM youngs WHERE unitId = ? ORDER BY name COLLATE NOCASE ASC;',
    [unitId],
  );
}

export async function loadYoungById(youngId: string): Promise<Young | null> {
  return db.getFirstSync<Young>(
    'SELECT id, unitId, name, age, gender, createdAt, updatedAt FROM youngs WHERE id = ?;',
    [youngId],
  );
}

export function loadUnitsWithYoungs(): Promise<Array<{ unit: Unit; youngs: Young[] }>> {
  return loadUnits().then((units) =>
    Promise.all(
      units.map(async (unit) => ({
        unit,
        youngs: await loadYoungsByUnit(unit.id),
      })),
    ),
  );
}

export function saveProgressEntry(entry: Partial<ProgressEntry>): Promise<ProgressEntry> {
  return Promise.resolve().then(() => {
    const id = entry.id ?? randomUUID();
    const nowIso = new Date().toISOString();
    const dateIso = entry.date ?? nowIso;
    const createdAt = entry.createdAt ?? nowIso;
    const text = (entry.text ?? '').trim();

    if (!entry.youngId) throw new Error('youngId is required');
    if (!text) throw new Error('text is required');
    if (text.length > 1000) throw new Error('text must be <= 1000 chars');

    db.runSync(
      'INSERT INTO progress_entries (id, youngId, date, text, createdAt) VALUES (?, ?, ?, ?, ?);',
      [id, entry.youngId, dateIso, text, createdAt],
    );
    return { id, youngId: entry.youngId, date: dateIso, text, createdAt };
  });
}

export async function loadProgressEntriesForYoung(youngId: string): Promise<ProgressEntry[]> {
  return db.getAllSync<ProgressEntry>(
    'SELECT id, youngId, date, text, createdAt FROM progress_entries WHERE youngId = ? ORDER BY date DESC, createdAt DESC, id ASC;',
    [youngId],
  );
}
