import RedButton from '@/components/ui/RedButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Platform, ScrollView, Text, TextInput, View } from 'react-native';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Login() {

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <ScrollView
            className={"bg-[#f5f5f5] z-[-999] " + (Platform.OS === 'ios' || Platform.OS === 'android' ? 'mt-16' : '')}
            style={{
                minHeight: Platform.OS === 'web' ? '100%' : '100%',
                flex: 1,
            }}
        >
            <Navbar />

            <View
                className="px-2 pb-3 z-[-999]"
                style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                }}
            >
                <View className="mx-auto w-full max-w-[500px] rounded-[34px] border border-[#d9d9d9] bg-[#f8f8f8] px-10 py-5 shadow-sm my-10">
                    <View className="items-center">
                        <View className="h-[64px] w-[64px] items-center justify-center rounded-full bg-[#f8ebeb]">
                            <Ionicons name="person" size={28} color="#ef3734" />
                        </View>

                        <Text className="mt-3 text-2xl font-medium text-[#ef3734]">
                            Login
                        </Text>
                    </View>

                    <View className="mx-auto mt-5 w-full">
                        <Text className="mb-2 text-xl font-semibold text-[#1f2933]">
                            Email Address
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#b4b4be] bg-transparent px-3 py-2">
                            <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                            <TextInput
                                editable={true}
                                placeholder="Write your email"
                                className="ml-4 flex-1 text-base text-[#1f2933] border-none outline-none"
                            />
                        </View>

                        <Text className="mb-2 mt-5 text-xl font-semibold text-[#1f2933]">
                            Password
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#d3d3d8] bg-transparent px-3 py-2">
                            <Ionicons name="lock-closed" size={18} color="#9ca3af" />
                            <TextInput
                                editable={true}
                                secureTextEntry={secureTextEntry}
                                placeholder="Write your password"
                                className="ml-4 flex-1 text-base text-[#1f2933] border-none outline-none"
                            />
                            <Ionicons name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={18} color="#9ca3af" onPress={() => setSecureTextEntry(!secureTextEntry)} />
                        </View>

                        <View className="mt-4 items-end">
                            <Text className="text-base font-medium text-[#ef3734]">
                                Forgot Password?
                            </Text>
                        </View>

                        <RedButton ButtonText='Login' wfull={true} />

                        <View className="mt-10 flex-row items-center justify-center sm:mt-12">
                            <Text className="text-base font-medium text-[#a1a7b4]">
                                Don't have an account?
                            </Text>
                            <Text className="ml-2 text-base font-medium text-[#ef3734]">
                                Sign Up
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <Footer />
        </ScrollView>
    );
}

export default Login;