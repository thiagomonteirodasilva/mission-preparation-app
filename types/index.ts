export interface Unit {
  id: string;
  name: string;
  createdAt: string;
}

export interface Young {
  id: string;
  unitId: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  createdAt: string;
  updatedAt?: string;
}

export interface ProgressEntry {
  id: string;
  youngId: string;
  date: string;
  text: string;
  createdAt: string;
}
