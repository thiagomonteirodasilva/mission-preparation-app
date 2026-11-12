import { saveUnit, saveYoung } from './repository';

export async function seedDemoData() {
  const unitA = await saveUnit({ name: 'Alfa' });
  const unitB = await saveUnit({ name: 'Beta' });

  await saveYoung({ unitId: unitA.id, name: 'Lívia', age: 20, gender: 'female' });
  await saveYoung({ unitId: unitA.id, name: 'Carlos', age: 18, gender: 'male' });
  await saveYoung({ unitId: unitB.id, name: 'Ana', age: 21, gender: 'female' });
}
