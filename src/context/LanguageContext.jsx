import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const { i18n } = useTranslation();
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('language') || 'sq';
    });

    const setLanguage = (lng) => {
        setLanguageState(lng);
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
        if (i18n.language !== language) {
            i18n.changeLanguage(language);
        }
    }, [language, i18n]);

    const toggleLanguage = () => {
        const next = language === 'sq' ? 'en' : 'sq';
        setLanguage(next);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
