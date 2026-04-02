import { AppStorage, ChildProfile, DailyPlan } from '@/types';

const STORAGE_KEY = 'babyMealPlanner_v1';
const SESSION_KEY = 'babyMealPlanner_draft';

function defaultStorage(): AppStorage {
  return {
    profile: null,
    lastPlan: null,
    planHistory: [],
    onboardingComplete: false,
  };
}

export function loadStorage(): AppStorage {
  if (typeof window === 'undefined') return defaultStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStorage();
    return { ...defaultStorage(), ...JSON.parse(raw) };
  } catch {
    return defaultStorage();
  }
}

export function saveStorage(data: Partial<AppStorage>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = loadStorage();
    const updated = { ...current, ...data };
    // Keep only last 7 plan history entries
    if (updated.planHistory.length > 7) {
      updated.planHistory = updated.planHistory.slice(-7);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail if storage is unavailable
  }
}

export function saveProfile(profile: ChildProfile): void {
  saveStorage({ profile, onboardingComplete: true });
}

export function savePlan(plan: DailyPlan): void {
  const current = loadStorage();
  const history = [...current.planHistory];
  if (!history.find(p => p.date === plan.date)) {
    history.push(plan);
  }
  saveStorage({ lastPlan: plan, planHistory: history });
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}

// Session storage for onboarding draft (survives locale redirect)
export function saveDraft(data: Partial<ChildProfile>): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch {
    // Silently fail
  }
}

export function loadDraft(): Partial<ChildProfile> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Silently fail
  }
}
