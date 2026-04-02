'use client';

import { useTranslations } from 'next-intl';
import { Allergen } from '@/types';
import { MultiSelect } from '@/components/ui/MultiSelect';

const ALLERGEN_ICONS: Record<Allergen, string> = {
  dairy: '🥛',
  eggs: '🥚',
  peanuts: '🥜',
  gluten: '🌾',
  sesame: '🌱',
  treeNuts: '🌰',
  soy: '🫘',
  fish: '🐟',
};

interface AllergiesStepProps {
  selected: Allergen[];
  onChange: (allergens: Allergen[]) => void;
}

export function AllergiesStep({ selected, onChange }: AllergiesStepProps) {
  const t = useTranslations('allergens');
  const to = useTranslations('onboarding');

  const options = (Object.keys(ALLERGEN_ICONS) as Allergen[]).map(a => ({
    value: a,
    label: t(a),
    icon: ALLERGEN_ICONS[a],
  }));

  return (
    <div className="space-y-4">
      <MultiSelect
        options={options}
        value={selected}
        onChange={v => onChange(v as Allergen[])}
        columns={2}
      />
      {selected.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-2">
          {to('step3None')} ✓
        </p>
      )}
    </div>
  );
}
