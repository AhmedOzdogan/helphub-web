import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    LayoutChangeEvent,
    PanResponder,
    Platform,
    Pressable,
    View,
} from 'react-native';

// Import desktop slide images
import slider1 from '../assets/slider/slider1.webp';
import slider2 from '../assets/slider/slider2.webp';
import slider3 from '../assets/slider/slider3.webp';
import slider4 from '../assets/slider/slider4.webp';
import slider5 from '../assets/slider/slider5.webp';

// Import mobile slide images
import slider1Mobile from '../assets/slider/slider1-mobile.webp';
import slider2Mobile from '../assets/slider/slider2-mobile.webp';
import slider3Mobile from '../assets/slider/slider3-mobile.webp';
import slider4Mobile from '../assets/slider/slider4-mobile.webp';

// Define desktop and mobile slide arrays
const desktopSlides = [slider1, slider2, slider3, slider4, slider5];
const mobileSlides = [slider1Mobile, slider2Mobile, slider3Mobile, slider4Mobile];

// Define autoplay delay and slide animation duration
const AUTO_PLAY_DELAY = 4500;
const SLIDE_DURATION = 650;

function Slider() {
    // State for current active slide index
    const [activeIndex, setActiveIndex] = useState(0);
    // State for slider container width
    const [sliderWidth, setSliderWidth] = useState(0);
    // Animated value for horizontal translation
    const translateX = useRef(new Animated.Value(0)).current;
    // Ref for autoplay interval
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
    // Ref to track if animation is in progress
    const isAnimatingRef = useRef(false);

    // Determine height class based on platform
    const sliderHeightClass =
        Platform.OS === 'web' || Platform.OS === 'ios'
            ? 'h-[620px] sm:h-[620px] md:h-[360px] lg:h-[600px]'
            : 'h-[250px]';

    // Check if slider is in mobile mode (width < 640)
    const isMobileSlider = sliderWidth > 0 && sliderWidth < 640;
    // Check if slider supports touch gestures
    const isTouchSlider = sliderWidth > 0;
    // Select current slides based on mobile/desktop
    const currentSlides = isMobileSlider ? mobileSlides : desktopSlides;
    // Create track slides with extra first slide for infinite loop
    const trackSlides = useMemo(() => [...currentSlides, currentSlides[0]], [currentSlides]);

    // Function to reset track position to specific index
    const resetTrackPosition = (index: number) => {
        translateX.setValue(-(index * sliderWidth));
    };

    // Function to stop autoplay
    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    // Handle layout changes to update slider width
    const handleLayout = (event: LayoutChangeEvent) => {
        const nextWidth = Math.round(event.nativeEvent.layout.width);

        if (!nextWidth || nextWidth === sliderWidth) {
            return;
        }

        setSliderWidth(nextWidth);
        translateX.setValue(-(activeIndex * nextWidth));
    };

    // Animate to a specific slide index
    const animateToIndex = (nextIndex: number, onDone?: () => void) => {
        if (!sliderWidth || isAnimatingRef.current) {
            return;
        }

        isAnimatingRef.current = true;

        Animated.timing(translateX, {
            toValue: -(nextIndex * sliderWidth),
            duration: SLIDE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            isAnimatingRef.current = false;
            onDone?.();
        });
    };

    // Go to a specific slide index
    const goToIndex = (nextIndex: number) => {
        if (nextIndex === activeIndex || !sliderWidth) {
            return;
        }

        setActiveIndex(nextIndex);
        animateToIndex(nextIndex);
    };

    // Go to previous slide
    const goToPrevious = () => {
        if (!sliderWidth) {
            return;
        }

        const previousIndex = activeIndex === 0 ? currentSlides.length - 1 : activeIndex - 1;
        setActiveIndex(previousIndex);
        animateToIndex(previousIndex);
    };

    // Go to next slide
    const goToNext = () => {
        if (!sliderWidth) {
            return;
        }

        if (activeIndex === currentSlides.length - 1) {
            setActiveIndex(0);
            animateToIndex(currentSlides.length, () => {
                resetTrackPosition(0);
            });
            return;
        }

        const nextIndex = activeIndex + 1;
        setActiveIndex(nextIndex);
        animateToIndex(nextIndex);
    };

    // Go to previous from first slide (for infinite loop)
    const goToPreviousFromFirst = () => {
        if (!sliderWidth) {
            return;
        }

        translateX.setValue(-(currentSlides.length * sliderWidth));
        setActiveIndex(currentSlides.length - 1);

        requestAnimationFrame(() => {
            animateToIndex(currentSlides.length - 1);
        });
    };

    // Create PanResponder for swipe gestures
    const panResponder = useMemo(
        () =>
            PanResponder.create({
                // Determine if should respond to move
                onMoveShouldSetPanResponder: (_, gestureState) => {
                    return isTouchSlider && Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
                },
                // Handle responder grant
                onPanResponderGrant: () => {
                    stopAutoPlay();
                    translateX.stopAnimation();
                },
                // Handle responder release
                onPanResponderRelease: (_, gestureState) => {
                    if (!isTouchSlider || !sliderWidth) {
                        startAutoPlay();
                        return;
                    }

                    const swipeThreshold = sliderWidth * 0.12;

                    if (gestureState.dx <= -swipeThreshold) {
                        goToNext();
                    } else if (gestureState.dx >= swipeThreshold) {
                        if (activeIndex === 0) {
                            goToPreviousFromFirst();
                        } else {
                            goToPrevious();
                        }
                    } else {
                        resetTrackPosition(activeIndex);
                    }

                    startAutoPlay();
                },
                // Handle responder terminate
                onPanResponderTerminate: () => {
                    resetTrackPosition(activeIndex);
                    startAutoPlay();
                },
            }),
        [activeIndex, currentSlides.length, isTouchSlider, sliderWidth]
    );

    // Start autoplay
    const startAutoPlay = () => {
        stopAutoPlay();

        if (!sliderWidth) {
            return;
        }

        autoPlayRef.current = setInterval(() => {
            if (!isAnimatingRef.current) {
                goToNext();
            }
        }, AUTO_PLAY_DELAY);
    };

    // Effect to start autoplay when slider width is set
    useEffect(() => {
        if (!sliderWidth) {
            return;
        }

        translateX.setValue(-(activeIndex * sliderWidth));
        startAutoPlay();

        return () => {
            stopAutoPlay();
        };
    }, [sliderWidth]);

    // Effect to cleanup autoplay on unmount
    useEffect(() => {
        return () => {
            stopAutoPlay();
        };
    }, []);

    // Render the slider component
    return (
        <View
            onLayout={handleLayout}
            className={`relative w-full overflow-hidden bg-gray-200 ${sliderHeightClass} -z-10 cursor-pointer`}
            {...(isTouchSlider ? panResponder.panHandlers : {})}
        >
            {sliderWidth > 0 ? (
                <Animated.View
                    style={{
                        width: sliderWidth * trackSlides.length,
                        height: '100%',
                        flexDirection: 'row',
                        transform: [{ translateX }],
                    }}
                >
                    {trackSlides.map((slide, index) => (
                        <View
                            key={index}
                            style={{ width: sliderWidth, height: '100%' }}
                        >
                            <Image
                                source={slide}
                                resizeMode="cover"
                                style={{ width: sliderWidth, height: '100%' }}
                            />
                        </View>
                    ))}
                </Animated.View>
            ) : (
                <View className="h-full w-full">
                    <Image
                        source={currentSlides[0]}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            )}


            <View className="absolute bottom-4 left-0 right-0 flex-row items-center justify-center gap-2 sm:bottom-6 sm:gap-3">
                {currentSlides.map((_, index) => {
                    const isActive = index === activeIndex;

                    return (
                        <Pressable
                            key={index}
                            onPress={() => {
                                stopAutoPlay();
                                goToIndex(index);
                                startAutoPlay();
                            }}
                            className={`h-2.5 w-2.5 rounded-full shadow-sm shadow-black/40 sm:h-3 sm:w-3 ${isActive ? 'bg-white' : 'bg-white/60'}`}
                        />
                    );
                })}
            </View>
        </View>
    );
}

export default Slider;
