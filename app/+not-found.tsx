import React from 'react';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 p-6">
      <Text className="text-xl font-semibold text-slate-900">Página não encontrada</Text>
    </View>
  );
}
