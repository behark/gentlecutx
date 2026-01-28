import { FileText, Mail, Phone, MapPin } from 'lucide-react';
import { salonInfo } from '../data/salonData';

export default function TermsOfService() {
    return (
        <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                        <FileText className="h-8 w-8 text-secondary" />
                    </div>
                    <h1 className="text-4xl font-bold text-primary mb-4">Terms of Service</h1>
                    <p className="text-gray-600">Last updated: January 2026</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">1. Agreement to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            By accessing or using GentleCutx website and services, you agree to be bound by these Terms of Service.
                            If you disagree with any part of these terms, you may not access our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">2. Services Description</h2>
                        <p className="text-gray-600 leading-relaxed">
                            GentleCutx provides professional barbershop services including haircuts, beard grooming, shaving,
                            and related grooming services. Our online platform allows customers to view services, book appointments,
                            and manage their bookings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">3. Booking Policy</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-primary mb-2">3.1 Appointment Booking</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Appointments can be booked online through our website. All bookings are subject to availability
                                    and confirmation. We recommend booking in advance to secure your preferred time slot.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary mb-2">3.2 Cancellation Policy</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We understand plans change. Please cancel or reschedule your appointment at least 24 hours
                                    in advance. Late cancellations or no-shows may result in a cancellation fee for future bookings.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary mb-2">3.3 Late Arrivals</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    If you arrive more than 15 minutes late, we may need to reschedule your appointment or
                                    modify your service to accommodate our schedule.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">4. Pricing and Payment</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>All prices displayed are in Euros (€) and include applicable taxes</li>
                            <li>Prices are subject to change without prior notice</li>
                            <li>Payment is due at the time of service</li>
                            <li>We accept cash, credit cards, and contactless payments</li>
                            <li>Promotional codes are subject to specific terms and cannot be combined</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">5. Service Satisfaction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We strive to provide excellent service. If you're not satisfied with your haircut or grooming service,
                            please let us know immediately so we can address your concerns. Adjustments must be requested within
                            7 days of the original service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">6. Health and Safety</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">For everyone's safety:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Please inform us of any scalp conditions or allergies before your service</li>
                            <li>We maintain strict hygiene standards and sanitize all equipment between clients</li>
                            <li>If you're feeling unwell, please reschedule your appointment</li>
                            <li>We reserve the right to refuse service if we believe it may pose a health risk</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            All content on this website, including text, graphics, logos, and images, is the property of
                            GentleCutx and is protected by copyright laws. You may not reproduce, distribute, or use any
                            content without our written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">8. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            GentleCutx shall not be liable for any indirect, incidental, or consequential damages arising
                            from the use of our services or website. Our total liability shall not exceed the amount paid
                            for the specific service in question.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">9. Changes to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right to modify these terms at any time. Changes will be effective immediately
                            upon posting on this page. Your continued use of our services constitutes acceptance of the
                            modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">10. Contact Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            For questions about these Terms of Service, please contact us:
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
                            By using our services, you acknowledge that you have read, understood, and agree to be bound
                            by these Terms of Service.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
