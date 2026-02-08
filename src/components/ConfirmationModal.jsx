import { useEffect } from 'react';
import { CheckCircle, X, Calendar, Clock, User, Scissors } from 'lucide-react';
import { format } from 'date-fns';
import { sq } from 'date-fns/locale';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { localize } from '../utils/localize';

export default function ConfirmationModal({ isOpen, onClose, bookingData }) {
    const { language } = useLanguage();
    const { t } = useTranslation();
    const dateLocale = language === 'sq' ? { locale: sq } : undefined;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen || !bookingData) return null;

    const { services, barber, date, time, customer, totalPrice, totalDuration } = bookingData;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden slide-up">
                <div className="bg-gradient-to-r from-secondary to-accent p-8 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">{t('confirmation.title')}</h2>
                    <p className="text-primary/70">{t('confirmation.subtitle')}</p>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-primary/50 hover:text-primary transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <Calendar className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-500">{t('booking.steps.datetime')}</p>
                            <p className="font-semibold text-primary">
                                {date ? format(date, 'EEEE, MMMM d, yyyy', dateLocale) : '—'}
                            </p>
                            <p className="text-secondary font-medium">{time}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <Scissors className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-500">{t('confirmation.services')}</p>
                            <p className="font-semibold text-primary">
                                {services.map(s => localize(s.name, language)).join(', ')}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <Clock className="h-4 w-4" />
                                <span>{totalDuration} {t('services.duration')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <User className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-500">{t('confirmation.barber')}</p>
                            <p className="font-semibold text-primary">
                                {barber?.name || t('booking.anyBarber')}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">{t('confirmation.total')}</span>
                            <span className="text-3xl font-bold text-secondary">{totalPrice}€</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                        {customer.email ? (
                            <p className="text-blue-800 text-sm">
                                {t('confirmation.emailNotice')} <strong>{customer.email}</strong>
                            </p>
                        ) : (
                            <p className="text-blue-800 text-sm">{t('confirmation.reminder')}</p>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full btn-primary text-center"
                    >
                        {t('confirmation.done')}
                    </button>
                </div>
            </div>
        </div>
    );
}
