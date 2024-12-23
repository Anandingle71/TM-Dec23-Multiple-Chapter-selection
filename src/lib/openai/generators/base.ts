import type { ChatCompletionCreateParams } from 'openai/resources/chat';
import { openai } from '../client';
import { handleOpenAIError } from '../errors';
import { API_CONFIG } from '../../../config/constants';

export interface GeneratorOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  retryAttempts?: number;
  timeout?: number;
}

const DEFAULT_OPTIONS: Required<GeneratorOptions> = {
  temperature: 0.7,
  maxTokens: 1000,
  model: 'gpt-4o',
  retryAttempts: API_CONFIG.RETRY_ATTEMPTS,
  timeout: API_CONFIG.TIMEOUT_MS
};

export async function generateContent(
  messages: ChatCompletionCreateParams.Message[],
  options: GeneratorOptions = {}
): Promise<string> {
  const { temperature, maxTokens, model, retryAttempts, timeout } = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= retryAttempts; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        messages,
        model,
        temperature,
        max_tokens: maxTokens,
        stream: false
      }, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.choices[0].message.content || '';
    } catch (error) {
      lastError = error as Error;
      if (attempt === retryAttempts) break;
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY_MS * attempt));
    }
  }

  clearTimeout(timeoutId);
  throw handleOpenAIError(lastError);
}