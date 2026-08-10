import { normalizeSource } from "@/lib/source";
import { AnalyticsEvent } from "./components/AnalyticsEvent";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const source = normalizeSource(params.source);

  return (
    <main style={styles.heroMain}>
      <div style={styles.card}>
        <AnalyticsEvent name="landing_view" params={{ source }} />

        <h1 style={styles.header}>どちらから始めますか？</h1>

        <div style={styles.choiceStack}>
          <div style={styles.choiceCard}>
            <p style={styles.choiceEyebrow}>Hormone Balance Self-Check</p>
            <h2 style={styles.choiceTitle}>ホルモンバランスセルフチェック</h2>
            <p style={styles.choiceSubtitle}>
              気になる症状から、どのホルモンバランスのサインが多いかを確認します。
            </p>
            <a href={`/hormone-check?source=${source}`} style={styles.button}>
              ホルモンバランスをチェックする
            </a>
          </div>

          <div style={styles.choiceCard}>
            <p style={styles.choiceEyebrow}>1-Minute Hormone Wellness Experience</p>
            <h2 style={styles.choiceTitle}>1分間のホルモンウェルネス体験</h2>
            <p style={styles.choiceSubtitle}>
              プロゲステロンとコルチゾールを中心に、今の身体の現在地をより詳しく確認します。
            </p>
            <a href={`/general?source=${source}`} style={styles.button}>
              1分間のウェルネス体験を始める
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  heroMain: {
    minHeight: "100vh",
    padding: "32px 18px",
    backgroundImage:
      "radial-gradient(circle at 50% 30%, oklch(88% .05 85 / 0.55) 0%, transparent 65%), " +
      "linear-gradient(180deg, oklch(98.5% .008 85 / 0.75), oklch(95.5% .014 85 / 0.88)), " +
      "url(/images/lovable/hero-Bj9vEP9k.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "serif",
  },
  card: {
    maxWidth: 640,
    margin: "0 auto",
    backgroundImage:
      "radial-gradient(ellipse 80% 40% at 50% -8%, rgba(198,169,107,0.10) 0%, transparent 62%), " +
      "linear-gradient(165deg, rgba(255,253,250,0.97) 0%, rgba(250,245,236,0.95) 100%)",
    padding: 28,
    borderRadius: 24,
    border: "1px solid rgba(198,169,107,0.14)",
    boxShadow:
      "0 1px 2px rgba(44,42,40,0.04), 0 30px 70px -32px rgba(44,42,40,0.24)",
  },
  header: {
    marginBottom: 24,
    fontSize: 22,
    textAlign: "center",
  },
  choiceStack: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  choiceCard: {
    padding: 20,
    borderRadius: 18,
    border: "1px solid rgba(198,169,107,0.25)",
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  choiceEyebrow: {
    fontSize: 12,
    letterSpacing: "0.1em",
    color: "#A08F7E",
    marginBottom: 6,
  },
  choiceTitle: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 8,
  },
  choiceSubtitle: {
    fontSize: 14,
    lineHeight: 1.7,
    color: "#6A625B",
    marginBottom: 0,
  },
  button: {
    display: "block",
    textAlign: "center",
    marginTop: 16,
    padding: 16,
    width: "100%",
    borderRadius: 999,
    border: "1px solid #C6A96B",
    background: "#fff",
    color: "#2C2A28",
    textDecoration: "none",
    boxSizing: "border-box",
  },
};
