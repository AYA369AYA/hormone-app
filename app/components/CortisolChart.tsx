import type { CSSProperties } from "react";

const TIME_LABELS = ["起床時", "午前", "午後", "夕方", "夜"];
const NORMAL_RHYTHM = [90, 70, 55, 40, 25];
const LOW_PATTERN = [55, 35, 25, 30, 20];

const WIDTH = 300;
const HEIGHT = 140;

function toPoints(values: number[]): string {
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * WIDTH;
      const y = HEIGHT - (v / 100) * HEIGHT;
      return `${x},${y}`;
    })
    .join(" ");
}

export function CortisolChart({ imageSrc }: { imageSrc?: string }) {
  if (imageSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageSrc} alt="コルチゾール分泌リズムのグラフ" style={styles.image} />;
  }

  return (
    <div style={styles.wrapper}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={styles.svg}
        preserveAspectRatio="none"
        role="img"
        aria-label="コルチゾール分泌リズムのイメージ図"
      >
        <polyline
          points={toPoints(NORMAL_RHYTHM)}
          fill="none"
          stroke="#C6A96B"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={toPoints(LOW_PATTERN)}
          fill="none"
          stroke="#B0553F"
          strokeWidth={2}
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div style={styles.labels}>
        {TIME_LABELS.map((label) => (
          <span key={label} style={styles.labelText}>
            {label}
          </span>
        ))}
      </div>

      <div style={styles.legend}>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendSwatch, background: "#C6A96B" }} />
          健康的なリズム
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendSwatch, background: "#B0553F" }} />
          気になるサインがある方に見られる傾向
        </span>
      </div>

      <p style={styles.note}>※イメージ図です。個々の検査結果とは異なります。</p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    padding: 18,
    borderRadius: 16,
    background: "#FCFAF7",
    border: "1px solid rgba(198,169,107,0.2)",
  },
  svg: {
    width: "100%",
    height: 140,
    display: "block",
  },
  image: {
    width: "100%",
    borderRadius: 16,
  },
  labels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
    fontSize: 11,
    color: "#A08F7E",
  },
  labelText: {
    flex: 1,
    textAlign: "center",
  },
  legend: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginTop: 16,
    fontSize: 12,
    color: "#5A534D",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  legendSwatch: {
    width: 14,
    height: 3,
    borderRadius: 2,
    display: "inline-block",
  },
  note: {
    marginTop: 12,
    fontSize: 11,
    color: "#A08F7E",
  },
};
