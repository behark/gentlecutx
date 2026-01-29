import { Users, Award, Calendar, ThumbsUp } from 'lucide-react';
import { useCountUp } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function StatsSection() {
    const { language } = useLanguage();

    const stats = [
        { 
            icon: Users, 
            value: 5000, 
            suffix: '+', 
            label: language === 'sq' ? 'Klientë të Kënaqur' : 'Happy Clients',
            gradient: 'from-blue-500 to-cyan-500'
        },
        { 
            icon: Award, 
            value: 8, 
            suffix: '+', 
            label: language === 'sq' ? 'Vite Përvojë' : 'Years Experience',
            gradient: 'from-secondary to-accent'
        },
        { 
            icon: Calendar, 
            value: 15000, 
            suffix: '+', 
            label: language === 'sq' ? 'Prerje të Kryera' : 'Haircuts Done',
            gradient: 'from-purple-500 to-pink-500'
        },
        { 
            icon: ThumbsUp, 
            value: 100, 
            suffix: '%', 
            label: language === 'sq' ? 'Kënaqësi' : 'Satisfaction',
            gradient: 'from-green-500 to-emerald-500'
        }
    ];

    return (
        <section className="py-20 bg-primary relative overflow-hidden noise-overlay">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ display: 'grid', gap: '2rem' }}>
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatCard({ stat, index }) {
    const { count, ref } = useCountUp(stat.value, 2000 + index * 200);
    const Icon = stat.icon;

    return (
        <div
            ref={ref}
            className="text-center group"
        >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <Icon className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="count-up">{count.toLocaleString()}</span>
                <span className="text-secondary">{stat.suffix}</span>
            </div>
            <p className="text-gray-300 font-medium">{stat.label}</p>
        </div>
    );
}
