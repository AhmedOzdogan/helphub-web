import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, Text, TextInput, View } from 'react-native';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import RedButton from '../components/ui/RedButton';
import { useLogin } from '../hooks/loginSignupHook';

function Login() {
    const { login, loading, error } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const [loginError, setLoginError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {

        if (loading) return;

        // Reset states
        setLoginError(false);
        setLoginSuccess(false);
        setErrorMessage('');

        // Basic validation
        if (!email.trim() || !password.trim()) {

            setLoginError(true);
            setErrorMessage('Please fill all fields');

            return;
        }

        try {

            await login(email, password);

            setLoginSuccess(true);

            // Small delay so success message becomes visible
            setTimeout(() => {
                router.push('/');
            }, 1000);

        } catch (err) {

            console.error('Login failed:', err);

            setLoginError(true);

            setErrorMessage('Invalid password/email');
        }
    };

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

                        <Text
                            testID='login-header'
                            className="mt-3 text-2xl font-medium text-[#ef3734]"
                        >
                            {t("LoginPage.login")}
                        </Text>
                    </View>

                    <View className="mx-auto mt-5 w-full">
                        <Text className="mb-2 text-xl font-semibold text-[#1f2933]">
                            {t("LoginPage.email")}
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#b4b4be] bg-transparent px-3 py-2">
                            <Ionicons name="mail-outline" size={18} color="#9ca3af" />
                            <TextInput
                                testID='login-email-input'
                                editable={true}
                                placeholder={t("LoginPage.emailPlaceholder")}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'
                            />
                        </View>

                        <Text className="mb-2 mt-5 text-xl font-semibold text-[#1f2933]">
                            {t("LoginPage.password")}
                        </Text>

                        <View className="flex-row items-center rounded-[16px] border-[2px] border-[#d3d3d8] bg-transparent px-3 py-2">
                            <Ionicons name="lock-closed" size={18} color="#9ca3af" />
                            <TextInput
                                testID='login-password-input'
                                editable={true}
                                secureTextEntry={secureTextEntry}
                                placeholder={t("LoginPage.passwordPlaceholder")}
                                className="ml-4 flex-1 text-base text-[#1f2933] h-10 border-none outline-none"
                                value={password}
                                onChangeText={setPassword}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <Ionicons name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'} size={18} color="#9ca3af" onPress={() => setSecureTextEntry(!secureTextEntry)} />
                        </View>

                        <View className="mt-4 items-end">
                            <Text className="text-base font-medium text-[#ef3734]">
                                {t("LoginPage.forgotPassword")}
                            </Text>
                        </View>

                        <RedButton
                            ButtonText={loading ? t("LoginPage.loggingIn") : t("LoginPage.login")} wfull={true} onPress={handleLogin}
                            // Disable the button while loading to prevent multiple submissions
                            disabled={loading}
                            testID='login-button'
                            {...loading && { Icon: { name: 'reload-circle-sharp', size: 18, color: 'white' }, rotatingIcon: true }}
                        />

                        <View className="mt-10 flex-row items-center justify-center sm:mt-12">
                            <Text className="text-base font-medium text-[#a1a7b4]">
                                {t("LoginPage.noAccount")}
                            </Text>
                            <Text className="ml-2 text-base font-medium text-[#ef3734]">
                                {t("SignupPage.signup")}
                            </Text>
                        </View>
                        {loginError && (
                            <View className="mt-4 items-center">
                                <Text
                                    testID='login-error'
                                    className="text-base font-medium text-red-500 text-center"
                                >
                                    {errorMessage}
                                </Text>
                            </View>
                        )}
                        {loginSuccess && (
                            <View className="mt-4 items-center">
                                <Text
                                    testID='login-success'
                                    className="text-base font-medium text-green-500"
                                >
                                    Login successful. Redirecting...
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            <Footer />
        </ScrollView>
    );
}

export default Login;