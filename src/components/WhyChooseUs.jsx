import { Shield, Clock, Award, Sparkles, Users, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function WhyChooseUs() {
    const { t } = useTranslation();
    const { ref, isVisible } = useScrollReveal(0.1);

    const features = [
        { icon: Award, key: 'certifiedBarbers', gradient: 'from-secondary to-accent' },
        { icon: Clock, key: 'easyBooking', gradient: 'from-blue-500 to-cyan-500' },
        { icon: Shield, key: 'premiumHygiene', gradient: 'from-green-500 to-emerald-500' },
        { icon: Sparkles, key: 'qualityProducts', gradient: 'from-purple-500 to-pink-500' },
        { icon: Users, key: 'pleasantAtmosphere', gradient: 'from-orange-500 to-red-500' },
        { icon: Heart, key: 'personalCare', gradient: 'from-pink-500 to-rose-500' },
    ];

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm tracking-wider uppercase mb-3 bg-secondary/10 px-4 py-2 rounded-full">
                        <Award className="h-4 w-4" />
                        {t('whyChooseUs.label')}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                        {t('whyChooseUs.title')}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t('whyChooseUs.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ display: 'grid', gap: '2rem' }}>
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-secondary/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full">
                                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                            <Icon className="h-7 w-7 text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                                            {t(`whyChooseUs.features.${feature.key}.title`)}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed">
                                            {t(`whyChooseUs.features.${feature.key}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
