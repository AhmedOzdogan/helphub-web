import { Image, Text, View } from 'react-native';
import companies from '../assets/companies.webp';
import RedButton from './ui/RedButton';
function Companies() {
    return (
        <View className="w-full flex-col md:flex-row items-center justify-center md:justify-evenly gap-8 md:gap-0 bg-[#f5f5f5] px-4 md:px-20 py-8 md:py-16">
            {/* LEFT SIDE */}
            <View className="w-full md:max-w-[500px] items-center md:items-start">
                <Text className="text-xl md:text-[30px] font-semibold text-slate-800 leading-relaxed md:leading-[38px] text-center md:text-left">
                    Special support for companies
                </Text>

                <Text className="text-xl md:text-[30px] font-bold text-red-500 leading-relaxed md:leading-[38px] text-center md:text-left">
                    HelpHub Solutions
                </Text>

                <View className="mt-4">
                    <RedButton ButtonText="Contact Us" />
                </View>
            </View>

            {/* RIGHT SIDE */}
            <View className="w-full md:w-auto items-center justify-center gap-4">
                <Text className="text-base md:text-[25px] text-gray-400 text-center px-4">
                    Companies partnering with HelpHub
                </Text>

                <Image
                    source={companies}
                    resizeMode="contain"
                    className="h-[40px] max-w-[350px] md:h-[60px] md:w-[400px]"
                />
            </View>
        </View>
    );
}

export default Companies;
