import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: Error;
  onRetry?: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {error.name === 'OpenAIError' ? 'Generation Error' : 'Error'}
          </h3>
          <p className="mt-1 text-sm text-red-700">{error.message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}