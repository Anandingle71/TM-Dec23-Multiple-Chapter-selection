import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Load environment variables with validation
function getEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
  return value.trim();
}

// Supabase configuration
export const supabaseConfig = {
  url: getEnvVar('VITE_SUPABASE_URL'),
  anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' as const
  }
};

// Create Supabase client
export function createSupabaseClient() {
  return createClient<Database>(
    supabaseConfig.url,
    supabaseConfig.anonKey,
    { auth: supabaseConfig.auth }
  );
}