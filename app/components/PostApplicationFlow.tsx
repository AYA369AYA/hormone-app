import type { CSSProperties } from "react";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  "検査キットが届きます",
  "約3週間後、専門医による検査結果の個別解説動画をお届けします",
  "必要に応じて、グループまたは個別セッションをご案内します",
  "Hormone Journeyがはじまります",
];

export function PostApplicationFlow() {
  return (
    <ScrollReveal style={styles.section}>
      <p style={styles.eyebrow}>申し込み後の流れ</p>
      <h2 style={styles.heading}>唾液女性ホルモン検査に申し込むと、こう進みます</h2>

      <ol style={styles.list}>
        {STEPS.map((step, i) => (
          <li key={step} style={styles.item}>
            <span style={styles.number}>{i + 1}</span>
            <span style={styles.text}>{step}</span>
          </li>
        ))}
      </ol>
    </ScrollReveal>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 56,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: "0.14em",
    color: "#A08F7E",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 19,
    lineHeight: 1.7,
    color: "#2C2A28",
    marginBottom: 20,
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
    background: "#FCFAF7",
    border: "1px solid rgba(198,169,107,0.2)",
  },
  number: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#C6A96B",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
  },
  text: {
    lineHeight: 1.8,
    color: "#5A534D",
  },
};
