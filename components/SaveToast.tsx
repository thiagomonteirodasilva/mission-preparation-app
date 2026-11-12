import React from 'react';
import { Text, View } from 'react-native';

type SaveToastProps = {
  visible: boolean;
  message?: string;
};

export default function SaveToast({ visible, message = 'Salvo com sucesso' }: SaveToastProps) {
  if (!visible) return null;

  return (
    <View className="absolute bottom-8 left-6 right-6 rounded-lg bg-emerald-600 px-4 py-3 shadow-lg">
      <Text className="text-center text-base font-medium text-white">{message}</Text>
    </View>
  );
}
