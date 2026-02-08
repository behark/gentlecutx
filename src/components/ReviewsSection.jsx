import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { reviews, salonInfo } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { localize } from '../utils/localize';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ReviewsSection() {
    const { language } = useLanguage();
    const { t } = useTranslation();
    const { ref, isVisible } = useScrollReveal(0.1);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reviews.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const goToReview = (index) => setActiveIndex(index);
    const nextReview = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
    const prevReview = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm tracking-wider uppercase mb-3 bg-secondary/10 px-4 py-2 rounded-full">
                        <MessageSquare className="h-4 w-4" /> {t('reviews.label')}
                    </span>
                    <h2 className="section-title">{t('reviews.title')}</h2>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-6 w-6 text-secondary fill-current drop-shadow-sm" />
                            ))}
                        </div>
                        <span className="text-3xl font-bold text-gradient-animate">{salonInfo.rating}</span>
                        <span className="text-gray-500">({salonInfo.reviewCount} {t('reviews.reviewsCount')})</span>
                    </div>
                </div>

                {/* Featured review carousel */}
                <div
                    ref={containerRef}
                    className="relative max-w-4xl mx-auto mb-12"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-light p-8 md:p-12 min-h-[280px]">
                        <Quote className="absolute top-6 left-6 h-20 w-20 text-secondary/10" />
                        <Quote className="absolute bottom-6 right-6 h-20 w-20 text-secondary/10 rotate-180" />

                        {reviews.map((review, index) => (
                            <div
                                key={review.id}
                                className={`transition-all duration-500 absolute inset-0 p-8 md:p-12 flex flex-col justify-center ${index === activeIndex
                                    ? 'opacity-100 translate-x-0'
                                    : index < activeIndex
                                        ? 'opacity-0 -translate-x-full'
                                        : 'opacity-0 translate-x-full'
                                    }`}
                            >
                                <div className="flex justify-center mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                                    ))}
                                </div>
                                <p className="text-white text-xl md:text-2xl text-center leading-relaxed mb-6 italic">
                                    "{localize(review.text, language)}"
                                </p>
                                <div className="text-center">
                                    <span className="text-secondary font-bold text-lg">{review.author}</span>
                                    <span className="text-gray-400 mx-2">•</span>
                                    <span className="text-gray-400 text-sm">{localize(review.date, language)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation arrows */}
                    <button
                        onClick={prevReview}
                        className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition-all hover:scale-110 hidden md:flex"
                    >
                        <ChevronLeft className="h-6 w-6 text-primary" />
                    </button>
                    <button
                        onClick={nextReview}
                        className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:shadow-xl p-3 rounded-full transition-all hover:scale-110 hidden md:flex"
                    >
                        <ChevronRight className="h-6 w-6 text-primary" />
                    </button>

                    {/* Dots navigation */}
                    <div className="flex justify-center gap-2 mt-6">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToReview(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'bg-secondary w-8'
                                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mini review cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ display: 'grid', gap: '1.5rem' }}>
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            onClick={() => goToReview(index)}
                            className={`cursor-pointer group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={`bg-white rounded-2xl p-5 shadow-lg border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${index === activeIndex ? 'border-secondary' : 'border-transparent hover:border-secondary/30'
                                }`}>
                                <div className="flex mb-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="h-3 w-3 text-secondary fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-xs mb-3 line-clamp-2 italic">"{localize(review.text, language)}"</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-primary text-sm">{review.author}</span>
                                    <span className="text-gray-400 text-xs">{localize(review.date, language)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
