import { z } from 'zod';
import { AUTH_CONFIG } from '../../config/constants';

const { PASSWORD_RULES } = AUTH_CONFIG;

// Email validation
export function validateEmail(email: string): string[] {
  const schema = z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email is too short')
    .max(254, 'Email is too long');

  const result = schema.safeParse(email);
  return result.success ? [] : [result.error.errors[0].message];
}

// Password validation
export function validatePassword(password: string): string[] {
  const errors: string[] = [];
  
  if (password.length < PASSWORD_RULES.MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`);
  }
  if (PASSWORD_RULES.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (PASSWORD_RULES.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (PASSWORD_RULES.REQUIRE_NUMBER && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (PASSWORD_RULES.REQUIRE_SPECIAL && !/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return errors;
}

// Auth validation schemas
export const authSchemas = {
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email is too short')
    .max(254, 'Email is too long'),

  password: z.string()
    .min(PASSWORD_RULES.MIN_LENGTH, `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  fullName: z.string()
    .min(2, 'Name is too short')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
};

// Validation functions for different auth operations
export const validateAuth = {
  signup: (data: { email: string; password: string; fullName: string }) => {
    return z.object({
      email: authSchemas.email,
      password: authSchemas.password,
      fullName: authSchemas.fullName
    }).parse(data);
  },

  login: (data: { email: string; password: string }) => {
    return z.object({
      email: authSchemas.email,
      password: z.string().min(1, 'Password is required')
    }).parse(data);
  },

  resetPassword: (data: { email: string }) => {
    return z.object({
      email: authSchemas.email
    }).parse(data);
  }
};