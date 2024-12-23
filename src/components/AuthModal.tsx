import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const navigate = useNavigate();
  const { signIn, signUp, resendConfirmation, resetPassword, error: authError, clearError } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    clearError();

    try {
      if (type === 'signup') {
        await signUp(formData.email, formData.password, formData.fullName);
        setSuccess('Please check your email for a confirmation link to complete your registration.');
      } else {
        await signIn(formData.email, formData.password);
        navigate('/dashboard');
        onClose();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      if (type === 'login') {
        setShowResetPassword(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(formData.email);
      setSuccess('Password reset instructions have been sent to your email.');
      setError('');
      setShowResetPassword(false);
    } catch (err) {
      setError('Failed to send reset password email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    try {
      await resendConfirmation(formData.email);
      setSuccess('A new confirmation email has been sent. Please check your inbox.');
      setError('');
    } catch (err) {
      setError('Failed to resend confirmation email. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {type === 'login' ? 'Login' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
            {error.includes('confirm your email') && (
              <button
                onClick={handleResendConfirmation}
                className="ml-2 text-red-700 underline hover:text-red-800"
              >
                Resend confirmation email
              </button>
            )}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Enter your email"
              required
            />
          </div>

          {type === 'signup' && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          {!showResetPassword && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                placeholder="Enter your password"
                required
              />
            </div>
          )}

          {showResetPassword ? (
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Sending Reset Instructions...
                </>
              ) : (
                'Send Password Reset Instructions'
              )}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  {type === 'login' ? 'Logging in...' : 'Creating account...'}
                </>
              ) : (
                type === 'login' ? 'Login' : 'Sign Up'
              )}
            </button>
          )}
        </form>

        {type === 'login' && !showResetPassword && (
          <button
            onClick={() => setShowResetPassword(true)}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
          >
            Forgot your password?
          </button>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          {type === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  clearError();
                  navigate('/signup');
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => {
                  clearError();
                  navigate('/login');
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}