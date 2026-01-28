import { CheckCircle, X, Calendar, Clock, User, Scissors } from 'lucide-react';
import { format } from 'date-fns';

export default function ConfirmationModal({ isOpen, onClose, bookingData }) {
    if (!isOpen) return null;

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
                    <h2 className="text-2xl font-bold text-primary mb-2">Booking Confirmed!</h2>
                    <p className="text-primary/70">We look forward to seeing you</p>
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
                            <p className="text-sm text-gray-500">Date & Time</p>
                            <p className="font-semibold text-primary">
                                {format(date, 'EEEE, MMMM d, yyyy')}
                            </p>
                            <p className="text-secondary font-medium">{time}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <Scissors className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-500">Services</p>
                            <p className="font-semibold text-primary">
                                {services.map(s => s.name).join(', ')}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <Clock className="h-4 w-4" />
                                <span>{totalDuration} minutes</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <User className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                            <p className="text-sm text-gray-500">Barber</p>
                            <p className="font-semibold text-primary">
                                {barber?.name || 'First Available'}
                            </p>
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total</span>
                            <span className="text-3xl font-bold text-secondary">{totalPrice}€</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                        <p className="text-blue-800 text-sm">
                            A confirmation has been sent to <strong>{customer.email}</strong>
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full btn-primary text-center"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
