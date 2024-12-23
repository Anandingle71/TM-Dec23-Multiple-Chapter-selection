import OpenAI from 'openai';
import { openaiConfig, validateOpenAIConfig } from './config';

function createOpenAIClient(): OpenAI {
  const config = validateOpenAIConfig();
  
  return new OpenAI({
    apiKey: config.apiKey,
    ...config.options
  });
}

export const openai = createOpenAIClient();