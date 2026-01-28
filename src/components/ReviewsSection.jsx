import { Star, Quote } from 'lucide-react';
import { reviews, salonInfo } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function ReviewsSection() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">{t.reviews.label}</span>
                    <h2 className="section-title">{t.reviews.title}</h2>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-6 w-6 text-secondary fill-current" />
                            ))}
                        </div>
                        <span className="text-2xl font-bold text-primary">{salonInfo.rating}</span>
                        <span className="text-gray-500">({salonInfo.reviewCount} {t.reviews.reviewsCount})</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <div
                            key={review.id}
                            className="card group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Quote className="h-10 w-10 text-secondary/20 mb-4 group-hover:text-secondary/40 transition-colors" />
                            <div className="flex mb-3">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-secondary fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm mb-6 leading-relaxed italic">"{review.text[language] || review.text}"</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="font-bold text-primary">{review.author}</span>
                                <span className="text-gray-400 text-xs">{review.date[language] || review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
