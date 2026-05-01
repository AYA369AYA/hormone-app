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

function GraphBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 999,
          background: "rgba(198,169,107,0.18)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: 999,
            background: "#C6A96B",
          }}
        />
      </div>
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const submitted = params.submitted === "true";

  const answers = questions.map((_, i) => Number(params[`q${i}`] ?? 0));
  const score = answers.reduce((sum, v) => sum + v, 0);

  const deepScore = (answers[13] + answers[14]) / 2;
  const hasDeepPattern = deepScore >= 2;

  let result = {
    label: "バランス安定タイプ",
    summary: "今は、回復と消耗のバランスが比較的保たれている状態です。",
    title: "今のあなたは、自然に整う流れの中にいます",
    body: `現在のあなたは、無理なくバランスが保たれている状態にあります。

日々の中で大きな不調を感じることが少ないのは、身体のリズムが自然に整っているサインです。

ただし、この状態は「完成」ではなく、環境やストレスによって変化する繊細なバランスでもあります。

整っているときほど、小さな違和感に気づくことが、これからの余白を守ります。`,
    cta: "今の状態を保ちながら、さらに整えたい方へ",
  };

  if (score >= 15 && score < 30) {
    result = {
      label: "エネルギー揺らぎタイプ",
      summary: "日常はこなせていても、少しずつエネルギーを使い続けている状態です。",
      title: "バランスを保つために、少し頑張りすぎている状態です",
      body: `今のあなたは、日常を保つために少しエネルギーを使いながら、バランスをとっている状態です。

朝の重さや、夕方の疲れ、甘いものやカフェインへの欲求は、身体が少し無理をしているときに出やすいサインです。

この段階で気づけることが、回復に戻る自然な入口になります。

少し力を抜くことで、身体はより自然に整い始めます。`,
      cta: "今の違和感の正体を、もう少しはっきり知りたい方へ",
    };
  }

  if (score >= 30) {
    result = {
      label: "エネルギー消耗タイプ",
      summary: "頑張りや気力で日常を支え、回復より消耗が先行している状態です。",
      title: "今は、整えるよりも“満たす”ことが必要な状態です",
      body: `現在のあなたは、エネルギーが先に消耗している状態にあります。

疲れが抜けにくい、何をしても回復しにくいと感じる場合、身体は回復のサインを出しています。

この状態では、休んでいても身体がゆるみきらず、回復している感覚が得られにくくなることがあります。

今は整えるよりも、まずエネルギーを満たすことが大切な段階です。`,
      cta: "一度しっかり回復の方向に整えたい方へ",
    };
  }

  if (submitted) {
    return (
      <main style={styles.main}>
        <div style={styles.card}>
          <p style={styles.type}>{result.label}</p>
          <h1 style={styles.title}>{result.title}</h1>

          <div style={styles.summaryBox}>{result.summary}</div>

          <p style={styles.body}>{result.body}</p>

          <div style={styles.noteBox}>
            <p>
              もし「そこまで当てはまらない」と感じた場合でも、不調がないというよりも、
              身体のサインを感じにくくなっている状態の可能性もあります。
            </p>
            <p>
              身体は本来、とても繊細に変化を伝えています。
            </p>
          </div>

          <div style={styles.noteBox}>
            <p>
              また、今回の結果は体感をもとにした状態であり、
              身体の状態は必ずしも体感と一致するとは限りません。
            </p>
            <p>
              実際には、数値として見ることで初めて気づく変化も多く存在します。
            </p>
          </div>

          <div style={styles.graphBox}>
            <p style={styles.graphTitle}>現在のリズム</p>
            <GraphBar label="回復力" value={100 - Math.min(score * 2.2, 100)} />
            <GraphBar label="消耗サイン" value={Math.min(score * 2.2, 100)} />
            <GraphBar label="深層パターン" value={Math.min(deepScore * 33, 100)} />
          </div>

          <div style={styles.deep}>
            {hasDeepPattern ? (
              <>
                <p>
                  休むことに違和感があったり、頑張っている方が安心する感覚があるとき、
                  身体は無意識にエネルギーを使い続ける方向に傾いています。
                </p>
                <p>
                  それは意志ではなく、これまでの経験の中で身についた身体の反応かもしれません。
                </p>
                <p>
                  このパターンに気づくことが、本来のリズムへ戻る大切な一歩になります。
                </p>
              </>
            ) : (
              <>
                <p>
                  現在は、無意識にエネルギーを使い続けるような深いパターンは強く見られていません。
                </p>
                <p>
                  自然に力を抜ける感覚は、回復しやすい身体の土台になります。
                </p>
              </>
            )}
          </div>

          <div style={styles.cta}>
            <p>{result.cta}</p>
            <p>
              唾液ホルモン検査では、プロゲステロンとエストロゲンのバランスや、
              コルチゾールのリズムを確認しながら、
              今の体の状態と日常のエネルギーの使い方をつなげて見ていくことができます。
            </p>
          </div>

          <div style={styles.bookBox}>
            この状態については、本編で詳しく解説しています。
          </div>

          <a href="/" style={styles.button}>
            もう一度チェックする
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <p style={styles.intro}>
          これは、今のご自身の内側のリズムに気づくための静かな体験です。
          <br />
          このチェックは約1分で完了します。
        </p>

        <h1 style={styles.header}>ホルモンバランスチェック</h1>

        <form method="get" action="/">
          <input type="hidden" name="submitted" value="true" />

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
  card: {
    maxWidth: 640,
    margin: "0 auto",
    background: "rgba(255,255,255,0.92)",
    padding: 28,
    borderRadius: 24,
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
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
  bookBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
    background: "#FFFFFF",
    border: "1px solid rgba(198,169,107,0.35)",
    lineHeight: 1.8,
  },
};
