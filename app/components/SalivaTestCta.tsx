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
};
