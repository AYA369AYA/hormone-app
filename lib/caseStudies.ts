import { HORMONE_CARE_TERM } from "./copy";

export interface CaseStudy {
  id: string;
  status: "published" | "coming-soon";
  tag: string;
  title: string;
  summary: string;
  body?: string[];
  quote?: string;
  videoSrc?: string;
  posterSrc?: string;
  captionsSrc?: string;
  photoSrc?: string;
  readMoreHref?: string;
  instagramTopicId?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-01-executive",
    status: "published",
    tag: "Case Study 01",
    title: "身体を整えたことで、本来の自分を取り戻せた",
    summary:
      "50代の女性経営者。頭では理解しているのに身体と心が追いつかない状態から、経営者としての判断力と情熱を取り戻された事例です。",
    body: [
      "50代の女性経営者。脳心理学やマインド、潜在意識について深く学び、実践されてきた方でした。",
      "しかし、ある時から、「頭では理解しているのに、身体と心が追いつかない。」そんな状態が続き、判断力、集中力、仕事への情熱も低下していったそうです。",
      `その後、ご自身の身体と向き合い、${HORMONE_CARE_TERM}に取り組まれました。`,
      "すると、経営者としての判断力を取り戻した、集中力を取り戻した、仕事への情熱を取り戻した、スタッフやお客様へ以前のように愛情を持って関われるようになった、と話してくださいました。",
    ],
    quote: "身体が整うことで、新しい自分になったのではなく、本来の自分を取り戻せました。",
    instagramTopicId: "case-study-01",
    videoSrc: "/videos/journey/case-study-01.mp4",
    posterSrc: "/videos/journey/posters/case-study-01.jpg",
  },
  { id: "case-entrepreneurship", status: "coming-soon", tag: "Case Study", title: "起業", summary: "近日公開" },
  { id: "case-revenue-growth", status: "coming-soon", tag: "Case Study", title: "売上成長", summary: "近日公開" },
  { id: "case-self-trust", status: "coming-soon", tag: "Case Study", title: "自己信頼", summary: "近日公開" },
  { id: "case-marriage", status: "coming-soon", tag: "Case Study", title: "夫婦関係", summary: "近日公開" },
  { id: "case-parenting", status: "coming-soon", tag: "Case Study", title: "子育て", summary: "近日公開" },
  { id: "case-challenge", status: "coming-soon", tag: "Case Study", title: "人生の挑戦", summary: "近日公開" },
  { id: "case-global", status: "coming-soon", tag: "Case Study", title: "海外進出", summary: "近日公開" },
  { id: "case-self-actualization", status: "coming-soon", tag: "Case Study", title: "自己実現", summary: "近日公開" },
];
