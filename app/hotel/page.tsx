 export default function HotelPage() {
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

        <h2 style={styles.resultTitle}>
          エネルギーの流れに、静かな変化があります
        </h2>

        <p style={styles.body}>
          日常はこなせていても、{"\n"}
          内側では少しずつエネルギーを使い続けている状態です。{"\n\n"}
          今は、少し余白をつくることで、{"\n"}
          自然とバランスが戻りやすいタイミングです。
        </p>

        <div style={styles.ritualBox}>
          <p>今、この瞬間にできること</p>
          <p>
            目を閉じて、呼吸を一度ゆっくり感じてみてください。{"\n"}
            身体はすでに、整う方向を知っています。
          </p>
        </div>

        <p style={styles.closing}>
          あなたの身体は、すでにサインを出しています。
        </p>

        <a href="/" style={styles.button}>
          戻る
        </a>
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
  resultTitle: {
    fontSize: 22,
    marginBottom: 16,
    lineHeight: 1.6,
  },
  body: {
    whiteSpace: "pre-line",
    lineHeight: 2,
    color: "#5A534D",
    marginBottom: 20,
  },
  ritualBox: {
    marginTop: 20,
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
  },
};
