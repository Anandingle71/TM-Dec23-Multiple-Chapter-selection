export class OpenAIError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export function handleOpenAIError(error: unknown): never {
  if (error instanceof Error) {
    // Handle specific OpenAI error cases
    if ('status' in error) {
      const status = (error as any).status;
      switch (status) {
        case 401:
          throw new OpenAIError(
            'Invalid OpenAI API key. Please check your configuration.',
            'INVALID_API_KEY',
            status
          );
        case 429:
          throw new OpenAIError(
            'OpenAI rate limit exceeded. Please try again later.',
            'RATE_LIMIT',
            status
          );
        case 500:
          throw new OpenAIError(
            'OpenAI service error. Please try again later.',
            'SERVICE_ERROR',
            status
          );
        case 503:
          throw new OpenAIError(
            'OpenAI service is temporarily unavailable. Please try again later.',
            'SERVICE_UNAVAILABLE',
            status
          );
      }
    }

    // Handle timeout errors
    if (error.name === 'AbortError') {
      throw new OpenAIError(
        'Request timed out. Please try again with simpler requirements.',
        'TIMEOUT'
      );
    }

    throw new OpenAIError(error.message);
  }

  throw new OpenAIError('An unexpected error occurred');
}