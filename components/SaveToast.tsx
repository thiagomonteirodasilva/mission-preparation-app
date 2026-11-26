import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { Text, View } from 'react-native';

export const saveToastConfig: ToastConfig = {
  success: ({ text1 }) => (
    <View className="mx-6 flex-row items-center rounded-lg bg-emerald-600 px-4 py-3 shadow-lg">
      <MaterialIcons name="check-circle" size={22} color="#ffffff" />
      <Text className="ml-3 flex-1 text-base font-medium text-white">{text1}</Text>
    </View>
  ),
};

export function showSaveToast() {
  Toast.show({
    type: 'success',
    text1: 'Salvo com sucesso',
    position: 'bottom',
    visibilityTime: 3000,
  });
}

export function hideSaveToast() {
  Toast.hide();
}
