import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput } from 'react-native';
import { hideSaveToast, showSaveToast } from '../../../components/SaveToast';
import { loadUnitById, updateUnit } from '../../../db/repository';
import { Unit } from '../../../types';

type UnitLoadResult = {
  unit: Unit | null;
  error: string;
};

async function loadEditableUnit(unitId?: string): Promise<UnitLoadResult> {
  if (!unitId) {
    return { unit: null, error: 'Unidade não informada.' };
  }

  try {
    const unit = await loadUnitById(unitId);
    return unit
      ? { unit, error: '' }
      : { unit: null, error: 'Unidade não encontrada.' };
  } catch {
    return { unit: null, error: 'Não foi possível carregar a unidade.' };
  }
}

export default function EditUnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId?: string }>();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [unitLoaded, setUnitLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function showError(message: string) {
    hideSaveToast();
    setError(message);
  }

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setUnitLoaded(false);
    setError('');
    loadEditableUnit(unitId).then(({ unit, error: loadError }) => {
      if (!isActive) return;

      if (unit) {
        setName(unit.name);
        setUnitLoaded(true);
      } else {
        showError(loadError);
      }

      setLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [unitId]);

  async function handleSave() {
    const trimmedName = name.trim();

    if (!unitId) {
      showError('Unidade não informada.');
      return;
    }

    if (!trimmedName) {
      showError('Nome da unidade é obrigatório.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await updateUnit(unitId, trimmedName);
      showSaveToast();
      router.back();
    } catch (saveError) {
      showError((saveError as Error).message || 'Não foi possível salvar a unidade.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView className="flex-1 bg-slate-50 p-6">
      {loading ? <Text className="mb-3 text-slate-600">Carregando unidade...</Text> : null}

      <TextInput
        accessibilityLabel="Nome da unidade"
        editable={!loading && unitLoaded && !saving}
        value={name}
        onChangeText={setName}
        placeholder="Nome da unidade"
        className="rounded-lg border border-slate-300 bg-white p-3 text-base"
      />

      {error ? <Text className="mt-3 text-sm text-red-600">{error}</Text> : null}

      <Pressable
        accessibilityRole="button"
        disabled={loading || !unitLoaded || saving}
        onPress={handleSave}
        className="mt-6 flex-row items-center justify-center gap-2 rounded-lg bg-sky-700 p-4 disabled:opacity-50"
      >
        <MaterialIcons name="save" size={20} color="#ffffff" />
        <Text className="text-center text-base font-semibold text-white">
          {saving ? 'Salvando...' : 'Salvar'}
        </Text>
      </Pressable>

    </ScrollView>
  );
}
