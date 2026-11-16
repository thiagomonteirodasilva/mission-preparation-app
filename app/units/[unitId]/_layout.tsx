import React from 'react';
import { router, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function UnitRouteLayout() {
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
            <Text className="text-white">‹ Voltar</Text>
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Jovens da unidade' }} />
      <Stack.Screen name="edit" options={{ title: 'Editar Unidade' }} />
    </Stack>
  );
}
