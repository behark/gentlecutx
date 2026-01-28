import { Link } from 'react-router-dom';
import { Scissors, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { salonInfo, openingHours } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <footer className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <Scissors className="h-8 w-8 text-secondary" />
                            <span className="text-2xl font-bold">
                                Gentle<span className="text-secondary">Cutx</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t.footer.description}
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">{t.footer.quickLinks}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white text-sm">{t.nav.home}</Link></li>
                            <li><Link to="/services" className="text-gray-400 hover:text-white text-sm">{t.nav.services}</Link></li>
                            <li><Link to="/booking" className="text-gray-400 hover:text-white text-sm">{t.nav.booking}</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">{t.nav.about}</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">{t.nav.contact}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">{t.footer.contactInfo}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">{salonInfo.address}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{salonInfo.phone}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{salonInfo.email}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-secondary">{t.footer.openingHours}</h3>
                        <ul className="space-y-2">
                            {openingHours.map((item, index) => (
                                <li key={index} className="flex justify-between text-sm">
                                    <span className="text-gray-400">{item.day[language] || item.day}</span>
                                    <span className={item.isOpen ? 'text-white' : 'text-gray-500'}>
                                        {typeof item.hours === 'object' ? item.hours[language] : item.hours}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} GentleCutx. {t.footer.rights}
                        </p>
                        <div className="flex items-center gap-6">
                            <Link to="/privacy" className="text-gray-500 hover:text-secondary text-sm transition-colors">
                                {t.footer.privacy}
                            </Link>
                            <Link to="/terms" className="text-gray-500 hover:text-secondary text-sm transition-colors">
                                {t.footer.terms}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
