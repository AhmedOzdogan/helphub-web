import { Text, View } from 'react-native';
import Navbar from '../../components/ui/Navbar';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white gap-y-96">
      <Navbar />

      <View className="items-center px-6 ">
        <Text className="text-3xl font-bold text-gray-800">
          Welcome to HelpHub
        </Text>
        <Text className="mt-3 text-base text-gray-600">
          Step 1: Navbar base created successfully.
        </Text>
      </View>
    </View>
  );
}