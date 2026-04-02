import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
}

export function Card({ padded = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl shadow-card',
        padded && 'p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
