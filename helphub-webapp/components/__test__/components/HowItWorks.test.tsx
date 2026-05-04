import { render, screen } from '@testing-library/react-native';
import React from 'react';
import HowItWorks from '../../HowItWorks';

describe('HowItWorks', () => {
    it('renders the title and description', () => {
        render(<HowItWorks />);

        expect(screen.getByText('How It Works?')).toBeTruthy();
        expect(screen.getByText('Our consulting process is simple and effective. Quickly connect with the right expert for your needs and reach a solution.')).toBeTruthy();
    });

    it('renders all step cards with correct content', () => {
        render(<HowItWorks />);

        expect(screen.getByText('Choose an Expert')).toBeTruthy();
        expect(screen.getByText('Find the right specialist easily using filters that match your needs.')).toBeTruthy();

        expect(screen.getByText('Free Intro Chat')).toBeTruthy();
        expect(screen.getByText('Message the expert for free and have a short introductory conversation.')).toBeTruthy();

        expect(screen.getByText('Schedule a Session')).toBeTruthy();
        expect(screen.getByText('Pick a suitable date and time and plan your online session.')).toBeTruthy();

        expect(screen.getByText('Start the Session')).toBeTruthy();
        expect(screen.getByText('Meet your consultant online at the scheduled time.')).toBeTruthy();
    });

    it('renders whether flex-wrap is applied', () => {
        render(<HowItWorks />);
        const stepsContainer = screen.getByTestId('steps-cards-container');

        // Check if the container has the correct class for flex-wrap
        expect(stepsContainer.props.className).toContain('flex-wrap');

    });

    it('renders whether gap is applied', () => {
        render(<HowItWorks />);
        const stepsContainer = screen.getByTestId('steps-cards-container');

        // Check if the container has the correct class for gap
        expect(stepsContainer.props.className).toContain('gap-4');
        expect(stepsContainer.props.className).toContain('md:gap-6');
    });

    it('renders whether items are centered', () => {
        render(<HowItWorks />);
        const stepsContainer = screen.getByTestId('steps-cards-container');

        // Check if the container has the correct class for centering items
        expect(stepsContainer.props.className).toContain('items-center');
        expect(stepsContainer.props.className).toContain('justify-center');
    }
    );
});