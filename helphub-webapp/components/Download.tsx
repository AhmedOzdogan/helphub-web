import { Image, ImageStyle, StyleSheet, Text, View } from 'react-native';
import appImage from '../assets/app.webp';
import worldbg from '../assets/world-bg.webp';
import AppStoreDownload from './ui/AppStoreDownload';
import GooglePlayDownload from './ui/GooglePlayDownload';

const styles = StyleSheet.create({
    appImage: {
        width: 350,
        height: 350,
        maxWidth: 350,
        maxHeight: 350,
    } as ImageStyle,
});

function Download() {
    return (
        <View className="w-full items-center justify-center bg-[#f5f5f5] px-4 py-10 sm:px-6 sm:py-16">
            <Image
                source={worldbg}
                resizeMode="contain"
                className="absolute inset-0 h-full w-full opacity-20"
                style={{ width: '100%', height: '100%' }}
            />
            <Text className="mb-8 text-center text-2xl font-bold text-slate-800 sm:mb-12 sm:text-3xl">
                Download the Advicemy App!
            </Text>

            <View className="relative w-full max-w-[1400px] overflow-hidden rounded-[20px] px-4 py-8 bg-world sm:rounded-[28px] sm:px-8 sm:py-10">

                <View className="flex-col items-center justify-center gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between">
                    <View className="w-full max-w-[720px] flex-1">
                        <Text className="text-center lg:text-left mb-4 text-2xl font-bold leading-[30px] text-slate-800 sm:text-3xl sm:leading-[38px]">
                            The fastest way to reach expert consultants
                        </Text>

                        <Text className="text-center lg:text-left mb-6 text-base leading-[28px] text-slate-700 sm:mb-8 sm:text-lg sm:leading-[32px]">
                            With the Advicemy mobile app, you can access all our services much
                            faster and more easily. Wherever you are, you can either book an
                            instant appointment or schedule one for the day and time that
                            works best for you.
                        </Text>

                        <View className="flex-row items-center justify-center gap-3 sm:gap-4">
                            <AppStoreDownload />
                            <GooglePlayDownload />
                        </View>
                    </View>

                    <View className="hidden w-full max-w-[300px] items-end justify-center overflow-hidden sm:flex sm:max-w-[350px] lg:w-[420px] lg:max-w-none lg:shrink-0">
                        <View className="h-[280px] w-[280px] items-end justify-center overflow-hidden sm:h-[350px] sm:w-[350px]">
                            <Image
                                source={appImage}
                                resizeMode="contain"
                                style={styles.appImage}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Download;
