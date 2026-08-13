"use client";

import { useState, useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import type { Source } from "@/lib/source";
import { SalivaTestTestimonialSection } from "../components/SalivaTestTestimonialSection";
import { GeneralGuidedExperienceCta } from "../general/GeneralGuidedExperienceCta";
import { GeneralSalivaTestChoiceCta } from "../general/GeneralSalivaTestChoiceCta";

const sansJp =
  '"Hiragino Kaku Gothic Pro", "Hiragino Sans", "Yu Gothic", sans-serif';

type HormoneCard = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

const HORMONE_CARDS: HormoneCard[] = [
  {
    id: "progesterone",
    title: "Group A｜プロゲステロン",
    description: "月経周期や心身のリズムを支えるホルモン",
    items: [
      "生理前になると、頭痛や胃痛、腹痛などの痛みが起こりやすい",
      "生理前にイライラや不安を感じやすい",
      "生理前後に眠りが浅くなる",
      "夜中に目が覚めやすい時期がある",
      "些細なことで気持ちが揺れやすい",
      "涙もろくなることがある",
      "生理前に肌のうるおいやハリが落ちやすい",
      "肌のコンディションが周期によって変わりやすい",
    ],
  },
  {
    id: "estrogen",
    title: "Group B｜エストロゲン",
    description: "身体の機能や年齢による変化に関わるホルモン",
    items: [
      "ホットフラッシュ（ほてり・急な発汗）を感じることがある",
      "めまいや頭痛を感じやすい",
      "生理周期が以前と変わってきた",
      "冷えやむくみを感じやすくなった",
      "関節や身体のこわばりを感じやすい",
      "子宮筋腫を指摘されたことがある",
      "子宮内膜症を指摘されたことがある",
    ],
  },
  {
    id: "cortisol",
    title: "Group C｜コルチゾール",
    description: "身体の回復リズムやストレス対応を支えるホルモン",
    items: [
      "休んでも疲れが抜けにくい",
      "朝すっきり起きられない",
      "夜、気づくと寝落ちしている",
      "夜中に目が覚める（中途覚醒）",
      "一度疲れると回復に時間がかかる",
      "ストレスを感じやすくなった",
      "肌の乾燥が気になる",
      "肌荒れしやすくなった",
      "顔のシミが気になるようになった",
    ],
  },
  {
    id: "testosterone",
    title: "Group D｜テストステロン",
    description: "活力・筋力・意欲など身体のエネルギーに関わるホルモン",
    items: [
      "活力や意欲の低下を感じる",
      "疲れやすく、動くのが億劫に感じる",
      "筋力の低下を感じる",
      "体力の衰えを感じやすい",
      "集中力が続きにくい",
      "物事への興味や意欲が薄れてきた",
      "肌のべたつきやニキビが増えた",
      "体毛が濃くなったと感じる",
    ],
  },
];

const RESULT_COPY: Record<string, string[]> = {
  progesterone: [
    "今回の結果からは、生理前から生理前後にかけて、プロゲステロンの働きが本来のリズムより弱まっている可能性が見えてきます。",
    "プロゲステロンは、脳が休息と回復のモードに入ることを助け、自律神経のバランスを整えるホルモンです。その働きによって、心と身体は安心感を得て、深い眠りにつき、痛みをコントロールし、感情を安定させることができます。この働きが弱まると、生理前の気分の浮き沈みや寝つきの悪さ、涙もろさ、頭痛や胃痛・腹痛などの痛みとして現れやすくなります。",
    "この変化は、身体が送っているホルモンバランスのサインです。次の『1分間のホルモンウェルネス体験』では、あなたの身体の現在地をさらに詳しく確認していきます。そのうえで、5日間のメールシリーズでは、今のあなたの身体で何が起きているのか、なぜこのようなホルモンパターンが起こるのかを知り、ご自身のホルモンバランスへの関心を深めながら、唾液ホルモン検査によって自分自身のホルモンパターンと今の状態がどのように見えてくるのかを、順を追ってお伝えしていきます。",
  ],
  estrogen: [
    "今回の結果からは、エストロゲン過多なホルモンバランスで見られるサインが多く確認されました。",
    "これは、「エストロゲンが多ければ多いほど良い」という意味ではありません。",
    "大切なのはエストロゲンの量だけではなく、プロゲステロンとのバランスです。エストロゲン過多なホルモンバランスでは、今回のようなサインが見られることがあります。",
    "ただし、エストロゲンだけを単独で見ても、身体全体の状態はわかりません。プロゲステロンとのバランス、そしてコルチゾールの1日のリズムとあわせて見ることで、今の身体の状態がより立体的に見えてきます。この変化は、身体が送っているホルモンバランスのサインです。次の『1分間のホルモンウェルネス体験』では、あなたの身体の現在地をさらに詳しく確認していきます。そのうえで、5日間のメールシリーズでは、今のあなたの身体で何が起きているのか、なぜこのようなホルモンパターンが起こるのかを知り、ご自身のホルモンバランスへの関心を深めながら、唾液ホルモン検査によって自分自身のホルモンパターンと今の状態がどのように見えてくるのかを、順を追ってお伝えしていきます。",
  ],
  cortisol: [
    "今回の結果からは、コルチゾールの1日のリズムが乱れやすくなっている可能性が見えてきます。",
    "コルチゾールは、炎症やアレルギーを抑え、免疫や血糖値のバランスを保つなど、身体が本来の働きを維持するために欠かせないホルモンです。また、朝と夜で分泌が変化する1日のリズムを持ち、このリズムが整うことで身体は本来の働きを発揮しやすくなります。",
    "このリズムが乱れると、疲れが抜けにくい、朝すっきり起きられない、夜になっても気持ちが落ち着かないなど、さまざまな変化として現れることがあります。",
    "プロゲステロンやエストロゲン、そして男性ホルモンとのバランスもあわせて見ることで、今の身体の状態がより立体的に見えてきます。",
  ],
  testosterone: [
    "今回の結果からは、テストステロンの働きが十分に発揮されにくくなっている可能性が見えてきます。",
    "男性ホルモンは、女性の身体でも筋肉や骨、皮膚の健康、意欲や性機能などを支える、女性の身体にも欠かせないホルモンです。このバランスが崩れると、疲れやすさや意欲の変化、性欲の低下、皮膚の変化など、さまざまなサインとして現れることがあります。",
    "プロゲステロンやエストロゲン、そしてコルチゾールの1日のリズムとあわせて見ることで、今の身体の状態がより立体的に見えてきます。",
  ],
};

export function HormoneCheckSelfTest({
  source,
  testUrl,
}: {
  source: Source;
  testUrl?: string;
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showResult) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResult]);

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const cardCount = (card: HormoneCard) =>
    card.items.filter((_, i) => checked[`${card.id}-${i}`]).length;

  const totalChecked = HORMONE_CARDS.reduce((sum, c) => sum + cardCount(c), 0);

  const ranked = [...HORMONE_CARDS].sort(
    (a, b) => cardCount(b) - cardCount(a)
  );
  const maxCount = ranked.length > 0 ? cardCount(ranked[0]) : 0;
  const topCards = HORMONE_CARDS.filter((c) => cardCount(c) === maxCount);

  return (
    <main style={styles.main}>
      <section style={styles.hero}>
        <p style={styles.eyebrow}>HORMONE BALANCE CHECK</p>
        <h1 style={styles.heading}>ホルモンバランスチェック</h1>
        <p style={styles.intro}>
          気になる項目に、チェックを入れてみてください。
        </p>
      </section>

      {HORMONE_CARDS.map((card) => (
        <div key={card.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>{card.title}</h2>
            <span style={styles.cardCount}>
              {cardCount(card)}/{card.items.length}
            </span>
          </div>
          <p style={styles.cardDescription}>{card.description}</p>

          {card.items.map((item, i) => {
            const key = `${card.id}-${i}`;
            return (
              <label key={key} style={styles.checkRow}>
                <input
                  type="checkbox"
                  checked={!!checked[key]}
                  onChange={() => toggle(key)}
                  style={styles.checkbox}
                />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      ))}

      <div style={styles.resultButtonWrap}>
        <button
          type="button"
          style={styles.resultButton}
          onClick={() => setShowResult(true)}
        >
          結果を見る
        </button>
      </div>

      {showResult && (
        <>
          <div ref={resultsRef} style={styles.summaryCard}>
            <p style={styles.eyebrow}>YOUR SELF-CHECK SUMMARY</p>
            <h2 style={styles.summaryHeading}>気づきのヒント</h2>
            <p style={styles.summarySubtitle}>
              チェックした項目から見える、今の身体の確認のきっかけです。
            </p>

            <div style={styles.barChart}>
              {ranked.map((card) => {
                const count = cardCount(card);
                const pct = (count / card.items.length) * 100;
                return (
                  <div key={card.id} style={styles.barRow}>
                    <span style={styles.barLabel}>{card.title}</span>
                    <div style={styles.barTrack}>
                      <div style={{ ...styles.barFill, width: `${pct}%` }} />
                    </div>
                    <span style={styles.barValue}>
                      {count}/{card.items.length}
                    </span>
                  </div>
                );
              })}
            </div>

            {totalChecked > 0 &&
              topCards.map((card) => (
                <div key={card.id} style={{ marginBottom: 24 }}>
                  {RESULT_COPY[card.id].map((paragraph, i) => (
                    <p key={i} style={styles.summaryNote}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

            <p style={styles.disclaimer}>
              ※これは自己チェックであり、医学的な診断ではありません。より詳しい状態は、唾液ホルモン検査で確認できます。
            </p>
          </div>

          <div style={{ marginTop: 96 }}>
            <GeneralGuidedExperienceCta source={source} variant="full" />
          </div>

          <div style={{ marginTop: 96 }}>
            <div style={styles.nextStepCard}>
              <p style={styles.eyebrow}>NEXT STEP</p>
              <p style={styles.nextStepBody}>
                もっと詳しく今の身体の状態を確認したい方は、無料で約1分のホルモンウェルネス体験へ。
              </p>
              <a href={`/general?source=${source}`} style={styles.nextStepButton}>
                1分間のホルモンウェルネス体験を始める
              </a>
            </div>
          </div>

          <div style={{ marginTop: 96 }}>
            <SalivaTestTestimonialSection />
          </div>

          <div style={{ marginTop: 96 }}>
            <GeneralSalivaTestChoiceCta testUrl={testUrl} />
          </div>
        </>
      )}
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  main: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #FEFDFB 0%, #F9F5EF 100%)",
    padding: "56px 20px 96px",
    fontFamily: sansJp,
    color: "#2C2A28",
  },
  hero: { textAlign: "center", maxWidth: 480, margin: "0 auto 48px" },
  eyebrow: {
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#A08F7E",
    marginBottom: 12,
  },
  heading: {
    fontFamily: "serif",
    fontSize: 28,
    fontWeight: 400,
    color: "#2f2923",
    marginBottom: 12,
  },
  intro: { fontSize: 14, lineHeight: 1.9, color: "#5A534D" },
  card: {
    maxWidth: 480,
    margin: "0 auto 24px",
    padding: "28px 24px",
    borderRadius: 18,
    border: "1px solid rgba(198,169,107,0.25)",
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 6,
  },
  cardTitle: { fontFamily: "serif", fontSize: 18, fontWeight: 400, color: "#2f2923" },
  cardCount: { fontSize: 13, color: "#A08F7E" },
  cardDescription: { fontSize: 12, color: "#8A7857", marginBottom: 18 },
  checkRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    fontSize: 14,
    lineHeight: 1.7,
    color: "#3d362f",
    marginBottom: 12,
    cursor: "pointer",
  },
  checkbox: { marginTop: 3, accentColor: "#C6A96B" },
  resultButtonWrap: { textAlign: "center", marginTop: 40 },
  resultButton: {
    padding: "16px 40px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(165deg, #D3B87E 0%, #C6A96B 100%)",
    color: "#fff",
    fontFamily: sansJp,
    fontSize: 15,
    letterSpacing: "0.04em",
    cursor: "pointer",
  },
  summaryCard: {
    maxWidth: 480,
    margin: "64px auto 0",
    padding: "32px 24px",
    borderRadius: 18,
    border: "1px solid rgba(198,169,107,0.25)",
    backgroundColor: "rgba(255,255,255,0.4)",
    textAlign: "center",
  },
  summaryHeading: { fontFamily: "serif", fontSize: 22, fontWeight: 400, color: "#2f2923", marginBottom: 8 },
  summarySubtitle: { fontSize: 13, color: "#5A534D", marginBottom: 28 },
  barChart: { textAlign: "left", marginBottom: 24 },
  barRow: { marginBottom: 16 },
  barLabel: { fontSize: 13, color: "#3d362f", display: "block", marginBottom: 4 },
  barTrack: {
    height: 10,
    borderRadius: 999,
    background: "rgba(198,169,107,0.14)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
    background: "#C6A96B",
  },
  barValue: { fontSize: 11, color: "#5A534D", marginTop: 2, display: "block" },
  summaryNote: { fontSize: 13, lineHeight: 1.9, color: "#5A534D", marginBottom: 16 },
  disclaimer: { fontSize: 11, lineHeight: 1.8, color: "#A08F7E" },
  nextStepCard: {
    maxWidth: 480,
    margin: "0 auto",
    padding: "28px 24px",
    borderRadius: 18,
    border: "1px solid rgba(198,169,107,0.25)",
    backgroundColor: "rgba(255,255,255,0.4)",
    textAlign: "center",
  },
  nextStepBody: {
    fontSize: 14,
    lineHeight: 1.9,
    color: "#3d362f",
    marginBottom: 20,
  },
  nextStepButton: {
    display: "inline-block",
    padding: "16px 40px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(165deg, #D3B87E 0%, #C6A96B 100%)",
    color: "#fff",
    fontFamily: sansJp,
    fontSize: 15,
    letterSpacing: "0.04em",
    textDecoration: "none",
  },
};
