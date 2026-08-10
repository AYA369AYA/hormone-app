import type { CSSProperties } from "react";

export function FemaleHormoneCg() {
  return (
    <svg viewBox="0 0 160 120" style={styles.svg} role="img" aria-label="卵巣・プロゲステロン・女性ホルモンの模式図">
      <circle cx="30" cy="60" r="14" fill="#FCFAF7" stroke="#2C2A28" strokeWidth={1.5} />
      <circle cx="80" cy="30" r="12" fill="#FCFAF7" stroke="#2C2A28" strokeWidth={1.5} />
      <circle cx="130" cy="60" r="16" fill="#FCFAF7" stroke="#2C2A28" strokeWidth={1.5} />

      <path
        className="hj-dash-flow"
        d="M42 55 Q60 35 70 32"
        fill="none"
        stroke="#C6A96B"
        strokeWidth={1.5}
      />
      <path
        className="hj-dash-flow"
        d="M90 33 Q112 40 118 50"
        fill="none"
        stroke="#C6A96B"
        strokeWidth={1.5}
        style={{ animationDelay: "0.4s" }}
      />

      <text x="30" y="90" textAnchor="middle" fontSize="9" fill="#5A534D">
        卵巣
      </text>
      <text x="80" y="14" textAnchor="middle" fontSize="9" fill="#5A534D">
        プロゲステロン
      </text>
      <text x="130" y="90" textAnchor="middle" fontSize="9" fill="#5A534D">
        エストロゲン
      </text>
    </svg>
  );
}

const styles: Record<string, CSSProperties> = {
  svg: {
    width: "100%",
    height: 120,
    display: "block",
  },
};
