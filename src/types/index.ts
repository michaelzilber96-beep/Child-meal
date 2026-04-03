// ── Enums & Unions ────────────────────────────────────────────────
export type Locale = 'he' | 'en' | 'ru';
export type Gender = 'boy' | 'girl';

export type Allergen =
  | 'dairy'
  | 'eggs'
  | 'peanuts'
  | 'gluten'
  | 'sesame'
  | 'treeNuts'
  | 'soy'
  | 'fish';

export type FoodExclusion =
  | 'meat'       // red meat / beef
  | 'poultry'    // chicken, turkey
  | 'fish'       // all seafood
  | 'addedSugar' // dishes with added refined sugar
  | 'vegetarian' // shortcut: excludes meat + poultry + fish
  | 'vegan';     // shortcut: excludes all animal products

export type CuisineRegion =
  | 'mediterranean'
  | 'asian'
  | 'european'
  | 'middleEastern'
  | 'latinAmerican'
  | 'african'
  | 'israeli';

export type TextureTag =
  | 'puree'
  | 'mashed'
  | 'fingerFood'
  | 'soft'
  | 'family';

export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

// ── Child Profile ─────────────────────────────────────────────────
export interface ChildProfile {
  name: string;
  gender: Gender;
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  allergens: Allergen[];
  exclusions: FoodExclusion[];
  cuisinePreferences: CuisineRegion[];
  locale: Locale;
  createdAt: string;
}

// ── Nutrition ─────────────────────────────────────────────────────
export interface NutritionProfile {
  eerKcal: number;
  proteinGMin: number;
  proteinGMax: number;
}

export interface MealNutrition {
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

// ── Recipe ────────────────────────────────────────────────────────
export interface Recipe {
  id: string;
  nameKey: string;
  descriptionKey: string;
  benefitKey: string;
  origin: string;
  flagEmoji: string;
  cuisineRegion: CuisineRegion;
  mealSlot: MealSlot;
  minAgeMonths: number;
  allergens: Allergen[];
  exclusionTags: FoodExclusion[];
  textures: TextureTag[];
  nutrition: MealNutrition;
  substitutions: Partial<Record<Allergen, string>>;
}

// ── Daily Plan ────────────────────────────────────────────────────
export interface PlannedMeal {
  recipe: Recipe;
  adjustedKcal: number;
  adjustedProteinG: number;
  hasSubstitution: boolean;
  substitutionKeys: string[];
}

export interface DailyPlan {
  breakfast: PlannedMeal;
  lunch: PlannedMeal;
  dinner: PlannedMeal;
  totalKcal: number;
  targetKcal: number;
  date: string;
  profileHash?: string;
}

// ── EER Reference ─────────────────────────────────────────────────
export interface EERReferencePoint {
  ageMonths: number;
  boyWeightKg: number;
  boyEerKcal: number;
  girlWeightKg: number;
  girlEerKcal: number;
}

// ── Storage ───────────────────────────────────────────────────────
export interface AppStorage {
  profile: ChildProfile | null;
  lastPlan: DailyPlan | null;
  planHistory: DailyPlan[];
  onboardingComplete: boolean;
}
