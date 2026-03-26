import { Image, Pressable, Text, View } from 'react-native';
import companies from '../assets/companies.webp';

function Companies() {
    return (
        <View className="w-full flex-row items-center justify-evenly bg-[#f5f5f5] px-20 py-16">
            {/* LEFT SIDE */}
            <View className="max-w-[500px]">
                <Text className="text-[30px] font-semibold text-slate-800 leading-[38px]">
                    Special support for companies
                </Text>

                <Text className="text-[30px] font-bold text-red-500 leading-[38px]">
                    HelpHub Solutions
                </Text>

                <Pressable className="mt-6">
                    <Text className="rounded-full bg-red-500 px-6 py-3 text-center text-[16px] font-semibold text-white hover:bg-red-300">
                        Contact Us
                    </Text>
                </Pressable>
            </View>

            {/* RIGHT SIDE */}
            <View className="items-center justify-center gap-4">
                <Text className="text-[16px] text-gray-400">
                    Companies partnering with HelpHub
                </Text>

                <Image
                    source={companies}
                    resizeMode="contain"
                    className="h-[60px] w-[400px]"
                />
            </View>
        </View>
    );
}

export default Companies;
