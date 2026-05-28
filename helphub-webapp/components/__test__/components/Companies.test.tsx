import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Companies from '../../Companies';

jest.mock('../../../assets/companies.webp', () => 1);

jest.mock('../../ui/RedButton', () => 'MockRedButton');

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

        expect(screen.getByText('companies.leftSide.text1')).toBeTruthy();
    });

    it('renders the HelpHub Solutions title', () => {
        render(<Companies />);

        expect(screen.getByText('companies.leftSide.text2')).toBeTruthy();
    });

    it('renders the partner companies description', () => {
        render(<Companies />);

        expect(screen.getByText('companies.rightSide.text1')).toBeTruthy();
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

        expect(screen.getByLabelText('companies.rightSide.accesibilityLabel')).toBeTruthy();
    });
});
