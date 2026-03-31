import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function formatPrice(value: number) {
    return `$${(value / 100).toFixed(2)}`;
}

type PackageKey = 'preliminary' | 'individual' | 'fiveSessions';

type CalendarDay = {
    label: string;
    isMuted?: boolean;
    isCurrentMonth?: boolean;
};

const calendarWeeks: CalendarDay[][] = [
    [
        { label: '23', isMuted: true },
        { label: '24', isMuted: true },
        { label: '25', isMuted: true },
        { label: '26', isMuted: true },
        { label: '27', isMuted: true },
        { label: '28', isMuted: true },
        { label: '1', isMuted: true },
    ],
    [
        { label: '2', isMuted: true },
        { label: '3', isMuted: true },
        { label: '4', isMuted: true },
        { label: '5', isMuted: true },
        { label: '6', isMuted: true },
        { label: '7', isMuted: true },
        { label: '8', isMuted: true },
    ],
    [
        { label: '9', isMuted: true },
        { label: '10', isMuted: true },
        { label: '11', isMuted: true },
        { label: '12', isMuted: true },
        { label: '13', isMuted: true },
        { label: '14', isMuted: true },
        { label: '15', isMuted: true },
    ],
    [
        { label: '16', isMuted: true },
        { label: '17', isMuted: true },
        { label: '18', isMuted: true },
        { label: '19', isMuted: true },
        { label: '20', isMuted: true },
        { label: '21', isMuted: true },
        { label: '22', isMuted: true },
    ],
    [
        { label: '23', isMuted: true },
        { label: '24', isMuted: true },
        { label: '25', isMuted: true },
        { label: '26', isMuted: true },
        { label: '27', isMuted: true },
        { label: '28', isMuted: true },
        { label: '29', isMuted: true },
    ],
    [
        { label: '30', isCurrentMonth: true },
        { label: '31', isCurrentMonth: true },
        { label: '1', isMuted: true },
        { label: '2', isMuted: true },
        { label: '3', isMuted: true },
        { label: '4', isMuted: true },
        { label: '5', isMuted: true },
    ],
];

const timeSlots = [
    { time: '12:00', available: false },
    { time: '13:00', available: false },
    { time: '14:00', available: false },
    { time: '15:00', available: false },
    { time: '16:00', available: false },
    { time: '18:00', available: true },
];

function Appointment() {
    const params = useLocalSearchParams<{
        name?: string;
        title?: string;
        price?: string;
    }>();

    const [selectedPackage, setSelectedPackage] = useState<PackageKey>('preliminary');
    const [selectedDate, setSelectedDate] = useState('30');
    const [selectedTime, setSelectedTime] = useState('18:00');

    const name = params.name ? decodeURIComponent(String(params.name)) : 'John Smith';
    const title = params.title ? decodeURIComponent(String(params.title)) : 'Life and Holistic Health Coach';
    const price = params.price ? Number(params.price) : 3000;

    const packageCardClass = (key: PackageKey) => {
        const isSelected = selectedPackage === key;

        return `min-h-[96px] flex-1 rounded-[18px] border-[2px] px-5 py-4 lg:max-w-[520px] ${isSelected ? 'border-[#ef3734] bg-[#fff7f7]' : 'border-[#a8b0be] bg-white'
            }`;
    };

    const radioOuterClass = (key: PackageKey) => {
        const isSelected = selectedPackage === key;
        return `h-[26px] w-[26px] items-center justify-center rounded-full border-[3px] ${isSelected ? 'border-[#ef3734]' : 'border-[#d1d5db]'
            }`;
    };

    const selectedPackagePrice = useMemo(() => {
        if (selectedPackage === 'preliminary') return 0;
        if (selectedPackage === 'fiveSessions') return 13500;
        return price;
    }, [price, selectedPackage]);

    return (
        <ScrollView className="bg-[#f6f6f6] z-[-999]">
            <Navbar />

            <View className="px-3 py-4 md:px-6 lg:px-10 lg:py-6 z-[-999]">
                <View className="mx-auto w-full max-w-[1400px] rounded-[28px] border border-[#dddddd] bg-[#f8f8f8] px-5 py-5 md:px-8 md:py-7 lg:px-10 lg:py-8">
                    <View className="flex-row items-center gap-4">

                        <View>
                            <Text className="text-[15px] font-medium text-[#9ca3af] md:text-[16px]">
                                {title}
                            </Text>
                            <Text className="text-[18px] font-semibold text-[#1f2937] md:text-[20px]">
                                {name}
                            </Text>
                        </View>
                    </View>

                    <View className="mt-8 flex-col gap-4 lg:flex-row lg:flex-wrap">
                        <Pressable className={packageCardClass('preliminary')} onPress={() => setSelectedPackage('preliminary')}>
                            <View className="flex-row items-center justify-between gap-4">
                                <View className="flex-row items-center gap-4">
                                    <View className={radioOuterClass('preliminary')}>
                                        {selectedPackage === 'preliminary' ? (
                                            <View className="h-[10px] w-[10px] rounded-full bg-[#ef3734]" />
                                        ) : null}
                                    </View>
                                    <View>
                                        <Text className="text-base font-medium text-[#1f2937]">Pre-Interview </Text>
                                        <Text className="mt-1 text-[14px] text-[#1f2937]">
                                            15 mins <Text className="text-[#9ca3af]">(1)</Text>
                                        </Text>
                                    </View>
                                </View>

                                <Text className="text-[18px] font-bold text-[#22c55e]">Free</Text>
                            </View>
                        </Pressable>

                        <Pressable className={packageCardClass('individual')} onPress={() => setSelectedPackage('individual')}>
                            <View className="flex-row items-center justify-between gap-4">
                                <View className="flex-row items-center gap-4">
                                    <View className={radioOuterClass('individual')}>
                                        {selectedPackage === 'individual' ? (
                                            <View className="h-[10px] w-[10px] rounded-full bg-[#ef3734]" />
                                        ) : null}
                                    </View>
                                    <View>
                                        <Text className="text-base font-medium text-[#1f2937]">Individual Coaching</Text>
                                        <Text className="mt-1 text-sm text-[#1f2937]">
                                            60 min <Text className="text-[#9ca3af]">(1 session)</Text>
                                        </Text>
                                    </View>
                                </View>

                                <View className="items-end">
                                    <Text className="text-[14px] text-[#9ca3af] line-through">$35.00</Text>
                                    <Text className="mt-1 text-base font-bold text-[#22c55e]">{formatPrice(price)}</Text>
                                </View>
                            </View>
                        </Pressable>

                        <Pressable className={packageCardClass('fiveSessions')} onPress={() => setSelectedPackage('fiveSessions')}>
                            <View className="flex-row items-center justify-between gap-4">
                                <View className="flex-row items-center gap-4">
                                    <View className={radioOuterClass('fiveSessions')}>
                                        {selectedPackage === 'fiveSessions' ? (
                                            <View className="h-[10px] w-[10px] rounded-full bg-[#ef3734]" />
                                        ) : null}
                                    </View>
                                    <View>
                                        <Text className="text-base font-medium text-[#1f2937] max-w-32 text-wrap">5 Sessions Ind. Coaching</Text>
                                        <Text className="mt-1 text-sm text-[#1f2937]">
                                            60 min <Text className="text-[#9ca3af]">(5 sessions)</Text>
                                        </Text>
                                    </View>
                                </View>

                                <View className="items-end">
                                    <Text className="text-sm text-[#9ca3af] line-through">$150.00</Text>
                                    <Text className="mt-1 text-base font-bold text-[#22c55e]">$135.00</Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>

                    <Text className="mt-10 text-center text-[24px] font-medium text-[#1f2937]">
                        Select date and time from calendar
                    </Text>

                    <View className="mt-6 flex-col items-center gap-8 md:items-center lg:flex-row lg:items-start lg:justify-center">
                        <View className="w-full max-w-[420px] items-center rounded-[22px] border border-[#d6d6d6] bg-white px-5 py-5">
                            <View className="flex-row items-center justify-between">
                                <Ionicons name="chevron-back" size={28} color="#6b7280" />
                                <Text className="text-[20px] font-semibold text-[#1f2937]">Mar 2026</Text>
                                <Ionicons name="chevron-forward" size={28} color="#6b7280" />
                            </View>

                            <View className="mt-6 flex-row justify-between px-2">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                    <Text key={day} className="w-[36px] text-center text-[16px] font-medium text-[#9ca3af]">
                                        {day}
                                    </Text>
                                ))}
                            </View>

                            <View className="mt-6 gap-5">
                                {calendarWeeks.map((week, weekIndex) => (
                                    <View key={weekIndex} className="flex-row justify-between px-2">
                                        {week.map((day, dayIndex) => {
                                            const isSelected = selectedDate === day.label && !!day.isCurrentMonth;

                                            return (
                                                <Pressable
                                                    key={`${weekIndex}-${day.label}-${dayIndex}`}
                                                    disabled={!day.isCurrentMonth}
                                                    onPress={() => {
                                                        if (day.isCurrentMonth) {
                                                            setSelectedDate(day.label);
                                                        }
                                                    }}
                                                    className={`h-[40px] w-[40px] items-center justify-center rounded-[12px] ${isSelected ? 'bg-[#22c55e]' : 'bg-transparent'
                                                        }`}
                                                >
                                                    <Text
                                                        className={`text-[16px] ${isSelected
                                                            ? 'font-semibold text-white'
                                                            : day.isCurrentMonth
                                                                ? 'font-semibold text-black'
                                                                : 'text-[#d1d5db]'
                                                            }`}
                                                    >
                                                        {day.label}
                                                    </Text>
                                                </Pressable>
                                            );
                                        })}
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View className="hidden h-[430px] w-px bg-[#d6d6d6] lg:flex" />

                        <View className="w-full max-w-[360px] items-center">
                            <Text className="mb-4 text-center text-[16px] font-medium text-[#1f2937] lg:text-left">
                                Times are in UTC+3
                            </Text>

                            <View className="gap-4">
                                {timeSlots.map((slot) => {
                                    const isSelected = selectedTime === slot.time;

                                    if (!slot.available) {
                                        return (
                                            <View key={slot.time} className="flex-row items-center justify-center rounded-[16px] border border-[#d6d6d6] bg-white px-5 py-4">
                                                <Ionicons name="time-outline" size={18} color="#9ca3af" />
                                                <Text className="ml-2 text-[16px] text-[#9ca3af]">{slot.time} (Not Available)</Text>
                                            </View>
                                        );
                                    }

                                    return (
                                        <Pressable
                                            key={slot.time}
                                            onPress={() => setSelectedTime(slot.time)}
                                            className={`flex-row items-center justify-center rounded-[16px] px-5 py-4 ${isSelected ? 'bg-[#22c55e]' : 'border border-[#22c55e] bg-white'
                                                }`}
                                        >
                                            <Ionicons name="time-outline" size={18} color={isSelected ? '#ffffff' : '#22c55e'} />
                                            <Text className={`ml-2 text-[18px] font-semibold ${isSelected ? 'text-white' : 'text-[#22c55e]'}`}>
                                                {slot.time}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                    </View>

                    <View className="mt-10 flex-row items-center justify-end gap-5">
                        <Pressable className="flex-row items-center gap-2" onPress={() => { router.back() }}>
                            <Ionicons name="chevron-back" size={22} color="#111827" />
                            <Text className="text-[18px] font-medium text-[#111827]">Cancel</Text>
                        </Pressable>

                        <Pressable className="min-w-[220px] items-center rounded-[18px] bg-[#ef3734] px-8 py-4">
                            <Text className="text-[20px] font-semibold text-white">Continue</Text>
                        </Pressable>
                    </View>

                    <View className="mt-6 items-end">
                        <Text className="text-[14px] text-[#6b7280]">
                            Selected package: <Text className="font-semibold text-[#1f2937]">{selectedPackagePrice === 0 ? 'Free' : formatPrice(selectedPackagePrice)}</Text>
                        </Text>
                        <Text className="mt-1 text-[14px] text-[#6b7280]">
                            Selected date/time: <Text className="font-semibold text-[#1f2937]">{selectedDate} Mar 2026 - {selectedTime}</Text>
                        </Text>
                    </View>
                </View>
            </View>

            <Footer />
        </ScrollView>
    );
}

export default Appointment;
