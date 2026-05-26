import IonIcons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import LanguageMenu from './LanguageMenu';
import MenuDropdown from './ui/MenuDropdown';
import MenuLink from './ui/MenuLink';

import { megaMenuData } from '../data/megaMenuData';

type NavbarProps = {
    onMobileMenuChange?: (isOpen: boolean) => void;
};

export default function Navbar({ onMobileMenuChange }: NavbarProps) {
    const router = useRouter();
    const { t } = useTranslation();

    // Dropdown open state 
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    const [openDesktopLanguageMenu, setOpenDesktopLanguageMenu] = useState(false);
    const [openMediumLanguageMenu, setOpenMediumLanguageMenu] = useState(false);
    const [openMobileLanguageMenu, setOpenMobileLanguageMenu] = useState(false);
    //Mobile Dropdown open state
    const [mobileAccountMenuOpen, setMobileAccountMenuOpen] = useState(false);

    // MenuDropdown
    const [menuDropdownOpen, setMenuDropdownOpen] = useState<string | null>(null);

    // Timeout ref for delayed close
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Open dropdown and cancel any pending close
    const openAccountMenu = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        console.log('Opening account menu');
        setAccountMenuOpen(true);
    };

    // Close dropdown with slight delay
    const closeAccountMenu = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setAccountMenuOpen(false);
        }, 150);
        console.log('Closing account menu');
    };

    // Timeout ref for mega menu
    const megaMenuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Open mega menu section
    const openMegaMenu = (menuKey: keyof typeof megaMenuData) => {
        if (megaMenuCloseTimeoutRef.current) {
            clearTimeout(megaMenuCloseTimeoutRef.current);
            megaMenuCloseTimeoutRef.current = null;
        }
        setMenuDropdownOpen(menuKey);
    };

    // Close mega menu section
    const closeMegaMenu = () => {
        megaMenuCloseTimeoutRef.current = setTimeout(() => {
            setMenuDropdownOpen(null);
        }, 250);
    };

    // Mobile menu state
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

    const mobileMenuSections = [
        {
            key: 'forMyself' as keyof typeof megaMenuData,
            label: 'FOR MYSELF',
            icon: 'heart',
        },
        {
            key: 'forMomsAndKids' as keyof typeof megaMenuData,
            label: 'FOR MOMS AND KIDS',
            icon: 'woman',
        },
        {
            key: 'forWork' as keyof typeof megaMenuData,
            label: 'FOR WORK',
            icon: 'briefcase',
        },
        {
            key: 'groupTherapies' as keyof typeof megaMenuData,
            label: 'GROUP THERAPIES',
            icon: 'people',
        },
    ];

    // Toggle mobile menu section expansion
    const toggleMobileSection = (sectionKey: string) => {
        setMobileExpandedSection((prev) => (prev === sectionKey ? null : sectionKey));
    };

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        onMobileMenuChange?.(mobileMenuOpen);

        if (Platform.OS !== 'web' || typeof document === 'undefined') {
            return () => onMobileMenuChange?.(false);
        }

        const page = document.getElementById('page-content');
        const body = document.body;
        const html = document.documentElement;

        const previousPageOverflow = page?.style.overflow;
        const previousPageHeight = page?.style.height;
        const previousPageTouchAction = page?.style.touchAction;
        const previousBodyOverflow = body.style.overflow;
        const previousHtmlOverflow = html.style.overflow;

        if (mobileMenuOpen) {
            if (page) {
                page.style.overflow = 'hidden';
                page.style.height = '100vh';
                page.style.touchAction = 'none';
            }

            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
        }

        return () => {
            onMobileMenuChange?.(false);

            if (page) {
                page.style.overflow = previousPageOverflow || '';
                page.style.height = previousPageHeight || '';
                page.style.touchAction = previousPageTouchAction || '';
            }

            body.style.overflow = previousBodyOverflow;
            html.style.overflow = previousHtmlOverflow;
        };
    }, [mobileMenuOpen, onMobileMenuChange]);

    return (
        <View className="relative w-full border-b border-gray-200 bg-white">
            {/* Desktop/Tablet Navbar */}
            <View className="hidden w-full max-w-7xl flex-row items-center justify-between px-4 py-4 md:px-6 md:py-5 sm:mx-auto md:flex">
                {/* Logo */}
                <Link href="/" asChild>
                    <Text
                        testID='helphub-logo-text-desktop'
                        className="text-3xl font-extrabold tracking-wide text-red-500 md:text-4xl md:tracking-wider cursor-pointer">
                        HelpHub
                    </Text>
                </Link>

                {/* Search */}
                <View className="mx-4 flex-1 md:mx-8">
                    <TextInput
                        testID='searchBar'
                        placeholder={t("SearchBar.desktopPlaceholder")}
                        multiline={false}
                        placeholderTextColor="#9CA3AF"
                        className="rounded-xl bg-gray-100 px-3 py-2.5 text-sm text-gray-800 md:px-2 md:py-3 md:text-base max-h-120 w-full overflow-hidden text-ellipsis whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    />
                    <IonIcons
                        name="search"
                        size={20}
                        color="#cf1a17"
                        className="absolute right-5 top-1/2 -translate-y-1/2"
                    />
                </View>

                {/* Right section */}
                <View className="relative z-[80] flex-row items-center gap-3 md:gap-5">
                    {/* Account dropdown */}
                    <View
                        className="relative"
                        {...(Platform.OS === 'web' && {
                            onMouseEnter: openAccountMenu,
                            onMouseLeave: closeAccountMenu,
                        })}
                    >
                        {/* Account trigger */}
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Open account menu"
                            className="flex-row items-center gap-1.5 md:gap-2"
                            onPress={() => setAccountMenuOpen((prev) => !prev)}
                        >
                            <IonIcons
                                name="person-outline"
                                size={24}
                                color={accountMenuOpen ? '#9CA3AF' : '#cf1a17'}
                            />
                            <Text
                                className={`text-base md:text-lg ${accountMenuOpen ? 'text-gray-400' : 'text-gray-700'}`}
                            >
                                {t('My Account')}
                            </Text>
                        </Pressable>

                        {/* Dropdown menu */}
                        {accountMenuOpen ? (
                            <View
                                className="absolute left-0 top-12 z-[90] min-w-[220px] rounded-[28px] border border-gray-200 bg-white px-6 py-6 shadow"
                                {...(Platform.OS === 'web' && {
                                    onMouseEnter: openAccountMenu,
                                    onMouseLeave: closeAccountMenu,
                                })}
                            >
                                {/* Login */}
                                <Link

                                    href="/login" asChild>
                                    <Pressable
                                        testID="loginButton"
                                        onPress={() => {
                                            setAccountMenuOpen(false);
                                            router.push('/login');
                                        }}
                                        className="group flex-row items-center gap-3 rounded-[28px] p-3 hover:bg-red-400"
                                    >
                                        <IonIcons
                                            name="log-in-outline"
                                            size={22}
                                            className="text-red-500 group-hover:text-white"
                                        />
                                        <Text className="text-base font-medium text-gray-700 group-hover:text-white">
                                            {t('Login')}
                                        </Text>
                                    </Pressable>
                                </Link>

                                {/* Signup */}
                                <Link href="/signup" asChild>
                                    <Pressable
                                        testID="signUpButton"
                                        onPress={() => {
                                            setAccountMenuOpen(false);
                                            router.push('/signup');
                                        }}
                                        className="group mt-2 flex-row items-center gap-3 rounded-[28px] p-3 hover:bg-red-400"
                                    >
                                        <IonIcons
                                            name="add-circle-outline"
                                            size={22}
                                            className="text-red-500 group-hover:text-white"
                                        />
                                        <Text className="text-base font-medium text-gray-700 group-hover:text-white">
                                            {t('Sign Up')}
                                        </Text>
                                    </Pressable>
                                </Link>
                            </View>
                        ) : null}
                    </View>

                    {/* Messages */}
                    <Link href="/" asChild>
                        <Pressable className="group hidden flex-row items-center gap-1.5 rounded-[28px] px-3 py-2.5 md:gap-2 md:px-6 md:py-3 lg:flex">
                            <IonIcons
                                name="chatbubble-ellipses-outline"
                                size={24}
                                className="text-red-500 group-hover:text-gray-300"
                            />
                            <Text
                                testID='messages-button'
                                className="text-base font-medium text-gray-700 group-hover:text-gray-300 md:text-lg"
                            >
                                {t('Messages')}
                            </Text>
                        </Pressable>
                    </Link>

                    {/* Get Help */}
                    <Pressable className="hidden xl:flex rounded-full border border-red-500 px-4 py-2.5 md:px-5 md:py-3 hover:bg-red-400">
                        <Text className="text-sm font-semibold text-red-500 hover:text-white md:text-base">
                            {t('Get Help')}
                        </Text>
                    </Pressable>

                    {/* Desktop Language Menu */}
                    <View className="hidden xl:flex">
                        <LanguageMenu
                            openLanguageMenu={openDesktopLanguageMenu}
                            setOpenLanguageMenu={setOpenDesktopLanguageMenu}
                            testId='desktop'
                        />
                    </View>

                    {/* Medium Screen Language Menu */}
                    <View className="flex xl:hidden">
                        <LanguageMenu
                            openLanguageMenu={openMediumLanguageMenu}
                            setOpenLanguageMenu={setOpenMediumLanguageMenu}
                            mobile={true}
                            testId='medium'
                        />
                    </View>
                </View>
            </View>

            <View
                className="relative -z-10 hidden border-t border-gray-100 md:flex"
                testID='Dropdown-web-menu'
            >
                <View className="z-[999] mx-auto flex w-full max-w-7xl flex-row items-center justify-center gap-6 px-4 py-4 md:gap-10 md:px-6">
                    <MenuDropdown
                        TestID='for-myself-dropdown'
                        onMouseEnterFunction={() => openMegaMenu('forMyself')}
                        onMouseLeaveFunction={closeMegaMenu}
                        menuText={t('MobileMenuSections.forMyself')}
                    />

                    {/* For Moms and Kids */}
                    <MenuDropdown
                        TestID='for-moms-and-kids-dropdown'
                        onMouseEnterFunction={() => openMegaMenu('forMomsAndKids')}
                        onMouseLeaveFunction={closeMegaMenu}
                        menuText={t('MobileMenuSections.forMomsAndKids')}
                    />

                    {/* For Work */}
                    <MenuDropdown
                        TestID='for-work-dropdown'
                        onMouseEnterFunction={() => openMegaMenu('forWork')}
                        onMouseLeaveFunction={closeMegaMenu}
                        menuText={t('MobileMenuSections.forWork')}
                    />

                    <MenuDropdown
                        TestID='group-therapies-dropdown'
                        onMouseEnterFunction={() => openMegaMenu('groupTherapies')}
                        onMouseLeaveFunction={closeMegaMenu}
                        menuText={t('MobileMenuSections.groupTherapies')}
                    />

                    {/* Static links */}
                    <View className="hidden lg:flex">
                        <MenuLink text={t('Blog')} />
                    </View>
                    <View className="hidden lg:flex">
                        <MenuLink text={t('Guide')} />
                    </View>
                    <View className="hidden xl:flex">
                        <MenuLink text={t('How does it work?')} />
                    </View>

                    {/* Mega menu panel */}
                    {menuDropdownOpen && menuDropdownOpen in megaMenuData ? (
                        <View
                            testID={`mega-menu-${menuDropdownOpen}`}
                            className="absolute left-1/2 top-full z-50 w-full max-w-[900px] -translate-x-1/2 rounded-b-[28px] border border-gray-200 bg-white px-8 py-8 shadow-xl"
                            {...(Platform.OS === 'web' && {
                                onMouseEnter: () => openMegaMenu(menuDropdownOpen as keyof typeof megaMenuData),
                                onMouseLeave: closeMegaMenu,
                            })}
                        >
                            <View className="flex-row items-start justify-between gap-10">
                                {megaMenuData[menuDropdownOpen as keyof typeof megaMenuData].map((section) => (
                                    <View key={t("MegaMenuSections." + section.title)} className="flex-1">
                                        <Link href="/" asChild>
                                            <Pressable className="rounded-[20px] pb-3">
                                                <Text className="border-b border-gray-200 pb-3 text-2xl font-semibold text-gray-800 hover:text-red-500">
                                                    {t("MegaMenuTitles." + section.title)}
                                                </Text>
                                            </Pressable>
                                        </Link>

                                        <View className="mt-5 gap-4">
                                            {section.items.map((item) => (
                                                <Link key={item} href="/" asChild>
                                                    <Pressable className="rounded-[20px] px-1 py-1">
                                                        <Text className="text-xl font-medium text-gray-500 hover:text-red-500">
                                                            {t("MegaMenuItems." + item)}
                                                        </Text>
                                                    </Pressable>
                                                </Link>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>

            <View>
                {/* Mobile Navbar */}
                <View className="flex w-full bg-[#f5f5f5] px-5 pb-6 pt-5 md:hidden">
                    <View className="flex-row items-center justify-between">
                        <Pressable
                            testID='MobileMenuHamburgerButton'
                            accessibilityRole="button"
                            accessibilityLabel={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                            className="rounded-full p-2"
                            onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <IonIcons
                                name={mobileMenuOpen ? 'close-outline' : 'menu-outline'}
                                size={34}
                                color="#222222"
                            />
                        </Pressable>

                        <Link href="/" asChild>
                            <Pressable>
                                <Text
                                    testID='helphub-logo-text-mobile'
                                    className="text-2xl font-extrabold tracking-[6px] text-red-500">
                                    HelpHub
                                </Text>
                            </Pressable>
                        </Link>

                        <View className="flex-row items-center gap-4">

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Toggle account menu"
                                className="rounded-full p-2"
                                onPress={() => setMobileAccountMenuOpen(!mobileAccountMenuOpen)}
                            >
                                <IonIcons
                                    name="person-outline"
                                    size={30}
                                    color="#cf1a17"
                                />
                            </Pressable>

                            <Link href="/" asChild>
                                <Pressable className="rounded-full p-2">
                                    <IonIcons
                                        name="mail-outline"
                                        size={30}
                                        color="#cf1a17"
                                    />
                                </Pressable>
                            </Link>
                            <View>
                                <LanguageMenu
                                    openLanguageMenu={openMobileLanguageMenu}
                                    setOpenLanguageMenu={setOpenMobileLanguageMenu}
                                    mobile={true}
                                    testId='mobile'
                                />
                            </View>
                        </View>
                    </View>

                    {!mobileMenuOpen ? (
                        <View className="mt-6 "
                            style={Platform.OS === 'web' ? { zIndex: -999 } : undefined}>
                            <View className="relative justify-center rounded-2xl bg-[#eceaec] px-5 py-4">
                                <TextInput
                                    testID="mobile-search-input"
                                    placeholder={t("SearchBar.mobilePlaceholder")}
                                    placeholderTextColor="#6B7280"
                                    className="pr-12 text-lg font-medium text-gray-700"
                                />
                                <IonIcons
                                    name="search"
                                    size={28}
                                    color="#cf1a17"
                                    className={Platform.OS === 'web' ? 'absolute right-5 top-1/2 -translate-y-1/2' : 'absolute right-5'}
                                    style={Platform.OS === 'web' ? undefined : { top: 14 }}
                                />
                            </View>
                        </View>
                    ) : null}
                </View>
                {mobileAccountMenuOpen ? (
                    <View testID="mobile-account-menu" className="absolute right-5 top-20 w-48 rounded-[28px] border border-gray-200 bg-white px-6 py-6 shadow-lg sm:hidden z-[999]">
                        <Link href="/login" asChild>
                            <Pressable
                                testID='mobileLoginButton'
                                onPress={() => {
                                    setMobileAccountMenuOpen(false);
                                    router.push('/login');
                                }}
                                className="flex-row items-center gap-3 rounded-[20px] p-3 active:bg-red-400"
                            >
                                <IonIcons
                                    name="log-in-outline"
                                    size={22}
                                    color="#cf1a17"
                                />
                                <Text className="text-base font-medium text-gray-700">
                                    {t('Log In')}
                                </Text>
                            </Pressable>
                        </Link>

                        <Link href="/signup" asChild>
                            <Pressable
                                testID='mobileSignUpButton'
                                onPress={() => {
                                    setMobileAccountMenuOpen(false);
                                    router.push('/signup');
                                }}
                                className="mt-2 flex-row items-center gap-3 rounded-[20px] p-3 active:bg-red-400"
                            >
                                <IonIcons
                                    name="add-circle-outline"
                                    size={22}
                                    color="#cf1a17"
                                />
                                <Text className="text-base font-medium text-gray-700">
                                    {t('Sign Up')}
                                </Text>
                            </Pressable>
                        </Link>
                    </View>
                ) : null}{mobileMenuOpen ? (
                    <View
                        testID='MobileMenu'
                        className="absolute inset-x-0 top-full z-[999] sm:hidden "
                        style={
                            Platform.OS === 'web'
                                ? ({ position: 'fixed', top: 88, left: 0, right: 0, bottom: 0, height: '100%' } as any)
                                : ({ height: '100vh' } as any)
                        }
                    >
                        <Pressable
                            testID="mobile-menu-backdrop"
                            accessibilityRole="button"
                            accessibilityLabel="Close mobile menu backdrop"
                            className="absolute inset-0 bg-black/30"
                            onTouchMove={(event) => event.preventDefault?.()}
                            onPress={() => setMobileMenuOpen(false)}
                        />

                        <View
                            testID="mobile-menu-content"
                            className="h-full flex-1 border-t border-gray-200 bg-white shadow-2xl"
                            onTouchMove={(event) => event.stopPropagation()}
                        >
                            <ScrollView
                                className="h-full flex-1"
                                contentContainerStyle={{ paddingBottom: 28, flexGrow: 1, minHeight: '100%' }}
                                showsVerticalScrollIndicator={false}
                                bounces={false}
                                nestedScrollEnabled={true}
                                style={
                                    Platform.OS === 'web'
                                        ? {
                                            height: '100%',
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none',
                                        } as any
                                        : { height: '100%' }
                                }
                            >
                                <View className="px-6 py-7 ">
                                    <Text className="text-lg font-bold text-black">
                                        {t('Main Menu')}
                                    </Text>
                                    <View className="mt-3 h-[3px] w-24 bg-red-500" />

                                    <Link href="/" asChild>
                                        <Pressable
                                            className="mt-8 flex-row items-center gap-4"
                                            onPress={() => setMobileMenuOpen(false)}
                                        >
                                            <IonIcons name="home" size={24} color="#ef4444" />
                                            <Text className="text-lg font-semibold text-gray-700">
                                                {t('Home')}
                                            </Text>
                                        </Pressable>
                                    </Link>

                                    <Text className="mt-10 text-base font-bold uppercase tracking-wide text-red-500">
                                        {t('Categories')}
                                    </Text>

                                    <View className="mt-4 gap-2">
                                        {mobileMenuSections.map((section) => {
                                            const isExpanded = mobileExpandedSection === section.key;

                                            return (
                                                <View key={t("MobileMenuSections." + section.key)} className="rounded-2xl bg-white">
                                                    <Pressable
                                                        testID={`mobile-section-${section.key}`}
                                                        accessibilityRole="button"
                                                        accessibilityLabel={`Toggle ${section.label}`}
                                                        accessibilityState={{ expanded: isExpanded }}
                                                        className="flex-row items-center justify-between py-4"
                                                        onPress={() => toggleMobileSection(section.key)}
                                                    >
                                                        <View className="flex-row items-center gap-4">
                                                            <IonIcons
                                                                name={section.icon as any}
                                                                size={24}
                                                                color="#ef4444"
                                                            />
                                                            <Text className="text-lg font-semibold text-gray-900">
                                                                {t("MobileMenuSections." + section.key)}
                                                            </Text>
                                                        </View>

                                                        <IonIcons
                                                            name={isExpanded ? 'chevron-up-outline' : 'chevron-forward-outline'}
                                                            size={22}
                                                            color="#9CA3AF"
                                                        />
                                                    </Pressable>

                                                    {isExpanded ? (
                                                        <View className="pb-2 pl-10">
                                                            {megaMenuData[section.key].map((group) => (
                                                                <View key={t("MegaMenuGroups." + group.title)} className="mb-5">
                                                                    <Link href="/" asChild>
                                                                        <Pressable
                                                                            className="py-2"
                                                                            onPress={() => setMobileMenuOpen(false)}
                                                                        >
                                                                            <Text className="text-base font-bold text-gray-800">
                                                                                {t("MegaMenuTitles." + group.title)}
                                                                            </Text>
                                                                        </Pressable>
                                                                    </Link>

                                                                    <View className="mt-1 gap-1">
                                                                        {group.items.map((item) => (
                                                                            <Link key={item} href="/" asChild>
                                                                                <Pressable
                                                                                    className="py-2"
                                                                                    onPress={() => setMobileMenuOpen(false)}
                                                                                >
                                                                                    <Text className="text-base text-gray-500">
                                                                                        {t("MegaMenuItems." + item)}
                                                                                    </Text>
                                                                                </Pressable>
                                                                            </Link>
                                                                        ))}
                                                                    </View>
                                                                </View>
                                                            ))}
                                                        </View>
                                                    ) : null}
                                                </View>
                                            );
                                        })}
                                    </View>

                                    <Text className="mt-8 text-base font-bold uppercase tracking-wide text-red-500">
                                        {t('Discover')}
                                    </Text>

                                    <View className="mt-4 gap-1">
                                        <Link href="/" asChild>
                                            <Pressable
                                                testID="mobile-discover-blog-link"
                                                className="flex-row items-center gap-4 py-4"
                                                onPress={() => setMobileMenuOpen(false)}
                                            >
                                                <IonIcons name="create" size={22} color="#ef4444" />
                                                <Text className="text-lg font-semibold text-gray-700">
                                                    {t('Blog')}
                                                </Text>
                                            </Pressable>
                                        </Link>

                                        <Link href="/" asChild>
                                            <Pressable
                                                className="flex-row items-center gap-4 py-4"
                                                onPress={() => setMobileMenuOpen(false)}
                                            >
                                                <IonIcons name="document-text" size={22} color="#ef4444" />
                                                <Text className="text-lg font-semibold text-gray-700">
                                                    {t('Guide')}
                                                </Text>
                                            </Pressable>
                                        </Link>

                                        <Link href="/" asChild>
                                            <Pressable
                                                className="flex-row items-center gap-4 py-4"
                                                onPress={() => setMobileMenuOpen(false)}
                                            >
                                                <IonIcons name="help-circle" size={22} color="#ef4444" />
                                                <Text className="text-lg font-semibold text-gray-700">
                                                    {t('How does it work?')}
                                                </Text>
                                            </Pressable>
                                        </Link>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                ) : null}
            </View>
        </View>
    );
}