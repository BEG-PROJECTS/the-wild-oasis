

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://tnbeuixdpugazowbzdel.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuYmV1aXhkcHVnYXpvd2J6ZGVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNzQyNjIsImV4cCI6MjAxODg1MDI2Mn0.ewdsZ5eD1LzoiBG4hE-5Ctb_OJ9LWPg5FejoXXMyizA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;