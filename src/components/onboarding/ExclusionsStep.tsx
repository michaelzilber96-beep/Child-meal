'use client';

import { useTranslations } from 'next-intl';
import { FoodExclusion } from '@/types';
import { cn } from '@/lib/utils';

const EXCLUSION_OPTIONS: { value: FoodExclusion; icon: string; key: string }[] = [
  { value: 'meat',        icon: '🥩', key: 'meat'        },
  { value: 'poultry',     icon: '🍗', key: 'poultry'     },
  { value: 'fish',        icon: '🐟', key: 'fish'        },
  { value: 'addedSugar',  icon: '🍬', key: 'addedSugar'  },
  { value: 'vegetarian',  icon: '🥦', key: 'vegetarian'  },
  { value: 'vegan',       icon: '🌱', key: 'vegan'       },
];

interface ExclusionsStepProps {
  selected: FoodExclusion[];
  onChange: (exclusions: FoodExclusion[]) => void;
}

export function ExclusionsStep({ selected, onChange }: ExclusionsStepProps) {
  const t = useTranslations('exclusions');
  const to = useTranslations('onboarding');

  function toggle(v: FoodExclusion) {
    if (selected.includes(v)) {
      // Deselect: also remove implied expansions
      onChange(selected.filter(x => x !== v));
    } else {
      // "vegetarian" implies meat+poultry+fish, but we store only the label
      // "vegan" supercedes vegetarian
      let next = [...selected, v];
      if (v === 'vegan') next = next.filter(x => x !== 'vegetarian');
      if (v === 'vegetarian') next = next.filter(x => x !== 'vegan');
      onChange(next);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {EXCLUSION_OPTIONS.map(opt => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              aria-pressed={isSelected}
              className={cn(
                'flex items-center gap-2.5 px-3 py-3 rounded-2xl border-2 text-sm font-medium transition-all min-h-touch text-start',
                isSelected
                  ? 'border-th-primary bg-th-light text-gray-800 shadow-glow'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-th-dim hover:bg-th-light/50'
              )}
            >
              <span className="text-2xl leading-none flex-shrink-0">{opt.icon}</span>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold leading-tight">{t(opt.key as 'meat')}</span>
                <span className="text-xs text-gray-400 leading-tight">{t(`${opt.key}Desc` as 'meatDesc')}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selected.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-1">
          {to('step5None')} ✓
        </p>
      )}
    </div>
  );
}
