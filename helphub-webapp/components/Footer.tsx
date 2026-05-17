import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, Text, View } from 'react-native';
import AppStoreDownload from './ui/AppStoreDownload';
import GooglePlayDownload from './ui/GooglePlayDownload';

function Footer() {
    const { t } = useTranslation();

    return (
        <View testID="footer-section" className={`w-full bg-red-500 px-4 md:px-6 ${Platform.OS === 'ios' ? 'pt-8 pb-8' : 'py-8 md:py-12'}`}>
            <View testID="footer-main-content" className="mx-auto w-full max-w-[1400px] flex-col items-center justify-center gap-8  md:flex-row md:items-start md:justify-between md:gap-10">
                <View className="w-[150px] items-center md:items-start">
                    <Text className="text-xl font-bold text-white md:text-[20px]">{t('footer.brand')}</Text>
                </View>

                <View testID="footer-company-links" className="items-center gap-3 text-center md:items-start md:text-left">
                    <Link href={'/how-it-works' as any} asChild>
                        <Text className="text-sm font-semibold text-white md:text-[16px]">{t('footer.companyLinks.howItWorks')}</Text>
                    </Link>
                    <Link href={'/about' as any} asChild>
                        <Text className="text-sm text-white md:text-[16px]">{t('footer.companyLinks.aboutUs')}</Text>
                    </Link>
                    <Link href={'/contact' as any} asChild>
                        <Text className="text-sm text-white md:text-[16px]">{t('footer.companyLinks.contact')}</Text>
                    </Link>
                    <Link href={'/blog' as any} asChild>
                        <Text className="text-sm text-white md:text-[16px]">{t('footer.companyLinks.blog')}</Text>
                    </Link>
                </View>

                <View testID="footer-legal-links" className="items-center gap-3 text-center md:items-start md:text-left">
                    <Link href={'/terms' as any} asChild>
                        <Text className="text-sm text-white md:text-[16px]">{t('footer.legalLinks.terms')}</Text>
                    </Link>
                    <Link href={'/privacy' as any} asChild>
                        <Text className="text-sm text-white md:text-[16px]">{t('footer.legalLinks.privacy')}</Text>
                    </Link>
                    <Link href={'/distance-sales' as any} asChild>
                        <Text className="text-sm text-white md:text-[16px]">{t('footer.legalLinks.distanceSales')}</Text>
                    </Link>
                    <Link href={'/refund' as any} asChild>
                        <Text className="text-sm text-white md:text-[16px]">{t('footer.legalLinks.refund')}</Text>
                    </Link>
                    <Link href={'/cookies' as any} asChild>
                        <Text className="text-sm text-white md:text-[16px]">{t('footer.legalLinks.cookies')}</Text>
                    </Link>
                </View>

                <View testID="footer-social-downloads" className="items-center gap-4 md:items-start">
                    <Text className="text-sm font-semibold text-white md:text-[16px]">{t('footer.social.title')}</Text>

                    <View testID="footer-social-icons" className="flex-row gap-3">
                        <Link
                            href="https://www.facebook.com" asChild>
                            <View className="h-10 w-10 items-center justify-center rounded-md bg-white">
                                <Ionicons name="logo-facebook" size={18} color="#ef4444" />
                            </View>
                        </Link>
                        <Link
                            href="https://www.instagram.com" asChild>
                            <View className="h-10 w-10 items-center justify-center rounded-md bg-white">
                                <Ionicons name="logo-instagram" size={18} color="#ef4444" />
                            </View>
                        </Link>
                        <Link
                            href="https://www.linkedin.com" asChild>
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

            <View testID="footer-disclaimer-content" className={`mx-auto items-center ${Platform.OS === 'ios' ? 'mt-4' : 'mt-8 md:mt-12'}`}>
                <Text className="max-w-[900px] px-2 text-center text-xs leading-[20px] text-white md:text-[14px] md:leading-[24px]">
                    {t('footer.disclaimer.text')}
                </Text>

                <Text className="mt-4 px-2 text-center text-xs text-white md:text-[14px]">
                    {t('footer.disclaimer.emergency')}
                </Text>
            </View>
        </View>
    );
}

export default Footer;