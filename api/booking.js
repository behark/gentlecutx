import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

let resend;
const getResend = () => {
    if (!resend && process.env.RESEND_API_KEY) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
};

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || 'https://dtxfhcrupwsbzxfgcrsf.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0eGZoY3J1cHdzYnp4ZmdjcnNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5ODQ2NywiZXhwIjoyMDg2Njc0NDY3fQ.KtbG3HutZrCkcPV1o8NL0WnQ_X99CFrnvQNKTe9FDEU'
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { services, barber, date, dateISO, time, customer, totalPrice, totalDuration } = req.body;

    if (!services?.length || !date || !time || !customer?.name || !customer?.phone) {
        return res.status(400).json({ error: 'Missing required booking information' });
    }

    const servicesList = services.map(s => s.name).join(', ');
    const barberName = barber?.name || 'Any Available Barber';

    try {
        // Store booking in database
        const { data: bookingData, error: dbError } = await supabase
            .from('bookings')
            .insert([
                {
                    customer_name: customer.name,
                    customer_phone: customer.phone,
                    customer_email: customer.email || null,
                    booking_date: dateISO || date,
                    booking_time: time,
                    barber_id: barber?.id || null,
                    barber_name: barberName,
                    services: services,
                    total_price: totalPrice,
                    total_duration: totalDuration,
                    status: 'confirmed'
                }
            ])
            .select();

        if (dbError) {
            console.error('Database error:', dbError);
            throw new Error('Failed to store booking');
        }
        // Send notification to salon owner
        const resendClient = getResend();
        if (resendClient) {
            await resendClient.emails.send({
                from: `GentleCutx Bookings <${process.env.RESEND_FROM_EMAIL}>`,
                to: [process.env.SALON_EMAIL || 'info@gentlecutx.com'],
                subject: `New Booking: ${customer.name} - ${date}`,
                replyTo: customer.email || undefined,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
                    <div style="background-color: #1a1a2e; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                        <h1 style="color: #c4a265; margin: 0; font-size: 24px;">GentleCutx</h1>
                        <p style="color: #9ca3af; margin: 8px 0 0;">New Booking Received</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                        <h2 style="color: #1a1a2e; margin-top: 0;">Booking Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 120px;">Customer</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${customer.name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Phone</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${customer.phone}</td>
                            </tr>
                            ${customer.email ? `
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Email</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${customer.email}</td>
                            </tr>
                            ` : ''}
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Date</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${date}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Time</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${time}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Barber</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${barberName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Services</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${servicesList}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Duration</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #1a1a2e;">${totalDuration} min</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; color: #6b7280;">Total</td>
                                <td style="padding: 12px 0; font-weight: 700; color: #c4a265; font-size: 20px;">${totalPrice}&euro;</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `,
            });

            // Send confirmation to customer if they provided email
            if (customer.email) {
                await resendClient.emails.send({
                    from: `GentleCutx <${process.env.RESEND_FROM_EMAIL}>`,
                    to: [customer.email],
                    subject: 'Booking Confirmed - GentleCutx',
                    html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
                        <div style="background-color: #1a1a2e; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                            <h1 style="color: #c4a265; margin: 0; font-size: 24px;">GentleCutx</h1>
                            <p style="color: #9ca3af; margin: 8px 0 0;">Booking Confirmation</p>
                        </div>
                        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
                            <div style="text-align: center; margin-bottom: 24px;">
                                <div style="width: 60px; height: 60px; background-color: #dcfce7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                                    <span style="font-size: 28px;">&#10003;</span>
                                </div>
                                <h2 style="color: #1a1a2e; margin: 0;">Your Booking is Confirmed!</h2>
                                <p style="color: #6b7280; margin: 8px 0 0;">Thank you for choosing GentleCutx, ${customer.name}.</p>
                            </div>
                            <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Date</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1a1a2e; text-align: right;">${date}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Time</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1a1a2e; text-align: right;">${time}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Barber</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1a1a2e; text-align: right;">${barberName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Services</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #1a1a2e; text-align: right;">${servicesList}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #6b7280;">Total</td>
                                        <td style="padding: 10px 0; font-weight: 700; color: #c4a265; font-size: 20px; text-align: right;">${totalPrice}&euro;</td>
                                    </tr>
                                </table>
                            </div>
                            <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 20px;">
                                <p style="color: #1e40af; margin: 0; font-size: 14px;">
                                    Need to change or cancel? Call us at <strong>+383 49 619 080</strong> or reply to this email.
                                </p>
                            </div>
                            <div style="text-align: center;">
                                <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">Rruga Agim Ramadani, Prishtine, Kosove</p>
                                <p style="color: #6b7280; font-size: 14px; margin: 0;">+383 49 619 080</p>
                            </div>
                        </div>
                    </div>
                `,
                });
            }
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Booking error:', error);
        return res.status(500).json({ error: 'Failed to process booking' });
    }
}
