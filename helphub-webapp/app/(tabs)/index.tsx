import "../../global.css"
import React from "react";
import { Text, View, Pressable } from "react-native";
import { verifyInstallation } from "nativewind";

export default function App() {
  verifyInstallation();

  return (
    <View className="flex-1 items-center justify-center bg-black px-6">
      <View className="w-full max-w-sm rounded-3xl bg-white p-6 shadow">
        <Text className="text-3xl font-bold text-blue-600">
          NativeWind Test
        </Text>

        <Text className="mt-3 text-base text-gray-700">
          If you see a white card, blue title, gray text, rounded corners, and spacing,
          NativeWind is working.
        </Text>

        <Pressable className="mt-6 rounded-2xl bg-green-500 px-4 py-3 active:opacity-80">
          <Text className="text-center font-semibold text-white">
            Test Button
          </Text>
        </Pressable>
      </View>
    </View>
  );
}