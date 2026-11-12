import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import ProgressEntryList from '../../components/ProgressEntryList';
import SaveToast from '../../components/SaveToast';
import { VALIDATION_MESSAGES } from '../../constants/validation';
import { loadProgressEntriesForYoung, loadYoungById, saveProgressEntry, updateYoung } from '../../db/repository';
import { ProgressEntry, Young } from '../../types';

export default function YoungDetailScreen() {
  const { youngId } = useLocalSearchParams<{ youngId: string }>();
  const [young, setYoung] = useState<Young | null>(null);
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [newEntryText, setNewEntryText] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('Salvo com sucesso');

  useEffect(() => {
    let isActive = true;
    let backTimer: ReturnType<typeof setTimeout> | undefined;

    async function loadYoung() {
      setYoung(null);
      setEntries([]);
      setIsLoading(true);
      setShowToast(false);

      try {
        if (!youngId) throw new Error('youngId is required');

        const row = await loadYoungById(youngId);
        if (!row) throw new Error('Young profile not found');

        const progressEntries = await loadProgressEntriesForYoung(youngId);
        if (!isActive) return;

        setYoung(row);
        setName(row.name);
        setAge(String(row.age));
        setGender(row.gender);
        setEntries(progressEntries);
        setIsLoading(false);
      } catch {
        if (!isActive) return;

        setIsLoading(false);
        setToastMessage('Não foi possível exibir as informações do jovem. Tente novamente');
        setShowToast(true);
        backTimer = setTimeout(() => router.back(), 2000);
      }
    }

    loadYoung();

    return () => {
      isActive = false;
      if (backTimer) clearTimeout(backTimer);
    };
  }, [youngId]);

  async function handleSave() {
    if (!young) return;
    const parsedAge = Number(age);

    if (!name.trim()) {
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
      const updatedYoung = await updateYoung({ ...young, name: name.trim(), age: parsedAge, gender });
      setYoung(updatedYoung);
      setName(updatedYoung.name);
      setAge(String(updatedYoung.age));
      setGender(updatedYoung.gender);
      setError('');
      setToastMessage('Salvo com sucesso');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (saveError) {
      setError((saveError as Error).message || 'Não foi possível salvar as informações do jovem.');
    }
  }

  async function handleAddEntry() {
    if (!young || !newEntryText.trim()) {
      setError('Relato é obrigatório.');
      return;
    }

    if (newEntryText.trim().length > 1000) {
      setError(VALIDATION_MESSAGES.maxProgressLength);
      return;
    }

    const saved = await saveProgressEntry({ youngId: young.id, text: newEntryText.trim() });
    setEntries((previous) => [saved, ...previous].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setNewEntryText('');
    setError('');
    setToastMessage('Salvo com sucesso');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  async function handleDelete() {
    setShowDelete(false);
    router.back();
  }

  if (!young) {
    return (
      <View className="flex-1 bg-slate-50 p-6">
        {isLoading ? <Text className="text-base text-slate-600">Carregando...</Text> : null}
        <SaveToast visible={showToast} message={toastMessage} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-50 p-6">
      <Text className="mb-4 text-2xl font-bold text-slate-900">Detalhes do jovem</Text>

      <TextInput value={name} onChangeText={setName} className="mb-3 rounded-lg border border-slate-300 bg-white p-3 text-base" />
      <TextInput value={age} onChangeText={setAge} keyboardType="numeric" className="mb-3 rounded-lg border border-slate-300 bg-white p-3 text-base" />

      <View className="mb-3 flex-row gap-3">
        <Pressable onPress={() => setGender('male')} className={`flex-1 rounded-lg border p-3 ${gender === 'male' ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-white'}`}>
          <Text className="text-center">Masculino</Text>
        </Pressable>
        <Pressable onPress={() => setGender('female')} className={`flex-1 rounded-lg border p-3 ${gender === 'female' ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-white'}`}>
          <Text className="text-center">Feminino</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={handleSave}
        className="rounded-lg bg-sky-700 p-4"
      >
        <Text className="text-center text-base font-semibold text-white">Salvar</Text>
      </Pressable>

      <Text className="mt-6 text-lg font-semibold text-slate-900">Adicionar relato</Text>
      <TextInput value={newEntryText} onChangeText={setNewEntryText} multiline className="mt-2 min-h-24 rounded-lg border border-slate-300 bg-white p-3 text-base" />
      <Pressable
        onPress={handleAddEntry}
        className="mt-3 rounded-lg bg-sky-700 p-4"
      >
        <Text className="text-center text-base font-semibold text-white">Adicionar relato</Text>
      </Pressable>

      {error ? <Text className="mt-3 text-sm text-red-600">{error}</Text> : null}

      <Text className="mt-6 text-lg font-semibold text-slate-900">Relatos</Text>
      <View className="mt-3">
        <ProgressEntryList entries={entries} />
      </View>

      <Pressable onPress={() => setShowDelete(true)} className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4">
        <Text className="text-center text-base font-semibold text-red-700">Excluir jovem</Text>
      </Pressable>

      <ConfirmDeleteModal visible={showDelete} youngName={young.name} onCancel={() => setShowDelete(false)} onConfirm={handleDelete} />
      <SaveToast visible={showToast} />
    </ScrollView>
  );
}
