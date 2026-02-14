-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    booking_date DATE NOT NULL,
    booking_time VARCHAR(10) NOT NULL,
    barber_id INTEGER,
    barber_name VARCHAR(255),
    services JSONB NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    total_duration INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(booking_date, booking_time);
CREATE INDEX IF NOT EXISTS idx_bookings_barber ON bookings(barber_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for checking availability)
CREATE POLICY "Allow public read access" ON bookings
    FOR SELECT
    USING (true);

-- Create policy to allow public insert (for creating bookings)
CREATE POLICY "Allow public insert" ON bookings
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow authenticated users to update/delete
CREATE POLICY "Allow authenticated users to update" ON bookings
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete" ON bookings
    FOR DELETE
    USING (auth.role() = 'authenticated');
