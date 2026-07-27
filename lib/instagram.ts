export interface InstagramLiveEntry {
  title: string;
  url: string;
}

// 動画ごとに関連するInstagram LiveのURLをここで一元管理する。
// 新しいLiveを追加・差し替えする際は、このオブジェクトの該当キーだけを更新すればよい。
export const INSTAGRAM_LIVES: Record<string, InstagramLiveEntry> = {
  cortisol: { title: "コルチゾール・副腎ストレス解説ライブ", url: "" },
  "female-hormone": { title: "プロゲステロン・女性ホルモンライブ", url: "" },
  "case-study-01": { title: "50代講座生インタビューライブ", url: "" },
};

// 「Instagram Live一覧を見る」共通導線のURL。
export const INSTAGRAM_LIVE_LIST_URL = "";
