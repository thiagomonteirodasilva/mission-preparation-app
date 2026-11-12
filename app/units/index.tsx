import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import SaveToast from '../../components/SaveToast';
import { saveUnit } from '../../db/repository';

export default function UnitsScreen() {
  const [name, setName] = useState('');
  const [showToast, setShowToast] = useState(false);

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;

    await saveUnit({ name: trimmed });
    setShowToast(true);
    setName('');
    setTimeout(() => setShowToast(false), 2000);
    router.back();
  }

  return (
    <View className="flex-1 bg-slate-50 p-6">
      <Text className="mb-4 text-2xl font-bold text-slate-900">Nova unidade</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nome da unidade"
        className="rounded-lg border border-slate-300 bg-white p-3 text-base"
      />

      <Pressable onPress={handleSave} className="mt-6 rounded-lg bg-blue-600 p-4">
        <Text className="text-center text-base font-semibold text-white">Salvar</Text>
      </Pressable>

      <SaveToast visible={showToast} />
    </View>
  );
}
