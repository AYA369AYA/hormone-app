"use client";

import type { CSSProperties } from "react";
import { trackEvent } from "./AnalyticsEvent";
import type { Source } from "@/lib/source";

export function SalivaTestCta({
  source,
  testUrl,
  label,
  description,
}: {
  source: Source;
  testUrl: string;
  label: string;
  description: string;
}) {
  function handleClick() {
    trackEvent("saliva_test_cta_click", { source });
  }

  if (!testUrl) {
    return null;
  }

  return (
    <div style={styles.wrapper}>
      <img
        src="/images/lovable/saliva-kit-CdyXIEvw.jpg"
        alt="シルクの布の上に置かれた、上品な唾液ホルモン検査キット"
        style={styles.photo}
      />
      <p style={styles.eyebrow}>今の自分のホルモンバランスを知る</p>
      <p style={styles.description}>{description}</p>
      <a
        href={testUrl}
        onClick={handleClick}
        style={styles.button}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
      <p style={styles.footnote}>
        検査後は、動画・個別またはグループ解説で結果を理解いただけます。
      </p>
      <p style={styles.journeyNote}>
        唾液女性ホルモン検査は、ゴールではありません。
        <br />
        あなたのHormone Journeyの入り口です。
      </p>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    marginTop: 24,
    padding: 20,
    borderRadius: 18,
    background: "#EFE4D4",
  },
  photo: {
    width: "100%",
    maxWidth: 320,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 16,
    borderRadius: 18,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: "0.1em",
    color: "#8A7857",
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
    lineHeight: 1.8,
    color: "#5A534D",
  },
  button: {
    display: "block",
    textAlign: "center",
    padding: 16,
    borderRadius: 999,
    border: "1px solid #C6A96B",
    background: "#fff",
    color: "#2C2A28",
    textDecoration: "none",
  },
  footnote: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 1.7,
    color: "#8A7857",
    textAlign: "center",
  },
  journeyNote: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid rgba(198,169,107,0.3)",
    fontSize: 13,
    lineHeight: 1.8,
    color: "#2C2A28",
    fontWeight: 600,
    textAlign: "center",
  },
};
