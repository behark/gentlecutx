import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function SpecialOffers() {
    const { language } = useLanguage();
    const t = translations[language];

    const offers = [
        {
            id: 1,
            title: t.offers.items.firstVisit.title,
            description: t.offers.items.firstVisit.description,
            code: "WELCOME20",
            icon: Gift,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            id: 2,
            title: t.offers.items.vipPackage.title,
            description: t.offers.items.vipPackage.description,
            code: "VIPSAVE",
            icon: Sparkles,
            gradient: "from-secondary to-accent"
        },
        {
            id: 3,
            title: t.offers.items.referFriend.title,
            description: t.offers.items.referFriend.description,
            code: "FRIEND15",
            icon: Gift,
            gradient: "from-blue-500 to-cyan-500"
        }
    ];

    return (
        <section className="py-20 bg-primary relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="h-4 w-4" />
                        {t.offers.label}
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">{t.offers.title}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">{t.offers.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="relative group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${offer.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-secondary/50 transition-all">
                                <div className={`w-14 h-14 bg-gradient-to-r ${offer.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                                    <offer.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                                <p className="text-gray-400 mb-4">{offer.description}</p>
                                <div className="bg-gray-900/50 rounded-lg px-4 py-2 inline-block mb-4">
                                    <span className="text-xs text-gray-500">{t.offers.useCode} </span>
                                    <span className="text-secondary font-mono font-bold">{offer.code}</span>
                                </div>
                                <Link
                                    to="/booking"
                                    className="flex items-center text-secondary hover:text-accent font-medium transition-colors group/link"
                                >
                                    {t.offers.bookNow}
                                    <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/booking"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        {t.offers.bookAppointment} <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
