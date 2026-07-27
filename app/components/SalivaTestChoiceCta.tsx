import type { CSSProperties } from "react";

/**
 * 結果画面で「5日間Journeyで学ぶ」と同じ重要度・同じデザインで並ぶ、
 * 唾液ホルモン検査への選択肢カード。押し売りではなく、
 * 今すぐ知りたい方が自分のタイミングで選べる導線として提示する。
 */
export function SalivaTestChoiceCta({ testUrl }: { testUrl?: string }) {
  return (
    <div style={styles.wrapper}>
      <p style={styles.kicker}>② SALIVA HORMONE TEST</p>
      <p style={styles.mainHeading}>唾液ホルモン検査</p>
      <p style={styles.subtitle}>今すぐ、身体の現在地を詳しく知る</p>
      <p style={styles.body}>
        セルフテストでは分からない身体の現在地を、
        <br />
        唾液ホルモン検査で詳しく確認できます。
      </p>
      <a href={testUrl || "/journey/video"} style={styles.button}>
        今の身体を詳しく知る（唾液ホルモン検査）
      </a>
      <p style={styles.note}>ご自身のタイミングで、いつでもお申し込みいただけます。</p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 24,
    padding: 20,
    borderRadius: 18,
    background: "#F5EFE6",
    border: "1px solid rgba(198,169,107,0.22)",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: "0.14em",
    color: "#A08F7E",
    marginBottom: 10,
  },
  mainHeading: {
    fontSize: 24,
    lineHeight: 1.4,
    color: "#2C2A28",
    fontWeight: 600,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "#5A534D",
    marginBottom: 14,
  },
  body: {
    fontSize: 14,
    lineHeight: 1.8,
    color: "#5A534D",
    marginBottom: 20,
  },
  button: {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: 16,
    borderRadius: 999,
    border: "1px solid #C6A96B",
    background: "#C6A96B",
    color: "#fff",
    fontSize: 16,
    textDecoration: "none",
    boxSizing: "border-box",
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 1.7,
    color: "#A08F7E",
  },
};
