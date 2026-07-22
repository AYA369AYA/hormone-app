# Hormone Intelligence Scene 01
# Production Ready v1.0
# Locked

Approved and locked. `Scene01.tsx` is not to be modified except on your explicit request for a revision. It is now the **reference implementation** for every future Hormone Intelligence scene — Scene 02 onward inherits its pacing, white-space philosophy, subtitle behavior, transition language, motion rhythm, and emotional tone. Only scene-specific content changes between scenes; the conventions below are not scene-specific and should not drift.

---

## Implementation notes future scenes should inherit

**Frame**
- 9:16 aspect ratio, `max-width: 380px`, centered, rounded corners (18px), soft two-layer shadow. Caps out rather than growing unbounded on wide viewports — this represents a vertical film frame, not a page section.

**Timing**
- Intro hold: ~3.5s of silence/stillness before the first subtitle or motion beat. Every scene should establish itself before its content starts, not cut straight to the first beat.
- Per-beat duration: 3–4.5s, sized to the caption's actual reading length, not a fixed universal number.
- Point/element fade-in: 0.6s. Fade-out: 0.9s — deliberately asymmetric, a gentler exit than entry.
- Exit transition window: reserve the final ~6–7% of the scene's total duration for the dissolve out. Don't let content run to the literal last frame.
- Entry: whole-frame opacity fade-in, 1000ms, `ease-in`.

**Subtitle behavior**
- One thought per card. `@@` marks a manual line break (same convention as the existing `burn_final_reel.py` caption pipeline — don't diverge from it).
- Translucent dark box (`hiColor.ink` at 0.55 opacity), canvas-colored text, centered, ~8% side margin / ~9% from the bottom edge.
- Subtitles clear *before* the exit dissolve begins — never let a caption linger into the transition.
- Cue data lives as a flat array of `{ text, start, end }`, separate from render logic — this is what makes retiming a one-line edit instead of a refactor.

**Transitions**
- Entry and exit are both opacity-based only (frame fade-in; dissolve-overlay fade-out). No wipes, no slides, matching Art Direction Guide §4.
- The exit isn't a uniform fade to nothing: one element survives into the transition and shifts color toward whatever the *next* scene's dominant token is (Scene 01 → 02: neutral ink warms to `hiOrganColor.adrenal`), via linear RGB interpolation between the two actual tokens — never a hand-picked intermediate color. This is the mechanism for scene-to-scene continuity; every future scene boundary should carry something forward the same way rather than cutting cold.

**Animation rhythm**
- Fades only — no slides, bounces, or typewriter reveals, per Guide §2. This was already a stated rule; Scene 01 is the proof it holds up in a real built scene, not just as a guideline.
- One `requestAnimationFrame` loop driving a single `elapsed` time value is the whole animation engine — every element derives its state from that one number. Do not give individual elements their own timers; it's how retiming stays a data edit instead of a cascade of coordinated changes.

**Accessibility pattern (non-negotiable, not scene-specific)**
- `prefers-reduced-motion` gets a genuinely different presentation — the timed reveal is replaced by a static, fully-readable transcript block, not just "animations off."
- A visually-hidden full transcript is always present in the DOM, independent of whatever timed captions sighted viewers see.
- Purely decorative layers are `aria-hidden`.

**Process note**
- Scene 01 needed a visual device (neutral sensation-glow points) that doesn't belong to any approved library asset — A1's organ colors don't apply to it. It was built as scene-local code and flagged clearly rather than quietly promoted into an uncertified "A4." Any future scene in the same situation should do the same: implement locally, flag it, and let a real asset get proposed and reviewed on its own if it turns out to be reused.
- Every scene should be verified with real `tsc --noEmit`, `eslint`, and an actual dev-server fetch confirming real content renders — not just "the code looks right."

---

## Scene 01 Reference Checklist

Before any future scene is presented as done, confirm:

- [ ] 9:16 frame, max-width 380px, centered, rounded corners, soft shadow
- [ ] Entry: whole-frame opacity fade-in (~1000ms) before any content-specific motion
- [ ] Intro hold (~3–3.5s) before the first beat
- [ ] Subtitles: one thought per card, `@@` line breaks, translucent ink box, canvas-colored text, ~8–9% margins
- [ ] Text animation is fade-only (~400ms) — no slides, bounces, typewriter
- [ ] Element fades: ~0.6s in / ~0.9s out
- [ ] Final ~6–7% of scene duration reserved for exit dissolve
- [ ] One element carries continuity (color/position) into the next scene rather than a uniform fade to nothing
- [ ] All cue/timing data as flat `{start, end}` arrays, not embedded in render logic
- [ ] Single `requestAnimationFrame` + one `elapsed` value driving all motion — no per-element timers
- [ ] `prefers-reduced-motion` produces a different static presentation, not just disabled transitions
- [ ] Visually-hidden full transcript present for screen readers
- [ ] Decorative layers marked `aria-hidden`
- [ ] Any visual device not covered by an approved asset (A1/A2/A3…) is scene-local and explicitly flagged, not silently promoted
- [ ] Verified with real `tsc --noEmit`, `eslint`, and a dev-server fetch showing actual rendered content
