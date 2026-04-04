"""
merge_translations.py

Reads:
  - src/data/recipeDetails.ts   (current EN-only file)
  - recipeDetails.he.json       (Hebrew translations)

Outputs:
  - src/data/recipeDetails.ts   (updated with LocalizedString interfaces
                                 and EN+HE on every string field)

Run from project root:
  python3 merge_translations.py
"""

import json, re, sys
from pathlib import Path

HE_FILE = Path("recipeDetails.he.json")
TS_IN   = Path("src/data/recipeDetails.ts")

# ── Load Hebrew ────────────────────────────────────────────────────────────────
with open(HE_FILE, encoding="utf-8") as f:
    HE = json.load(f)

# ── Load TS source ─────────────────────────────────────────────────────────────
src = TS_IN.read_text(encoding="utf-8")

# ── helpers ────────────────────────────────────────────────────────────────────
def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

def loc(en, he):
    return f"{{ en: '{esc(en)}', he: '{esc(he)}', ru: '{esc(en)}' }}"

# ── 1. Replace interfaces ──────────────────────────────────────────────────────
NEW_IFACES = """\
export type Locale = 'en' | 'he' | 'ru';
export type LocalizedString = Record<Locale, string>;

export interface Ingredient {
  quantity: string;
  unit: string;
  item: LocalizedString;
}

export interface ServingSizeByAge {
  months4to6:   LocalizedString;
  months7to9:   LocalizedString;
  months10to12: LocalizedString;
  months12to24: LocalizedString;
}

export interface RecipeDetail {
  id: string;
  ingredients: Ingredient[];
  instructions: LocalizedString[];
  prepMinutes: number;
  cookMinutes: number;
  nutritionPerServing: { kcal: number; proteinG: number; carbsG: number; fatG: number };
  servingSizeByAge: ServingSizeByAge;
  spiceSaltNote: LocalizedString;
  equipment: LocalizedString[];
}"""

src = re.sub(
    r"export interface Ingredient \{[\s\S]*?export interface RecipeDetail \{[\s\S]*?\}",
    NEW_IFACES,
    src,
    count=1
)

# ── 2. Process recipe by recipe ────────────────────────────────────────────────
def process(rid, block):
    he = HE.get(rid)
    if not he:
        print(f"  WARNING: no HE data for '{rid}'", file=sys.stderr)
        return block

    # ── ingredients items ──────────────────────────────────────────────────────
    he_items = he.get("ingredients", [])
    idx = [0]
    def repl_item(m):
        en = m.group(1)
        he_val = he_items[idx[0]] if idx[0] < len(he_items) else en
        idx[0] += 1
        return f"item: {loc(en, he_val)}"
    block = re.sub(r"item:\s*'([^']*)'", repl_item, block)

    # ── instructions array ─────────────────────────────────────────────────────
    he_steps = he.get("instructions", [])
    def repl_instructions(m):
        entries = re.findall(r"'((?:[^'\\]|\\.)*)'", m.group(1))
        lines = []
        for i, en in enumerate(entries):
            hv = he_steps[i] if i < len(he_steps) else en
            lines.append(f"      {loc(en, hv)},")
        return "    instructions: [\n" + "\n".join(lines) + "\n    ],"
    block = re.sub(
        r"instructions:\s*\[\s*'(?:[^'\\]|\\.)*'(?:,\s*'(?:[^'\\]|\\.)*')*,?\s*\]",
        repl_instructions,
        block,
        flags=re.DOTALL
    )

    # ── servingSizeByAge ───────────────────────────────────────────────────────
    ssa = he.get("servingSizeByAge", {})
    for field in ("months4to6", "months7to9", "months10to12", "months12to24"):
        def repl_ssa(m, f=field):
            return f"{f}: {loc(m.group(1), ssa.get(f, m.group(1)))}"
        block = re.sub(rf"{field}:\s*'([^']*)'", repl_ssa, block)

    # ── spiceSaltNote ──────────────────────────────────────────────────────────
    he_ssn = he.get("spiceSaltNote", "")
    def repl_ssn(m):
        return f"spiceSaltNote: {loc(m.group(1), he_ssn or m.group(1))}"
    block = re.sub(r"spiceSaltNote:\s*'([^']*)'", repl_ssn, block)

    # ── equipment array ────────────────────────────────────────────────────────
    he_eq = he.get("equipment", [])
    def repl_equipment(m):
        entries = re.findall(r"'((?:[^'\\]|\\.)*)'", m.group(1))
        lines = []
        for i, en in enumerate(entries):
            hv = he_eq[i] if i < len(he_eq) else en
            lines.append(f"      {loc(en, hv)},")
        return "    equipment: [\n" + "\n".join(lines) + "\n    ],"
    block = re.sub(
        r"equipment:\s*\[\s*'(?:[^'\\]|\\.)*'(?:,\s*'(?:[^'\\]|\\.)*')*,?\s*\]",
        repl_equipment,
        block,
        flags=re.DOTALL
    )

    return block

# ── 3. Split file into recipe blocks and process each ─────────────────────────
# Strategy: find every  id: 'recipe-id'  and process the surrounding block
def repl_block(m):
    block = m.group(0)
    id_m = re.search(r"\bid:\s*'([^']+)'", block)
    if not id_m:
        return block
    return process(id_m.group(1), block)

# Match top-level recipe objects: key: { ... },
# Each object starts with an identifier/quoted key and ends with },
BLOCK_RE = re.compile(
    r"^\s{2}'?[\w-]+'?\s*:\s*\{[^{}]*(?:\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}[^{}]*)*\},?",
    re.MULTILINE | re.DOTALL
)

src = BLOCK_RE.sub(repl_block, src)

# ── 4. Fix any accidental double commas left by replacements ──────────────────
src = re.sub(r'\],\s*,', '],', src)

# ── 5. Write ───────────────────────────────────────────────────────────────────
TS_IN.write_text(src, encoding="utf-8")
print(f"Done — written to {TS_IN}")
