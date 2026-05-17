import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return React.createElement(Tabs, {
    screenOptions: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
    },
  });
}
