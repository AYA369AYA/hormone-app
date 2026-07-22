import type { CSSProperties, ReactNode } from "react";
import { hiColor } from "./tokens";

/**
 * CauseEffectConnector — Visual Language v2.
 *
 * The visual device that answers "why do I feel this way?" directly: a
 * labeled arrow connecting something already on screen (a report value,
 * a graph position) to the symptom or outcome the narration names. Per
 * Art Direction Guide §5, this should always reference something
 * concrete already visible — it's a callout, not a floating comment.
 */

export interface CauseEffectConnectorProps {
  children: ReactNode;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function CauseEffectConnector({ children, size, className, style }: CauseEffectConnectorProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: size ?? "100%",
        padding: "14px 16px",
        background: hiColor.canvas,
        borderRadius: 10,
        border: `1px dashed rgba(44,42,40,0.12)`,
        ...style,
      }}
    >
      <svg width={22} height={22} viewBox="0 0 24 24" style={{ flexShrink: 0, color: hiColor.inkMuted }} aria-hidden="true">
        <path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 12.5, color: hiColor.inkSoft, lineHeight: 1.6 }}>{children}</span>
    </div>
  );
}
