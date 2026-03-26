import Advantages from '@/components/Advantages';
import Download from '@/components/Download';
import HowItWorks from '@/components/HowItWorks';
import { Text, View } from 'react-native';
import Featured from '../../components/Featured';
import Navbar from '../../components/Navbar';
import PopulerCategories from '../../components/PopulerCategories';
import Slider from '../../components/Slider';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-start overflow-auto">
      <Navbar />

      <Slider />

      <View className="p-10 bg-blue-50 w-full justify-center items-center -z-10">
        <View className="mb-4 justify-center items-center">
          <Text className="text-3xl font-bold">
            Online psychologists, family counselors, child development experts, astrologers, and more on <Text className="text-blue-500">HelpHub!</Text>
          </Text>
          <Text className="text-xl text-gray-600 mt-1">
            Professional guidance for personal and career growth. Reach your goals and live happier with <Text className="text-blue-500">HelpHub</Text>.
          </Text>
        </View>
      </View>

      <PopulerCategories />
      <Featured categoryName="Featured Consultants" />
      <Featured categoryName="Top Rated Consultants" />
      <HowItWorks />
      <Featured categoryName="New Consultants" />
      <Featured categoryName="Online Consultants" />
      <Advantages />
      <Download />

    </View>
  );
}