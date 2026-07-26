import type { CSSProperties } from "react";
import type { Source } from "@/lib/source";
import type { JourneyConfig } from "@/lib/journeyConfig";
import { CortisolChart } from "./CortisolChart";
import { SampleTestResult } from "./SampleTestResult";
import { TestimonialVideo } from "./TestimonialVideo";
import { InstagramLiveCta } from "./InstagramLiveCta";

export function HormoneTestEvidence({
  source,
  config,
}: {
  source: Source;
  config: JourneyConfig;
}) {
  return (
    <section style={styles.section}>
      {/*
        TODO(AYA先生確認): 見出し・本文は「当院での臨床的傾向」を主張する文章です。
        実際の患者データに基づく記述かどうか未確認のため、正式な数値・所見に
        差し替えるか、一般的な説明に留めるかご判断ください。
      */}
      <h2 style={styles.heading}>実際に当院で唾液女性ホルモン検査を受けられた方では…</h2>

      <p style={styles.body}>
        このような症状を自覚されている方の多くに、
        <br />
        一日の中でコルチゾール分泌が低い時間帯
        <br />
        が認められます。
      </p>

      <CortisolChart imageSrc={config.cortisolChartImage || undefined} />

      {/* 未収録の解説動画は非公開。config.videoUrl が設定されたタイミングで自動的に表示される。 */}
      {config.videoUrl && (
        <div style={styles.videoWrapper}>
          <iframe
            src={config.videoUrl}
            style={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      <InstagramLiveCta topic="cortisol" />

      <SampleTestResult imageSrc={config.testResultImage || undefined} />

      <TestimonialVideo
        id="a1-estrogen-myth"
        source={source}
        lead="更年期の症状が気になり相談された方の、実際のお話です。"
        heading="女性ホルモンが足りないと思っていた。でも、実際は違った。"
        src="/videos/journey/a1-estrogen-myth.mp4"
        poster="/videos/journey/posters/a1.jpg"
        instagramTopic="female-hormone"
      />

      <TestimonialVideo
        id="c4-multi-symptom-connection"
        source={source}
        lead="デリケートゾーンの不調や手の湿疹など、気になる症状について話している場面です。"
        heading="一見別々に見える症状も、カラダの中ではつながっていることがあります。"
        src="/videos/journey/c4-multi-symptom-connection.mp4"
        poster="/videos/journey/posters/c4.jpg"
        instagramTopic="cortisol"
      />
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 48,
  },
  heading: {
    fontSize: 20,
    lineHeight: 1.6,
    color: "#2C2A28",
    marginBottom: 16,
  },
  body: {
    lineHeight: 1.9,
    color: "#5A534D",
    marginBottom: 20,
  },
  videoWrapper: {
    position: "relative",
    paddingTop: "56.25%",
    borderRadius: 16,
    overflow: "hidden",
    background: "#000",
    marginTop: 24,
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
    marginTop: 24,
    padding: 40,
    textAlign: "center",
    borderRadius: 16,
    background: "#FCFAF7",
    color: "#A08F7E",
  },
};
