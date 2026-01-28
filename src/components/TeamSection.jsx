import { Star } from 'lucide-react';
import { barbers } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function TeamSection() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">{t.team.label}</span>
                    <h2 className="section-title">{t.team.title}</h2>
                    <p className="section-subtitle">{t.team.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {barbers.map((barber) => (
                        <div
                            key={barber.id}
                            className="bg-gray-800/50 rounded-2xl p-6 text-center hover:bg-gray-800 transition-all duration-300"
                        >
                            <img
                                src={barber.image}
                                alt={barber.name}
                                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-secondary"
                            />
                            <h3 className="text-xl font-semibold text-white mb-1">{barber.name}</h3>
                            <p className="text-secondary mb-2">{barber.role[language] || barber.role}</p>
                            <p className="text-gray-400 text-sm mb-4">{barber.experience} {t.team.experience}</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {(barber.specialties[language] || barber.specialties).map((specialty, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
                                    >
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
