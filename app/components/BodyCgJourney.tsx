import type { CSSProperties } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { BrainCg } from "./cg/BrainCg";
import { LiverCg } from "./cg/LiverCg";
import { InflammationCg } from "./cg/InflammationCg";
import { FemaleHormoneCg } from "./cg/FemaleHormoneCg";
import { WholeBodyCg } from "./cg/WholeBodyCg";

export function BodyCgJourney() {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>身体の中では、こんなことが起きています</h2>

      <ScrollReveal style={styles.block}>
        <p style={styles.subheading}>脳</p>
        <BrainCg />
        <p style={styles.body}>
          朝のコルチゾールは、身体を目覚めさせる大切なホルモンです。
          <br />
          朝の分泌が低い時間帯が見られる方では、集中力や判断力が落ちたように感じる方も少なくありません。
        </p>
        <div style={styles.noteBox}>
          <p>
            私はこれまで10万人以上の女性を診てきましたが、慢性的な疲労を抱えている方ほど、
            「疲れていることが普通」になっています。
          </p>
          <p>
            そのため、「そういえば最近ずっと疲れていました。」「先生に聞かれて初めて気付きました。」
            という方が本当に多くいらっしゃいます。
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal style={styles.block}>
        <p style={styles.subheading}>血糖・代謝</p>
        <LiverCg />
        <p style={styles.body}>
          身体は血糖値を保とうとして、甘いものが欲しくなったり、午後に眠気を感じやすくなることがあります。
        </p>
      </ScrollReveal>

      <ScrollReveal style={styles.block}>
        <p style={styles.subheading}>炎症・免疫</p>
        <InflammationCg />
        {/* TODO(AYA先生確認): 「臨床では」は当院の臨床所見を指す表現です。一般的な説明に留めるか、実際の所見に基づく記述に差し替えるかご判断ください。 */}
        <p style={styles.body}>
          臨床では、このような状態の方に、肌荒れやアレルギーなどの症状がみられることがあります。
        </p>
      </ScrollReveal>

      <ScrollReveal style={styles.block}>
        <p style={styles.subheading}>女性ホルモン</p>
        <FemaleHormoneCg />
        <p style={styles.body}>
          ストレスが続くと、女性ホルモンのバランスにも影響がみられることがあります。
        </p>
      </ScrollReveal>

      <ScrollReveal style={styles.block}>
        <p style={styles.subheading}>全身</p>
        <WholeBodyCg />
        <p style={styles.body}>
          だから身体は、それぞれが別々に悪くなるのではなく、全身がつながって反応しています。
        </p>
      </ScrollReveal>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 56,
  },
  heading: {
    fontSize: 20,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 24,
  },
  block: {
    marginTop: 40,
    padding: 20,
    borderRadius: 18,
    background: "#fff",
    border: "1px solid rgba(198,169,107,0.18)",
  },
  subheading: {
    fontSize: 13,
    letterSpacing: "0.1em",
    color: "#A08F7E",
    marginBottom: 12,
  },
  body: {
    marginTop: 16,
    lineHeight: 1.9,
    color: "#5A534D",
  },
  noteBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    background: "#F5EFE6",
    lineHeight: 1.8,
    color: "#5A534D",
  },
};
