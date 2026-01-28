import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { services } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function ServicesPreview() {
    const { language } = useLanguage();
    const t = translations[language];
    const featuredServices = services.flatMap(cat => cat.items).slice(0, 6);

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">{t.services.label}</span>
                    <h2 className="section-title">{t.services.title}</h2>
                    <p className="section-subtitle">{t.services.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {featuredServices.map((service, index) => (
                        <div
                            key={service.id}
                            className="card group flex flex-col"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                                    {service.name[language] || service.name}
                                </h3>
                                <span className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{service.price}€</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                                {service.description[language] || service.description}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <div className="flex items-center text-gray-500 text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-secondary" />
                                    {service.duration} {t.services.duration}
                                </div>
                                <Link
                                    to="/booking"
                                    className="text-secondary hover:text-accent font-semibold text-sm flex items-center group/link"
                                >
                                    {t.services.bookNow}
                                    <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link
                        to="/services"
                        className="btn-secondary inline-flex items-center"
                    >
                        {t.services.viewAll}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
