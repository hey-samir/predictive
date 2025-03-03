import { Card } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { cn } from "@/lib/utils"

interface LoadingCardProps {
  className?: string;
  spinnerSize?: 'small' | 'medium' | 'large';
}

export function LoadingCard({ className, spinnerSize = 'medium' }: LoadingCardProps) {
  return (
    <Card className={cn("flex items-center justify-center p-8", className)}>
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size={spinnerSize} />
        <p className="text-app-text-secondary text-sm">Loading data...</p>
      </div>
    </Card>
  )
}