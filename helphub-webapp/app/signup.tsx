import RedButton from '@/components/ui/RedButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useReducer } from 'react';
import { Platform, ScrollView, Text, TextInput, View } from 'react-native';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import { useSignUp } from '../hooks/loginSignupHook';
import { useRouter } from 'expo-router';

function Signup() {

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
    const [user, dispatchUser] = useReducer((state, action) => {
        switch (action.type) {
            case 'SET_NAME':
                return { ...state, name: action.payload };
            case 'SET_EMAIL':
                return { ...state, email: action.payload };
            case 'SET_PASSWORD':
                return { ...state, password: action.payload };
            case 'SET_CONFIRM_PASSWORD':
                return { ...state, confirmPassword: action.payload };
            default:
                return state;
        }
    }, {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const router = useRouter();

    const { signup, loading, error } = useSignUp();

    const handleSignUp = async () => {
        // check passwords match
        if (user.password !== user.confirmPassword) {
            return alert('Passwords do not match');
        }
        try {
            const response = await signup(user.name, user.email, user.password);
            console.log('Signup successful:', response);
            router.push('/');
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    return (
        <ScrollView
            className={`bg-[#f5f5f5] z-[-999] ${Platform.OS === 'ios' || Platform.OS === 'android' ? 'mt-16' : ''}`}
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
                <View className="mx-auto w-full max-w-[500px] rounded-[34px] border border-[#d9d9d9] bg-[#f8f8f8] px-10 py-5 shadow-sm z-[-999] my-10">
                    <View className="items-center">
                        <View className="h-[64px] w-[64px] items-center justify-center rounded-full bg-[#f8ebeb]">
                            <Ionicons name="person" size={28} color="#ef3734" />
                        </View>

                        <Text className="mt-3 text-2xl font-medium text-[#ef3734]">
                            Sign Up
                        </Text>
                    </View>


                    <View className="mx-auto mt-5 w-full">
                        <Text className="mb-2 text-xl font-semibold text-[#1f2933]">
                            Full Name
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#b4b4be] bg-transparent px-3 py-2">
                            <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                            <TextInput
                                editable={true}
                                placeholder="Write your full name"
                                value={user.name}
                                onChangeText={(text) => dispatchUser({ type: 'SET_NAME', payload: text })}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                            />
                        </View>
                        <Text className="mb-2 mt-5 text-xl font-semibold text-[#1f2933]">
                            Email Address
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#b4b4be] bg-transparent px-3 py-2">
                            <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                            <TextInput
                                editable={true}
                                placeholder="Write your email"
                                value={user.email}
                                onChangeText={(text) => dispatchUser({ type: 'SET_EMAIL', payload: text })}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
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
                                value={user.password}
                                onChangeText={(text) => dispatchUser({ type: 'SET_PASSWORD', payload: text })}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                            />
                            <Ionicons name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={18} color="#9ca3af" onPress={() => setSecureTextEntry(!secureTextEntry)} />
                        </View>

                        <Text className="mb-2 mt-5 text-xl font-semibold text-[#1f2933]">
                            Password Again
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#d3d3d8] bg-transparent px-3 py-2">
                            <Ionicons name="lock-closed" size={18} color="#9ca3af" />
                            <TextInput
                                editable={true}
                                secureTextEntry={confirmSecureTextEntry}
                                placeholder="Write your password again"
                                value={user.confirmPassword}
                                onChangeText={(text) => dispatchUser({ type: 'SET_CONFIRM_PASSWORD', payload: text })}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                            />
                            <Ionicons name={confirmSecureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={18} color="#9ca3af" onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)} />
                        </View>

                        <RedButton
                            ButtonText='Sign Up'
                            wfull={true}
                            onPress={handleSignUp}
                            disabled={loading}
                            {...loading && { Icon: { name: 'reload-circle-sharp', size: 18, color: 'white' }, rotatingIcon: true }}
                        />

                        <View className="mt-10 flex-row items-center justify-center sm:mt-12">
                            <Text className="text-base font-medium text-[#a1a7b4]">
                                Have an account?
                            </Text>
                            <Text className="ml-2 text-base font-medium text-[#ef3734]">
                                Login
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <Footer />
        </ScrollView>
    );
}

export default Signup;