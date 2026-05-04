import { render, screen } from '@testing-library/react-native';
import React from 'react';
import Details from '../../Details';

describe('Details', () => {
    it('renders the title and description', () => {
        render(<Details />);

        expect(screen.getByText('What is HelpHub?')).toBeTruthy();
    });

    it('renders all sections with correct titles and descriptions', () => {
        render(<Details />);

        expect(screen.getByText('Online Counseling and Support Services at HelpHub')).toBeTruthy();
        expect(screen.getByText('HelpHub provides a wide range of online counseling services for individuals seeking professional support. With services such as online therapy, family counseling, and emotional guidance, you can find solutions tailored to your mental and emotional needs. No matter how busy your schedule is, you can connect with expert consultants from the comfort of your home.')).toBeTruthy();

        expect(screen.getByText('Simplify Your Life with Online Support')).toBeTruthy();
        expect(screen.getByText('HelpHub is designed to make your life easier by connecting you with professionals in various fields. Whether you need psychological support, lifestyle guidance, or personal development, you can easily find the right expert and receive personalized assistance.')).toBeTruthy();

        expect(screen.getByText('Benefits of Online Counseling')).toBeTruthy();
        expect(screen.getByText('One of the biggest advantages of online counseling is the ability to receive support anytime and anywhere. You don’t need to travel—simply connect from your home or any location. This is especially helpful for busy individuals or those with limited access to local services. Online sessions also ensure privacy and comfort, allowing you to feel more secure and focused.')).toBeTruthy();
    });

    it('renders the "Professional Support You Can Trust" section', () => {
        render(<Details />);

        expect(screen.getByText('Professional Support You Can Trust')).toBeTruthy();
        expect(screen.getByText('HelpHub connects you with experienced professionals who provide guidance for a variety of needs. From mental health support to personal growth, our experts help you navigate challenges and improve your well-being with confidence.')).toBeTruthy();
    });

    it('renders the "Personalized Solutions for Everyone" section', () => {
        render(<Details />);

        expect(screen.getByText('Personalized Solutions for Everyone')).toBeTruthy();
        expect(screen.getByText('Our services are designed to offer personalized solutions that fit your unique needs. Whether for yourself or your loved ones, HelpHub makes it easy to access reliable, professional support and take steps toward a healthier, happier life.')).toBeTruthy();
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