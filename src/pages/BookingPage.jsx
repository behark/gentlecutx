import BookingSystem from '../components/BookingSystem';
import { useTranslation } from 'react-i18next';

export default function BookingPage() {
    const { t } = useTranslation();

    return (
        <main className="pt-20">
            <section className="bg-primary py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('booking.title')}</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t('booking.subtitle')}
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
