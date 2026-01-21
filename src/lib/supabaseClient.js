import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables in development
if (!supabaseUrl || !supabaseAnonKey) {
  const missingVars = [];
  if (!supabaseUrl) missingVars.push('VITE_SUPABASE_URL');
  if (!supabaseAnonKey) missingVars.push('VITE_SUPABASE_ANON_KEY');

  const errorMsg = `Missing required Supabase environment variables: ${missingVars.join(', ')}. 
Please check your .env file and ensure both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.`;

  if (import.meta.env.DEV) {
    console.error(errorMsg);
  } else {
    throw new Error(errorMsg);
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
