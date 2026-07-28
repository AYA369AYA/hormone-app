import type { CSSProperties } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function VisionSection() {
  return (
    <ScrollReveal style={styles.section}>
      <h2 style={styles.heading}>私が目指している未来</h2>

      <p style={styles.lead}>
        私は、女性が仕事か家庭かを選ぶ人生ではなく、
      </p>

      <p style={styles.list}>
        仕事も。
        <br />
        家庭も。
        <br />
        子どもとの時間も。
        <br />
        自分だけの時間も。
        <br />
        健康も。
        <br />
        夢も。
      </p>

      <p style={styles.lead}>
        どれかを犠牲にするのではなく、
        <br />
        すべてを豊かに選択できる人生を歩んでほしいと願っています。
      </p>

      <p style={styles.lead}>
        子どもたちにも、「我慢して生きる姿」ではなく、
        <br />
        自分の心と身体を大切にしながら、自分の夢を叶えていく姿
        <br />
        を見せられる女性を増やしたい。
      </p>

      <p style={styles.lead}>
        私は、健康美を人生の土台として、
        <br />
        世界中に自立した女性を増やしていくことを使命としています。
      </p>

      <p style={styles.closing}>Hormone Journeyは、その第一歩です。</p>
    </ScrollReveal>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 64,
    padding: "40px 8px",
    textAlign: "center",
  },
  heading: {
    fontSize: 22,
    lineHeight: 1.7,
    color: "#2C2A28",
    marginBottom: 32,
  },
  lead: {
    fontSize: 16,
    lineHeight: 2,
    color: "#5A534D",
    marginBottom: 28,
  },
  list: {
    fontSize: 19,
    lineHeight: 2.1,
    color: "#2C2A28",
    fontWeight: 600,
    marginBottom: 28,
  },
  closing: {
    marginTop: 36,
    fontSize: 18,
    lineHeight: 1.8,
    color: "#2C2A28",
    fontWeight: 600,
  },
};
