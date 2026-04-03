'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChildProfile, DailyPlan, MealSlot } from '@/types';
import { generateDailyPlan, regenerateMeal } from '@/lib/mealEngine';
import { loadStorage, savePlan } from '@/lib/storage';

function profileHash(p: ChildProfile): string {
  return [
    p.ageMonths, p.weightKg, p.gender,
    [...p.allergens].sort().join(','),
    [...p.exclusions].sort().join(','),
    [...p.cuisinePreferences].sort().join(','),
  ].join('|');
}

export function useMealPlan(profile: ChildProfile | null) {
  const [plan, setPlan] = useState<DailyPlan | null>(null);

  useEffect(() => {
    if (!profile) return;

    // Check if there's already a plan for today
    const storage = loadStorage();
    const today = new Date().toISOString().split('T')[0];

    const isToday          = storage.lastPlan?.date === today;
    const profileUnchanged = storage.lastPlan?.profileHash === profileHash(profile);

    if (isToday && profileUnchanged && storage.lastPlan) {
      setPlan(storage.lastPlan);
    } else {
      const newPlan = generateDailyPlan(profile);
      savePlan({ ...newPlan, profileHash: profileHash(profile) });
      setPlan(newPlan);
    }
  }, [profile]);

  const changeMeal = useCallback(
    (slot: MealSlot) => {
      if (!profile || !plan) return;
      const newMeal = regenerateMeal(profile, slot, plan);
      const updatedPlan: DailyPlan = { ...plan, [slot]: newMeal };
      savePlan({ ...updatedPlan, profileHash: profileHash(profile) });
      setPlan(updatedPlan);
    },
    [profile, plan]
  );

  const regeneratePlan = useCallback(() => {
    if (!profile) return;
    const newPlan = generateDailyPlan(profile);
    savePlan({ ...newPlan, profileHash: profileHash(profile) });
    setPlan(newPlan);
  }, [profile]);

  return { plan, changeMeal, regeneratePlan };
}
