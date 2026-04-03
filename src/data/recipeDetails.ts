/**
 * recipeDetails.ts
 *
 * Full recipe details for all 47 TinyBites recipes.
 * Each entry is keyed by the recipe id used in recipeDatabase.ts.
 *
 * Fields per recipe:
 *  - ingredients        : list of { quantity, unit, item }
 *  - instructions       : ordered steps as string[]
 *  - prepMinutes        : prep time in minutes
 *  - cookMinutes        : cook time in minutes
 *  - nutritionPerServing: { kcal, proteinG, carbsG, fatG }
 *  - servingSizeByAge   : portions for 4-6m / 7-9m / 10-12m / 12-24m
 *  - spiceSaltNote      : safety guidance on salt and spices by age
 *  - equipment          : tools needed
 */

export interface Ingredient {
  quantity: string;
  unit: string;
  item: string;
}

export interface ServingSizeByAge {
  months4to6: string;
  months7to9: string;
  months10to12: string;
  months12to24: string;
}

export interface RecipeDetail {
  id: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepMinutes: number;
  cookMinutes: number;
  nutritionPerServing: {
    kcal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
  };
  servingSizeByAge: ServingSizeByAge;
  spiceSaltNote: string;
  equipment: string[];
}

export const RECIPE_DETAILS: Record<string, RecipeDetail> = {

  // ─────────────────────────────────────────────────────────────
  // BREAKFAST — original 5
  // ─────────────────────────────────────────────────────────────

  okayu: {
    id: 'okayu',
    ingredients: [
      { quantity: '30', unit: 'g', item: 'Japanese short-grain white rice' },
      { quantity: '300', unit: 'ml', item: 'water' },
      { quantity: '50', unit: 'g', item: 'silken tofu' },
      { quantity: '1', unit: 'tsp', item: 'mild low-sodium dashi stock (optional, 12m+)' },
    ],
    instructions: [
      'Rinse rice under cold water until water runs clear.',
      'Combine rice and water in a small saucepan over medium heat.',
      'Bring to a boil, then reduce heat to the lowest setting.',
      'Simmer uncovered for 25-30 minutes, stirring occasionally, until rice is very soft and porridge-like.',
      'Crumble silken tofu into the pot and stir gently for 2 minutes until warmed through.',
      'For under 9 months: blend or mash to a smooth consistency.',
      'For 9 months+: serve as is with small soft curds of tofu.',
    ],
    prepMinutes: 5,
    cookMinutes: 30,
    nutritionPerServing: { kcal: 120, proteinG: 5, carbsG: 20, fatG: 2 },
    servingSizeByAge: {
      months4to6: '2-3 tablespoons',
      months7to9: '4-5 tablespoons',
      months10to12: '6-8 tablespoons',
      months12to24: 'Full bowl (120-150ml)',
    },
    spiceSaltNote: 'No salt or dashi for under 12 months. For 12 months+ a tiny pinch of low-sodium dashi can be added for flavour.',
    equipment: ['Small saucepan', 'Blender or fork'],
  },

  'arepas-con-queso': {
    id: 'arepas-con-queso',
    ingredients: [
      { quantity: '100', unit: 'g', item: 'pre-cooked white cornmeal (masarepa)' },
      { quantity: '120', unit: 'ml', item: 'warm water' },
      { quantity: '30', unit: 'g', item: 'mild white cheese (queso blanco or mozzarella), grated' },
      { quantity: '1', unit: 'tsp', item: 'unsalted butter' },
    ],
    instructions: [
      'Mix cornmeal with warm water in a bowl until a soft dough forms. Rest 2 minutes.',
      'Fold in grated cheese.',
      'Divide into 4 small balls and flatten each into a disc about 1cm thick.',
      'Heat butter in a non-stick pan over medium-low heat.',
      'Cook arepas 4-5 minutes per side until golden and cooked through.',
      'Cool completely before serving. Cut into small strips for finger food.',
    ],
    prepMinutes: 10,
    cookMinutes: 12,
    nutritionPerServing: { kcal: 180, proteinG: 7, carbsG: 28, fatG: 5 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '1 small arepa cut into strips',
      months12to24: '1-2 small arepas',
    },
    spiceSaltNote: 'Use unsalted butter and unsalted cheese. No added salt at any age under 12 months. For 12 months+ a very small amount of salt in the dough is acceptable.',
    equipment: ['Mixing bowl', 'Non-stick frying pan', 'Spatula'],
  },

  'gallo-pinto': {
    id: 'gallo-pinto',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'cooked white rice' },
      { quantity: '60', unit: 'g', item: 'cooked black beans (rinsed if canned)' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '2', unit: 'tbsp', item: 'finely diced onion' },
      { quantity: '1', unit: 'tbsp', item: 'finely diced red pepper' },
      { quantity: '1', unit: 'pinch', item: 'ground cumin (12 months+)' },
    ],
    instructions: [
      'Heat olive oil in a small pan over medium heat.',
      'Saute onion and red pepper for 3-4 minutes until very soft.',
      'Add cooked rice and beans, stir to combine.',
      'Cook for 3 minutes until heated through.',
      'For 6-9 months: mash well with a fork or blend briefly.',
      'For 9 months+: serve as soft mixture.',
    ],
    prepMinutes: 5,
    cookMinutes: 10,
    nutritionPerServing: { kcal: 160, proteinG: 6, carbsG: 30, fatG: 2 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 6 months',
      months7to9: '3-4 tablespoons mashed',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full child portion (100-120g)',
    },
    spiceSaltNote: 'No salt or cumin for under 12 months. For 12 months+ a pinch of cumin adds authentic flavour safely.',
    equipment: ['Small frying pan', 'Fork or blender'],
  },

  'nhopi-pumpkin-puree': {
    id: 'nhopi-pumpkin-puree',
    ingredients: [
      { quantity: '150', unit: 'g', item: 'peeled pumpkin or butternut squash, cubed' },
      { quantity: '1', unit: 'tbsp', item: 'smooth peanut butter (or sunflower seed butter)' },
      { quantity: '2', unit: 'tbsp', item: 'water or unsalted vegetable stock' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Steam pumpkin cubes for 12-15 minutes until completely tender.',
      'Transfer to a bowl and mash thoroughly.',
      'Stir in peanut butter and oil until fully combined.',
      'Add water or stock to reach desired consistency.',
      'For under 6 months: blend until completely smooth.',
      'For 6 months+: mashed texture is fine.',
    ],
    prepMinutes: 5,
    cookMinutes: 15,
    nutritionPerServing: { kcal: 130, proteinG: 4, carbsG: 18, fatG: 5 },
    servingSizeByAge: {
      months4to6: '2-3 tablespoons smooth puree',
      months7to9: '4-5 tablespoons',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full portion (100-120g)',
    },
    spiceSaltNote: 'No salt at any stage. Pumpkin and peanut butter provide enough natural flavour. No spices needed.',
    equipment: ['Steamer or saucepan', 'Blender or fork'],
  },

  boxty: {
    id: 'boxty',
    ingredients: [
      { quantity: '100', unit: 'g', item: 'raw potato, peeled and finely grated' },
      { quantity: '100', unit: 'g', item: 'mashed potato (cooked)' },
      { quantity: '50', unit: 'g', item: 'plain flour' },
      { quantity: '50', unit: 'ml', item: 'whole milk' },
      { quantity: '1', unit: 'tsp', item: 'unsalted butter for frying' },
    ],
    instructions: [
      'Squeeze as much liquid as possible from the grated raw potato using a clean cloth.',
      'Combine grated potato, mashed potato, flour, and milk in a bowl. Mix to a thick batter.',
      'Heat butter in a non-stick pan over medium-low heat.',
      'Drop tablespoons of batter into the pan and flatten slightly.',
      'Cook 3-4 minutes per side until golden and cooked through.',
      'Cool before serving. Cut into small pieces or strips.',
    ],
    prepMinutes: 10,
    cookMinutes: 10,
    nutritionPerServing: { kcal: 150, proteinG: 3, carbsG: 28, fatG: 4 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '1-2 small pancakes cut into strips',
      months12to24: '2-3 small pancakes',
    },
    spiceSaltNote: 'No salt in the batter for under 12 months. For 12 months+ a very small pinch of salt in the batter is fine.',
    equipment: ['Grater', 'Clean cloth or muslin', 'Non-stick frying pan'],
  },

  // ─────────────────────────────────────────────────────────────
  // BREAKFAST — 10 new
  // ─────────────────────────────────────────────────────────────

  'congee-chicken': {
    id: 'congee-chicken',
    ingredients: [
      { quantity: '30', unit: 'g', item: 'jasmine or short-grain rice' },
      { quantity: '400', unit: 'ml', item: 'water or unsalted chicken stock' },
      { quantity: '40', unit: 'g', item: 'boneless skinless chicken breast' },
      { quantity: '1', unit: 'tsp', item: 'fresh ginger, finely grated (10 months+)' },
    ],
    instructions: [
      'Place rice and water in a saucepan over medium heat.',
      'Add whole chicken breast to the pot.',
      'Bring to a boil, reduce to a low simmer.',
      'Cook uncovered for 30-35 minutes, stirring occasionally, until rice breaks down into porridge.',
      'Remove chicken and shred finely with two forks, then return to pot.',
      'Add ginger only if child is 10 months or older.',
      'For under 8 months: blend to smooth consistency.',
      'For 8 months+: serve as silky shredded congee.',
    ],
    prepMinutes: 5,
    cookMinutes: 35,
    nutritionPerServing: { kcal: 140, proteinG: 8, carbsG: 22, fatG: 2 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 6 months',
      months7to9: '4-5 tablespoons blended smooth',
      months10to12: '6-8 tablespoons with soft shreds',
      months12to24: 'Full bowl (150ml)',
    },
    spiceSaltNote: 'No salt at any age. No ginger for under 10 months. For 10 months+ a tiny amount of fresh ginger is safe and supports digestion.',
    equipment: ['Medium saucepan', 'Two forks for shredding', 'Blender (optional)'],
  },

  'semolina-porridge': {
    id: 'semolina-porridge',
    ingredients: [
      { quantity: '3', unit: 'tbsp', item: 'fine semolina' },
      { quantity: '200', unit: 'ml', item: 'whole milk (or oat milk)' },
      { quantity: '100', unit: 'ml', item: 'water' },
      { quantity: '1', unit: 'tsp', item: 'unsalted butter' },
      { quantity: '1', unit: 'pinch', item: 'cinnamon (10 months+)' },
    ],
    instructions: [
      'Combine milk and water in a small saucepan over medium heat.',
      'When just starting to steam, whisk in semolina in a slow stream.',
      'Stir continuously for 3-4 minutes until thick and smooth.',
      'Remove from heat and stir in butter.',
      'Add cinnamon only if child is 10 months or older.',
      'Cool to lukewarm before serving.',
    ],
    prepMinutes: 2,
    cookMinutes: 6,
    nutritionPerServing: { kcal: 155, proteinG: 5, carbsG: 26, fatG: 4 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 6 months',
      months7to9: '3-4 tablespoons',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full bowl (150ml)',
    },
    spiceSaltNote: 'No salt. No cinnamon for under 10 months. For 10 months+ a small pinch of cinnamon is safe and adds warmth.',
    equipment: ['Small saucepan', 'Whisk'],
  },

  'banana-oat-mash': {
    id: 'banana-oat-mash',
    ingredients: [
      { quantity: '3', unit: 'tbsp', item: 'rolled oats' },
      { quantity: '150', unit: 'ml', item: 'water or whole milk' },
      { quantity: '1', unit: 'small', item: 'ripe banana' },
    ],
    instructions: [
      'Cook oats in water or milk over medium heat for 3-4 minutes, stirring, until thick.',
      'Meanwhile mash banana to a smooth paste with a fork.',
      'Stir mashed banana into cooked oats.',
      'For under 6 months: blend until completely smooth.',
      'For 6 months+: slightly lumpy texture is appropriate.',
      'Cool before serving.',
    ],
    prepMinutes: 2,
    cookMinutes: 5,
    nutritionPerServing: { kcal: 135, proteinG: 3, carbsG: 25, fatG: 3 },
    servingSizeByAge: {
      months4to6: '2-3 tablespoons smooth puree',
      months7to9: '4 tablespoons',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full bowl',
    },
    spiceSaltNote: 'No salt needed. Banana provides natural sweetness. No spices required at any age.',
    equipment: ['Small saucepan', 'Fork', 'Blender (optional)'],
  },

  'labneh-date': {
    id: 'labneh-date',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'labneh or thick strained yogurt' },
      { quantity: '2', unit: 'whole', item: 'Medjool dates, pitted and finely chopped' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Ensure dates are completely soft - soak in warm water for 5 minutes if needed.',
      'Remove all pits and chop dates into very small pieces.',
      'For under 12 months: blend dates to a smooth paste before mixing.',
      'Stir date paste into labneh until combined.',
      'Drizzle with olive oil.',
      'Serve immediately or refrigerate up to 24 hours.',
    ],
    prepMinutes: 8,
    cookMinutes: 0,
    nutritionPerServing: { kcal: 165, proteinG: 8, carbsG: 20, fatG: 6 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '3-4 tablespoons',
      months12to24: '4-5 tablespoons',
    },
    spiceSaltNote: 'No salt. Labneh is naturally slightly salty - choose the lowest-sodium variety available.',
    equipment: ['Bowl', 'Fork or blender'],
  },

  'akara-fritters': {
    id: 'akara-fritters',
    ingredients: [
      { quantity: '100', unit: 'g', item: 'dried black-eyed peas, soaked overnight' },
      { quantity: '2', unit: 'tbsp', item: 'water' },
      { quantity: '2', unit: 'tbsp', item: 'finely diced onion' },
      { quantity: '1', unit: 'tbsp', item: 'olive oil for baking' },
    ],
    instructions: [
      'Drain and rinse soaked peas. Rub between your hands to remove skins.',
      'Blend peas with water to a smooth thick batter.',
      'Stir in diced onion.',
      'Preheat oven to 200C. Grease a mini muffin tray with olive oil.',
      'Fill each cup two-thirds full with batter.',
      'Bake for 18-20 minutes until golden and set.',
      'Cool completely. Serve whole for finger food or mash for younger babies.',
    ],
    prepMinutes: 15,
    cookMinutes: 20,
    nutritionPerServing: { kcal: 170, proteinG: 8, carbsG: 22, fatG: 6 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '1-2 fritters mashed or whole',
      months12to24: '2-3 fritters',
    },
    spiceSaltNote: 'No salt or chilli at any age under 24 months. Onion provides enough flavour on its own.',
    equipment: ['Blender', 'Mini muffin tray', 'Oven'],
  },

  'sweet-potato-pancakes': {
    id: 'sweet-potato-pancakes',
    ingredients: [
      { quantity: '100', unit: 'g', item: 'sweet potato, peeled and steamed until very soft' },
      { quantity: '1', unit: 'large', item: 'egg (or 1 tbsp flaxseed + 3 tbsp water)' },
      { quantity: '2', unit: 'tbsp', item: 'plain flour' },
      { quantity: '1', unit: 'tsp', item: 'unsalted butter for frying' },
    ],
    instructions: [
      'Mash steamed sweet potato until completely smooth.',
      'Beat in egg (or flax egg) until combined.',
      'Stir in flour to form a soft batter.',
      'Heat butter in a non-stick pan over low-medium heat.',
      'Drop tablespoons of batter and flatten to small discs.',
      'Cook 2-3 minutes per side until set and lightly golden.',
      'Cool before serving. Cut into strips or small pieces.',
    ],
    prepMinutes: 10,
    cookMinutes: 10,
    nutritionPerServing: { kcal: 155, proteinG: 5, carbsG: 24, fatG: 5 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '1-2 small pancakes cut into strips',
      months12to24: '2-3 small pancakes',
    },
    spiceSaltNote: 'No salt. Sweet potato is naturally sweet. No spices needed for under 12 months.',
    equipment: ['Steamer', 'Non-stick frying pan', 'Fork'],
  },

  'fruit-couscous': {
    id: 'fruit-couscous',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'fine couscous' },
      { quantity: '100', unit: 'ml', item: 'boiling water' },
      { quantity: '3', unit: 'whole', item: 'dried apricots, soaked in warm water until soft' },
      { quantity: '1', unit: 'tbsp', item: 'raisins, soaked in warm water' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Place couscous in a bowl, pour boiling water over, cover and stand 5 minutes.',
      'Fluff with a fork.',
      'Drain and finely chop or blend soaked apricots and raisins.',
      'Stir fruit mixture and olive oil into couscous.',
      'For 7-9 months: mash lightly or blend briefly for smoother texture.',
      'For 10 months+: serve as soft couscous with fruit pieces.',
    ],
    prepMinutes: 10,
    cookMinutes: 0,
    nutritionPerServing: { kcal: 145, proteinG: 4, carbsG: 27, fatG: 2 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 7 months',
      months7to9: '3-4 tablespoons mashed',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full portion',
    },
    spiceSaltNote: 'No salt. No spices for under 12 months. For 12 months+ a pinch of cinnamon complements the fruit well.',
    equipment: ['Bowl', 'Fork', 'Blender (optional)'],
  },

  'cottage-cheese-apple': {
    id: 'cottage-cheese-apple',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'full-fat cottage cheese' },
      { quantity: '1', unit: 'small', item: 'sweet apple (Fuji or Gala), peeled and finely grated' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Grate apple finely, discarding any liquid that pools.',
      'Combine cottage cheese and grated apple in a bowl.',
      'Drizzle with olive oil and stir gently.',
      'For 9-10 months: blend until smooth if preferred.',
      'For 10 months+: serve with small curd texture.',
      'Serve immediately.',
    ],
    prepMinutes: 5,
    cookMinutes: 0,
    nutritionPerServing: { kcal: 140, proteinG: 10, carbsG: 16, fatG: 4 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '3-4 tablespoons',
      months12to24: '4-5 tablespoons',
    },
    spiceSaltNote: 'Choose the lowest-sodium cottage cheese available. No added salt. No spices needed.',
    equipment: ['Grater', 'Bowl', 'Blender (optional)'],
  },

  'millet-porridge': {
    id: 'millet-porridge',
    ingredients: [
      { quantity: '40', unit: 'g', item: 'hulled millet' },
      { quantity: '250', unit: 'ml', item: 'water' },
      { quantity: '50', unit: 'ml', item: 'whole milk or oat milk' },
      { quantity: '1', unit: 'tsp', item: 'unsalted butter' },
      { quantity: '1', unit: 'pinch', item: 'cinnamon (optional, 10 months+)' },
    ],
    instructions: [
      'Rinse millet under cold water.',
      'Toast millet in a dry saucepan for 2 minutes over medium heat.',
      'Add water, bring to a boil, reduce to a simmer.',
      'Cook covered for 20 minutes until water is absorbed.',
      'Stir in milk and butter, cook a further 3 minutes.',
      'For under 7 months: blend until completely smooth.',
      'For 7 months+: serve soft with gentle lumps.',
    ],
    prepMinutes: 3,
    cookMinutes: 25,
    nutritionPerServing: { kcal: 125, proteinG: 4, carbsG: 22, fatG: 2 },
    servingSizeByAge: {
      months4to6: '2-3 tablespoons smooth puree',
      months7to9: '4-5 tablespoons',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full bowl',
    },
    spiceSaltNote: 'No salt. No cinnamon for under 10 months. Millet has a mild nutty flavour babies enjoy without seasoning.',
    equipment: ['Small saucepan with lid', 'Blender (optional)'],
  },

  'greek-yogurt-berries': {
    id: 'greek-yogurt-berries',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'full-fat plain Greek yogurt' },
      { quantity: '40', unit: 'g', item: 'fresh or frozen blueberries or raspberries' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'If using frozen berries, thaw completely and drain excess liquid.',
      'Mash berries well with a fork until no large pieces remain.',
      'For under 10 months: blend berries to a smooth puree before mixing.',
      'Fold berry puree into Greek yogurt.',
      'Drizzle with olive oil.',
      'Serve immediately.',
    ],
    prepMinutes: 5,
    cookMinutes: 0,
    nutritionPerServing: { kcal: 130, proteinG: 9, carbsG: 14, fatG: 4 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '3-4 tablespoons',
      months12to24: '4-5 tablespoons',
    },
    spiceSaltNote: 'No salt. Choose plain unsweetened yogurt - never flavoured or sweetened varieties for babies.',
    equipment: ['Fork or blender', 'Bowl'],
  },

  // ─────────────────────────────────────────────────────────────
  // LUNCH — original 6
  // ─────────────────────────────────────────────────────────────

  'dal-lentil-curry': {
    id: 'dal-lentil-curry',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'red lentils, rinsed' },
      { quantity: '400', unit: 'ml', item: 'water or unsalted vegetable stock' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '2', unit: 'tbsp', item: 'finely diced onion' },
      { quantity: '1', unit: 'small', item: 'garlic clove, minced (10 months+)' },
      { quantity: '1/4', unit: 'tsp', item: 'ground turmeric' },
      { quantity: '1/4', unit: 'tsp', item: 'ground cumin (10 months+)' },
    ],
    instructions: [
      'Heat oil in a small saucepan, saute onion for 3 minutes until soft.',
      'Add garlic and turmeric, stir for 30 seconds.',
      'Add rinsed lentils and stock.',
      'Bring to a boil, reduce heat, simmer 20 minutes until lentils are very soft.',
      'Add cumin only if child is 10 months or older.',
      'For under 8 months: blend completely smooth.',
      'For 8 months+: mash with a fork for a thicker texture.',
    ],
    prepMinutes: 5,
    cookMinutes: 25,
    nutritionPerServing: { kcal: 200, proteinG: 9, carbsG: 32, fatG: 4 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 6 months',
      months7to9: '4-5 tablespoons blended smooth',
      months10to12: '6-8 tablespoons mashed',
      months12to24: 'Full portion (120-150g)',
    },
    spiceSaltNote: 'No salt at any age. Turmeric is safe from 6 months. Garlic and cumin are safe from 10 months in small amounts.',
    equipment: ['Small saucepan', 'Blender or fork'],
  },

  koshari: {
    id: 'koshari',
    ingredients: [
      { quantity: '40', unit: 'g', item: 'brown or green lentils' },
      { quantity: '40', unit: 'g', item: 'short pasta (ditalini or broken spaghetti)' },
      { quantity: '40', unit: 'g', item: 'white rice' },
      { quantity: '100', unit: 'ml', item: 'plain passata (no added salt)' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1/4', unit: 'tsp', item: 'ground cumin (12 months+)' },
    ],
    instructions: [
      'Cook lentils in unsalted water for 20 minutes until tender. Drain.',
      'Cook pasta and rice separately in unsalted water. Drain.',
      'Heat passata in a small pan with olive oil for 5 minutes.',
      'Combine lentils, pasta, and rice in a bowl.',
      'Pour tomato sauce over and mix gently.',
      'Add cumin only if child is 12 months or older.',
      'For 9-11 months: mash lightly before serving.',
    ],
    prepMinutes: 10,
    cookMinutes: 25,
    nutritionPerServing: { kcal: 250, proteinG: 8, carbsG: 48, fatG: 3 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '5-6 tablespoons mashed',
      months12to24: 'Full portion (130-150g)',
    },
    spiceSaltNote: 'No salt. Use only unsalted passata. Cumin safe from 12 months only.',
    equipment: ['Two small saucepans', 'Fork'],
  },

  'paella-chicken': {
    id: 'paella-chicken',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'short-grain rice (bomba or arborio)' },
      { quantity: '60', unit: 'g', item: 'boneless skinless chicken thigh, finely diced' },
      { quantity: '200', unit: 'ml', item: 'unsalted chicken stock' },
      { quantity: '30', unit: 'g', item: 'frozen peas' },
      { quantity: '30', unit: 'g', item: 'finely diced red pepper' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1', unit: 'pinch', item: 'saffron dissolved in 1 tbsp warm water' },
    ],
    instructions: [
      'Heat olive oil in a small wide pan over medium heat.',
      'Add chicken and cook for 3 minutes until white throughout.',
      'Add red pepper and stir for 2 minutes.',
      'Add rice, stir to coat in oil.',
      'Pour in stock and saffron water.',
      'Simmer uncovered for 15 minutes, adding peas in the last 3 minutes.',
      'All liquid should be absorbed. Cool before serving.',
      'Cut chicken pieces very small for under 15 months.',
    ],
    prepMinutes: 10,
    cookMinutes: 20,
    nutritionPerServing: { kcal: 270, proteinG: 18, carbsG: 35, fatG: 6 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 12 months',
      months7to9: 'Not suitable - minimum age 12 months',
      months10to12: 'Not suitable - minimum age 12 months',
      months12to24: 'Full portion (130-150g), chicken very finely cut',
    },
    spiceSaltNote: 'No salt. Saffron is safe from 12 months in the tiny quantities used here and adds authentic colour.',
    equipment: ['Small wide pan or paella pan'],
  },

  frikadellen: {
    id: 'frikadellen',
    ingredients: [
      { quantity: '150', unit: 'g', item: 'lean minced beef or pork' },
      { quantity: '2', unit: 'tbsp', item: 'breadcrumbs (or gluten-free oat flour)' },
      { quantity: '1', unit: 'large', item: 'egg (or 1 tbsp flaxseed + 3 tbsp water)' },
      { quantity: '2', unit: 'tbsp', item: 'finely grated onion' },
      { quantity: '1', unit: 'tbsp', item: 'finely chopped parsley' },
    ],
    instructions: [
      'Combine all ingredients in a bowl and mix well.',
      'Shape into small flat patties about 4cm wide.',
      'Heat a non-stick pan over medium heat - no extra oil needed.',
      'Cook patties 4 minutes per side until cooked through.',
      'Internal temperature should reach 75C.',
      'Cool and cut into small pieces before serving.',
    ],
    prepMinutes: 10,
    cookMinutes: 10,
    nutritionPerServing: { kcal: 230, proteinG: 16, carbsG: 12, fatG: 12 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '1 small patty cut into pieces',
      months12to24: '1-2 patties cut into small pieces',
    },
    spiceSaltNote: 'No salt. No pepper for under 12 months. Parsley is safe from 9 months and adds iron.',
    equipment: ['Mixing bowl', 'Non-stick frying pan', 'Food thermometer'],
  },

  omurice: {
    id: 'omurice',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'cooked short-grain rice' },
      { quantity: '30', unit: 'g', item: 'finely diced mixed vegetables (carrot, peas, corn)' },
      { quantity: '2', unit: 'large', item: 'eggs (or 4 tbsp aquafaba)' },
      { quantity: '1', unit: 'tsp', item: 'unsalted butter' },
      { quantity: '1', unit: 'tsp', item: 'mild unsalted ketchup (12 months+)' },
    ],
    instructions: [
      'Saute vegetables in half the butter for 3 minutes until very soft.',
      'Add rice, stir and heat through. Set aside.',
      'Beat eggs and cook in remaining butter in a clean pan as a thin omelette.',
      'Place rice mixture in the centre of the omelette.',
      'Fold omelette over the rice.',
      'Slice open on top to reveal the rice filling.',
      'Add a small dot of ketchup only if child is 12 months or older.',
    ],
    prepMinutes: 5,
    cookMinutes: 10,
    nutritionPerServing: { kcal: 220, proteinG: 10, carbsG: 30, fatG: 8 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: 'Half portion, omelette cut into small pieces',
      months12to24: 'Full portion cut into pieces',
    },
    spiceSaltNote: 'No salt. No ketchup for under 12 months as it is high in sodium. For 12 months+ a very small amount of unsalted ketchup is acceptable.',
    equipment: ['Two small non-stick pans', 'Spatula'],
  },

  schnitzel: {
    id: 'schnitzel',
    ingredients: [
      { quantity: '120', unit: 'g', item: 'thin chicken breast fillet, lightly pounded' },
      { quantity: '3', unit: 'tbsp', item: 'plain breadcrumbs (or gluten-free)' },
      { quantity: '1', unit: 'large', item: 'egg, beaten (or 3 tbsp almond milk)' },
      { quantity: '1', unit: 'tbsp', item: 'plain flour' },
      { quantity: '1', unit: 'tsp', item: 'olive oil for baking' },
    ],
    instructions: [
      'Preheat oven to 200C.',
      'Set up three shallow dishes: flour, beaten egg, breadcrumbs.',
      'Coat chicken in flour, then egg, then breadcrumbs.',
      'Place on a lightly oiled baking tray.',
      'Bake for 18-20 minutes, flipping halfway, until golden and cooked through.',
      'Cool and slice into strips or small pieces before serving.',
    ],
    prepMinutes: 10,
    cookMinutes: 20,
    nutritionPerServing: { kcal: 260, proteinG: 22, carbsG: 14, fatG: 11 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 12 months',
      months7to9: 'Not suitable - minimum age 12 months',
      months10to12: 'Not suitable - minimum age 12 months',
      months12to24: '1 schnitzel cut into strips',
    },
    spiceSaltNote: 'No salt. No pepper for under 12 months. Use unsalted breadcrumbs only.',
    equipment: ['Oven', 'Baking tray', 'Three shallow dishes'],
  },

  // ─────────────────────────────────────────────────────────────
  // LUNCH — 10 new
  // ─────────────────────────────────────────────────────────────

  'red-lentil-soup': {
    id: 'red-lentil-soup',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'red lentils, rinsed' },
      { quantity: '1', unit: 'small', item: 'carrot, peeled and diced' },
      { quantity: '500', unit: 'ml', item: 'unsalted vegetable stock or water' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1/4', unit: 'tsp', item: 'ground cumin (10 months+)' },
      { quantity: '1', unit: 'tsp', item: 'fresh lemon juice (10 months+)' },
    ],
    instructions: [
      'Heat olive oil in a saucepan, add carrot and cook 3 minutes.',
      'Add lentils and stock.',
      'Bring to a boil, reduce heat, simmer 20 minutes until lentils dissolve.',
      'Add cumin and lemon juice only if child is 10 months or older.',
      'Blend until completely smooth.',
      'Add extra water if too thick.',
    ],
    prepMinutes: 5,
    cookMinutes: 25,
    nutritionPerServing: { kcal: 195, proteinG: 10, carbsG: 30, fatG: 3 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 6 months',
      months7to9: '4-5 tablespoons smooth',
      months10to12: '6-8 tablespoons',
      months12to24: 'Full bowl (150ml)',
    },
    spiceSaltNote: 'No salt. Cumin and lemon safe from 10 months. Lemon juice also helps with iron absorption.',
    equipment: ['Medium saucepan', 'Blender'],
  },

  'chicken-tagine': {
    id: 'chicken-tagine',
    ingredients: [
      { quantity: '120', unit: 'g', item: 'boneless skinless chicken thigh, diced small' },
      { quantity: '1', unit: 'small', item: 'sweet potato, peeled and diced' },
      { quantity: '3', unit: 'whole', item: 'dried apricots, soaked and chopped' },
      { quantity: '150', unit: 'ml', item: 'unsalted chicken stock' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1/4', unit: 'tsp', item: 'ground cinnamon (12 months+)' },
      { quantity: '1/4', unit: 'tsp', item: 'ground ginger (12 months+)' },
    ],
    instructions: [
      'Heat oil in a small heavy pan. Brown chicken for 3 minutes.',
      'Add sweet potato, apricots, and stock.',
      'Cover and simmer on low heat for 25 minutes until very tender.',
      'Add cinnamon and ginger only if child is 12 months or older.',
      'Mash or shred chicken with a fork.',
      'For under 12 months: blend to desired consistency.',
    ],
    prepMinutes: 10,
    cookMinutes: 30,
    nutritionPerServing: { kcal: 245, proteinG: 19, carbsG: 22, fatG: 8 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 10 months',
      months7to9: 'Not suitable - minimum age 10 months',
      months10to12: '5-6 tablespoons blended or finely mashed',
      months12to24: 'Full portion (130g)',
    },
    spiceSaltNote: 'No salt. Cinnamon and ginger safe from 12 months only. For 10-12 months serve without any spices.',
    equipment: ['Small heavy saucepan or tagine', 'Fork or blender'],
  },

  'fish-rice-thai': {
    id: 'fish-rice-thai',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'white fish fillet (tilapia or cod), boneless' },
      { quantity: '60', unit: 'g', item: 'jasmine rice' },
      { quantity: '200', unit: 'ml', item: 'water' },
      { quantity: '100', unit: 'ml', item: 'unsalted vegetable stock for steaming' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Cook jasmine rice in water for 15 minutes. Fluff and set aside.',
      'Place fish on a steaming rack over simmering stock.',
      'Steam for 8-10 minutes until fish flakes easily.',
      'Check carefully for any bones - remove all.',
      'Flake fish finely over rice.',
      'Drizzle with olive oil and mix gently.',
      'For under 11 months: blend rice and fish together.',
    ],
    prepMinutes: 5,
    cookMinutes: 20,
    nutritionPerServing: { kcal: 235, proteinG: 17, carbsG: 30, fatG: 5 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 10 months',
      months7to9: 'Not suitable - minimum age 10 months',
      months10to12: '5-6 tablespoons blended or mashed',
      months12to24: 'Full portion (130g)',
    },
    spiceSaltNote: 'No salt. No fish sauce or soy sauce at any age. Fish is naturally flavourful enough on its own.',
    equipment: ['Steamer or saucepan with steaming rack', 'Small saucepan for rice'],
  },

  'lentil-patties': {
    id: 'lentil-patties',
    ingredients: [
      { quantity: '100', unit: 'g', item: 'cooked green or brown lentils' },
      { quantity: '2', unit: 'tbsp', item: 'rolled oats (blended to flour)' },
      { quantity: '1', unit: 'large', item: 'egg (or 1 tbsp chia seeds + 3 tbsp water)' },
      { quantity: '2', unit: 'tbsp', item: 'finely grated carrot' },
      { quantity: '1', unit: 'tbsp', item: 'finely chopped parsley' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Mash lentils well with a fork, leaving some texture.',
      'Combine with oat flour, egg or chia egg, carrot, and parsley.',
      'Mix well and shape into small flat patties.',
      'Brush with olive oil and place on a lined baking tray.',
      'Bake at 190C for 20 minutes, flipping halfway.',
      'Cool before serving. Serve whole as finger food or mash.',
    ],
    prepMinutes: 10,
    cookMinutes: 20,
    nutritionPerServing: { kcal: 210, proteinG: 11, carbsG: 28, fatG: 6 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '1-2 patties mashed or as finger food',
      months12to24: '2-3 patties',
    },
    spiceSaltNote: 'No salt. No spices for under 12 months. Parsley is safe from 9 months.',
    equipment: ['Oven', 'Baking tray', 'Mixing bowl', 'Fork'],
  },

  'vegetable-biryani': {
    id: 'vegetable-biryani',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'basmati rice, rinsed' },
      { quantity: '50', unit: 'g', item: 'mixed vegetables (carrot, peas, green beans), finely diced' },
      { quantity: '200', unit: 'ml', item: 'unsalted vegetable stock' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1/4', unit: 'tsp', item: 'mild curry powder (12 months+)' },
      { quantity: '1', unit: 'pinch', item: 'turmeric' },
    ],
    instructions: [
      'Heat oil in a small saucepan. Add vegetables and cook 4 minutes.',
      'Add turmeric and rice, stir to coat.',
      'Add stock, bring to a boil.',
      'Reduce to lowest heat, cover, cook 15 minutes.',
      'Rest covered for 5 minutes. Fluff with fork.',
      'Add mild curry powder only if child is 12 months or older.',
      'For 10-12 months: mash lightly.',
    ],
    prepMinutes: 5,
    cookMinutes: 20,
    nutritionPerServing: { kcal: 240, proteinG: 7, carbsG: 42, fatG: 5 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 10 months',
      months7to9: 'Not suitable - minimum age 10 months',
      months10to12: '5-6 tablespoons mashed',
      months12to24: 'Full portion (130g)',
    },
    spiceSaltNote: 'No salt. Turmeric safe from 6 months. Mild curry powder safe from 12 months only.',
    equipment: ['Small saucepan with lid'],
  },

  'salmon-mash': {
    id: 'salmon-mash',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'fresh salmon fillet, skin removed' },
      { quantity: '150', unit: 'g', item: 'potato, peeled and diced' },
      { quantity: '2', unit: 'tbsp', item: 'whole milk' },
      { quantity: '1', unit: 'tsp', item: 'unsalted butter' },
      { quantity: '1', unit: 'tsp', item: 'fresh dill (optional, 12 months+)' },
    ],
    instructions: [
      'Boil potato until completely tender, about 15 minutes. Drain.',
      'Meanwhile bake salmon at 180C for 12 minutes until cooked through.',
      'Check salmon very carefully for any bones - remove all.',
      'Mash potato with milk and butter until smooth.',
      'Flake salmon finely and fold into mash.',
      'Add dill only if child is 12 months or older.',
    ],
    prepMinutes: 5,
    cookMinutes: 20,
    nutritionPerServing: { kcal: 225, proteinG: 18, carbsG: 18, fatG: 9 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 8 months',
      months7to9: '4-5 tablespoons smooth mash',
      months10to12: '6-8 tablespoons',
      months12to24: 'Full portion (130g)',
    },
    spiceSaltNote: 'No salt. No dill for under 12 months. Always check salmon very carefully for bones before serving.',
    equipment: ['Saucepan', 'Oven or pan for salmon', 'Fork or potato masher'],
  },

  'black-bean-taco-bowl': {
    id: 'black-bean-taco-bowl',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'cooked black beans (rinsed if canned)' },
      { quantity: '60', unit: 'g', item: 'cooked white rice' },
      { quantity: '1/2', unit: 'small', item: 'ripe avocado, mashed' },
      { quantity: '2', unit: 'tbsp', item: 'plain passata (no added salt)' },
      { quantity: '1', unit: 'tsp', item: 'lime juice (10 months+)' },
    ],
    instructions: [
      'Warm beans and rice together in a small pan for 3 minutes.',
      'Mash beans lightly with a fork.',
      'Warm passata separately.',
      'Layer rice, beans, and mashed avocado in a bowl.',
      'Spoon passata over the top.',
      'Add lime juice only if child is 10 months or older.',
      'For under 11 months: blend or mash everything together.',
    ],
    prepMinutes: 5,
    cookMinutes: 5,
    nutritionPerServing: { kcal: 215, proteinG: 9, carbsG: 36, fatG: 4 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '5-6 tablespoons mashed',
      months12to24: 'Full portion',
    },
    spiceSaltNote: 'No salt. No spices for under 12 months. Lime juice is safe from 10 months.',
    equipment: ['Small saucepan', 'Fork'],
  },

  'tofu-stir-fry': {
    id: 'tofu-stir-fry',
    ingredients: [
      { quantity: '100', unit: 'g', item: 'firm tofu, drained and cubed small' },
      { quantity: '60', unit: 'g', item: 'mixed soft vegetables (courgette, carrot, broccoli florets)' },
      { quantity: '60', unit: 'g', item: 'cooked rice or noodles' },
      { quantity: '1', unit: 'tsp', item: 'sesame oil' },
      { quantity: '1', unit: 'tsp', item: 'low-sodium soy sauce (12 months+ only) or coconut aminos' },
    ],
    instructions: [
      'Steam vegetables for 5 minutes until very soft.',
      'Heat sesame oil in a small pan over medium heat.',
      'Add tofu and cook 3 minutes until lightly golden.',
      'Add steamed vegetables and stir gently.',
      'Add soy sauce or coconut aminos only if child is 12 months or older.',
      'Serve over rice or noodles.',
      'For under 11 months: cut everything very small or mash together.',
    ],
    prepMinutes: 5,
    cookMinutes: 10,
    nutritionPerServing: { kcal: 205, proteinG: 13, carbsG: 20, fatG: 8 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 8 months',
      months7to9: '4-5 tablespoons mashed',
      months10to12: '6-7 tablespoons, tofu cut small',
      months12to24: 'Full portion',
    },
    spiceSaltNote: 'No soy sauce for under 12 months - use coconut aminos instead. Sesame oil is fine from 8 months in small quantities.',
    equipment: ['Small steamer', 'Small non-stick pan'],
  },

  'turkey-zucchini-balls': {
    id: 'turkey-zucchini-balls',
    ingredients: [
      { quantity: '150', unit: 'g', item: 'lean minced turkey' },
      { quantity: '60', unit: 'g', item: 'courgette, finely grated and squeezed dry' },
      { quantity: '1', unit: 'large', item: 'egg (or 1 tbsp flaxseed + 3 tbsp water)' },
      { quantity: '2', unit: 'tbsp', item: 'breadcrumbs or oat flour' },
      { quantity: '1', unit: 'tbsp', item: 'finely chopped fresh parsley' },
    ],
    instructions: [
      'Preheat oven to 200C.',
      'Squeeze all liquid from grated courgette using a clean cloth.',
      'Combine turkey, courgette, egg, breadcrumbs, and parsley.',
      'Roll into small balls (3cm diameter).',
      'Place on a lined baking tray.',
      'Bake for 18 minutes until golden and cooked through.',
      'Cool and cut in half for under 12 months.',
    ],
    prepMinutes: 10,
    cookMinutes: 18,
    nutritionPerServing: { kcal: 220, proteinG: 17, carbsG: 12, fatG: 10 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '2-3 balls cut in half',
      months12to24: '3-4 balls',
    },
    spiceSaltNote: 'No salt. No pepper for under 12 months. Parsley is safe from 9 months.',
    equipment: ['Oven', 'Baking tray', 'Clean cloth for squeezing'],
  },

  'chickpea-stew': {
    id: 'chickpea-stew',
    ingredients: [
      { quantity: '120', unit: 'g', item: 'cooked chickpeas (rinsed if canned)' },
      { quantity: '100', unit: 'ml', item: 'plain passata (no added salt)' },
      { quantity: '30', unit: 'g', item: 'baby spinach, finely chopped' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1/4', unit: 'tsp', item: 'sweet paprika (12 months+)' },
    ],
    instructions: [
      'Heat olive oil in a small saucepan.',
      'Add passata and bring to a gentle simmer.',
      'Add chickpeas and spinach, stir.',
      'Cook for 10 minutes until spinach is wilted and chickpeas are very soft.',
      'Add paprika only if child is 12 months or older.',
      'For 8-11 months: mash chickpeas well or blend briefly.',
      'For 12 months+: serve as is.',
    ],
    prepMinutes: 5,
    cookMinutes: 12,
    nutritionPerServing: { kcal: 210, proteinG: 10, carbsG: 32, fatG: 4 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 8 months',
      months7to9: '4-5 tablespoons well mashed',
      months10to12: '6-7 tablespoons',
      months12to24: 'Full portion (130g)',
    },
    spiceSaltNote: 'No salt. No paprika for under 12 months. Sweet paprika is a mild spice safe from 12 months.',
    equipment: ['Small saucepan', 'Fork or blender'],
  },

  // ─────────────────────────────────────────────────────────────
  // DINNER — original 6
  // ─────────────────────────────────────────────────────────────

  shakshuka: {
    id: 'shakshuka',
    ingredients: [
      { quantity: '2', unit: 'large', item: 'eggs' },
      { quantity: '150', unit: 'ml', item: 'plain passata (no added salt)' },
      { quantity: '1/2', unit: 'small', item: 'red pepper, finely diced' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1/4', unit: 'tsp', item: 'ground cumin (12 months+)' },
    ],
    instructions: [
      'Heat olive oil in a small pan, saute pepper for 4 minutes.',
      'Add passata, simmer for 5 minutes.',
      'Make two small wells in the sauce.',
      'Crack an egg into each well.',
      'Cover and cook on low heat for 4-5 minutes until whites are set.',
      'For 12 months: serve yolk slightly runny. For toddlers: cook through fully.',
      'Break up egg into small pieces before serving.',
    ],
    prepMinutes: 5,
    cookMinutes: 15,
    nutritionPerServing: { kcal: 180, proteinG: 10, carbsG: 14, fatG: 9 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 12 months',
      months7to9: 'Not suitable - minimum age 12 months',
      months10to12: 'Not suitable - minimum age 12 months',
      months12to24: '1 egg with sauce, egg broken into small pieces',
    },
    spiceSaltNote: 'No salt. No cumin for under 12 months. For 12 months+ a pinch of cumin is fine.',
    equipment: ['Small lidded frying pan'],
  },

  'sabich-salad': {
    id: 'sabich-salad',
    ingredients: [
      { quantity: '1', unit: 'small', item: 'aubergine, diced' },
      { quantity: '1', unit: 'large', item: 'egg, hard boiled' },
      { quantity: '1', unit: 'tbsp', item: 'tahini' },
      { quantity: '1', unit: 'tsp', item: 'lemon juice' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Roast aubergine cubes at 200C with olive oil for 25 minutes until very soft.',
      'Hard boil egg for 10 minutes, cool and peel.',
      'Mix tahini with lemon juice and 1 tbsp water to thin.',
      'Slice egg into small pieces.',
      'Combine aubergine, egg, and tahini dressing.',
      'For under 15 months: mash everything together.',
    ],
    prepMinutes: 5,
    cookMinutes: 25,
    nutritionPerServing: { kcal: 200, proteinG: 9, carbsG: 16, fatG: 12 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 12 months',
      months7to9: 'Not suitable - minimum age 12 months',
      months10to12: 'Not suitable - minimum age 12 months',
      months12to24: 'Full portion mashed or in pieces',
    },
    spiceSaltNote: 'No salt. Tahini is naturally flavourful. Lemon juice safe from 10 months.',
    equipment: ['Oven', 'Baking tray', 'Small bowl for dressing'],
  },

  hummus: {
    id: 'hummus',
    ingredients: [
      { quantity: '120', unit: 'g', item: 'cooked chickpeas (rinsed if canned)' },
      { quantity: '1', unit: 'tbsp', item: 'tahini' },
      { quantity: '1', unit: 'tbsp', item: 'lemon juice' },
      { quantity: '1', unit: 'tbsp', item: 'olive oil' },
      { quantity: '2', unit: 'tbsp', item: 'cold water' },
    ],
    instructions: [
      'Blend chickpeas until roughly broken down.',
      'Add tahini, lemon juice, and olive oil.',
      'Blend while adding cold water gradually until very smooth.',
      'Blend for 3-4 minutes for the creamiest result.',
      'For under 12 months: ensure no chunks remain.',
      'Serve with soft pita strips or vegetable sticks for 12 months+.',
    ],
    prepMinutes: 10,
    cookMinutes: 0,
    nutritionPerServing: { kcal: 160, proteinG: 8, carbsG: 18, fatG: 7 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '3-4 tablespoons as a dip or spread',
      months12to24: '4-5 tablespoons',
    },
    spiceSaltNote: 'No salt. No garlic for under 10 months. A tiny pinch of cumin can be added from 12 months.',
    equipment: ['Food processor or blender'],
  },

  'greek-salad-feta': {
    id: 'greek-salad-feta',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'cucumber, peeled and finely diced' },
      { quantity: '60', unit: 'g', item: 'ripe tomato, deseeded and finely diced' },
      { quantity: '30', unit: 'g', item: 'mild feta cheese, crumbled' },
      { quantity: '4', unit: 'whole', item: 'pitted black olives, halved' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Dice cucumber and tomato very finely.',
      'Combine in a bowl with olive oil.',
      'Add crumbled feta and olives.',
      'Mix gently.',
      'For 12-14 months: ensure all pieces are very small (under 1cm).',
      'For 15 months+: slightly larger pieces are fine.',
    ],
    prepMinutes: 8,
    cookMinutes: 0,
    nutritionPerServing: { kcal: 150, proteinG: 6, carbsG: 10, fatG: 10 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 12 months',
      months7to9: 'Not suitable - minimum age 12 months',
      months10to12: 'Not suitable - minimum age 12 months',
      months12to24: 'Small portion (60-80g), all pieces very finely diced',
    },
    spiceSaltNote: 'Feta is naturally salty - do not add any additional salt. Limit to small portions for toddlers.',
    equipment: ['Sharp knife', 'Chopping board', 'Bowl'],
  },

  'sweet-potato-bean-puree': {
    id: 'sweet-potato-bean-puree',
    ingredients: [
      { quantity: '150', unit: 'g', item: 'sweet potato, peeled and cubed' },
      { quantity: '60', unit: 'g', item: 'cooked black beans (rinsed if canned)' },
      { quantity: '2', unit: 'tbsp', item: 'water or unsalted stock' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Steam sweet potato for 15 minutes until completely tender.',
      'Mash sweet potato until smooth.',
      'Add black beans and mash together.',
      'Stir in olive oil and enough water to reach desired consistency.',
      'For under 6 months: blend until completely smooth.',
      'For 6 months+: mashed texture with some texture is fine.',
    ],
    prepMinutes: 5,
    cookMinutes: 15,
    nutritionPerServing: { kcal: 140, proteinG: 5, carbsG: 26, fatG: 2 },
    servingSizeByAge: {
      months4to6: '2-3 tablespoons smooth puree',
      months7to9: '4-5 tablespoons',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full portion (120g)',
    },
    spiceSaltNote: 'No salt needed. Sweet potato provides natural sweetness. No spices required at any age.',
    equipment: ['Steamer', 'Blender or fork'],
  },

  'ptitim-vegetables': {
    id: 'ptitim-vegetables',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'ptitim (Israeli couscous)' },
      { quantity: '150', unit: 'ml', item: 'unsalted vegetable stock' },
      { quantity: '40', unit: 'g', item: 'mixed finely diced vegetables (carrot, courgette, peas)' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Heat olive oil in a small saucepan.',
      'Add vegetables and saute for 3 minutes.',
      'Add ptitim and stir to coat in oil.',
      'Add stock, bring to a boil.',
      'Reduce heat, cover, cook 10 minutes until stock is absorbed.',
      'For 9-11 months: mash slightly before serving.',
    ],
    prepMinutes: 5,
    cookMinutes: 15,
    nutritionPerServing: { kcal: 175, proteinG: 5, carbsG: 32, fatG: 4 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 9 months',
      months7to9: 'Not suitable - minimum age 9 months',
      months10to12: '5-6 tablespoons mashed',
      months12to24: 'Full portion (120g)',
    },
    spiceSaltNote: 'No salt. Use only unsalted stock. Ptitim is naturally mild and pairs well with any soft vegetable.',
    equipment: ['Small saucepan with lid'],
  },

  // ─────────────────────────────────────────────────────────────
  // DINNER — 10 new
  // ─────────────────────────────────────────────────────────────

  mujaddara: {
    id: 'mujaddara',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'green or brown lentils' },
      { quantity: '60', unit: 'g', item: 'long-grain rice' },
      { quantity: '1', unit: 'small', item: 'onion, thinly sliced' },
      { quantity: '400', unit: 'ml', item: 'water' },
      { quantity: '2', unit: 'tsp', item: 'olive oil' },
      { quantity: '1/4', unit: 'tsp', item: 'ground cumin (12 months+)' },
    ],
    instructions: [
      'Simmer lentils in 250ml water for 15 minutes. Do not drain.',
      'Add rice and remaining water, continue simmering covered for 15 minutes.',
      'Meanwhile caramelise onion in olive oil over low heat for 20 minutes until golden.',
      'Stir half the onion through the lentil rice mixture.',
      'Top with remaining golden onion.',
      'For under 12 months: remove onion topping and mash the lentil rice mixture.',
    ],
    prepMinutes: 5,
    cookMinutes: 35,
    nutritionPerServing: { kcal: 185, proteinG: 8, carbsG: 32, fatG: 3 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 8 months',
      months7to9: '4-5 tablespoons well mashed without onion topping',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full portion (120g) with caramelised onion',
    },
    spiceSaltNote: 'No salt. No cumin for under 12 months. Caramelised onion is safe from 9 months in soft form.',
    equipment: ['Medium saucepan', 'Small frying pan'],
  },

  ratatouille: {
    id: 'ratatouille',
    ingredients: [
      { quantity: '1', unit: 'small', item: 'courgette, finely diced' },
      { quantity: '1/2', unit: 'small', item: 'aubergine, finely diced' },
      { quantity: '1', unit: 'small', item: 'ripe tomato, diced' },
      { quantity: '1/4', unit: 'small', item: 'red pepper, finely diced' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1', unit: 'tsp', item: 'fresh thyme leaves (12 months+)' },
    ],
    instructions: [
      'Heat olive oil in a small heavy pan.',
      'Add aubergine and pepper, cook 5 minutes.',
      'Add courgette and tomato, stir.',
      'Cover and cook on very low heat for 25 minutes until completely soft.',
      'Stir in thyme only if child is 12 months or older.',
      'For under 10 months: blend to a smooth puree.',
      'For 10 months+: serve as very soft chunky vegetables.',
    ],
    prepMinutes: 10,
    cookMinutes: 30,
    nutritionPerServing: { kcal: 145, proteinG: 4, carbsG: 20, fatG: 5 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 8 months',
      months7to9: '4-5 tablespoons blended smooth',
      months10to12: '5-6 tablespoons soft chunks',
      months12to24: 'Full portion (120g)',
    },
    spiceSaltNote: 'No salt. No herbs for under 12 months. Fresh thyme safe from 12 months in small amounts.',
    equipment: ['Small heavy saucepan with lid', 'Blender (optional)'],
  },

  'carrot-ginger-soup': {
    id: 'carrot-ginger-soup',
    ingredients: [
      { quantity: '200', unit: 'g', item: 'carrots, peeled and chopped' },
      { quantity: '1', unit: 'small', item: 'potato, peeled and diced' },
      { quantity: '400', unit: 'ml', item: 'unsalted vegetable stock' },
      { quantity: '1', unit: 'tsp', item: 'fresh ginger, finely grated (10 months+)' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
    ],
    instructions: [
      'Heat olive oil in a saucepan, add carrot and potato.',
      'Cook for 3 minutes, stirring.',
      'Add stock, bring to a boil.',
      'Simmer for 20 minutes until vegetables are very soft.',
      'Add ginger only if child is 10 months or older.',
      'Blend completely smooth.',
      'Add extra water if too thick.',
    ],
    prepMinutes: 5,
    cookMinutes: 25,
    nutritionPerServing: { kcal: 120, proteinG: 2, carbsG: 22, fatG: 3 },
    servingSizeByAge: {
      months4to6: '2-3 tablespoons smooth',
      months7to9: '4-5 tablespoons',
      months10to12: '6-8 tablespoons',
      months12to24: 'Full bowl (150ml)',
    },
    spiceSaltNote: 'No salt. No ginger for under 10 months. From 10 months a very small amount of fresh ginger is safe and supports digestion.',
    equipment: ['Medium saucepan', 'Blender'],
  },

  'egg-fried-rice': {
    id: 'egg-fried-rice',
    ingredients: [
      { quantity: '80', unit: 'g', item: 'cooked rice (day-old is best)' },
      { quantity: '2', unit: 'large', item: 'eggs' },
      { quantity: '30', unit: 'g', item: 'frozen peas, thawed' },
      { quantity: '1', unit: 'tsp', item: 'sesame oil' },
      { quantity: '1', unit: 'tsp', item: 'coconut aminos (or low-sodium soy sauce 12 months+)' },
    ],
    instructions: [
      'Heat sesame oil in a non-stick pan over medium heat.',
      'Add rice and peas, stir fry for 2 minutes.',
      'Push rice to one side, crack eggs into the empty side.',
      'Scramble eggs and mix through the rice as they cook.',
      'Add coconut aminos and toss together.',
      'For 10-12 months: cut through mixture thoroughly to ensure no large egg pieces.',
    ],
    prepMinutes: 3,
    cookMinutes: 7,
    nutritionPerServing: { kcal: 200, proteinG: 8, carbsG: 30, fatG: 7 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 10 months',
      months7to9: 'Not suitable - minimum age 10 months',
      months10to12: '5-6 tablespoons, egg broken into tiny pieces',
      months12to24: 'Full portion (120g)',
    },
    spiceSaltNote: 'No soy sauce for under 12 months - use coconut aminos. Sesame oil is safe from 8 months in very small amounts.',
    equipment: ['Non-stick frying pan', 'Spatula'],
  },

  'baked-fish-lemon': {
    id: 'baked-fish-lemon',
    ingredients: [
      { quantity: '100', unit: 'g', item: 'white fish fillet (cod, tilapia, or sea bass), boneless' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1', unit: 'tsp', item: 'fresh lemon juice' },
      { quantity: '1', unit: 'tsp', item: 'fresh dill or parsley (12 months+)' },
    ],
    instructions: [
      'Preheat oven to 180C.',
      'Place fish on a piece of foil.',
      'Drizzle with olive oil and lemon juice.',
      'Wrap foil loosely to create a parcel.',
      'Bake for 12-15 minutes until fish flakes easily.',
      'Check very carefully for any bones - remove all.',
      'Add fresh herbs only if child is 12 months or older.',
      'Flake finely before serving.',
    ],
    prepMinutes: 5,
    cookMinutes: 15,
    nutritionPerServing: { kcal: 190, proteinG: 20, carbsG: 8, fatG: 8 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 10 months',
      months7to9: 'Not suitable - minimum age 10 months',
      months10to12: '4-5 tablespoons finely flaked',
      months12to24: 'Full portion (80-100g)',
    },
    spiceSaltNote: 'No salt. Always check for bones twice. Lemon juice is safe from 10 months. Fresh herbs safe from 12 months only.',
    equipment: ['Oven', 'Foil', 'Baking tray'],
  },

  'spinach-ricotta-pasta': {
    id: 'spinach-ricotta-pasta',
    ingredients: [
      { quantity: '60', unit: 'g', item: 'small pasta (ditalini or cut spaghetti)' },
      { quantity: '60', unit: 'g', item: 'fresh baby spinach' },
      { quantity: '50', unit: 'g', item: 'full-fat ricotta' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1', unit: 'tsp', item: 'lemon juice' },
    ],
    instructions: [
      'Cook pasta in unsalted water until very soft. Drain, reserving 2 tbsp pasta water.',
      'Wilt spinach in the same pan with olive oil for 2 minutes.',
      'Chop wilted spinach very finely.',
      'Mix ricotta with lemon juice and reserved pasta water until creamy.',
      'Combine pasta, spinach, and ricotta sauce.',
      'For 10-12 months: cut pasta into small pieces and mash lightly.',
    ],
    prepMinutes: 5,
    cookMinutes: 15,
    nutritionPerServing: { kcal: 220, proteinG: 11, carbsG: 28, fatG: 8 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 10 months',
      months7to9: 'Not suitable - minimum age 10 months',
      months10to12: '5-6 tablespoons, pasta cut very small',
      months12to24: 'Full portion (120g)',
    },
    spiceSaltNote: 'No salt. Choose unsalted ricotta. Lemon juice safe from 10 months.',
    equipment: ['Medium saucepan', 'Colander', 'Fork'],
  },

  'pumpkin-coconut-curry': {
    id: 'pumpkin-coconut-curry',
    ingredients: [
      { quantity: '150', unit: 'g', item: 'pumpkin or butternut squash, peeled and cubed' },
      { quantity: '100', unit: 'ml', item: 'full-fat coconut milk' },
      { quantity: '100', unit: 'ml', item: 'water' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1/4', unit: 'tsp', item: 'ground turmeric' },
      { quantity: '1/4', unit: 'tsp', item: 'ground coriander (12 months+)' },
    ],
    instructions: [
      'Heat oil in a small saucepan.',
      'Add pumpkin and turmeric, stir for 1 minute.',
      'Add coconut milk and water.',
      'Simmer covered for 20 minutes until pumpkin is very tender.',
      'Add coriander only if child is 12 months or older.',
      'For under 9 months: blend completely smooth.',
      'For 9 months+: mash to a chunky consistency.',
    ],
    prepMinutes: 5,
    cookMinutes: 22,
    nutritionPerServing: { kcal: 175, proteinG: 4, carbsG: 24, fatG: 7 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 7 months',
      months7to9: '3-4 tablespoons smooth',
      months10to12: '5-6 tablespoons mashed',
      months12to24: 'Full portion (120g)',
    },
    spiceSaltNote: 'No salt. Turmeric safe from 6 months. Ground coriander safe from 12 months only. Coconut milk provides enough richness without any seasoning.',
    equipment: ['Small saucepan with lid', 'Blender or fork'],
  },

  'beef-vegetable-stew': {
    id: 'beef-vegetable-stew',
    ingredients: [
      { quantity: '100', unit: 'g', item: 'lean beef (chuck or shin), very finely diced' },
      { quantity: '1', unit: 'small', item: 'potato, peeled and diced' },
      { quantity: '1', unit: 'small', item: 'carrot, peeled and diced' },
      { quantity: '300', unit: 'ml', item: 'unsalted beef or vegetable stock' },
      { quantity: '1', unit: 'tsp', item: 'olive oil' },
      { quantity: '1', unit: 'tsp', item: 'tomato paste' },
    ],
    instructions: [
      'Heat oil in a small heavy pan. Brown beef for 3 minutes.',
      'Add carrot, potato, tomato paste, and stock.',
      'Bring to a boil, reduce to a very low simmer.',
      'Cover and cook for 45 minutes until beef is completely tender.',
      'For under 12 months: blend or mash thoroughly.',
      'For 12 months+: shred beef finely with a fork.',
    ],
    prepMinutes: 10,
    cookMinutes: 50,
    nutritionPerServing: { kcal: 255, proteinG: 20, carbsG: 18, fatG: 12 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 10 months',
      months7to9: 'Not suitable - minimum age 10 months',
      months10to12: '5-6 tablespoons blended or well mashed',
      months12to24: 'Full portion (120-130g)',
    },
    spiceSaltNote: 'No salt. No pepper for under 12 months. Use only unsalted stock. Tomato paste provides depth without any seasoning.',
    equipment: ['Small heavy saucepan with lid', 'Blender or fork'],
  },

  'avocado-corn-puree': {
    id: 'avocado-corn-puree',
    ingredients: [
      { quantity: '1', unit: 'small', item: 'ripe avocado' },
      { quantity: '60', unit: 'g', item: 'frozen sweet corn, thawed and cooked' },
      { quantity: '1', unit: 'tbsp', item: 'water or breast milk' },
      { quantity: '1', unit: 'tsp', item: 'lime juice (10 months+)' },
    ],
    instructions: [
      'Cook corn in boiling water for 3 minutes. Drain.',
      'Halve avocado, remove stone, scoop flesh.',
      'Blend corn until smooth - strain through a fine sieve if needed for young babies.',
      'Mash avocado and combine with corn.',
      'Add water or breast milk to thin if needed.',
      'Add lime juice only if child is 10 months or older.',
      'Serve immediately - avocado browns quickly.',
    ],
    prepMinutes: 5,
    cookMinutes: 5,
    nutritionPerServing: { kcal: 155, proteinG: 3, carbsG: 18, fatG: 9 },
    servingSizeByAge: {
      months4to6: '2-3 tablespoons smooth (blend corn very well)',
      months7to9: '4-5 tablespoons',
      months10to12: '5-6 tablespoons',
      months12to24: 'Full portion (100-120g)',
    },
    spiceSaltNote: 'No salt. No lime for under 10 months. Avocado provides all the fat and flavour needed without any seasoning.',
    equipment: ['Blender', 'Fork', 'Fine mesh strainer (for young babies)'],
  },

  'tofu-miso-soup': {
    id: 'tofu-miso-soup',
    ingredients: [
      { quantity: '300', unit: 'ml', item: 'water' },
      { quantity: '1', unit: 'tsp', item: 'white or yellow miso paste (low sodium)' },
      { quantity: '60', unit: 'g', item: 'silken tofu, cut into small cubes' },
      { quantity: '1', unit: 'tbsp', item: 'dried wakame seaweed, soaked and chopped (12 months+ only)' },
    ],
    instructions: [
      'Bring water to just below a boil - do not boil miso.',
      'Remove from heat.',
      'Dissolve miso paste in a small amount of the warm water, then stir into the pot.',
      'Add tofu cubes.',
      'Add wakame only if child is 12 months or older.',
      'Return to very low heat for 2 minutes to warm tofu through.',
      'For under 12 months: serve just the tofu and a small amount of broth.',
    ],
    prepMinutes: 5,
    cookMinutes: 5,
    nutritionPerServing: { kcal: 130, proteinG: 8, carbsG: 12, fatG: 5 },
    servingSizeByAge: {
      months4to6: 'Not suitable - minimum age 8 months',
      months7to9: 'Small amount of broth (2-3 tbsp) and soft tofu only',
      months10to12: '4-5 tablespoons broth with tofu',
      months12to24: 'Full bowl (150ml)',
    },
    spiceSaltNote: 'Miso is naturally salty - use a very small amount and choose low-sodium white miso. No additional salt. No wakame for under 12 months.',
    equipment: ['Small saucepan'],
  },
};
