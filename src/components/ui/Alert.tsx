import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../../utils/styles';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

const variants = {
  info: {
    icon: Info,
    styles: 'bg-blue-50 text-blue-700 border-blue-400'
  },
  success: {
    icon: CheckCircle,
    styles: 'bg-green-50 text-green-700 border-green-400'
  },
  warning: {
    icon: AlertCircle,
    styles: 'bg-yellow-50 text-yellow-700 border-yellow-400'
  },
  error: {
    icon: XCircle,
    styles: 'bg-red-50 text-red-700 border-red-400'
  }
};

export function Alert({ children, variant = 'info', className }: AlertProps) {
  const { icon: Icon, styles } = variants[variant];

  return (
    <div className={cn('p-4 border-l-4 rounded-r-md flex items-start', styles, className)}>
      <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
}