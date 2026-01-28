import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { services } from '../data/salonData';

export default function ServicesPage() {
    return (
        <main className="pt-20">
            <section className="bg-primary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Professional grooming services tailored to your style
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {services.map((category) => (
                        <div key={category.id} className="mb-16 last:mb-0">
                            <h2 className="text-3xl font-bold text-primary mb-8 pb-4 border-b-2 border-secondary">
                                {category.category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {category.items.map((service) => (
                                    <div
                                        key={service.id}
                                        className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-secondary/30"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-primary">{service.name}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                                            </div>
                                            <span className="text-3xl font-bold text-secondary">{service.price}€</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center text-gray-500">
                                                <Clock className="h-5 w-5 mr-2" />
                                                {service.duration} minutes
                                            </div>
                                            <Link
                                                to="/booking"
                                                className="bg-primary hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                                            >
                                                Book <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="text-center mt-12 p-8 bg-secondary/10 rounded-2xl">
                        <h3 className="text-2xl font-bold text-primary mb-4">Ready to book?</h3>
                        <p className="text-gray-600 mb-6">Schedule your appointment online in just a few clicks</p>
                        <Link
                            to="/booking"
                            className="inline-flex items-center bg-secondary hover:bg-accent text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                        >
                            Book Your Appointment <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
