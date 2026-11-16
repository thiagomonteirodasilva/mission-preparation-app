import React, { useMemo, useState } from 'react';
import { Link, router } from 'expo-router';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Unit, Young } from '../types';

type UnitAccordionProps = {
  units: Array<{ unit: Unit; youngs: Young[] }>;
  expandedUnitIds: string[];
  onToggleUnit: (unitId: string) => void;
  onRemoveUnit: (unit: Unit) => Promise<void>;
};

export default function UnitAccordion({ units, expandedUnitIds, onToggleUnit, onRemoveUnit }: UnitAccordionProps) {
  const [menuUnitId, setMenuUnitId] = useState<string | null>(null);
  const [confirmationUnit, setConfirmationUnit] = useState<Unit | null>(null);
  const [removalError, setRemovalError] = useState('');
  const [removing, setRemoving] = useState(false);
  const sortedUnits = useMemo(
    () => [...units].sort((a, b) => a.unit.name.localeCompare(b.unit.name, 'pt-BR')),
    [units],
  );

  async function handleConfirmRemoval() {
    if (!confirmationUnit || removing) return;

    setRemoving(true);
    setRemovalError('');

    try {
      await onRemoveUnit(confirmationUnit);
      setConfirmationUnit(null);
    } catch (error) {
      setRemovalError((error as Error).message || 'Não foi possível remover a unidade.');
    } finally {
      setRemoving(false);
    }
  }

  const removalButtonLabel = removing ? 'Removendo...' : 'Sim';

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

              <Pressable
                accessibilityLabel={`Ações da unidade ${unit.name}`}
                accessibilityRole="button"
                accessibilityState={{ expanded: menuUnitId === unit.id }}
                onPress={() => setMenuUnitId(unit.id)}
                className="rounded-lg bg-blue-600 px-3 py-2"
              >
                <Text className="text-sm font-medium text-white">Ações</Text>
              </Pressable>
            </View>

            {isExpanded && (
              <View className="mt-3 gap-2 border-t border-slate-200 pt-3">
                {sortedYoungs.length === 0 && (
                  <Text className="text-sm text-slate-500">Nenhum jovem cadastrado nesta unidade.</Text>
                )}
                {sortedYoungs.map((young) => (
                  <Link key={young.id} href={`/young/${young.id}`} asChild>
                    <Pressable className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                      <Text className="text-base text-slate-800">
                        {young.name} ({young.age} anos)
                      </Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
            )}
          </View>
        );
      })}

      <Modal
        animationType="fade"
        transparent
        visible={menuUnitId !== null}
        onRequestClose={() => setMenuUnitId(null)}
      >
        <View className="flex-1 items-center justify-center p-6">
          <Pressable
            accessibilityLabel="Fechar menu"
            accessibilityRole="button"
            className="bg-black/40"
            style={StyleSheet.absoluteFill}
            onPress={() => setMenuUnitId(null)}
          />
          <View className="w-full max-w-sm rounded-xl bg-white p-5">
            <Text className="mb-3 text-lg font-semibold text-slate-900">Ações da unidade</Text>
            {['Adicionar Jovem', 'Editar Unidade', 'Remover Unidade'].map((action) => (
              <Pressable
                key={action}
                accessibilityRole="button"
                onPress={() => {
                  const unitId = menuUnitId;
                  setMenuUnitId(null);
                  const selectedUnit = units.find((item) => item.unit.id === unitId)?.unit;

                  if (action === 'Adicionar Jovem' && unitId) {
                    router.push({ pathname: '/young/new', params: { unitId } });
                  } else if (action === 'Editar Unidade' && selectedUnit) {
                    router.push({ pathname: '/units/[unitId]/edit', params: { unitId: selectedUnit.id } });
                  } else if (action === 'Remover Unidade' && selectedUnit) {
                    setRemovalError('');
                    setConfirmationUnit(selectedUnit);
                  }
                }}
                className="rounded-lg px-3 py-3 active:bg-slate-100"
              >
                <Text className="text-base text-slate-800">{action}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={confirmationUnit !== null}
        onRequestClose={() => {
          if (!removing) setConfirmationUnit(null);
        }}
      >
        {confirmationUnit && (
          <View className="flex-1 items-center justify-center bg-black/40 p-6">
            <View className="w-full max-w-md rounded-xl bg-white p-5">
              <Text className="text-xl font-semibold text-slate-900">Remover Unidade</Text>
              <Text className="mt-3 text-base text-slate-700">
                Ao remover a unidade {confirmationUnit.name}, os jovens pertencentes a esta unidade também serão
                removidos. Deseja prosseguir? Esta ação não poderá ser desfeita.
              </Text>

              {removalError.length > 0 && (
                <Text className="mt-3 text-sm text-red-600">{removalError}</Text>
              )}

              <View className="mt-5 flex-row justify-end gap-3">
                <Pressable
                  accessibilityRole="button"
                  disabled={removing}
                  onPress={() => setConfirmationUnit(null)}
                  className="rounded-lg border border-slate-300 px-4 py-2"
                >
                  <Text className="text-slate-700">Não</Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  disabled={removing}
                  onPress={handleConfirmRemoval}
                  className="rounded-lg bg-red-600 px-4 py-2"
                >
                  <Text className="font-medium text-white">{removalButtonLabel}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}
