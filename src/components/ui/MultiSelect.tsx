'use client';

import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  columns?: 2 | 3 | 4;
}

export function MultiSelect({ options, value, onChange, columns = 2 }: MultiSelectProps) {
  function toggle(v: string) {
    if (value.includes(v)) {
      onChange(value.filter(x => x !== v));
    } else {
      onChange([...value, v]);
    }
  }

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridCols} gap-2`}>
      {options.map(opt => {
        const selected = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            aria-pressed={selected}
            className={cn(
              'flex items-center gap-2 px-3 py-2.5 rounded-2xl border-2 text-sm font-medium transition-all duration-150 min-h-touch text-start',
              selected
                ? 'border-th-primary bg-th-light text-gray-800 shadow-glow'
                : 'border-gray-200 bg-white text-gray-600 hover:border-th-dim hover:bg-th-light/50'
            )}
          >
            {opt.icon && <span className="text-xl leading-none flex-shrink-0">{opt.icon}</span>}
            <span className="leading-tight">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
