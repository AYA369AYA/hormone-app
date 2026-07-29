import type { CSSProperties } from "react";
import type { Source } from "@/lib/source";
import type { JourneyConfig } from "@/lib/journeyConfig";
import { CortisolChart } from "./CortisolChart";
import { SampleTestResult } from "./SampleTestResult";

export function HormoneTestEvidence({
  source,
  config,
}: {
  source: Source;
  config: JourneyConfig;
}) {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>唾液ホルモン検査でわかること</h2>

      <p style={styles.body}>
        コルチゾールは本来、朝に高く夜に向けて下がるリズムで分泌されますが、
        <br />
        このリズムが乱れると、日中の不調として現れやすいと言われています。
        <br />
        唾液検査では、このコルチゾールの一日の変化を確認することができます。
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

      <SampleTestResult imageSrc={config.testResultImage || undefined} />
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
