import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Details from '../../Details';

describe('Details', () => {
    it('renders the title and description', () => {
        render(<Details />);

        expect(screen.getByText('details.title')).toBeTruthy();
    });

    it('renders all sections with correct titles and descriptions', () => {
        render(<Details />);

        expect(screen.getByText('details.section1.title')).toBeTruthy();
        expect(screen.getByText('details.section1.description')).toBeTruthy();

        expect(screen.getByText('details.section2.title')).toBeTruthy();
        expect(screen.getByText('details.section2.description')).toBeTruthy();

        expect(screen.getByText('details.section3.title')).toBeTruthy();
        expect(screen.getByText('details.section3.description')).toBeTruthy();
    });

    it('renders the "Professional Support You Can Trust" section', () => {
        render(<Details />);

        expect(screen.getByText('details.section4.title')).toBeTruthy();
        expect(screen.getByText('details.section4.description')).toBeTruthy();
    });

    it('renders the "Personalized Solutions for Everyone" section', () => {
        render(<Details />);

        expect(screen.getByText('details.section5.title')).toBeTruthy();
        expect(screen.getByText('details.section5.description')).toBeTruthy();
    });

    it('renders all sections in the correct order and centered', () => {
        render(<Details />);

        const sections = screen.getByTestId('details-container').props.children;
        expect(sections[0].props.testID).toBe('First Paragraph');
        expect(sections[1].props.testID).toBe('Second Paragraph');
        expect(sections[2].props.testID).toBe('Third Paragraph');

        const mainContainer = screen.getByTestId('details-main-container');
        expect(mainContainer.props.className).toContain('items-center');
        expect(mainContainer.props.className).toContain('justify-center');
    });
}); 