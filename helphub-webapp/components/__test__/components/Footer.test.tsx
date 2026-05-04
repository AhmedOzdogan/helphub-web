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
    const { Text } = require('react-native');

    return function MockIonicons({ name }: { name: string }) {
        return <Text>{name}</Text>;
    };
});

jest.mock('../../ui/GooglePlayDownload', () => {
    const { Text, View } = require('react-native');

    return function MockGooglePlayDownload() {
        return (
            <View testID="google-play-download">
                <Text>Google Play Download</Text>
            </View>
        );
    };
});

jest.mock('../../ui/AppStoreDownload', () => {
    const { Text, View } = require('react-native');

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

        expect(screen.getByText('HelpHub')).toBeTruthy();
    });

    it('renders company navigation links', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-company-links')).toBeTruthy();
        expect(screen.getByText('How it works?')).toBeTruthy();
        expect(screen.getByText('About Us')).toBeTruthy();
        expect(screen.getByText('Contact')).toBeTruthy();
        expect(screen.getByText('Blog')).toBeTruthy();
    });

    it('renders legal navigation links', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-legal-links')).toBeTruthy();
        expect(screen.getByText('Terms of Use')).toBeTruthy();
        expect(screen.getByText('Privacy Policy & GDPR')).toBeTruthy();
        expect(screen.getByText('Distance Sales Agreement')).toBeTruthy();
        expect(screen.getByText('Refund Policy')).toBeTruthy();
        expect(screen.getByText('Cookie Policy')).toBeTruthy();
    });

    it('renders the follow us section', () => {
        render(<Footer />);

        expect(screen.getByTestId('footer-social-downloads')).toBeTruthy();
        expect(screen.getByText('Follow Us')).toBeTruthy();
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
        expect(screen.getByText(/Disclaimer – Online counseling services are not suitable for everyone/i)).toBeTruthy();
    });

    it('renders emergency hotline information', () => {
        render(<Footer />);

        expect(screen.getByText('Emergency Hotline: 112, Police: 155, Domestic Violence Support: 183, Substance Abuse Support: 191')).toBeTruthy();
    });

    it('links How it works to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('How it works?').props.href).toBe('/how-it-works');
    });

    it('links About Us to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('About Us').props.href).toBe('/about');
    });

    it('links Contact to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('Contact').props.href).toBe('/contact');
    });

    it('links Blog to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('Blog').props.href).toBe('/blog');
    });

    it('links Terms of Use to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('Terms of Use').props.href).toBe('/terms');
    });

    it('links Privacy Policy & GDPR to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('Privacy Policy & GDPR').props.href).toBe('/privacy');
    });

    it('links Distance Sales Agreement to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('Distance Sales Agreement').props.href).toBe('/distance-sales');
    });

    it('links Refund Policy to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('Refund Policy').props.href).toBe('/refund');
    });

    it('links Cookie Policy to the correct route', () => {
        render(<Footer />);

        expect(screen.getByText('Cookie Policy').props.href).toBe('/cookies');
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
