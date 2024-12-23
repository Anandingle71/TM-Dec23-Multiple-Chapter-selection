import React from 'react';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps {
  loading: boolean;
  text: string;
  loadingText: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function AuthButton({ 
  loading, 
  text, 
  loadingText, 
  onClick, 
  type = 'submit' 
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}