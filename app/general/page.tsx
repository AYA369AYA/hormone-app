"use client";

import { useState } from "react";

export default function GeneralPage() {
  const questions = [
    "朝、すっきり目覚めにくい",
    "夕方になると急にエネルギーが切れる",
    "気づくと寝落ちしている",
    "イライラや焦りが当たり前になっている",
    "以前より“ときめき”や余白を感じにくい",
  ];

  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(0)
  );
  const [showResult, setShowResult] = useState(false);

  const total = answers.reduce((sum, value) => sum + value, 0);

  const resultText =
    total >= 18
      ? "今のあなたの身体は、長く頑張ってきた分だけ、深い回復を求めているサインが見えます。身体を整えることは、不調を我慢することではなく、睡眠・感情・美しさの余白を取り戻していくことです。"
      : total >= 10
      ? "今のあなたは、日常を頑張れている一方で、内側では少しずつリズムの乱れや疲労のサインが出ているかもしれません。早めに身体の声を受け取ることが、10年先の健やかさと美しさにつながります。"
      : "今のあなたは、比較的穏やかなリズムを保てている状態です。さらに深い回復力や女性らしい余白を育てるために、睡眠・ストレス・ホルモンリズムを丁寧に見つめていくことがおすすめです。";

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
            lineHeight: "1.25",
            marginBottom: "24px",
            fontWeight: 400,
          }}
        >
          今の身体のリズムを
          <br />
          静かに見つめる時間
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
          はじめる
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
          いまのリズムチェック
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
                    color: answers[index] === score ? "#fff" : "#2f2923",
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
              YOUR RHYTHM INSIGHT
            </p>

            <p
              style={{
                fontSize: "16px",
                color: "#4c4138",
                marginBottom: "22px",
              }}
            >
              {resultText}
            </p>
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
          このページは、書籍と連動したホルモンウェルネス体験の入口です。
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
          トップへ戻る
        </a>
      </section>
    </main>
  );
}
