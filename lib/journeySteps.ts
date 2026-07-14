export type JourneyStepStatus = "active" | "planned";

export interface JourneyStep {
  key: string;
  label: string;
  path: string;
  status: JourneyStepStatus;
}

/**
 * Hormone Journey全体のロードマップ。
 * Phase1で実装するのは "video" のみ。他は将来ステップの予約枠で、
 * 対応するページはまだ存在しない。
 */
export const JOURNEY_STEPS: readonly JourneyStep[] = [
  { key: "video", label: "動画", path: "/journey/video", status: "active" },
  { key: "self-care", label: "セルフケア", path: "/journey/self-care", status: "planned" },
  { key: "test", label: "検査", path: "/journey/test", status: "planned" },
  { key: "results", label: "結果", path: "/journey/results", status: "planned" },
  { key: "care-course", label: "ケアコース", path: "/journey/care-course", status: "planned" },
];
