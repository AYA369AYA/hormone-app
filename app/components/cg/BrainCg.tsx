import type { CSSProperties } from "react";

const NODES = [
  { cx: 45, cy: 40 },
  { cx: 80, cy: 30 },
  { cx: 115, cy: 42 },
  { cx: 60, cy: 65 },
  { cx: 100, cy: 68 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 4],
];

export function BrainCg() {
  return (
    <svg viewBox="0 0 160 120" style={styles.svg} role="img" aria-label="脳内の神経伝達の模式図">
      <path
        d="M30 45 C22 20 55 8 80 12 C105 8 138 20 130 45 C138 65 118 88 90 86 C86 96 70 96 66 86 C40 88 22 65 30 45 Z"
        fill="none"
        stroke="#2C2A28"
        strokeWidth={1.2}
        strokeOpacity={0.5}
      />
      {LINKS.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].cx}
          y1={NODES[a].cy}
          x2={NODES[b].cx}
          y2={NODES[b].cy}
          stroke="#C6A96B"
          strokeWidth={1}
        />
      ))}
      {NODES.map((node, i) => (
        <circle
          key={i}
          className="hj-flicker"
          cx={node.cx}
          cy={node.cy}
          r={4}
          fill="#C6A96B"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
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
