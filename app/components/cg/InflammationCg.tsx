import type { CSSProperties } from "react";

export function InflammationCg() {
  return (
    <svg
      viewBox="0 0 160 120"
      style={styles.svg}
      role="img"
      aria-label="皮膚と炎症の模式図"
    >
      <path
        d="M10 70 Q40 50 70 70 T130 70 T150 70"
        fill="none"
        stroke="#2C2A28"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M10 82 Q40 64 70 82 T130 82 T150 82"
        fill="none"
        stroke="#2C2A28"
        strokeWidth={1}
        strokeOpacity={0.35}
        strokeLinecap="round"
      />
      <circle className="hj-pulse" cx="55" cy="42" r="5" fill="#B0553F" />
      <circle className="hj-pulse" cx="85" cy="34" r="4" fill="#B0553F" style={{ animationDelay: "0.6s" }} />
      <circle className="hj-pulse" cx="105" cy="46" r="3.5" fill="#B0553F" style={{ animationDelay: "1.1s" }} />
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
