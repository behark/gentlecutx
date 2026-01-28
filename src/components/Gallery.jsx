import { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { galleryImages } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { language } = useLanguage();
    const t = translations[language];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm tracking-wider uppercase mb-3">
                        <Camera className="h-4 w-4" /> {t.gallery.label}
                    </span>
                    <h2 className="section-title">{t.gallery.title}</h2>
                    <p className="section-subtitle">{t.gallery.subtitle}</p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden rounded-2xl shadow-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {galleryImages.map((img, index) => (
                                <div key={index} className="min-w-full">
                                    <img
                                        src={img}
                                        alt={`Salon view ${index + 1}`}
                                        className="w-full h-[500px] object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    >
                        <ChevronLeft className="h-6 w-6 text-primary" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                    >
                        <ChevronRight className="h-6 w-6 text-primary" />
                    </button>

                    <div className="flex justify-center mt-6 space-x-2">
                        {galleryImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-secondary w-8' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
