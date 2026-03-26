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
        <View className="w-full items-center justify-center bg-[#f5f5f5] px-6 py-16">
            <Image
                source={worldbg}
                resizeMode="contain"
                className="absolute inset-0 -z-10 h-full w-full opacity-20"
                style={{ width: '100%', height: '100%' }}
            />
            <Text className="mb-12 text-center text-[28px] font-bold text-slate-800">
                Download the Advicemy App!
            </Text>

            <View className="relative w-full max-w-[1400px] overflow-hidden rounded-[28px] px-8 py-10 bg-world">

                <View className="flex-row items-center justify-between gap-10">
                    <View className="max-w-[720px] flex-1">
                        <Text className="mb-4 text-[30px] font-bold leading-[38px] text-slate-800">
                            The fastest way to reach expert consultants
                        </Text>

                        <Text className="mb-8 text-[18px] leading-[32px] text-slate-700">
                            With the Advicemy mobile app, you can access all our services much
                            faster and more easily. Wherever you are, you can either book an
                            instant appointment or schedule one for the day and time that
                            works best for you.
                        </Text>

                        <View className="flex-row items-center gap-4">


                            <AppStoreDownload />
                            <GooglePlayDownload />
                        </View>
                    </View>

                    <View className="w-[420px] shrink-0 items-end justify-center overflow-hidden">
                        <View className="h-[350px] w-[350px] items-end justify-center overflow-hidden">
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