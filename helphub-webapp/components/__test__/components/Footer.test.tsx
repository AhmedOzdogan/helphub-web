import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Platform } from 'react-native';
import Footer from '../../Footer';

jest.mock('expo-router', () => {
    const React = require('react');
    return {
        Link: ({ children, href }: { children: React.ReactElement; href: string }) =>
            React.cloneElement(React.Children.only(children), {
                href,
                testID: `footer-link-${href}`,
            } as any),
    };
});

jest.mock('@expo/vector-icons/Ionicons', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return function MockIonicons({ name }: { name: string }) {
        return <Text>{name}</Text>;
    };
});

jest.mock('../../ui/GooglePlayDownload', () => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return function MockGooglePlayDownload() {
        return (
            <View testID="google-play-download">
                <Text>Google Play Download</Text>
            </View>
        );
    };
});

jest.mock('../../ui/AppStoreDownload', () => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return function MockAppStoreDownload() {
        return (
            <View testID="app-store-download">
                <Text>App Store Download</Text>
            </View>
        );
    };
});

describe('Footer', () => {
    const originalPlatformOS = Platform.OS;

    afterEach(() => {
        Object.defineProperty(Platform, 'OS', {
            configurable: true,
            get: () => originalPlatformOS,
        });
    });
    it('renders the footer section container', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-section')).toBeTruthy();
    });

    it('renders the main footer content container', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-main-content')).toBeTruthy();
    });

    it('renders the HelpHub brand text', () => {
        render(<Footer />);

        expect(screen.getByText('footer.brand')).toBeTruthy();
    });

    it('renders company navigation links', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-company-links')).toBeTruthy();
        expect(screen.getByText('footer.companyLinks.howItWorks')).toBeTruthy();
        expect(screen.getByText('footer.companyLinks.aboutUs')).toBeTruthy();
        expect(screen.getByText('footer.companyLinks.contact')).toBeTruthy();
        expect(screen.getByText('footer.companyLinks.blog')).toBeTruthy();
    });

    it('renders legal navigation links', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-legal-links')).toBeTruthy();
        expect(screen.getByText('footer.legalLinks.terms')).toBeTruthy();
        expect(screen.getByText('footer.legalLinks.privacy')).toBeTruthy();
        expect(screen.getByText('footer.legalLinks.distanceSales')).toBeTruthy();
        expect(screen.getByText('footer.legalLinks.refund')).toBeTruthy();
        expect(screen.getByText('footer.legalLinks.cookies')).toBeTruthy();
    });

    it('renders the follow us section', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-social-downloads')).toBeTruthy();
        expect(screen.getByText('footer.social.title')).toBeTruthy();
    });

    it('renders social icons', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-social-icons')).toBeTruthy();
        expect(screen.getByText('logo-facebook')).toBeTruthy();
        expect(screen.getByText('logo-instagram')).toBeTruthy();
        expect(screen.getByText('logo-linkedin')).toBeTruthy();
    });

    it('renders app download buttons', () => {
        render(<Footer />);

        expect(screen.getByTestId('google-play-download')).toBeTruthy();
        expect(screen.getByText('Google Play Download')).toBeTruthy();
        expect(screen.getByTestId('app-store-download')).toBeTruthy();
        expect(screen.getByText('App Store Download')).toBeTruthy();
    });

    it('renders disclaimer content', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-disclaimer-content')).toBeTruthy();
        expect(screen.getByText('footer.disclaimer.text')).toBeTruthy();
    });

    it('renders emergency hotline information', () => {
        render(<Footer />);

        expect(screen.getByText('footer.disclaimer.emergency')).toBeTruthy();
    });

    it('links How it works to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.companyLinks.howItWorks').props.href).toBe('/how-it-works');
    });

    it('links About Us to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.companyLinks.aboutUs').props.href).toBe('/about');
    });

    it('links Contact to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.companyLinks.contact').props.href).toBe('/contact');
    });

    it('links Blog to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.companyLinks.blog').props.href).toBe('/blog');
    });

    it('links Terms of Use to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.legalLinks.terms').props.href).toBe('/terms');
    });

    it('links Privacy Policy & GDPR to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.legalLinks.privacy').props.href).toBe('/privacy');
    });

    it('links Distance Sales Agreement to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.legalLinks.distanceSales').props.href).toBe('/distance-sales');
    });

    it('links Refund Policy to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.legalLinks.refund').props.href).toBe('/refund');
    });

    it('links Cookie Policy to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('footer.legalLinks.cookies').props.href).toBe('/cookies');
    });

    it('links each social icon to the configured route', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-social-icons').children[0].props.href).toBe('https://www.facebook.com');
        expect(screen.getByTestId('footer-social-icons').children[1].props.href).toBe('https://www.instagram.com');
        expect(screen.getByTestId('footer-social-icons').children[2].props.href).toBe('https://www.linkedin.com');
    });

    it('uses iOS-specific spacing classes on iOS', () => {
        Object.defineProperty(Platform, 'OS', {
            configurable: true,
            get: () => 'ios',
        });

        render(<Footer />);

        expect(screen.getByTestId('footer-section').props.className).toContain('pt-8 pb-8');
        expect(screen.getByTestId('footer-disclaimer-content').props.className).toContain('mt-4');
    });

    it('uses default spacing classes outside iOS', () => {
        Object.defineProperty(Platform, 'OS', {
            configurable: true,
            get: () => 'web',
        });

        render(<Footer />);

        expect(screen.getByTestId('footer-section').props.className).toContain('py-8 md:py-12');
        expect(screen.getByTestId('footer-disclaimer-content').props.className).toContain('mt-8 md:mt-12');
    });
});
