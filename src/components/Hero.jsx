import { Link } from 'react-router-dom';
import { ChevronRight, Star, MapPin, Clock, Scissors, Sparkles } from 'lucide-react';
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
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 animate-gradient"></div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 float">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-xl"></div>
                </div>
                <div className="absolute bottom-1/3 left-1/5 float-delayed">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-secondary/15 to-transparent blur-2xl"></div>
                </div>
                <div className="absolute top-1/3 left-1/4 float">
                    <Scissors className="h-8 w-8 text-secondary/20 rotate-45" />
                </div>
                <div className="absolute bottom-1/4 right-1/3 float-delayed">
                    <Sparkles className="h-6 w-6 text-accent/20" />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="max-w-3xl fade-in">
                    <div className="inline-flex items-center gap-3 glass-premium px-5 py-2.5 rounded-full mb-8 shimmer">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-secondary fill-current drop-shadow-sm" />
                            ))}
                        </div>
                        <span className="text-white/90 text-sm font-medium">
                            {salonInfo.rating} • {salonInfo.reviewCount}+ {language === 'sq' ? 'klientë' : 'clients'}
                        </span>
                    </div>

                    <p className="text-secondary font-semibold tracking-widest text-sm mb-4 uppercase">{t.hero.subtitle}</p>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        {t.hero.title1} <br />
                        <span className="text-gradient-animate">
                            {t.hero.title2}
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                        {t.hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Link
                            to="/booking"
                            className="btn-primary btn-glow inline-flex items-center justify-center text-lg group"
                        >
                            {t.hero.bookNow}
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            to="/services"
                            className="btn-outline inline-flex items-center justify-center text-lg hover:scale-105 transition-transform"
                        >
                            {t.hero.viewServices}
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2 text-gray-300 glass-premium px-4 py-2 rounded-full">
                            <MapPin className="h-4 w-4 text-secondary" />
                            <span>{t.hero.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 glass-premium px-4 py-2 rounded-full">
                            <Clock className="h-4 w-4 text-secondary" />
                            <span>{language === 'sq' ? 'Hapur Sot' : 'Open Today'}: 09:00 - 20:00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated scroll indicator */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-white/50 text-xs uppercase tracking-widest">{language === 'sq' ? 'Zbulo më shumë' : 'Scroll to explore'}</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"></div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>
    );
}
