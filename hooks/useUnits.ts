import { useEffect, useState } from 'react';
import { loadUnitsWithYoungs } from '../db/repository';
import { Unit, Young } from '../types';

export function useUnits() {
  const [units, setUnits] = useState<Array<{ unit: Unit; youngs: Young[] }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    void (async () => {
      try {
        const nextUnits = await loadUnitsWithYoungs();
        if (active) setUnits(nextUnits);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { units, loading, setUnits };
}
