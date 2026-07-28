import { hiColor } from "./tokens";

/**
 * Gauge — Science Library asset. A minimalist analog dial (a Rams/Braun
 * instrument register, not a digital HUD) showing a measured value moving
 * from a current position toward a target — built for Progesterone's P4/E2
 * ratio beat, but scene-agnostic: reusable by any future scene that needs
 * to visualize a lab ratio or measured value against a target. Holds no
 * internal timer — the calling scene animates `progress` from its own
 * elapsed clock, same pattern as every other Hormone Intelligence asset.
 */

export interface GaugeProps {
  /** 0 to 1 — how far the indicator has travelled from the current-value mark toward the target-value mark. */
  progress: number;
  currentLabel: string;
  targetLabel: string;
  size?: number;
  /**
   * 0 to 1, default 0 — a momentary emphasis on the track (not the
   * progress arc), for a scene that wants to visually "point back" at the
   * gauge at a specific narration beat without a new element. Pulses both
   * opacity (0.35 to 0.85) and stroke width (2 to 3.5) — opacity alone on
   * a 2px line was confirmed too subtle to read clearly even at its peak.
   */
  trackEmphasis?: number;
}

const CENTER_X = 100;
const RADIUS = 80;
const TRACK_Y = 100;

function pointOnArc(angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER_X + RADIUS * Math.cos(rad), y: TRACK_Y - RADIUS * Math.sin(rad) };
}

// A single semicircle, left to right over the top — the whole track is
// static and always visible ("connection before movement," matching A2's
// own principle); only the gold overlay arc animates.
const START = pointOnArc(180);
const END = pointOnArc(0);
const TRACK_PATH = `M ${START.x} ${START.y} A ${RADIUS} ${RADIUS} 0 0 1 ${END.x} ${END.y}`;

export function Gauge({ progress, currentLabel, targetLabel, size, trackEmphasis = 0 }: GaugeProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const marker = pointOnArc(180 - clamped * 180);
  const emphasis = Math.max(0, Math.min(1, trackEmphasis));
  const trackOpacity = 0.35 + emphasis * 0.5;
  const trackWidth = 2 + emphasis * 1.5;

  return (
    <svg
      viewBox="0 0 200 130"
      role="img"
      aria-label={`${currentLabel} moving toward ${targetLabel}`}
      style={{ width: size ?? "100%", height: size ?? "auto", display: "block", overflow: "visible" }}
    >
      {/* No CSS transition here: the caller already recomputes trackOpacity/trackWidth every animation frame, and a CSS transition on stroke-opacity/stroke-width driven only by presentation attributes (not the style object) can get stuck on its first value in Chromium — confirmed via direct DOM inspection, not assumed. */}
      <path d={TRACK_PATH} fill="none" stroke={hiColor.inkMuted} strokeOpacity={trackOpacity} strokeWidth={trackWidth} strokeLinecap="round" />
      <path
        d={TRACK_PATH}
        fill="none"
        stroke={hiColor.gold}
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={1}
        pathLength={1}
        style={{ strokeDashoffset: 1 - clamped }}
      />
      <circle cx={marker.x} cy={marker.y} r={4} fill={hiColor.gold} />
      <text x={START.x} y={TRACK_Y + 22} textAnchor="start" fontFamily="Georgia, serif" fontSize={11} fill={hiColor.inkSoft}>
        {currentLabel}
      </text>
      <text x={END.x} y={TRACK_Y + 22} textAnchor="end" fontFamily="Georgia, serif" fontSize={11} fill={hiColor.inkSoft}>
        {targetLabel}
      </text>
    </svg>
  );
}
