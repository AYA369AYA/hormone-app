import type { CSSProperties } from "react";

const ITEMS = [
  {
    name: "プロゲステロン（P4）",
    value: 32,
    min: 20,
    max: 100,
    unit: "pg/mL",
    blurb: "エストロゲンとバランスを取り合う、もう一方の女性ホルモン。",
  },
  {
    name: "エストロゲン（E2）",
    value: 1.1,
    min: 0.5,
    max: 3.5,
    unit: "pg/mL",
    blurb: "P4とのバランスで見ることで、単独の数値以上のことが分かります。",
  },
  {
    name: "コルチゾール",
    value: 0.18,
    min: 0.35,
    max: 0.55,
    unit: "µg/dL",
    blurb: "朝に高く、夜に低いのが健康的なリズム。1日の変化を見ることが大切です。",
  },
  {
    name: "DHEA-S",
    value: 105,
    min: 90,
    max: 300,
    unit: "pg/mL",
    blurb: "コルチゾールの原材料となるホルモン。副腎の状態を知る手がかりです。",
  },
];

function positionPercent(value: number, min: number, max: number): number {
  const ratio = (value - min) / (max - min);
  return Math.min(100, Math.max(0, ratio * 100));
}

export function SampleTestResult({ imageSrc }: { imageSrc?: string }) {
  if (imageSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageSrc} alt="唾液女性ホルモン検査結果" style={styles.image} />;
  }

  return (
    <div style={styles.wrapper}>
      <p style={styles.badge}>検査結果サンプル</p>

      <p style={styles.intro}>
        「基準範囲内かどうか」だけでなく、範囲のどこに位置しているか、
        他の項目とのバランスはどうかを見ることが、レポートを読むうえで大切です。
      </p>

      {ITEMS.map((item) => (
        <div key={item.name} style={styles.row}>
          <div style={styles.rowHeader}>
            <span style={styles.name}>{item.name}</span>
            <span style={styles.value}>
              {item.value}
              {item.unit}
            </span>
          </div>
          <p style={styles.blurb}>{item.blurb}</p>
          <div style={styles.track}>
            <div
              style={{
                ...styles.marker,
                left: `${positionPercent(item.value, item.min, item.max)}%`,
              }}
            />
          </div>
          <div style={styles.rangeLabels}>
            <span>
              {item.min}
              {item.unit}
            </span>
            <span>基準範囲</span>
            <span>
              {item.max}
              {item.unit}
            </span>
          </div>
        </div>
      ))}

      <p style={styles.note}>
        数字だけを見ると、不安になる方もいらっしゃいます。でも大切なのは、この数字が
        「今のあなたの状態」を教えてくれているということです。結果は専門医の解説と
        あわせてご確認いただけます。
      </p>
      <p style={styles.disclaimer}>※サンプルです。実際の数値は個人ごとの検査結果に基づきます。</p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 16,
    padding: 18,
    borderRadius: 16,
    background: "#FCFAF7",
    border: "1px solid rgba(198,169,107,0.2)",
  },
  image: {
    width: "100%",
    borderRadius: 16,
    marginTop: 16,
  },
  badge: {
    display: "inline-block",
    marginBottom: 12,
    padding: "4px 12px",
    borderRadius: 999,
    background: "#EFE4D4",
    fontSize: 11,
    letterSpacing: "0.08em",
    color: "#8A7857",
  },
  intro: {
    marginBottom: 18,
    lineHeight: 1.8,
    fontSize: 13,
    color: "#5A534D",
  },
  row: {
    marginBottom: 20,
  },
  rowHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
    fontSize: 13,
    color: "#2C2A28",
  },
  name: {
    fontWeight: 600,
  },
  value: {
    color: "#5A534D",
  },
  blurb: {
    marginBottom: 8,
    fontSize: 11,
    lineHeight: 1.6,
    color: "#A08F7E",
  },
  track: {
    position: "relative",
    height: 6,
    borderRadius: 999,
    background: "rgba(198,169,107,0.18)",
  },
  marker: {
    position: "absolute",
    top: -3,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#C6A96B",
    border: "2px solid #fff",
    boxShadow: "0 0 0 1px rgba(198,169,107,0.4)",
    transform: "translateX(-50%)",
  },
  rangeLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 4,
    fontSize: 10,
    color: "#A08F7E",
  },
  note: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    background: "#F5EFE6",
    fontSize: 12,
    lineHeight: 1.8,
    color: "#5A534D",
  },
  disclaimer: {
    marginTop: 10,
    fontSize: 11,
    color: "#A08F7E",
  },
};
