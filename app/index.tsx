import { Link, useFocusEffect } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import UnitAccordion from '../components/UnitAccordion';
import { initializeDatabase, loadUnitsWithYoungs } from '../db/repository';

export default function HomeScreen() {
  const [units, setUnits] = useState<Array<{ unit: { id: string; name: string; createdAt: string }; youngs: any[] }>>([]);
  const [expandedUnitIds, setExpandedUnitIds] = useState<string[]>([]);
  const [databaseError, setDatabaseError] = useState(false);
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
          if (!hasLoadedOnce.current && nextUnits.length > 0) {
            setExpandedUnitIds([nextUnits[0].unit.id]);
          }
          hasLoadedOnce.current = true;
        } catch {
          if (isActive) setDatabaseError(true);
        }
      }

      void refreshUnits();

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
      {!databaseError && units.length === 0 && (
        <Text className="text-sm text-slate-500">Nenhuma unidade cadastrada.</Text>
      )}
      {!databaseError && units.length > 0 && (
        <UnitAccordion units={units} expandedUnitIds={expandedUnitIds} onToggleUnit={toggleUnit} />
      )}
    </ScrollView>
  );
}
