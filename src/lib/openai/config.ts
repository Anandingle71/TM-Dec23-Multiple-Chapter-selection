import { z } from 'zod';

const openAIConfigSchema = z.object({
  apiKey: z.string().min(1, 'OpenAI API key is required'),
  options: z.object({
    timeout: z.number().positive(),
    maxRetries: z.number().positive(),
    dangerouslyAllowBrowser: z.boolean()
  })
});

function getEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing OpenAI configuration: ${name}`);
  }
  return value.trim();
}

export const openaiConfig = {
  apiKey: getEnvVar('VITE_OPENAI_API_KEY'),
  options: {
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
    maxRetries: 3,
    dangerouslyAllowBrowser: true
  }
};

export function validateOpenAIConfig() {
  try {
    return openAIConfigSchema.parse(openaiConfig);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid OpenAI configuration: ${error.errors[0].message}`);
    }
    throw error;
  }
}