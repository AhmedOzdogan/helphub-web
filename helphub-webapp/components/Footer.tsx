import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import AppStoreDownload from './ui/AppStoreDownload';
import GooglePlayDownload from './ui/GooglePlayDownload';


function Footer() {
    return (
        <View className="mx-auto w-full bg-red-500 px-4 md:px-6 py-8 md:py-12">
            {/* TOP ROW */}
            <View className="flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-32">
                {/* LOGO */}
                <View className="w-[220px] items-center md:items-start">
                    <Text className="text-xl md:text-[24px] font-bold text-white">HelpHub</Text>
                </View>

                {/* LINKS COL 1 */}
                <View className="items-center gap-3 text-center">
                    <Link href={"/how-it-works" as any} asChild>
                        <Text className="text-sm md:text-[16px] font-semibold text-white">How it works?</Text>
                    </Link>
                    <Link href={"/about" as any} asChild>
                        <Text className="text-sm md:text-[16px] text-white">About Us</Text>
                    </Link>
                    <Link href={"/contact" as any} asChild>
                        <Text className="text-sm md:text-[16px] text-white">Contact</Text>
                    </Link>
                    <Link href={"/blog" as any} asChild>
                        <Text className="text-sm md:text-[16px] text-white">Blog</Text>
                    </Link>
                </View>

                {/* LINKS COL 2 */}
                <View className="items-center gap-3 text-center">
                    <Link href={"/terms" as any} asChild>
                        <Text className="text-sm md:text-[16px] text-white">Terms of Use</Text>
                    </Link>
                    <Link href={"/privacy" as any} asChild>
                        <Text className="text-sm md:text-[16px] text-white">Privacy Policy & GDPR</Text>
                    </Link>
                    <Link href={"/distance-sales" as any} asChild>
                        <Text className="text-sm md:text-[16px] text-white">Distance Sales Agreement</Text>
                    </Link>
                    <Link href={"/refund" as any} asChild>
                        <Text className="text-sm md:text-[16px] text-white">Refund Policy</Text>
                    </Link>
                    <Link href={"/cookies" as any} asChild>
                        <Text className="text-sm md:text-[16px] text-white">Cookie Policy</Text>
                    </Link>
                </View>

                {/* SOCIAL + STORES */}
                <View className="items-center md:items-start gap-4">
                    <Text className="text-sm md:text-[16px] font-semibold text-white">Follow Us</Text>

                    <View className="flex-row gap-3">
                        <Link href="/" asChild>
                            <View className="h-10 w-10 items-center justify-center rounded-md bg-white">
                                <Ionicons name="logo-facebook" size={18} color="#ef4444" />
                            </View>
                        </Link>
                        <Link href="/" asChild>
                            <View className="h-10 w-10 items-center justify-center rounded-md bg-white">
                                <Ionicons name="logo-instagram" size={18} color="#ef4444" />
                            </View>
                        </Link>
                        <Link href="/" asChild>
                            <View className="h-10 w-10 items-center justify-center rounded-md bg-white">
                                <Ionicons name="logo-linkedin" size={18} color="#ef4444" />
                            </View>
                        </Link>
                    </View>

                    <View className="mt-2 gap-3">
                        <GooglePlayDownload />
                        <AppStoreDownload />
                    </View>
                </View>
            </View>

            {/* DISCLAIMER */}
            <View className="mt-8 md:mt-12 items-center">
                <Text className="max-w-[900px] text-center text-xs md:text-[14px] leading-[20px] md:leading-[24px] text-white px-2">
                    Disclaimer – Online counseling services are not suitable for everyone. If you are experiencing thoughts of self-harm or suicide, these services may not be appropriate for you. In such cases, we strongly recommend contacting local emergency support services.
                </Text>

                <Text className="mt-4 text-center text-xs md:text-[14px] text-white px-2">
                    Emergency Hotline: 112, Police: 155, Domestic Violence Support: 183, Substance Abuse Support: 191
                </Text>
            </View>
        </View>
    );
}

export default Footer;