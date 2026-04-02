'use client';

import { useRouter } from 'next/navigation';
import { Locale } from '@/types';
import { saveDraft, loadDraft } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface LanguageStepProps {
  onNext: (locale: Locale) => void;
  currentLocale: string;
}

const LANGUAGES: { locale: Locale; flag: string; native: string; label: string }[] = [
  { locale: 'he', flag: '🇮🇱', native: 'עברית', label: 'Hebrew' },
  { locale: 'en', flag: '🇬🇧', native: 'English', label: 'English' },
  { locale: 'ru', flag: '🇷🇺', native: 'Русский', label: 'Russian' },
];

export function LanguageStep({ onNext, currentLocale }: LanguageStepProps) {
  const router = useRouter();

  function selectLanguage(locale: Locale) {
    const draft = loadDraft();
    saveDraft({ ...draft, locale });

    if (locale !== currentLocale) {
      router.replace(`/${locale}/onboarding`);
    } else {
      onNext(locale);
    }
  }

  return (
    <div className="space-y-4">
      {LANGUAGES.map(lang => {
        const isSelected = lang.locale === currentLocale;
        return (
          <button
            key={lang.locale}
            type="button"
            onClick={() => selectLanguage(lang.locale)}
            className={cn(
              'w-full flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-150 min-h-touch text-start',
              isSelected
                ? 'border-th-primary bg-th-light shadow-glow'
                : 'border-gray-200 bg-white hover:border-th-dim hover:shadow-soft'
            )}
          >
            <span className="text-4xl leading-none">{lang.flag}</span>
            <div className="flex-1">
              <p className={cn('text-xl font-bold', isSelected ? 'text-th-dark' : 'text-gray-800')}>
                {lang.native}
              </p>
              <p className="text-sm text-gray-400">{lang.label}</p>
            </div>
            {isSelected && (
              <span className="text-th-primary text-xl">✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
