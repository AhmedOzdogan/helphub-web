import { Platform, ScrollView, Text, View } from 'react-native';
import Advantages from '../../components/Advantages';
import Companies from '../../components/Companies';
import Details from '../../components/Details';
import Download from '../../components/Download';
import Featured from '../../components/Featured';
import Footer from '../../components/Footer';
import HowItWorks from '../../components/HowItWorks';
import Navbar from '../../components/Navbar';
import Numbers from '../../components/Numbers';
import PopulerCategories from '../../components/PopulerCategories';
import Slider from '../../components/Slider';
import Blog from '../../components/blog';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  // State to control scroll enabled status for ScrollView 
  // when mobile menu is open
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { t } = useTranslation();

  return (
    <ScrollView
      className={`flex-1 bg-white ${Platform.OS === 'web' ? '' : 'mt-16'}`}
      id="page-content"
      style={Platform.OS === 'web' ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } as any : {}}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      scrollEnabled={scrollEnabled}
    >
      <Navbar onMobileMenuChange={(isOpen) => setScrollEnabled(!isOpen)} />

      <Slider />

      <View className="p-10 bg-blue-50 w-full justify-center items-center flex-col -z-10">
        <View className="mb-4 justify-center items-center flex-1 max-w-2xl">
          <Text className="text-2xl md:text-3xl font-bold text-center">
            {t('intro.firstText')} <Text className="text-blue-500">HelpHub!</Text>
          </Text>
          <Text className="text-lg md:text-xl text-gray-600 mt-1 text-center">
            {t('intro.secondText')} <Text className="text-blue-500">HelpHub</Text>.
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
      <Details />
      <Companies />
      <Numbers />
      <Blog />
      <Footer />
    </ScrollView>
  );
}