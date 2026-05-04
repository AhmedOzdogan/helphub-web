import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Animated } from 'react-native';
import Slider from '../../Slider';

const setSliderWidth = (width = 390) => {
    fireEvent(screen.getByTestId('slider-container'), 'layout', {
        nativeEvent: {
            layout: {
                width,
                height: 620,
            },
        },
    });
};

describe('Slider', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(Animated, 'timing').mockImplementation((_value, _config) => {
            return {
                start: (callback?: Animated.EndCallback) => {
                    callback?.({ finished: true });
                },
                stop: jest.fn(),
                reset: jest.fn(),
            } as unknown as Animated.CompositeAnimation;
        });
    });

    afterEach(() => {
        act(() => {
            jest.clearAllTimers();
        });
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('renders the fallback image before layout width is measured', () => {
        render(<Slider />);

        expect(screen.getByTestId('slider-fallback-image')).toBeTruthy();
    });

    it('renders mobile slides after mobile layout width is measured', () => {
        render(<Slider />);

        act(() => {
            setSliderWidth(390);
        });

        expect(screen.getByTestId('slider-image-0')).toBeTruthy();
        expect(screen.getByTestId('slider-image-1')).toBeTruthy();
        expect(screen.getByTestId('slider-image-2')).toBeTruthy();
        expect(screen.getByTestId('slider-image-3')).toBeTruthy();
        expect(screen.getByTestId('slider-image-4')).toBeTruthy();
    });

    it('renders desktop slides after desktop layout width is measured', () => {
        render(<Slider />);

        act(() => {
            setSliderWidth(1024);
        });

        expect(screen.getAllByTestId(/slider-image-/)).toHaveLength(6);
    });

    it('starts with the first dot selected', () => {
        render(<Slider />);

        act(() => {
            setSliderWidth(390);
        });

        expect(screen.getByTestId('slider-dot-0').props.accessibilityState.selected).toBe(true);
        expect(screen.getByTestId('slider-dot-1').props.accessibilityState.selected).toBe(false);
    });

    it('automatically moves to the next slide after the autoplay delay', () => {
        render(<Slider />);

        act(() => {
            setSliderWidth(390);
        });

        expect(screen.getByTestId('slider-dot-0').props.accessibilityState.selected).toBe(true);

        act(() => {
            jest.advanceTimersByTime(4500);
        });

        expect(screen.getByTestId('slider-dot-1').props.accessibilityState.selected).toBe(true);
    });

    it('moves to the selected slide when a dot is pressed', () => {
        render(<Slider />);

        act(() => {
            setSliderWidth(390);
        });

        fireEvent.press(screen.getByTestId('slider-dot-2'));

        expect(screen.getByTestId('slider-dot-2').props.accessibilityState.selected).toBe(true);
    });

    it('swipes left to move to the next slide', () => {
        render(<Slider />);

        act(() => {
            setSliderWidth(390);
        });

        act(() => {
            screen.getByTestId('slider-container').props.onTestSwipeLeft();
        });

        expect(screen.getByTestId('slider-dot-1').props.accessibilityState.selected).toBe(true);
    });

    it('swipes right from the second slide to move to the previous slide', () => {
        render(<Slider />);

        act(() => {
            setSliderWidth(390);
        });

        act(() => {
            fireEvent.press(screen.getByTestId('slider-dot-1'));
        });
        expect(screen.getByTestId('slider-dot-1').props.accessibilityState.selected).toBe(true);

        act(() => {
            screen.getByTestId('slider-container').props.onTestSwipeRight();
        });

        expect(screen.getByTestId('slider-dot-0').props.accessibilityState.selected).toBe(true);
    });
});