"use client";

import { useState } from "react";
import type { Source } from "@/lib/source";
import { GuidedExperienceCta } from "../components/GuidedExperienceCta";
import { SalivaTestChoiceCta } from "../components/SalivaTestChoiceCta";
import { StressRecoveryGauges } from "../components/StressRecoveryGauges";
import { TestimonialSection } from "../components/TestimonialSection";

export function GeneralSelfTest({
  source,
  testUrl,
}: {
  source: Source;
  testUrl?: string;
}) {
  const questions = [
    "朝、すっきり目覚めにくい",
    "夕方になると急にエネルギーが切れる",
    "気づくと寝落ちしている",
    "イライラや焦りが当たり前になっている",
    "以前より“ときめき”や余白を感じにくい",
    "休んでいるのに疲労感が抜けにくい",
    "甘いものやカフェインを欲しやすい",
    "予定を詰め込んでいないと不安になる",
    "人に気を遣いすぎてしまう",
    "生理前に気分や体調が大きく揺れやすい",
    "冷えやむくみを感じやすい",
    "考え続けてしまい、頭が休まりにくい",
    "頑張れば動けるので無理を続けてしまう",
    "身体の痛みや緊張が抜けにくい",
    "“私はこのままで大丈夫”と感じにくい",
  ];

  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(0)
  );

  const [showResult, setShowResult] = useState(false);

  const total = answers.reduce((sum, value) => sum + value, 0);

  // 質問は1〜5点×15問(15〜75)。ストレス/回復力ゲージ用に0〜100%へ正規化する。
  // 採点ロジック(total, recoveryType, resultText)自体は変更しない。
  const stressValue = Math.max(0, Math.min(100, ((total - 15) / 60) * 100));
  const recoveryValue = 100 - stressValue;

  let recoveryType = "";
  let resultText = "";

  if (total >= 50) {
    recoveryType = "Adrenaline Driven Type";

    resultText = `
今のあなたは、
“頑張ることで動けてしまう状態”
が長く続いている可能性があります。

その結果、

・朝の疲労感
・夕方のパワーダウン
・寝落ち
・イライラや不安感
・甘いものやカフェインへの依存

などが、
“当たり前”になっているかもしれません。

気づかないうちに、
「動き続けること」で安心感を保ちながら、
身体は静かな回復不足のサインを出している状態です。

ホルモンバランスやストレスリズムを整えていくことで、

・睡眠の質
・感情の安定
・エネルギーの余白
・「私はこのままで大丈夫」と感じられる感覚

は少しずつ変化していきます。

本来の回復とは、
「もっと頑張ること」ではなく、

安心して休めること、
深く呼吸できること、
そして女性としての自然なリズムを取り戻していくことなのかもしれません。
`;
  } else if (total >= 35) {
    recoveryType = "Silent Exhaustion Type";

    resultText = `
今のあなたは、
日常を頑張れている一方で、
身体の内側では少しずつ疲労や緊張が蓄積している可能性があります。

一見問題なく動けていても、

・寝ても回復しにくい
・感情の波が大きくなる
・余裕がなくなる
・人に優しくしたいのに難しい

などは、
ホルモンバランスや神経系が
“回復モード”へ入りにくくなっているサインかもしれません。

身体を整えることは、
単なる不調改善ではなく、

安心感、
女性らしい余白、
そして自然体で過ごせる感覚を
取り戻していくプロセスです。
`;
  } else {
    recoveryType = "Rhythm Recovery Type";

    resultText = `
今のあなたは、
比較的穏やかなリズムを保てている状態です。

ただ、
女性の身体は、
ストレス・睡眠・感情・ホルモンバランスの影響をとても繊細に受けています。

今ある感覚を大切にしながら、

・深く眠れること
・安心して力を抜けること
・女性としての自然なリズムを保つこと

を意識していくことで、
さらに美しさや回復力の土台が育っていきます。
`;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8f4ef 0%, #eee6dc 60%, #d8c9b7 100%)",
        fontFamily: "serif",
        color: "#2f2923",
        padding: "48px 22px",
      }}
    >
      <section
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "44px",
        }}
      >
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
          style={{
            fontSize: "40px",
            lineHeight: "1.35",
            marginBottom: "24px",
            fontWeight: 400,
          }}
        >
          今の身体感覚に
          <br />
          意識を向けてみる
        </h1>

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
      </section>

      <section
        id="questions"
        style={{
          maxWidth: "720px",
          margin: "90px auto 0",
          backgroundColor: "rgba(255,255,255,0.58)",
          borderRadius: "28px",
          padding: "34px 24px",
          boxShadow: "0 20px 60px rgba(80,60,40,0.12)",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#7b6a58",
            fontSize: "14px",
            marginBottom: "18px",
            letterSpacing: "1px",
            lineHeight: "2",
          }}
        >
          まずはゆっくり息を吐いて、
          <br />
          今の身体感覚に意識を向けてみてください。
        </p>

        <h2
          style={{
            fontSize: "26px",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          今のリズムチェック
        </h2>

        {questions.map((question, index) => (
          <div
            key={index}
            style={{
              marginBottom: "22px",
              paddingBottom: "18px",
              borderBottom: "1px solid rgba(80,60,40,0.15)",
            }}
          >
            <p style={{ marginBottom: "12px", lineHeight: "1.8" }}>
              {index + 1}. {question}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
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
                    border: "1px solid #8a7865",
                    backgroundColor:
                      answers[index] === score ? "#2f2923" : "transparent",
                    color:
                      answers[index] === score ? "#fff" : "#2f2923",
                    fontFamily: "serif",
                    cursor: "pointer",
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
            style={{
              padding: "14px 34px",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#2f2923",
              color: "#fff",
              fontFamily: "serif",
              fontSize: "14px",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            結果を見る
          </button>
        </div>

        {showResult && (
          <div
            style={{
              marginTop: "34px",
              padding: "34px 26px",
              borderRadius: "28px",
              backgroundColor: "rgba(255,255,255,0.78)",
              lineHeight: "2",
              boxShadow: "0 10px 40px rgba(80,60,40,0.10)",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                letterSpacing: "2px",
                color: "#7b6a58",
                marginBottom: "18px",
              }}
            >
              HORMONE RECOVERY SCORE
            </p>

            <div
              style={{
                textAlign: "center",
                fontSize: "64px",
                color: "#2f2923",
                marginBottom: "8px",
              }}
            >
              {Math.min(100, total * 2)}
            </div>

            <p
              style={{
                textAlign: "center",
                color: "#8a7865",
                marginBottom: "30px",
                letterSpacing: "1px",
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
            marginTop: 32,
            fontFamily: "sans-serif",
          }}
        >
          <StressRecoveryGauges stress={stressValue} recovery={recoveryValue} />

          <div
            style={{
              marginTop: 32,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                lineHeight: 1.6,
                color: "#2C2A28",
                marginBottom: 14,
              }}
            >
              身体を知ることは、自分を知ること。
            </h2>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.9,
                color: "#5A534D",
                marginBottom: 4,
              }}
            >
              人生は、身体が楽に安心することから動き出します。
              <br />
              セルフテストでは分からない身体の現在地を、
              <br />
              唾液ホルモン検査で詳しく確認してみませんか。
              <br />
              <br />
              あなたのホルモンバランスやストレスの状態を知ることが、
              <br />
              これからの身体や人生を整える第一歩になります。
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              marginTop: 20,
            }}
          >
            <div style={{ flex: "1 1 260px" }}>
              <GuidedExperienceCta source={source} />
            </div>
            <div style={{ flex: "1 1 260px" }}>
              <SalivaTestChoiceCta testUrl={testUrl} />
            </div>
          </div>

          <TestimonialSection />
        </section>
      )}
    </main>
  );
}
