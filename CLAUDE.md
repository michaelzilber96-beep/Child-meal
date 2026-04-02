# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build (also runs lint + type check)
npm run lint       # ESLint only
npx tsc --noEmit   # Type-check only, no emit
```

No test framework is configured. Preferred verification path on low-memory machines (build worker can OOM):
```bash
npx tsc --noEmit && npm run lint
```

## Architecture

### Routing & Localization

**next-intl** with an `[locale]` dynamic segment. Three locales: `he` (default, RTL), `en`, `ru`. Middleware in `src/middleware.ts` detects locale from Accept-Language and redirects `/` to `/{locale}`. Message files live in `messages/{he,en,ru}.json`.

The `dir` attribute (`rtl`/`ltr`) is set on `<html>` in `src/app/[locale]/layout.tsx`. RTL layout uses Tailwind `rtl:` variants throughout (flex reversal, gradient direction, progress bar, toggle thumb, nav arrows).

### Data Flow

```
Child profile (localStorage)
  → useMealPlan hook
  → mealEngine.ts  [calculateNutrition + filterRecipes]
  → DailyPlan      [3 PlannedMeal objects]
  → MealPlanDashboard
```

All state is client-side only — no server actions, no API routes. Profile is persisted to `localStorage` under key `babyMealPlanner_v1`. Onboarding draft uses `sessionStorage` under `babyMealPlanner_draft` to survive the locale-redirect that fires when the user picks a language on step 1.

### Gender Theming

`ThemeProvider` (client component) sets `data-gender="boy"|"girl"` on `<html>`. CSS variables in `globals.css` switch the full palette: girl → rose/peach, boy → azure/sky. Tailwind token `th.*` (e.g. `bg-th-primary`, `border-th-dim`) consumes those variables.

**ThemeProvider must be rendered in every top-level page** — currently in `OnboardingWizard` and `MealPlanDashboard`. Without it the palette stays at the girl/default fallback.

Dashboard greeting card and calorie bar use inline `style` with `var(--th-*)` rather than Tailwind classes so they switch correctly. The greeting-specific variables (`--th-greeting-from/to/border`) are also defined in `globals.css` for both genders.

### Locale + Gender — Dashboard Strings

For Hebrew (`locale === 'he'`), the dashboard selects:
- Header tagline: `ta('taglineBoy')` / `ta('taglineGirl')` (same logic as onboarding)
- Greeting: `t('greetingBoy')` / `t('greetingGirl')` — distinct keys with gendered child references ("הקטן שלך" / "הקטנה שלך")

For `en` / `ru`, always use the generic `greeting` / `tagline` keys.

### Meal Engine (`src/lib/mealEngine.ts`)

- **EER**: linear interpolation between 4 WHO reference points (ages 1, 6, 12, 24 months, `src/data/eerTable.ts`), then allometric scaling: `EER = refEER × (actualWeight / refWeight)^0.75`
- **Filtering pipeline**: slot → min-age → texture eligibility → allergen exclusion → food exclusions → cuisine preference → exclude already-shown IDs → deterministic shuffle by date seed
- **Allergen rule**: allergens with a `substitutions[allergen]` key keep the recipe but show a yellow warning banner; allergens without substitutions hard-exclude the recipe
- **Exclusion rule**: `vegetarian` and `vegan` are mutually exclusive in `ExclusionsStep` (selecting one removes the other). The engine checks `recipe.exclusionTags` against the profile's `exclusions[]`.
- **Fallback**: relax cuisine preference first; if still empty, use a hardcoded allergen-free recipe

### Recipe Database (`src/data/recipeDatabase.ts`)

17 recipes hardcoded as `Recipe[]`. Each has:
- `nameKey` / `benefitKey` stored as `"recipes.xxx"` — strip the `"recipes."` prefix before passing to `useTranslations('recipes')`
- `flagEmoji` — actual Unicode flag emoji (e.g. `🇯🇵`), not country codes
- `allergens[]` / `exclusionTags[]` / `textures[]` — all filter dimensions
- `substitutions` — `Partial<Record<Allergen, string>>` mapping allergen → i18n key for the substitution note

### Translation Key Convention

Recipe i18n keys: `recipes.{id}Name`, `recipes.{id}Benefit`, `recipes.{id}{Allergen}Sub`. When calling `useTranslations('recipes')`, strip the `"recipes."` prefix. Cast workaround in `MealCard.tsx`:
```ts
(tr as (k: string) => string)(key.replace('recipes.', ''))
```

Hebrew CTAs use slash-notation for gender inclusivity: `"בחר/י"`, `"ספר/י"`, `"סמן/י"` etc. Keep this pattern when adding Hebrew strings.

### MealCard Animation

`MealCard` takes an `animKey: number` prop. The animated content `<div key={animKey}>` re-mounts and plays `animate-meal-in` (250ms cubic-bezier fade+slide, defined in `globals.css`) whenever the key increments. `MealPlanDashboard` owns a `Record<MealSlot, number>` state and increments the slot's counter inside `handleChangeMeal` before calling `onChangeMeal`.

### RTL Navigation Arrow Pattern

Used in `OnboardingWizard` nav buttons:
- **Next**: `→` visible in LTR (`ltr:inline rtl:hidden`); `←` rendered with `order-first` in RTL (`rtl:inline ltr:hidden order-first`) so it appears before the label
- **Back**: `←` in LTR (`ltr:inline rtl:hidden`); `→` after the label in RTL (`rtl:inline ltr:hidden`)

### Clinical Tooltip Pattern

`Tooltip` and `InfoTooltip` in `src/components/ui/Tooltip.tsx` — hover/focus/tap accessible. Use `InfoTooltip` for inline label + icon combos. When adding clinical terms (e.g. "Exposure Ladder"), place `<Tooltip content={t('tooltipDesc')} />` beside the label. **Do not nest a `<Tooltip>` inside a `<button>`** — the Tooltip renders its own `<button>` trigger.

### Key Constraints

- `@typescript-eslint/*` ESLint rules are NOT installed — do not add `// eslint-disable-next-line @typescript-eslint/...` comments; use plain `// eslint-disable-line` or fix the type
- Next.js must stay at **v15.x** — next-intl 3.x does not support Next.js 16+
- The project folder name contains spaces and capitals, so `npx create-next-app` cannot scaffold into it directly
