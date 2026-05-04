import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Advantages from '../../Advantages';

jest.mock('@expo/vector-icons/Ionicons', () => {
    const { Text } = require('react-native');

    return function MockIonicons({ name, color, testID }: { name: string; color: string; testID?: string }) {
        return (
            <Text testID={testID} accessibilityLabel={`icon-${name}`} style={{ color }}>
                {name}
            </Text>
        );
    };
});

describe('Advantages', () => {
    it('renders the advantages section container', () => {
        render(<Advantages />);

        expect(screen.getByTestId('advantages-section')).toBeTruthy();
    });

    it('renders the section title', () => {
        render(<Advantages />);

        expect(screen.getByText('Advantages of Choosing HelpHub')).toBeTruthy();
    });

    it('renders the cards container', () => {
        render(<Advantages />);

        expect(screen.getByTestId('advantages-cards-container')).toBeTruthy();
    });

    it('renders exactly four advantage cards', () => {
        render(<Advantages />);

        expect(screen.getByTestId('step-card-01')).toBeTruthy();
        expect(screen.getByTestId('step-card-02')).toBeTruthy();
        expect(screen.getByTestId('step-card-03')).toBeTruthy();
        expect(screen.getByTestId('step-card-04')).toBeTruthy();
    });

    it('renders the live consultation advantage card', () => {
        render(<Advantages />);

        expect(screen.getByText('1-1 Live Consultation')).toBeTruthy();
        expect(screen.getByText('Live consultation from the comfort of your home, office, or anywhere you are.')).toBeTruthy();
        expect(screen.getByTestId('step-card-icon-01')).toBeTruthy();
        expect(screen.getByText('search')).toBeTruthy();
    });

    it('renders the online chat advantage card', () => {
        render(<Advantages />);

        expect(screen.getByText('Online Chat')).toBeTruthy();
        expect(screen.getByText('Message the expert for free and have a short introductory conversation.')).toBeTruthy();
        expect(screen.getByTestId('step-card-icon-02')).toBeTruthy();
        expect(screen.getByText('chatbubble-outline')).toBeTruthy();
    });

    it('renders the secure payment advantage card', () => {
        render(<Advantages />);

        expect(screen.getByText('Secure Payment')).toBeTruthy();
        expect(screen.getByText('Make secure payments using your credit card.')).toBeTruthy();
        expect(screen.getByTestId('step-card-icon-03')).toBeTruthy();
        expect(screen.getByText('calendar-outline')).toBeTruthy();
    });

    it('renders the refund guarantee advantage card', () => {
        render(<Advantages />);

        expect(screen.getByText('100% Refund Guarantee')).toBeTruthy();
        expect(screen.getByText('Get a full refund for any missed appointments.')).toBeTruthy();
        expect(screen.getByTestId('step-card-icon-04')).toBeTruthy();
        expect(screen.getByText('videocam-outline')).toBeTruthy();
    });

    it('does not render visible step numbers for advantage cards', () => {
        render(<Advantages />);

        expect(screen.queryByText('01')).toBeNull();
        expect(screen.queryByText('02')).toBeNull();
        expect(screen.queryByText('03')).toBeNull();
        expect(screen.queryByText('04')).toBeNull();
    });

    it('uses advantage styling for all card icon wrappers', () => {
        render(<Advantages />);

        expect(screen.getByTestId('step-card-icon-wrapper-01').props.className).toContain('bg-red-500');
        expect(screen.getByTestId('step-card-icon-wrapper-02').props.className).toContain('bg-red-500');
        expect(screen.getByTestId('step-card-icon-wrapper-03').props.className).toContain('bg-red-500');
        expect(screen.getByTestId('step-card-icon-wrapper-04').props.className).toContain('bg-red-500');
    });

    it('uses white icons for advantage cards', () => {
        render(<Advantages />);

        expect(screen.getByTestId('step-card-icon-01').props.style.color).toBe('#ffffff');
        expect(screen.getByTestId('step-card-icon-02').props.style.color).toBe('#ffffff');
        expect(screen.getByTestId('step-card-icon-03').props.style.color).toBe('#ffffff');
        expect(screen.getByTestId('step-card-icon-04').props.style.color).toBe('#ffffff');
    });
});
