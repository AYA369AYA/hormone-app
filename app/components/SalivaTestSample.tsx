import type { CSSProperties } from "react";

interface SampleItem {
  time: string;
  label: string;
  symptoms: string[];
}

const SAMPLES: SampleItem[] = [
  {
    time: "朝",
    label: "コルチゾール低値",
    symptoms: [
      "朝すっきり起きにくい",
      "朝食欲が出にくい",
      "コーヒーがないと動きにくい",
      "午前中に集中しづらい",
    ],
  },
  {
    time: "日中",
    label: "コルチゾール低値",
    symptoms: ["ランチ後に眠くなる", "午後に身体が重くなる", "甘いものやカフェインが欲しくなる"],
  },
  {
    time: "夕方",
    label: "コルチゾール低値",
    symptoms: [
      "夕方から急にパワーダウンする",
      "帰宅後に動けない",
      "夜に寝落ちしやすい",
      "性欲が湧きにくい（性欲低下）",
    ],
  },
];

/**
 * 唾液ホルモン検査で分かる項目と、日常症状との対応関係を「参考例」として示す。
 * セルフテストのスコアとは無関係(実測値ではない)。診断でもない。
 */
export function SalivaTestSample() {
  return (
    <div style={styles.wrapper}>
      <p style={styles.kicker}>SALIVA HORMONE TEST SAMPLE</p>
      <h2 style={styles.heading}>唾液ホルモン検査でわかること（参考例）</h2>
      <p style={styles.intro}>
        検査結果は、1日のコルチゾールのリズムとして確認できます。
        <br />
        実際にはこのような対応が見られることがあります。
      </p>

      <CortisolCurveSample />

      <div style={styles.row}>
        {SAMPLES.map((sample) => (
          <div key={sample.time} style={styles.card}>
            <p style={styles.time}>{sample.time}</p>
            <p style={styles.label}>{sample.label}</p>
            <ul style={styles.list}>
              {sample.symptoms.map((s) => (
                <li key={s} style={styles.listItem}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={styles.disclaimer}>
        ※これは検査で確認できる項目の一例であり、診断ではありません。実際の結果は個人ごとに異なります。
      </p>
    </div>
  );
}

/**
 * 実際の検査レポートではなく、コルチゾールの一日のリズムを説明するための
 * 「イメージ図」。数値・日付・氏名等は一切含めず、実測レポートと誤認され
 * ないようにする。曲線の形は一般的な低値パターンの説明用で、特定個人の
 * 検査結果ではない。
 */
function CortisolCurveSample() {
  const points = [
    { x: 10, y: 22, label: "朝" },
    { x: 70, y: 46, label: "昼" },
    { x: 130, y: 58, label: "夕" },
    { x: 190, y: 66, label: "夜" },
  ];
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const idealPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y - 20}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},76 L${points[0].x},76 Z`;

  return (
    <div style={styles.chartWrapper}>
      <p style={styles.chartLabel}>コルチゾール推移イメージ</p>
      <svg viewBox="0 0 200 80" style={styles.chartSvg} aria-hidden="true">
        <path d={areaPath} fill="url(#cortisolGradient)" />
        <path d={idealPath} stroke="rgba(198,169,107,0.35)" strokeWidth={1.5} fill="none" strokeDasharray="3 3" />
        <path d={linePath} stroke="#C6A96B" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r={3.5} fill="#fff" stroke="#C6A96B" strokeWidth={2} />
        ))}
        <defs>
          <linearGradient id="cortisolGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C6A96B" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#C6A96B" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
      <div style={styles.chartAxis}>
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
      <div style={styles.chartLegend}>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendSwatch, background: "#C6A96B" }} />
          コルチゾールの推移（例）
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.legendSwatch, background: "rgba(198,169,107,0.35)" }} />
          理想的なリズム
        </span>
      </div>
      <p style={styles.chartCaption}>
        ※実際の検査レポートのイメージ図です。個人の測定値ではありません。
      </p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 32,
    padding: "22px 18px",
    borderRadius: 18,
    background: "#FCFAF7",
    border: "1px solid rgba(198,169,107,0.22)",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: "0.14em",
    color: "#A08F7E",
    marginBottom: 8,
    textAlign: "center",
  },
  heading: {
    fontSize: 18,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 10,
    textAlign: "center",
  },
  intro: {
    fontSize: 13,
    lineHeight: 1.8,
    color: "#5A534D",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: 14,
  },
  card: {
    flex: "1 1 220px",
    padding: 18,
    borderRadius: 14,
    background: "#FFFFFF",
    border: "1px solid rgba(198,169,107,0.2)",
  },
  time: {
    fontSize: 15,
    fontWeight: 600,
    color: "#2C2A28",
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: "#C6A96B",
    marginBottom: 12,
  },
  list: {
    margin: 0,
    paddingLeft: 18,
  },
  listItem: {
    fontSize: 13,
    lineHeight: 1.9,
    color: "#5A534D",
  },
  disclaimer: {
    marginTop: 18,
    fontSize: 11,
    lineHeight: 1.7,
    color: "#A08F7E",
  },
  chartWrapper: {
    marginBottom: 24,
    padding: "18px 16px 14px",
    borderRadius: 14,
    background: "#FFFFFF",
    border: "1px solid rgba(198,169,107,0.2)",
  },
  chartLabel: {
    fontSize: 12,
    letterSpacing: "0.06em",
    color: "#A08F7E",
    marginBottom: 10,
    textAlign: "center",
  },
  chartSvg: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  chartAxis: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 6px 0",
    fontSize: 12,
    color: "#5A534D",
  },
  chartLegend: {
    display: "flex",
    justifyContent: "center",
    gap: 16,
    marginTop: 12,
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
    height: 3,
    borderRadius: 2,
  },
  chartCaption: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 1.6,
    color: "#A08F7E",
    textAlign: "center",
  },
};
