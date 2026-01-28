import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ChevronUp } from 'lucide-react';

export default function FloatingButtons() {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const phoneNumber = '+38344123456';

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="w-12 h-12 bg-gradient-to-r from-secondary to-accent text-primary rounded-full shadow-lg 
                     hover:scale-110 transition-all duration-300
                     flex items-center justify-center"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-6 w-6" />
                </button>
            )}

            <div className="relative">
                {isExpanded && (
                    <div className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2">
                        <a
                            href={`tel:${phoneNumber}`}
                            className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg
                             hover:scale-110 transition-all duration-300
                             flex items-center justify-center"
                            aria-label="Call us"
                        >
                            <Phone className="h-5 w-5" />
                        </a>
                        <a
                            href={`https://wa.me/${phoneNumber.replace('+', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg
                             hover:scale-110 transition-all duration-300
                             flex items-center justify-center"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle className="h-5 w-5" />
                        </a>
                    </div>
                )}

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center
                      transition-all duration-300 pulse-glow
                      ${isExpanded
                            ? 'bg-gray-700 rotate-45'
                            : 'bg-gradient-to-r from-secondary to-accent'
                        }`}
                    aria-label="Contact options"
                >
                    <MessageCircle className={`h-6 w-6 ${isExpanded ? 'text-white' : 'text-primary'}`} />
                </button>
            </div>
        </div>
    );
}
