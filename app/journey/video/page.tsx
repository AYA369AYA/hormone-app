import { normalizeSource } from "@/lib/source";
import { getJourneyConfig } from "@/lib/journeyConfig";
import { AnalyticsEvent } from "@/app/components/AnalyticsEvent";
import { SalivaTestCta } from "@/app/components/SalivaTestCta";
import { SymptomSignals } from "@/app/components/SymptomSignals";
import { BodyIntroTeaser } from "@/app/components/BodyIntroTeaser";
import { HormoneTestEvidence } from "@/app/components/HormoneTestEvidence";
import { BodyCgJourney } from "@/app/components/BodyCgJourney";
import { WhyKnowSection } from "@/app/components/WhyKnowSection";
import { LiveVideoSection } from "@/app/components/LiveVideoSection";
import { CaseStudySection } from "@/app/components/CaseStudySection";
import { VisionSection } from "@/app/components/VisionSection";
import { PostApplicationFlow } from "@/app/components/PostApplicationFlow";
import { EmailNurtureCta } from "@/app/components/EmailNurtureCta";

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

        <p style={styles.small}>Hormone Intelligence</p>
        <h1 style={styles.title}>
          身体からのサインを、正しく理解するために。
        </h1>

        <p style={styles.lead}>
          女性の心身の変化については、「女性ホルモンが減ること」が原因というイメージを持たれている方も多いかもしれません。
        </p>
        <p style={styles.lead}>
          ここでは、症状のサインから、実際の検査データ、そしてご自身の身体を取り戻された方々の声まで、
          Hormone Journeyの全体像をご紹介します。
        </p>
        <p style={styles.caption}>※AYA Women&apos;s Clinic Instagramライブより</p>

        <SymptomSignals />

        <BodyIntroTeaser />

        <HormoneTestEvidence source={source} config={config} />

        <BodyCgJourney />

        <WhyKnowSection />

        <LiveVideoSection
          liveVideoUrl={config.liveVideoUrl}
          liveVideoPoster={config.liveVideoPoster}
          source={source}
        />

        <CaseStudySection />

        <VisionSection />

        <p style={styles.lead}>
          セルフチェックで気になる項目があった方は、唾液女性ホルモン検査で現在のホルモンバランスを確認することができます。
        </p>

        <PostApplicationFlow />

        <SalivaTestCta
          source={source}
          testUrl={config.testUrl}
          label={config.ctaLabel}
          description={config.ctaDescription}
        />

        <EmailNurtureCta source={source} />
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
  lead: {
    lineHeight: 1.9,
    color: "#5A534D",
    marginBottom: 12,
  },
  caption: {
    fontSize: 12,
    color: "#A08F7E",
    marginBottom: 8,
  },
};
