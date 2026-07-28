import type { CSSProperties } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { CaseStudyCarousel } from "./CaseStudyCarousel";

export function CaseStudySection() {
  return (
    <ScrollReveal style={styles.section}>
      <h2 style={styles.heading}>身体が整うと、人生はその先へ動き始めます。</h2>

      <p style={styles.body}>
        Hormone Journeyで目指しているのは、単に不調を改善することではありません。
        <br />
        身体が本来の力を発揮できるようになることで、
        <br />
        女性が本当に望む人生を、自分で選択できる状態を取り戻していくことです。
      </p>

      <p style={styles.body}>
        受講生さんたちが体験されている変化は、症状の改善だけではなく、
        <br />
        その先の人生にも広がっています。
      </p>

      <CaseStudyCarousel />
    </ScrollReveal>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 56,
  },
  heading: {
    fontSize: 21,
    lineHeight: 1.7,
    color: "#2C2A28",
    marginBottom: 20,
  },
  body: {
    lineHeight: 1.9,
    color: "#5A534D",
    marginBottom: 16,
  },
};
