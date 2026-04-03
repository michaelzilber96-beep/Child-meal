import { ChildProfile, DailyPlan, FoodExclusion, MealSlot, NutritionProfile, PlannedMeal, Recipe, TextureTag } from '@/types';
import { EER_TABLE } from '@/data/eerTable';
import { FALLBACK_RECIPES, RECIPES } from '@/data/recipeDatabase';

// ── EER Calculation ───────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function calculateNutrition(profile: ChildProfile): NutritionProfile {
  const age = Math.max(1, Math.min(24, profile.ageMonths));
  const isBoy = profile.gender === 'boy';

  let lower = EER_TABLE[0];
  let upper = EER_TABLE[EER_TABLE.length - 1];

  for (let i = 0; i < EER_TABLE.length - 1; i++) {
    if (age >= EER_TABLE[i].ageMonths && age <= EER_TABLE[i + 1].ageMonths) {
      lower = EER_TABLE[i];
      upper = EER_TABLE[i + 1];
      break;
    }
  }

  const span = upper.ageMonths - lower.ageMonths;
  const t = span === 0 ? 0 : (age - lower.ageMonths) / span;

  const refWeight = isBoy
    ? lerp(lower.boyWeightKg, upper.boyWeightKg, t)
    : lerp(lower.girlWeightKg, upper.girlWeightKg, t);

  const refEer = isBoy
    ? lerp(lower.boyEerKcal, upper.boyEerKcal, t)
    : lerp(lower.girlEerKcal, upper.girlEerKcal, t);

  const scaledEer = refEer * Math.pow(profile.weightKg / refWeight, 0.75);
  const eerKcal = Math.max(300, Math.min(1400, Math.round(scaledEer)));

  return {
    eerKcal,
    proteinGMin: Math.round(1.2 * profile.weightKg * 10) / 10,
    proteinGMax: Math.round(1.6 * profile.weightKg * 10) / 10,
  };
}

// ── Texture Eligibility ───────────────────────────────────────────

export function getEligibleTextures(ageMonths: number): TextureTag[] {
  if (ageMonths < 6) return ['puree'];
  if (ageMonths < 9) return ['puree', 'mashed', 'fingerFood'];
  if (ageMonths < 12) return ['puree', 'mashed', 'fingerFood', 'soft'];
  return ['puree', 'mashed', 'fingerFood', 'soft', 'family'];
}

// ── Exclusion Resolution ──────────────────────────────────────────

/**
 * Expands shortcut exclusions. If "vegetarian" is selected, it implies
 * meat + poultry + fish. "vegan" implies all animal products.
 */
function resolveExclusions(exclusions: FoodExclusion[]): Set<FoodExclusion> {
  const resolved = new Set<FoodExclusion>(exclusions);
  if (resolved.has('vegetarian')) {
    resolved.add('meat');
    resolved.add('poultry');
    resolved.add('fish');
  }
  if (resolved.has('vegan')) {
    resolved.add('meat');
    resolved.add('poultry');
    resolved.add('fish');
  }
  return resolved;
}

// ── Deterministic Shuffle ─────────────────────────────────────────

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  const rand = seededRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getDaySeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

// ── Recipe Filtering ──────────────────────────────────────────────

export function filterRecipes(
  profile: ChildProfile,
  slot: MealSlot,
  excludeIds: string[] = []
): { recipe: Recipe; hasSubstitution: boolean; substitutionKeys: string[] }[] {
  const eligibleTextures = getEligibleTextures(profile.ageMonths);
  const resolvedExclusions = resolveExclusions(profile.exclusions ?? []);

  const results: { recipe: Recipe; hasSubstitution: boolean; substitutionKeys: string[] }[] = [];

  for (const recipe of RECIPES) {
    // 1. Meal slot
    if (recipe.mealSlot !== slot) continue;

    // 2. Age
    if (recipe.minAgeMonths > profile.ageMonths) continue;

    // 3. Texture eligibility
    if (!recipe.textures.some(t => eligibleTextures.includes(t))) continue;

    // 4. Allergen exclusion
    const conflictingAllergens = recipe.allergens.filter(a => profile.allergens.includes(a));
    const substitutableAllergens = conflictingAllergens.filter(a => recipe.substitutions[a]);
    const unsafeAllergens = conflictingAllergens.filter(a => !recipe.substitutions[a]);
    if (unsafeAllergens.length > 0) continue;

    // 5. Food exclusions (dietary choices — hard filter, no substitution)
    if (recipe.exclusionTags.some(tag => resolvedExclusions.has(tag))) continue;

    // 6. Cuisine preference
    if (
      profile.cuisinePreferences.length > 0 &&
      !profile.cuisinePreferences.includes(recipe.cuisineRegion)
    ) continue;

    // 7. Exclude already-shown IDs
    if (excludeIds.includes(recipe.id)) continue;

    results.push({
      recipe,
      hasSubstitution: substitutableAllergens.length > 0,
      substitutionKeys: substitutableAllergens.map(a => recipe.substitutions[a]!),
    });
  }

  return results;
}

// ── ARFID Exposure Step ───────────────────────────────────────────

const SLOT_ARFID_OFFSET: Record<MealSlot, number> = {
  breakfast: 0,
  lunch: 1,
  dinner: 2,
};

export function getExposureStep(slot: MealSlot): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return ((dayOfYear + SLOT_ARFID_OFFSET[slot]) % 5) + 1;
}

// ── Daily Plan Generation ─────────────────────────────────────────

const SLOT_EER_SPLIT: Record<MealSlot, number> = {
  breakfast: 0.25,
  lunch: 0.40,
  dinner: 0.35,
};

function pickMeal(
  profile: ChildProfile,
  slot: MealSlot,
  nutrition: NutritionProfile,
  daySeed: number,
  excludeIds: string[] = []
): PlannedMeal {
  let candidates = filterRecipes(profile, slot, excludeIds);

  // Fallback 1: relax cuisine preference
  if (candidates.length === 0 && profile.cuisinePreferences.length > 0) {
    candidates = filterRecipes({ ...profile, cuisinePreferences: [] }, slot, excludeIds);
  }

  // Fallback 2: hardcoded safe recipe
  if (candidates.length === 0) {
    candidates = [{ recipe: FALLBACK_RECIPES[slot], hasSubstitution: false, substitutionKeys: [] }];
  }

  const shuffled = shuffleWithSeed(candidates, daySeed + slot.charCodeAt(0));
  const chosen = shuffled[0];

  const slotTarget       = nutrition.eerKcal * SLOT_EER_SPLIT[slot];
  const scaleFactor      = slotTarget / chosen.recipe.nutrition.kcal;
  const adjustedKcal     = Math.round(chosen.recipe.nutrition.kcal * scaleFactor);
  const adjustedProteinG = Math.round(chosen.recipe.nutrition.proteinG * scaleFactor * 10) / 10;

  const result: PlannedMeal = {
    recipe: chosen.recipe,
    adjustedKcal,
    adjustedProteinG,
    hasSubstitution: chosen.hasSubstitution,
    substitutionKeys: chosen.substitutionKeys,
  };

  if (profile.hasArfid) {
    result.exposureStep = getExposureStep(slot);
  }

  return result;
}

export function generateDailyPlan(profile: ChildProfile): DailyPlan {
  const nutrition = calculateNutrition(profile);
  const daySeed = getDaySeed();

  const breakfast = pickMeal(profile, 'breakfast', nutrition, daySeed, []);
  const lunch     = pickMeal(profile, 'lunch',     nutrition, daySeed, [breakfast.recipe.id]);
  const dinner    = pickMeal(profile, 'dinner',    nutrition, daySeed, [breakfast.recipe.id, lunch.recipe.id]);

  return {
    breakfast,
    lunch,
    dinner,
    totalKcal: breakfast.adjustedKcal + lunch.adjustedKcal + dinner.adjustedKcal,
    targetKcal: nutrition.eerKcal,
    date: new Date().toISOString().split('T')[0],
  };
}

export function regenerateMeal(
  profile: ChildProfile,
  slot: MealSlot,
  currentPlan: DailyPlan
): PlannedMeal {
  const nutrition = calculateNutrition(profile);
  const otherSlots = (['breakfast', 'lunch', 'dinner'] as MealSlot[]).filter(s => s !== slot);
  const excludeIds = [
    currentPlan[slot].recipe.id,
    ...otherSlots.map(s => currentPlan[s].recipe.id),
  ];

  let candidates = filterRecipes(profile, slot, excludeIds);
  if (candidates.length === 0 && profile.cuisinePreferences.length > 0) {
    candidates = filterRecipes({ ...profile, cuisinePreferences: [] }, slot, excludeIds);
  }

  const seed = Date.now();
  const shuffled = shuffleWithSeed(
    candidates.length > 0
      ? candidates
      : [{ recipe: FALLBACK_RECIPES[slot], hasSubstitution: false, substitutionKeys: [] }],
    seed
  );
  const chosen = shuffled[0];

  const slotTarget       = nutrition.eerKcal * SLOT_EER_SPLIT[slot];
  const scaleFactor      = slotTarget / chosen.recipe.nutrition.kcal;
  const adjustedKcal     = Math.round(chosen.recipe.nutrition.kcal * scaleFactor);
  const adjustedProteinG = Math.round(chosen.recipe.nutrition.proteinG * scaleFactor * 10) / 10;

  const result: PlannedMeal = {
    recipe: chosen.recipe,
    adjustedKcal,
    adjustedProteinG,
    hasSubstitution: chosen.hasSubstitution,
    substitutionKeys: chosen.substitutionKeys,
  };

  if (profile.hasArfid) {
    result.exposureStep = getExposureStep(slot);
  }

  return result;
}
