/**
 * Scene 02 — "The Body as Witness" live-action footage config.
 *
 * Every live-action shot in Scene 02 (Concept 1, approved) is defined here,
 * not in Scene02.tsx. Swapping a temporary/placeholder shot for real
 * imagery — AI stand-in now, licensed or produced footage later — is a
 * config-only change: set `imageSrc` (a still) or `videoSrc` (a clip, takes
 * priority if both are set) on the relevant entry. Scene02.tsx never needs
 * to change for that; it renders whatever this file describes.
 *
 * `holdStart`/`holdEnd` are the shot's fully-visible window, in seconds
 * from scene start. `fadeInMs`/`fadeOutMs` control the crossfade against
 * the scientific visualization on either side of that window — a shot can
 * fade in fast and out slow (or not at all), matching how each beat reads
 * in the approved storyboard rather than a uniform crossfade everywhere.
 */

import type { FootageShot } from "./footageShot";

export interface Scene02FootageShot extends FootageShot {
  id: "opening" | "safety-gesture" | "ending";
}

export const SCENE02_FOOTAGE: Scene02FootageShot[] = [
  {
    id: "opening",
    label: "ECU, natural light — a pause mid-motion in her life, before the dissolve inward.",
    holdStart: 0.3,
    holdEnd: 1.1,
    fadeInMs: 300,
    fadeOutMs: 1400,
  },
  {
    id: "safety-gesture",
    label: "Her hand rests at her side — quiet self-awareness, not discomfort.",
    holdStart: 26.0,
    holdEnd: 27.5,
    fadeInMs: 500,
    fadeOutMs: 500,
  },
  {
    id: "ending",
    label: "A small, intentional movement — toward the window, light crossing her face.",
    holdStart: 48.3,
    holdEnd: 51.5,
    fadeInMs: 1200,
    fadeOutMs: 0,
  },
];
