import type { CSSProperties } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function BodyIntroTeaser() {
  return (
    <ScrollReveal style={styles.section}>
      <h2 style={styles.heading}>身体では今、何が起こっているのでしょうか？</h2>
      <p style={styles.lead}>ここから、実際の検査データとともに見ていきましょう。</p>
    </ScrollReveal>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 56,
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 8,
  },
  lead: {
    fontSize: 14,
    color: "#A08F7E",
  },
};
