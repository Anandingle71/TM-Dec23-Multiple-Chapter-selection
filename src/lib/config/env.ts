interface EnvConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  openai: {
    apiKey: string;
  };
}

function requireEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. Please check your .env file.`);
  }
  return value.trim();
}

export const config: EnvConfig = {
  supabase: {
    url: requireEnvVar('VITE_SUPABASE_URL'),
    anonKey: requireEnvVar('VITE_SUPABASE_ANON_KEY'),
  },
  openai: {
    apiKey: requireEnvVar('VITE_OPENAI_API_KEY'),
  },
} as const;