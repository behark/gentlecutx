import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { services } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ServicesPreview() {
    const { language } = useLanguage();
    const t = translations[language];
    const featuredServices = services.flatMap(cat => cat.items).slice(0, 6);
    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm tracking-wider uppercase mb-3 bg-secondary/10 px-4 py-2 rounded-full">
                        <Sparkles className="h-4 w-4" /> {t.services.label}
                    </span>
                    <h2 className="section-title">{t.services.title}</h2>
                    <p className="section-subtitle">{t.services.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" style={{ display: 'grid', gap: '1.5rem' }}>
                    {featuredServices.map((service, index) => (
                        <div
                            key={service.id}
                            className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-secondary/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-visible">
                                {/* Price badge */}
                                <div className="absolute -top-3 right-3 bg-gradient-to-r from-secondary to-accent text-primary text-lg font-bold px-4 py-1.5 rounded-full shadow-lg z-10">
                                    {service.price}€
                                </div>

                                <div className="mb-4 pr-12">
                                    <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                                        {service.name[language] || service.name}
                                    </h3>
                                </div>

                                <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                                    {service.description[language] || service.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                    <div className="flex items-center text-gray-500 text-sm bg-gray-50 px-3 py-1.5 rounded-full">
                                        <Clock className="h-4 w-4 mr-2 text-secondary" />
                                        {service.duration} {t.services.duration}
                                    </div>
                                    <Link
                                        to="/booking"
                                        className="text-secondary hover:text-accent font-semibold text-sm flex items-center group/link bg-secondary/10 px-4 py-2 rounded-full hover:bg-secondary/20 transition-all"
                                    >
                                        {t.services.bookNow}
                                        <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`text-center mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link
                        to="/services"
                        className="btn-primary btn-glow inline-flex items-center gap-2 group"
                    >
                        {t.services.viewAll}
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
