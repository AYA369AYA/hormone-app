import type { CSSProperties } from "react";

export function LiverCg() {
  return (
    <svg
      viewBox="0 0 160 120"
      style={styles.svg}
      role="img"
      aria-label="肝臓とエネルギー生成の模式図"
    >
      <path
        d="M25 55 C25 30 55 22 85 26 C115 30 135 42 132 62 C129 84 100 96 70 92 C42 88 25 78 25 55 Z"
        fill="#FCFAF7"
        stroke="#2C2A28"
        strokeWidth={1.5}
      />
      <path
        className="hj-flicker"
        d="M40 56 C40 40 60 34 82 37 C104 40 118 48 116 60 C114 74 92 82 70 79 C50 76 40 68 40 56 Z"
        fill="#C6A96B"
        fillOpacity={0.5}
      />
      <path
        className="hj-dash-flow"
        d="M118 58 Q140 62 148 78"
        fill="none"
        stroke="#C6A96B"
        strokeWidth={1.5}
      />
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
