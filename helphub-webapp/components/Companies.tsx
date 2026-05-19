import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import companies from '../assets/companies.webp';
import RedButton from './ui/RedButton';
function Companies() {
    const { t, i18n } = useTranslation();
    return (
        <View testID="companies-section" className="w-full flex-col items-center justify-center gap-8 bg-[#f5f5f5] px-4 py-8 md:px-8 md:py-12 lg:flex-row lg:justify-evenly lg:gap-0 lg:px-20 lg:py-16">
            {/* LEFT SIDE */}
            <View testID="companies-left-content" className="w-full items-center md:max-w-[600px] lg:max-w-[500px] lg:items-start">
                <Text className="text-center text-xl font-semibold leading-relaxed text-slate-800 md:text-2xl lg:text-left lg:leading-[38px]">
                    {'companies.leftSide.text1'}
                </Text>

                <Text className="text-center text-xl font-bold leading-relaxed text-red-500 md:text-2xl lg:text-left lg:leading-[38px]">
                    {'companies.leftSide.text2'}
                </Text>

                <View className="mt-4">
                    <RedButton ButtonText={'companies.leftSide.buttonText'} />
                </View>
            </View>

            {/* RIGHT SIDE */}
            <View testID="companies-partners-content" className="w-full items-center justify-center gap-4 lg:w-auto">
                <Text className="px-4 text-center text-base text-gray-400 md:text-xl lg:text-2xl">
                    {'companies.rightSide.text1'}
                </Text>

                <Image
                    testID="companies-logo-image"
                    source={companies}
                    resizeMode="contain"
                    accessibilityRole="image"
                    accessibilityLabel={'companies.rightSide.accesibilityLabel'}
                    className="h-[40px] w-full max-w-[320px] md:h-[52px] md:max-w-[520px] lg:h-[60px] lg:w-[400px]"
                />
            </View>
        </View>
    );
}

export default Companies;
