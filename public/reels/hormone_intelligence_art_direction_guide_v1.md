# Hormone Intelligence Art Direction Guide v1.0

This document defines the visual identity of every Hormone Intelligence film, present and future. It sits above the CG Storyboard and Master Script — those are productions built *within* this system; this document is the system itself — and below `hormone_intelligence_production_bible_v1.md`, which is now the top-level reference for brand purpose and emotional philosophy. This Guide is the visual system *derived from* that Bible; where the two ever appear to conflict, the Bible's emotional intent governs and this Guide should be revised to match it, not the reverse. Where a future project's storyboard conflicts with this guide, the guide wins unless there's a documented reason to evolve it (see §9).

---

## 1. Overall visual philosophy

**Brand essence:** Hormone Intelligence is quiet expertise, not loud technology. The films should feel closer to a beautifully made documentary about the body's intelligence than to a medical explainer or a wellness advertisement.

Four governing pairs — what we are, and specifically what we are choosing not to be:

| We are | Not |
|---|---|
| Premium, timeless, elegant | Trendy, flashy, "app-like" |
| Quiet luxury | High-tech medicine |
| Intelligence over complexity | Data-dump, clinical overload |
| Hope over fear | Alarm, urgency, before/after shock tactics |

**The single test for any new visual decision:** *Would this still feel appropriate in ten years, in a different country, shown to a woman who has never seen a Hormone Intelligence film before?* If a visual choice depends on a current design trend, a specific cultural reference, or a sense of urgency to land — it doesn't belong here.

**Working definition of "quiet luxury" for this brand:** restraint, not richness. Luxury signaled through space, pacing, and craft — not through gold, marble, or overt wealth-signifiers. A single well-placed pulse of light should feel more premium than a screen full of ornamentation.

---

## 2. Typography

**Font hierarchy** (three tiers, never more):
1. **Display** — used only for the film's opening/closing title cards and the rare single-sentence emotional hinge (e.g. the Scene 09 reframe in the CG Storyboard). Elegant serif or high-contrast humanist sans, generous letter-spacing, always static or a single slow fade — never animated in a flashy way.
2. **Narration subtitle** — the workhorse typeface for spoken-word captions. Clean humanist sans, medium weight, optimized for readability at a glance, not for personality. This is the tier used throughout the existing reel captions (`burn_final_reel.py` conventions: translucent dark box, centered, generous line-spacing) — that treatment is the baseline; refine weight/tracking but keep the restrained box-and-centered logic.
3. **Data / numeric** — a monospaced or tabular-figure variant for any on-screen number (P4/E2 ratio, "6ヶ月," gauge values). Numbers should never share the narration subtitle's typeface — they need to read as *data*, distinct from *speech*.

**Subtitle style:**
- Centered, one thought per card, never more than two lines
- Semi-transparent dark box behind text for legibility over CG — never a hard-edged solid bar
- No color-coding of subtitle text itself (color lives in the CG, not the type) — subtitles stay a single neutral off-white across the entire film, regardless of emotional phase

**Information density:**
- One idea per on-screen text element. If a sentence needs two overlays to explain, the sentence should be split, not the overlay crowded.
- The disease-list scene (CG Storyboard Scene 08) is the density ceiling test: even there, **zero** on-screen text beyond narration subtitles — density is carried by the CG (soft points on a body map), never by a list of words. If a future scene tempts you to add a bullet list, that's a signal the concept belongs in CG instead.
- Numeric overlays (P4/E2 gauge) are the only exception permitted to run longer than a single subtitle beat, because the narration itself is data-driven there.

**Text animation:**
- Fades only. No slides, no bounces, no typewriter reveals, no kinetic typography.
- Display-tier text may hold 1–2 seconds longer than its narration requires at true emotional peaks (see §4, "when motion should stop") — this is the only permitted deviation from strict sync-to-narration timing.

---

## 3. Colour system

Colour is the primary carrier of the emotional arc (confusion → understanding → relief → hope → transformation) across every future film, not just this one. The palette below is a starting proposal — treat the hex values as a designer's first pass, not final brand colour, but keep the *relationships and roles* fixed.

**Background colours** (the neutral canvas, phase-dependent):
| Phase | Description | Approx. |
|---|---|---|
**Revision note (this version):** the colour system below was revised to *extend* the Hormone Journey palette already shipped in this codebase (`#FCFAF7` background, `#C6A96B` gold accent, `#2C2A28`/`#5A534D`/`#A08F7E` text neutrals) rather than introduce a separate one. Brand continuity across Hormone Journey, the App, and every future edition takes priority over any single film's palette. The emotional arc below is now carried by **tonal depth and gold-saturation** within one warm-neutral family — light ivory (Confusion) deepening to warm charcoal (highest-care systemic scene) and brightening back through gold (Relief → Transformation) — rather than by a hue-shift from cool to warm as in the previous draft.

| Phase | Scenes | Palette (per Guide, now unified with existing brand tokens) |
|---|---|---|
| Confusion | 1 | Quiet warm neutral, barely off-canvas — `#F2EEE7` (a step below the `#FCFAF7` base, lower contrast, dawn-light quality) |
| Understanding (building) | 2–6 | Warm taupe-grey, one step deeper — `#DCD3C4`, warming in brief earned gold pulses (Scene 6) |
| Understanding (systemic, highest care) | 7–8 | Deepest, most muted point — the brand's own primary ink colour, `#2C2A28`, used as background rather than text here. No red, no alert tones — reusing the brand's existing dark neutral instead of introducing a new "serious" colour. |
| Relief (hinge) | 9 | The brand gold, `#C6A96B`, breaking through the warm-charcoal base for the first time as a sustained state |
| Hope | 10–11 | `#C6A96B` gold plus its two organ-extension jewel tones (liver `#B08348`, ovaries `#C79B84`), brightening |
| Transformation | 12 | `#C6A96B` at its fullest, richest presence — the warmest CG-register moment in the film |
| "I want this future." | 13 | Natural sunlit colour grading — real-world footage register, not a CG token |

**Recovery colours — approved final rule:** depletion and recovery are expressed **as light, never as a colour or hue change, and never through red or any warning tone.** Every organ keeps its one fixed colour permanently — what changes is how *luminous* that colour is:
- **Depleted state:** dim. Lower opacity, little or no glow, the organ sitting close to its surrounding surface colour rather than standing out from it — present, but quiet.
- **Recovered / vital state:** luminous. Full opacity, a soft glow radiating outward, clearly the brightest element in its area of the frame.
- Recovery is animated as the transition from dim to luminous — the organ's own light returning, not a different colour arriving. This is the core visual grammar for every recovery beat in every future film, and it ties directly into the network-visualization device (§5): organs are already described as "glowing nodes," so depletion/recovery is simply that glow's intensity moving between low and full.

**`#B0553F` is retired**, approved and final. It is no longer part of the Hormone Intelligence visual language, in `CortisolChart.tsx` or anywhere else. Its former role (marking the "concerning" cortisol pattern) is now carried by the adrenal/cortisol gold (`#C6A96B`) at a dim, low-glow state — the same rule as every other organ's "before" moment, with no exception for charts. Brand gold is reserved as **the** visual expression of vitality, recovery, and hope — dimming it, never substituting another hue, is how the system shows anything short of that.

**Organ colour system** (fixed across all future films — a brand-level decision, not a per-film one). Built as tonal extensions of the existing `#C6A96B` gold — variations in lightness and a narrow hue-rotation within the same warm family, never a separate cool palette:

| Organ | Colour role | Value | Relationship to `#C6A96B` |
|---|---|---|---|
| Adrenal glands (incl. cortisol) | The brand gold itself — energy, stress response | `#C6A96B` | Anchor colour, unchanged — adrenal/cortisol is this narration's central hormone and carries the core brand accent directly |
| Brain | Palest tint — signal, clarity | `#E4DCC9` | Lightened, desaturated extension |
| Ovaries | Warm rose-gold — cyclical, reproductive | `#C79B84` | Hue-rotated warmer/pinker, same lightness band |
| Liver | Deeper, richer gold-brown — processing, metabolism | `#B08348` | Darkened, more saturated extension |
| Gut | Peach-gold — warmth, digestion | `#D0A578` | Lightened, hue-rotated toward peach |
| Bone | Barely-there ivory — foundation, structure | `#EDE6D6` | Nearest tint to the `#FCFAF7` canvas itself — bone reads as *structure the whole system rests on*, visually almost part of the background |

No organ is ever rendered outside this warm gold-neutral family — no blues, no greens, no reds. This is now a stricter and simpler rule than the previous draft's "just exclude red": the entire system stays within one tonal family, full stop.

**Gold usage:** `#C6A96B` is emotional currency, not decoration, in its *saturated, full-presence* form — reserved for true relief/hope/transformation beats (the Scene 06 early hope-pulse, the Scene 09 hinge, Scenes 10–12, the Scene 13 dissolve into lifestyle footage). It's allowed to appear at lower saturation/lightness throughout the film as the adrenal organ's fixed colour (that's a different role — organ identity, not earned emotional signal) — the rule is specifically about *reserving its brightest, most saturated state* for earned moments, not about restricting the hue itself, since it's now also the adrenal organ's everyday colour.

**Design Token Specification (approved, final — this is what A10 implements directly):**

Foundation tokens (unchanged from the existing Hormone Journey codebase):
| Token | Value | Role |
|---|---|---|
| `--hi-color-canvas` | `#FCFAF7` | Primary background, every product |
| `--hi-color-ink` | `#2C2A28` | Primary text/outline colour |
| `--hi-color-ink-soft` | `#5A534D` | Secondary/body text |
| `--hi-color-ink-muted` | `#A08F7E` | Captions, tertiary text |
| `--hi-color-gold` | `#C6A96B` | Brand accent — vitality, recovery, hope |

New — emotional-arc surface tokens:
| Token | Value | Role |
|---|---|---|
| `--hi-surface-confusion` | `#F2EEE7` | Opening-beat background |
| `--hi-surface-understanding` | `#DCD3C4` | Mechanism/explanation background |
| `--hi-surface-care` | `--hi-color-ink` (`#2C2A28`) | Highest-sensitivity scene background — reuses the ink token, not a new colour |

New — organ tokens (each fixed permanently, one colour per organ across every future film):
| Token | Value | Organ |
|---|---|---|
| `--hi-organ-adrenal` | `--hi-color-gold` (`#C6A96B`) | Adrenal glands / cortisol |
| `--hi-organ-brain` | `#E4DCC9` | Brain |
| `--hi-organ-ovaries` | `#C79B84` | Ovaries |
| `--hi-organ-liver` | `#B08348` | Liver |
| `--hi-organ-gut` | `#D0A578` | Gut |
| `--hi-organ-bone` | `#EDE6D6` | Bone |
| `--hi-organ-hypothalamus` | `#DCC9A8` | Hypothalamus (new, Visual Language v2) |
| `--hi-organ-pituitary` | `#D4B98C` | Pituitary (new, Visual Language v2) |

Hypothalamus and pituitary sit deliberately between brain (`#E4DCC9`, palest) and adrenal (`#C6A96B`, full gold) in the tonal scale — the HPA-axis cascade's colour progression itself teaches the direction and intensity of the signal, independent of the labels.

Depletion/recovery — expressed as **luminosity, not colour**, so this is a state parameter rather than a swatch:
| Parameter | Depleted | Recovered / vital |
|---|---|---|
| Opacity | ~0.35–0.45 | 1.0 |
| Glow | none or minimal | soft outer glow, radius proportional to node size |
| Implementation note | organ colour unchanged, only rendered dim | organ colour unchanged, rendered at full luminosity |

Retired: `#B0553F` — no longer used anywhere in the Hormone Intelligence system, including its prior use in `CortisolChart.tsx`.

**White space principles:**
- Generous negative space by default — a scene with one glowing node on a mostly empty canvas is the house style, not an exception.
- Density is earned only in the two "data" scenes (cortisol rhythm graph, P4/E2 gauge) — everywhere else, if a frame feels busy, remove something rather than rebalance it.
- This applies to lifestyle footage too: uncluttered, unstaged compositions, not lifestyle-magazine density.

---

## 4. Motion language

**Camera speed:**
- Default: slow, deliberate drift or push-in. No handheld, no whip pans, anywhere in the CG portions of the film.
- The disease-risk scene is the **slowest** camera movement in any film — speed is inversely tied to emotional sensitivity, not to information density.
- The one exception to "CG stays controlled": lifestyle footage (§6) deliberately switches to naturalistic, slightly handheld-feeling movement, precisely *because* the contrast with the controlled CG camera language signals "this is real life now."

**Animation rhythm:**
- Organs pulse **in sequence**, never simultaneously — this is the signal-flow language that makes the network diagram read as *communication* rather than a static illustration. Any future film introducing a new organ or system should follow this same sequential-pulse grammar.
- No animation should loop indefinitely in a way that reads as "waiting" — every motion should have a clear beginning and resolution tied to the narration.

**Transition philosophy:**
- Dissolves and match-cuts only. No wipes, no glitch transitions, no hard cuts on a beat (hard cuts are reserved for scene structure, not stylistic punctuation).
- Favor motivated transitions — light flowing from one scene becomes the next scene's opening element (as established throughout the CG Storyboard) — over unmotivated cuts.

**When motion should stop completely:**
- At every scripted emotional hinge (the Scene 09 reframe is the canonical example), motion should stop or nearly stop and hold 1–2 seconds past what the narration strictly requires. Stillness is the visual equivalent of the musical silence described in §7 — it is a deliberate design tool, not dead time to be trimmed.
- Rule of thumb for future productions: if a sentence in the narration carries the emotional turn of its section, the camera holds through it. If a sentence is explanatory, the camera may continue moving.

---

## 5. CG style (revised — Visual Language v2)

**Superseded governing principle, replacing the v1 "always abstract" rule below:** *every visual must directly teach the science being narrated.* Hormone Intelligence is a premium scientific education platform, not an art film — the viewer should immediately understand what they're looking at, and should be able to follow a scene's mechanism with the audio muted, from labels, arrows, diagrams, and graphs alone. This is a genuine revision, not an addition: the earlier rule ("no anatomically literal organ renderings... organs are suggested, not depicted") is retired. Educational clarity now outranks abstraction whenever the two are in tension.

**What stays exactly as it was (v1 is not being discarded wholesale):** the line-art execution style (never photorealistic, never gory or clinical, never a hospital-pamphlet aesthetic), the fixed organ colour system (§3), the "no red / no warning tones" rule, the restrained motion language (§4), and the premium/editorial register. The feeling should still read as an Apple keynote or a high-end medical conference — legible and premium, never a textbook or a hospital slide. What changes is *how much the viewer is trusted to identify without help*: v1 trusted colour and shape alone; v2 adds labels, fixed diagram layouts, and real data.

**Organ rendering style:** simple line-art forms, still never photorealistic — but now always labeled (Japanese + English) when a scene is explaining mechanism, and arranged in a fixed, legible layout (e.g. a vertical flowchart for a hormone cascade) rather than floating freely. Colour still does real storytelling work: a mechanism's node colours should visually gradient in the direction the signal travels (see §3's organ palette, now extended for sub-structures like the hypothalamus and pituitary), so the cascade reads even before a label is noticed.

**Data as a first-class visual element (new in v2):** hormone graphs, laboratory report cards, and reference ranges are no longer just "the two approved data-density exceptions" to a white-space rule — they are core narrative devices. A report card must always be built as a data-driven layout (rows generated from a plain data array: name, value, reference range, flagged state) so real anonymized clinical data can replace placeholder values later without touching the component. Flagged/out-of-range values are emphasized through weight and a warm highlight within the existing gold family — never a red or alert colour, consistent with the permanent no-warning-tones rule.

**Cause-and-effect connectors (new in v2):** a labeled arrow device connecting a specific data point (a report value, a graph position) to a specific symptom or outcome named in the narration. This is how the brand answers "why do I feel this way?" visually, not just verbally — the connector should always reference something concrete already on screen, never float as generic commentary.

**Never teach a hormone in isolation (new in v2):** every hormone pattern must connect to the real daily experiences people recognize themselves in — the four-part chain **hormone pattern → laboratory data → daily symptoms → explanation** is the standing structure for how a mechanism gets taught, not scientific data shown alone. Concretely, for cortisol content this means the circadian graph should be synchronized with a symptom timeline plotted along the same day — difficulty waking up, no appetite in the morning, sleepy after lunch, craving sweets in the evening, craving alcohol, finding yourself asleep before you intended at 21:00 (on the sofa, in bed, or wherever you'd sat down to rest), waking during the night — positioned against the hours where the graph shows the pattern actually driving that symptom, so the viewer recognizes themselves in the data rather than just reading a chart. The same four-part chain applies to every future hormone topic (progesterone, thyroid, etc.), not just cortisol.

**Particle effects:** used only to represent *flow* — hormone signals, mineral uptake, light travelling between nodes. Never decorative sparkle, never used to fill empty space. If a particle effect isn't representing a specific spoken mechanism, it doesn't belong in the frame.

**Network / mechanism visualization:** still the brand's signature device, now split into two related but distinct modes:
- *Network mode* (A2 SignalPath, unchanged): organic curved connections, free node positioning, used for whole-body/systemic moments where the point is interconnection itself (e.g. the full six-organ anchor shot).
- *Diagram mode* (new — mechanism/cascade scenes): straight labeled arrows, fixed vertical or hierarchical layout, used whenever a scene is explaining a specific step-by-step mechanism (HPA axis, hormone conversion pathways). Both modes share the same underlying rule — signal travels in sequence, never simultaneously — and the same organ colour system; only the layout and connector style differ, chosen by what the scene needs to teach.

Any new future topic (a new hormone, a new organ system) should be introduced using whichever of these two modes fits what's being explained, plus a report card and graph where the narration references real data — not by inventing a new visual metaphor per film. Consistency of vocabulary (organ colours, connector style, report-card layout) across the whole library is more valuable than any single scene's novelty.

---

## 6. Lifestyle footage rules

**What belongs:** quiet, authentic, natural light, unposed-feeling moments — waking up, everyday energy, calm presence with people who matter, travel, meaningful work, trying something new, aging visibly and beautifully. Cast and settings should read as timeless and broadly relatable, not tied to one age group, body type, or cultural context — this matters specifically because this guide has to serve the international and hotel versions (§9), not just one market.

**What should never appear:**
- Overt luxury signifiers — branded logos, obvious wealth-flexing, anything that reads as "aspirational lifestyle advertising" rather than "a life worth living." (Per your own framing: not luxury for the sake of luxury.)
- Stock-photo cliché — staged corporate-wellness photography, exaggerated smiling-at-salad energy, anything that reads as generic rather than specific and true.
- Any clinical or medical imagery bleeding into the lifestyle sequence — once the film has crossed into lifestyle footage, it stays there; don't cut back to CG/data visuals after that transition.
- Urgency or hustle-culture coding — nothing that implies the viewer is behind, late, or needs to catch up.

**Emotional purpose:** lifestyle footage is the *embodiment* of recovery, not a benefits list. It should never be captioned as "you'll be able to do X" — the CG Storyboard's rule (no overlay text naming these as benefits) is a direct consequence of this principle. The footage's job is to let the viewer recognize a life they already want, not to sell them a new one.

---

## 7. Music direction

**Emotional arc:** music mirrors the visual arc exactly — sparse and uncertain during Confusion, gradually clarifying through Understanding, opening into warmth at the Relief hinge, fully present (but never triumphant/bombastic) through Hope and Transformation, then quieting into something intimate and human under the lifestyle footage. The disease-risk scene should be the most harmonically still point in the score — not tense, not dark, just quiet — mirroring the visual instruction to avoid alarm.

**Instruments:** piano and soft strings as the core palette, with subtle ambient pads for texture. Deliberately avoid: synth-heavy or "tech" production (works against "quiet luxury, not high-tech medicine"), any culturally-specific instrumentation that wouldn't travel to the international version, percussion-driven or beat-forward production (reads as advertising, not documentary).

**Tempo progression:** slow and sparse at the open, gradually building (not rushing) through the middle sections, settling into a warm, steady, unhurried pulse at Hope/Transformation — never upbeat or driving in a way that creates urgency. The lifestyle section should feel like the tempo has settled, not sped up, even though the emotional energy is highest there.

**Silence usage:** silence is a scored decision, not an absence of one. The Scene 09 reframe and any future equivalent "hinge" moment should have a deliberate beat of near-silence right before the music opens up — this is the audio equivalent of the camera holding still (§4). Silence should also be considered briefly at the very end of the disease-risk scene, just before the reframe, as the score's own way of "taking a breath" before turning toward hope.

---

## 8. Emotional design principles

Every scene in every future Hormone Intelligence production must be able to answer, before any asset is built:

> **"What is the viewer feeling now?"**

not

> "What information are we teaching?"

This is a process rule, not just a philosophy statement. In practice:
- No scene goes to CG build until its emotional objective is written down (as in the CG Storyboard format) — the visual objective is derived from the emotional one, never the reverse.
- If a scene's only justification is "this fact needs to be conveyed," it isn't ready — find the feeling the fact is meant to produce, and design for that.
- Education and emotion are not in tension in this system — education is the *mechanism*, emotion is the *destination*. A scene that teaches accurately but leaves the viewer feeling nothing has failed by this system's standard, even if every fact on screen is correct.
- Sales is never explicit anywhere in this system. The desire to continue must be a byproduct of how the viewer feels, never a message the film states outright. If a future draft of any scene contains persuasive/sales language, that's a violation of this guide, not a stylistic variant of it.

---

## 9. Brand consistency

This guide is the shared standard across every current and future application of Hormone Intelligence:

- Hormone Intelligence App
- Saliva hormone education content
- Future hormone education films
- Book promotion
- Hotel version
- International version

**What stays fixed across all of these** (non-negotiable, brand-level):
- The colour system (§3), including the organ colour-coding and the gold-as-earned-not-decorative rule
- The network-visualization device (§5) as the signature recurring visual motif
- The "no red, no alarm palette" rule, everywhere, without exception
- The emotional-first design principle (§8)
- The "sales is never explicit" rule
- Typography hierarchy logic (§2), even if the specific typeface changes for international/localized type support

**What flexes by application:**
- Runtime and pacing — an app-embedded clip may compress the arc (confusion→understanding→relief→hope→transformation) into a much shorter runtime, but must still pass through every stage in order; none may be skipped, only shortened.
- Language and subtitle localization for the international version — typography *logic* stays fixed, the specific typeface may need to support non-Latin scripts.
- Lifestyle footage casting/setting specifics — the hotel version may lean toward travel/rest imagery, the book promotion may lean toward creative/work imagery — but all footage must still pass the §6 rules (no luxury-for-luxury's-sake, no stock cliché, embodiment not benefits-list).
- Which organs/systems are foregrounded — a future film about a different hormone (e.g. thyroid-focused) introduces its own network nodes using the same visual grammar, rather than reusing this film's exact scene structure.

**The single sentence test for whether something belongs in the Hormone Intelligence universe:** *Does this scene, this colour, this piece of music make the viewer feel like their body is intelligent and capable of recovery — without ever making them afraid first?* If yes, it belongs. If it works by contrast (showing fear to make relief feel bigger), it doesn't belong here, regardless of how effective that technique might be elsewhere.

---

## Relationship to existing documents

- **`cortisol_narration_transcript.md`** (Master Script v1.0, Draft Locked) — the narration this guide's first production is built around. Unaffected by this document; still frozen pending your review of the five flagged sections.
- **`cg_storyboard_v1.md`** (CG Storyboard v1.0, Reconciled, Official) — the scene-by-scene application of this guide to that specific narration. **Reconciled and aligned as of this revision** — organ colours, motion language, typography tiers, emotional colour progression, and the network-visualization device now match this guide exactly (see the storyboard's own change log for what was brought into alignment). Both documents are now the official Version 1.0 production pair; no further drift should be introduced without updating both together.
- **Hormone Journey page CG plan** (already on file for `app/journey/video/page.tsx`) — this guide's CG style section (§5) is written to be consistent with, and extend, that existing plan rather than replace it. Same visual system, two applications.
