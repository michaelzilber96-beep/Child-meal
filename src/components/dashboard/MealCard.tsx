'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MealSlot, PlannedMeal } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { RECIPE_DETAILS, RecipeDetail, Locale, LocalizedString } from '@/data/recipeDetails';
import { RECIPE_VIDEOS } from '@/data/recipeVideos';

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
  childAgeMonths: number;
}

export function MealCard({ slot, meal, animKey, onChangeDish, childAgeMonths }: MealCardProps) {
  const t = useTranslations('dashboard');
  const tr = useTranslations('recipes');
  const config = SLOT_CONFIG[slot];
  const [recipeOpen, setRecipeOpen] = useState(false);

  const recipeName = (tr as (k: string) => string)(meal.recipe.nameKey.replace('recipes.', ''));
  const recipeBenefit = (tr as (k: string) => string)(meal.recipe.benefitKey.replace('recipes.', ''));

  const detail = RECIPE_DETAILS[meal.recipe.id];

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

        {/* Recipe drawer */}
        {detail && (
          <RecipeDrawer
            detail={detail}
            recipeId={meal.recipe.id}
            childAgeMonths={childAgeMonths}
            minAgeMonths={meal.recipe.minAgeMonths}
            isOpen={recipeOpen}
            onToggle={() => setRecipeOpen(o => !o)}
            recipeLabel={t('recipe')}
          />
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

// ── Recipe Drawer ─────────────────────────────────────────────────

interface RecipeDrawerProps {
  detail: RecipeDetail;
  recipeId: string;
  childAgeMonths: number;
  minAgeMonths: number;
  isOpen: boolean;
  onToggle: () => void;
  recipeLabel: string;
}

function RecipeDrawer({ detail, recipeId, childAgeMonths, minAgeMonths, isOpen, onToggle, recipeLabel }: RecipeDrawerProps) {
  const locale = useLocale() as Locale;
  const loc = (field: LocalizedString | string): string =>
    typeof field === 'string' ? field : field[locale] ?? field.en;
  const t = useTranslations('dashboard');
  const td = t as unknown as (k: string, params?: Record<string, unknown>) => string;
  const isRTL = locale === 'he';

  const videoUrl = RECIPE_VIDEOS[recipeId] ?? null;
  const videoId = videoUrl ? new URL(videoUrl).searchParams.get('v') : null;

  return (
    <div className="space-y-2" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header — always visible, controls toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl border text-sm font-semibold"
        style={{
          background: 'var(--th-primary-dim)',
          color: 'var(--th-primary-darker)',
          borderColor: 'var(--th-primary-dim)',
        }}
      >
        <span>📖 {recipeLabel}</span>
        <span
          style={{
            display: 'inline-block',
            transition: 'transform 200ms ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>

      {/* Content — roll-up/down via max-height transition */}
      <div
        style={{
          maxHeight: isOpen ? '1200px' : '0',
          overflow: 'hidden',
          transition: isOpen
            ? 'max-height 0.4s ease-in-out'
            : 'max-height 0.5s cubic-bezier(0.4, 0, 0.6, 1)',
        }}
      >
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-4">

          {/* 1. TIME BAR */}
          <p className="text-xs text-gray-500 font-medium">
            ⏱ {td('prepTime', { min: detail.prepMinutes })} · {td('cookTime', { min: detail.cookMinutes })}
          </p>

          {/* 2. AGE SUITABILITY BADGE */}
          {childAgeMonths >= minAgeMonths ? (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 inline-flex">
              {td('suitableAge')}
            </span>
          ) : (
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 inline-flex">
              {td('notSuitableAge')}
            </span>
          )}

          {/* 3. EQUIPMENT */}
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">🍳 {td('equipmentNeeded')}</p>
            <div className="flex flex-wrap gap-1.5">
              {detail.equipment.map((item, i) => (
                <span key={i} className="bg-white border border-gray-200 rounded-xl px-2 py-1 text-xs text-gray-600">
                  {loc(item)}
                </span>
              ))}
            </div>
          </div>

          {/* 4. INGREDIENTS */}
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">🛒 {td('ingredients')}</p>
            <div className="divide-y divide-gray-100">
              {detail.ingredients.map((ing, i) => {
                const translatedUnit = td(`units.${ing.unit}`) ?? ing.unit;
                return (
                  <div key={i} className="py-1" style={{ display: 'flex', flexDirection: locale === 'he' ? 'row-reverse' : 'row', justifyContent: 'space-between', width: '100%' }}>
                    <span className="text-sm font-semibold text-gray-800">{ing.quantity} {translatedUnit}</span>
                    <span className="text-sm text-gray-700">{loc(ing.item)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. INSTRUCTIONS */}
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">👩‍🍳 {td('instructions')}</p>
            <div className="space-y-2">
              {detail.instructions.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-gray-200 text-xs flex items-center justify-center text-gray-600 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{loc(step)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. SPICE / SALT SAFETY NOTE */}
          <div
            className={cn(
              'rounded-2xl p-3 text-xs leading-relaxed',
              childAgeMonths < 10
                ? 'bg-amber-50 border border-amber-200 text-amber-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            )}
          >
            {childAgeMonths < 10 ? (
              <><span>⚠️ </span><strong>Under 10 months: </strong>{loc(detail.spiceSaltNote)}</>
            ) : (
              <><span>ℹ️ </span>{loc(detail.spiceSaltNote)}</>
            )}
          </div>

          {/* 7. VIDEO */}
          {videoId && (
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
                {td('watchVideo')}
              </p>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: 'var(--border-radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#000',
                }}
                onClick={() => window.open(videoUrl!, '_blank')}
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: 20 }}>▶</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. CLOSE BUTTON */}
          <button
            type="button"
            onClick={onToggle}
            className="w-full py-2 rounded-2xl border-0 text-sm font-semibold"
            style={{
              background: 'var(--th-primary-dim)',
              color: 'var(--th-primary)',
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
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
