import { z } from 'zod';

const envSchema = z.object({
  supabase: z.object({
    url: z.string().url(),
    anonKey: z.string().min(1),
  }),
  openai: z.object({
    apiKey: z.string().min(1),
  }),
  app: z.object({
    env: z.enum(['development', 'production', 'test']),
    apiTimeout: z.number().positive(),
  }),
});

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

function loadEnvConfig() {
  const config = {
    supabase: {
      url: getEnvVar('VITE_SUPABASE_URL'),
      anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
    },
    openai: {
      apiKey: getEnvVar('VITE_OPENAI_API_KEY'),
    },
    app: {
      env: import.meta.env.MODE,
      apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
    },
  };

  return envSchema.parse(config);
}

export const config = loadEnvConfig();