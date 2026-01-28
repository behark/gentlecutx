import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300"
            aria-label="Toggle language"
        >
            <Globe className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-white uppercase">
                {language === 'sq' ? 'EN' : 'SQ'}
            </span>
        </button>
    );
}
