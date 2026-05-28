import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Platform } from 'react-native';
import Navbar from '../../Navbar';
import { mockChangeLanguage } from '../../../jest.setup';

const mockPush = jest.fn();
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

jest.mock('expo-router', () => ({
    Link: ({ children }: { children: React.ReactNode }) => children,
    useRouter: () => ({
        push: mockPush,
    }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: (...args: unknown[]) => mockGetItem(...args),
    setItem: (...args: unknown[]) => mockSetItem(...args),
}));

jest.mock('@expo/vector-icons/Ionicons', () => {
    return function MockIonicons({ name }: { name: string }) {
        return name;
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
        mockGetItem.mockReset();
        mockSetItem.mockReset();
        mockChangeLanguage.mockReset();
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
        expect(screen.getByPlaceholderText('SearchBar.mobilePlaceholder')).toBeTruthy();
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
        expect(screen.queryByPlaceholderText('SearchBar.mobilePlaceholder')).toBeNull();
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
        expect(screen.getByTestId('mobileLoginButton')).toBeTruthy();
        expect(screen.getByTestId('mobileSignUpButton')).toBeTruthy();

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
        fireEvent.press(screen.getByTestId('mobileSignUpButton'));

        expect(mockPush).toHaveBeenCalledWith('/signup');
        expect(screen.queryByTestId('mobile-account-menu')).toBeNull();
    });

    it('expands a mobile category section', () => {
        renderNavbar();

        openMobileMenu();
        fireEvent.press(screen.getByTestId('mobile-section-forMyself'));

        expect(screen.getByLabelText('Toggle FOR MYSELF').props.accessibilityState.expanded).toBe(true);
    });

    it('collapses an expanded mobile category section when pressed again', () => {
        renderNavbar();

        openMobileMenu();
        fireEvent.press(screen.getByTestId('mobile-section-forMyself'));
        expect(screen.getByLabelText('Toggle FOR MYSELF').props.accessibilityState.expanded).toBe(true);

        fireEvent.press(screen.getByTestId('mobile-section-forMyself'));
        expect(screen.getByLabelText('Toggle FOR MYSELF').props.accessibilityState.expanded).toBe(false);
    });

    it('only keeps one mobile category section expanded at a time', () => {
        renderNavbar();

        openMobileMenu();
        fireEvent.press(screen.getByTestId('mobile-section-forMyself'));
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
        expect(screen.getByText('MobileMenuSections.forMyself')).toBeTruthy();
        expect(screen.getByText('MobileMenuSections.forMomsAndKids')).toBeTruthy();
        expect(screen.getByText('MobileMenuSections.forWork')).toBeTruthy();
        expect(screen.getByText('MobileMenuSections.groupTherapies')).toBeTruthy();
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
        expect(screen.getByTestId('mega-menu-forMomsAndKids')).toBeTruthy();

        fireEvent(screen.getByTestId('for-moms-and-kids-dropdown'), 'mouseLeave');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(screen.queryByTestId('mega-menu-forMomsAndKids')).toBeNull();
    });

    it('opens the FOR WORK mega menu on mouse enter and closes after mouse leave delay', () => {
        jest.useFakeTimers();

        renderDesktopNavbar();

        fireEvent(screen.getByTestId('for-work-dropdown'), 'mouseEnter');
        expect(screen.getByTestId('mega-menu-forWork')).toBeTruthy();

        fireEvent(screen.getByTestId('for-work-dropdown'), 'mouseLeave');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(screen.queryByTestId('mega-menu-forWork')).toBeNull();
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

    it('renders the language switch button', () => {
        renderNavbar();

        expect(screen.getAllByTestId('desktop-language-button').length).toBeGreaterThan(0);
    });

    it('opens the language menu when language button is pressed', () => {
        renderNavbar();
        // press one of the button 
        fireEvent.press(

            screen.getAllByLabelText('Open language menu')[0]

        );

        expect(screen.getAllByTestId('desktop-language-menu').length).toBeGreaterThan(0);
    });

    it('loads stored language from AsyncStorage on mount', async () => {
        mockGetItem.mockResolvedValue('de');

        renderNavbar();

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockGetItem).toHaveBeenCalledWith('language');
        expect(mockChangeLanguage).toHaveBeenCalledWith('de');
    });

    it('does not change language when stored language is invalid', async () => {
        mockGetItem.mockResolvedValue('invalid-language');

        renderNavbar();

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockChangeLanguage).not.toHaveBeenCalled();
    });

    it('changes language and closes menu when a language is selected', async () => {
        renderNavbar();

        fireEvent.press(

            screen.getAllByLabelText('Open language menu')[0]

        );

        const germanButton = screen.getByTestId('de');

        await act(async () => {
            fireEvent.press(germanButton);
        });

        expect(mockSetItem).toHaveBeenCalledWith('language', 'de');
        expect(mockChangeLanguage).toHaveBeenCalledWith('de');
    });

    it('opens desktop account menu on mouse enter', async () => {
        renderDesktopNavbar();

        fireEvent.press(screen.getByLabelText('Open account menu'));

        await expect(screen.getByTestId('loginButton')).toBeTruthy();
        await expect(screen.getByTestId('signUpButton')).toBeTruthy();
    });

    it('closes desktop account menu when account button is pressed again', async () => {
        renderDesktopNavbar();

        fireEvent.press(screen.getByLabelText('Open account menu'));

        await expect(screen.getByTestId('loginButton')).toBeTruthy();

        fireEvent.press(screen.getByLabelText('Open account menu'));

        await expect(screen.queryByTestId('loginButton')).toBeNull();
    });

    it('keeps mega menu open when mouse enters again before timeout', () => {
        jest.useFakeTimers();

        renderDesktopNavbar();

        const dropdown = screen.getByTestId('for-myself-dropdown');

        fireEvent(dropdown, 'mouseEnter');

        fireEvent(dropdown, 'mouseLeave');

        fireEvent(dropdown, 'mouseEnter');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(screen.getByTestId('mega-menu-forMyself')).toBeTruthy();
    });

    it('opens mobile menu on web without crashing', () => {
        setPlatformOS('web');

        renderNavbar();

        openMobileMenu();

        expect(screen.getByTestId('MobileMenu')).toBeTruthy();
    });

    it('navigates from desktop login button', () => {

        renderDesktopNavbar();

        fireEvent.press(screen.getByLabelText('Open account menu'));

        const loginButtons = screen.getAllByText('Login');

        fireEvent.press(loginButtons[0]);

        expect(mockPush).toHaveBeenCalledWith('/login');

    });

    it('navigates from desktop signup button', () => {
        renderDesktopNavbar();

        fireEvent.press(screen.getByLabelText('Open account menu'));

        const signupButtons = screen.getAllByText('Sign Up');

        fireEvent.press(signupButtons[0]);

        expect(mockPush).toHaveBeenCalledWith('/signup');
    });

    it('prevents touch move on backdrop', () => {
        renderNavbar();

        openMobileMenu();

        const preventDefault = jest.fn();

        fireEvent(screen.getByTestId('mobile-menu-backdrop'), 'touchMove', {
            preventDefault,
        });

        expect(preventDefault).toHaveBeenCalled();
    });

    it('stops propagation on mobile menu content touch move', () => {
        renderNavbar();

        openMobileMenu();

        const stopPropagation = jest.fn();

        fireEvent(screen.getByTestId('mobile-menu-content'), 'touchMove', {
            stopPropagation,
        });

        expect(stopPropagation).toHaveBeenCalled();
    });

    it('closes mobile menu when mega menu title is pressed', () => {
        renderNavbar();

        openMobileMenu();

        fireEvent.press(screen.getByTestId('mobile-section-forMyself'));

        fireEvent.press(screen.getByText('MegaMenuTitles.Mental Wellbeing'));

        expect(screen.queryByTestId('MobileMenu')).toBeNull();
    });

    it('closes mobile menu when mega menu item is pressed', () => {
        renderNavbar();

        openMobileMenu();

        const buttons = screen.getAllByTestId('mobile-section-forMyself')

        fireEvent.press(buttons[buttons.length - 1]);

        fireEvent.press(screen.getByText('MegaMenuItems.Psychology'));

        expect(screen.queryByTestId('MobileMenu')).toBeNull();
    });

    it('closes mobile menu when Guide link is pressed', () => {
        renderNavbar();

        openMobileMenu();

        const buttons = screen.getAllByText('Guide');

        fireEvent.press(buttons[buttons.length - 1]);

        expect(screen.queryByTestId('MobileMenu')).toBeNull();
    });

    it('closes mobile menu when How does it work link is pressed', () => {
        renderNavbar();

        openMobileMenu();

        const buttons = screen.getAllByText('How does it work?');

        fireEvent.press(buttons[buttons.length - 1]);

        expect(screen.queryByTestId('MobileMenu')).toBeNull();
    });


    it('locks and restores body scroll on web when mobile menu opens', () => {
        setPlatformOS('web');

        // mock document manually
        const mockPage = {
            style: {
                overflow: '',
                height: '',
                touchAction: '',
            },
        };

        const mockBody = {
            style: {
                overflow: '',
            },
        };

        const mockHtml = {
            style: {
                overflow: '',
            },
        };

        Object.defineProperty(global, 'document', {
            value: {
                getElementById: jest.fn(() => mockPage),
                body: mockBody,
                documentElement: mockHtml,
            },
            writable: true,
        });

        const { unmount } = render(
            <Navbar onMobileMenuChange={jest.fn()} />
        );

        fireEvent.press(screen.getByLabelText('Open mobile menu'));

        expect(mockPage.style.overflow).toBe('hidden');
        expect(mockPage.style.height).toBe('100vh');
        expect(mockPage.style.touchAction).toBe('none');

        expect(mockBody.style.overflow).toBe('hidden');
        expect(mockHtml.style.overflow).toBe('hidden');

        unmount();

        expect(mockPage.style.overflow).toBe('');
        expect(mockPage.style.height).toBe('');
        expect(mockPage.style.touchAction).toBe('');
    });

    it('keeps mega menu open when hovering menu panel', () => {
        jest.useFakeTimers();

        renderDesktopNavbar();

        fireEvent(screen.getByTestId('for-myself-dropdown'), 'mouseEnter');

        const megaMenu = screen.getByTestId('mega-menu-forMyself');

        fireEvent(screen.getByTestId('for-myself-dropdown'), 'mouseLeave');

        fireEvent(megaMenu, 'mouseEnter');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        expect(screen.getByTestId('mega-menu-forMyself')).toBeTruthy();
    });
});