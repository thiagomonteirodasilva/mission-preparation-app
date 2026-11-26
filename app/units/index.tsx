import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { hideSaveToast, showSaveToast } from '../../components/SaveToast';
import { saveUnit } from '../../db/repository';

export default function UnitsScreen() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) {
      hideSaveToast();
      setError('Nome é obrigatório.');
      return;
    }

    setError('');

    try {
      await saveUnit({ name: trimmed });
      showSaveToast();
      setName('');
      router.back();
    } catch (saveError) {
      hideSaveToast();
      setError((saveError as Error).message || 'Não foi possível salvar a unidade.');
    }
  }

  return (
    <View className="flex-1 bg-slate-50 p-6">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nome da unidade"
        className="rounded-lg border border-slate-300 bg-white p-3 text-base"
      />
      {error ? <Text className="mt-3 text-sm text-red-600">{error}</Text> : null}

      <Pressable onPress={handleSave} className="mt-6 flex-row items-center justify-center gap-2 rounded-lg bg-sky-700 p-4">
        <MaterialIcons name="save" size={20} color="#ffffff" />
        <Text className="text-center text-base font-semibold text-white">Salvar</Text>
      </Pressable>
    </View>
  );
}
