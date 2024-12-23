import { SupabaseAuthProvider } from './providers/supabase';
import { AuthService } from './services/AuthService';

const authProvider = new SupabaseAuthProvider();
export const authService = new AuthService(authProvider);

export * from './types';
export * from './errors';
export * from './validation';
export * from './session';