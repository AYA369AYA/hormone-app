/**
 * Shared shape for a live-action shot config entry, used by every Hormone
 * Intelligence scene's footage config (lib/scene02Footage.ts,
 * lib/progesteroneFootage.ts, and any future scene) and rendered by the one
 * shared app/components/hi/FootageSlot.tsx component. See
 * feedback_asset_swap_architecture: media assets swap via config only,
 * never by editing a component.
 *
 * `holdStart`/`holdEnd` are the shot's fully-visible window, in seconds
 * from scene start. `fadeInMs`/`fadeOutMs` control the crossfade against
 * the scene's scientific visualization on either side of that window.
 */
export interface FootageShot {
  id: string;
  /** Director's description of the shot — shown on the placeholder card when neither asset is set. */
  label: string;
  holdStart: number;
  holdEnd: number;
  fadeInMs: number;
  fadeOutMs: number;
  /** A still image (e.g. an AI stand-in). Rendered full-cover, held for the whole shot window. */
  imageSrc?: string;
  /** A video clip, once shot or licensed. Takes priority over imageSrc if both are set. */
  videoSrc?: string;
  posterSrc?: string;
}

// Crossfade envelope for a single footage shot: 0 outside its window,
// ramping to 1 over fadeInMs before holdStart, held at 1 through
// [holdStart, holdEnd], ramping back to 0 over fadeOutMs after holdEnd.
// A shot with fadeOutMs=0 holds at 1 through scene end.
export function footageEnvelope(elapsed: number, shot: Pick<FootageShot, "holdStart" | "holdEnd" | "fadeInMs" | "fadeOutMs">): number {
  const fadeInS = shot.fadeInMs / 1000;
  const fadeOutS = shot.fadeOutMs / 1000;
  if (elapsed < shot.holdStart) {
    if (fadeInS <= 0) return 0;
    return Math.max(0, Math.min(1, (elapsed - (shot.holdStart - fadeInS)) / fadeInS));
  }
  if (elapsed <= shot.holdEnd) return 1;
  if (fadeOutS <= 0) return 1;
  return Math.max(0, Math.min(1, 1 - (elapsed - shot.holdEnd) / fadeOutS));
}
