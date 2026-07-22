import type { CSSProperties } from "react";
import { hiColor } from "./tokens";

/**
 * HormoneGraph — Visual Language v2.
 *
 * A real clinical-style chart: an "optimal range" band, an ideal-pattern
 * line, and an actual/measured pattern line — built to be read as data,
 * not abstract art. Same visual family as the pre-existing CortisolChart
 * (app/components/CortisolChart.tsx) but rebuilt on the Hormone
 * Intelligence token system rather than raw hex, and with the reference
 * band this version's mockup added. The two components are intentionally
 * not merged: CortisolChart still serves the separately-owned, unrelated
 * Hormone Journey page; this one is Hormone Intelligence's own.
 */

export interface HormoneGraphPoint {
  /** X-axis label, e.g. "起床時". */
  label: string;
  /** Y position as a 0–1 fraction of the chart's vertical range (1 = top). */
  value: number;
}

export interface HormoneGraphProps {
  /** The ideal/reference pattern. */
  idealPoints: HormoneGraphPoint[];
  /** The actual/measured pattern for this person. */
  actualPoints: HormoneGraphPoint[];
  /** Optimal-range band, as a 0–1 fraction pair (top, bottom) of the chart's vertical range. */
  optimalRange: { top: number; bottom: number };
  idealLegendLabel: string;
  actualLegendLabel: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const WIDTH = 600;
const HEIGHT = 220;
const PLOT_LEFT = 50;
const PLOT_RIGHT = 580;
const PLOT_TOP = 30;
const PLOT_BOTTOM = 180;

function toXY(points: HormoneGraphPoint[]): { x: number; y: number; label: string }[] {
  return points.map((p, i) => ({
    x: PLOT_LEFT + (i / (points.length - 1)) * (PLOT_RIGHT - PLOT_LEFT),
    y: PLOT_BOTTOM - p.value * (PLOT_BOTTOM - PLOT_TOP),
    label: p.label,
  }));
}

export function HormoneGraph({
  idealPoints,
  actualPoints,
  optimalRange,
  idealLegendLabel,
  actualLegendLabel,
  size,
  className,
  style,
}: HormoneGraphProps) {
  const idealXY = toXY(idealPoints);
  const actualXY = toXY(actualPoints);
  const bandTopY = PLOT_BOTTOM - optimalRange.top * (PLOT_BOTTOM - PLOT_TOP);
  const bandBottomY = PLOT_BOTTOM - optimalRange.bottom * (PLOT_BOTTOM - PLOT_TOP);

  return (
    <div className={className} style={{ width: size ?? "100%", ...style }}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="ホルモンリズムのグラフ">
        <rect
          x={PLOT_LEFT}
          y={bandTopY}
          width={PLOT_RIGHT - PLOT_LEFT}
          height={bandBottomY - bandTopY}
          fill={hiColor.gold}
          fillOpacity={0.14}
          rx={4}
        />
        <text x={PLOT_RIGHT} y={bandTopY - 8} fontSize={10} fill={hiColor.inkMuted} textAnchor="end">
          optimal range
        </text>

        <line x1={PLOT_LEFT} y1={PLOT_BOTTOM} x2={PLOT_RIGHT} y2={PLOT_BOTTOM} stroke={hiColor.ink} strokeOpacity={0.12} strokeWidth={1} />
        <line x1={PLOT_LEFT} y1={PLOT_TOP} x2={PLOT_LEFT} y2={PLOT_BOTTOM} stroke={hiColor.ink} strokeOpacity={0.12} strokeWidth={1} />

        <polyline
          points={idealXY.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={hiColor.gold}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={actualXY.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke={hiColor.gold}
          strokeOpacity={0.45}
          strokeWidth={2.5}
          strokeDasharray="5 5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {actualXY[0] && <circle cx={actualXY[0].x} cy={actualXY[0].y} r={4.5} fill={hiColor.gold} fillOpacity={0.75} />}

        {idealXY.map((p) => (
          <text key={p.label} x={p.x} y={HEIGHT - 20} fontSize={10.5} fill={hiColor.inkMuted} textAnchor="middle">
            {p.label}
          </text>
        ))}
      </svg>
      <div style={{ display: "flex", gap: 18, marginTop: 10, fontSize: 11.5, color: hiColor.inkSoft }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <i style={{ width: 12, height: 2, background: hiColor.gold, display: "inline-block" }} />
          {idealLegendLabel}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <i style={{ width: 12, height: 2, background: hiColor.gold, opacity: 0.45, display: "inline-block" }} />
          {actualLegendLabel}
        </span>
      </div>
    </div>
  );
}
