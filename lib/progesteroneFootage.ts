import type { FootageShot } from "./footageShot";

/**
 * Progesterone — live-action footage config. Same pattern as
 * lib/scene02Footage.ts: every shot is defined here, never in
 * SceneProgesterone.tsx. Set `imageSrc` or `videoSrc` to swap a placeholder
 * for a real asset — no component change required.
 *
 * All three shots are meant to read as one continuous setting and subject
 * — "opening" and "safety-release" are the same held moment and its
 * release; "quiet-intention" pulls back to a wider frame of the same
 * place, later light. See the approved storyboard for the full beat list.
 *
 * Timings re-anchored to the real narration audio (see
 * SceneProgesterone.tsx header) — "safety-release" now sits inside the
 * scene's one silent/unresolved stretch, and "quiet-intention" resolves
 * right as the narration's own closing line ("それが200倍っていうものが
 * 一つ目安としてあります") finishes.
 */

export interface ProgesteroneFootageShot extends FootageShot {
  id: "opening" | "safety-release" | "quiet-intention";
}

export const PROGESTERONE_FOOTAGE: ProgesteroneFootageShot[] = [
  {
    id: "opening",
    label: "Morning, natural light — quiet vigilance. Shoulders subtly raised, hand paused mid-motion.",
    holdStart: 0.3,
    holdEnd: 1.0,
    fadeInMs: 300,
    fadeOutMs: 1200,
  },
  {
    id: "safety-release",
    label: "Same moment, released — shoulders drop, one breath let out.",
    holdStart: 118.5,
    holdEnd: 121.5,
    fadeInMs: 500,
    fadeOutMs: 500,
  },
  {
    id: "quiet-intention",
    label: "Wider frame, same place, fuller light — she turns to open a notebook, small and deliberate.",
    holdStart: 153.5,
    holdEnd: 154.8,
    fadeInMs: 2000,
    fadeOutMs: 0,
  },
];
