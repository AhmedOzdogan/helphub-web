import IonIcons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import i18n from '../i18n';

const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
];

type LanguageMenuProps = {
    openLanguageMenu: boolean;
    setOpenLanguageMenu: (open: boolean) => void;
    mobile?: boolean;
};

function LanguageMenu({ openLanguageMenu, setOpenLanguageMenu, mobile }: LanguageMenuProps) {
    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('language');

                if (
                    storedLanguage &&
                    languages.some((l) => l.code === storedLanguage) &&
                    storedLanguage !== i18n.language
                ) {
                    await i18n.changeLanguage(storedLanguage);
                }
            } catch (error) {
                console.log('Language loading error:', error);
            }
        };

        loadLanguage();
    }, []);

    const currentLanguage = useMemo(() => {
        return (
            languages.find((lang) => lang.code === i18n.language) ||
            languages[0]
        );
    }, [i18n.language]);

    return (
        <View className="relative z-[999]">
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Open language menu"
                className="flex-row items-center gap-2 rounded-full border border-gray-200 bg-gradient-to-r from-red-500 to-red-400 px-3 py-2 shadow-lg transition-all hover:scale-[1.02] hover:border-red-400 md:px-4 md:py-2.5"
                onPress={() => setOpenLanguageMenu(!openLanguageMenu)}
            >
                {mobile ? (
                    <>
                        <View className="items-center justify-center rounded-full bg-white/10 px-2 py-1 ">
                            <Text className="text-base md:text-lg">
                                {currentLanguage.flag}
                            </Text>
                        </View>
                    </>
                ) : (
                    <>
                        <View className="items-center justify-center rounded-s bg-white/10 px-2 py-1 z-[999]">
                            <Text className="text-base md:text-lg">
                                {currentLanguage.flag}
                            </Text>
                        </View>

                        <View>
                            <Text className="text-[10px] font-medium uppercase tracking-[1.5px] text-black/70 md:text-[11px] z-[999]">
                                {currentLanguage.label}
                            </Text>

                            <Text className="text-xs font-bold text-white md:text-sm z-[999]">
                                {currentLanguage.code.toUpperCase()}
                            </Text>
                        </View>

                        <IonIcons
                            name={openLanguageMenu ? 'chevron-up-outline' : 'chevron-down-outline'}
                            size={15}
                            color="#000000"
                        />
                    </>
                )}
            </Pressable>

            {openLanguageMenu ? (
                <View
                    className={`absolute top-full z-[999] mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl ${mobile ? 'w-[64px] right-0' : 'w-[172px] right-0'
                        }`}
                >
                    {languages.map((lang) => (
                        <Pressable
                            key={lang.code}
                            className="flex-row items-center justify-center py-2 transition-colors hover:bg-gray-100"
                            onPress={() => {
                                (async () => {
                                    try {
                                        await AsyncStorage.setItem('language', lang.code);
                                        await i18n.changeLanguage(lang.code);
                                        setOpenLanguageMenu(false);
                                    } catch (error) {
                                        console.log('Language saving error:', error);
                                    }
                                })();
                            }}
                        >
                            <Text className="text-lg text-center">{lang.flag}</Text>
                            {mobile ? null : (
                                <Text className="text-sm font-medium">{lang.label}</Text>
                            )}
                        </Pressable>
                    ))}
                </View>
            ) : null}
        </View>
    )
}

export default LanguageMenu;