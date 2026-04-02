'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/Tooltip';

interface ExposureLadderProps {
  currentStep: number;
}

export function ExposureLadder({ currentStep }: ExposureLadderProps) {
  const t = useTranslations('arfid');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="rounded-3xl bg-mint-light border border-mint-soft overflow-hidden">
      {/* Header — title + tooltip on the left, collapse toggle on the right */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex flex-col gap-0.5 min-w-0">
          {/* "Exposure Ladder" title with clinical info tooltip */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-emerald-800">{t('title')}</span>
            <Tooltip content={t('tooltipDesc')} side="bottom" />
          </div>
          <p className="text-sm text-emerald-600">{t('subtitle', { step: currentStep })}</p>
        </div>

        {/* Collapse / expand toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expand exposure ladder' : 'Collapse exposure ladder'}
          className="flex-shrink-0 p-1 text-emerald-600 text-lg transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }}
        >
          ▾
        </button>
      </div>

      {/* Steps */}
      {!collapsed && (
        <div className="px-5 pb-5 space-y-3">
          {[1, 2, 3, 4, 5].map(step => {
            const isActive = step === currentStep;
            const isDone = step < currentStep;

            return (
              <div
                key={step}
                className={cn(
                  'flex gap-3 p-3 rounded-2xl transition-colors',
                  isActive
                    ? 'bg-mint-soft/60 border border-mint-soft'
                    : isDone
                    ? 'opacity-60'
                    : 'opacity-40'
                )}
              >
                <div
                  className={cn(
                    'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md'
                      : isDone
                      ? 'bg-emerald-300 text-white'
                      : 'bg-gray-200 text-gray-400'
                  )}
                >
                  {isDone ? '✓' : step}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-semibold', isActive ? 'text-emerald-800' : 'text-emerald-700')}>
                    {t(`step${step}Title` as 'step1Title')}
                  </p>
                  {isActive && (
                    <p className="text-xs text-emerald-600 mt-0.5 leading-relaxed">
                      {t(`step${step}Desc` as 'step1Desc')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
