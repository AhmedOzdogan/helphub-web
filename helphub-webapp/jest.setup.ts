import '@testing-library/jest-native/extend-expect';
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => AsyncStorageMock);

export const mockChangeLanguage = jest.fn();

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            language: 'en',
            changeLanguage: mockChangeLanguage,
        },
    }),

    initReactI18next: {
        type: '3rdParty',
        init: jest.fn(),
    },
}));

jest.mock('@expo/vector-icons/Ionicons', () => 'Icon');