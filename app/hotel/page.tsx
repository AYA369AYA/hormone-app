"use client";

import { useState } from "react";

export default function HotelPage() {
  const questions = [
    "朝、すっきり目覚めにくい",
    "夕方になると急にパワーダウンする",
    "気づくと寝落ちしている",
    "食欲や気分に波がある",
    "頑張っているのに、身体の余白を感じにくい",
  ];

  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(0)
  );

  const [showResult, setShowResult] = useState(false);

  const total = answers.reduce((sum, value) => sum + value, 0);

  const resultText =
    total >= 18
      ? "現在のあなたは、日常を頑張って動かし続けることで、交感神経やアドレナリン優位の状態が長く続いている可能性があります。朝の疲労感、夕方の急激なパワーダウン、寝落ち、感情の波などは、“気合い不足”ではなく、ホルモンや副腎リズムの静かな乱れとして現れていることがあります。\n\n特に、慢性的なストレス状態では、女性ホルモンバランスにも影響が出やすく、本来女性の身体が持っている『回復・安心・余白』の感覚が感じにくくなっていることがあります。\n\nまずは、身体をさらに頑張らせるのではなく、“回復できる身体環境”を整えていくことが大切です。"

      : total >= 10
      ? "現在のあなたは、日常生活をこなせている一方で、身体の内側では少しずつ緊張や疲労の蓄積が始まっている可能性があります。\n\n特に、女性はストレスが長く続くと、副腎や女性ホルモンリズムに影響が出やすく、『眠っても回復しにくい』『気づくと力が抜けない』『感情や食欲に波が出る』といった形で現れることがあります。\n\n今の段階は、身体が大きく崩れる前に、“本来のリズム”へ戻るための余白を作っていけるタイミングです。"

      : "現在のあなたは、比較的ホルモンやストレスリズムを保てている状態です。\n\nただ、女性の身体は『問題がない＝最高の状態』ではなく、さらに深いレベルで、安心感・睡眠の質・女性らしい感覚・内側からの美しさを育てていく余地があります。\n\n日々の忙しさの中でも、身体感覚や女性本来のリズムを丁寧に扱うことで、より静かで安定したエネルギーや美しさへ繋がっていきます。";

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f7f3ec 0%, #eee6da 55%, #d8c9b7 100%)",
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
          paddingTop: "48px",
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
          HORMONE INTELLIGENCE EXPERIENCE
        </p>

        <h1
          style={{
            fontSize: "42px",
            lineHeight: "1.25",
            marginBottom: "24px",
            fontWeight: 400,
          }}
        >
          A quiet wellness experience
          <br />
          for women’s inner rhythm.
        </h1>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "2",
            color: "#5f5146",
            marginBottom: "42px",
          }}
        >
          女性のホルモン・ストレス・感覚の状態を、
          静かに見つめ直すためのラグジュアリーウェルネス体験。
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
          Begin Experience
        </a>
      </section>

      <section
        id="questions"
        style={{
          maxWidth: "720px",
          margin: "90px auto 0",
          backgroundColor: "rgba(255,255,255,0.55)",
          borderRadius: "28px",
          padding: "34px 24px",
          boxShadow: "0 20px 60px rgba(80,60,40,0.12)",
        }}
      >
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: "28px",
          }}
        >
          Check your current rhythm
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
            View My Hormone Insight
          </button>
        </div>

        {showResult && (
          <div
            style={{
              marginTop: "34px",
              padding: "26px",
              borderRadius: "22px",
              backgroundColor: "rgba(255,255,255,0.72)",
              lineHeight: "2",
              whiteSpace: "pre-line",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                letterSpacing: "2px",
                color: "#7b6a58",
                marginBottom: "16px",
              }}
            >
              YOUR HORMONE INSIGHT
            </p>

            <p>{resultText}</p>
          </div>
        )}
      </section>

      <section
        style={{
          maxWidth: "720px",
          margin: "56px auto 0",
          textAlign: "center",
          color: "#6d5d50",
          lineHeight: "2",
          fontSize: "14px",
        }}
      >
        <p>
          This prototype is designed as a sensory entrance to hormone wellness,
          connecting medical insight, feminine recovery, and luxury hospitality.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "24px",
            color: "#2f2923",
            textDecoration: "none",
            borderBottom: "1px solid #2f2923",
          }}
        >
          Back to Home
        </a>
      </section>
    </main>
  );
}
