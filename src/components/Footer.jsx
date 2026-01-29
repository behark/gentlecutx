import { Link } from 'react-router-dom';
import { Scissors, MapPin, Phone, Mail, Instagram, Facebook, ArrowUpRight, Heart } from 'lucide-react';
import { salonInfo, openingHours } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <footer className="bg-gradient-to-b from-primary to-primary-dark text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            {/* CTA Section */}
            <div className="relative border-b border-gray-800/50">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="bg-gradient-to-r from-secondary/20 to-accent/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-secondary/20">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                {language === 'sq' ? 'Gati për stilin tuaj të ri?' : 'Ready for your new style?'}
                            </h3>
                            <p className="text-gray-300">
                                {language === 'sq' ? 'Rezervo tani dhe përfito nga ofertat tona speciale' : 'Book now and benefit from our special offers'}
                            </p>
                        </div>
                        <Link
                            to="/booking"
                            className="btn-primary whitespace-nowrap flex items-center gap-2 group"
                        >
                            {language === 'sq' ? 'Rezervo Tani' : 'Book Now'}
                            <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" style={{ display: 'grid', gap: '3rem' }}>
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-6 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Scissors className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-2xl font-bold">
                                Gentle<span className="text-gradient-animate">Cutx</span>
                            </span>
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            {t.footer.description}
                        </p>
                        <div className="flex space-x-3">
                            <a href={salonInfo.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800/50 hover:bg-secondary/20 rounded-xl flex items-center justify-center text-gray-400 hover:text-secondary transition-all hover:scale-110" aria-label="Follow us on Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href={salonInfo.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800/50 hover:bg-secondary/20 rounded-xl flex items-center justify-center text-gray-400 hover:text-secondary transition-all hover:scale-110" aria-label="Follow us on Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full"></span>
                            {t.footer.quickLinks}
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { to: '/', label: t.nav.home },
                                { to: '/services', label: t.nav.services },
                                { to: '/booking', label: t.nav.booking },
                                { to: '/about', label: t.nav.about },
                                { to: '/contact', label: t.nav.contact },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-300 hover:text-secondary text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-secondary transition-all duration-300"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full"></span>
                            {t.footer.contactInfo}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 group">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                                    <MapPin className="h-5 w-5 text-secondary" />
                                </div>
                                <span className="text-gray-300 text-sm pt-2">{salonInfo.address}</span>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                                    <Phone className="h-5 w-5 text-secondary" />
                                </div>
                                <span className="text-gray-300 text-sm">{salonInfo.phone}</span>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                                    <Mail className="h-5 w-5 text-secondary" />
                                </div>
                                <span className="text-gray-300 text-sm">{salonInfo.email}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-gradient-to-r from-secondary to-accent rounded-full"></span>
                            {t.footer.openingHours}
                        </h3>
                        <ul className="space-y-2">
                            {openingHours.map((item, index) => (
                                <li key={index} className="flex justify-between text-sm py-1.5 border-b border-gray-800/50 last:border-0">
                                    <span className="text-gray-300">{item.day[language] || item.day}</span>
                                    <span className={`font-medium ${item.isOpen ? 'text-secondary' : 'text-gray-500'}`}>
                                        {typeof item.hours === 'object' ? item.hours[language] : item.hours}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800/50 relative">
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            © {new Date().getFullYear()} GentleCutx. {t.footer.rights}
                            <Heart className="h-3 w-3 text-secondary fill-current mx-1" />
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" className="text-gray-500 hover:text-secondary text-sm transition-colors underline-animate">
                                {t.footer.privacy}
                            </Link>
                            <Link to="/terms" className="text-gray-500 hover:text-secondary text-sm transition-colors underline-animate">
                                {t.footer.terms}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}
