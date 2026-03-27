import { useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    LayoutChangeEvent,
    Pressable,
    View,
} from 'react-native';

import slider1 from '../assets/slider/slider1.webp';
import slider2 from '../assets/slider/slider2.webp';
import slider3 from '../assets/slider/slider3.webp';
import slider4 from '../assets/slider/slider4.webp';
import slider5 from '../assets/slider/slider5.webp';

const slides = [slider1, slider2, slider3, slider4, slider5];
const SLIDE_DURATION = 450;

function Slider() {
    // Removed useWindowDimensions
    const [activeIndex, setActiveIndex] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const translateX = useRef(new Animated.Value(0)).current;
    const isAnimatingRef = useRef(false);

    const handleLayout = (event: LayoutChangeEvent) => {
        const width = event.nativeEvent.layout.width;
        setSliderWidth(width);
        translateX.setValue(-activeIndex * width);
    };

    const goToSlide = (nextIndex: number) => {
        if (!sliderWidth || isAnimatingRef.current || nextIndex === activeIndex) {
            return;
        }

        isAnimatingRef.current = true;

        Animated.timing(translateX, {
            toValue: -nextIndex * sliderWidth,
            duration: SLIDE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setActiveIndex(nextIndex);
            isAnimatingRef.current = false;
        });
    };

    const handlePrevious = () => {
        const previousIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
        goToSlide(previousIndex);
    };

    const handleNext = () => {
        const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
        goToSlide(nextIndex);
    };

    return (
        <View onLayout={handleLayout} className="relative h-[520px] w-full overflow-hidden bg-gray-200 -z-10">
            <Animated.View
                className="flex-row"
                style={{
                    width: sliderWidth * slides.length,
                    transform: [{ translateX }],
                }}
            >
                {slides.map((slide, index) => (
                    <View
                        key={index}
                        style={{ width: sliderWidth || '100%' }}
                        className="relative h-[520px]"
                    >
                        <Image
                            source={slide}
                            resizeMode="cover"
                            className="h-full w-full"
                        />
                    </View>
                ))}
            </Animated.View>

            <Pressable
                onPress={handlePrevious}
                className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35"
            >
                <View className="h-3 w-3 rotate-45 border-b-2 border-l-2 border-white" />
            </Pressable>

            <Pressable
                onPress={handleNext}
                className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35"
            >
                <View className="h-3 w-3 rotate-45 border-r-2 border-t-2 border-white" />
            </Pressable>

            <View className="absolute bottom-6 left-0 right-0 flex-row items-center justify-center gap-3">
                {slides.map((_, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <Pressable
                            key={index}
                            onPress={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full shadow-sm shadow-black/40 ${isActive ? 'bg-black' : 'bg-black/60'}`}
                        />
                    );
                })}
            </View>
        </View>
    );
}

export default Slider;
