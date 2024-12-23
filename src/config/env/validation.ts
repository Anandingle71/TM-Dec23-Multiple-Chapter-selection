export function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
  return value.trim();
}

export function validateConfig(config: Record<string, any>): void {
  // Validate Supabase config
  if (!config.supabase?.url || !config.supabase?.anonKey) {
    throw new Error(
      'Invalid Supabase configuration.\n' +
      'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
    );
  }

  // Validate OpenAI config
  if (!config.openai?.apiKey) {
    throw new Error(
      'Invalid OpenAI configuration.\n' +
      'Please ensure VITE_OPENAI_API_KEY is set in your .env file.'
    );
  }

  // Validate app config
  if (typeof config.app?.apiTimeout !== 'number') {
    throw new Error(
      'Invalid API timeout configuration.\n' +
      'Please ensure VITE_API_TIMEOUT is set to a valid number in your .env file.'
    );
  }
}