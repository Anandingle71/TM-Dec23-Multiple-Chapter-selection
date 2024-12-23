import { supabase } from '../supabase';
import { AuthError, AUTH_ERROR_CODES } from './errors';
import { rateLimiter } from './rate-limiter';
import { validateEmail, validatePassword } from './validation';
import type { AuthResponse } from './types';

export async function signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
  const emailErrors = validateEmail(email);
  if (emailErrors.length > 0) {
    throw new AuthError(emailErrors[0], 'auth/invalid-email');
  }

  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    throw new AuthError(passwordErrors[0], 'auth/weak-password');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw new AuthError(error.message, 'auth/signup-failed');
  return { user: data.user };
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  if (!rateLimiter.checkRateLimit(email)) {
    throw new AuthError('Too many login attempts', AUTH_ERROR_CODES.RATE_LIMITED);
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        throw new AuthError('Please verify your email address', AUTH_ERROR_CODES.EMAIL_NOT_VERIFIED);
      }
      throw new AuthError('Invalid email or password', AUTH_ERROR_CODES.INVALID_CREDENTIALS);
    }

    rateLimiter.resetAttempts(email);
    return { user: data.user };
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('Network error', AUTH_ERROR_CODES.NETWORK_ERROR);
  }
}

export async function resetPassword(email: string): Promise<void> {
  const emailErrors = validateEmail(email);
  if (emailErrors.length > 0) {
    throw new AuthError(emailErrors[0], 'auth/invalid-email');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw new AuthError(error.message, 'auth/reset-failed');
}

export async function updatePassword(newPassword: string): Promise<void> {
  const passwordErrors = validatePassword(newPassword);
  if (passwordErrors.length > 0) {
    throw new AuthError(passwordErrors[0], 'auth/weak-password');
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) throw new AuthError(error.message, 'auth/update-failed');
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new AuthError(error.message, 'auth/signout-failed');
}

export async function resendConfirmation(email: string): Promise<void> {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  if (error) throw new AuthError(error.message, 'auth/resend-failed');
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw new AuthError(error.message, 'auth/get-user-failed');
  return user;
}