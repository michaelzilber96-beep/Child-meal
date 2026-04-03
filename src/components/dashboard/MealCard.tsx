'use client';

import { useTranslations } from 'next-intl';
import { MealSlot, PlannedMeal } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const SLOT_CONFIG: Record<MealSlot, { color: string; bg: string; border: string; label: string; emoji: string }> = {
  breakfast: {
    color: 'text-pink-700',
    bg: 'bg-rose-light',
    border: 'border-rose-soft',
    label: 'dashboard.breakfast',
    emoji: '🌅',
  },
  lunch: {
    color: 'text-orange-700',
    bg: 'bg-peach-light',
    border: 'border-peach-soft',
    label: 'dashboard.lunch',
    emoji: '☀️',
  },
  dinner: {
    color: 'text-emerald-700',
    bg: 'bg-mint-light',
    border: 'border-mint-soft',
    label: 'dashboard.dinner',
    emoji: '🌙',
  },
};

interface MealCardProps {
  slot: MealSlot;
  meal: PlannedMeal;
  /** Increment this to trigger the fade-in animation */
  animKey: number;
  onChangeDish: () => void;
}

export function MealCard({ slot, meal, animKey, onChangeDish }: MealCardProps) {
  const t = useTranslations('dashboard');
  const tr = useTranslations('recipes');
  const config = SLOT_CONFIG[slot];

  const recipeName = (tr as (k: string) => string)(meal.recipe.nameKey.replace('recipes.', ''));
  const recipeBenefit = (tr as (k: string) => string)(meal.recipe.benefitKey.replace('recipes.', ''));

  return (
    <Card className="space-y-4">
      {/* Slot label */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border',
            config.color,
            config.bg,
            config.border
          )}
        >
          {config.emoji} {t(slot)}
        </span>
        <span className="text-2xl leading-none">{meal.recipe.flagEmoji}</span>
      </div>

      {/* Animated content — fades in when animKey changes */}
      <div key={animKey} className="animate-meal-in space-y-4">
        {/* Dish name */}
        <div>
          <h3 className="text-xl font-black text-gray-800 leading-snug">{recipeName}</h3>
          <p className="text-sm text-gray-400 mt-0.5">
            {t('origin')}: {meal.recipe.origin}
          </p>
        </div>

        {/* Nutritional badges */}
        <div className="flex flex-wrap gap-2">
          <NutriBadge
            icon="🔥"
            value={`${meal.adjustedKcal}`}
            unit={t('kcalUnit')}
            color="bg-orange-50 text-orange-700"
          />
          <NutriBadge
            icon="💪"
            value={`${meal.adjustedProteinG}`}
            unit={t('proteinUnit')}
            color="bg-blue-50 text-blue-700"
          />
        </div>

        {/* Benefit text */}
        <p className="text-sm text-gray-500 italic leading-relaxed">
          ✨ {recipeBenefit}
        </p>

        {/* Substitution banner */}
        {meal.hasSubstitution && meal.substitutionKeys.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 space-y-1">
            {meal.substitutionKeys.map((key, i) => {
              const note = (tr as (k: string) => string)(key.replace('recipes.', ''));
              return (
                <p key={i} className="text-xs text-amber-800">
                  {t('substitutionNote', { note })}
                </p>
              );
            })}
          </div>
        )}


      </div>

      {/* Change dish button — outside animated wrapper so it doesn't flash */}
      <Button
        variant="outline"
        size="sm"
        fullWidth
        onClick={onChangeDish}
        className="mt-1"
      >
        🔄 {t('changeDish')}
      </Button>
    </Card>
  );
}

function NutriBadge({
  icon,
  value,
  unit,
  color,
}: {
  icon: string;
  value: string;
  unit: string;
  color: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold', color)}>
      {icon} {value} {unit}
    </span>
  );
}
