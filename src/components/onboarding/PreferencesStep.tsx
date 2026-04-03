'use client';

import { useTranslations } from 'next-intl';
import { CuisineRegion } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const CUISINES: CuisineRegion[] = [
  'mediterranean',
  'asian',
  'european',
  'middleEastern',
  'latinAmerican',
  'african',
  'israeli',
];

interface PreferencesStepProps {
  selected: CuisineRegion[];
  onChange: (cuisines: CuisineRegion[]) => void;
}

export function PreferencesStep({ selected, onChange }: PreferencesStepProps) {
  const t = useTranslations('cuisines');
  const to = useTranslations('onboarding');

  function toggle(c: CuisineRegion) {
    if (selected.includes(c)) {
      onChange(selected.filter(x => x !== c));
    } else {
      onChange([...selected, c]);
    }
  }

  function selectAll() {
    onChange([...CUISINES]);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {CUISINES.map(c => {
          const label = t(c);
          const parts = label.split(' ');
          const emoji = parts[0];
          const name = parts.slice(1).join(' ');
          const isSelected = selected.includes(c);

          return (
            <button
              key={c}
              type="button"
              onClick={() => toggle(c)}
              aria-pressed={isSelected}
              className={cn(
                'flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all min-h-touch',
                isSelected
                  ? 'border-th-primary bg-th-light text-th-dark shadow-glow'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-th-dim hover:bg-th-light/50'
              )}
            >
              <span className="text-3xl">{emoji}</span>
              <span className="text-xs font-semibold text-center leading-tight">{name}</span>
            </button>
          );
        })}
      </div>

      <Button
        variant="ghost"
        size="sm"
        fullWidth
        onClick={selectAll}
        className="text-th-dark underline underline-offset-2"
      >
        {to('step4SelectAll')}
      </Button>

      {selected.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-1">{to('step4Any')}</p>
      )}
    </div>
  );
}
