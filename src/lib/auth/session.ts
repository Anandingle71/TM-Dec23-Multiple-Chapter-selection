import { supabase } from '../supabase/client';
import type { Session } from './providers/base';

export async function getSession(): Promise<Session | null> {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

export async function refreshSession(): Promise<Session | null> {
  const { data: { session }, error } = await supabase.auth.refreshSession();
  if (error) throw error;
  return session;
}

export function clearSession(): void {
  localStorage.removeItem('supabase.auth.token');
}