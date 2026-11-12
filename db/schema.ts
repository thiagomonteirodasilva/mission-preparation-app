// db/schema.ts
// SQLite schema definitions for the local Expo SQLite database.

export const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS units (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS youngs (
  id TEXT PRIMARY KEY,
  unitId TEXT NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT,
  FOREIGN KEY(unitId) REFERENCES units(id)
);

CREATE TABLE IF NOT EXISTS progress_entries (
  id TEXT PRIMARY KEY,
  youngId TEXT NOT NULL,
  date TEXT NOT NULL, -- ISO 8601 datetime assigned by repository
  text TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  FOREIGN KEY(youngId) REFERENCES youngs(id)
);
`;
