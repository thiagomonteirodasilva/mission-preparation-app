import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import YoungListItem from '../../../components/YoungListItem';
import { loadYoungsByUnit } from '../../../db/repository';
import { Young } from '../../../types';

export default function UnitDetailScreen() {
  const { unitId } = useLocalSearchParams<{ unitId?: string }>();
  const [youngs, setYoungs] = useState<Young[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function refreshYoungs() {
        if (!unitId) {
          setError('Unidade não informada.');
          setLoading(false);
          return;
        }

        setLoading(true);
        setError('');

        try {
          const items = await loadYoungsByUnit(unitId);
          if (active) setYoungs(items);
        } catch (err) {
          if (active) setError((err as Error).message || 'Erro ao carregar jovens.');
        } finally {
          if (active) setLoading(false);
        }
      }

      refreshYoungs();

      return () => {
        active = false;
      };
    }, [unitId]),
  );

  function handleAdd() {
    if (!unitId) return;
    router.push(`/young/new?unitId=${unitId}`);
  }

  function handleOpenYoung(youngId: string) {
    if (!unitId) return router.push(`/young/${youngId}`);
    router.push(`/young/${youngId}?unitId=${unitId}`);
  }

  return (
    <ScrollView className="flex-1 bg-slate-50 p-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-slate-900">Jovens da unidade</Text>
        <Pressable onPress={handleAdd} className="rounded-lg bg-blue-600 p-3">
          <Text className="text-white">Novo</Text>
        </Pressable>
      </View>

      {loading ? <Text>Carregando...</Text> : null}
      {error ? <Text className="text-red-600">{error}</Text> : null}

      <View className="space-y-3">
        {youngs.map((young) => (
          <YoungListItem key={young.id} young={young} onPress={handleOpenYoung} />
        ))}
        {youngs.length === 0 && !loading ? <Text className="text-slate-600">Nenhum jovem encontrado.</Text> : null}
      </View>
    </ScrollView>
  );
}
