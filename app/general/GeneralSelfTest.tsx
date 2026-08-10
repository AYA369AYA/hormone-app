"use client";

import { useState } from "react";
import { Parisienne } from "next/font/google";
import type { Source } from "@/lib/source";
import { INSTAGRAM_LIVES } from "@/lib/instagram";
import { BodyCgJourney } from "../components/BodyCgJourney";
import { SampleTestResult } from "../components/SampleTestResult";
import { SalivaTestTestimonialSection } from "../components/SalivaTestTestimonialSection";
import { GeneralGuidedExperienceCta } from "./GeneralGuidedExperienceCta";
import { GeneralSalivaTestChoiceCta } from "./GeneralSalivaTestChoiceCta";
import { GeneralStressRecoveryGauges } from "./GeneralStressRecoveryGauges";

const scriptFont = Parisienne({ weight: "400", subsets: ["latin"] });

const sansJp =
  '"Hiragino Kaku Gothic Pro", "Hiragino Sans", "Yu Gothic", sans-serif';

export function GeneralSelfTest({
  source,
  testUrl,
}: {
  source: Source;
  testUrl?: string;
}) {
  const questions = [
    "朝、すっきり目覚めにくい",
    "ランチ後に眠くなりやすい",
    "夕方になると急にエネルギーが切れる",
    "夜、気づくと寝落ちしている",
    "夜中に目が覚める（中途覚醒）",
    "気づくと寝落ちしている",
    "イライラや焦りが当たり前になっている",
    "以前より“ときめき”や余白を感じにくい",
    "休んでいるのに疲労感が抜けにくい",
    "甘いものやカフェインを欲しやすい",
    "予定を詰め込んでいないと不安になる",
    "人に気を遣いすぎてしまう",
    "生理前に気分や体調が大きく揺れやすい",
    "冷えやむくみを感じやすい",
    "浮腫みやお腹の張りを感じ、血糖を意識した食事や運動を取り入れても、体重が変わりにくい、または増えやすくなっている。",
    "頑張れば動けるので無理を続けてしまう",
    "身体の痛みや緊張が抜けにくい",
    "落ち込みやイライラ、不安、焦りなど、感情の波を感じることが増えた",
    "眠りが浅い・不眠がある",
  ];

  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(0)
  );

  const [showResult, setShowResult] = useState(false);

  const aspirations = [
    "子どもと、笑い合う時間。",
    "罪悪感のない、自分だけの時間。",
    "朝の光とともに、自然に目覚める。",
    "お気に入りの装いを、美しくまとう。",
    "行きたい時に、旅へ出る自由。",
    "大切な人と、穏やかな時間を。",
    "年齢を重ねることが、楽しみになる。",
    "誰かの期待ではなく、本当に好きなものを選ぶ。",
    "自然のリズムに、寄り添って生きる。",
  ];

  const aspirationGradients = [
    "linear-gradient(160deg, #F3E8D6 0%, #E7D3B2 50%, #C9AE86 100%)",
    "linear-gradient(160deg, #EFE1E0 0%, #DCC3C3 50%, #B99A94 100%)",
    "linear-gradient(160deg, #E7E7DE 0%, #CFCABB 50%, #A9A48D 100%)",
    "linear-gradient(160deg, #F0E6D8 0%, #D9C4A4 50%, #AD8F66 100%)",
  ];

  // 全22枚のカードのうち、この2枚のみ実写真を使用(残りはプレースホルダーのまま)。
  // フォトライブラリが揃うまでの暫定措置。
  const aspirationPhotos: Record<number, string> = {
    2: "/images/lovable/editorial-Bx8taHTy.jpg",
    3: "/images/lovable/hero-Bj9vEP9k.jpg",
  };

  const cortisolSigns = [
    "朝すっきり起きられない",
    "朝食欲がない",
    "午前中の集中力が出にくい",
    "ランチ後に眠くなる",
    "夕方になるとパワーダウンする",
    "夜、気づくと寝落ちしている",
    "夜中に目が覚める（中途覚醒）",
    "産後、子どもの風邪がうつった後など、周囲は治っているのに自分だけ長引く",
    "もの忘れ・集中力の低下",
    "カラダの疲労感に気づきにくくなり、聞かれて初めて『そういえば疲れていた』と気づく。",
  ];

  // 未回答(初期値0)が残っていると合計に0点が混ざり、結果が実際の回答より
  // 低い(穏やかな)方向に大きくぶれてしまうため、全問回答するまで結果を見れない。
  const allAnswered = answers.every((value) => value > 0);

  const total = answers.reduce((sum, value) => sum + value, 0);

  // 質問は1〜5点×questions.length問。ストレス/回復力ゲージ用に0〜100%へ正規化する。
  // 最小値・最大値・幅を質問数から動的に算出することで、設問数が変わっても
  // 正規化が崩れないようにする。recoveryType/resultTextの閾値(total>=50等)は変更しない。
  const minPossibleTotal = questions.length;
  const maxPossibleTotal = questions.length * 5;
  const stressValue = Math.max(
    0,
    Math.min(
      100,
      ((total - minPossibleTotal) / (maxPossibleTotal - minPossibleTotal)) * 100
    )
  );
  const recoveryValue = 100 - stressValue;

  let recoveryType = "";
  let resultText = "";

  if (total >= 50) {
    recoveryType = "Stress Rhythm Recovery";

    resultText = `
今回の回答からは、一日の中でストレス負荷が高く、身体の回復が追いつきにくい傾向が見られます。これは、コルチゾールの分泌リズムが乱れている場合に見られやすいパターンです。

朝の倦怠感、午後のエネルギー低下、夜間の寝つきにくさ、甘いものやカフェインへの欲求などは、その代表的な特徴です。

こうした状態が続くと、睡眠の質、肌の状態、日中のエネルギー、感情の安定、体型、そして回復力全体に影響が及ぶことがあります。

次のセクションでは、コルチゾール低値と関連する具体的なサインをご紹介します。ご自身に当てはまるものがないか、確認してみてください。
`;
  } else if (total >= 35) {
    recoveryType = "Hormone Balance";

    resultText = `
今回の回答からは、日常生活の中で疲労や緊張が少しずつ蓄積している傾向が見られます。

これは、ホルモンバランスや自律神経が「回復モード」に入りにくくなっている場合に見られやすいパターンです。感情の波が大きくなりやすいこと、休んでも疲れが抜けにくいことなどが、その特徴として挙げられます。

こうした状態が続くと、感情の安定、睡眠の質、肌の状態、そして身体の回復力に影響が及ぶことがあります。

次のセクションでは、コルチゾール低値と関連する具体的なサインをご紹介します。ご自身に当てはまるものがないか、確認してみてください。
`;
  } else {
    recoveryType = "Rhythm Recovery";

    resultText = `
今回の回答からは、比較的落ち着いたリズムを保てている傾向が見られます。

ただし、女性の身体は、ストレス・睡眠・感情・ホルモンバランスの影響を受けやすく、その状態は日々変化します。

現在の穏やかな状態を維持し、さらに整えていくことは、睡眠の質、肌の状態、エネルギー、そして回復力の土台をより強くしていくことにつながります。

次のセクションでは、コルチゾール低値と関連する具体的なサインをご紹介します。ご自身に当てはまるものがないか、確認してみてください。
`;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage:
          "radial-gradient(ellipse 90% 50% at 50% -6%, rgba(198,169,107,0.12) 0%, transparent 60%), " +
          "linear-gradient(180deg, #F9F5EF 0%, #F7F3EE 42%, #EFE7DC 100%)",
        fontFamily: "serif",
        color: "#2f2923",
        padding: "48px 22px",
      }}
    >
      <section
        style={{
          position: "relative",
          maxWidth: "980px",
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "72px",
          paddingBottom: "56px",
          paddingLeft: "22px",
          paddingRight: "22px",
          borderRadius: "28px",
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: "url(/images/lovable/editorial-Bx8taHTy.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(249,245,239,0.94) 0%, rgba(249,245,239,0.86) 55%, rgba(249,245,239,0.72) 100%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <p
            style={{
              letterSpacing: "3px",
              fontSize: "12px",
              marginBottom: "24px",
              color: "#7b6a58",
            }}
          >
            HORMONE INTELLIGENCE
          </p>

        <h1
          className={scriptFont.className}
          style={{
            fontSize: "56px",
            lineHeight: "1.25",
            marginBottom: "22px",
            fontWeight: 400,
            color: "#6b5a42",
          }}
        >
          Discover Your Body&apos;s Rhythm
        </h1>

        <p
          style={{
            fontFamily: sansJp,
            fontWeight: 300,
            letterSpacing: "0.05em",
            fontSize: "15px",
            lineHeight: "1.9",
            color: "#5f5146",
            marginBottom: "16px",
          }}
        >
          今の身体の現在地を知ることが、回復への第一歩です。
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "2",
            color: "#5f5146",
            marginBottom: "42px",
          }}
        >
          ホルモン・ストレス・感覚の状態から、
          今のあなたに必要な回復のヒントを見つけていきます。
        </p>

        <a
          href="#questions"
          style={{
            display: "inline-block",
            padding: "15px 36px",
            borderRadius: "999px",
            backgroundColor: "#2f2923",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            letterSpacing: "1px",
          }}
        >
          チェックをはじめる
        </a>
        </div>
      </section>

      <section
        id="questions"
        style={{
          maxWidth: "720px",
          margin: "96px auto 0",
          backgroundColor: "rgba(255,255,255,0.58)",
          borderRadius: "28px",
          padding: "48px 30px",
          boxShadow: "0 20px 60px rgba(80,60,40,0.12)",
        }}
      >
        <p
          style={{
            fontFamily: sansJp,
            fontSize: "12px",
            letterSpacing: "0.2em",
            color: "#A08F7E",
            textAlign: "center",
            marginBottom: "18px",
          }}
        >
          SELF-CHECK
        </p>

        <h2
          style={{
            fontSize: "26px",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          今のリズムチェック
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#7b6a58",
            fontSize: "14px",
            marginBottom: "56px",
            letterSpacing: "1px",
            lineHeight: "2",
          }}
        >
          まずはゆっくり息を吐いて、
          <br />
          今の身体感覚に意識を向けてみてください。
        </p>

        {questions.map((question, index) => (
          <div
            key={index}
            style={{
              marginBottom: "40px",
              paddingBottom: "32px",
              borderBottom:
                index === questions.length - 1
                  ? "none"
                  : "1px solid rgba(198,169,107,0.18)",
            }}
          >
            <p
              style={{
                fontFamily: sansJp,
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "#C6A96B",
                marginBottom: "10px",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </p>
            <p style={{ marginBottom: "20px", lineHeight: "1.9", fontSize: "16px" }}>
              {question}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => {
                    const next = [...answers];
                    next[index] = score;
                    setAnswers(next);
                  }}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border:
                      answers[index] === score
                        ? "1px solid #C6A96B"
                        : "1px solid rgba(138,120,101,0.4)",
                    backgroundImage:
                      answers[index] === score
                        ? "linear-gradient(165deg, #D3B87E 0%, #C6A96B 100%)"
                        : "none",
                    backgroundColor:
                      answers[index] === score ? "transparent" : "transparent",
                    color: answers[index] === score ? "#fff" : "#8a7865",
                    fontFamily: "serif",
                    fontWeight: answers[index] === score ? 600 : 400,
                    cursor: "pointer",
                    transition: "border-color 0.2s ease, background-image 0.2s ease",
                  }}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => setShowResult(true)}
            disabled={!allAnswered}
            style={{
              padding: "14px 34px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: allAnswered ? "#2f2923" : "#c9bfb2",
              color: "#fff",
              fontFamily: "serif",
              fontSize: "14px",
              letterSpacing: "1px",
              cursor: allAnswered ? "pointer" : "not-allowed",
            }}
          >
            結果を見る
          </button>
          {!allAnswered && (
            <p
              style={{
                marginTop: "12px",
                fontSize: "12px",
                color: "#8a7865",
                letterSpacing: "0.5px",
              }}
            >
              すべての質問にお答えください
            </p>
          )}
        </div>

        {showResult && (
          <div
            style={{
              marginTop: "56px",
              padding: "44px 30px",
              borderRadius: "28px",
              backgroundColor: "rgba(255,255,255,0.78)",
              lineHeight: "2",
              boxShadow: "0 10px 40px rgba(80,60,40,0.10)",
            }}
          >
            <p
              style={{
                fontFamily: sansJp,
                fontSize: "12px",
                letterSpacing: "0.2em",
                color: "#A08F7E",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              YOUR RESULT
            </p>
            <p
              className={scriptFont.className}
              style={{
                fontSize: "32px",
                lineHeight: "1.3",
                fontWeight: 400,
                color: "#6b5a42",
                textAlign: "center",
                marginBottom: "28px",
              }}
            >
              {recoveryType}
            </p>
            <p
              style={{
                whiteSpace: "pre-line",
                color: "#4c4138",
                lineHeight: "2.2",
                fontSize: "15px",
              }}
            >
              {resultText}
            </p>
          </div>
        )}
      </section>

      {showResult && (
        <section
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            marginTop: 96,
            fontFamily: "sans-serif",
          }}
        >
          <GeneralStressRecoveryGauges
            stress={stressValue}
            recovery={recoveryValue}
            disclaimer="※このセルフチェックは、現在のストレス負荷と回復力の傾向を推定するものです。実際のホルモンバランス（プロゲステロン、エストロゲン、コルチゾール、DHEA-Sなど）は、唾液ホルモン検査で確認できます。"
          />

          <div
            style={{
              marginTop: 96,
              padding: "0 6px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: sansJp,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#A08F7E",
                marginBottom: 20,
              }}
            >
              CORTISOL
            </p>

            <h2
              style={{
                fontFamily: "serif",
                fontSize: 24,
                lineHeight: 1.6,
                fontWeight: 400,
                color: "#2f2923",
                marginBottom: 40,
              }}
            >
              <span style={{ fontWeight: 600 }}>コルチゾール低値</span>の参考サイン
            </h2>

            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.9,
                letterSpacing: "0.02em",
                color: "#5A534D",
                maxWidth: 460,
                margin: "0 auto 40px",
              }}
            >
              生理周期や体重、エネルギーや心身のコンディションにも関わる<span style={{ fontWeight: 600 }}>コルチゾール</span>。低値傾向の時に現れやすい身体からのサインを確認してみましょう。
            </p>

            <div
              style={{
                maxWidth: 480,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "left",
                padding: "28px 24px",
                borderRadius: 18,
                border: "1px solid rgba(198,169,107,0.25)",
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            >
              {cortisolSigns.map((item, index) => (
                <p
                  key={item}
                  style={{
                    fontFamily: sansJp,
                    fontWeight: 300,
                    fontSize: 15,
                    lineHeight: 1.8,
                    letterSpacing: "0.01em",
                    color: "#3d362f",
                    marginTop: index === 0 ? 0 : 16,
                  }}
                >
                  <span style={{ color: "#C6A96B", marginRight: 8 }}>✦</span>
                  {item}
                </p>
              ))}
            </div>

            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 2,
                letterSpacing: "0.02em",
                color: "#5A534D",
                maxWidth: 460,
                margin: "40px auto 0",
              }}
            >
              当てはまる項目が多い方ほど、
              <br />
              <span style={{ fontWeight: 600 }}>ホルモンバランス</span>を整えることで、
              <br />
              美容・睡眠・メンタル・免疫の質が向上します。
            </p>

            <div
              style={{
                marginTop: 40,
                padding: "22px 24px",
                borderRadius: 16,
                border: "2px solid rgba(198,169,107,0.3)",
                backgroundColor: "rgba(255,255,255,0.35)",
                maxWidth: 460,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <p
                style={{
                  fontFamily: sansJp,
                  fontWeight: 300,
                  fontSize: 13,
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  color: "#5A534D",
                }}
              >
                合成ホルモン（ピル・ミレーナ・デュファストン・ルトラール・不妊治療・更年期治療など）の使用歴がある方は、現在のホルモン状態を確認することをおすすめします。
              </p>

              {INSTAGRAM_LIVES["synthetic-hormones"]?.url && (
                <a
                  href={INSTAGRAM_LIVES["synthetic-hormones"].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 12,
                    fontFamily: sansJp,
                    fontWeight: 300,
                    fontSize: 12,
                    letterSpacing: "0.03em",
                    color: "#8A7857",
                    textDecoration: "underline",
                  }}
                >
                  詳しくはこちら →
                </a>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: 96,
              padding: "0 6px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.9,
                letterSpacing: "0.02em",
                color: "#5A534D",
                maxWidth: 440,
                margin: "0 auto 32px",
              }}
            >
              <span style={{ fontWeight: 600 }}>コルチゾール低値</span>の参考サインを今チェックしておくことは、将来の身体の変化に備える第一歩になります。更年期前後の変化は、すべての方に同じように起こるわけではありません。今の身体の状態を知り、早めにケアを始めることで、これからの健康と美しさを守るための準備につながります。
            </p>

            <p
              style={{
                fontFamily: sansJp,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#A08F7E",
                marginBottom: 20,
              }}
            >
              PERIMENOPAUSE
            </p>

            <h2
              style={{
                fontFamily: "serif",
                fontSize: 24,
                lineHeight: 1.6,
                fontWeight: 400,
                color: "#2f2923",
                marginBottom: 14,
              }}
            >
              更年期前後の変化
            </h2>

            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                aspectRatio: "3 / 2",
                maxWidth: 460,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 32,
                backgroundImage: "url(/images/perimenopause-portrait.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 13,
                lineHeight: 1.9,
                letterSpacing: "0.02em",
                color: "#8a7865",
                marginBottom: 16,
              }}
            >
              <span style={{ fontWeight: 600 }}>プロゲステロンの減少</span>や<span style={{ fontWeight: 600 }}>コルチゾール低値</span>を確認することで、今の身体に必要なケアを早めに取り入れ、未来の変化に備えることができます。
            </p>

            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 13,
                lineHeight: 1.9,
                letterSpacing: "0.02em",
                color: "#8a7865",
                marginBottom: 40,
              }}
            >
              更年期前後の様々な変化には、<span style={{ fontWeight: 600 }}>プロゲステロンの減少</span>の変化に加え、<span style={{ fontWeight: 600 }}>コルチゾール低値</span>の状態も深く関わっています。
            </p>

            <div
              style={{
                maxWidth: 480,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "left",
                padding: "28px 24px",
                borderRadius: 18,
                border: "1px solid rgba(198,169,107,0.25)",
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            >
              {[
                "ホットフラッシュ（ほてり・急な発汗）",
                "めまい",
                "頭痛",
                "イライラや落ち込みなど感情の波",
                "睡眠の変化",
                "デリケートゾーンや目の潤いの変化",
                "疲れが抜けにくい、慢性的な疲労感",
              ].map((item, index) => (
                <p
                  key={item}
                  style={{
                    fontFamily: sansJp,
                    fontWeight: 300,
                    fontSize: 15,
                    lineHeight: 1.8,
                    letterSpacing: "0.01em",
                    color: "#3d362f",
                    marginTop: index === 0 ? 0 : 16,
                  }}
                >
                  <span style={{ color: "#C6A96B", marginRight: 8 }}>✦</span>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: 96,
              padding: "0 6px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.9,
                letterSpacing: "0.02em",
                color: "#5A534D",
                maxWidth: 440,
                margin: "0 auto 32px",
              }}
            >
              <span style={{ fontWeight: 600 }}>唾液ホルモン検査</span>では、コルチゾールの日内リズムや女性ホルモンのバランスを確認し、<span style={{ fontWeight: 600 }}>今の身体の状態を知ることができます</span>。
              <br />
              血液検査では確認できない、<span style={{ fontWeight: 600 }}>リアルタイムの数値</span>で、<span style={{ fontWeight: 600 }}>カラダからのメッセージ</span>そのものです。
            </p>

            <p
              style={{
                fontFamily: sansJp,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#A08F7E",
                marginBottom: 24,
              }}
            >
              この検査で分かること
            </p>

            <div
              style={{
                textAlign: "left",
                maxWidth: 380,
                margin: "0 auto 64px",
              }}
            >
              {[
                "一日のコルチゾールリズム",
                "ホルモンバランス",
                "ストレスからの回復力",
                "美容・睡眠・メンタル・免疫、そして女性特有の不調や将来的な疾患リスクにも関わるホルモン環境",
              ].map((item, index) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginTop: index === 0 ? 0 : 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      lineHeight: 1,
                      color: "rgba(198,169,107,0.7)",
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </span>
                  <span
                    style={{
                      fontFamily: sansJp,
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: 1.7,
                      letterSpacing: "0.02em",
                      color: "#3d362f",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p
              className={scriptFont.className}
              style={{
                fontSize: 40,
                lineHeight: 1.3,
                fontWeight: 400,
                color: "#6b5a42",
                marginBottom: 16,
              }}
            >
              Beauty Intelligence
            </p>

            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.9,
                letterSpacing: "0.02em",
                color: "#5A534D",
                maxWidth: 440,
                margin: "0 auto 24px",
              }}
            >
              小さなサインに気づいた時が、未来の美しさを育てる第一歩になります。
            </p>

            <div
              style={{
                marginTop: 40,
                maxWidth: 480,
                marginLeft: "auto",
                marginRight: "auto",
                padding: "28px 24px",
                borderRadius: 18,
                border: "1px solid rgba(198,169,107,0.25)",
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            >
            <div style={{ maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
              <p
                style={{
                  fontFamily: sansJp,
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  color: "#C6A96B",
                  marginBottom: 20,
                }}
              >
                CORTISOL × BEAUTY
              </p>
              <div
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  aspectRatio: "3 / 2",
                  backgroundImage: "url(/images/lovable/editorial-Bx8taHTy.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: 24,
                }}
              />
              <p
                style={{
                  fontFamily: sansJp,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 2,
                  letterSpacing: "0.02em",
                  color: "#5A534D",
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: 600 }}>コルチゾール</span>は、身体の回復リズムを支え、美肌の土台を整える大切なホルモンです。
                <br />
                <br />
                睡眠の質や日々の回復力、ストレスから身体を整える力は、肌の透明感や健やかな美しさにも深く関わっています。
                <br />
                <br />
                内側のコンディションを整えることが、未来の美肌を育てる土台になります。
              </p>
            </div>

            <div style={{ marginTop: 56, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
              <p
                style={{
                  fontFamily: sansJp,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  color: "#5A534D",
                  marginBottom: 24,
                }}
              >
                <span style={{ fontWeight: 600 }}>コルチゾール</span>と同じように、<span style={{ fontWeight: 600 }}>プロゲステロン</span>も美しさを支える大切なホルモンです。
              </p>
              <p
                style={{
                  fontFamily: sansJp,
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  color: "#C6A96B",
                  marginBottom: 20,
                }}
              >
                PROGESTERONE × BEAUTY
              </p>
              <div
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  aspectRatio: "3 / 2",
                  backgroundImage: "url(/images/lovable/hero-Bj9vEP9k.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: 24,
                }}
              />
              <p
                style={{
                  fontFamily: sansJp,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 2,
                  letterSpacing: "0.02em",
                  color: "#5A534D",
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: 600 }}>プロゲステロン</span>は、うるおいとハリのある肌を支える美容に重要なホルモンです。
                <br />
                <br />
                肌の水分保持やコラーゲンを支える働きに関わり、しっとりとした弾力のある美肌づくりの土台になります。
                <br />
                <br />
                さらに、睡眠や心身の安定にも関わるため、内側から整った美しさを育てるために大切なホルモンです。
                <br />
                <br />
                PMSの揺らぎや年齢によるホルモン変化を感じる前から、自分の<span style={{ fontWeight: 600 }}>プロゲステロン</span>状態を知ることが、未来の美肌づくりにつながります。
              </p>
            </div>
            </div>

            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "0.04em",
                color: "#8a7865",
                marginTop: 64,
              }}
            >
              美容を大切にし、一生美しく生きたいすべての女性へ
            </p>
          </div>

          <div
            style={{
              marginTop: 96,
              padding: "0 6px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: sansJp,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#A08F7E",
                marginBottom: 20,
              }}
            >
              A LIFELONG ASSET
            </p>

            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                aspectRatio: "3 / 2",
                maxWidth: 460,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 32,
                backgroundImage: "url(/images/lifelong-asset-portrait.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 2,
                letterSpacing: "0.02em",
                color: "#5A534D",
                maxWidth: 440,
                margin: "0 auto",
              }}
            >
              カラダは、一生を共にするかけがえのない資産。
              <br />
              <br />
              今の身体の状態を知り、未来の美しさを育てることが、これからのあなたの輝きにつながります。
            </p>
          </div>

          <div
            style={{
              marginTop: 96,
              padding: "0 6px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                maxWidth: 480,
                marginLeft: "auto",
                marginRight: "auto",
                padding: "28px 24px",
                borderRadius: 18,
                border: "1px solid rgba(198,169,107,0.25)",
                backgroundColor: "rgba(255,255,255,0.4)",
              }}
            >
              <p
                style={{
                  fontFamily: sansJp,
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: "#A08F7E",
                  marginBottom: 20,
                }}
              >
                BEFORE YOUR RESULTS
              </p>

              <h2
                style={{
                  fontFamily: "serif",
                  fontSize: 24,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  color: "#2f2923",
                  marginBottom: 40,
                }}
              >
                唾液ホルモン検査が大切な理由
              </h2>

              <p
                style={{
                  fontFamily: sansJp,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  color: "#5A534D",
                  maxWidth: 440,
                  margin: "0 auto 0",
                }}
              >
                身体の変化は、ひとつのホルモンの量だけではなく、
                <br />
                ホルモン同士のバランスや一日のリズムによって影響を受けます。
              </p>

              <p
                style={{
                  fontFamily: sansJp,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  color: "#5A534D",
                  maxWidth: 440,
                  margin: "16px auto 0",
                }}
              >
                <span style={{ fontWeight: 600 }}>コルチゾール</span>の日内リズムや、<span style={{ fontWeight: 600 }}>プロゲステロン</span>・<span style={{ fontWeight: 600 }}>エストロゲン</span>のバランスを知ることで、
                <br />
                今の身体の状態を理解する手がかりになります。
              </p>

              <p
                style={{
                  fontFamily: sansJp,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  color: "#5A534D",
                  maxWidth: 440,
                  margin: "16px auto 0",
                }}
              >
                美しく年齢を重ねていくための土台は、
                <br />
                今の身体を知ることから始まります。
              </p>

              <p
                style={{
                  fontFamily: sansJp,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.9,
                  letterSpacing: "0.02em",
                  color: "#5A534D",
                  maxWidth: 440,
                  margin: "16px auto 0",
                }}
              >
                あなたの身体の現在地を確認してみませんか。
              </p>
            </div>
          </div>

          <div style={{ marginTop: 96, textAlign: "center" }}>
            <p
              style={{
                fontFamily: sansJp,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#A08F7E",
                marginBottom: 20,
              }}
            >
              SAMPLE REPORT
            </p>
            <SampleTestResult imageSrc="/images/lovable/cortisol-daily-rhythm-report.png" simplified />
            <div style={{ marginTop: 16 }}>
              <SampleTestResult imageSrc="/images/lovable/female-hormone-report.jpg" simplified />
            </div>

            <div
              style={{
                marginTop: 12,
                padding: 14,
                borderRadius: 12,
                background: "linear-gradient(165deg, #F8F1E6 0%, #F5EFE6 100%)",
                maxWidth: 460,
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "left",
              }}
            >
              <p style={{ fontSize: 12, lineHeight: 1.8, color: "#5A534D" }}>
                数値結果をお伝えするだけでなく、日常の中でより良い状態へ向かうためのヒントや方針もお伝えします。
              </p>
              <p style={{ fontSize: 12, lineHeight: 1.8, color: "#5A534D", marginTop: 10 }}>
                セルフチェックで気になった項目があった方には、それらがなぜ起こっているのか、身体の背景やホルモンの状態まで詳しくお伝えします。
              </p>
            </div>
          </div>

          <div style={{ marginTop: 96 }}>
            <GeneralGuidedExperienceCta source={source} variant="full" />
          </div>

          <div
            style={{
              marginTop: 96,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "serif",
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.6,
                color: "#2f2923",
                marginBottom: 14,
              }}
            >
              身体を知ることは、自分を知ること。
            </h2>
            <p
              style={{
                fontFamily: sansJp,
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.9,
                color: "#5A534D",
              }}
            >
              <span style={{ fontWeight: 600 }}>ホルモンバランス</span>を整えることは、身体の深い安心感を取り戻すことです。
            </p>
          </div>

          <div style={{ marginTop: 96 }}>
            <SalivaTestTestimonialSection />
          </div>

          <div style={{ marginTop: 96 }}>
            <GeneralSalivaTestChoiceCta testUrl={testUrl} />
          </div>

          <div
            style={{
              marginTop: 96,
              padding: "0 6px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: sansJp,
                fontSize: 12,
                letterSpacing: "0.2em",
                color: "#A08F7E",
                marginBottom: 20,
              }}
            >
              A LIFE YOU TRULY WANT
            </p>

            <h2
              style={{
                fontFamily: "serif",
                fontSize: 24,
                lineHeight: 1.6,
                fontWeight: 400,
                color: "#2f2923",
                marginBottom: 48,
              }}
            >
              これからの人生で、叶えたいこと
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              {aspirations.map((item, index) => (
                <div
                  key={item}
                  style={{
                    position: "relative",
                    borderRadius: 18,
                    overflow: "hidden",
                    aspectRatio: "4 / 5",
                    backgroundImage: aspirationPhotos[index]
                      ? `url(${aspirationPhotos[index]})`
                      : aspirationGradients[index % aspirationGradients.length],
                    backgroundSize: aspirationPhotos[index] ? "cover" : undefined,
                    backgroundPosition: aspirationPhotos[index] ? "center" : undefined,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 52%, rgba(30,24,16,0.55) 100%)",
                    }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      left: 16,
                      right: 16,
                      bottom: 16,
                      textAlign: "left",
                      fontFamily: sansJp,
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: 1.6,
                      letterSpacing: "0.02em",
                      color: "#fff",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 96 }}>
            <BodyCgJourney variant="condensed" />
          </div>

          <div style={{ marginTop: 96 }}>
            <GeneralGuidedExperienceCta source={source} variant="intro" />
          </div>
        </section>
      )}
    </main>
  );
}
