import type { CSSProperties } from "react";
import type { Source } from "@/lib/source";
import { EmailSignupForm } from "./EmailSignupForm";

export function GuidedExperienceCta({ source }: { source: Source }) {
  return (
    <div style={styles.wrapper}>
      <p style={styles.kicker}>5-DAY GUIDED EXPERIENCE</p>
      <p style={styles.heading}>あなたの身体を知る、5日間。</p>
      <p style={styles.body}>
        セルフテストは、その入口にすぎません。
        <br />
        5日間、1日1本。あなたの身体が語るサインを、
        <br />
        順を追って紐解いていきます。
      </p>
      <EmailSignupForm
        source={source}
        label=""
        placeholder="メールアドレス"
        buttonLabel="無料で受け取る"
        successMessage={`ご登録ありがとうございます。

Hormone Intelligence Journeyは現在最終調整中です。
まもなく、あなたの身体を知るための5日間の動画をお届けします。

まずはセルフテストを通して、ご自身の身体のリズムを感じてみてください。`}
      />
      <p style={styles.note}>1日1本、5日間にわたってお届けします。いつでも解除できます。</p>
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
  heading: {
    fontSize: 18,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    lineHeight: 1.8,
    color: "#5A534D",
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 1.7,
    color: "#A08F7E",
  },
};
