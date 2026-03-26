import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import ProfileCard from './ui/ProfileCard';

function Featured({ categoryName }: { categoryName: string }) {
    // Scroll view ref
    const scrollRef = useRef<ScrollView | null>(null);

    // Track current horizontal position
    const currentScrollX = useRef(0);

    // Fixed card width with gap for manual slider movement
    const CARD_WIDTH = 316;
    const CARD_GAP = 16;
    const SLIDE_STEP = CARD_WIDTH + CARD_GAP;

    const [scrollX, setScrollX] = useState(0);
    const TOTAL_CARDS = 8;
    const maxScroll = (TOTAL_CARDS - 4) * SLIDE_STEP - 2; // 4 cards visible at once, -2 for padding adjustment
    console.log('maxScroll:', maxScroll);
    console.log('scrollX:', scrollX);

    // Scroll left one card
    const handleScrollLeft = () => {
        const nextX = Math.max(currentScrollX.current - SLIDE_STEP, 0);

        scrollRef.current?.scrollTo({
            x: nextX,
            animated: true,
        });

        currentScrollX.current = nextX;
        setScrollX(nextX);
    };

    // Scroll right one card
    const handleScrollRight = () => {
        const nextX = currentScrollX.current + SLIDE_STEP;

        scrollRef.current?.scrollTo({
            x: nextX,
            animated: true,
        });

        currentScrollX.current = nextX;
        setScrollX(nextX);
    };

    return (
        <View className="mt-10 w-full items-center justify-center bg-blue-50 px-16 py-8">
            <Text className="mb-8 text-2xl font-bold text-slate-800">
                {categoryName}
            </Text>

            <View className="relative w-full max-w-[1330px]">
                <Pressable
                    onPress={handleScrollLeft}
                    className="absolute left-[-28px] top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow"
                    disabled={scrollX <= 0}
                >
                    <Ionicons name="chevron-back" size={20} color={scrollX <= 0 ? '#cbd5e1' : '#475569'} />
                </Pressable>

                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 8 }}
                    className="w-full"
                    onScroll={(event) => {
                        const x = event.nativeEvent.contentOffset.x;
                        currentScrollX.current = x;
                        setScrollX(x);
                    }}
                    scrollEventThrottle={16}
                >
                    <View className="flex-row gap-4">
                        <ProfileCard man={true} new={categoryName === "New Consultants"} online={categoryName === "Online Consultants"} />
                        <ProfileCard man={false} new={categoryName === "New Consultants"} online={categoryName === "Online Consultants"} />
                        <ProfileCard man={true} new={categoryName === "New Consultants"} online={categoryName === "Online Consultants"} />
                        <ProfileCard man={false} new={categoryName === "New Consultants"} online={categoryName === "Online Consultants"} />
                        <ProfileCard man={true} new={categoryName === "New Consultants"} online={categoryName === "Online Consultants"} />
                        <ProfileCard man={false} new={categoryName === "New Consultants"} online={categoryName === "Online Consultants"} />
                        <ProfileCard man={true} new={categoryName === "New Consultants"} online={categoryName === "Online Consultants"} />
                        <ProfileCard man={false} new={categoryName === "New Consultants"} online={categoryName === "Online Consultants"} />
                    </View>
                </ScrollView>

                <Pressable
                    onPress={handleScrollRight}
                    className="absolute right-[-28px] top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow"
                    disabled={scrollX >= maxScroll}
                >
                    <Ionicons name="chevron-forward" size={20} color={scrollX >= maxScroll ? '#cbd5e1' : '#475569'} />
                </Pressable>
            </View>
        </View>
    );
}

export default Featured;