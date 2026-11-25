import React from 'react';
import { Stack } from 'expo-router';

export default function UnitRouteLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'light',
        contentStyle: { backgroundColor: '#0369a1' },
      }}
    >
      <Stack.Screen name="edit" />
    </Stack>
  );
}
