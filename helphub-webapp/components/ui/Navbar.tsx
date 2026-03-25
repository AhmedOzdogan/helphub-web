import IonIcons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

export default function Navbar() {
    // Dropdown open state
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    // Shared hover state for all items
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
                <View className="relative flex-row items-center gap-5">

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
                                className="absolute left-0 top-12 z-50 min-w-[220px] rounded-[28px] border border-gray-200 bg-white px-6 py-6 shadow"
                                {...(Platform.OS === 'web' && {
                                    onMouseEnter: openAccountMenu,
                                    onMouseLeave: closeAccountMenu,
                                })}
                            >

                                {/* Login */}
                                <Link href="/" asChild>
                                    <Pressable
                                        onHoverIn={() => setHoveredItem('login')}
                                        onHoverOut={() => setHoveredItem(null)}
                                        onPress={() => setAccountMenuOpen(false)}
                                        className={`flex-row items-center gap-3 rounded-[28px] p-3 ${hoveredItem === 'login' ? 'bg-red-400' : ''
                                            }`}
                                    >
                                        <IonIcons
                                            name="log-in-outline"
                                            size={22}
                                            color={hoveredItem === 'login' ? '#ffffff' : '#ef4444'}
                                        />
                                        <Text className="text-base font-medium text-gray-700">
                                            Log In
                                        </Text>
                                    </Pressable>
                                </Link>

                                {/* Signup */}
                                <Link href="/" asChild>
                                    <Pressable
                                        onHoverIn={() => setHoveredItem('signup')}
                                        onHoverOut={() => setHoveredItem(null)}
                                        onPress={() => setAccountMenuOpen(false)}
                                        className={`mt-2 flex-row items-center gap-3 rounded-[28px] p-3 ${hoveredItem === 'signup' ? 'bg-red-400' : ''
                                            }`}
                                    >
                                        <IonIcons
                                            name="add-circle-outline"
                                            size={22}
                                            color={hoveredItem === 'signup' ? '#ffffff' : '#ef4444'}
                                        />
                                        <Text className="text-base font-medium text-gray-700">
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
                            onHoverIn={() => setHoveredItem('messages')}
                            onHoverOut={() => setHoveredItem(null)}
                            className={`flex-row items-center gap-2 rounded-[28px] px-6 py-3 ${hoveredItem === 'messages' ? 'bg-red-400' : ''
                                }`}
                        >
                            <IonIcons
                                name="chatbubble-ellipses-outline"
                                size={24}
                                color={hoveredItem === 'messages' ? '#ffffff' : '#cf1a17'}
                            />
                            <Text
                                className={`text-lg font-medium ${hoveredItem === 'messages' ? 'text-white' : 'text-gray-700'
                                    }`}
                            >
                                Messages
                            </Text>
                        </Pressable>
                    </Link>

                    {/* Get Help */}
                    <Pressable
                        onHoverIn={() => setHoveredItem('getHelp')}
                        onHoverOut={() => setHoveredItem(null)}
                        className={`rounded-full border border-red-500 px-5 py-3 ${hoveredItem === 'getHelp' ? 'bg-red-400' : ''
                            }`}
                    >
                        <Text
                            className={`font-semibold ${hoveredItem === 'getHelp' ? 'text-white' : 'text-red-500'
                                }`}
                        >
                            Get Help
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}