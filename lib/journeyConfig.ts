export interface JourneyConfig {
  videoUrl: string;
  testUrl: string;
  ctaLabel: string;
  ctaDescription: string;
  cortisolChartImage: string;
  testResultImage: string;
}

const DEFAULT_CTA_LABEL = "唾液ホルモン検査の案内を見る";

const DEFAULT_CTA_DESCRIPTION =
  "唾液ホルモン検査では、プロゲステロンとエストロゲンのバランスや、コルチゾールのリズムを確認しながら、今の体の状態と日常のエネルギーの使い方をつなげて見ていくことができます。";

// 元Lovableサイト(luxe-hormones.lovable.app)のサンプルレポート画像。
const DEFAULT_CORTISOL_CHART_IMAGE = "/images/lovable/cortisol-report-cropped-DDsxmpUf.jpg";
const DEFAULT_TEST_RESULT_IMAGE = "/images/lovable/female-hormone-report.jpg";

/**
 * 動画URL・検査URL・CTA文言の取得口。
 * 今は環境変数を読むだけだが、呼び出し側はこの関数経由でしか値を取得しないため、
 * 将来ここを管理画面/DB参照に差し替えても呼び出し側の変更は不要になる。
 */
export function getJourneyConfig(): JourneyConfig {
  return {
    videoUrl: process.env.JOURNEY_VIDEO_URL ?? "",
    testUrl: process.env.JOURNEY_TEST_URL ?? "",
    ctaLabel: process.env.JOURNEY_CTA_LABEL ?? DEFAULT_CTA_LABEL,
    ctaDescription: process.env.JOURNEY_CTA_DESCRIPTION ?? DEFAULT_CTA_DESCRIPTION,
    cortisolChartImage: process.env.JOURNEY_CORTISOL_CHART_IMAGE ?? DEFAULT_CORTISOL_CHART_IMAGE,
    testResultImage: process.env.JOURNEY_TEST_RESULT_IMAGE ?? DEFAULT_TEST_RESULT_IMAGE,
  };
}
