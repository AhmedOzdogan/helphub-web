import Ionicons from '@expo/vector-icons/Ionicons';
import { useReducer, useState } from 'react';
import { Platform, ScrollView, Text, TextInput, View } from 'react-native';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import RedButton from '../components/ui/RedButton';

import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSignUp } from '../hooks/loginSignupHook';

type UserState = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type UserAction =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_CONFIRM_PASSWORD'; payload: string };

function Signup() {

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
    const [signupError, setSignupError] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { t, i18n } = useTranslation();

    const [user, dispatchUser] = useReducer((state: UserState, action: UserAction): UserState => {
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

        if (loading) return;

        // Reset states
        setSignupError(false);
        setSignupSuccess(false);
        setErrorMessage('');

        // Empty field validation
        if (
            !user.name.trim() ||
            !user.email.trim() ||
            !user.password.trim() ||
            !user.confirmPassword.trim()
        ) {

            setSignupError(true);
            setErrorMessage('Please fill all fields');

            return;
        }

        // Password match validation
        if (user.password !== user.confirmPassword) {

            setSignupError(true);
            setErrorMessage('Passwords do not match');

            return;
        }

        try {

            await signup(
                user.name,
                user.email,
                user.password
            );

            setSignupSuccess(true);

            setTimeout(() => {
                router.push('/');
            }, 1000);

        } catch (err) {

            console.error('Signup failed:', err);

            setSignupError(true);

            setErrorMessage('Signup failed. Please try again');
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

                        <Text
                            testID='signup-header'
                            className="mt-3 text-2xl font-medium text-[#ef3734]"
                        >
                            {t("SignupPage.signup")}
                        </Text>
                    </View>


                    <View className="mx-auto mt-5 w-full">
                        <Text className="mb-2 text-xl font-semibold text-[#1f2933]">
                            {t("SignupPage.fullName")}
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#b4b4be] bg-transparent px-3 py-2">
                            <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                            <TextInput
                                testID='signup-name-input'
                                autoCapitalize='words'
                                autoCorrect={false}
                                editable={true}
                                placeholder={t("SignupPage.fullNamePlaceholder")}
                                value={user.name}
                                onChangeText={(text) => dispatchUser({ type: 'SET_NAME', payload: text })}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                            />
                        </View>
                        <Text className="mb-2 mt-5 text-xl font-semibold text-[#1f2933]">
                            {t("SignupPage.email")}
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#b4b4be] bg-transparent px-3 py-2">
                            <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                            <TextInput
                                testID='signup-email-input'
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'
                                editable={true}
                                placeholder={t("SignupPage.emailPlaceholder")}
                                value={user.email}
                                onChangeText={(text) => dispatchUser({ type: 'SET_EMAIL', payload: text })}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                            />
                        </View>

                        <Text className="mb-2 mt-5 text-xl font-semibold text-[#1f2933]">
                            {t("SignupPage.password")}
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#d3d3d8] bg-transparent px-3 py-2">
                            <Ionicons name="lock-closed" size={18} color="#9ca3af" />
                            <TextInput
                                testID='signup-password-input'
                                autoCapitalize='none'
                                autoCorrect={false}
                                editable={true}
                                secureTextEntry={secureTextEntry}
                                placeholder={t("SignupPage.passwordPlaceholder")}
                                value={user.password}
                                onChangeText={(text) => dispatchUser({ type: 'SET_PASSWORD', payload: text })}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                            />
                            <Ionicons name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={18} color="#9ca3af" onPress={() => setSecureTextEntry(!secureTextEntry)} />
                        </View>

                        <Text className="mb-2 mt-5 text-xl font-semibold text-[#1f2933]">
                            {t("SignupPage.confirmPassword")}
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#d3d3d8] bg-transparent px-3 py-2">
                            <Ionicons name="lock-closed" size={18} color="#9ca3af" />
                            <TextInput
                                testID='signup-confirm-password-input'
                                autoCapitalize='none'
                                autoCorrect={false}
                                editable={true}
                                secureTextEntry={confirmSecureTextEntry}
                                placeholder={t("SignupPage.confirmPasswordPlaceholder")}
                                value={user.confirmPassword}
                                onChangeText={(text) => dispatchUser({ type: 'SET_CONFIRM_PASSWORD', payload: text })}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                            />
                            <Ionicons name={confirmSecureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={18} color="#9ca3af" onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)} />
                        </View>

                        <RedButton
                            testID='signup-button'
                            ButtonText={t("SignupPage.signup")}
                            wfull={true}
                            onPress={handleSignUp}
                            disabled={loading}
                            {...loading && { Icon: { name: 'reload-circle-sharp', size: 18, color: 'white' }, rotatingIcon: true }}
                        />

                        {signupError && (
                            <View className="mt-4 items-center">
                                <Text
                                    testID='signup-error'
                                    className="text-base font-medium text-red-500 text-center"
                                >
                                    {errorMessage}
                                </Text>
                            </View>
                        )}

                        {signupSuccess && (
                            <View className="mt-4 items-center">
                                <Text
                                    testID='signup-success'
                                    className="text-base font-medium text-green-500 text-center"
                                >
                                    Signup successful. Redirecting...
                                </Text>
                            </View>
                        )}

                        <View className="mt-10 flex-row items-center justify-center sm:mt-12">
                            <Text className="text-base font-medium text-[#a1a7b4]">
                                {t("SignupPage.haveAccount")}
                            </Text>
                            <Text className="ml-2 text-base font-medium text-[#ef3734]">
                                {t("LoginPage.login")}
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