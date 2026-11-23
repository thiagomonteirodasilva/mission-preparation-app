import React from 'react';
import { Stack } from 'expo-router';

export default function UnitRouteLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'light',
      }}
    >
      <Stack.Screen name="edit" />
    </Stack>
  );
}
