'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChildProfile, DailyPlan, MealSlot } from '@/types';
import { generateDailyPlan, regenerateMeal } from '@/lib/mealEngine';
import { loadStorage, savePlan } from '@/lib/storage';

export function useMealPlan(profile: ChildProfile | null) {
  const [plan, setPlan] = useState<DailyPlan | null>(null);

  useEffect(() => {
    if (!profile) return;

    // Check if there's already a plan for today
    const storage = loadStorage();
    const today = new Date().toISOString().split('T')[0];

    if (storage.lastPlan && storage.lastPlan.date === today) {
      setPlan(storage.lastPlan);
    } else {
      const newPlan = generateDailyPlan(profile);
      savePlan(newPlan);
      setPlan(newPlan);
    }
  }, [profile]);

  const changeMeal = useCallback(
    (slot: MealSlot) => {
      if (!profile || !plan) return;
      const newMeal = regenerateMeal(profile, slot, plan);
      const updatedPlan: DailyPlan = { ...plan, [slot]: newMeal };
      savePlan(updatedPlan);
      setPlan(updatedPlan);
    },
    [profile, plan]
  );

  const regeneratePlan = useCallback(() => {
    if (!profile) return;
    const newPlan = generateDailyPlan(profile);
    savePlan(newPlan);
    setPlan(newPlan);
  }, [profile]);

  return { plan, changeMeal, regeneratePlan };
}
