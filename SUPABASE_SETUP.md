# Supabase Database Setup Guide

## Overview
This guide explains how to set up the Supabase database for the GentleCutx booking system.

## Prerequisites
- Supabase account (already configured)
- Access to Supabase SQL Editor

## Database Setup

### Step 1: Run the SQL Schema
1. Log in to your Supabase dashboard at https://supabase.com
2. Navigate to your project: `dtxfhcrupwsbzxfgcrsf`
3. Go to the SQL Editor (left sidebar)
4. Copy and paste the contents of `supabase-schema.sql` into the editor
5. Click "Run" to execute the SQL commands

This will:
- Create the `bookings` table with all necessary columns
- Set up indexes for optimal query performance
- Enable Row Level Security (RLS)
- Create policies for public read/insert and authenticated update/delete

### Step 2: Verify Table Creation
1. Go to "Table Editor" in the Supabase dashboard
2. You should see a new table called `bookings`
3. Verify the following columns exist:
   - `id` (UUID, primary key)
   - `customer_name` (VARCHAR)
   - `customer_phone` (VARCHAR)
   - `customer_email` (VARCHAR, nullable)
   - `booking_date` (DATE)
   - `booking_time` (VARCHAR)
   - `barber_id` (INTEGER, nullable)
   - `barber_name` (VARCHAR)
   - `services` (JSONB)
   - `total_price` (DECIMAL)
   - `total_duration` (INTEGER)
   - `status` (VARCHAR)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

## Environment Variables
The following environment variables are already configured in `.env`:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Public anonymous key (safe for client-side)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-side only, never expose to client)

## How It Works

### Booking Flow
1. **Client selects services, barber, date, and time**
2. **System checks availability** via `/api/availability` endpoint
   - Queries database for existing bookings on selected date
   - Filters by barber if specific barber is selected
   - Returns booked time slots with durations
3. **Client submits booking** via `/api/booking` endpoint
   - Stores booking in Supabase database
   - Sends confirmation emails via Resend
4. **Time slots update automatically**
   - Booked slots are no longer shown to other clients
   - Duration-based blocking prevents overlapping appointments

### Availability Checking
The system uses intelligent slot blocking:
- If a 60-minute service is booked at 10:00, slots from 10:00-11:00 are blocked
- If "Any Available Barber" is selected, all barbers' bookings are considered
- If a specific barber is selected, only that barber's bookings are checked

## Database Policies
The table has Row Level Security enabled with the following policies:
- **Public Read**: Anyone can view bookings (needed for availability checking)
- **Public Insert**: Anyone can create bookings (needed for booking submission)
- **Authenticated Update/Delete**: Only authenticated users can modify/delete bookings

## Monitoring Bookings
To view all bookings in Supabase:
1. Go to "Table Editor"
2. Select the `bookings` table
3. You'll see all bookings with full details

To query bookings via SQL:
```sql
-- View all confirmed bookings
SELECT * FROM bookings WHERE status = 'confirmed' ORDER BY booking_date, booking_time;

-- View bookings for a specific date
SELECT * FROM bookings WHERE booking_date = '2024-02-15';

-- View bookings for a specific barber
SELECT * FROM bookings WHERE barber_id = 1;
```

## Troubleshooting

### Issue: Bookings not saving
- Check that the SQL schema was executed successfully
- Verify environment variables are set correctly
- Check browser console for errors
- Verify Supabase service role key has correct permissions

### Issue: Time slots not updating
- Clear browser cache
- Check that `/api/availability` endpoint is returning data
- Verify date format is correct (YYYY-MM-DD)

### Issue: All slots showing as unavailable
- Check that bookings table has correct data
- Verify barber_id matches between bookings and barber selection
- Check total_duration calculation in BookingSystem component

## Next Steps
Consider implementing:
- Admin dashboard to manage bookings
- Booking cancellation/modification
- SMS notifications via Twilio
- Calendar integration
- Booking reminders
- Analytics dashboard
