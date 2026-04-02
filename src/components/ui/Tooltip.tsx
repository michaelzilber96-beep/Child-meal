'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: ReactNode;
  children?: ReactNode;
  /** Side relative to the trigger — 'top' is default */
  side?: 'top' | 'bottom';
  className?: string;
}

/**
 * Accessible tooltip — shows on hover (desktop) and tap (mobile).
 * Closes when clicking outside or pressing Escape.
 */
export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn('relative inline-flex items-center', className)}>
      {/* Trigger */}
      <button
        type="button"
        aria-expanded={open}
        aria-label="More information"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 hover:bg-th-dim text-gray-600 hover:text-th-dark text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-th-primary flex-shrink-0"
      >
        i
      </button>

      {/* Bubble */}
      {open && (
        <div
          role="tooltip"
          className={cn(
            'tooltip-content absolute z-50 w-64 rounded-2xl bg-gray-800 text-white text-xs leading-relaxed p-3 shadow-card',
            'start-0',
            side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              'absolute start-4 w-2 h-2 bg-gray-800 rotate-45',
              side === 'top' ? 'top-full -translate-y-1' : 'bottom-full translate-y-1'
            )}
          />
        </div>
      )}

      {/* Optional label child */}
      {children}
    </div>
  );
}

/** Convenience: info icon with a label beside it */
export function InfoTooltip({
  label,
  content,
  className,
}: {
  label: ReactNode;
  content: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span>{label}</span>
      <Tooltip content={content} />
    </span>
  );
}
