import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import UnitAccordion from '../components/UnitAccordion';
import { deleteUnitWithDependents, initializeDatabase, loadUnitsWithYoungs } from '../db/repository';
import { Unit, Young } from '../types';

export default function HomeScreen() {
  const [units, setUnits] = useState<Array<{ unit: Unit; youngs: Young[] }>>([]);
  const [expandedUnitIds, setExpandedUnitIds] = useState<string[]>([]);
  const [databaseError, setDatabaseError] = useState(false);
  const [refreshError, setRefreshError] = useState('');
  const hasLoadedOnce = useRef(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function refreshUnits() {
        try {
          await initializeDatabase();
          const nextUnits = await loadUnitsWithYoungs();
          if (!isActive) return;

          setUnits(nextUnits);
          setDatabaseError(false);
          setRefreshError('');
          if (!hasLoadedOnce.current && nextUnits.length > 0) {
            setExpandedUnitIds([nextUnits[0].unit.id]);
          }
          hasLoadedOnce.current = true;
        } catch {
          if (isActive) setDatabaseError(true);
        }
      }

      refreshUnits().catch(() => {
        if (isActive) setDatabaseError(true);
      });

      return () => {
        isActive = false;
      };
    }, []),
  );

  function toggleUnit(unitId: string) {
    setExpandedUnitIds((current) =>
      current.includes(unitId) ? current.filter((id) => id !== unitId) : [...current, unitId],
    );
  }

  async function handleRemoveUnit(unit: Unit) {
    await deleteUnitWithDependents(unit.id);
    setUnits((current) => current.filter((entry) => entry.unit.id !== unit.id));
    setExpandedUnitIds((current) => current.filter((id) => id !== unit.id));

    try {
      const nextUnits = await loadUnitsWithYoungs();
      setUnits(nextUnits);
      setRefreshError('');
      setDatabaseError(false);
    } catch {
      setRefreshError('A unidade foi removida, mas não foi possível atualizar o restante da lista.');
    }
  }

  return (
    <ScrollView className="flex-1 bg-slate-50 p-6">
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-slate-900">Unidades</Text>
        <Link href="/units" asChild>
          <Pressable className="rounded-lg bg-blue-600 px-3 py-2">
            <Text className="text-sm font-medium text-white">+ unidade</Text>
          </Pressable>
        </Link>
      </View>

      {databaseError && (
        <Text className="text-sm text-red-600">
          Não foi possível carregar as unidades. Tente abrir a tela novamente.
        </Text>
      )}
      {refreshError ? <Text className="text-sm text-red-600">{refreshError}</Text> : null}
      {!databaseError && units.length === 0 && (
        <Text className="text-sm text-slate-500">Nenhuma unidade cadastrada.</Text>
      )}
      {!databaseError && units.length > 0 && (
        <UnitAccordion
          units={units}
          expandedUnitIds={expandedUnitIds}
          onToggleUnit={toggleUnit}
          onRemoveUnit={handleRemoveUnit}
        />
      )}
    </ScrollView>
  );
}
