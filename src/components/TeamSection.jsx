import { Scissors, Award } from 'lucide-react';
import { barbers } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function TeamSection() {
    const { language } = useLanguage();
    const t = translations[language];
    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm tracking-wider uppercase mb-3 bg-secondary/10 px-4 py-2 rounded-full">
                        <Scissors className="h-4 w-4" /> {t.team.label}
                    </span>
                    <h2 className="section-title">{t.team.title}</h2>
                    <p className="section-subtitle">{t.team.subtitle}</p>
                </div>

                <div className={`grid grid-cols-1 gap-8 ${barbers.length === 1 ? 'max-w-md mx-auto' : 'md:grid-cols-3'}`} style={{ display: 'grid', gap: '2rem' }}>
                    {barbers.map((barber, index) => (
                        <div
                            key={barber.id}
                            className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Card glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-700/50 hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 overflow-visible">
                                {/* Experience badge */}
                                <div className="absolute -top-3 right-3 bg-gradient-to-r from-secondary to-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-10">
                                    <Award className="h-3 w-3" />
                                    {barber.experience} {language === 'sq' ? 'vite' : 'yrs'}
                                </div>

                                {/* Profile image with ring */}
                                <div className="relative w-36 h-36 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-full animate-pulse opacity-50"></div>
                                    <img
                                        src={barber.image}
                                        alt={barber.name}
                                        className="relative w-full h-full rounded-full object-cover border-4 border-gray-800 group-hover:border-secondary transition-colors duration-300 group-hover:scale-105 transform"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-secondary transition-colors">{barber.name}</h3>
                                <p className="text-secondary font-medium mb-4">{barber.role[language] || barber.role}</p>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {(barber.specialties[language] || barber.specialties).map((specialty, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-700/50 text-gray-300 px-4 py-1.5 rounded-full text-xs font-medium border border-gray-600/50 hover:border-secondary/50 hover:text-secondary transition-all"
                                        >
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
