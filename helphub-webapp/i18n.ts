
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';

// eslint-disable-next-line import/no-named-as-default-member
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en,
            },
            de: {
                translation: de,
            },
            es: {
                translation: es,
            },
            fr: {
                translation: fr,
            },
            it: {
                translation: it,
            },
        },

        supportedLngs: ['en', 'de', 'es', 'fr', 'it'],
        nonExplicitSupportedLngs: true,
        fallbackLng: 'en',
        lng: (((Localization as any).locale ||
            (Localization as any).locales?.[0]?.languageTag ||
            'en') as string).split('-')[0],

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;