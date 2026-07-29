"use client";

import { useEffect } from "react";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4未設定(gtagが読み込まれていない)場合は何もしない。
 */
export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}

export function AnalyticsEvent({
  name,
  params,
}: {
  name: string;
  params?: EventParams;
}) {
  useEffect(() => {
    trackEvent(name, params);
    // マウント時に1回だけ発火させたいため、依存配列は意図的に固定値にしている
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
