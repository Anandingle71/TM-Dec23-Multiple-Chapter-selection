export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown): never {
  if (error instanceof APIError) {
    throw error;
  }
  
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout', undefined, 'TIMEOUT');
    }
    throw new APIError(error.message);
  }
  
  throw new APIError('An unexpected error occurred');
}