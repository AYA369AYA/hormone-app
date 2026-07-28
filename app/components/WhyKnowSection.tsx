import type { CSSProperties } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function WhyKnowSection() {
  return (
    <ScrollReveal style={styles.section}>
      <p style={styles.eyebrow}>Hormone Intelligence</p>
      <h2 style={styles.heading}>なぜ、今ホルモンバランスを知ることが大切なのでしょうか？</h2>

      {/*
        TODO(AYA先生確認): この定義文はClaudeによる暫定的な言い回しです。
        「Hormone Intelligence」はAYA先生ご自身の考案された概念・メソッドのため、
        正式な定義・言葉づかいに置き換えてください。
      */}
      <p style={styles.body}>
        Hormone Intelligenceとは、身体が発しているホルモンのサインを正しく受け取り、
        <br />
        今の自分の状態を知るための知性です。
      </p>

      <p style={styles.body}>
        ホルモンバランスは、乳房の健康、代謝、心血管の健康、脳の健康など、
        <br />
        女性の全身の健康を支える重要な要素です。
      </p>

      <p style={styles.body}>
        ホルモンバランスは、年齢や体質、生活のリズムによって、一人ひとり異なります。
        <br />
        だからこそ、平均的な基準ではなく、ご自身のデータをもとに、
        <br />
        今の状態を読み解いていくことが大切です。
      </p>

      <p style={styles.body}>
        だから私は、不調が出てからではなく、未来の自分への投資として、
        <br />
        まず自分のホルモンバランスを知ることをおすすめしています。
      </p>
    </ScrollReveal>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 56,
    padding: 24,
    borderRadius: 18,
    background: "#F5EFE6",
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: "0.14em",
    color: "#A08F7E",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 20,
    lineHeight: 1.7,
    color: "#2C2A28",
    marginBottom: 16,
  },
  body: {
    lineHeight: 1.9,
    color: "#5A534D",
    marginBottom: 12,
  },
};
