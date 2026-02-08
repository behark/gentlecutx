import { useState, useMemo, useCallback } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { sq } from 'date-fns/locale';
import { Clock, User, Calendar, ChevronDown, ChevronUp, X, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { services, barbers } from '../data/salonData';
import ConfirmationModal from './ConfirmationModal';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { localize } from '../utils/localize';

function getTimeSlotsForDate(date) {
    if (!date) return [];
    const isSaturday = date.getDay() === 6;
    const startHour = isSaturday ? 10 : 9;
    const endHour = isSaturday ? 17 : 19;
    const slots = [];
    for (let h = startHour; h <= endHour; h++) {
        if (h === 13) continue;
        slots.push(`${String(h).padStart(2, '0')}:00`);
        if (h < endHour) {
            slots.push(`${String(h).padStart(2, '0')}:30`);
        }
    }
    return slots;
}

export default function BookingSystem() {
    const { language } = useLanguage();
    const { t } = useTranslation();
    const dateLocale = language === 'sq' ? { locale: sq } : undefined;
    const [step, setStep] = useState(1);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [expandedCategory, setExpandedCategory] = useState(services[0]?.id);
    const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const today = new Date().toDateString();
    const availableDates = useMemo(() => {
        const dates = [];
        for (let i = 0; i < 14; i++) {
            const date = addDays(new Date(), i);
            if (date.getDay() !== 0) {
                dates.push(date);
            }
        }
        return dates;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [today]);

    const timeSlots = useMemo(() => getTimeSlotsForDate(selectedDate), [selectedDate]);

    const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

    const toggleService = (service) => {
        setSelectedServices(prev => {
            const exists = prev.find(s => s.id === service.id);
            if (exists) {
                return prev.filter(s => s.id !== service.id);
            }
            return [...prev, service];
        });
    };

    const handleSubmit = useCallback(async () => {
        setSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    services: selectedServices.map(s => ({
                        name: localize(s.name, language),
                        price: s.price,
                        duration: s.duration,
                    })),
                    barber: selectedBarber ? { name: selectedBarber.name } : null,
                    date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
                    time: selectedTime,
                    customer: customerInfo,
                    totalPrice,
                    totalDuration,
                }),
            });

            if (!response.ok) throw new Error();

            setShowConfirmation(true);
        } catch {
            setSubmitError(t('booking.bookingFailed'));
        } finally {
            setSubmitting(false);
        }
    }, [selectedServices, selectedBarber, selectedDate, selectedTime, customerInfo, totalPrice, totalDuration, language]);

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        setStep(1);
        setSelectedServices([]);
        setSelectedBarber(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setCustomerInfo({ name: '', phone: '', email: '' });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${step >= s ? 'bg-secondary text-primary' : 'bg-gray-200 text-gray-500'
                                }`}
                        >
                            {step > s ? <Check className="h-5 w-5" /> : s}
                        </div>
                        {s < 4 && (
                            <div className={`w-16 md:w-24 h-1 mx-2 ${step > s ? 'bg-secondary' : 'bg-gray-200'}`} />
                        )}
                    </div>
                ))}
            </div>

            {step === 1 && (
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">1. {t('booking.selectServices')}</h2>
                    <p className="text-gray-600 mb-6">{t('booking.selectServicesSubtitle')}</p>

                    {selectedServices.length > 0 && (
                        <div className="bg-secondary/10 rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-primary">
                                    {selectedServices.length} {t('booking.selectedServices')}
                                </span>
                                <span className="text-secondary font-bold">{totalPrice}€ · {totalDuration} {t('services.duration')}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedServices.map(service => (
                                    <span
                                        key={service.id}
                                        className="bg-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                    >
                                        {localize(service.name, language)}
                                        <button onClick={() => toggleService(service)} className="text-gray-400 hover:text-red-500">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {services.map((category) => (
                            <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <span className="font-semibold text-primary">{localize(category.category, language)}</span>
                                    {expandedCategory === category.id ? (
                                        <ChevronUp className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                                {expandedCategory === category.id && (
                                    <div className="divide-y divide-gray-100">
                                        {category.items.map((service) => {
                                            const isSelected = selectedServices.find(s => s.id === service.id);
                                            return (
                                                <div
                                                    key={service.id}
                                                    className={`p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors ${isSelected ? 'bg-secondary/5' : ''
                                                        }`}
                                                    onClick={() => toggleService(service)}
                                                >
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-primary">{localize(service.name, language)}</h4>
                                                        <p className="text-gray-500 text-sm">{localize(service.description, language)}</p>
                                                        <div className="flex items-center text-gray-400 text-sm mt-1">
                                                            <Clock className="h-4 w-4 mr-1" />
                                                            {service.duration} {t('services.duration')}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xl font-bold text-secondary">{service.price}€</span>
                                                        <button
                                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${isSelected
                                                                ? 'bg-secondary text-primary'
                                                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                                                }`}
                                                        >
                                                            {isSelected ? t('booking.selected') : t('booking.choose')}
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => setStep(2)}
                            disabled={selectedServices.length === 0}
                            className="bg-secondary hover:bg-accent text-primary px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {t('booking.continue')} <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">2. {t('booking.selectBarber')}</h2>
                    <p className="text-gray-600 mb-6">{t('booking.selectBarberSubtitle')}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div
                            onClick={() => setSelectedBarber(null)}
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedBarber === null ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <h4 className="font-semibold text-center text-primary">{t('booking.anyBarber')}</h4>
                            <p className="text-gray-500 text-sm text-center">{t('booking.anyBarberDesc')}</p>
                        </div>

                        {barbers.map((barber) => (
                            <div
                                key={barber.id}
                                onClick={() => setSelectedBarber(barber)}
                                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${selectedBarber?.id === barber.id ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <img src={barber.image} alt={barber.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                                <h4 className="font-semibold text-center text-primary">{barber.name}</h4>
                                <p className="text-secondary text-sm text-center">{localize(barber.role, language)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={() => setStep(1)}
                            className="text-gray-600 hover:text-primary px-6 py-3 font-medium flex items-center gap-2"
                        >
                            <ArrowLeft className="h-5 w-5" /> {t('booking.back')}
                        </button>
                        <button
                            onClick={() => setStep(3)}
                            className="bg-secondary hover:bg-accent text-primary px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
                        >
                            {t('booking.continue')} <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">3. {t('booking.steps.datetime')}</h2>
                    <p className="text-gray-600 mb-6">{t('booking.selectDateTimeSubtitle')}</p>

                    <div className="mb-8">
                        <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5" /> {t('booking.selectDate')}
                        </h3>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {availableDates.map((date) => (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                    className={`flex-shrink-0 p-3 rounded-xl text-center min-w-[80px] transition-all ${selectedDate && isSameDay(selectedDate, date)
                                        ? 'bg-secondary text-primary'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    <div className="text-xs font-medium">{format(date, 'EEE', dateLocale)}</div>
                                    <div className="text-xl font-bold">{format(date, 'd', dateLocale)}</div>
                                    <div className="text-xs">{format(date, 'MMM', dateLocale)}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedDate && (
                        <div>
                            <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5" /> {t('booking.selectTime')}
                            </h3>
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-3 rounded-lg font-medium transition-all ${selectedTime === time
                                            ? 'bg-secondary text-primary'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={() => setStep(2)}
                            className="text-gray-600 hover:text-primary px-6 py-3 font-medium flex items-center gap-2"
                        >
                            <ArrowLeft className="h-5 w-5" /> {t('booking.back')}
                        </button>
                        <button
                            onClick={() => setStep(4)}
                            disabled={!selectedDate || !selectedTime}
                            className="bg-secondary hover:bg-accent text-primary px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {t('booking.continue')} <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-2">4. {t('booking.confirmBooking')}</h2>
                    <p className="text-gray-600 mb-6">{t('booking.confirmSubtitle')}</p>

                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                        <h3 className="font-semibold text-primary mb-4">{t('booking.summary')}</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('confirmation.services')}:</span>
                                <span className="font-medium">{selectedServices.map(s => localize(s.name, language)).join(', ')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('confirmation.barber')}:</span>
                                <span className="font-medium">{selectedBarber?.name || t('booking.anyBarber')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('confirmation.date')}:</span>
                                <span className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy', dateLocale)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('confirmation.time')}:</span>
                                <span className="font-medium">{selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">{t('booking.duration')}:</span>
                                <span className="font-medium">{totalDuration} {t('services.duration')}</span>
                            </div>
                            <div className="border-t pt-3 mt-3 flex justify-between">
                                <span className="font-semibold text-primary">{t('booking.total')}:</span>
                                <span className="text-2xl font-bold text-secondary">{totalPrice}€</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <h3 className="font-semibold text-primary">{t('booking.yourDetails')}</h3>
                        <input
                            type="text"
                            placeholder={t('booking.name')}
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                        />
                        <input
                            type="tel"
                            placeholder={t('booking.phone')}
                            value={customerInfo.phone}
                            onChange={(e) => {
                                const val = e.target.value.replace(/[^0-9+\-\s()]/g, '');
                                setCustomerInfo({ ...customerInfo, phone: val });
                            }}
                            pattern="[0-9+\-\s()]{7,20}"
                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                        />
                        <input
                            type="email"
                            placeholder={t('booking.email')}
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                        />
                    </div>

                    {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm mb-4">
                            {submitError}
                        </div>
                    )}

                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={() => setStep(3)}
                            className="text-gray-600 hover:text-primary px-6 py-3 font-medium flex items-center gap-2"
                        >
                            <ArrowLeft className="h-5 w-5" /> {t('booking.back')}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!customerInfo.name || !customerInfo.phone || submitting}
                            className="bg-secondary hover:bg-accent text-primary px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {submitting
                                ? t('booking.submitting')
                                : t('booking.confirmBooking')
                            }
                            {!submitting && <Check className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={handleCloseConfirmation}
                bookingData={{
                    services: selectedServices,
                    barber: selectedBarber,
                    date: selectedDate,
                    time: selectedTime,
                    customer: customerInfo,
                    totalPrice,
                    totalDuration
                }}
            />
        </div>
    );
}
