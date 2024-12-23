export interface AuthProvider {
  signUp(email: string, password: string, userData: Record<string, any>): Promise<AuthResponse>;
  signIn(email: string, password: string): Promise<AuthResponse>;
  resetPassword(email: string): Promise<void>;
  updatePassword(newPassword: string): Promise<void>;
  signOut(): Promise<void>;
}

export interface AuthResponse {
  user: User | null;
  session?: Session | null;
}

export interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
}

export interface Session {
  access_token: string;
  expires_at: number;
}