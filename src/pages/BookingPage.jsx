import BookingSystem from '../components/BookingSystem';

export default function BookingPage() {
    return (
        <main className="pt-20">
            <section className="bg-primary py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Appointment</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Reserve your spot in just a few simple steps
                    </p>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BookingSystem />
                </div>
            </section>
        </main>
    );
}
