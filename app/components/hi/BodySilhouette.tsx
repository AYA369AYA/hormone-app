import type { CSSProperties, ReactNode } from "react";
import { hiColor, type HiOrgan } from "./tokens";

/**
 * BodySilhouette — A3.
 *
 * The shared canvas A1 (OrganNode) and A2 (SignalPath) compose on top of —
 * not an illustration in its own right. Deliberately the quietest
 * component in the library: a single soft outline, very low opacity, no
 * anatomical detail, no fill, existing only to give the organs and their
 * connections a sense of place.
 *
 * Composition model: BodySilhouette is an aspect-ratio-locked container.
 * It renders its own outline as a background layer and provides an
 * absolutely-positioned overlay slot for `children` — a SignalPath (or
 * bare OrganNode instances) dropped in as a child will align correctly as
 * long as it's configured with the same BODY_VIEWBOX / BODY_REGIONS
 * exported below. Neither A1 nor A2 needed any change to support this —
 * they were already viewBox-based, responsive, and positionable.
 *
 * See hormone_intelligence_art_direction_guide_v1.md §3 (white space
 * principles: "generous negative space by default") and §5.
 */

const VIEWBOX_WIDTH = 200;
const VIEWBOX_HEIGHT = 280;

export const BODY_VIEWBOX = `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`;
export const BODY_CENTER_X = VIEWBOX_WIDTH / 2;

/**
 * Canonical, documented anchor point for each organ within BODY_VIEWBOX.
 * These are sensible defaults, not requirements — any SignalPath/OrganNode
 * usage is free to override x/y per scene (e.g. Scene 10's hub layout
 * doesn't use body-anatomical positions at all). Provided so most scenes
 * don't have to invent coordinates from scratch.
 */
export const BODY_REGIONS: Record<HiOrgan, { x: number; y: number }> = {
  brain: { x: BODY_CENTER_X, y: 26 },
  adrenal: { x: BODY_CENTER_X, y: 118 },
  liver: { x: BODY_CENTER_X + 20, y: 132 },
  gut: { x: BODY_CENTER_X, y: 155 },
  ovaries: { x: BODY_CENTER_X, y: 180 },
  bone: { x: BODY_CENTER_X, y: 232 },
};

interface ProfilePoint {
  y: number;
  /** Half-width of the silhouette at this height, in viewBox units. */
  halfWidth: number;
}

// Deliberately gentle, moderate transitions throughout — no single
// dramatic curve anywhere. Kept close to a neutral human proportion
// rather than emphasizing any one body shape, per "no gender stereotypes
// beyond what is necessary."
const PROFILE: ProfilePoint[] = [
  { y: 12, halfWidth: 2 }, // crown
  { y: 22, halfWidth: 20 }, // head, widest
  { y: 38, halfWidth: 17 }, // jaw
  { y: 50, halfWidth: 11 }, // neck
  { y: 66, halfWidth: 30 }, // shoulders
  { y: 100, halfWidth: 26 }, // chest
  { y: 145, halfWidth: 22 }, // waist
  { y: 185, halfWidth: 25 }, // hip
  { y: 225, halfWidth: 17 }, // taper
  { y: 265, halfWidth: 5 }, // soft base — no separate legs, no feet detail
];

/**
 * Builds a smooth, symmetric closed path from a half-width profile.
 * Mirrors the right-side points to the left rather than hand-authoring
 * both sides, so symmetry is guaranteed by construction, and the shape
 * can be re-tuned later by editing PROFILE's plain numbers instead of
 * bezier control points.
 */
function buildSilhouettePath(profile: ProfilePoint[], centerX: number): string {
  const right = profile.map((p) => ({ x: centerX + p.halfWidth, y: p.y }));
  const left = [...profile].reverse().map((p) => ({ x: centerX - p.halfWidth, y: p.y }));
  const points = [...right, ...left];

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    d += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
  }
  const first = points[0];
  const last = points[points.length - 1];
  d += ` Q ${last.x} ${last.y} ${first.x} ${first.y} Z`;
  return d;
}

const SILHOUETTE_PATH = buildSilhouettePath(PROFILE, BODY_CENTER_X);

export interface BodySilhouetteProps {
  /** Rendered width in px. Omit to fill 100% of the parent container (default, recommended). Height follows automatically via the fixed aspect ratio. */
  size?: number;
  /** Outline opacity. Defaults to a deliberately quiet 0.14 — this should never be increased to the point of competing with the organs it holds. */
  opacity?: number;
  /** Organ nodes / signal paths, rendered as an overlay in the same coordinate space. See BODY_VIEWBOX / BODY_REGIONS. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function BodySilhouette({ size, opacity = 0.14, children, className, style }: BodySilhouetteProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: size ?? "100%",
        aspectRatio: `${VIEWBOX_WIDTH} / ${VIEWBOX_HEIGHT}`,
        ...style,
      }}
    >
      <svg
        viewBox={BODY_VIEWBOX}
        role="presentation"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <path d={SILHOUETTE_PATH} fill="none" stroke={hiColor.ink} strokeWidth={1} strokeOpacity={opacity} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {children && <div style={{ position: "absolute", inset: 0 }}>{children}</div>}
    </div>
  );
}
