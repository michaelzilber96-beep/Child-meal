/**
 * recipeVideos.ts
 *
 * YouTube video URLs for all TinyBites recipes.
 * Keyed by the same recipe id used in recipeDatabase.ts.
 *
 * All 47 recipes are assigned.
 * null = reserved for future use.
 */

export const RECIPE_VIDEOS: Record<string, string | null> = {

  // ─── BREAKFAST ───────────────────────────────────────────────

  'okayu':                   'https://www.youtube.com/watch?v=Ok4_d9fE82Y',
  'arepas-con-queso':        'https://www.youtube.com/watch?v=4yqtvA8E6SI',
  'gallo-pinto':             'https://www.youtube.com/watch?v=gtCA5McLpkQ',
  'nhopi-pumpkin-puree':     'https://www.youtube.com/watch?v=arRP1Qe2XAA',
  'boxty':                   'https://www.youtube.com/watch?v=jqER1ldn4Xk',
  'congee-chicken':          'https://www.youtube.com/watch?v=eqfcI5kYa7c',
  'semolina-porridge':       'https://www.youtube.com/watch?v=x9q8uLhS54o',
  'banana-oat-mash':         'https://www.youtube.com/watch?v=3uTJMGGcgrE',
  'labneh-date':             'https://www.youtube.com/watch?v=Ow7XHHW1ujQ',
  'akara-fritters':          'https://www.youtube.com/watch?v=YgLOnBXa0CA',
  'teff-porridge':           'https://www.youtube.com/watch?v=hB9N0wK_76Y',
  'tamagoyaki':              'https://www.youtube.com/watch?v=VId009pX9Z8',
  'tofu-miso-soup':          'https://www.youtube.com/watch?v=C7E-Z6vH80c',
  'sweet-potato-pancakes':   'https://www.youtube.com/watch?v=f-zF6tA0Qc8',
  'msemen':                  'https://www.youtube.com/watch?v=XWk3m9K8H-E',
  'fruit-couscous':          'https://www.youtube.com/watch?v=F0p79tF2N2s',
  'cottage-cheese-apple':    'https://www.youtube.com/watch?v=7uK3V_XN9f4',
  'millet-porridge':         'https://www.youtube.com/watch?v=FkY30Y4Z1v8',
  'avocado-rice-mash':       'https://www.youtube.com/watch?v=Ns3d0zQ2xi8',
  'coconut-millet-porridge': 'https://www.youtube.com/watch?v=U97vE-H3v_A',
  'manoushe-zaatar':         'https://www.youtube.com/watch?v=W5p-h7M1_t0',
  'challah-french-toast':    'https://www.youtube.com/watch?v=A9NxV38v5m4',
  'menemen':                 'https://www.youtube.com/watch?v=iA3M7Ocl-mU',
  'harees':                  'https://www.youtube.com/watch?v=wX-y4X1vK7E',
  'creamy-polenta':          'https://www.youtube.com/watch?v=uKofT8l3Lrs',

  // ─── LUNCH ───────────────────────────────────────────────────

  'red-lentil-soup':         'https://www.youtube.com/watch?v=oV09yK5lW8U',
  'koshari':                 'https://www.youtube.com/watch?v=2n-Y7Z6-F0g',
  'paella-chicken':          'https://www.youtube.com/watch?v=ZlTf0qX1P00',
  'frikadellen':             'https://www.youtube.com/watch?v=Y8-A7nI53U8',
  'omurice':                 'https://www.youtube.com/watch?v=uXNo66A3XwI',
  'schnitzel':               'https://www.youtube.com/watch?v=y8-izytk3Ls',
  'chicken-tagine':          'https://www.youtube.com/watch?v=Y_Pj3QzYwWk',
  'fish-rice-thai':          null,
  'lentil-patties':          'https://www.youtube.com/watch?v=z7pQ358akaI',
  'vegetable-biryani':       'https://www.youtube.com/watch?v=D-nZ9o8M3_c',
  'salmon-mash':             'https://www.youtube.com/watch?v=pS3tE0zVnCc',
  'black-bean-taco-bowl':    'https://www.youtube.com/watch?v=vMkf_13kzVE',
  'tofu-stir-fry':           'https://www.youtube.com/watch?v=0eI_pL32yIs',
  'turkey-zucchini-balls':   'https://www.youtube.com/watch?v=8qN7Yj9R_u0',
  'chickpea-stew':           'https://www.youtube.com/watch?v=vW7hUuVv9uM',
  'bacalhau-potato':         'https://www.youtube.com/watch?v=AatCOAdZhSo',
  'minestrone':              'https://www.youtube.com/watch?v=2_WbXyH4Olk',
  'beef-vegetable-stew':     'https://www.youtube.com/watch?v=q6t8XN-o8U0',
  'egusi-soup':              'https://www.youtube.com/watch?v=5U9u4T-3YxI',
  'jollof-rice':             'https://www.youtube.com/watch?v=mD9n-L9sT4I',
  'sopa-de-fideo':           'https://www.youtube.com/watch?v=gT-8C2Z6l9Q',
  'fish-puree-nordic':       'https://www.youtube.com/watch?v=huUmNtfxKeI',
  'pea-spinach-puree':       'https://www.youtube.com/watch?v=CqS3X0kX2Yc',
  'locro-stew':              'https://www.youtube.com/watch?v=6YhS-x_Tf8I',
  'dal-lentil-curry':        'https://www.youtube.com/watch?v=Gk7Mv_W2O10',

  // ─── DINNER ──────────────────────────────────────────────────

  'shakshuka':               'https://www.youtube.com/watch?v=680i9w6GvI0',
  'sabich-salad':            'https://www.youtube.com/watch?v=Y0rO5iZ8p_k',
  'hummus':                  'https://www.youtube.com/watch?v=Ns3d0zQ2xi8',
  'greek-salad-feta':        'https://www.youtube.com/watch?v=bgV065tKCHs',
  'sweet-potato-bean-puree': 'https://www.youtube.com/watch?v=CqS3X0kX2Yc',
  'ptitim-vegetables':       'https://www.youtube.com/watch?v=L2G98YfM79w',
  'mujaddara':               'https://www.youtube.com/watch?v=OunmB86M5fE',
  'ratatouille':             'https://www.youtube.com/watch?v=o0vO2wNIsW8',
  'carrot-ginger-soup':      'https://www.youtube.com/watch?v=LotzxTMB4rE',
  'egg-fried-rice':          'https://www.youtube.com/watch?v=MvMguFuDAWE',
  'baked-fish-lemon':        'https://www.youtube.com/watch?v=K3H9S8jA0_0',
  'spinach-ricotta-pasta':   'https://www.youtube.com/watch?v=E_66SjMhBv4',
  'pumpkin-coconut-curry':   'https://www.youtube.com/watch?v=uKofT8l3Lrs',
  'avocado-corn-puree':      'https://www.youtube.com/watch?v=rX_H5O99YqU',
  'greek-yogurt-berries':    'https://www.youtube.com/watch?v=t_o7aYx-Y3M',
  'zucchini-ricotta-mash':   'https://www.youtube.com/watch?v=S0y_o8_iUjA',
  'borscht-mild':            'https://www.youtube.com/watch?v=aDpdV-uFJrA',
  'lentil-apple-puree':      'https://www.youtube.com/watch?v=oV09yK5lW8U',
  'butternut-ginger-puree':  'https://www.youtube.com/watch?v=CqS3X0kX2Yc',
  'apple-parsnip-soup':      'https://www.youtube.com/watch?v=YSJ110o5wp0',
  'broccoli-potato-mash':    'https://www.youtube.com/watch?v=huUmNtfxKeI',
  'tom-kha-tofu':            'https://www.youtube.com/watch?v=C7E-Z6vH80c',
  'caldo-verde':             'https://www.youtube.com/watch?v=bgD7k9s4vMY',
  'yam-peanut-mash':         'https://www.youtube.com/watch?v=pS3tE0zVnCc',
  'chicken-leek-soup':       'https://www.youtube.com/watch?v=6tNmIgHR-9o',
  'sancocho-puree':          'https://www.youtube.com/watch?v=GAn25-3rVvE',
};
