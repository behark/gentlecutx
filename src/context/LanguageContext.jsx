import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('gentlecutx-lang');
        return saved || 'sq';
    });

    useEffect(() => {
        localStorage.setItem('gentlecutx-lang', language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'sq' ? 'en' : 'sq');
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
