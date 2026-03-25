import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    Pressable,
    useWindowDimensions,
    View,
} from 'react-native';

import slider1 from '../assets/slider1.webp';
import slider2 from '../assets/slider2.webp';
import slider3 from '../assets/slider3.webp';
import slider4 from '../assets/slider4.webp';
import slider5 from '../assets/slider5.webp';

const slides = [slider1, slider2, slider3, slider4, slider5];
const AUTO_SLIDE_INTERVAL = 5000;
const SLIDE_DURATION = 450;

function Slider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
    const { width: windowWidth } = useWindowDimensions();
    const trackTranslateX = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isAnimatingRef = useRef(false);

    const goToSlide = (nextIndex: number) => {
        if (nextIndex === activeIndex || isAnimatingRef.current || !windowWidth) {
            return;
        }

        isAnimatingRef.current = true;
        setIncomingIndex(nextIndex);
        trackTranslateX.setValue(0);

        Animated.timing(trackTranslateX, {
            toValue: -windowWidth,
            duration: SLIDE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setActiveIndex(nextIndex);
            setIncomingIndex(null);
            trackTranslateX.setValue(0);
            isAnimatingRef.current = false;
        });
    };

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            goToSlide(
                activeIndex === slides.length - 1 ? 0 : activeIndex + 1
            );
        }, AUTO_SLIDE_INTERVAL);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [activeIndex]);

    return (
        <View className="relative h-[520px] w-full overflow-hidden bg-gray-200 -z-10">
            {incomingIndex !== null ? (
                <Animated.View
                    className="absolute inset-0 flex-row"
                    style={{
                        width: windowWidth * 2,
                        transform: [{ translateX: trackTranslateX }],
                    }}
                >
                    <View style={{ width: windowWidth }} className="h-full">
                        <Image
                            source={slides[activeIndex]}
                            resizeMode="cover"
                            className="h-full w-full"
                        />
                    </View>
                    <View style={{ width: windowWidth }} className="h-full">
                        <Image
                            source={slides[incomingIndex]}
                            resizeMode="cover"
                            className="h-full w-full"
                        />
                    </View>
                </Animated.View>
            ) : (
                <View className="absolute inset-0 h-full w-full">
                    <Image
                        source={slides[activeIndex]}
                        resizeMode="cover"
                        className="h-full w-full"
                    />
                </View>
            )}

            <View className="absolute bottom-6 left-0 right-0 flex-row items-center justify-center gap-3">
                {slides.map((_, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <Pressable
                            key={index}
                            onPress={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full shadow-sm shadow-black/40 ${isActive ? 'bg-black' : 'bg-black/60'
                                }`}
                        />
                    );
                })}
            </View>
        </View>
    );
}

export default Slider;
