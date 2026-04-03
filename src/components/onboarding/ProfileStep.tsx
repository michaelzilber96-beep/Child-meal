'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChildProfile, Gender } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ProfileStepProps {
  draft: Partial<ChildProfile>;
  onUpdate: (data: Partial<ChildProfile>) => void;
}

// Workaround: extract all translation hooks at component top level
export function ProfileStep({ draft, onUpdate }: ProfileStepProps) {
  const t = useTranslations('profile');
  const te = useTranslations('errors');
  const to = useTranslations('onboarding');

  const [name, setName] = useState(draft.name ?? '');
  const [gender, setGender] = useState<Gender>(draft.gender ?? 'boy');
  const [age, setAge] = useState(draft.ageMonths?.toString() ?? '');
  const [weight, setWeight] = useState(draft.weightKg?.toString() ?? '');
  const [height, setHeight] = useState(draft.heightCm?.toString() ?? '');

  const ageNum = parseFloat(age);
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);

  const errors = {
    name: name.trim() === '',
    age: isNaN(ageNum) || ageNum < 0 || ageNum > 24,
    weight: isNaN(weightNum) || weightNum < 1 || weightNum > 30,
    height: isNaN(heightNum) || heightNum < 40 || heightNum > 100,
  };

  function handleSubmit() {
    if (Object.values(errors).some(Boolean)) return;
    onUpdate({
      name: name.trim(),
      gender,
      ageMonths: ageNum,
      weightKg: weightNum,
      heightCm: heightNum,
    });
  }

  return (
    <div className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="child-name" className="block text-sm font-semibold text-gray-700">
          {t('name')} *
        </label>
        <input
          id="child-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t('namePlaceholder')}
          aria-invalid={errors.name}
          className={cn(
            'w-full px-4 py-3 rounded-2xl border-2 text-base outline-none transition-colors min-h-touch',
            errors.name && name !== ''
              ? 'border-red-300 focus:border-red-400 bg-red-50'
              : 'border-gray-200 focus:border-th-primary bg-white'
          )}
        />
        {errors.name && name !== '' && (
          <p className="text-xs text-red-500">{te('required')}</p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-gray-700">{t('gender')}</p>
        <div className="flex gap-3">
          {(['boy', 'girl'] as Gender[]).map(g => (
            <button
              key={g}
              type="button"
              onClick={() => setGender(g)}
              aria-pressed={gender === g}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 font-semibold transition-all min-h-touch',
                gender === g
                  ? 'border-th-primary bg-th-light text-th-dark shadow-glow'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-th-dim'
              )}
            >
              <span className="text-xl">{g === 'boy' ? '👦' : '👧'}</span>
              <span>{t(g)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Age slider */}
      <div className="space-y-1.5">
        <label htmlFor="child-age" className="flex justify-between text-sm font-semibold text-gray-700">
          <span>{t('age')}</span>
          <span className="text-th-dark font-bold">
            {age !== '' ? `${age} ${t('ageUnit')}` : '—'}
          </span>
        </label>
        <input
          id="child-age"
          type="range"
          min={0}
          max={24}
          step={1}
          value={age !== '' ? ageNum : 0}
          onChange={e => setAge(e.target.value)}
          className="w-full h-2 rounded-full appearance-none bg-gray-200 cursor-pointer rtl:rotate-180 rtl:[direction:rtl]"
        />
        <div className="flex justify-between text-xs text-gray-400 rtl:flex-row-reverse">
          <span>0</span>
          <span>6</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
        {errors.age && age !== '' && (
          <p className="text-xs text-red-500">{te('ageRange')}</p>
        )}
      </div>

      {/* Weight */}
      <div className="space-y-1.5">
        <label htmlFor="child-weight" className="block text-sm font-semibold text-gray-700">
          {t('weight')} *
        </label>
        <div className="relative">
          <input
            id="child-weight"
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            min={1}
            max={30}
            step={0.1}
            aria-invalid={errors.weight && weight !== ''}
            className={cn(
              'w-full px-4 py-3 rounded-2xl border-2 text-base outline-none transition-colors min-h-touch',
              errors.weight && weight !== ''
                ? 'border-red-300 focus:border-red-400 bg-red-50'
                : 'border-gray-200 focus:border-th-primary bg-white'
            )}
          />
          <span className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {t('weightUnit')}
          </span>
        </div>
        {errors.weight && weight !== '' && (
          <p className="text-xs text-red-500">{te('weightRange')}</p>
        )}
      </div>

      {/* Height */}
      <div className="space-y-1.5">
        <label htmlFor="child-height" className="block text-sm font-semibold text-gray-700">
          {t('height')} *
        </label>
        <div className="relative">
          <input
            id="child-height"
            type="number"
            inputMode="decimal"
            value={height}
            onChange={e => setHeight(e.target.value)}
            min={40}
            max={100}
            step={0.5}
            aria-invalid={errors.height && height !== ''}
            className={cn(
              'w-full px-4 py-3 rounded-2xl border-2 text-base outline-none transition-colors min-h-touch',
              errors.height && height !== ''
                ? 'border-red-300 focus:border-red-400 bg-red-50'
                : 'border-gray-200 focus:border-th-primary bg-white'
            )}
          />
          <span className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {t('heightUnit')}
          </span>
        </div>
        {errors.height && height !== '' && (
          <p className="text-xs text-red-500">{te('heightRange')}</p>
        )}
      </div>

      <Button
        fullWidth
        size="lg"
        onClick={handleSubmit}
        disabled={Object.values(errors).some(Boolean) || !name || !age || !weight || !height}
      >
        {to('next')}
        {/* RTL-aware arrow: ← in LTR, → in RTL */}
        <span aria-hidden className="ms-1 ltr:inline rtl:hidden">→</span>
        <span aria-hidden className="ms-1 rtl:inline ltr:hidden">←</span>
      </Button>
    </div>
  );
}
