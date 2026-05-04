import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Platform } from 'react-native';
import Navbar from '../../Navbar';

const mockPush = jest.fn();

jest.mock('expo-router', () => ({
    Link: ({ children }: { children: React.ReactNode }) => children,
    useRouter: () => ({
        push: mockPush,
    }),
}));

jest.mock('@expo/vector-icons/Ionicons', () => {
    const { Text } = require('react-native');

    return function MockIonicons({ name }: { name: string }) {
        return <Text>{name}</Text>;
    };
});

const renderNavbar = (onMobileMenuChange = jest.fn()) => {
    render(<Navbar onMobileMenuChange={onMobileMenuChange} />);
    return { onMobileMenuChange };
};

const setPlatformOS = (os: typeof Platform.OS) => {
    Object.defineProperty(Platform, 'OS', {
        configurable: true,
        get: () => os,
    });
};

const renderDesktopNavbar = () => {
    setPlatformOS('web');
    renderNavbar();
};

const openMobileMenu = () => {
    fireEvent.press(screen.getByLabelText('Open mobile menu'));
};

const openMobileAccountMenu = () => {
    fireEvent.press(screen.getByLabelText('Toggle account menu'));
};

describe('Navbar', () => {
    const originalPlatformOS = Platform.OS;
    beforeEach(() => {
        mockPush.mockClear();
    });

    afterEach(() => {
        jest.useRealTimers();
        setPlatformOS(originalPlatformOS);
    });

    it('renders the HelpHub logo', () => {
        renderNavbar();

        expect(screen.getAllByText('HelpHub').length).toBeGreaterThan(0);
    });

    it('renders the mobile search input when the mobile menu is closed', () => {
        renderNavbar();

        expect(screen.getByTestId('mobile-search-input')).toBeTruthy();
        expect(screen.getByPlaceholderText('Danışmanlık Uzmanlık... Ara')).toBeTruthy();
    });

    it('opens the mobile menu when the hamburger button is pressed', () => {
        renderNavbar();

        openMobileMenu();

        expect(screen.getByText('Main Menu')).toBeTruthy();
        expect(screen.getByText('Categories')).toBeTruthy();
        expect(screen.getByText('Discover')).toBeTruthy();
        expect(screen.getByTestId('mobile-menu-content')).toBeTruthy();
    });

    it('notifies parent when mobile menu opens and closes', () => {
        const onMobileMenuChange = jest.fn();
        renderNavbar(onMobileMenuChange);

        openMobileMenu();
        expect(onMobileMenuChange).toHaveBeenLastCalledWith(true);

        fireEvent.press(screen.getByLabelText('Close mobile menu'));
        expect(onMobileMenuChange).toHaveBeenLastCalledWith(false);
    });

    it('hides the mobile search input when the mobile menu is open', () => {
        renderNavbar();

        openMobileMenu();

        expect(screen.queryByTestId('mobile-search-input')).toBeNull();
        expect(screen.queryByPlaceholderText('Danışmanlık Uzmanlık... Ara')).toBeNull();
    });

    it('closes the mobile menu when the close button is pressed', () => {
        renderNavbar();

        openMobileMenu();
        expect(screen.getByText('Main Menu')).toBeTruthy();

        fireEvent.press(screen.getByLabelText('Close mobile menu'));
        expect(screen.queryByText('Main Menu')).toBeNull();
    });

    it('closes the mobile menu when the backdrop is pressed', () => {
        renderNavbar();

        openMobileMenu();
        expect(screen.getByText('Main Menu')).toBeTruthy();

        fireEvent.press(screen.getByTestId('mobile-menu-backdrop'));
        expect(screen.queryByText('Main Menu')).toBeNull();
    });

    it('opens and closes the mobile account menu', () => {
        renderNavbar();

        openMobileAccountMenu();
        expect(screen.getByTestId('mobile-account-menu')).toBeTruthy();
        expect(screen.getByText('Log In')).toBeTruthy();
        expect(screen.getByText('Sign Up')).toBeTruthy();

        openMobileAccountMenu();
        expect(screen.queryByTestId('mobile-account-menu')).toBeNull();
    });

    it('navigates to login page when the login button is pressed', () => {
        renderNavbar();

        openMobileAccountMenu();
        fireEvent.press(screen.getByText('Log In'));

        expect(mockPush).toHaveBeenCalledWith('/login');
        expect(screen.queryByTestId('mobile-account-menu')).toBeNull();
    });

    it('navigates to signup page when the signup button is pressed', () => {
        renderNavbar();

        openMobileAccountMenu();
        fireEvent.press(screen.getByText('Sign Up'));

        expect(mockPush).toHaveBeenCalledWith('/signup');
        expect(screen.queryByTestId('mobile-account-menu')).toBeNull();
    });

    it('expands a mobile category section', () => {
        renderNavbar();

        openMobileMenu();
        fireEvent.press(screen.getByLabelText('Toggle FOR MYSELF'));

        expect(screen.getByLabelText('Toggle FOR MYSELF').props.accessibilityState.expanded).toBe(true);
    });

    it('collapses an expanded mobile category section when pressed again', () => {
        renderNavbar();

        openMobileMenu();
        fireEvent.press(screen.getByLabelText('Toggle FOR MYSELF'));
        expect(screen.getByLabelText('Toggle FOR MYSELF').props.accessibilityState.expanded).toBe(true);

        fireEvent.press(screen.getByLabelText('Toggle FOR MYSELF'));
        expect(screen.getByLabelText('Toggle FOR MYSELF').props.accessibilityState.expanded).toBe(false);
    });

    it('only keeps one mobile category section expanded at a time', () => {
        renderNavbar();

        openMobileMenu();
        fireEvent.press(screen.getByLabelText('Toggle FOR MYSELF'));
        expect(screen.getByLabelText('Toggle FOR MYSELF').props.accessibilityState.expanded).toBe(true);

        fireEvent.press(screen.getByLabelText('Toggle FOR WORK'));
        expect(screen.getByLabelText('Toggle FOR MYSELF').props.accessibilityState.expanded).toBe(false);
        expect(screen.getByLabelText('Toggle FOR WORK').props.accessibilityState.expanded).toBe(true);
    });

    it('closes the mobile menu when the Home link is pressed', () => {
        renderNavbar();

        openMobileMenu();
        fireEvent.press(screen.getByText('Home'));

        expect(screen.queryByText('Main Menu')).toBeNull();
    });

    it('closes the mobile menu when a Discover link is pressed', () => {
        renderNavbar();

        openMobileMenu();
        fireEvent.press(screen.getByTestId('mobile-discover-blog-link'));

        expect(screen.queryByText('Main Menu')).toBeNull();
    });

    it('renders the desktop dropdown menu', () => {
        renderDesktopNavbar();

        expect(screen.getByTestId('Dropdown-web-menu')).toBeTruthy();
        expect(screen.getByText('FOR MYSELF')).toBeTruthy();
        expect(screen.getByText('FOR MOMS AND KIDS')).toBeTruthy();
        expect(screen.getByText('FOR WORK')).toBeTruthy();
        expect(screen.getByText('GROUP THERAPIES')).toBeTruthy();
    });

    it('opens the FOR MYSELF mega menu on mouse enter and closes after mouse leave delay', () => {
        jest.useFakeTimers();

        renderDesktopNavbar();

        fireEvent(screen.getByTestId('for-myself-dropdown'), 'mouseEnter');
        expect(screen.getByTestId('mega-menu-forMyself')).toBeTruthy();

        fireEvent(screen.getByTestId('for-myself-dropdown'), 'mouseLeave');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(screen.queryByTestId('mega-menu-forMyself')).toBeNull();
    });

    it('opens the FOR MOMS AND KIDS mega menu on mouse enter and closes after mouse leave delay', () => {
        jest.useFakeTimers();

        renderDesktopNavbar();

        fireEvent(screen.getByTestId('for-moms-and-kids-dropdown'), 'mouseEnter');
        expect(screen.getByTestId('mega-menu-momsAndKids')).toBeTruthy();

        fireEvent(screen.getByTestId('for-moms-and-kids-dropdown'), 'mouseLeave');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(screen.queryByTestId('mega-menu-momsAndKids')).toBeNull();
    });

    it('opens the FOR WORK mega menu on mouse enter and closes after mouse leave delay', () => {
        jest.useFakeTimers();

        renderDesktopNavbar();

        fireEvent(screen.getByTestId('for-work-dropdown'), 'mouseEnter');
        expect(screen.getByTestId('mega-menu-workRelatedIssues')).toBeTruthy();

        fireEvent(screen.getByTestId('for-work-dropdown'), 'mouseLeave');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(screen.queryByTestId('mega-menu-workRelatedIssues')).toBeNull();
    });

    it('opens the GROUP THERAPIES mega menu on mouse enter and closes after mouse leave delay', () => {
        jest.useFakeTimers();

        renderDesktopNavbar();

        fireEvent(screen.getByTestId('group-therapies-dropdown'), 'mouseEnter');
        expect(screen.getByTestId('mega-menu-groupTherapies')).toBeTruthy();

        fireEvent(screen.getByTestId('group-therapies-dropdown'), 'mouseLeave');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(screen.queryByTestId('mega-menu-groupTherapies')).toBeNull();
    });

});