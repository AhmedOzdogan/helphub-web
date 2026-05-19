import { render, screen } from '@testing-library/react-native';
import React from 'react';
import HowItWorks from '../../HowItWorks';

describe('HowItWorks', () => {
    it('renders the title and description', () => {
        render(<HowItWorks />);

        expect(screen.getByText('howItWorks.title')).toBeTruthy();
        expect(screen.getByText('howItWorks.subtitle')).toBeTruthy();
    });

    it('renders all step cards with correct content', () => {
        render(<HowItWorks />);

        expect(screen.getByText('howItWorks.step1.title')).toBeTruthy();
        expect(screen.getByText('howItWorks.step1.description')).toBeTruthy();

        expect(screen.getByText('howItWorks.step2.title')).toBeTruthy();
        expect(screen.getByText('howItWorks.step2.description')).toBeTruthy();

        expect(screen.getByText('howItWorks.step3.title')).toBeTruthy();
        expect(screen.getByText('howItWorks.step3.description')).toBeTruthy();

        expect(screen.getByText('howItWorks.step4.title')).toBeTruthy();
        expect(screen.getByText('howItWorks.step4.description')).toBeTruthy();
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