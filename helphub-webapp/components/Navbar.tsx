import IonIcons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
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

    return (
        <View className="w-full border-b border-gray-200 bg-white">
            <View className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-6 py-5">

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
                        <Pressable
                            className="group flex-row items-center gap-2 rounded-[28px] px-6 py-3 hover:bg-red-400"
                        >
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
                    <Pressable
                        className="rounded-full border border-red-500 px-5 py-3 hover:bg-red-400"
                    >
                        <Text className="font-semibold text-red-500 hover:text-white">
                            Get Help
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View className="relative -z-10 border-t border-gray-100">
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

            </View >
            );
        </View>
    );
}