import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  message = 'Loading...',
  className
}) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-10 w-10 border-3',
    large: 'h-16 w-16 border-4'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-t-transparent border-purple-500",
          sizeClasses[size]
        )}
        aria-label="Loading"
      />
      {message && (
        <p className="mt-4 text-gray-300 font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;