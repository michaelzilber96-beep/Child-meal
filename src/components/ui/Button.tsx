'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-th-primary hover:bg-th-dark active:bg-th-darker text-white shadow-soft disabled:bg-th-dim disabled:text-white/70',
  secondary:
    'bg-peach-soft hover:bg-orange-300 active:bg-orange-400 text-orange-900 shadow-soft disabled:bg-orange-100',
  ghost:
    'bg-transparent hover:bg-th-light active:bg-th-dim/50 text-gray-700 disabled:text-gray-300',
  outline:
    'bg-white border-2 border-th-primary hover:bg-th-light active:bg-th-dim/30 text-th-dark disabled:border-th-dim disabled:text-th-dim',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm rounded-xl min-h-touch',
  md: 'px-5 py-3 text-base rounded-2xl min-h-touch',
  lg: 'px-7 py-4 text-lg rounded-3xl min-h-touch',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-th-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed select-none',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
