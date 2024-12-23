import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: Error;
  onRetry?: () => void;
  showConfig?: boolean;
}

export function ErrorDisplay({ error, onRetry, showConfig }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">
            {showConfig ? 'Configuration Error' : 'Something went wrong'}
          </h2>
        </div>
        
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <p className="text-sm text-red-700">
            {error.message}
            {showConfig && (
              <ul className="list-disc ml-4 mt-2">
                <li>Check that your .env file exists</li>
                <li>Verify all required variables are set</li>
                <li>Ensure variable values are correct</li>
                <li>Restart the development server</li>
              </ul>
            )}
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}