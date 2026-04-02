'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full space-y-2">
      {label && (
        <p className="text-xs text-gray-500 text-center">{label}</p>
      )}
      {/* Dot indicators — RTL-aware via flex-row-reverse */}
      <div className="flex items-center justify-center gap-2 rtl:flex-row-reverse">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            aria-current={i + 1 === current ? 'step' : undefined}
            className={cn(
              'rounded-full transition-all duration-300',
              i + 1 < current
                ? 'w-2 h-2 bg-th-primary'
                : i + 1 === current
                ? 'w-3 h-3 bg-th-primary ring-4 ring-th-light'
                : 'w-2 h-2 bg-gray-200'
            )}
          />
        ))}
      </div>
      {/* Progress bar — RTL flips gradient direction */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out rtl:ms-auto"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(to right, var(--th-primary), var(--th-accent))',
          }}
        />
      </div>
    </div>
  );
}
