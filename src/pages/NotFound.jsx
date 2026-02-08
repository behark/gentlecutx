import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Scissors } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function NotFound() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <main className="min-h-screen bg-primary flex items-center justify-center px-4">
            <div className="text-center">
                <div className="relative mb-8">
                    <span className="text-[180px] md:text-[240px] font-bold text-gray-800/30 leading-none select-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Scissors className="h-24 w-24 md:h-32 md:w-32 text-secondary animate-pulse" />
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t.notFound.title}
                </h1>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    {t.notFound.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center justify-center gap-2"
                    >
                        <Home className="h-5 w-5" />
                        {t.notFound.backHome}
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="btn-outline inline-flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        {t.notFound.goBack}
                    </button>
                </div>
            </div>
        </main>
    );
}
