import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import {
  InteractionManager,
  Platform,
  Pressable,
  StatusBar as NativeStatusBar,
  Text,
  View,
} from 'react-native';
import '../styles/global.css';

SystemUI.setBackgroundColorAsync('#0369a1').catch(() => undefined);

export default function RootLayout() {
  const [statusBarReady, setStatusBarReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Keep the app's status bar configuration after Expo Router's automatic one.
    setStatusBarReady(true);
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const task = InteractionManager.runAfterInteractions(() => {
      NativeStatusBar.setBarStyle('light-content', false);
      NativeStatusBar.setBackgroundColor('#0369a1', false);
      NativeStatusBar.setTranslucent(false);
    });

    return () => task.cancel();
  }, [pathname]);

  return (
    <View className="flex-1 bg-sky-700">
      {statusBarReady && (
        <StatusBar
          style="light"
          backgroundColor="#0369a1"
          translucent={false}
        />
      )}
      <Stack
        screenOptions={{
          headerShown: true,
          statusBarStyle: 'light',
          contentStyle: { backgroundColor: '#0369a1' },
          headerBackground: () => <View className="flex-1 bg-sky-700" />,
          headerTintColor: '#ffffff',
          headerTitleStyle: { color: '#ffffff', fontWeight: '600' },
          headerTitle: ({ children, tintColor }) => (
            <Text
              numberOfLines={1}
              style={{
                color: tintColor ?? '#ffffff',
                fontSize: Platform.OS === 'android' ? 20 : 17,
                fontWeight: '600',
                marginLeft: 8,
              }}
            >
              {children}
            </Text>
          ),
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
    </View>
  );
}
