import type { CSSProperties } from "react";

/**
 * セルフテストの回答傾向を、朝・昼・夕・夜のイメージ曲線として可視化する。
 * score/deepScoreの計算式自体は変更せず、既存のGraphBarと同じ値を
 * 別の見せ方（曲線+現在地マーカー）で描画するだけの表示コンポーネント。
 * 実測値ではないことが伝わるよう、キャプションを必ず添える。
 */
export function RhythmChart({
  score,
  deepScore,
}: {
  score: number;
  deepScore: number;
}) {
  const recovery = 100 - Math.min(score * 2.2, 100);
  const fatigue = Math.min(score * 2.2, 100);
  const deep = Math.min(deepScore * 33, 100);

  // 朝・昼・夕・夜の4点（0=低調 / 100=良好）。既存スコアから素直に導出。
  const points = [
    { label: "朝", value: recovery },
    { label: "昼", value: (recovery + 100 - fatigue) / 2 },
    { label: "夕", value: 100 - fatigue },
    { label: "夜", value: 100 - deep },
  ];

  const idealY = (v: number) => 24 - (v / 100) * 16; // 理想ラインは高めの帯で安定
  const nowY = (v: number) => 24 - (Math.max(0, Math.min(100, v)) / 100) * 16;

  const xs = [8, 78, 148, 218];
  const idealPath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${idealY(82)}`).join(" ");
  const nowPath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${nowY(points[i].value)}`).join(" ");

  const lowestIndex = points.reduce(
    (min, p, i, arr) => (p.value < arr[min].value ? i : min),
    0
  );

  return (
    <div style={styles.wrapper}>
      <p style={styles.title}>一日の身体のリズム（イメージ）</p>
      <svg viewBox="0 0 226 40" style={styles.svg} aria-hidden="true">
        <path d={idealPath} stroke="var(--hi-gold-soft,#DCC9A0)" strokeWidth={1.5} fill="none" strokeDasharray="2 3" />
        <path d={nowPath} stroke="var(--hi-gold,#C6A96B)" strokeWidth={2} fill="none" />
        {xs.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={nowY(points[i].value)}
            r={i === lowestIndex ? 4 : 2.5}
            fill={i === lowestIndex ? "#C6A96B" : "#fff"}
            stroke="#C6A96B"
            strokeWidth={1.5}
          />
        ))}
      </svg>
      <div style={styles.labels}>
        {points.map((p, i) => (
          <span key={p.label} style={i === lowestIndex ? styles.labelActive : styles.label}>
            {p.label}
            {i === lowestIndex && <span style={styles.labelTag}>現在地</span>}
          </span>
        ))}
      </div>
      <div style={styles.legend}>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendSwatch, background: "#C6A96B" }} />
          今の傾向
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendSwatch, background: "#DCC9A0", opacity: 0.6 }} />
          理想的なリズム
        </span>
      </div>
      <p style={styles.disclaimer}>
        ※セルフテストの回答から見える傾向のイメージです。実測されたホルモン値ではありません。
      </p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 20,
    padding: "20px 18px",
    borderRadius: 18,
    background:
      "radial-gradient(circle at 50% 0%, oklch(88% .05 85 / 0.35) 0%, transparent 70%), oklch(98.5% .008 85)",
    border: "1px solid rgba(198,169,107,0.25)",
  },
  title: {
    fontSize: 13,
    letterSpacing: "0.06em",
    color: "#A08F7E",
    marginBottom: 12,
  },
  svg: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  labels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
    padding: "0 2px",
  },
  label: {
    fontSize: 12,
    color: "#5A534D",
  },
  labelActive: {
    fontSize: 12,
    color: "#2C2A28",
    fontWeight: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  labelTag: {
    fontSize: 10,
    color: "#C6A96B",
    letterSpacing: "0.04em",
  },
  legend: {
    display: "flex",
    gap: 16,
    marginTop: 14,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    color: "#A08F7E",
  },
  legendSwatch: {
    display: "inline-block",
    width: 10,
    height: 10,
    borderRadius: "50%",
  },
  disclaimer: {
    marginTop: 14,
    fontSize: 11,
    lineHeight: 1.7,
    color: "#A08F7E",
  },
};
