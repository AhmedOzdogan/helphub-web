import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Companies from '../../Companies';

jest.mock('../../../assets/companies.webp', () => 1);

jest.mock('../../ui/RedButton', () => {
    const { Text, Pressable } = require('react-native');

    return function MockRedButton({ ButtonText }: { ButtonText: string }) {
        return (
            <Pressable accessibilityRole="button" accessibilityLabel={ButtonText} testID="companies-contact-button">
                <Text>{ButtonText}</Text>
            </Pressable>
        );
    };
});

describe('Companies', () => {
    it('renders the companies section container', () => {
        render(<Companies />);

        expect(screen.getByTestId('companies-section')).toBeTruthy();
    });

    it('renders the left content area', () => {
        render(<Companies />);

        expect(screen.getByTestId('companies-left-content')).toBeTruthy();
    });

    it('renders the partners content area', () => {
        render(<Companies />);

        expect(screen.getByTestId('companies-partners-content')).toBeTruthy();
    });

    it('renders the company support heading', () => {
        render(<Companies />);

        expect(screen.getByText('Special support for companies')).toBeTruthy();
    });

    it('renders the HelpHub Solutions title', () => {
        render(<Companies />);

        expect(screen.getByText('HelpHub Solutions')).toBeTruthy();
    });

    it('renders the partner companies description', () => {
        render(<Companies />);

        expect(screen.getByText('Companies partnering with HelpHub')).toBeTruthy();
    });

    it('renders the Contact Us button', () => {
        render(<Companies />);

        expect(screen.getByText('Contact Us')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Contact Us' })).toBeTruthy();
        expect(screen.getByTestId('companies-contact-button')).toBeTruthy();
    });

    it('passes the correct text to the RedButton component', () => {
        render(<Companies />);

        expect(screen.getByTestId('companies-contact-button').props.accessibilityLabel).toBe('Contact Us');
    });

    it('renders the companies logo image', () => {
        render(<Companies />);

        expect(screen.getByTestId('companies-logo-image')).toBeTruthy();
    });

    it('uses contain resize mode for the companies logo image', () => {
        render(<Companies />);

        expect(screen.getByTestId('companies-logo-image').props.resizeMode).toBe('contain');
    });

    it('uses the correct accessibility label for the companies logo image', () => {
        render(<Companies />);

        expect(screen.getByLabelText('Companies partnering with HelpHub logos')).toBeTruthy();
    });
});
