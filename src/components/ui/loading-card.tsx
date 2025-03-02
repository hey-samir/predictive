import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface LoadingCardProps {
  title?: string;
  message?: string;
  className?: string;
  spinnerSize?: 'small' | 'medium' | 'large';
}

const LoadingCard: React.FC<LoadingCardProps> = ({
  title,
  message = 'Loading data...',
  className,
  spinnerSize = 'medium'
}) => {
  return (
    <Card className={cn("bg-app-card/80 border border-gray-700/50 shadow-lg backdrop-blur-sm", className)}>
      <CardContent className="flex flex-col items-center justify-center py-8">
        {title && (
          <h3 className="text-lg font-medium text-app-purple mb-4">{title}</h3>
        )}
        <LoadingSpinner size={spinnerSize} message={message} />
      </CardContent>
    </Card>
  );
};

export default LoadingCard;