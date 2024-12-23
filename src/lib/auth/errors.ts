export class AuthError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'auth/invalid-credentials',
  EMAIL_NOT_VERIFIED: 'auth/email-not-verified',
  RESET_LINK_EXPIRED: 'auth/reset-link-expired',
  NETWORK_ERROR: 'auth/network-error',
  RATE_LIMITED: 'auth/rate-limited',
} as const;

export const getAuthErrorMessage = (error: Error): string => {
  if (error instanceof AuthError) {
    switch (error.code) {
      case AUTH_ERROR_CODES.INVALID_CREDENTIALS:
        return 'Invalid email or password';
      case AUTH_ERROR_CODES.EMAIL_NOT_VERIFIED:
        return 'Please verify your email address';
      case AUTH_ERROR_CODES.RESET_LINK_EXPIRED:
        return 'Password reset link has expired';
      case AUTH_ERROR_CODES.NETWORK_ERROR:
        return 'Network error. Please check your connection';
      case AUTH_ERROR_CODES.RATE_LIMITED:
        return 'Too many attempts. Please try again later';
      default:
        return 'An error occurred. Please try again';
    }
  }
  return error.message;
};