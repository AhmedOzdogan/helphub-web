import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useAppStore } from '../store/useAppStore';
import apiClient from '../api/client';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { isLoading, error, setLoading, setError, clearError } = useAppStore();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    clearError();
    try {
      // Example API call — replace with your actual endpoint
      const response = await apiClient.get('/health');
      setMessage(String(response.data?.message ?? 'Connected!'));
    } catch {
      setError('Could not reach the server. (Demo mode)');
      setMessage('Welcome to HelpHub!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-3xl font-bold text-blue-600 mb-2">HelpHub</Text>
      <Text className="text-base text-gray-500 mb-8 text-center">
        Your all-in-one support platform
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : (
        <Text className="text-sm text-gray-400 mb-6">{message}</Text>
      )}

      {error ? (
        <Text className="text-xs text-red-400 mb-4 text-center">{error}</Text>
      ) : null}

      <TouchableOpacity
        className="bg-blue-600 px-8 py-3 rounded-2xl"
        onPress={() => navigation.navigate('Profile')}
      >
        <Text className="text-white font-semibold text-base">Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4 px-8 py-3" onPress={fetchData}>
        <Text className="text-blue-500 text-sm">Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}
