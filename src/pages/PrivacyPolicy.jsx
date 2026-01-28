import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { salonInfo } from '../data/salonData';

export default function PrivacyPolicy() {
    return (
        <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                        <Shield className="h-8 w-8 text-secondary" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
                    <p className="text-gray-600">Last updated: January 2026</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to GentleCutx. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy explains how we collect, use, and safeguard your information when you visit our
                            website or use our booking services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">We may collect the following types of information:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Personal Information:</strong> Name, email address, phone number when you book an appointment</li>
                            <li><strong>Booking Data:</strong> Service preferences, appointment history, selected barber</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, device information for website analytics</li>
                            <li><strong>Communication Data:</strong> Messages sent through our contact form</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">Your information is used to:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Process and manage your appointment bookings</li>
                            <li>Send booking confirmations and reminders</li>
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Improve our services and website experience</li>
                            <li>Send promotional offers (only with your consent)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">4. Data Protection</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We implement appropriate security measures to protect your personal data against unauthorized access,
                            alteration, disclosure, or destruction. Your data is stored securely and accessed only by authorized
                            personnel who need the information to perform their duties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">5. Data Retention</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We retain your personal data only for as long as necessary to fulfill the purposes for which it was
                            collected, including satisfying legal, accounting, or reporting requirements. Booking data is typically
                            retained for up to 2 years for service history purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">6. Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">Under GDPR, you have the right to:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing of your data</li>
                            <li>Request data portability</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">7. Cookies</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our website uses cookies to enhance your browsing experience. These are small text files stored on
                            your device that help us understand how you use our site. You can control cookie settings through
                            your browser preferences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">8. Third-Party Services</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may use third-party services for analytics, payment processing, and appointment scheduling.
                            These services have their own privacy policies, and we encourage you to review them. We do not
                            sell your personal data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">9. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                        </p>
                        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="h-5 w-5 text-secondary" />
                                <span>{salonInfo.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone className="h-5 w-5 text-secondary" />
                                <span>{salonInfo.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin className="h-5 w-5 text-secondary" />
                                <span>{salonInfo.address}</span>
                            </div>
                        </div>
                    </section>

                    <section className="pt-6 border-t border-gray-200">
                        <p className="text-gray-500 text-sm">
                            This privacy policy may be updated periodically. We will notify you of any significant changes
                            by posting the new policy on this page with an updated revision date.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
