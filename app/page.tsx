import { normalizeSource } from "@/lib/source";
import { AnalyticsEvent } from "./components/AnalyticsEvent";
import { GuidedExperienceCta } from "./components/GuidedExperienceCta";
import { StressRecoveryGauges } from "./components/StressRecoveryGauges";

const questions = [
  "朝起きても、すっきりした感じが少ない",
  "午前中、頭がぼんやりすることがある",
  "夕方になるとパワーダウンを感じる",
  "休んでも回復した感じが少ない",
  "寝ても疲れが残ることがある",
  "甘いものやコーヒーに頼りたくなる",
  "食後に眠気やだるさを感じることがある",
  "体に力が入りやすい",
  "あごや歯を食いしばっていることがある",
  "ストレスが長く体に残る感じがある",
  "生理前に気分や体調が不安定になる",
  "むくみやお腹の張りを感じることがある",
  "夜遅い方が元気になる感覚がある",
  "休むことに違和感や罪悪感を感じることがある",
  "頑張っていないと価値がないように感じることがある",
];

const labels = [
  { text: "ほとんどない", value: 0 },
  { text: "少しある", value: 1 },
  { text: "ときどきある", value: 2 },
  { text: "よくある", value: 3 },
];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const submitted = params.submitted === "true";
  const started = params.started === "true";
  const source = normalizeSource(params.source);

  const answers = questions.map((_, i) => Number(params[`q${i}`] ?? 0));
  const score = answers.reduce((sum, v) => sum + v, 0);

  const deepScore = (answers[13] + answers[14]) / 2;
  const hasDeepPattern = deepScore >= 2;

  let result = {
    label: "🟢 バランスが保たれている",
    title: "今のあなたは、回復と活動のバランスが保たれています。",
    summary: "現在の回答からは、身体が自然なリズムで働いている状態が見えています。",
    body: `この良い状態を保つためにも、小さな変化に気づくことが未来の健康につながります。`,
    cta: "今の心地よさを、さらに大切にしたい方へ",
  };

  if (score >= 15 && score < 30) {
    result = {
      label: "🟡 エネルギーが揺らいでいる",
      title: "今のあなたは、身体が頑張ってバランスを保っています。",
      summary: "朝の重さや、夕方の眠気・身体のだるさは、身体からの小さなサインです。",
      body: `今のうちに身体の現在地を知ることが、未来の不調を防ぐ第一歩になります。`,
      cta: "この違和感の理由を、もう少し知りたい方へ",
    };
  }

  if (score >= 30) {
    result = {
      label: "🔴 エネルギーが消耗している",
      title: "今のあなたは、身体が回復を必要としています。",
      summary: "疲れが抜けない、朝起きづらい、休んでも回復した感じがしない。",
      body: `そのような変化は、身体が回復よりも日常を乗り切ることを優先しているサインです。

まずは、身体の現在地を知ることから始めましょう。`,
      cta: "一度しっかり、身体を満たす方向へ向きたい方へ",
    };
  }

  if (submitted) {
    return (
      <main style={styles.heroMain}>
        <div style={styles.card}>
          <AnalyticsEvent
            name="self_check_complete"
            params={{ source, score, result_type: result.label }}
          />

          <p style={styles.type}>{result.label}</p>
          <h1 style={styles.title}>{result.title}</h1>

          <div style={styles.summaryBox}>{result.summary}</div>

          <p style={styles.body}>{result.body}</p>

          <div style={styles.noteBox}>
            <p>
              この結果は、良い・悪いを判断するものではありません。
            </p>
            <p>
              あなたの身体の現在地を知る、
              <br />
              最初の一歩です。
            </p>
            <p>
              身体を知ることは、自分を知ること。
            </p>
          </div>

          <p style={styles.firstStepNote}>
            あなたの身体の現在地を知る、
            <br />
            最初の一歩です。
            <br />
            <br />
            身体を知ることは、
            <br />
            自分を知ることにもつながっていきます。
          </p>
          <StressRecoveryGauges score={score} deepScore={deepScore} />

          <div style={styles.deep}>
            {hasDeepPattern ? (
              <>
                <p>
                  休むことに違和感があったり、頑張っている方が安心する。
                  そんな感覚があるとき、身体は無意識にがんばり続けています。
                </p>
                <p>
                  それは意志の弱さではなく、これまでの経験の中で身についた身体の反応です。
                </p>
                <p>
                  気づくことが、本来のリズムに戻る一歩になります。
                </p>
              </>
            ) : (
              <>
                <p>
                  今は、無意識にがんばり続けるような傾向は強く見られていません。
                </p>
                <p>
                  自然に力を抜ける感覚は、回復しやすい身体の土台になります。
                </p>
              </>
            )}
          </div>

          <p style={styles.limitNote}>
            実際のホルモン量そのものは、この結果だけでは分かりません。
          </p>

          <div style={styles.cta}>
            <p>{result.cta}</p>
          </div>

          <p style={styles.pivotNote}>セルフテストで現在地を確認しました。</p>

          <GuidedExperienceCta source={source} />
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <main style={styles.heroMain}>
        <div style={styles.card}>
          <AnalyticsEvent name="landing_view" params={{ source }} />

          <p style={styles.kicker}>あなた自身のための時間。</p>

          <h1 style={styles.header}>
            今の身体を知る
            <br />
            ところから。
          </h1>

          <p style={styles.intro}>
            今の不調を、症状だけで終わらせない。
            <br />
            約1分で、あなたのホルモンとストレスの
            <br />
            現在地をチェック。
          </p>

          <a
            href={`/?started=true&source=${source}`}
            style={styles.button}
          >
            セルフテストを始める
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <AnalyticsEvent name="self_check_start" params={{ source }} />

        <h1 style={styles.header}>ホルモンバランスチェック</h1>

        <form method="get" action="/">
          <input type="hidden" name="submitted" value="true" />
          <input type="hidden" name="source" value={source} />

          {questions.map((q, i) => (
            <div key={i} style={styles.qCard}>
              <p style={styles.question}>Q{i + 1}. {q}</p>

              {labels.map((l) => (
                <label key={l.value} style={styles.option}>
                  <input
                    type="radio"
                    name={`q${i}`}
                    value={l.value}
                    defaultChecked={l.value === 0}
                  />
                  {l.text}
                </label>
              ))}
            </div>
          ))}

          <button type="submit" style={styles.button}>
            結果を見る
          </button>
        </form>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    padding: "32px 18px",
    background: "linear-gradient(180deg,#F7F3EE,#EFE7DC)",
    fontFamily: "serif",
  },
  // Landing/hero screen only — recreates the Lovable landing page's hero
  // background (ivory base + soft gold radial glow) using the same color
  // tokens (--ivory, --ivory-deep, --gold-soft) from luxe-hormones.lovable.app.
  // The question form and results screens keep the original `main` background.
  heroMain: {
    minHeight: "100vh",
    padding: "32px 18px",
    background:
      "radial-gradient(circle at 50% 30%, oklch(88% .05 85) 0%, transparent 65%), " +
      "linear-gradient(180deg, oklch(98.5% .008 85), oklch(95.5% .014 85))",
    fontFamily: "serif",
  },
  card: {
    maxWidth: 640,
    margin: "0 auto",
    background: "rgba(255,255,255,0.92)",
    padding: 28,
    borderRadius: 24,
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: "0.14em",
    color: "#A08F7E",
    marginBottom: 10,
  },
  intro: {
    marginBottom: 20,
    lineHeight: 1.8,
    color: "#6A625B",
  },
  header: {
    marginBottom: 24,
    fontSize: 22,
  },
  qCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    background: "#FCFAF7",
    border: "1px solid rgba(198,169,107,0.2)",
  },
  question: {
    marginBottom: 8,
    lineHeight: 1.7,
  },
  option: {
    display: "block",
    marginBottom: 6,
    padding: "6px 0",
  },
  button: {
    display: "block",
    textAlign: "center",
    marginTop: 24,
    padding: 16,
    width: "100%",
    borderRadius: 999,
    border: "1px solid #C6A96B",
    background: "#fff",
    color: "#2C2A28",
    textDecoration: "none",
    boxSizing: "border-box",
  },
  type: {
    color: "#A08F7E",
    letterSpacing: "0.08em",
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    lineHeight: 1.6,
    marginBottom: 16,
  },
  summaryBox: {
    marginTop: 16,
    marginBottom: 18,
    padding: 16,
    borderRadius: 16,
    background: "#F5EFE6",
    lineHeight: 1.8,
  },
  body: {
    whiteSpace: "pre-line",
    lineHeight: 1.9,
    color: "#5A534D",
  },
  noteBox: {
    marginTop: 16,
    padding: 16,
    background: "#FCFAF7",
    borderRadius: 14,
    lineHeight: 1.8,
    color: "#5A534D",
    border: "1px solid rgba(198,169,107,0.18)",
  },
  graphBox: {
    marginTop: 24,
    padding: 18,
    borderRadius: 18,
    background: "#FCFAF7",
    border: "1px solid rgba(198,169,107,0.22)",
  },
  graphTitle: {
    marginBottom: 12,
    color: "#A08F7E",
  },
  deep: {
    marginTop: 16,
    padding: 16,
    background: "#F5EFE6",
    borderRadius: 12,
    lineHeight: 1.8,
  },
  cta: {
    marginTop: 16,
    padding: 16,
    background: "#EFE4D4",
    borderRadius: 12,
    lineHeight: 1.8,
  },
  limitNote: {
    marginTop: 16,
    lineHeight: 1.8,
    fontSize: 13,
    color: "#A08F7E",
  },
  firstStepNote: {
    marginTop: 20,
    padding: "18px 4px",
    lineHeight: 1.9,
    fontSize: 15,
    color: "#5A534D",
    textAlign: "center",
  },
  pivotNote: {
    marginTop: 20,
    marginBottom: 4,
    fontSize: 13,
    letterSpacing: "0.04em",
    color: "#A08F7E",
    textAlign: "center",
  },
};
