import { Star, Award, Users, Clock } from 'lucide-react';
import { salonInfo, openingHours, barbers, reviews } from '../data/salonData';
import TeamSection from '../components/TeamSection';
import { useLanguage } from '../context/LanguageContext';
import { localize } from '../utils/localize';

export default function AboutPage() {
    const { language } = useLanguage();
    const stats = [
        { icon: Users, value: '5000+', label: 'Happy Clients' },
        { icon: Award, value: '10+', label: 'Years Experience' },
        { icon: Star, value: '5.0', label: 'Average Rating' },
        { icon: Clock, value: '24/7', label: 'Online Booking' },
    ];

    return (
        <main className="pt-20">
            <section className="bg-primary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Where tradition meets modern style
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
                            <div className="prose prose-lg text-gray-600">
                                <p className="mb-4">{salonInfo.description}</p>
                                <p>
                                    At GentleCutx, we believe that grooming is more than just a haircut – it's an experience.
                                    Our mission is to provide exceptional service in a welcoming environment where every client
                                    feels valued and leaves looking their absolute best.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop"
                                alt="Our salon"
                                className="rounded-2xl shadow-xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-secondary text-primary p-6 rounded-xl shadow-lg">
                                <div className="text-4xl font-bold">10+</div>
                                <div className="text-sm font-medium">Years of Excellence</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <stat.icon className="h-10 w-10 text-secondary mx-auto mb-4" />
                                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TeamSection />

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">Opening Hours</h2>
                            <div className="bg-gray-50 rounded-xl p-6">
                                {openingHours.map((item) => (
                                    <div
                                        key={typeof item.day === 'object' ? item.day[language] : item.day}
                                        className="flex justify-between py-3 border-b border-gray-200 last:border-0"
                                    >
                                        <span className="font-medium text-primary">{localize(item.day, language)}</span>
                                        <span className={item.isOpen ? 'text-gray-600' : 'text-red-500'}>
                                            {localize(item.hours, language)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">Client Reviews</h2>
                            <div className="space-y-4">
                                {reviews.slice(0, 3).map((review) => (
                                    <div key={review.id} className="bg-gray-50 rounded-xl p-6">
                                        <div className="flex mb-2">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 text-secondary fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-gray-600 mb-3">"{localize(review.text, language)}"</p>
                                        <div className="flex justify-between text-sm">
                                            <span className="font-semibold text-primary">{review.author}</span>
                                            <span className="text-gray-400">{localize(review.date, language)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
