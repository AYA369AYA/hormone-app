import type { CSSProperties } from "react";
import { hiColor } from "./tokens";

/**
 * LabReportCard — Visual Language v2.
 *
 * A data-driven laboratory report layout. Every row comes from `rows` —
 * nothing about the markup is specific to any one hormone or test, so
 * swapping in an anonymized real salivary hormone report later means
 * replacing this data array, not touching the component. Flagged values
 * are emphasized through weight and a warm highlight within the existing
 * gold family — never a red/alert colour, consistent with the permanent
 * no-warning-tones rule (Art Direction Guide §3).
 */

export interface LabReportRow {
  /** Hormone/measurement name, as it should read on the report. */
  name: string;
  /** Measured value, already formatted for display (e.g. "3.2 nmol/L"). */
  value: string;
  /** Reference range, already formatted (e.g. "基準値 8.0–20.0"). */
  range: string;
  /** True if this value falls outside the reference range and should be visually emphasized. */
  flagged?: boolean;
}

export interface LabReportCardProps {
  title: string;
  rows: LabReportRow[];
  /** Shown as a tag in the header — true for placeholder data, false once real anonymized reports are wired in. */
  isSampleData: boolean;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function LabReportCard({ title, rows, isSampleData, size, className, style }: LabReportCardProps) {
  return (
    <div
      className={className}
      style={{
        width: size ?? "100%",
        border: "1px solid rgba(44,42,40,0.12)",
        borderRadius: 12,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          background: hiColor.canvas,
          padding: "12px 16px",
          borderBottom: "1px solid rgba(44,42,40,0.12)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 12.5, color: hiColor.inkSoft }}>{title}</span>
        {isSampleData && (
          <span
            style={{
              fontSize: 9.5,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "rgba(198,169,107,0.18)",
              color: "#8a6f3c",
              padding: "3px 9px",
              borderRadius: 999,
            }}
          >
            Sample data
          </span>
        )}
      </div>
      {rows.map((row, i) => (
        <div
          key={`${row.name}-${i}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.8fr 1fr",
            alignItems: "center",
            padding: "11px 16px",
            borderBottom: i < rows.length - 1 ? "1px solid rgba(44,42,40,0.12)" : "none",
            fontSize: 12.5,
            background: row.flagged ? "rgba(198,169,107,0.10)" : "transparent",
          }}
        >
          <span style={{ color: hiColor.ink }}>{row.name}</span>
          <span
            style={{
              fontFamily: "SF Mono, Consolas, monospace",
              fontVariantNumeric: "tabular-nums",
              color: row.flagged ? "#8a6f3c" : hiColor.ink,
              fontWeight: row.flagged ? 700 : 400,
              textAlign: "right",
              paddingRight: 14,
            }}
          >
            {row.value}
          </span>
          <span style={{ fontFamily: "SF Mono, Consolas, monospace", fontSize: 11, color: hiColor.inkMuted }}>{row.range}</span>
        </div>
      ))}
    </div>
  );
}
