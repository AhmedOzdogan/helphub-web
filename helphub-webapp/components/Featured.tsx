import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, PanResponder, Pressable, ScrollView, Text, View } from 'react-native';
import ProfileCard from './ui/ProfileCard';

function Featured({ categoryName }: { categoryName: string }) {
    const scrollRef = useRef<ScrollView | null>(null);
    const currentScrollX = useRef(0);
    const dragStartX = useRef(0);
    const dragStartOffset = useRef(0);

    const [scrollX, setScrollX] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    const isMobile = containerWidth > 0 && containerWidth < 768;
    const isTabletOrMobile = containerWidth > 0 && containerWidth < 1280;
    const cardGap = isMobile ? 12 : isTabletOrMobile ? 14 : 16;

    const cardWidth = useMemo(() => {
        if (!containerWidth) return 350;
        if (isMobile) return Math.max(containerWidth - 88, 248);
        if (isTabletOrMobile) return Math.max(Math.min(containerWidth - 120, 340), 280);
        return 300;
    }, [containerWidth, isMobile, isTabletOrMobile]);

    const sidePadding = isMobile ? 12 : isTabletOrMobile ? 20 : 8;
    const slideStep = cardWidth + cardGap;

    const TOTAL_CARDS = 8;
    const visibleCards = isTabletOrMobile ? 1 : 4;
    const maxScroll = Math.max((TOTAL_CARDS - visibleCards) * slideStep, 0);

    const clampScroll = (value: number) => {
        return Math.max(0, Math.min(value, maxScroll));
    };

    const handleContainerLayout = (event: LayoutChangeEvent) => {
        const width = Math.round(event.nativeEvent.layout.width);

        if (!width || width === containerWidth) {
            return;
        }

        setContainerWidth(width);
    };

    const handleScrollLeft = () => {
        const nextX = Math.max(currentScrollX.current - slideStep, 0);

        scrollRef.current?.scrollTo({
            x: nextX,
            animated: true,
        });

        currentScrollX.current = nextX;
        setScrollX(nextX);
    };

    const handleScrollRight = () => {
        const nextX = Math.min(currentScrollX.current + slideStep, maxScroll);

        scrollRef.current?.scrollTo({
            x: nextX,
            animated: true,
        });

        currentScrollX.current = nextX;
        setScrollX(nextX);
    };

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (_, gestureState) => {
                    return isTabletOrMobile && Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 8;
                },
                onPanResponderGrant: () => {
                    dragStartX.current = currentScrollX.current;
                    dragStartOffset.current = currentScrollX.current;
                },
                onPanResponderMove: (_, gestureState) => {
                    const nextX = clampScroll(dragStartOffset.current - gestureState.dx);

                    scrollRef.current?.scrollTo({
                        x: nextX,
                        animated: false,
                    });

                    currentScrollX.current = nextX;
                    setScrollX(nextX);
                },
                onPanResponderRelease: (_, gestureState) => {
                    const rawTarget = clampScroll(dragStartX.current - gestureState.dx);
                    const snappedX = clampScroll(Math.round(rawTarget / slideStep) * slideStep);

                    scrollRef.current?.scrollTo({
                        x: snappedX,
                        animated: true,
                    });

                    currentScrollX.current = snappedX;
                    setScrollX(snappedX);
                },
                onPanResponderTerminate: () => {
                    const snappedX = clampScroll(Math.round(currentScrollX.current / slideStep) * slideStep);

                    scrollRef.current?.scrollTo({
                        x: snappedX,
                        animated: true,
                    });

                    currentScrollX.current = snappedX;
                    setScrollX(snappedX);
                },
            }),
        [isTabletOrMobile, maxScroll, slideStep]
    );

    return (
        <View className={`mt-10 w-full items-center justify-center bg-blue-50 ${isMobile ? 'px-3 py-6' : isTabletOrMobile ? 'px-6 py-7' : 'px-14 py-8'}`}>
            <Text className={`mb-8 font-bold text-slate-800 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                {categoryName}
            </Text>

            <View
                onLayout={handleContainerLayout}
                className={`relative w-full ${isMobile ? 'max-w-full' : 'max-w-[1330px]'}`}
                {...(isTabletOrMobile ? panResponder.panHandlers : {})}
            >
                {!isTabletOrMobile ? (
                    <Pressable
                        onPress={handleScrollLeft}
                        className="absolute left-[-28px] top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow"
                        disabled={scrollX <= 0}
                    >
                        <Ionicons name="chevron-back" size={20} color={scrollX <= 0 ? '#cbd5e1' : '#475569'} />
                    </Pressable>
                ) : null}

                <ScrollView
                    ref={scrollRef}
                    horizontal
                    scrollEnabled={!isTabletOrMobile}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: sidePadding,
                    }}
                    className="w-full"
                    onScroll={(event) => {
                        const x = event.nativeEvent.contentOffset.x;
                        currentScrollX.current = x;
                        setScrollX(x);
                    }}
                    scrollEventThrottle={16}
                    decelerationRate={isTabletOrMobile ? 'fast' : 'normal'}
                    snapToInterval={slideStep}
                    snapToAlignment="start"
                    disableIntervalMomentum={isTabletOrMobile}
                    pagingEnabled={false}
                    bounces={false}
                >
                    <View className="flex-row" style={{ columnGap: cardGap }}>
                        <ProfileCard cardWidth={cardWidth} man={true} new={categoryName === 'New Consultants'} online={categoryName === 'Online Consultants'} compact={isTabletOrMobile} />
                        <ProfileCard cardWidth={cardWidth} man={false} new={categoryName === 'New Consultants'} online={categoryName === 'Online Consultants'} compact={isTabletOrMobile} />
                        <ProfileCard cardWidth={cardWidth} man={true} new={categoryName === 'New Consultants'} online={categoryName === 'Online Consultants'} compact={isTabletOrMobile} />
                        <ProfileCard cardWidth={cardWidth} man={false} new={categoryName === 'New Consultants'} online={categoryName === 'Online Consultants'} compact={isTabletOrMobile} />
                        <ProfileCard cardWidth={cardWidth} man={true} new={categoryName === 'New Consultants'} online={categoryName === 'Online Consultants'} compact={isTabletOrMobile} />
                        <ProfileCard cardWidth={cardWidth} man={false} new={categoryName === 'New Consultants'} online={categoryName === 'Online Consultants'} compact={isTabletOrMobile} />
                        <ProfileCard cardWidth={cardWidth} man={true} new={categoryName === 'New Consultants'} online={categoryName === 'Online Consultants'} compact={isTabletOrMobile} />
                        <ProfileCard cardWidth={cardWidth} man={false} new={categoryName === 'New Consultants'} online={categoryName === 'Online Consultants'} compact={isTabletOrMobile} />
                    </View>
                </ScrollView>

                {!isTabletOrMobile ? (
                    <Pressable
                        onPress={handleScrollRight}
                        className="absolute right-[-28px] top-1/2 z-20 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow"
                        disabled={scrollX >= maxScroll}
                    >
                        <Ionicons name="chevron-forward" size={20} color={scrollX >= maxScroll ? '#cbd5e1' : '#475569'} />
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
}

export default Featured;