'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { useMealPlan } from '@/hooks/useMealPlan';
import { MealPlanDashboard } from '@/components/dashboard/MealPlanDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'he';

  const { profile, loading } = useProfile();
  const { plan, changeMeal, regeneratePlan } = useMealPlan(profile);

  useEffect(() => {
    if (!loading && !profile) {
      router.push(`/${locale}/onboarding`);
    }
  }, [loading, profile, locale, router]);

  if (loading || !profile || !plan) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-5xl animate-bounce">🍼</div>
          <p className="text-gray-500 text-sm">Loading your plan...</p>
        </div>
      </div>
    );
  }

  return (
    <MealPlanDashboard
      profile={profile}
      plan={plan}
      onChangeMeal={changeMeal}
      onRegeneratePlan={regeneratePlan}
      locale={locale}
    />
  );
}
