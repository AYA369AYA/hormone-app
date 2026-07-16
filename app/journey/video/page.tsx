import { normalizeSource } from "@/lib/source";
import { getJourneyConfig } from "@/lib/journeyConfig";
import { AnalyticsEvent } from "@/app/components/AnalyticsEvent";
import { SalivaTestCta } from "@/app/components/SalivaTestCta";
import { TestimonialVideo } from "@/app/components/TestimonialVideo";

export default async function JourneyVideoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const source = normalizeSource(params.source);
  const config = getJourneyConfig();

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <AnalyticsEvent name="video_page_view" params={{ source }} />

        <p style={styles.small}>動画</p>
        <h1 style={styles.title}>解説動画をご覧ください</h1>

        {config.videoUrl ? (
          <div style={styles.videoWrapper}>
            <iframe
              src={config.videoUrl}
              style={styles.iframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={styles.videoPlaceholder}>動画は準備中です。</div>
        )}

        <TestimonialVideo
          id="a1-estrogen-myth"
          source={source}
          lead="更年期の症状が気になり相談された方の、実際のお話です。"
          heading="女性ホルモンが足りないと思っていた。でも、実際は違った。"
          src="/videos/journey/a1-estrogen-myth.mp4"
          poster="/videos/journey/posters/a1.jpg"
        />

        <TestimonialVideo
          id="c1-saliva-test-reveal"
          source={source}
          lead="10年間、更年期対策のジェルを使い続けていた方が、ケアを始める際に受けた唾液ホルモン検査。そこで分かった、意外な事実とは。"
          heading="体感だけでは分からない、今のホルモンの現在地。"
          src="/videos/journey/c1-saliva-test-reveal.mp4"
          poster="/videos/journey/posters/c1.jpg"
        />

        <TestimonialVideo
          id="c4-multi-symptom-connection"
          source={source}
          lead="デリケートゾーンの不調や手の湿疹など、気になる症状について話している場面です。"
          heading="一見別々に見える症状も、カラダの中ではつながっていることがあります。"
          src="/videos/journey/c4-multi-symptom-connection.mp4"
          poster="/videos/journey/posters/c4.jpg"
        />

        <SalivaTestCta
          source={source}
          testUrl={config.testUrl}
          label={config.ctaLabel}
          description={config.ctaDescription}
        />
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    padding: "32px 18px",
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
  small: {
    fontSize: 12,
    letterSpacing: "0.14em",
    color: "#A08F7E",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 22,
    lineHeight: 1.6,
    marginBottom: 20,
  },
  videoWrapper: {
    position: "relative",
    paddingTop: "56.25%",
    borderRadius: 16,
    overflow: "hidden",
    background: "#000",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0,
  },
  videoPlaceholder: {
    padding: 40,
    textAlign: "center",
    borderRadius: 16,
    background: "#FCFAF7",
    color: "#A08F7E",
  },
};
