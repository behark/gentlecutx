import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Camera, X, ZoomIn } from 'lucide-react';
import { galleryImages } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const { language } = useLanguage();
    const t = translations[language];
    const { ref, isVisible } = useScrollReveal(0.2);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying || lightboxOpen) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, lightboxOpen, nextSlide]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') setLightboxOpen(false);
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, nextSlide, prevSlide]);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm tracking-wider uppercase mb-3 bg-secondary/10 px-4 py-2 rounded-full">
                        <Camera className="h-4 w-4" /> {t.gallery.label}
                    </span>
                    <h2 className="section-title">{t.gallery.title}</h2>
                    <p className="section-subtitle">{t.gallery.subtitle}</p>
                </div>

                <div
                    className="relative group"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="overflow-hidden rounded-3xl shadow-2xl">
                        <div
                            className="flex transition-transform duration-700 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {galleryImages.map((img, index) => (
                                <div
                                    key={index}
                                    className="min-w-full relative cursor-pointer"
                                    onClick={() => setLightboxOpen(true)}
                                >
                                    <img
                                        src={img}
                                        alt={`Salon view ${index + 1}`}
                                        loading="lazy"
                                        className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                        <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                            <ZoomIn className="h-5 w-5" />
                                            <span className="text-sm font-medium">{language === 'sq' ? 'Kliko për të zmadhuar' : 'Click to enlarge'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft className="h-6 w-6 text-primary" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight className="h-6 w-6 text-primary" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        {galleryImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-secondary w-8'
                                        : 'bg-white/50 hover:bg-white/80 w-2'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Thumbnail preview */}
                <div className="mt-6 flex justify-center gap-3">
                    {galleryImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex
                                    ? 'ring-2 ring-secondary ring-offset-2 scale-105'
                                    : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img src={img} alt={`Salon thumbnail ${index + 1}`} loading="lazy" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
                    >
                        <X className="h-8 w-8" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all"
                    >
                        <ChevronLeft className="h-10 w-10" />
                    </button>

                    <img
                        src={galleryImages[currentIndex]}
                        alt={`Gallery ${currentIndex + 1}`}
                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all"
                    >
                        <ChevronRight className="h-10 w-10" />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {galleryImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                                className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-secondary w-8' : 'bg-white/30 hover:bg-white/50 w-2'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="absolute bottom-6 right-6 text-white/60 text-sm">
                        {currentIndex + 1} / {galleryImages.length}
                    </div>
                </div>
            )}
        </section>
    );
}
