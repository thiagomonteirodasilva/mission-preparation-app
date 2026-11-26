import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

type ConfirmDeleteModalProps = {
  visible: boolean;
  youngName: string;
  onCancel: () => void;
  onConfirm: () => void;
  deleting: boolean;
  error: string;
};

export default function ConfirmDeleteModal({ visible, youngName, onCancel, onConfirm, deleting, error }: ConfirmDeleteModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={() => { if (!deleting) onCancel(); }}>
      <View className="flex-1 items-center justify-center bg-black/40 p-6">
        <View className="w-full max-w-md rounded-xl bg-white p-5">
          <Text className="text-xl font-semibold text-slate-900">Confirmar exclusão</Text>
          <Text className="mt-3 text-base text-slate-700">
            Tem certeza que deseja excluir {youngName}? Os dados serão perdidos e a ação não poderá ser desfeita.
          </Text>

          {error ? <Text accessibilityRole="alert" className="mt-3 text-sm text-red-600">{error}</Text> : null}

          <View className="mt-5 flex-row justify-end gap-3">
            <Pressable accessibilityRole="button" disabled={deleting} onPress={onCancel} className="rounded-lg border border-slate-300 px-4 py-2">
              <Text className="text-slate-700">Cancelar</Text>
            </Pressable>
            <Pressable accessibilityRole="button" disabled={deleting} onPress={onConfirm} className="rounded-lg bg-red-600 px-4 py-2">
              <Text className="font-medium text-white">{deleting ? 'Excluindo...' : 'Excluir'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
