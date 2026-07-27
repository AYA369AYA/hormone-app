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
    symptoms: ["夕方から急にパワーダウンする", "帰宅後に動けない", "夜に寝落ちしやすい"],
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
};
