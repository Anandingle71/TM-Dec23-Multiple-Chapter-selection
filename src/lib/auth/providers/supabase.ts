import { supabase } from '../../supabase/client';
import { AuthError } from '../errors';
import type { AuthProvider, AuthResponse } from './base';

export class SupabaseAuthProvider implements AuthProvider {
  private getRedirectUrl(path: string): string {
    return `${window.location.origin}${path}`;
  }

  async signUp(email: string, password: string, userData: Record<string, any>): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: this.getRedirectUrl('/auth/callback'),
      },
    });

    if (error) throw new AuthError(error.message, 'auth/signup-failed');
    return { user: data.user };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        throw new AuthError('Please verify your email', 'auth/email-not-verified');
      }
      throw new AuthError('Invalid credentials', 'auth/invalid-credentials');
    }

    return { user: data.user, session: data.session };
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: this.getRedirectUrl('/auth/reset-password'),
    });

    if (error) throw new AuthError(error.message, 'auth/reset-failed');
  }

  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw new AuthError(error.message, 'auth/update-failed');
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError(error.message, 'auth/signout-failed');
  }
}