'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChildProfile, DailyPlan, MealSlot } from '@/types';
import { calculateNutrition } from '@/lib/mealEngine';
import { clearStorage } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { MealCard } from './MealCard';

const MEAL_SLOTS: MealSlot[] = ['breakfast', 'lunch', 'dinner'];

interface MealPlanDashboardProps {
  profile: ChildProfile;
  plan: DailyPlan;
  onChangeMeal: (slot: MealSlot) => void;
  onRegeneratePlan: () => void;
  locale: string;
}

export function MealPlanDashboard({
  profile,
  plan,
  onChangeMeal,
  onRegeneratePlan,
  locale,
}: MealPlanDashboardProps) {
  const t = useTranslations('dashboard');
  const ta = useTranslations('app');
  const tp = useTranslations('profile');
  const router = useRouter();

  // Per-slot animation counters — increment on dish change to trigger fade-in
  const [animKeys, setAnimKeys] = useState<Record<MealSlot, number>>({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
  });

  const nutrition = calculateNutrition(profile);
  const actualKcal = [plan.breakfast, plan.lunch, plan.dinner]
    .filter(Boolean)
    .reduce((sum, meal) => sum + (meal.recipe.nutrition.kcal ?? 0), 0);
  const targetKcal = plan.targetKcal;
  const pct = Math.min((actualKcal / targetKcal) * 100, 100);
  const barColor =
    pct < 50 ? 'var(--th-primary-dim)' :
    pct < 85 ? 'var(--th-primary)' :
    pct <= 100 ? 'var(--th-primary-darker)' :
    '#f59e0b';
  const isTooYoung = profile.ageMonths < 4;

  // Gender-aware tagline (Hebrew only — en/ru use same key)
  const tagline =
    locale === 'he'
      ? profile.gender === 'girl'
        ? ta('taglineGirl')
        : ta('taglineBoy')
      : ta('tagline');

  // Gender-aware greeting key (Hebrew only)
  const greetingKey: 'greeting' | 'greetingBoy' | 'greetingGirl' =
    locale === 'he'
      ? profile.gender === 'girl'
        ? 'greetingGirl'
        : 'greetingBoy'
      : 'greeting';

  // ── Sticky kcal bar scroll behaviour ──────────────────────────────
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const bouncingRef = useRef(false);
  const [barShown, setBarShown] = useState(true);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    const fill = fillRef.current;

    function onAnimationEnd() {
      setBouncing(false);
      bouncingRef.current = false;
    }
    if (fill) fill.addEventListener('animationend', onAnimationEnd);

    function onScroll() {
      const y = window.scrollY;
      const atTop = y < 10;
      const atBottom = window.innerHeight + y >= document.body.scrollHeight - 40;
      const goingDown = y > lastScrollY.current;
      lastScrollY.current = y;

      if (atTop) {
        setBarShown(true);
      } else if (goingDown) {
        setBarShown(true);
      }
      // scrolling up: no change — bar stays visible

      if (atBottom && !bouncingRef.current) {
        bouncingRef.current = true;
        setBouncing(true);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (fill) fill.removeEventListener('animationend', onAnimationEnd);
    };
  }, []);

  function handleChangeMeal(slot: MealSlot) {
    setAnimKeys(prev => ({ ...prev, [slot]: prev[slot] + 1 }));
    onChangeMeal(slot);
  }

  function handleEditProfile() {
    clearStorage();
    router.push(`/${locale}/onboarding`);
  }

  return (
    <>
      {/* Syncs data-gender on <html> so CSS variables switch the palette */}
      <ThemeProvider gender={profile.gender} />

      {/* barBounce keyframes injected inline — no Tailwind dependency */}
      <style>{`
        @keyframes barBounce {
          0%   { transform: translateY(0); }
          30%  { transform: translateY(-6px); }
          60%  { transform: translateY(3px); }
          80%  { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }
        .bar-bounce {
          animation: barBounce 0.55s ease-in-out;
        }
      `}</style>

      <div className="min-h-screen bg-bg pb-12">
        {/* Top header */}
        <div className="bg-white border-b border-gray-100 shadow-soft sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-black text-gray-800">
                  TinyBites <span className="text-lg">🍼</span>
                </h1>
                <p className="text-xs text-gray-400">{tagline}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleEditProfile} className="text-xs">
                ✏️ {t('editProfile')}
              </Button>
            </div>
          </div>
        </div>

        {/* Sticky kcal bar — slides into view on scroll down, stays visible on up */}
        <div
          ref={barRef}
          style={{
            position: 'sticky',
            top: '64px',
            zIndex: 30,
            transform: barShown ? 'translateY(0)' : 'translateY(-110%)',
            transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div className="bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-md mx-auto px-4 py-2.5 space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{t('calorieTarget', { target: targetKcal })}</span>
                <span>{t('calorieTotal', { total: actualKcal })}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  ref={fillRef}
                  className={`h-full rounded-full transition-all duration-700${bouncing ? ' bar-bounce' : ''}`}
                  style={{
                    width: `${pct}%`,
                    background: barColor,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6 space-y-5">
          {/* Greeting card — theme-aware gradient via CSS variables */}
          <div
            className="rounded-3xl border p-5 space-y-3"
            style={{
              background: 'linear-gradient(135deg, var(--th-greeting-from), white, var(--th-greeting-to))',
              borderColor: 'var(--th-greeting-border)',
            }}
          >
            <p className="text-lg font-bold text-gray-800">
              {t(greetingKey, { name: profile.name })}
            </p>
            <p className="text-sm text-gray-500">{t('date')}</p>

            {/* Protein target */}
            <p className="text-xs text-gray-400">
              {t('protein')}: {t('proteinRange', { min: nutrition.proteinGMin, max: nutrition.proteinGMax })}
            </p>
          </div>

          {/* Too young warning */}
          {isTooYoung && (
            <div className="rounded-3xl bg-amber-50 border border-amber-200 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                ⚠️ {tp('tooYoung')}
              </p>
            </div>
          )}

          {/* Meal cards — animKey triggers cross-fade on dish change */}
          {!isTooYoung && MEAL_SLOTS.map(slot => (
            <MealCard
              key={slot}
              slot={slot}
              meal={plan[slot]}
              animKey={animKeys[slot]}
              onChangeDish={() => handleChangeMeal(slot)}
              childAgeMonths={profile.ageMonths}
            />
          ))}

          {/* Regenerate button */}
          {!isTooYoung && (
            <Button
              variant="secondary"
              fullWidth
              size="lg"
              onClick={onRegeneratePlan}
            >
              🎲 {t('regenerate')}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
