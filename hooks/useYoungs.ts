import { useEffect, useState } from 'react';
import { loadYoungsByUnit, saveYoung } from '../db/repository';
import { Young } from '../types';

export function useYoungs(unitId?: string) {
  const [youngs, setYoungs] = useState<Young[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  async function refresh() {
    if (!unitId) {
      setYoungs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const items = await loadYoungsByUnit(unitId);
      setYoungs(items);
      setError('');
    } catch (err) {
      setError((err as Error).message || 'Erro ao carregar jovens');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitId]);

  async function addYoung(partial: Partial<Young>) {
    if (!unitId) throw new Error('unitId is required to add a young');
    const toSave: Partial<Young> = { ...partial, unitId };
    const saved = await saveYoung(toSave);
    setYoungs((prev) => [saved, ...prev]);
    return saved;
  }

  return { youngs, loading, error, refresh, addYoung, setYoungs };
}
