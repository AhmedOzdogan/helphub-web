import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
const isTestEnvironment = process.env.NODE_ENV === 'test';

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

    // Determine responsive slider heights
    const sliderHeightClass =
        Platform.OS === 'web' || Platform.OS === 'ios' || Platform.OS === 'android'
            ? 'h-[600px] sm:h-[700px] md:h-[360px] lg:h-[520px] xl:h-[620px]'
            : 'h-[250px]';

    // Check if slider is in mobile mode (width < 768)
    const isMobileSlider = sliderWidth > 0 && sliderWidth < 768;
    // Check if slider supports touch gestures
    const isTouchSlider = sliderWidth > 0;
    // Select current slides based on mobile/desktop
    const currentSlides = isMobileSlider ? mobileSlides : desktopSlides;
    // Create track slides with extra first slide for infinite loop
    const trackSlides = useMemo(() => [...currentSlides, currentSlides[0]], [currentSlides]);


    // Function to reset track position to specific index
    const resetTrackPosition = useCallback((index: number) => {
        translateX.setValue(-(index * sliderWidth));
    }, [sliderWidth, translateX]);

    // Function to stop autoplay
    const stopAutoPlay = useCallback(() => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    }, []);

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
    const animateToIndex = useCallback((nextIndex: number, onDone?: () => void) => {
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
    }, [sliderWidth, translateX]);

    // Go to a specific slide index
    const goToIndex = useCallback((nextIndex: number) => {
        if (nextIndex === activeIndex || !sliderWidth) {
            return;
        }

        setActiveIndex(nextIndex);
        animateToIndex(nextIndex);
    }, [activeIndex, sliderWidth, animateToIndex]);

    // Go to previous slide
    const goToPrevious = useCallback(() => {
        if (!sliderWidth) {
            return;
        }

        const previousIndex = activeIndex === 0 ? currentSlides.length - 1 : activeIndex - 1;
        setActiveIndex(previousIndex);
        animateToIndex(previousIndex);
    }, [activeIndex, currentSlides.length, sliderWidth, animateToIndex]);

    // Go to next slide
    const goToNext = useCallback(() => {
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
    }, [activeIndex, currentSlides.length, sliderWidth, animateToIndex, resetTrackPosition]);

    // Go to previous from first slide (for infinite loop)
    const goToPreviousFromFirst = useCallback(() => {
        if (!sliderWidth) {
            return;
        }

        translateX.setValue(-(currentSlides.length * sliderWidth));
        setActiveIndex(currentSlides.length - 1);

        requestAnimationFrame(() => {
            animateToIndex(currentSlides.length - 1);
        });
    }, [currentSlides.length, sliderWidth, translateX, animateToIndex]);


    // Start autoplay
    const startAutoPlay = useCallback(() => {
        stopAutoPlay();

        if (!sliderWidth) {
            return;
        }

        autoPlayRef.current = setInterval(() => {
            if (!isAnimatingRef.current) {
                goToNext();
            }
        }, AUTO_PLAY_DELAY);
    }, [sliderWidth, stopAutoPlay, goToNext]);

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
        [
            activeIndex,
            goToNext,
            goToPrevious,
            goToPreviousFromFirst,
            isTouchSlider,
            resetTrackPosition,
            sliderWidth,
            startAutoPlay,
            translateX,
            stopAutoPlay
        ]
    );


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
    }, [sliderWidth, activeIndex, startAutoPlay, translateX, stopAutoPlay]);

    // Effect to cleanup autoplay on unmount
    useEffect(() => {
        return () => {
            stopAutoPlay();
        };
    }, [stopAutoPlay]);

    // Render the slider component
    return (
        <View
            testID="slider-container"
            onLayout={handleLayout}
            className={`relative w-full overflow-hidden bg-gray-200 ${sliderHeightClass} -z-10 cursor-pointer`}
            {...(isTouchSlider ? panResponder.panHandlers : {})}
            {...(isTestEnvironment
                ? {
                    onTestSwipeLeft: () => {
                        stopAutoPlay();
                        goToNext();
                        startAutoPlay();
                    },
                    onTestSwipeRight: () => {
                        stopAutoPlay();
                        if (activeIndex === 0) {
                            goToPreviousFromFirst();
                        } else {
                            goToPrevious();
                        }
                        startAutoPlay();
                    },
                }
                : {})}
        >
            {sliderWidth > 0 ? (
                <Animated.View
                    testID="slider-track"
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
                            testID={`slider-slide-${index}`}
                            style={{ width: sliderWidth, height: '100%', backgroundColor: "white" }}
                        >
                            <Image
                                testID={`slider-image-${index}`}
                                source={slide}
                                resizeMode={isMobileSlider ? 'contain' : 'cover'}
                                style={{ width: sliderWidth, height: '100%' }}
                            />
                        </View>
                    ))}
                </Animated.View>
            ) : (
                <View className="h-full w-full">
                    <Image
                        testID="slider-fallback-image"
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
                            testID={`slider-dot-${index}`}
                            accessibilityRole="button"
                            accessibilityLabel={`Go to slide ${index + 1}`}
                            accessibilityState={{ selected: isActive }}
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
