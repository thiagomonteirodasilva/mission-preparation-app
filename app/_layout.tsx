import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Pressable, View } from 'react-native';
import '../styles/global.css';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackground: () => <View className="flex-1 bg-sky-700" />,
        headerTintColor: '#ffffff',
        headerTitleStyle: { color: '#ffffff', fontWeight: '600' },
        headerBackVisible: false,
        headerLeft: ({ canGoBack }) => (
          <Pressable
            accessibilityLabel="Voltar"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => (canGoBack ? router.back() : router.replace('/'))}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Unidades', headerLeft: () => null }} />
      <Stack.Screen name="units/index" options={{ title: 'Nova unidade' }} />
      <Stack.Screen name="units/[unitId]" options={{ title: 'Editar unidade' }} />
      <Stack.Screen name="young/new" options={{ title: 'Novo jovem' }} />
      <Stack.Screen name="young/[youngId]" options={{ title: 'Detalhes do jovem' }} />
      <Stack.Screen name="+not-found" options={{ title: 'Página não encontrada' }} />
    </Stack>
  );
}
