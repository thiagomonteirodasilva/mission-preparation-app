import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import SaveToast from '../../components/SaveToast';
import { saveYoung } from '../../db/repository';
import { VALIDATION_MESSAGES } from '../../constants/validation';

export default function NewYoungScreen() {
  const { unitId } = useLocalSearchParams<{ unitId?: string }>();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  async function handleSave() {
    const trimmedName = name.trim();
    const parsedAge = Number(age);

    if (!unitId) {
      setError('Unidade não encontrada.');
      return;
    }

    if (!trimmedName) {
      setError('Nome é obrigatório.');
      return;
    }

    if (!Number.isInteger(parsedAge)) {
      setError('Idade inválida.');
      return;
    }

    if (parsedAge < 16) {
      setError(VALIDATION_MESSAGES.minAge);
      return;
    }

    if (parsedAge > 25) {
      setError(VALIDATION_MESSAGES.maxAge);
      return;
    }

    try {
      await saveYoung({ unitId, name: trimmedName, age: parsedAge, gender });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      router.back();
    } catch (saveError) {
      setError((saveError as Error).message || 'Não foi possível salvar.');
    }
  }

  return (
    <ScrollView className="flex-1 bg-slate-50 p-6">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nome do jovem"
        className="mb-3 rounded-lg border border-slate-300 bg-white p-3 text-base"
      />

      <TextInput
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Idade"
        className="mb-3 rounded-lg border border-slate-300 bg-white p-3 text-base"
      />

      <View className="mb-3 flex-row gap-3">
        <Pressable onPress={() => setGender('male')} className={`flex-1 rounded-lg border p-3 ${gender === 'male' ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-white'}`}>
          <Text className="text-center">Masculino</Text>
        </Pressable>
        <Pressable onPress={() => setGender('female')} className={`flex-1 rounded-lg border p-3 ${gender === 'female' ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-white'}`}>
          <Text className="text-center">Feminino</Text>
        </Pressable>
      </View>

      {error ? <Text className="mb-3 text-sm text-red-600">{error}</Text> : null}

      <Pressable onPress={handleSave} className="flex-row items-center justify-center gap-2 rounded-lg bg-sky-700 p-4">
        <MaterialIcons name="save" size={20} color="#ffffff" />
        <Text className="text-center text-base font-semibold text-white">Salvar</Text>
      </Pressable>

      <SaveToast visible={showToast} />
    </ScrollView>
  );
}
