import type { CSSProperties } from "react";

const NODES = [
  { cx: 80, cy: 18, label: "脳" },
  { cx: 30, cy: 55, label: "肝臓" },
  { cx: 130, cy: 55, label: "免疫" },
  { cx: 55, cy: 100, label: "卵巣" },
];

export function WholeBodyCg() {
  return (
    <svg viewBox="0 0 160 120" style={styles.svg} role="img" aria-label="全身がつながっている模式図">
      <circle cx="80" cy="60" r="6" fill="#FCFAF7" stroke="#2C2A28" strokeWidth={1.2} />

      {NODES.map((node, i) => (
        <path
          key={i}
          className="hj-dash-flow"
          d={`M${node.cx} ${node.cy} L80 60`}
          fill="none"
          stroke="#C6A96B"
          strokeWidth={1.2}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {NODES.map((node, i) => (
        <g key={i}>
          <circle
            className="hj-flicker"
            cx={node.cx}
            cy={node.cy}
            r={10}
            fill="#FCFAF7"
            stroke="#2C2A28"
            strokeWidth={1.2}
            style={{ animationDelay: `${i * 0.25}s` }}
          />
          <text x={node.cx} y={node.cy + 3} textAnchor="middle" fontSize="8" fill="#5A534D">
            {node.label}
          </text>
        </g>
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
