import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scissors } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.home, path: '/' },
        { name: t.nav.services, path: '/services' },
        { name: t.nav.booking, path: '/booking' },
        { name: t.nav.about, path: '/about' },
        { name: t.nav.contact, path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-xl'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-2">
                        <Scissors className="h-8 w-8 text-secondary" />
                        <span className="text-2xl font-bold text-white tracking-wide">
                            Gentle<span className="text-secondary">Cutx</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                    ? 'text-secondary'
                                    : 'text-gray-300 hover:text-secondary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <LanguageToggle />
                        <Link
                            to="/booking"
                            className="bg-gradient-to-r from-secondary to-accent text-primary px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/40 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            {t.nav.bookAppointment}
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {isOpen && (
                    <div className="md:hidden pb-4 bg-primary/95 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block py-3 px-4 text-sm font-medium ${isActive(link.path)
                                    ? 'text-secondary bg-gray-800/50'
                                    : 'text-gray-300 hover:text-secondary hover:bg-gray-800/50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="px-4 pt-4">
                            <LanguageToggle />
                        </div>
                        <Link
                            to="/booking"
                            onClick={() => setIsOpen(false)}
                            className="block mx-4 mt-4 bg-gradient-to-r from-secondary to-accent text-primary text-center px-6 py-3 rounded-xl font-semibold"
                        >
                            {t.nav.bookAppointment}
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
