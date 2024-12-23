import { AuthProvider } from '../types';
import { validateEmail, validatePassword } from '../validation';
import { rateLimiter } from '../rate-limiter';
import { AuthError, AUTH_ERROR_CODES } from '../errors';

export class AuthService {
  constructor(private provider: AuthProvider) {}

  async signUp(email: string, password: string, fullName: string) {
    const emailErrors = validateEmail(email);
    if (emailErrors.length > 0) {
      throw new AuthError(emailErrors[0], 'auth/invalid-email');
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      throw new AuthError(passwordErrors[0], 'auth/weak-password');
    }

    return this.provider.signUp(email, password, { full_name: fullName });
  }

  async signIn(email: string, password: string) {
    if (!rateLimiter.checkRateLimit(email)) {
      throw new AuthError('Too many login attempts', AUTH_ERROR_CODES.RATE_LIMITED);
    }

    try {
      const response = await this.provider.signIn(email, password);
      rateLimiter.resetAttempts(email);
      return response;
    } catch (error) {
      if (error instanceof AuthError) throw error;
      throw new AuthError('Network error', AUTH_ERROR_CODES.NETWORK_ERROR);
    }
  }

  async resetPassword(email: string) {
    const emailErrors = validateEmail(email);
    if (emailErrors.length > 0) {
      throw new AuthError(emailErrors[0], 'auth/invalid-email');
    }

    return this.provider.resetPassword(email);
  }

  async updatePassword(newPassword: string) {
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      throw new AuthError(passwordErrors[0], 'auth/weak-password');
    }

    return this.provider.updatePassword(newPassword);
  }

  async signOut() {
    return this.provider.signOut();
  }
}