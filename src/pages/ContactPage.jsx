import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { salonInfo, openingHours } from '../data/salonData';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <main className="pt-20">
            <section className="bg-primary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {language === 'sq' ? 'Na Kontaktoni' : 'Contact Us'}
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {language === 'sq' ? 'Na kontaktoni për çdo pyetje ose kërkesë' : 'Get in touch with us for any questions or inquiries'}
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">
                                {language === 'sq' ? 'Na Kontaktoni' : 'Get In Touch'}
                            </h2>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg">
                                        <MapPin className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">{language === 'sq' ? 'Adresa' : 'Address'}</h3>
                                        <p className="text-gray-600">{salonInfo.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg">
                                        <Phone className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">{language === 'sq' ? 'Telefoni' : 'Phone'}</h3>
                                        <p className="text-gray-600">{salonInfo.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg">
                                        <Mail className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">Email</h3>
                                        <p className="text-gray-600">{salonInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-secondary/10 p-3 rounded-lg">
                                        <Clock className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-primary mb-1">{language === 'sq' ? 'Orari i Punës' : 'Opening Hours'}</h3>
                                        <div className="text-gray-600 text-sm space-y-1">
                                            {openingHours.slice(0, 3).map((item) => (
                                                <p key={typeof item.day === 'object' ? item.day[language] : item.day}>{typeof item.day === 'object' ? item.day[language] : item.day}: {typeof item.hours === 'object' ? item.hours[language] : item.hours}</p>
                                            ))}
                                            <p className="text-secondary font-medium">{language === 'sq' ? 'Shiko të gjitha oraret në faqen Rreth Nesh' : 'View all hours on About page'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>{language === 'sq' ? 'Harta e disponueshme' : 'Map integration available'}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-8">
                                {language === 'sq' ? 'Na Dërgo Mesazh' : 'Send Us a Message'}
                            </h2>

                            {submitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                                        {language === 'sq' ? 'Mesazhi u Dërgua!' : 'Message Sent!'}
                                    </h3>
                                    <p className="text-green-600">
                                        {language === 'sq' ? 'Do t\'ju kontaktojmë sa më shpejt të jetë e mundur.' : 'We\'ll get back to you as soon as possible.'}
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-4 text-green-700 underline"
                                    >
                                        {language === 'sq' ? 'Dërgo mesazh tjetër' : 'Send another message'}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {language === 'sq' ? 'Emri' : 'Name'}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                                            placeholder={language === 'sq' ? 'Emri juaj' : 'Your name'}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                                            placeholder={language === 'sq' ? 'email@juaj.com' : 'your@email.com'}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {language === 'sq' ? 'Subjekti' : 'Subject'}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary"
                                            placeholder={language === 'sq' ? 'Si mund t\'ju ndihmojmë?' : 'How can we help?'}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {language === 'sq' ? 'Mesazhi' : 'Message'}
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-secondary resize-none"
                                            placeholder={language === 'sq' ? 'Mesazhi juaj...' : 'Your message...'}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-secondary hover:bg-accent text-primary py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        {language === 'sq' ? 'Dërgo Mesazhin' : 'Send Message'} <Send className="h-5 w-5" />
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
