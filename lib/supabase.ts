import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser client (for reads / public operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server client with service role (for RSVP writes — server-side only)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// SQL to create the RSVP table (run once in Supabase SQL editor):
/*
CREATE TABLE rsvp_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  num_guests INTEGER DEFAULT 1,
  meal_preference TEXT,
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);
*/
