import type { CSSProperties } from "react";

/**
 * セルフテストの回答傾向を「ストレス負荷」「身体の回復力」という
 * 独立した2つのリングゲージ（各0〜100%）で可視化する。
 * ホルモン量・ホルモンバランスの数値は一切表示しない（唾液ホルモン検査のみが扱う領域）。
 * 呼び出し側がそれぞれの採点方式から0〜100%を計算して渡す（採点ロジックはここに持たない）。
 */
export function StressRecoveryGauges({
  stress,
  recovery,
  disclaimer,
}: {
  stress: number;
  recovery: number;
  disclaimer?: string;
}) {
  return (
    <div style={styles.wrapper}>
      <p style={styles.title}>セルフテストから見える、今の身体の傾向</p>

      <div style={styles.gaugeRow}>
        <RingGauge
          label="ストレス負荷"
          value={stress}
          description="日常の回答から見える、身体にかかっている負荷の傾向"
        />
        <RingGauge
          label="身体の回復力"
          value={recovery}
          description="休息や睡眠によって、身体が本来の状態に戻る力の傾向"
        />
      </div>

      <p style={styles.summary}>{describeTendency(stress, recovery)}</p>

      <p style={styles.disclaimer}>
        {disclaimer ??
          "※この結果は、セルフテストから見える身体の傾向です。より詳しい身体の現在地は、唾液ホルモン検査で確認できます。"}
      </p>
    </div>
  );
}

function describeTendency(stress: number, recovery: number): string {
  const highStress = stress >= 55;
  const lowRecovery = recovery < 50;

  if (highStress && lowRecovery) {
    return "今のあなたは、ストレスによる負荷が高まり、身体の回復が追いつきにくくなっている傾向があります。";
  }
  if (highStress && !lowRecovery) {
    return "ストレスの負荷はやや高めですが、回復する力によってバランスを保てている可能性があります。";
  }
  if (!highStress && lowRecovery) {
    return "大きなストレス負荷は見られないものの、身体が回復しにくくなっている可能性があります。";
  }
  return "ストレスの負荷は少なく、身体が回復しやすい状態にある傾向があります。";
}

function RingGauge({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div style={styles.gaugeItem}>
      <div style={styles.gaugeSvgWrap}>
        <svg viewBox="0 0 100 100" style={styles.gaugeSvg} aria-hidden="true">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(198,169,107,0.16)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#C6A96B"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div style={styles.gaugeValue}>{clamped}%</div>
      </div>
      <p style={styles.gaugeLabel}>{label}</p>
      <p style={styles.gaugeDesc}>{description}</p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 20,
    padding: "22px 18px",
    borderRadius: 18,
    background:
      "radial-gradient(circle at 50% 0%, oklch(88% .05 85 / 0.35) 0%, transparent 70%), oklch(98.5% .008 85)",
    border: "1px solid rgba(198,169,107,0.25)",
  },
  title: {
    fontSize: 13,
    letterSpacing: "0.04em",
    color: "#A08F7E",
    marginBottom: 16,
    textAlign: "center",
  },
  gaugeRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
  },
  gaugeItem: {
    flex: "1 1 140px",
    maxWidth: 180,
    textAlign: "center",
  },
  gaugeSvgWrap: {
    position: "relative",
    width: "100%",
    maxWidth: 132,
    margin: "0 auto",
  },
  gaugeSvg: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  gaugeValue: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 24,
    fontWeight: 600,
    color: "#2C2A28",
  },
  gaugeLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 600,
    color: "#2C2A28",
  },
  gaugeDesc: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 1.6,
    color: "#A08F7E",
  },
  summary: {
    marginTop: 20,
    lineHeight: 1.8,
    fontSize: 14,
    color: "#5A534D",
    textAlign: "center",
  },
  disclaimer: {
    marginTop: 14,
    fontSize: 11,
    lineHeight: 1.7,
    color: "#A08F7E",
  },
};
