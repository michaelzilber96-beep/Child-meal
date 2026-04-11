'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Allergen, ChildProfile, CuisineRegion, FoodExclusion, Locale } from '@/types';
import { saveProfile, loadDraft, clearDraft } from '@/lib/storage';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LanguageStep } from './LanguageStep';
import { ProfileStep } from './ProfileStep';
import { AllergiesStep } from './AllergiesStep';
import { PreferencesStep } from './PreferencesStep';
import { ExclusionsStep } from './ExclusionsStep';
import { DisclaimerScreen } from './DisclaimerScreen';
const TOTAL_STEPS = 5;

interface OnboardingWizardProps {
  locale: string;
}

export function OnboardingWizard({ locale }: OnboardingWizardProps) {
  const router = useRouter();
  const t = useTranslations('onboarding');
  const tapp = useTranslations('app');

  const [step, setStep] = useState(1);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [draft, setDraft] = useState<Partial<ChildProfile>>({
    locale: locale as Locale,
    allergens: [],
    exclusions: [],
    cuisinePreferences: [],
  });

  // Rehydrate draft after locale redirect
  useEffect(() => {
    const saved = loadDraft();
    if (saved && Object.keys(saved).length > 0) {
      setDraft(prev => ({ ...prev, ...saved }));
      if (saved.locale) setStep(2);
    }
  }, []);

  // Check if disclaimer was already accepted — if so, skip it
  function disclaimerAlreadyAccepted(): boolean {
    try {
      const d = localStorage.getItem('tb_disclaimer');
      return d ? JSON.parse(d).accepted === true : false;
    } catch {
      return false;
    }
  }

  function updateDraft(data: Partial<ChildProfile>) {
    const updated = { ...draft, ...data };
    setDraft(updated);
    import('@/lib/storage').then(({ saveDraft }) => saveDraft(updated));
  }

  function handleNext() { setStep(s => s + 1); }
  function handleBack() { setStep(s => Math.max(1, s - 1)); }

  function handleLanguageNext(selectedLocale: Locale) {
    updateDraft({ locale: selectedLocale });
    handleNext();
  }

  function handleFinish() {
    const profile: ChildProfile = {
      name: draft.name ?? 'Child',
      gender: draft.gender ?? 'boy',
      ageMonths: draft.ageMonths ?? 12,
      weightKg: draft.weightKg ?? 10,
      heightCm: draft.heightCm ?? 75,
      allergens: draft.allergens ?? [],
      exclusions: draft.exclusions ?? [],
      cuisinePreferences: draft.cuisinePreferences ?? [],
      locale: (draft.locale as Locale) ?? 'he',
      createdAt: new Date().toISOString(),
    };
    saveProfile(profile);
    clearDraft();
    router.push(`/${locale}/dashboard`);
  }

  const STEP_TITLES: Record<number, string> = {
    1: t('step1Title'),
    2: t('step2Title'),
    3: t('step3Title'),
    4: t('step4Title'),
    5: t('step5Title'),
  };

  const STEP_SUBTITLES: Record<number, string> = {
    1: t('step1Subtitle'),
    2: t('step2Subtitle'),
    3: t('step3Subtitle'),
    4: t('step4Subtitle'),
    5: t('step5Subtitle'),
  };

  // Gender-aware tagline (Hebrew only — en/ru use same key)
  const gender = draft.gender;
  const tagline =
    locale === 'he' && gender
      ? gender === 'girl'
        ? tapp('taglineGirl')
        : tapp('taglineBoy')
      : tapp('tagline');

  return (
    <>
      {/* Theme syncs immediately when gender is chosen in step 2 */}
      <ThemeProvider gender={gender} />

      {/* Disclaimer overlay — rendered over the final step, not instead of it */}
      {showDisclaimer && (
        <DisclaimerScreen onComplete={handleFinish} />
      )}

      <div className="min-h-screen bg-bg flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">
              TinyBites <span className="text-2xl">🍼</span>
            </h1>
            <p className="text-sm text-gray-400">{tagline}</p>
          </div>

          {/* Progress */}
          <ProgressBar
            current={step}
            total={TOTAL_STEPS}
            label={t('stepOf', { current: step, total: TOTAL_STEPS })}
          />

          {/* Step card */}
          <Card>
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{STEP_TITLES[step]}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{STEP_SUBTITLES[step]}</p>
              </div>

              {/* ── Step 1: Language ── */}
              {step === 1 && (
                <LanguageStep
                  currentLocale={locale}
                  onNext={handleLanguageNext}
                />
              )}

              {/* ── Step 2: Profile (has its own submit button with RTL arrow) ── */}
              {step === 2 && (
                <ProfileStep
                  draft={draft}
                  onUpdate={data => {
                    updateDraft(data);
                    handleNext();
                  }}
                />
              )}

              {/* ── Steps 3–6: shared nav pattern ── */}
              {step === 3 && (
                <>
                  <AllergiesStep
                    selected={draft.allergens ?? []}
                    onChange={allergens => updateDraft({ allergens: allergens as Allergen[] })}
                  />
                  <NavButtons onBack={handleBack} onNext={handleNext} t={t} />
                </>
              )}

              {step === 4 && (
                <>
                  <PreferencesStep
                    selected={draft.cuisinePreferences ?? []}
                    onChange={cuisines => updateDraft({ cuisinePreferences: cuisines as CuisineRegion[] })}
                  />
                  <NavButtons onBack={handleBack} onNext={handleNext} t={t} />
                </>
              )}

              {step === 5 && (
                <>
                  <ExclusionsStep
                    selected={draft.exclusions ?? []}
                    onChange={exclusions => updateDraft({ exclusions: exclusions as FoodExclusion[] })}
                  />
                  <div className="flex gap-3">
                    <NavBackButton onBack={handleBack} t={t} />
                    <Button
                      size="lg"
                      onClick={() => {
                        console.log('disclaimer check:', localStorage.getItem('tb_disclaimer'));
                        if (disclaimerAlreadyAccepted()) {
                          handleFinish();
                        } else {
                          setShowDisclaimer(true);
                        }
                      }}
                      className="flex-1 text-white font-bold"
                      style={{
                        background: 'linear-gradient(to right, var(--th-primary), var(--th-accent))',
                      }}
                    >
                      {t('startPlanning')} 🚀
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

// ── RTL-Aware Navigation Buttons ─────────────────────────────────

function NavBackButton({
  onBack,
  t,
}: {
  onBack: () => void;
  t: (key: string) => string;
}) {
  return (
    <Button variant="outline" size="md" onClick={onBack} className="flex-1">
      {/* In LTR: ← Back | In RTL: Back → */}
      <span aria-hidden className="me-1 ltr:inline rtl:hidden">←</span>
      {t('back')}
      <span aria-hidden className="ms-1 rtl:inline ltr:hidden">→</span>
    </Button>
  );
}

function NavButtons({
  onBack,
  onNext,
  t,
}: {
  onBack: () => void;
  onNext: () => void;
  t: (key: string) => string;
}) {
  return (
    <div className="flex gap-3">
      <NavBackButton onBack={onBack} t={t} />
      <Button size="md" onClick={onNext} className="flex-1">
        {t('next')}
        {/* In LTR: Next → | In RTL: ← Next */}
        <span aria-hidden className="ms-1 ltr:inline rtl:hidden">→</span>
        <span aria-hidden className="me-1 rtl:inline ltr:hidden order-first">←</span>
      </Button>
    </div>
  );
}
