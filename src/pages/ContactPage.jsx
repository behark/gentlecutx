import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { salonInfo, openingHours } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { localize } from '../utils/localize';

export default function ContactPage() {
    const { language } = useLanguage();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error();

            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch {
            setError(t('contact.sendFailed'));
        } finally {
            setSending(false);
        }
    };

    return (
        <main className="pt-20">
            <section className="bg-primary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('contact.title')}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">
                                {t('contact.info.title')}
                            </h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg">
                                        <MapPin className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">{t('contact.info.address')}</h3>
                                        <p className="text-gray-600">{salonInfo.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg">
                                        <Phone className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">{t('contact.info.phone')}</h3>
                                        <p className="text-gray-600">{salonInfo.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg">
                                        <Mail className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">{t('contact.info.email')}</h3>
                                        <p className="text-gray-600">{salonInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg">
                                        <Clock className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">{t('contact.info.hours')}</h3>
                                        <div className="text-gray-600 text-sm space-y-1">
                                            {openingHours.slice(0, 3).map((item) => (
                                                <p key={localize(item.day, language)}>{localize(item.day, language)}: {localize(item.hours, language)}</p>
                                            ))}
                                            <p className="text-secondary font-medium">{t('contact.viewAllHours')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <img
                                src="/storefront-banner.jpeg"
                                alt={t('contact.ourLocation')}
                                className="rounded-xl w-full h-64 object-cover object-center"
                            />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">
                                {t('contact.sendMessage')}
                            </h2>

                            {submitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                                        {t('contact.messageSent')}
                                    </h3>
                                    <p className="text-green-600">
                                        {t('contact.messageSuccess')}
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-4 text-green-700 underline"
                                    >
                                        {t('contact.sendAnother')}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.name')}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                                            placeholder={t('contact.form.name')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('contact.form.email')}</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                                            placeholder={t('contact.form.email')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.phone')}
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9+\-\s()]/g, '');
                                                setFormData({ ...formData, phone: val });
                                            }}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                                            placeholder={t('contact.form.phone')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.form.message')}
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary resize-none"
                                            placeholder={t('contact.form.message')}
                                        />
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="w-full bg-secondary hover:bg-accent text-primary py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {sending
                                            ? t('contact.sending')
                                            : t('contact.form.send')
                                        }
                                        {!sending && <Send className="h-5 w-5" />}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
