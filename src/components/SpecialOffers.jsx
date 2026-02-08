import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Gift, Percent } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function SpecialOffers() {
    const { language } = useLanguage();
    const t = translations[language];
    const { ref, isVisible } = useScrollReveal(0.1);

    const offers = [
        {
            id: 1,
            title: t.offers.items.firstVisit.title,
            description: t.offers.items.firstVisit.description,
            code: "WELCOME20",
            discount: "20%",
            icon: Gift,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            id: 2,
            title: t.offers.items.vipPackage.title,
            description: t.offers.items.vipPackage.description,
            code: "VIPSAVE",
            discount: "€10",
            icon: Sparkles,
            gradient: "from-secondary to-accent"
        },
        {
            id: 3,
            title: t.offers.items.referFriend.title,
            description: t.offers.items.referFriend.description,
            code: "FRIEND15",
            discount: "15%",
            icon: Percent,
            gradient: "from-blue-500 to-cyan-500"
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-primary to-primary-dark relative overflow-hidden noise-overlay">
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-5 py-2.5 rounded-full text-sm font-medium mb-4 shimmer">
                        <Sparkles className="h-4 w-4" />
                        {t.offers.label}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.offers.title}</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">{t.offers.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ display: 'grid', gap: '2rem' }}>
                    {offers.map((offer, index) => (
                        <div
                            key={offer.id}
                            className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Animated glow */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${offer.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-105`} />

                            <div className="relative bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-visible">
                                {/* Discount badge */}
                                <div className="absolute -top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                                    {language === 'sq' ? 'Kurse' : 'Save'} {offer.discount}
                                </div>

                                <div className={`w-16 h-16 bg-gradient-to-br ${offer.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    <offer.icon className="h-8 w-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-secondary transition-colors">{offer.title}</h3>
                                <p className="text-gray-300 mb-6 flex-grow">{offer.description}</p>

                                <div className="bg-gray-900/60 rounded-xl px-5 py-3 mb-6 flex items-center justify-between">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{t.offers.useCode}</span>
                                    <span className="text-secondary font-mono font-bold text-lg tracking-wider">{offer.code}</span>
                                </div>

                                <Link
                                    to="/booking"
                                    className="flex items-center justify-center text-primary bg-gradient-to-r from-secondary to-accent font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-secondary/30 group/link"
                                >
                                    {t.offers.bookNow}
                                    <ArrowRight className="h-5 w-5 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`text-center mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link
                        to="/booking"
                        className="btn-primary btn-glow inline-flex items-center gap-2 text-lg group"
                    >
                        {t.offers.bookAppointment}
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
