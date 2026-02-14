import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || 'https://dtxfhcrupwsbzxfgcrsf.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0eGZoY3J1cHdzYnp4ZmdjcnNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA5ODQ2NywiZXhwIjoyMDg2Njc0NDY3fQ.KtbG3HutZrCkcPV1o8NL0WnQ_X99CFrnvQNKTe9FDEU'
);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { date, barberId } = req.query;

    if (!date) {
        return res.status(400).json({ error: 'Date is required' });
    }

    try {
        let query = supabase
            .from('bookings')
            .select('booking_time, barber_id, total_duration')
            .eq('booking_date', date)
            .eq('status', 'confirmed');

        if (barberId && barberId !== 'null') {
            query = query.eq('barber_id', parseInt(barberId));
        }

        const { data: bookings, error } = await query;

        if (error) {
            console.error('Database error:', error);
            throw new Error('Failed to fetch bookings');
        }

        const bookedSlots = bookings.map(booking => ({
            time: booking.booking_time,
            barberId: booking.barber_id,
            duration: booking.total_duration
        }));

        return res.status(200).json({ bookedSlots });
    } catch (error) {
        console.error('Error fetching availability:', error);
        return res.status(500).json({ error: 'Failed to fetch availability' });
    }
}
