"use client";

import type { CSSProperties } from "react";
import type { Source } from "@/lib/source";
import { trackEvent } from "./AnalyticsEvent";
import { InstagramLiveCta } from "./InstagramLiveCta";

export function LiveVideoSection({
  liveVideoUrl,
  liveVideoPoster,
  source,
}: {
  liveVideoUrl: string;
  liveVideoPoster: string;
  source: Source;
}) {
  function handlePlay() {
    trackEvent("journey_live_video_play", { source });
  }

  return (
    <section style={styles.section}>
      <p style={styles.small}>Instagramライブより</p>
      <h2 style={styles.heading}>
        「命に支障はないからと後回しにしていたら、
        <br />
        本来の身体の機能を十分に発揮できなくなっていました。」
      </h2>

      {liveVideoUrl ? (
        <div style={styles.videoWrapper}>
          <video
            style={styles.video}
            src={liveVideoUrl}
            poster={liveVideoPoster || undefined}
            controls
            preload="none"
            playsInline
            onPlay={handlePlay}
          />
        </div>
      ) : (
        <div style={styles.placeholder}>動画は準備中です。</div>
      )}
      <InstagramLiveCta />
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    marginTop: 56,
  },
  small: {
    fontSize: 12,
    letterSpacing: "0.14em",
    color: "#A08F7E",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 19,
    lineHeight: 1.7,
    color: "#2C2A28",
    marginBottom: 20,
  },
  videoWrapper: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    background: "#000",
  },
  video: {
    display: "block",
    width: "100%",
    height: "auto",
  },
  placeholder: {
    padding: 40,
    textAlign: "center",
    borderRadius: 16,
    background: "#FCFAF7",
    color: "#A08F7E",
  },
};
