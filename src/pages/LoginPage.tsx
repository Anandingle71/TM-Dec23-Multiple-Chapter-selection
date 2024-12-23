import React from 'react';
import { AuthModal } from '../components/AuthModal';

interface LoginPageProps {
  type: 'login' | 'signup';
}

function LoginPage({ type }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <AuthModal isOpen={true} onClose={() => {}} type={type} />
    </div>
  );
}

export default LoginPage;