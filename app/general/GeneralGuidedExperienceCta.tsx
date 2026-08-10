import type { CSSProperties } from "react";
import { Parisienne } from "next/font/google";
import type { Source } from "@/lib/source";
import { GeneralEmailSignupForm } from "./GeneralEmailSignupForm";

const scriptFont = Parisienne({ weight: "400", subsets: ["latin"] });

const sansJp =
  '"Hiragino Kaku Gothic Pro", "Hiragino Sans", "Yu Gothic", sans-serif';

/** /general専用の、ラグジュアリー仕様のGuided Experience CTA。文言・ロジックは元と同一。 */
export function GeneralGuidedExperienceCta({
  source,
  variant = "full",
}: {
  source: Source;
  variant?: "intro" | "full";
}) {
  if (variant === "intro") {
    return (
      <div style={styles.introWrapper}>
        <div style={styles.introDivider} />

        <p className={scriptFont.className} style={styles.introTitle}>
          Continue Your Journey
        </p>

        <p style={styles.introSubtitle}>あなたの身体を、もっと深く知るために。</p>

        <p style={styles.introBody}>
          Hormone Intelligenceから、
          <br />
          ホルモン・美容・ライフスタイルについての限定コンテンツをお届けします。
        </p>

        <div style={styles.introFormWrap}>
          <GeneralEmailSignupForm
            source={source}
            label=""
            placeholder="メールアドレス"
            buttonLabel="Journeyをはじめる"
            successMessage={`ようこそ。

これから少しずつ、身体の内側で起きていることを、
一緒にひも解いていきます。

配信まで、もうしばらくお待ちください。`}
          />
        </div>

        <p style={styles.introNote}>1日1本、そっとお届けします。いつでも解除できます。</p>

        <div style={styles.introDivider} />
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.introDivider} />

      <p className={scriptFont.className} style={styles.introTitle}>
        5-Day Hormone Beauty Journey
      </p>

      <p style={styles.introSubtitle}>
        5日間で、あなたの身体と美しさを、
        <br />
        もっと深く知る体験を。
      </p>

      <p style={styles.introBody}>
        5日間限定のメールシリーズを無料でお届けします。
        <br />
        たとえば、こんなテーマをお届けします。
      </p>

      <div style={styles.topicList}>
        {[
          "実年齢ではなく、ホルモン年齢が美容と健康に大切な理由",
          "女性の心身がご機嫌であるために、女性ホルモンは増やさない",
          "マンモグラフィーやエコーを受ける前に知っておきたい、乳がんなど女性特有の健康リスクとホルモン環境の関係",
          "女性の疲労・冷え・浮腫み・体重変化が起こる身体の理由",
          "あなたの身体だけのホルモン状態を知る5日間",
        ].map((topic, index) => (
          <div
            key={topic}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: index === 0 ? 0 : 16,
            }}
          >
            <span style={styles.topicMarker}>✦</span>
            <span style={styles.topicText}>{topic}</span>
          </div>
        ))}
      </div>

      <div style={styles.introFormWrap}>
        <GeneralEmailSignupForm
          source={source}
          label=""
          placeholder="メールアドレス"
          buttonLabel="無料で5日間体験する"
          successMessage={`ようこそ。

これから5日間、セルフテストの結果をさらに深く読み解くための
Hormone Beauty Journeyをお届けします。

今感じている変化と、ホルモンやストレスの状態が
どのようにつながっているのかを、
少しずつ理解していただけます。

配信開始まで、もうしばらくお待ちください。

メールが届かない場合は、迷惑メールフォルダもご確認ください。
「迷惑メールではない」に設定していただくと、次回以降届きやすくなります。`}
        />
      </div>

      <p style={styles.introNote}>1日1本お届けします。いつでも解除できます。</p>

      <div style={styles.introDivider} />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 0,
    padding: "8px 12px",
    textAlign: "center",
  },
  topicList: {
    textAlign: "left",
    maxWidth: 380,
    margin: "36px auto 0",
  },
  topicMarker: {
    fontSize: 12,
    lineHeight: 1,
    color: "rgba(198,169,107,0.7)",
    flexShrink: 0,
  },
  topicText: {
    fontFamily: sansJp,
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 1.7,
    letterSpacing: "0.02em",
    color: "#3d362f",
  },
  introWrapper: {
    marginTop: 0,
    padding: "8px 12px",
    textAlign: "center",
  },
  introDivider: {
    width: 96,
    height: 1,
    margin: "0 auto 40px",
    background: "linear-gradient(90deg, transparent, #C6A96B, transparent)",
  },
  introTitle: {
    fontSize: 40,
    lineHeight: 1.3,
    fontWeight: 400,
    color: "#6b5a42",
    marginBottom: 18,
  },
  introSubtitle: {
    fontFamily: sansJp,
    fontWeight: 300,
    letterSpacing: "0.04em",
    fontSize: 15,
    lineHeight: 1.9,
    color: "#5f5146",
    marginBottom: 24,
  },
  introBody: {
    fontFamily: sansJp,
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 2,
    color: "#5A534D",
    marginBottom: 36,
  },
  introFormWrap: {
    maxWidth: 360,
    margin: "0 auto",
    textAlign: "left",
  },
  introNote: {
    marginTop: 20,
    marginBottom: 40,
    fontFamily: sansJp,
    fontWeight: 300,
    fontSize: 12,
    lineHeight: 1.8,
    color: "#A08F7E",
    textAlign: "center",
  },
};
