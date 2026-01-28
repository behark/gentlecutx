import { Link } from 'react-router-dom';
import { ChevronRight, Star, MapPin, Clock } from 'lucide-react';
import { salonInfo } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Hero() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop)',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="max-w-3xl fade-in">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-secondary fill-current" />
                            ))}
                        </div>
                        <span className="text-white/90 text-sm font-medium">
                            {salonInfo.rating} • {salonInfo.reviewCount}+ {language === 'sq' ? 'klientë' : 'clients'}
                        </span>
                    </div>

                    <p className="text-secondary font-semibold tracking-widest text-sm mb-4">{t.hero.subtitle}</p>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        {t.hero.title1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                            {t.hero.title2}
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                        {t.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Link
                            to="/booking"
                            className="btn-primary inline-flex items-center justify-center text-lg"
                        >
                            {t.hero.bookNow}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/services"
                            className="btn-outline inline-flex items-center justify-center text-lg"
                        >
                            {t.hero.viewServices}
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="h-4 w-4 text-secondary" />
                            <span>{t.hero.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="h-4 w-4 text-secondary" />
                            <span>{language === 'sq' ? 'Hapur Sot' : 'Open Today'}: 09:00 - 20:00</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>
    );
}
