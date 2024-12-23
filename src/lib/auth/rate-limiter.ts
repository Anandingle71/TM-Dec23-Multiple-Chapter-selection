interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
}

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

class RateLimiter {
  private attempts: Map<string, RateLimitEntry>;

  constructor() {
    this.attempts = new Map();
  }

  checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const entry = this.attempts.get(identifier);

    if (!entry) {
      this.attempts.set(identifier, { attempts: 1, lastAttempt: now });
      return true;
    }

    if (now - entry.lastAttempt > RATE_LIMIT_WINDOW) {
      this.attempts.set(identifier, { attempts: 1, lastAttempt: now });
      return true;
    }

    if (entry.attempts >= MAX_ATTEMPTS) {
      return false;
    }

    this.attempts.set(identifier, {
      attempts: entry.attempts + 1,
      lastAttempt: now,
    });
    return true;
  }

  resetAttempts(identifier: string): void {
    this.attempts.delete(identifier);
  }

  getRemainingAttempts(identifier: string): number {
    const entry = this.attempts.get(identifier);
    if (!entry) return MAX_ATTEMPTS;
    return Math.max(0, MAX_ATTEMPTS - entry.attempts);
  }
}

export const rateLimiter = new RateLimiter();