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
                testID="language-menu-button"
                accessibilityRole="button"
                accessibilityLabel="Open language menu"
                className="flex-row items-center gap-2 rounded-full px-3 py-2 md:px-4 md:py-2.5"
                style={{
                    backgroundColor: '#ef4444',
                    borderColor: '#f87171',
                    borderWidth: 1,
                    shadowColor: '#ef4444',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 12,
                    elevation: 6,
                }}
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
                        <View className="items-center justify-center rounded-s px-2 py-1 z-[999]">
                            <Text className="text-base md:text-lg">
                                {currentLanguage.flag}
                            </Text>
                        </View>

                        <View>
                            <Text className="text-[10px] font-medium uppercase tracking-[1.5px] text-black/70 md:text-[11px] z-[999]">
                                {currentLanguage.label}
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
                    testID="language-menu"
                    className={`absolute top-full z-[999] mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl ${mobile ? 'w-[64px] right-0' : 'w-[172px] right-0'
                        }`}
                >
                    {languages.map((lang) => (
                        <Pressable
                            testID={lang.code}
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