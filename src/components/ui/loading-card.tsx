import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface LoadingCardProps {
  className?: string;
  spinnerSize?: 'small' | 'medium' | 'large';
}

const LoadingCard: React.FC<LoadingCardProps> = ({
  className,
  spinnerSize = 'medium'
}) => {
  return (
    <Card className={cn("bg-app-card/80 border border-gray-700/50 shadow-lg backdrop-blur-sm", className)}>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <LoadingSpinner size={spinnerSize} />
      </CardContent>
    </Card>
  );
};

export default LoadingCard;