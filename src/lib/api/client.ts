import { API_CONFIG } from '../../config/constants';

interface RequestOptions extends RequestInit {
  timeout?: number;
}

class APIClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string, timeout = API_CONFIG.TIMEOUT_MS) {
    this.baseURL = baseURL;
    this.defaultTimeout = timeout;
  }

  private async fetchWithTimeout(url: string, options: RequestOptions = {}) {
    const { timeout = this.defaultTimeout, ...fetchOptions } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } finally {
      clearTimeout(id);
    }
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'GET'
    });
    return response.json();
  }

  async post<T>(endpoint: string, data: unknown, options?: RequestOptions): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}