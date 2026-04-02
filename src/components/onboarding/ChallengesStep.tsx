'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Toggle } from '@/components/ui/Toggle';

interface ChallengesStepProps {
  hasArfid: boolean;
  onChange: (hasArfid: boolean) => void;
}

export function ChallengesStep({ hasArfid, onChange }: ChallengesStepProps) {
  const t = useTranslations('onboarding');
  const ta = useTranslations('arfid');
  function handleToggle(checked: boolean) {
    onChange(checked);
  }

  return (
    <div className="space-y-4">
      <Toggle
        id="arfid-toggle"
        checked={hasArfid}
        onChange={handleToggle}
        label={t('step6Arfid')}
        description={t('step6ArfidDesc')}
      />

      {hasArfid && (
        <div className="rounded-3xl bg-mint-light border border-mint-soft p-4 space-y-3">
          <p className="text-sm font-bold text-emerald-800">{ta('title')}</p>
          <ol className="space-y-2">
            {[1, 2, 3, 4, 5].map(step => (
              <li key={step} className="flex gap-3 text-sm text-emerald-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mint-soft flex items-center justify-center text-xs font-bold text-emerald-800">
                  {step}
                </span>
                <div>
                  <span className="font-semibold">
                    {ta(`step${step}Title` as 'step1Title')}
                  </span>{' '}
                  — {ta(`step${step}Desc` as 'step1Desc')}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
