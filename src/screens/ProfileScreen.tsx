import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ROWS: Array<{ label: string; value: string }> = [
  { label: 'Role', value: 'Support Agent' },
  { label: 'Department', value: 'Customer Success' },
  { label: 'Tickets Resolved', value: '142' },
];

export default function ProfileScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-6">
        <Text className="text-4xl">👤</Text>
      </View>

      <Text className="text-2xl font-bold text-gray-800 mb-1">John Doe</Text>
      <Text className="text-sm text-gray-400 mb-8">john.doe@example.com</Text>

      <View className="w-full bg-gray-50 rounded-2xl p-4 mb-8">
        {ROWS.map((row, index) => (
          <ProfileRow
            key={row.label}
            label={row.label}
            value={row.value}
            isLast={index === ROWS.length - 1}
          />
        ))}
      </View>

      <TouchableOpacity
        className="bg-blue-600 px-8 py-3 rounded-2xl"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white font-semibold text-base">Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function ProfileRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast: boolean;
}) {
  return (
    <View
      className={`flex-row justify-between py-2${isLast ? '' : ' border-b border-gray-100'}`}
    >
      <Text className="text-gray-500 text-sm">{label}</Text>
      <Text className="text-gray-800 text-sm font-medium">{value}</Text>
    </View>
  );
}
