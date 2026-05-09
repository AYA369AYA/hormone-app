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
      ? "今のあなたの身体は、長く頑張ってきた分だけ、静かな回復の時間を求めているようです。ホルモンや副腎のリズムを整えることは、単なる不調改善ではなく、美しさ・睡眠・感情の余白を取り戻すための大切なセルフケアです。"
      : total >= 10
      ? "今のあなたは、日常をこなしながらも、内側では少しずつリズムの乱れや疲労のサインが出ているかもしれません。早めに身体の声を受け取り、ホルモンバランスと感覚を整えることで、10年先の美しさと健やかさにつながります。"
      : "今のあなたは、比較的穏やかなリズムを保てている状態です。さらに深い回復力や女性らしい余白を育てるために、睡眠・ストレス・ホルモンリズムを丁寧に見つめていくことがおすすめです。";

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
                      answers[index] === score
                        ? "#2f2923"
                        : "transparent",
                    color:
                      answers[index] === score
                        ? "#fff"
                        : "#2f2923",
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
              padding: "34px 26px",
              borderRadius: "28px",
              backgroundColor: "rgba(255,255,255,0.78)",
              lineHeight: "2",
              textAlign: "center",
              boxShadow: "0 10px 40px rgba(80,60,40,0.10)",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                letterSpacing: "2px",
                color: "#7b6a58",
                marginBottom: "22px",
              }}
            >
              YOUR HORMONE INSIGHT
            </p>

            <div
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                margin: "0 auto 28px",
                background:
                  total >= 18
                    ? "conic-gradient(#8f7761 0% 70%, #d8c9b7 70% 100%)"
                    : total >= 10
                    ? "conic-gradient(#b79b84 0% 50%, #e7ddd1 50% 100%)"
                    : "conic-gradient(#cbb59f 0% 30%, #f1ebe4 30% 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px rgba(80,60,40,0.12)",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#fffaf5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    letterSpacing: "2px",
                    color: "#8a7865",
                  }}
                >
                  BALANCE
                </span>

                <span
                  style={{
                    fontSize: "34px",
                    color: "#2f2923",
                  }}
                >
                  {Math.min(100, 100 - total * 3)}%
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: "16px",
                color: "#4c4138",
                marginBottom: "22px",
              }}
            >
              {resultText}
            </p>

            <div
              style={{
                marginTop: "30px",
                padding: "22px",
                borderRadius: "20px",
                backgroundColor: "rgba(247,243,236,0.9)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  letterSpacing: "2px",
                  color: "#8a7865",
                  marginBottom: "10px",
                }}
              >
                RECOMMENDED EXPERIENCE
              </p>

              <p
                style={{
                  color: "#5a4d43",
                  fontSize: "15px",
                  lineHeight: "2",
                }}
              >
                Hormone rhythm support /
                adrenal recovery /
                sensory relaxation /
                restorative sleep /
                feminine vitality care
              </p>
            </div>
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

  
