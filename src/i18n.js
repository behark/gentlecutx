import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sq from './locales/sq.json';
import en from './locales/en.json';

const savedLanguage = localStorage.getItem('language') || 'sq';

i18n.use(initReactI18next).init({
    resources: {
        sq: { translation: sq },
        en: { translation: en },
    },
    lng: savedLanguage,
    fallbackLng: 'sq',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
