import { useState, useEffect, useRef } from 'react';
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
    const navRef = useRef(null);

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on Escape key and outside click
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        const handleClickOutside = (e) => {
            if (isOpen && navRef.current && !navRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: t.nav.home, path: '/' },
        { name: t.nav.services, path: '/services' },
        { name: t.nav.booking, path: '/booking' },
        { name: t.nav.about, path: '/about' },
        { name: t.nav.contact, path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            ref={navRef}
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-primary/95 backdrop-blur-xl shadow-2xl border-b border-secondary/10'
                : 'bg-gradient-to-b from-primary/80 to-transparent'
            }`}
        >
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="flex items-center justify-between h-20">
                    <Link
                        to="/"
                        className="flex items-center gap-2 group rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
                    >
                        <div className={`p-2 rounded-xl transition-all duration-300 ${scrolled ? 'bg-secondary/10' : 'bg-white/10'} group-hover:bg-secondary/20 group-hover:scale-105`}>
                            <Scissors className="h-6 w-6 text-secondary" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-wide">
                            Gentle<span className="text-gradient-animate">Cutx</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center" style={{ gap: '0.5rem' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${isActive(link.path)
                                    ? 'text-secondary bg-secondary/10'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-secondary rounded-full"></span>
                                )}
                            </Link>
                        ))}
                        <LanguageToggle />
                        <Link
                            to="/booking"
                            className="bg-gradient-to-r from-secondary to-accent text-primary px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/40 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
                        >
                            {t.nav.bookAppointment}
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile menu with animation */}
                <div
                    id="mobile-menu"
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    role="navigation"
                >
                    <div className="pb-4 bg-primary/95 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block py-3 px-4 text-sm font-medium transition-colors focus:outline-none focus:bg-secondary/20 ${isActive(link.path)
                                    ? 'text-secondary bg-gray-800/50 border-l-2 border-secondary'
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
                            className="block mx-4 mt-4 bg-gradient-to-r from-secondary to-accent text-primary text-center px-6 py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            {t.nav.bookAppointment}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
