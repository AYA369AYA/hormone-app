import type { CSSProperties } from "react";
import type { Source } from "@/lib/source";
import { EmailSignupForm } from "./EmailSignupForm";

export function GuidedExperienceCta({ source }: { source: Source }) {
  return (
    <div style={styles.wrapper}>
      <p style={styles.kicker}>① 5-DAY GUIDED EXPERIENCE</p>
      <p style={styles.mainHeading}>Hormone Intelligence Journey</p>
      <p style={styles.subtitle}>身体の現在地を深く知る、5日間の無料解説動画</p>
      <p style={styles.body}>
        今の不調を、症状だけで終わらせないために。
        <br />
        女性の身体とホルモンのつながりを、わかりやすく読み解いていきます。
      </p>
      <EmailSignupForm
        source={source}
        label=""
        placeholder="メールアドレス"
        buttonLabel="無料で解説動画を受け取る"
        successMessage={`ご登録ありがとうございます。

これから、セルフテストの結果をさらに深く読み解くための
Hormone Intelligence Journeyをお届けします。

解説動画を通して、
今感じている不調と、ホルモンやストレスの状態が
どのようにつながっているのかを、
少しずつ理解していただけます。

配信開始まで、もうしばらくお待ちください。

メールが届かない場合は、迷惑メールフォルダもご確認ください。
「迷惑メールではない」に設定していただくと、次回以降届きやすくなります。`}
      />
      <p style={styles.note}>1日1本お届けします。いつでも解除できます。</p>
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
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 1.7,
    color: "#A08F7E",
  },
};
