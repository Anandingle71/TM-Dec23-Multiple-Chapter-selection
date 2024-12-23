import { AUTH_CONFIG } from '../../config/constants';

const { RATE_LIMIT } = AUTH_CONFIG;

class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }>;

  constructor() {
    this.attempts = new Map();
  }

  checkLimit(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (now - attempt.timestamp > RATE_LIMIT.WINDOW_MINUTES * 60 * 1000) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (attempt.count >= RATE_LIMIT.MAX_ATTEMPTS) {
      return false;
    }

    this.attempts.set(identifier, {
      count: attempt.count + 1,
      timestamp: attempt.timestamp
    });
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }

  getRemainingAttempts(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return RATE_LIMIT.MAX_ATTEMPTS;
    return Math.max(0, RATE_LIMIT.MAX_ATTEMPTS - attempt.count);
  }
}

export const rateLimiter = new RateLimiter();