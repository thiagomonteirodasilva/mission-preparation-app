import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Unit, Young } from '../types';

type UnitAccordionProps = {
  units: Array<{ unit: Unit; youngs: Young[] }>;
  expandedUnitIds: string[];
  onToggleUnit: (unitId: string) => void;
};

export default function UnitAccordion({ units, expandedUnitIds, onToggleUnit }: UnitAccordionProps) {
  const sortedUnits = useMemo(
    () => [...units].sort((a, b) => a.unit.name.localeCompare(b.unit.name, 'pt-BR')),
    [units],
  );

  return (
    <View className="gap-3">
      {sortedUnits.map(({ unit, youngs }) => {
        const isExpanded = expandedUnitIds.includes(unit.id);
        const sortedYoungs = [...youngs].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

        return (
          <View key={unit.id} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <View className="flex-row items-center justify-between">
              <Pressable onPress={() => onToggleUnit(unit.id)} className="flex-1">
                <Text className="text-lg font-semibold text-slate-900">{unit.name}</Text>
              </Pressable>

              <Link href={{ pathname: '/young/new', params: { unitId: unit.id } }} asChild>
                <Pressable className="rounded-lg bg-blue-600 px-3 py-2">
                  <Text className="text-sm font-medium text-white">+ jovem</Text>
                </Pressable>
              </Link>
            </View>

            {isExpanded && (
              <View className="mt-3 gap-2 border-t border-slate-200 pt-3">
                {sortedYoungs.length === 0 ? (
                  <Text className="text-sm text-slate-500">Nenhum jovem cadastrado nesta unidade.</Text>
                ) : (
                  sortedYoungs.map((young) => (
                    <Link key={young.id} href={`/young/${young.id}`} asChild>
                      <Pressable className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                        <Text className="text-base text-slate-800">
                          {young.name} ({young.age} anos)
                        </Text>
                      </Pressable>
                    </Link>
                  ))
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
