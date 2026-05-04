import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Numbers from '../../Numbers';

describe('Numbers', () => {
    it('renders the numbers section container', () => {
        render(<Numbers />);

        expect(screen.getByTestId('numbers-section')).toBeTruthy();
    });

    it('renders the stats container', () => {
        render(<Numbers />);

        expect(screen.getByTestId('numbers-stats-container')).toBeTruthy();
    });

    it('renders the section title', () => {
        render(<Numbers />);

        expect(screen.getByText('Our Impact in Numbers')).toBeTruthy();
    });

    it('renders the active consultants stat', () => {
        render(<Numbers />);

        expect(screen.getByTestId('numbers-stat-active-consultants')).toBeTruthy();
        expect(screen.getByText('2000')).toBeTruthy();
        expect(screen.getByText('Active Consultants')).toBeTruthy();
    });

    it('renders the completed sessions stat', () => {
        render(<Numbers />);

        expect(screen.getByTestId('numbers-stat-completed-sessions')).toBeTruthy();
        expect(screen.getByText('185.452')).toBeTruthy();
        expect(screen.getByText('Completed Sessions')).toBeTruthy();
    });

    it('renders the satisfied customers stat', () => {
        render(<Numbers />);

        expect(screen.getByTestId('numbers-stat-satisfied-customers')).toBeTruthy();
        expect(screen.getByText('40.000+')).toBeTruthy();
        expect(screen.getByText('Satisfied Customers')).toBeTruthy();
    });

    it('renders the positive reviews stat', () => {
        render(<Numbers />);

        expect(screen.getByTestId('numbers-stat-positive-reviews')).toBeTruthy();
        expect(screen.getByText('7562')).toBeTruthy();
        expect(screen.getByText('Positive Reviews')).toBeTruthy();
    });

    it('renders exactly four stat cards', () => {
        render(<Numbers />);

        expect(screen.getByTestId('numbers-stat-active-consultants')).toBeTruthy();
        expect(screen.getByTestId('numbers-stat-completed-sessions')).toBeTruthy();
        expect(screen.getByTestId('numbers-stat-satisfied-customers')).toBeTruthy();
        expect(screen.getByTestId('numbers-stat-positive-reviews')).toBeTruthy();
    });
});
