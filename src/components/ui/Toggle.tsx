'use client';

import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export function Toggle({ checked, onChange, label, description, disabled, id }: ToggleProps) {
  const toggleId = id ?? 'toggle';

  return (
    <label
      htmlFor={toggleId}
      className={cn(
        'flex items-start gap-4 cursor-pointer p-4 rounded-2xl transition-colors',
        checked ? 'bg-th-light' : 'bg-gray-50 hover:bg-gray-100',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="flex-1 min-w-0">
        {label && (
          <p className={cn('font-semibold text-gray-800', checked && 'text-th-dark')}>
            {label}
          </p>
        )}
        {description && (
          <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0 mt-0.5">
        <button
          role="switch"
          id={toggleId}
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          type="button"
          className={cn(
            'relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-th-primary focus-visible:ring-offset-2',
            checked ? 'bg-th-primary' : 'bg-gray-300'
          )}
        >
          <span
            className={cn(
              'inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200',
              checked
                ? 'ltr:translate-x-6 rtl:-translate-x-6'
                : 'ltr:translate-x-1 rtl:-translate-x-1'
            )}
          />
        </button>
      </div>
    </label>
  );
}
