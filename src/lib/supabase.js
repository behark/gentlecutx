import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dtxfhcrupwsbzxfgcrsf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0eGZoY3J1cHdzYnp4ZmdjcnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTg0NjcsImV4cCI6MjA4NjY3NDQ2N30.LpJHyhtoTAHyC92NGYVxxpH2d6Fu208wQKoVswJROOQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
