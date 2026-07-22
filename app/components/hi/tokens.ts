/**
 * Hormone Intelligence design tokens — A10.
 *
 * Single source of truth for colour, luminosity, and motion timing across
 * every Hormone Intelligence CG asset (organ nodes, signal paths, body
 * silhouette, and everything built on top of them). Approved per
 * `hormone_intelligence_art_direction_guide_v1.md` §3, Design Token
 * Specification.
 *
 * Do not inline hex values or timing literals in components that consume
 * this library — always import from here, so a future palette or timing
 * revision happens in exactly one place.
 *
 * Scope note: the production Asset List scoped A10 as "colour system," but
 * the Phase 2 build instructions ask every asset to avoid hard-coded
 * colours, sizes, *and* timings. Motion timing and the luminosity spec are
 * included here rather than left for A1 to invent ad hoc, since this file
 * is the one place all downstream assets already depend on.
 */

// ---------------------------------------------------------------------------
// Foundation — unchanged from the existing, already-shipped Hormone Journey
// palette (CortisolChart.tsx, app/components/cg/*). Extended, not replaced.
// ---------------------------------------------------------------------------

export const hiColor = {
  /** Primary background across every product. */
  canvas: "#FCFAF7",
  /** Primary text / line-art outline colour. */
  ink: "#2C2A28",
  /** Secondary / body text. */
  inkSoft: "#5A534D",
  /** Captions and tertiary text only — see accessibility note in the A10 write-up. */
  inkMuted: "#A08F7E",
  /** The brand accent. Reserved as the visual expression of vitality, recovery, and hope — see hiLuminosity below. */
  gold: "#C6A96B",
} as const;

// ---------------------------------------------------------------------------
// Emotional-arc surface tokens — new. Confusion → Understanding → the
// highest-care systemic scene, expressed as tonal depth within the existing
// warm-neutral family, never a hue shift to a separate cool palette.
// ---------------------------------------------------------------------------

export const hiSurface = {
  confusion: "#F2EEE7",
  understanding: "#DCD3C4",
  /** Reuses hiColor.ink as a background rather than introducing a new "serious" colour. */
  care: hiColor.ink,
} as const;

// ---------------------------------------------------------------------------
// Organ colour system — fixed permanently, one colour per organ across every
// future Hormone Intelligence film. Each is a tonal extension of hiColor.gold
// (lightness/hue-rotation within the same warm family), never an independent
// hue. Adrenal keeps the anchor gold outright.
// ---------------------------------------------------------------------------

export type HiOrgan = "adrenal" | "brain" | "ovaries" | "liver" | "gut" | "bone";

export const hiOrganColor: Record<HiOrgan, string> = {
  adrenal: hiColor.gold,
  brain: "#E4DCC9",
  ovaries: "#C79B84",
  liver: "#B08348",
  gut: "#D0A578",
  bone: "#EDE6D6",
};

export const hiOrganLabelJa: Record<HiOrgan, string> = {
  adrenal: "副腎",
  brain: "脳",
  ovaries: "卵巣",
  liver: "肝臓",
  gut: "腸",
  bone: "骨",
};

// ---------------------------------------------------------------------------
// Luminosity — the approved depletion/recovery mechanism. Every organ keeps
// its one fixed colour permanently; only luminosity (opacity + saturation +
// glow) moves between "dim" and "full". No colour swap, ever — this is what
// replaces the retired #B0553F and any red/warning-tone approach system-wide.
//
// Amended for A1 (additive, not a rename — nothing built on the original
// two fields breaks): added `saturation`, since Organ Node needs opacity,
// saturation, *and* glow to express health/depletion/recovery per your
// instruction. "Recovering" as a third named state is deliberately not a
// static token here — see A1's OrganNode, where it's implemented as the
// live animated transition from `dim` to `full`, not a fixed midpoint, so
// it reads as recovery *happening*, not a resting state.
// ---------------------------------------------------------------------------

export type HiLuminosityState = "dim" | "full";

export const hiLuminosity: Record<HiLuminosityState, { opacity: number; saturation: number; glow: number }> = {
  dim: { opacity: 0.4, saturation: 0.35, glow: 0 },
  full: { opacity: 1, saturation: 1, glow: 1 },
};

// ---------------------------------------------------------------------------
// Motion timing — centralized so no consuming component hard-codes a
// duration. Values chosen to sit close to the existing hj- keyframe timings
// already in app/globals.css (2.6s–3.5s loops, 0.9s reveal transitions), so
// the new system feels like the same house motion language, not a new one.
// ---------------------------------------------------------------------------

export const hiMotion = {
  /** Opacity/glow transition when an organ moves between dim and full luminosity. */
  glowTransitionMs: 1200,
  /** Default duration for a single node's ambient pulse loop. */
  pulseDurationMs: 3000,
  /** Gap between each node's pulse when multiple nodes animate as a sequence — see Art Direction Guide §5, "in sequence, never simultaneously." */
  sequenceStaggerMs: 300,
  /** Default scene-level dissolve, matching ScrollReveal's existing 0.9s transition. */
  dissolveDurationMs: 900,
} as const;

// ---------------------------------------------------------------------------
// Retired tokens — kept here only as a documented record, not for use.
// ---------------------------------------------------------------------------

/**
 * @deprecated Retired per Art Direction Guide v1.0 §3. Do not use.
 * Previously marked the "concerning" cortisol pattern in CortisolChart.tsx.
 * That role is now carried by hiOrganColor.adrenal at hiLuminosity.dim.
 */
export const RETIRED_CONCERN_RED = "#B0553F";
