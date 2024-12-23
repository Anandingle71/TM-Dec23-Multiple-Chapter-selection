function requireEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value.trim();
}

export const config = {
  supabase: {
    url: requireEnvVar('VITE_SUPABASE_URL'),
    anonKey: requireEnvVar('VITE_SUPABASE_ANON_KEY'),
  },
} as const;