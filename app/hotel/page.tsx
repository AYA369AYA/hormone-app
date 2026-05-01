const questions = [
  "朝の目覚めに、重さを感じることがある",
  "夕方になると、エネルギーが静かに落ちる感覚がある",
  "甘いものやコーヒーに惹かれることがある",
  "休んでいても、内側の緊張が残ることがある",
  "少し立ち止まる時間が必要だと感じる",
];

const labels = [
  { text: "ほとんどない", value: 0 },
  { text: "少し感じる", value: 1 },
  { text: "ときどき感じる", value: 2 },
  { text: "よく感じる", value: 3 },
];

export default async function HotelPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const submitted = params.submitted === "true";

  const answers = questions.map((_, i) => Number(params[`q${i}`] ?? 0));
  const score = answers.reduce((sum, v) => sum + v, 0);

  let result = {
    title: "心地よいバランスの中にいます",
    body: `今のあなたは、自然なリズムの中にいます。

ほんの少し立ち止まり、呼吸や感覚に意識を向けることで、
その流れはさらに整っていきます。`,
  };

  if (score >= 5 && score < 10) {
    result = {
      title: "エネルギーの流れに、静かな揺らぎがあります",
      body: `日常はこなせていても、
内側では少しずつエネルギーを使い続けている状態です。

今は、少し余白をつくることで、
自然とバランスが戻りやすいタイミングです。`,
    };
  }

  if (score >= 10) {
    result = {
      title: "静かに回復を求めている状態です",
      body: `今のあなたの身体は、
エネルギーを満たすことを求めています。

整えようとする前に、
まずはゆっくりと満たすこと。

それだけで、身体は自然に変わり始めます。`,
    };
  }

  if (submitted) {
    return (
      <main style={styles.main}>
        <div style={styles.card}>
          <p style={styles.small}>Hormone Intelligence Experience</p>
          <h1 style={styles.title}>{result.title}</h1>
          <p style={styles.body}>{result.body}</p>

          <div style={styles.ritualBox}>
            <p>今、この瞬間にできること</p>
            <p>
              目を閉じて、呼吸を一度ゆっくり感じてみてください。
              身体はすでに、整う方向を知っています。
            </p>
          </div>

          <p style={styles.closing}>
            あなたの身体は、すでにサインを出しています。
          </p>

          <a href="/hotel" style={styles.button}>
            もう一度体験する
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <p style={styles.small}>Six Senses Inspired</p>

        <h1 style={styles.title}>
          Inner Rhythm Check
        </h1>

        <p style={styles.intro}>
          これは、今のご自身の内側のリズムに気づくための静かな体験です。
          <br />
          正しい答えはありません。感じたままにお進みください。
        </p>

        <form method="get" action="/hotel">
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
    padding: "36px 18px",
    background:
      "linear-gradient(180deg, #F4EFE7 0%, #E8DDCF 100%)",
    fontFamily: "serif",
    color: "#3A342F",
  },
  card: {
    maxWidth: 620,
    margin: "0 auto",
    padding: 30,
    borderRadius: 30,
    background: "rgba(255,255,255,0.72)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.08)",
    border: "1px solid rgba(198,169,107,0.24)",
  },
  small: {
    fontSize: 12,
    letterSpacing: "0.18em",
    color: "#9B8A76",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 26,
    lineHeight: 1.6,
    fontWeight: 300,
    marginBottom: 22,
  },
  intro: {
    lineHeight: 2,
    color: "#6A625B",
    marginBottom: 28,
  },
  qCard: {
    padding: 18,
    marginBottom: 18,
    borderRadius: 20,
    background: "rgba(252,250,247,0.86)",
    border: "1px solid rgba(198,169,107,0.18)",
  },
  question: {
    lineHeight: 1.8,
    marginBottom: 12,
  },
  option: {
    display: "block",
    padding: "8px 0",
    color: "#5A534D",
  },
  button: {
    display: "block",
    width: "100%",
    marginTop: 28,
    padding: 17,
    borderRadius: 999,
    border: "1px solid #C6A96B",
    background: "rgba(255,255,255,0.9)",
    color: "#3A342F",
    textAlign: "center",
    textDecoration: "none",
    letterSpacing: "0.08em",
  },
  body: {
    whiteSpace: "pre-line",
    lineHeight: 2,
    color: "#5A534D",
  },
  ritualBox: {
    marginTop: 28,
    padding: 20,
    borderRadius: 22,
    background: "rgba(245,239,230,0.9)",
    lineHeight: 1.9,
  },
  closing: {
    marginTop: 24,
    lineHeight: 1.9,
    color: "#8A7866",
  },
};