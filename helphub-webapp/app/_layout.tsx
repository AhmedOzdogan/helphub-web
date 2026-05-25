import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import '../global.css';
import '../i18n';

// Suppress expo-router pointerEvents deprecation warning
if (!__DEV__) {
  console.warn = () => { };
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Stack,
      { screenOptions: { headerShown: false } },
      React.createElement(Stack.Screen, {
        name: '(tabs)',
        options: { headerShown: false },
      })
    ),
    React.createElement(StatusBar, { style: 'dark' })
  );
}
