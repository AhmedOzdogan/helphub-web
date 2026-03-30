import IonIcons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import MenuDropdown from './ui/MenuDropdown';
import MenuLink from './ui/MenuLink';

import { megaMenuData } from '../data/megaMenuData';

export default function Navbar() {
    // Dropdown open state
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

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
            key: 'momsAndKids' as keyof typeof megaMenuData,
            label: 'FOR MOMS AND KIDS',
            icon: 'woman',
        },
        {
            key: 'workRelatedIssues' as keyof typeof megaMenuData,
            label: 'FOR WORK',
            icon: 'briefcase',
        },
        {
            key: 'groupTherapies' as keyof typeof megaMenuData,
            label: 'GROUP THERAPIES',
            icon: 'people',
        },
    ];

    const toggleMobileSection = (sectionKey: string) => {
        setMobileExpandedSection((prev) => (prev === sectionKey ? null : sectionKey));
    };

    return (
        <View className="w-full border-b border-gray-200 bg-white">
            {/* Desktop/Tablet Navbar */}
            <View className="hidden w-full max-w-7xl flex-row items-center justify-between px-6 py-5 sm:mx-auto sm:flex">
                {/* Logo */}
                <Link href="/" asChild>
                    <Text className="text-4xl font-extrabold tracking-wider text-red-500">
                        HelpHub
                    </Text>
                </Link>

                {/* Search */}
                <View className="mx-8 flex-1">
                    <TextInput
                        placeholder="Search for help, resources, or volunteers..."
                        placeholderTextColor="#9CA3AF"
                        className="rounded-xl bg-gray-100 px-4 py-3 text-base text-gray-800"
                    />
                    <IonIcons
                        name="search"
                        size={20}
                        color="#cf1a17"
                        className="absolute right-5 top-1/2 -translate-y-1/2"
                    />
                </View>

                {/* Right section */}
                <View className="relative z-[80] flex-row items-center gap-5">
                    {/* Account dropdown */}
                    <View
                        className="relative"
                        {...(Platform.OS === 'web' && {
                            onMouseEnter: openAccountMenu,
                            onMouseLeave: closeAccountMenu,
                        })}
                    >
                        {/* Account trigger */}
                        <Pressable className="flex-row items-center gap-2">
                            <IonIcons
                                name="person-outline"
                                size={24}
                                color={accountMenuOpen ? '#9CA3AF' : '#cf1a17'}
                            />
                            <Text
                                className={`text-lg ${accountMenuOpen ? 'text-gray-400' : 'text-gray-700'}`}
                            >
                                My Account
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
                                <Link href="/" asChild>
                                    <Pressable
                                        onPress={() => setAccountMenuOpen(false)}
                                        className="group flex-row items-center gap-3 rounded-[28px] p-3 hover:bg-red-400"
                                    >
                                        <IonIcons
                                            name="log-in-outline"
                                            size={22}
                                            className="text-red-500 group-hover:text-white"
                                        />
                                        <Text className="text-base font-medium text-gray-700 group-hover:text-white">
                                            Log In
                                        </Text>
                                    </Pressable>
                                </Link>

                                {/* Signup */}
                                <Link href="/" asChild>
                                    <Pressable
                                        onPress={() => setAccountMenuOpen(false)}
                                        className="group mt-2 flex-row items-center gap-3 rounded-[28px] p-3 hover:bg-red-400"
                                    >
                                        <IonIcons
                                            name="add-circle-outline"
                                            size={22}
                                            className="text-red-500 group-hover:text-white"
                                        />
                                        <Text className="text-base font-medium text-gray-700 group-hover:text-white">
                                            Sign Up
                                        </Text>
                                    </Pressable>
                                </Link>
                            </View>
                        ) : null}
                    </View>

                    {/* Messages */}
                    <Link href="/" asChild>
                        <Pressable className="group flex-row items-center gap-2 rounded-[28px] px-6 py-3 hover:bg-red-400">
                            <IonIcons
                                name="chatbubble-ellipses-outline"
                                size={24}
                                className="text-red-500 group-hover:text-white"
                            />
                            <Text className="text-lg font-medium text-gray-700 group-hover:text-white">
                                Messages
                            </Text>
                        </Pressable>
                    </Link>

                    {/* Get Help */}
                    <Pressable className="rounded-full border border-red-500 px-5 py-3 hover:bg-red-400">
                        <Text className="font-semibold text-red-500 hover:text-white">
                            Get Help
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View className="relative -z-10 hidden border-t border-gray-100 sm:flex">
                <View className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center gap-10 px-6 py-4">
                    <MenuDropdown
                        onMouseEnterFunction={() => openMegaMenu('forMyself')}
                        onMouseLeaveFunction={closeMegaMenu}
                        menuText="FOR MYSELF"
                    />

                    {/* For Moms and Kids */}
                    <MenuDropdown
                        onMouseEnterFunction={() => openMegaMenu('momsAndKids')}
                        onMouseLeaveFunction={closeMegaMenu}
                        menuText="FOR MOMS AND KIDS"
                    />

                    {/* For Work */}
                    <MenuDropdown
                        onMouseEnterFunction={() => openMegaMenu('workRelatedIssues')}
                        onMouseLeaveFunction={closeMegaMenu}
                        menuText="FOR WORK"
                    />

                    <MenuDropdown
                        onMouseEnterFunction={() => openMegaMenu('groupTherapies')}
                        onMouseLeaveFunction={closeMegaMenu}
                        menuText="GROUP THERAPIES"
                    />

                    {/* Static links */}
                    <MenuLink text="Blog" />
                    <MenuLink text="Guide" />
                    <MenuLink text="How does it work?" />

                    {/* Mega menu panel */}
                    {menuDropdownOpen && menuDropdownOpen in megaMenuData ? (
                        <View
                            className="absolute left-1/2 top-full z-50 w-full max-w-[900px] -translate-x-1/2 rounded-b-[28px] border border-gray-200 bg-white px-8 py-8 shadow-xl"
                            {...(Platform.OS === 'web' && {
                                onMouseEnter: () => openMegaMenu(menuDropdownOpen as keyof typeof megaMenuData),
                                onMouseLeave: closeMegaMenu,
                            })}
                        >
                            <View className="flex-row items-start justify-between gap-10">
                                {megaMenuData[menuDropdownOpen as keyof typeof megaMenuData].map((section) => (
                                    <View key={section.title} className="flex-1">
                                        <Link href="/" asChild>
                                            <Pressable className="rounded-[20px] pb-3">
                                                <Text className="border-b border-gray-200 pb-3 text-[28px] font-semibold text-gray-800 hover:text-red-500">
                                                    {section.title}
                                                </Text>
                                            </Pressable>
                                        </Link>

                                        <View className="mt-5 gap-4">
                                            {section.items.map((item) => (
                                                <Link key={item} href="/" asChild>
                                                    <Pressable className="rounded-[20px] px-1 py-1">
                                                        <Text className="text-xl font-medium text-gray-500 hover:text-red-500">
                                                            {item}
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
                <View className="flex w-full bg-[#f5f5f5] px-5 pb-6 pt-5 sm:hidden">
                    <View className="flex-row items-center justify-between">
                        <Pressable
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
                                <Text className="text-[38px] font-extrabold tracking-[6px] text-red-500">
                                    HelpHub
                                </Text>
                            </Pressable>
                        </Link>

                        <View className="flex-row items-center gap-4">
                            <Link href="/" asChild>
                                <Pressable className="rounded-full p-2">
                                    <IonIcons
                                        name="person-outline"
                                        size={30}
                                        color="#cf1a17"
                                    />
                                </Pressable>
                            </Link>

                            <Link href="/" asChild>
                                <Pressable className="rounded-full p-2">
                                    <IonIcons
                                        name="mail-outline"
                                        size={30}
                                        color="#cf1a17"
                                    />
                                </Pressable>
                            </Link>
                        </View>
                    </View>

                    <View className="mt-6">
                        <View className="relative justify-center rounded-2xl bg-[#eceaec] px-5 py-4">
                            <TextInput
                                placeholder="Danışmanlık Uzmanlık... Ara"
                                placeholderTextColor="#6B7280"
                                className="pr-12 text-[18px] font-medium text-gray-700"
                            />
                            <IonIcons
                                name="search"
                                size={28}
                                color="#cf1a17"
                                className="absolute right-5 top-1/2 -translate-y-1/2"
                            />
                        </View>
                    </View>
                </View>

                {mobileMenuOpen ? (
                    <View className="sm:hidden border-t border-gray-200 bg-white">
                        <ScrollView className="max-h-[100vh]" contentContainerStyle={{ paddingBottom: 28 }}>
                            <View className="px-6 py-7">
                                <Text className="text-[18px] font-bold text-black">
                                    Main Menu
                                </Text>
                                <View className="mt-3 h-[3px] w-24 bg-red-500" />

                                <Link href="/" asChild>
                                    <Pressable
                                        className="mt-8 flex-row items-center gap-4"
                                        onPress={() => setMobileMenuOpen(false)}
                                    >
                                        <IonIcons name="home" size={24} color="#ef4444" />
                                        <Text className="text-[17px] font-semibold text-gray-700">
                                            Home
                                        </Text>
                                    </Pressable>
                                </Link>

                                <Text className="mt-10 text-[16px] font-bold uppercase tracking-wide text-red-500">
                                    Categories
                                </Text>

                                <View className="mt-4 gap-2">
                                    {mobileMenuSections.map((section) => {
                                        const isExpanded = mobileExpandedSection === section.key;

                                        return (
                                            <View key={section.key} className="rounded-2xl bg-white">
                                                <Pressable
                                                    className="flex-row items-center justify-between py-4"
                                                    onPress={() => toggleMobileSection(section.key)}
                                                >
                                                    <View className="flex-row items-center gap-4">
                                                        <IonIcons
                                                            name={section.icon as any}
                                                            size={24}
                                                            color="#ef4444"
                                                        />
                                                        <Text className="text-[18px] font-semibold text-gray-900">
                                                            {section.label}
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
                                                            <View key={group.title} className="mb-5">
                                                                <Link href="/" asChild>
                                                                    <Pressable
                                                                        className="py-2"
                                                                        onPress={() => setMobileMenuOpen(false)}
                                                                    >
                                                                        <Text className="text-[16px] font-bold text-gray-800">
                                                                            {group.title}
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
                                                                                <Text className="text-[15px] text-gray-500">
                                                                                    {item}
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

                                <Text className="mt-8 text-[16px] font-bold uppercase tracking-wide text-red-500">
                                    Discover
                                </Text>

                                <View className="mt-4 gap-1">
                                    <Link href="/" asChild>
                                        <Pressable
                                            className="flex-row items-center gap-4 py-4"
                                            onPress={() => setMobileMenuOpen(false)}
                                        >
                                            <IonIcons name="create" size={22} color="#ef4444" />
                                            <Text className="text-[17px] font-semibold text-gray-700">
                                                Blog
                                            </Text>
                                        </Pressable>
                                    </Link>

                                    <Link href="/" asChild>
                                        <Pressable
                                            className="flex-row items-center gap-4 py-4"
                                            onPress={() => setMobileMenuOpen(false)}
                                        >
                                            <IonIcons name="document-text" size={22} color="#ef4444" />
                                            <Text className="text-[17px] font-semibold text-gray-700">
                                                Guide
                                            </Text>
                                        </Pressable>
                                    </Link>

                                    <Link href="/" asChild>
                                        <Pressable
                                            className="flex-row items-center gap-4 py-4"
                                            onPress={() => setMobileMenuOpen(false)}
                                        >
                                            <IonIcons name="help-circle" size={22} color="#ef4444" />
                                            <Text className="text-[17px] font-semibold text-gray-700">
                                                How does it work?
                                            </Text>
                                        </Pressable>
                                    </Link>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                ) : null}
            </View>
        </View>
    );
}